// actions/someActions.js
import axios from "../api";

import { DISTRICT_SUCCESS, DISTRICT_FALIURE, DIVISION_SUCCESS, DIVISION_FALIURE, TEHSIL_SUCCESS, TEHSIL_FALIURE, PATWAR_SUCCESS, PATWAR_FALIURE } from "../action_types";
import { decryptData, encryptDataGet } from "../../utils/encryptDecrypt";

// Action Creators
export const getPatwarApiSuccess = (data) => ({
    type: PATWAR_SUCCESS,
    payload: data,
});

export const getPatwarApiFailure = (error) => ({
    type: PATWAR_FALIURE,
    payload: error,
});

// Async Action to Fetch Data
export const getPatwarApi = (id) => {
    console.log('id ', id )
    return async (dispatch) => {
        try {
            // const response = await axios.get(`/master-data?status=true&masterName=district`, {});
            const response = await axios.get(`/master-data?status=${encryptDataGet(`true`)}&masterName=${encryptDataGet("revenuePatwarCircle")}&parentId=${encryptDataGet(JSON.stringify(id))}`, {});
            let responseData = decryptData(response?.data?.data)
            // let responseData = response?.data?.data
            dispatch(getPatwarApiSuccess(responseData));
        } catch (error) {
            dispatch(getPatwarApiFailure(error));
        }
    };
};
