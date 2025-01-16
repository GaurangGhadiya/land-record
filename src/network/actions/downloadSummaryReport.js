// actions/someActions.js
import axios from "../api";

import { CSC_REPORT_DOWNLOAD_SUCCESS, CSC_REPORT_DOWNLOAD_FALIURE } from "../action_types";
import { encryptDataGet } from "../../utils/encryptDecrypt";
import { convertDateFormatApi } from "../../utils/dateFormat";
// Action Creators
export const fetchDownloadSuccess = (data) => ({
  type: CSC_REPORT_DOWNLOAD_SUCCESS,
  payload: data,
});

export const fetchDownloadFailure = (error) => ({
  type: CSC_REPORT_DOWNLOAD_FALIURE,
  payload: error,
});

// Async Action to Fetch Data
export const onSummaryReportDownload = (queryParams) => {
  return async (dispatch) => {
    let urlLink = `/download/excel/survey/summary`
    if (queryParams?.type?.value) {
      urlLink = urlLink + `?tag=${encryptDataGet(queryParams?.type?.value)}`
    }
    if (queryParams?.division?.value) {
      urlLink = urlLink + `&divisionName=${encryptDataGet(queryParams?.division?.label)}&divisionCode=${encryptDataGet(JSON.stringify(queryParams?.division?.value))}`
    }
    if (queryParams?.subDivision?.value) {
      urlLink = urlLink + `&subDivisionCode=${encryptDataGet(JSON.stringify(queryParams?.subDivision?.value))}`
    }
    if (queryParams?.fromDate && queryParams?.toDate) {
      urlLink = urlLink + `&fromDate=${encryptDataGet(queryParams?.fromDate)}&toDate=${encryptDataGet(queryParams?.toDate)}`
    }
    try {
      const response = await axios.get(urlLink, {
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
      dispatch(fetchDownloadSuccess(response.data));
    } catch (error) {
      dispatch(fetchDownloadFailure(error));
    }
  };
};
