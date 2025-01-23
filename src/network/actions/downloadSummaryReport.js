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
export const onSummaryReportDownload = (body) => {
  return async (dispatch) => {
    let urlLink = `/download/excel/survey/summary`
    if (body?.district?.value) {
      let value = typeof body?.district?.value == "number" ? JSON.stringify(body?.district?.value) : body?.district?.value
      urlLink = urlLink + `?districtId=${encryptDataGet(value)}`
    }
    if (body?.patwar?.value) {
      let value = typeof body?.patwar?.value == "number" ? JSON.stringify(body?.patwar?.value) : body?.patwar?.value
      urlLink = urlLink + `&patwarId=${encryptDataGet(value)}`
    }
    if (body?.tehsil?.value) {
      let value = typeof body?.tehsil?.value == "number" ? JSON.stringify(body?.tehsil?.value) : body?.tehsil?.value
      urlLink = urlLink + `&tehsilId=${encryptDataGet(value)}`
    }
    if (body?.village?.value) {
      let value = typeof body?.village?.value == "number" ? JSON.stringify(body?.village?.value) : body?.village?.value

      urlLink = urlLink + `&villageId=${encryptDataGet(value)}`
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
          `SurveyReport.csv`
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
