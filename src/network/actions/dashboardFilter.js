// actions/someActions.js
import axios from "../api";

import {
  DASHBOARD_REPORT_SUCCESS,
  DASHBOARD_REPORT_FALIURE,
} from "../action_types";
import { decryptData, encryptDataGet } from "../../utils/encryptDecrypt";
// Action Creators
export const fetchDashboardSuccess = (data) => ({
  type: DASHBOARD_REPORT_SUCCESS,
  payload: data,
});

export const fetchDashboardFaliure = (error) => ({
  type: DASHBOARD_REPORT_FALIURE,
  payload: error,
});

// Async Action to Fetch Data
export const onDashboarFilters = (body, setLoader=()=>{}) => {
  return async (dispatch) => {
    try {
      setLoader(true)
      let url =  `/dashboard/report`
      if (body?.district?.value){
        url = url +  `?districtId=${encryptDataGet(JSON.stringify(body?.district?.value))}`
      }
      if (body?.municipal?.value){
        url = url +  `&municipalityId=${encryptDataGet(JSON.stringify(body?.municipal?.value))}`
      }
      if (body?.ward?.value){
        url = url +  `&wardId=${encryptDataGet(JSON.stringify(body?.ward?.value))}`
      }
      if (body?.block?.value){
        url = url +  `&blockId=${encryptDataGet(JSON.stringify(body?.block?.value))}`
      }
      if (body?.pachayat?.value){
        url = url +  `&panchayatId=${encryptDataGet(JSON.stringify(body?.pachayat?.value))}`
      }
      if (body?.village?.value){
        url = url +  `&villageId=${encryptDataGet(JSON.stringify(body?.village?.value))}`
      }
      const response = await axios.get(url);

      let data = decryptData(response?.data?.data)

      dispatch(fetchDashboardSuccess(data));
      setLoader(false)
    } catch (error) {
      dispatch(fetchDashboardFaliure(error));
      setLoader(false)
    }
  };
};
