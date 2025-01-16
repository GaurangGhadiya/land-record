// actions/someActions.js
import axios from "../api";

import {
    FAMILIES_DETAIL_SUCCESS,
    FAMILIES_DETAIL_FALIURE,
    HOTEL_DETAIL_SUCCESS,
    HOTEL_DETAIL_FALIURE,
} from "../action_types";
import { decryptData, encryptDataGet } from "../../utils/encryptDecrypt";
// Action Creators
export const fetchHotelDetSuccess = (data) => ({
    type: HOTEL_DETAIL_SUCCESS,
    payload: data,
});

export const fetchHotelDetFailure = (error) => ({
    type: HOTEL_DETAIL_FALIURE,
    payload: error,
});

// Async Action to Fetch Data
export const onHotelDetailApi = (id, setLoading) => {
    return async (dispatch) => {
        try {
            setLoading(true)
            const response = await axios.get(
                `/survey/hotelDetail?id=${encryptDataGet(JSON.stringify(id))}`,
                {}
            );
            let responseData = decryptData(response?.data?.data)
            dispatch(fetchHotelDetSuccess(responseData));
            setLoading(false)
        } catch (error) {
            setLoading(false)
            dispatch(fetchHotelDetFailure(error));
        }
    };
};
