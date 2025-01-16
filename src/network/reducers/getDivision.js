// reducers/someReducer.js
import { DISTRICT_SUCCESS, DISTRICT_FALIURE, DIVISION_SUCCESS, DIVISION_FALIURE } from "../action_types";


const initialState = {
    data: [],
    error: null,
};

const division_reducer = (state = initialState, action) => {
    switch (action.type) {
        case DIVISION_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: null,
            };
        case DIVISION_FALIURE:
            return {
                ...state,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default division_reducer;
