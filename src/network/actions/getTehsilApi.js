// actions/someActions.js
import axios from "../api";

import { DISTRICT_SUCCESS, DISTRICT_FALIURE, DIVISION_SUCCESS, DIVISION_FALIURE, TEHSIL_SUCCESS, TEHSIL_FALIURE } from "../action_types";
import { decryptData, encryptDataGet } from "../../utils/encryptDecrypt";

// Action Creators
export const getTehsilApiSuccess = (data) => ({
    type: TEHSIL_SUCCESS,
    payload: data,
});

export const getTehsilApiFailure = (error) => ({
    type: TEHSIL_FALIURE,
    payload: error,
});

// Async Action to Fetch Data
export const getTehsilApi = (id) => {
    console.log('responseData', id)
    return async (dispatch) => {
        try {
            // const response = await axios.get(`/master-data?status=true&masterName=district`, {});
            const response = await axios.get(`/master-data?status=${encryptDataGet(`true`)}&masterName=${encryptDataGet("revenueTehsil")}&parentId=${encryptDataGet(JSON.stringify(id))}`, {});
            let responseData = decryptData(response?.data?.data)
            // let responseData = response?.data?.data
            console.log('responseData', responseData)
            dispatch(getTehsilApiSuccess(responseData));
        } catch (error) {
            console.log('responseData',error)
            dispatch(getTehsilApiFailure(error));
        }
    };
};
