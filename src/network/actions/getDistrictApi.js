// actions/someActions.js
import axios from "../api";

import { DISTRICT_SUCCESS, DISTRICT_FALIURE, DIVISION_SUCCESS, DIVISION_FALIURE } from "../action_types";
import { decryptData, encryptDataGet } from "../../utils/encryptDecrypt";

// Action Creators
export const getDistrictApiSuccess = (data) => ({
    type: DISTRICT_SUCCESS,
    payload: data,
});

export const getDistrictApiFailure = (error) => ({
    type: DISTRICT_FALIURE,
    payload: error,
});

// Async Action to Fetch Data
export const getDistrictApi = () => {
    return async (dispatch) => {
        try {
            // const response = await axios.get(`/master-data?status=true&masterName=district`, {});
            const response = await axios.get(`/master-data?status=${encryptDataGet(`true`)}&masterName=${encryptDataGet("revenueDistrict")}`, {});
            let responseData = decryptData(response?.data?.data)
            // let responseData = response?.data?.data
            dispatch(getDistrictApiSuccess(responseData));
        } catch (error) {
            dispatch(getDistrictApiFailure(error));
        }
    };
};
