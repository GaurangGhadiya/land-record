// reducers/someReducer.js
import {
    SUMMARY_REPORT_SUCCESS,
    SUMMARY_REPORT_FALIURE,
    CONSUMER_SUMMARY_REPORT_SUCCESS,
    CONSUMER_SUMMARY_REPORT_FALIURE,
} from "../action_types";

const initialState = {
    data: [],
    error: null,
};

const onConsumerSummaryReport = (state = initialState, action) => {
    switch (action.type) {
        case CONSUMER_SUMMARY_REPORT_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: null,
            };
        case CONSUMER_SUMMARY_REPORT_FALIURE:
            return {
                ...state,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default onConsumerSummaryReport;
