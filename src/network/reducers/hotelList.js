// reducers/someReducer.js
import { FAMILIES_LIST_SUCCESS, FAMILIES_LIST_FALIURE, HOTELS_LIST_SUCCESS, HOTELS_LIST_FALIURE } from "../action_types";


const initialState = {
    data: [],
    error: null,
};

const hotelList = (state = initialState, action) => {
    switch (action.type) {
        case HOTELS_LIST_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: null,
            };
        case HOTELS_LIST_FALIURE:
            return {
                ...state,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default hotelList;
