// actions/someActions.js
import axios from "../api";

import {
  FAMILIES_DETAIL_SUCCESS,
  FAMILIES_DETAIL_FALIURE,
} from "../action_types";
import { decryptData, encryptDataGet } from "../../utils/encryptDecrypt";
// Action Creators
export const fetchFamiliesDetSuccess = (data) => ({
  type: FAMILIES_DETAIL_SUCCESS,
  payload: data,
});

export const fetchFamiliesDetFailure = (error) => ({
  type: FAMILIES_DETAIL_FALIURE,
  payload: error,
});

// Async Action to Fetch Data
export const onFamiliesDetailApi = (id, setLoading) => {
  return async (dispatch) => {
    try {
      setLoading(true)
      const response = await axios.get(
        `/survey/buildingDetail?id=${encryptDataGet(JSON.stringify(id))}`,
        {}
      );
      let responseData = decryptData(response?.data?.data)
      dispatch(fetchFamiliesDetSuccess(responseData));
      setLoading(false)
    } catch (error) {
      setLoading(false)
      dispatch(fetchFamiliesDetFailure(error));
    }
  };
};
