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
      let url = `/dashboard/report`
      console.log('body', body)
      if (body?.district?.value) {
        let value = typeof body?.district?.value == "number" ? JSON.stringify(body?.district?.value) : body?.district?.value
        url = url +  `?districtId=${encryptDataGet(value)}`
      }
      if (body?.patwar?.value) {
        let value = typeof body?.patwar?.value == "number" ? JSON.stringify(body?.patwar?.value) : body?.patwar?.value
        url = url +  `&patwarId=${encryptDataGet(value)}`
      }
      if (body?.tehsil?.value) {
        let value = typeof body?.tehsil?.value == "number" ? JSON.stringify(body?.tehsil?.value) : body?.tehsil?.value
        url = url +  `&tehsilId=${encryptDataGet(value)}`
      }
      if (body?.village?.value) {
        let value = typeof body?.village?.value == "number" ? JSON.stringify(body?.village?.value) : body?.village?.value

        url = url +  `&villageId=${encryptDataGet(value)}`
      }
      if (body?.fromDate && body?.toDate && body?.district?.value && body?.patwar?.value && body?.tehsil?.value && body?.village?.value  ){
        url = url +  `&fromDate=${encryptDataGet(body?.fromDate)}`
      }
      if (body?.fromDate && body?.toDate && body?.district?.value && body?.patwar?.value && body?.tehsil?.value && body?.village?.value) {
        url = url +  `&toDate=${encryptDataGet(body?.toDate)}`
      }

      const response = await axios.get(url);

      let data = decryptData(response?.data?.data)
console.log('data', data)
      dispatch(fetchDashboardSuccess(data));
      setLoader(false)
    } catch (error) {
      dispatch(fetchDashboardFaliure(error));
      setLoader(false)
    }
  };
};
