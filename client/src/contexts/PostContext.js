import { createContext, useReducer, useState } from "react";
import postReducer from "../reducers/postReducer";
import callApi from "../ultil.js/callApi";
import * as Types from '../constants/ActionTypes';

export const PostContext = createContext();
export const PostContextProvider = ({ children }) => {
    const [postState, dispatch] = useReducer(postReducer, {
        post: null,
        posts: [],
        postLoading: true
    })

    const [addPostModal, setAddPostModal] = useState(false);
    const [updatePostModal, setUpdatePostModal] = useState(false);

    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null
    })

    //Lấy danh sách post
    const getPost = async () => {
        try {
            return await callApi('post').then(res => {
                if (res.data.success) {
                    return dispatch({ type: Types.LIST_POST, payload: res.data.posts })
                }
            })
        } catch (error) {
            dispatch({ type: Types.POST_FAIL, payload: [] })
        }
    }

    /// thêm post
    const addPost = async (post) => {
        try {
            return await callApi('post', 'post', post).then(res => {
                if (res.data.success) {
                    dispatch({ type: Types.ADD_POST, payload: res.data.post });
                }
                return res.data
            })
        } catch (error) {
            return error.res.data ? error.res.data : { success: false, message: 'Server error' }
        }
    }

    //delete post 
    const deletePost = async (id) => {
        try {
            return await callApi(`post/${id}`, 'delete', id).then(res => {
                if (res.data.success) {
                    dispatch({ type: Types.DELETE_POST, payload: id});
                }
                return res.data
            })
        } catch (error) {
            console.log(error)
        }
    }

    //Find Post 
    const findPost = (id) => {
        const post = postState.posts.find(post => post._id===id);
        dispatch({type: Types.FIND_POST, payload: post});
    }

    //update post
    const updatePost = async (id, postUpdate) => {
        try {
            return await callApi(`post/${id}`, 'put', postUpdate).then(res => {
                if (res.data.success) {
                    dispatch({ type: Types.UPDATE_POST, payload: res.data.post});
                }
                return res.data
            })
        } catch (error) {
            return error.res.data ? error.res.data : { success: false, message: 'Server error' }
        }
    }

    const PostContextData = {
        postState,
        getPost,
        addPostModal,
        setAddPostModal,
        addPost,
        showToast,
        setShowToast,
        deletePost,
        updatePost,
        findPost ,
        updatePostModal,
        setUpdatePostModal
    }

    return (
        <PostContext.Provider value={PostContextData}>
            {children}
        </PostContext.Provider>
    )
}
