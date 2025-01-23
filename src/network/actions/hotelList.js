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
                let value = typeof body?.district?.value == "number" ? JSON.stringify(body?.district?.value) : body?.district?.value
                url = url + `&districtId=${encryptDataGet(value)}`
            }
            if (body?.patwar?.value) {
                let value = typeof body?.patwar?.value == "number" ? JSON.stringify(body?.patwar?.value) : body?.patwar?.value
                url = url + `&patwarId=${encryptDataGet(value)}`
            }
            if (body?.tehsil?.value) {
                let value = typeof body?.tehsil?.value == "number" ? JSON.stringify(body?.tehsil?.value) : body?.tehsil?.value
                url = url + `&tehsilId=${encryptDataGet(value)}`
            }
            if (body?.village?.value) {
                let value = typeof body?.village?.value == "number" ? JSON.stringify(body?.village?.value) : body?.village?.value

                url = url + `&villageId=${encryptDataGet(value)}`
            }
            if (body?.fromDate && body?.toDate && body?.district?.value && body?.patwar?.value && body?.tehsil?.value && body?.village?.value) {
                url = url + `&fromDate=${encryptDataGet(body?.fromDate)}`
            }
            if (body?.fromDate && body?.toDate && body?.district?.value && body?.patwar?.value && body?.tehsil?.value && body?.village?.value) {
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
