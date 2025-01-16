// actions/someActions.js
import axios from "../api";

import { DISTRICT_SUCCESS, DISTRICT_FALIURE, DIVISION_SUCCESS, DIVISION_FALIURE, TEHSIL_SUCCESS, TEHSIL_FALIURE, PATWAR_SUCCESS, PATWAR_FALIURE, VILLAGE_SUCCESS, VILLAGE_FALIURE } from "../action_types";
import { decryptData, encryptDataGet } from "../../utils/encryptDecrypt";

// Action Creators
export const getVillageApiSuccess = (data) => ({
    type: VILLAGE_SUCCESS,
    payload: data,
});

export const getVillageApiFailure = (error) => ({
    type: VILLAGE_FALIURE,
    payload: error,
});

// Async Action to Fetch Data
export const getVillageApi = (id) => {
    console.log('id ', id )
    return async (dispatch) => {
        try {
            // const response = await axios.get(`/master-data?status=true&masterName=district`, {});
            const response = await axios.get(`/master-data?status=${encryptDataGet(`true`)}&masterName=${encryptDataGet("revenueVillage")}&parentId=${encryptDataGet(id)}`, {});
            let responseData = decryptData(response?.data?.data)
            // let responseData = response?.data?.data
            dispatch(getVillageApiSuccess(responseData));
        } catch (error) {
            dispatch(getVillageApiFailure(error));
        }
    };
};
