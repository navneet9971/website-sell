const likeReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_LIKE':
            return {
                ...state,
                like: [...state.like, action.payload],
                likeCount: state.like.length + 1,
            };
        case 'REMOVE_FROM_LIKE':
            return {
                ...state,
                like: state.like.filter(item => item.product_id !== action.payload.product_id),
                likeCount: state.like.length - 1,
            };
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
