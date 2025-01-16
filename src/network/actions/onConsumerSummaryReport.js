// actions/someActions.js
import axios from "../api";

import {
    SUMMARY_REPORT_SUCCESS,
    SUMMARY_REPORT_FALIURE,
    CONSUMER_SUMMARY_REPORT_SUCCESS,
    CONSUMER_SUMMARY_REPORT_FALIURE,
} from "../action_types";
import { decryptData, encryptDataGet } from "../../utils/encryptDecrypt";
import { convertDateFormatApi } from "../../utils/dateFormat";
// Action Creators
export const onConsumerSummaryReportSuccess = (data) => ({
    type: CONSUMER_SUMMARY_REPORT_SUCCESS,
    payload: data,
});

export const onConsumerSummaryReportFaliure = (error) => ({
    type: CONSUMER_SUMMARY_REPORT_FALIURE,
    payload: error,
});

// Async Action to Fetch Data
export const onConsumerSummaryReport = (queryParams, page, setLoading = () => { }) => {
    setLoading(true)
    let url = `/dashboard/survey/consumer-summary?size=${encryptDataGet(JSON.stringify(50))}&page=${encryptDataGet(JSON.stringify(page))}`
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
            dispatch(onConsumerSummaryReportSuccess(decryptData(response.data?.data)));
            setLoading(false)
        } catch (error) {
            dispatch(onConsumerSummaryReportFaliure(error));
            setLoading(false)
        }
    };
};
