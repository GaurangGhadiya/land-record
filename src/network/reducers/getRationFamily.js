// reducers/someReducer.js
import { GENDER_SUCCESS, GENDER_FALIURE, GET_RATION_FAMILY_SUCCESS, GET_RATION_FAMILY_FALIURE } from "../action_types";


const initialState = {
    data: [],
    error: null,
};

const getRationFamily = (state = initialState, action) => {
    switch (action.type) {
        case GET_RATION_FAMILY_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: null,
            };
        case GET_RATION_FAMILY_FALIURE:
            return {
                ...state,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default getRationFamily;
