// reducers/someReducer.js
import { DISTRICT_SUCCESS, DISTRICT_FALIURE, DIVISION_SUCCESS, DIVISION_FALIURE, TEHSIL_SUCCESS, TEHSIL_FALIURE, PATWAR_SUCCESS, PATWAR_FALIURE } from "../action_types";


const initialState = {
    data: [],
    error: null,
};

const patwarReducer = (state = initialState, action) => {
    switch (action.type) {
        case PATWAR_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: null,
            };
        case PATWAR_FALIURE:
            return {
                ...state,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default patwarReducer;
