// reducers/index.js
import { combineReducers } from "redux";
import login from "./login";
import dashboard from "./dashboard";
import rationDetails from "./rationDetails";
import gender from "./gender";
import economicCategories from "./economicCategories";
import residentList from "./resident";
import relations from "./relations";
import qualifications from "./qualifications";
import occupations from "./occupations";
import formData from "./formData";
import religion from "./religion";
import social_categories from "./SocialCategories";
import district_reducer from "./district";
import municipality_reducer from "./municipality";
import ward_reducer from "./ward";
import familyDetail from "./familyDetail";
import familiesList from "./familiesList";
import familiesDetailApi from "./familiesDetailApi";
import showLoader from "./showLoader";
import rolesList from "./rolesList";
import rolesDetails from "./rolesDetails";
import updateRoles from "./updateRoles";
import createRoles from "./rolesCreate";
import dashboardFilterRedux from "./dashboardFilter";
import surveySummaryRedux from "./surevySummary";
import rejections from "./rejections";
import verification from "./verification_reducer";
import saveFamily from "./saveFamily";
import saveMember from "./saveMember";
import saveProperty from "./saveProperty";
import cscSurveyList from "./cscSurveyList"
import cscUserList from "./cscUserList"

import cscReportDownload from "./cscReportDownload"
import village_reducer from "./villages";
import block_reducer from "./block";
import panchayat_reducer from "./panchayat";
import hotelList from "./hotelList";
import hotelDetail from "./hotelDetails";
import getRationFamily from "./getRationFamily";
import division_reducer from "./getDivision";
import sub_division_reducer from "./getSubDivision.JS";
import onConsumerSummaryReport from "./onConsumerSummaryReport";
import districtReducer from "./getDistrictApi";
import tehsilReducer from "./getTehsilApi";
import patwarReducer from "./getPatwarApi";
import villageReducer from "./getVillageApi";
import onChartDataRedux from "./onChartData";

const rootReducer = combineReducers({
  login,
  dashboard,
  rationDetails,
  gender,
  economicCategories,
  residentList,
  relations,
  qualifications,
  occupations,
  formData,
  religion,
  social_categories,
  district_reducer,
  municipality_reducer,
  ward_reducer,
  block_reducer,
  panchayat_reducer,
  village_reducer,
  familyDetail,
  hotelDetail,
  familiesList,
  hotelList,
  familiesDetailApi,
  showLoader,
  rolesList,
  rolesDetails,
  updateRoles,
  createRoles,
  dashboardFilterRedux,
  surveySummaryRedux,
  rejections,
  verification,
  saveFamily,
  saveMember,
  saveProperty,
  cscSurveyList,
  cscUserList,
  cscReportDownload,
  getRationFamily,
  division_reducer,
  sub_division_reducer,
  onConsumerSummaryReport,
  districtReducer,
  tehsilReducer,
  patwarReducer,
  villageReducer,
  onChartDataRedux
});


export default rootReducer;
