// actions/someActions.js
import axios from "../api";

import {
  DASHBOARD_REPORT_SUCCESS,
  DASHBOARD_REPORT_FALIURE,
  CHART_DATA_SUCCESS,
  CHART_DATA_FALIURE,
} from "../action_types";
import { decryptData, encryptDataGet } from "../../utils/encryptDecrypt";
// Action Creators
export const onChartDataSuccess = (data) => ({
  type: CHART_DATA_SUCCESS,
  payload: data,
});

export const onChartDataFaliure = (error) => ({
  type: CHART_DATA_FALIURE,
  payload: error,
});

// Async Action to Fetch Data
export const onChartDataFilters = (body, setLoader=()=>{}) => {
  return async (dispatch) => {
    try {
      setLoader(true)
      let url = `/dashboard/dateWiseData`
      console.log('body', body)
      if (body?.district?.value) {
        let value = typeof body?.district?.value == "number" ? JSON.stringify(body?.district?.value) : body?.district?.value
        url = url +  `?districtId=${encryptDataGet(value)}`
      }
      if (body?.tehsil?.value) {
        let value = typeof body?.tehsil?.value == "number" ? JSON.stringify(body?.tehsil?.value) : body?.tehsil?.value
        url = url +  `&tehsilId=${encryptDataGet(value)}`
      }
      if (body?.patwar?.value) {
        let value = typeof body?.patwar?.value == "number" ? JSON.stringify(body?.patwar?.value) : body?.patwar?.value
        url = url +  `&patwarId=${encryptDataGet(value)}`
      }

      const response = await axios.get(url);

      let data = decryptData(response?.data?.data)
console.log('data', data)
      dispatch(onChartDataSuccess(data));
      setLoader(false)
    } catch (error) {
      dispatch(onChartDataFaliure(error));
      setLoader(false)
    }
  };
};
