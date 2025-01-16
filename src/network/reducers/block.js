// reducers/someReducer.js
import { DISTRICT_SUCCESS, DISTRICT_FALIURE, BLOCK_SUCCESS, BLOCK_FALIURE } from "../action_types";


const initialState = {
    data: [],
    error: null,
};

const block_reducer = (state = initialState, action) => {
    switch (action.type) {
        case BLOCK_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: null,
            };
        case BLOCK_FALIURE:
            return {
                ...state,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default block_reducer;
