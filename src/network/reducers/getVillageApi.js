// reducers/someReducer.js
import { DISTRICT_SUCCESS, DISTRICT_FALIURE, DIVISION_SUCCESS, DIVISION_FALIURE, TEHSIL_SUCCESS, TEHSIL_FALIURE, VILLAGE_SUCCESS, VILLAGE_FALIURE } from "../action_types";


const initialState = {
    data: [],
    error: null,
};

const villageReducer = (state = initialState, action) => {
    switch (action.type) {
        case VILLAGE_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: null,
            };
        case VILLAGE_FALIURE:
            return {
                ...state,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default villageReducer;
