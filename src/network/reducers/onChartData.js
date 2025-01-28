// reducers/someReducer.js
import {
  DASHBOARD_REPORT_SUCCESS,
  DASHBOARD_REPORT_FALIURE,
  CHART_DATA_SUCCESS,
  CHART_DATA_FALIURE,
} from "../action_types";

const initialState = {
  data: [],
  error: null,
};

const onChartDataRedux = (state = initialState, action) => {
  switch (action.type) {
    case CHART_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
      };
    case CHART_DATA_FALIURE:
      return {
        ...state,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default onChartDataRedux;
