// actions/someActions.js
import axios from "../api";

import { MUNICIPALITY_SUCCESS, MUNICIPALITY_FALIURE, BLOCK_SUCCESS, BLOCK_FALIURE } from "../action_types";
import { decryptData, encryptDataGet } from "../../utils/encryptDecrypt";
// Action Creators
export const fetchBlockSuccess = (data) => ({
    type: BLOCK_SUCCESS,
    payload: data,
});

export const fetchBlockFailure = (error) => ({
    type: BLOCK_FALIURE,
    payload: error,
});

// Async Action to Fetch Data
export const onBlockList = (id) => {
    return async (dispatch) => {
        try {
            // const response = await axios.get(
            //     `/master-data?status=true&parentId=${id}&masterName=block`,
            //     {}
            // );
            const response = await axios.get(
              `/master-data?status=${encryptDataGet(`true`)}&parentId=${encryptDataGet(JSON.stringify(id))}&masterName=${encryptDataGet("block")}`,
              {}
            );
            // let responseData = response?.data?.data
            let responseData = decryptData(response?.data?.data)
            dispatch(fetchBlockSuccess(responseData));
        } catch (error) {
            dispatch(fetchBlockFailure(error));
        }
    };
};
