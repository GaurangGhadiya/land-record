// actions/someActions.js
import axios from "../api";

import { DISTRICT_SUCCESS, DISTRICT_FALIURE, DIVISION_SUCCESS, DIVISION_FALIURE } from "../action_types";
import { decryptData, encryptDataGet } from "../../utils/encryptDecrypt";

// Action Creators
export const getDivisionSuccess = (data) => ({
    type: DIVISION_SUCCESS,
    payload: data,
});

export const getDivisionFailure = (error) => ({
    type: DIVISION_FALIURE,
    payload: error,
});

// Async Action to Fetch Data
export const getDivision = () => {
    return async (dispatch) => {
        try {
            // const response = await axios.get(`/master-data?status=true&masterName=district`, {});
            const response = await axios.get(`/master-data?status=${encryptDataGet(`true`)}&masterName=${encryptDataGet("division")}`, {});
            let responseData = decryptData(response?.data?.data)
            // let responseData = response?.data?.data
            dispatch(getDivisionSuccess(responseData));
        } catch (error) {
            dispatch(getDivisionFailure(error));
        }
    };
};
