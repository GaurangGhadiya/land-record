// reducers/someReducer.js
import { DISTRICT_SUCCESS, DISTRICT_FALIURE, BLOCK_SUCCESS, BLOCK_FALIURE, PANCHAYAT_SUCCESS, PANCHAYAT_FALIURE } from "../action_types";


const initialState = {
    data: [],
    error: null,
};

const panchayat_reducer = (state = initialState, action) => {
    switch (action.type) {
        case PANCHAYAT_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: null,
            };
        case PANCHAYAT_FALIURE:
            return {
                ...state,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default panchayat_reducer;
