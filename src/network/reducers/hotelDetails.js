// src/reducers/yourReducer.js
import { FAMILY_DETAIL_SUCCESS, FAMILY_DETAIL_FALIURE, HOTELS_LIST_SUCCESS, HOTEL_DETAIL_SUCCESS } from '../action_types';

const initialState = {
    value: null,
};

const hotelDetail = (state = initialState, action) => {
    switch (action.type) {
        case HOTEL_DETAIL_SUCCESS:
            return {
                ...state,
                value: action.payload,
            };
        default:
            return state;
    }
};

export default hotelDetail;
