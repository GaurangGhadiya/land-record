// actions/someActions.js
import axios from "../api";

import { CSC_REPORT_DOWNLOAD_SUCCESS, CSC_REPORT_DOWNLOAD_FALIURE, DATA_DOWNLOAD_SUCCESS, DATA_DOWNLOAD_FALIURE } from "../action_types";
// Action Creators
export const downloadDataSuccess = (data) => ({
    type: DATA_DOWNLOAD_SUCCESS,
    payload: data,
});

export const downloadDataFailure = (error) => ({
    type: DATA_DOWNLOAD_FALIURE,
    payload: error,
});

// Async Action to Fetch Data
export const downloadData = (body) => {
    return async (dispatch) => {
        try {





            const response = await axios.get(`/download/excel/survey/summary?${body}`, {
                responseType: 'blob',
            });


            const url = window.URL.createObjectURL(new Blob([response.data])); // Create a temporary URL for the blob

            // Create a link element
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute(
                "download",
                `SummaryReport.csv`
            ); // Set the filename for the download

            // Append the link to the body and trigger the download
            document.body.appendChild(link);
            link.click();

            // Cleanup: remove the link and revoke the URL
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            dispatch(downloadDataSuccess(response.data));
        } catch (error) {
            dispatch(downloadDataFailure(error));
        }
    };
};
