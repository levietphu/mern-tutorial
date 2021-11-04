import { createContext, useReducer, useEffect } from "react";
import authReducer from "../reducers/authReducer";
import callApi from "../ultil.js/callApi";
import { LOCAL_STORAGE_TOKEN_NAME } from "../constants/ApiUrl";
import setAuthToken from "../ultil.js/setAuthToken";
import * as Types from '../constants/ActionTypes';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    //state 
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    })

    //Authenticated User
    const loadUser = async () => {
        
        try {
            if (localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)) {
                setAuthToken(localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME));
            }
            return await callApi('auth').then(res => {
                dispatch({
                    type: Types.SET_AUTH,
                    payload: { isAuthenticated: true, user: res.data.user }
                })
            })
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
            setAuthToken(null);
            dispatch({
                type: Types.SET_AUTH,
                payload: { isAuthenticated: false, user: null }
            })
        }
    }

    useEffect(() => loadUser(), [])

    //Login
    const loginUser = async (user) => {
        try {
            return await callApi('auth/login', 'post', user).then(res => {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, res.data.token);
                loadUser();
                return res.data;
            })
        } catch (error) {
            if (error.res.data) return error.res.data
            else return { success: false, message: error.message }
        }

    }

    // register 
    const registerUser = async (user) => {
        try {
            return await callApi('auth/register', 'post', user).then(res => {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, res.data.accessToken);
                loadUser();
                return res.data;
            })
        } catch (error) {
            if (error.res.data) return error.res.data
            else return { success: false, message: error.message }
        }

    }

    //logout
    const logoutUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
        dispatch({
            type: Types.SET_AUTH,
            payload: { isAuthenticated: false, user: null }
        })
    }

    const authContextData = { loginUser, authState,registerUser, logoutUser };

    return <AuthContext.Provider value={authContextData}>
        {children}
    </AuthContext.Provider>
}

