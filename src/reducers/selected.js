import {
    GET_SONGS,
    GET_HITS
} from '../core/types';

const initialState = {
    songs: null,
    hits: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_SONGS:
            return {
                ...state,
                songs: action.payload
            }
        case GET_HITS:
            return {
                ...state,
                hits: action.payload
            }
        default:
            return state
    }
}