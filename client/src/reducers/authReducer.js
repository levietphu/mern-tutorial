import * as Types from '../constants/ActionTypes';

const authReducer = (state, action) => {
    const {type, payload: {isAuthenticated, user}} = action;

    switch (type) {
        case Types.SET_AUTH:
            return {...state, authLoading: false, isAuthenticated, user};
    
        default:
            return state;
    }
}

export default authReducer
