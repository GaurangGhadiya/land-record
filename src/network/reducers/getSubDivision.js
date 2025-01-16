// reducers/someReducer.js
import { DISTRICT_SUCCESS, DISTRICT_FALIURE, DIVISION_SUCCESS, DIVISION_FALIURE, SUB_DIVISION_SUCCESS, SUB_DIVISION_FALIURE } from "../action_types";


const initialState = {
    data: [],
    error: null,
};

const sub_division_reducer = (state = initialState, action) => {
    switch (action.type) {
        case SUB_DIVISION_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: null,
            };
        case SUB_DIVISION_FALIURE:
            return {
                ...state,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default sub_division_reducer;
