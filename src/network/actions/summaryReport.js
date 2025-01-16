// actions/someActions.js
import axios from "../api";

import {
  SUMMARY_REPORT_SUCCESS,
  SUMMARY_REPORT_FALIURE,
} from "../action_types";
import { decryptData, encryptDataGet } from "../../utils/encryptDecrypt";
import { convertDateFormatApi } from "../../utils/dateFormat";
// Action Creators
export const fetchSummaryReportSuccess = (data) => ({
  type: SUMMARY_REPORT_SUCCESS,
  payload: data,
});

export const fetchSummaryReportFaliure = (error) => ({
  type: SUMMARY_REPORT_FALIURE,
  payload: error,
});

// Async Action to Fetch Data
export const onSummaryReport = (queryParams, page, setLoading = () => { }) => {
  setLoading(true)
  let url = `/dashboard/survey/summary?size=${encryptDataGet(JSON.stringify(50))}&page=${encryptDataGet(JSON.stringify(page))}`
  if (queryParams?.type?.value) {
    url = url + `&tag=${encryptDataGet(queryParams?.type?.value)}`
  }
  if (queryParams?.division?.value) {
    url = url + `&divisionName=${encryptDataGet(queryParams?.division?.label)}&divisionCode=${encryptDataGet(JSON.stringify(queryParams?.division?.value))}`
  }
  if (queryParams?.subDivision?.value) {
    url = url + `&subDivisionCode=${encryptDataGet(JSON.stringify(queryParams?.subDivision?.value))}`
  }
  if (queryParams?.fromDate && queryParams?.toDate) {
    url = url + `&fromDate=${encryptDataGet(queryParams?.fromDate)}&toDate=${encryptDataGet(queryParams?.toDate)}`
  }
  return async (dispatch) => {
    try {
      const response = await axios.get(url);
      dispatch(fetchSummaryReportSuccess(decryptData(response.data?.data)));
      setLoading(false)
    } catch (error) {
      dispatch(fetchSummaryReportFaliure(error));
      setLoading(false)
    }
  };
};
