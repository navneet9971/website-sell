const likeReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_LIKE': {
            const newLikeList = [...state.like, action.payload];
            return {
                ...state,
                like: newLikeList,
                likeCount: newLikeList.length,
            };
        }
        case 'REMOVE_FROM_LIKE': {
            const newLikeList = state.like.filter(item => item.product_id !== action.payload.product_id);
            return {
                ...state,
                like: newLikeList,
                likeCount: newLikeList.length,
            };
        }
        case 'UPDATE_LIKE_COUNT':
            return {
                ...state,
                likeCount: action.payload,
            };
        case 'LOAD_LIKE':
            return {
                ...state,
                like: action.payload,
                likeCount: action.payload.length,
            };
        default:
            return state;
    }
};


export default likeReducer;
