// actions/someActions.js
import axios from "../api";

import { FAMILIES_LIST_SUCCESS, FAMILIES_LIST_FALIURE, HOTELS_LIST_SUCCESS, HOTELS_LIST_FALIURE } from "../action_types";
import { decryptData, encryptDataGet } from "../../utils/encryptDecrypt";
import { Hotel } from "@mui/icons-material";
// Action Creators
export const fetchFamiliesListSuccess = (data) => ({
    type: HOTELS_LIST_SUCCESS,
    payload: data,
});

export const fetchHotelListFailure = (error) => ({
    type: HOTELS_LIST_FALIURE,
    payload: error,
});

export const onHotelList = (setLoader,page = 0, size = 20, body) => {
    return async (dispatch) => {
        // debugger
        try {
            setLoader(true)
            let url = `/dashboard/survey/summary?page=${encryptDataGet(page + "")}&size=${encryptDataGet(size + "")}`
            if (body?.district?.value) {
                url = url + `&districtId=${encryptDataGet(JSON.stringify(body?.district?.value))}`
            }
            if (body?.patwar?.value) {
                url = url + `&patwarityId=${encryptDataGet(JSON.stringify(body?.patwar?.value))}`
            }
            if (body?.tehsil?.value) {
                url = url + `&tehsilId=${encryptDataGet(JSON.stringify(body?.tehsil?.value))}`
            }
            if (body?.village?.value) {
                url = url + `&villageId=${encryptDataGet(JSON.stringify(body?.village?.value))}`
            }
            if (body?.fromDate && body?.toDate) {
                url = url + `&fromDate=${encryptDataGet(body?.fromDate)}`
            }
            if (body?.fromDate && body?.toDate) {
                url = url + `&toDate=${encryptDataGet(body?.toDate)}`
            }
            const response = await axios.get(url);

            let resData = decryptData(response?.data?.data)
            dispatch(fetchFamiliesListSuccess(resData));
            setLoader(false)
        } catch (error) {
            setLoader(false)
            dispatch(fetchHotelListFailure(error));
        }
    };
};
