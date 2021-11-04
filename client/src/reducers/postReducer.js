import * as Types from '../constants/ActionTypes';

const postReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case Types.LIST_POST:
            return { ...state, posts: payload, postLoading: false };

        case Types.POST_FAIL:
            return { ...state, posts: payload, postMessage: false };

        case Types.ADD_POST:
            return { ...state, posts: [...state.posts, payload] };

        case Types.DELETE_POST:
            return { ...state, posts: state.posts.filter(post => post._id !== payload) };

        case Types.FIND_POST:
            return {...state, post: payload};

        case Types.UPDATE_POST:
            const newPost = state.posts.map(post => {
                return post._id === payload._id ? payload : post
            })
            return { ...state, posts: newPost }
        default:
            return state;
    }
}

export default postReducer
