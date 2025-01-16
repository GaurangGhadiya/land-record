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
            let url = `/survey/hotel/summaryList?page=${encryptDataGet(page + "")}&size=${encryptDataGet(size + "")}`
            if (body?.district?.value) {
                url = url + `&districtId=${encryptDataGet(JSON.stringify(body?.district?.value))}`
            }
            if (body?.municipal?.value) {
                url = url + `&municipalityId=${encryptDataGet(JSON.stringify(body?.municipal?.value))}`
            }
            if (body?.ward?.value) {
                url = url + `&wardId=${encryptDataGet(JSON.stringify(body?.ward?.value))}`
            }
            if (body?.block?.value) {
                url = url + `&blockId=${encryptDataGet(JSON.stringify(body?.block?.value))}`
            }
            if (body?.pachayat?.value) {
                url = url + `&panchayatId=${encryptDataGet(JSON.stringify(body?.pachayat?.value))}`
            }
            if (body?.village?.value) {
                url = url + `&villageId=${encryptDataGet(JSON.stringify(body?.village?.value))}`
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
