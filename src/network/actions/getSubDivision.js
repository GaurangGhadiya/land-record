// actions/someActions.js
import axios from "../api";

import { MUNICIPALITY_SUCCESS, MUNICIPALITY_FALIURE, SUB_DIVISION_SUCCESS, SUB_DIVISION_FALIURE } from "../action_types";
import { decryptData, encryptDataGet } from "../../utils/encryptDecrypt";
// Action Creators
export const getSubDivisionSuccess = (data) => ({
    type: SUB_DIVISION_SUCCESS,
    payload: data,
});

export const getSubDivisionFailure = (error) => ({
    type: SUB_DIVISION_FALIURE,
    payload: error,
});

// Async Action to Fetch Data
export const getSubDivision = (id) => {
    return async (dispatch) => {
        try {
            // const response = await axios.get(
            //   `/master-data?status=true&parentId=${id}&masterName=municipal`,
            //   {}
            // );
            const response = await axios.get(
                `/master-data?status=${encryptDataGet(`true`)}&parentId=${encryptDataGet(JSON.stringify(id?.value))}&masterName=${encryptDataGet("subDivision")}`,
                {}
            );
            // let responseData = response?.data?.data
            let responseData = decryptData(response?.data?.data)
            dispatch(getSubDivisionSuccess(responseData));
        } catch (error) {
            dispatch(getSubDivisionFailure(error));
        }
    };
};
