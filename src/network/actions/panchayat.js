// actions/someActions.js
import axios from "../api";

import { MUNICIPALITY_SUCCESS, MUNICIPALITY_FALIURE, PANCHAYAT_SUCCESS, PANCHAYAT_FALIURE } from "../action_types";
import { decryptData, encryptDataGet } from "../../utils/encryptDecrypt";
// Action Creators
export const fetchPanchayatSuccess = (data) => ({
    type: PANCHAYAT_SUCCESS,
    payload: data,
});

export const fetchPanchayatFailure = (error) => ({
    type: PANCHAYAT_FALIURE,
    payload: error,
});

// Async Action to Fetch Data
export const onPanchayatList = (id) => {
    return async (dispatch) => {
        try {
            // const response = await axios.get(
            //     `/master-data?status=true&parentId=${id}&masterName=panchayat`,
            //     {}
            // );
            const response = await axios.get(
                `/master-data?status=${encryptDataGet(`true`)}&parentId=${encryptDataGet(JSON.stringify(id))}&masterName=${encryptDataGet("panchayat")}`,
              {}
            );
            // let responseData = response?.data?.data
            let responseData = decryptData(response?.data?.data)
            dispatch(fetchPanchayatSuccess(responseData));
        } catch (error) {
            dispatch(fetchPanchayatFailure(error));
        }
    };
};
