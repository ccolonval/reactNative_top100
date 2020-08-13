import {
    GET_DATA_FEED,
} from '../core/types';

const initialState = {
    dataFeed: [],
};
export default (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA_FEED:
            return {
                ...state,
                dataFeed: action.payload
            }
        default:
            return state
    }
    
}