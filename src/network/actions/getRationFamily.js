// actions/someActions.js
import axios from "../api";
import axiosLib from "axios";

import {
    FAMILIES_DETAIL_SUCCESS,
    FAMILIES_DETAIL_FALIURE,
    GET_RATION_FAMILY_SUCCESS,
    GET_RATION_FAMILY_FALIURE,
} from "../action_types";
import { decryptData, encryptDataGet } from "../../utils/encryptDecrypt";
// Action Creators
export const getRationFamilySuccess = (data) => ({
    type: GET_RATION_FAMILY_SUCCESS,
    payload: data,
});

export const getRationFamilyFailure = (error) => ({
    type: GET_RATION_FAMILY_FALIURE,
    payload: error,
});

// Async Action to Fetch Data
export const getRationFamily = (rationArray) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(
                `/survey/rationFamilyDetail?rationCardNumber=${encryptDataGet(rationArray[0])}`,
                {}
            );
            let responseData = decryptData(response?.data?.data)
            // const response = await axiosLib.get(
            //     `https://himparivarservices.hp.gov.in/hpsebl-survey-api/consumer/rationFamilyDetail?rationCardNumber=${rationArray}`
            //     // `/consumer/rationFamilyDetail?rationCardNumber=HP2014498424`
            // );
            // let responseData = response?.data?.data
            dispatch(getRationFamilySuccess(responseData));
        } catch (error) {
            dispatch(getRationFamilyFailure(error));
        }
    };
};
