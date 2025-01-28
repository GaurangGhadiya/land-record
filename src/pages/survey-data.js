import React, { useEffect, useState } from "react";
import Layout from "../components/dashboard/layout";
import { useDispatch, useSelector } from "react-redux";
import { onHotelList } from "../network/actions/hotelList";
import { fetchFamiliesDetSuccess, onFamiliesDetailApi } from "../network/actions/familyDetailApi";
import { fetchHotelDetSuccess, onHotelDetailApi } from "../network/actions/hotelDetailApi";
import { onShowLoader } from "../network/actions/showLoader";
import { getDistrict, getKanungoCode, getPanchayat, getRoles, getToken, getVillage, removeToken } from "../utils/cookie";
import { useRouter } from "next/router";
import Snackbar from "@mui/material/Snackbar";
import Groups2TwoToneIcon from "@mui/icons-material/Groups2TwoTone";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { FaceRetouchingOffRounded } from "@mui/icons-material";
import ErrorIcon from "@mui/icons-material/Error";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import RationCardMembers from "../components/verify/rationData/Members";
import RationDetailsHeader from "../components/verify/rationData/MemberDetailsHeader";
import { getRationFamily } from "../network/actions/getRationFamily";
import axios from "axios";
import { decryptData, encryptDataGet } from "../utils/encryptDecrypt";

import {
  Box,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Modal,
  Pagination,
  InputLabel,
  Button,
  Paper,
  Stack,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ClosedCaption } from "@mui/icons-material";
import ErrorSnack from "../utils/ErrorSnack";
import ConvertDateFormat from "../utils/dateFormat";

import { TableBody } from "mui-datatables";
import Filters from "../components/dashboard/filters";
import Members from "../components/verify/members/Members";
import FamilyDetails from "../components/verify/family/FamilyDetails";
import FamilyDetailsHeader from "../components/verify/family/FamilyDetailsHeader";
import MemberDetailsHeader from "../components/verify/members/MemberDetailsHeader";
import EditFamily from "../components/verify/family/EditFamily";
import Families from "../components/verify/family/Families";
import CorpDetailsHeader from "../components/verify/corp/CorpDetailsHeader";
import Corp from "../components/verify/corp/Corp";
import AadharDetailsHeader from "../components/verify/aadhar/AadharDetailsHeader";
import Aadhar from "../components/verify/aadhar/Aadhar";
import ConsentDetailsHeader from "../components/verify/consent/ConsentDetailsHeader";
import ConsentHeader from "../components/verify/consent/ConsentHeader";
import { getdistrictCode, getPatwarCode, gettehsilCode, getVillageCode } from "../utils/cookie";
import { getDistrictApi } from "../network/actions/getDistrictApi";
import { getTehsilApi } from "../network/actions/getTehsilApi";
import { getPatwarApi } from "../network/actions/getPatwarApi";
import { getVillageApi } from "../network/actions/getVillageApi";
import Select from "react-select";
import DatePickerNew from '../components/DatePicker';
import DownloadIcon from '@mui/icons-material/Download';
import { onSummaryReportDownload } from "../network/actions/downloadSummaryReport";

const columns = [
  {
    id: "district",
    label: "District",
    minWidth: 170,
    align: "center",
    fontWeight: "bold",
  },
  { id: "tehsil", label: "Tehsil", minWidth: 100, align: "center" },
  {
    id: "patwar",
    label: "Patwar",
    align: "center",
    minWidth: 170,

    // format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "village",
    label: "Vllage",
    minWidth: 150,
    align: "center",
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: "ownerCount",
    label: "Surveyed Owners",
    minWidth: 170,
    align: "center",
    // format: (value) => `XXXX-XXXX-${value
    //   .toString()
    //   .slice(-4)}`,
  },
  {
    id: "distinctKhataCount",
    label: "Surveyed Distinct Khatas",
    align: "center",
    // format: (value) => value.toFixed(2),
  },
  {
    id: "khataCount",
    label: "Total Khatas",
    align: "center",
    // format: (value) => value.toFixed(2),
  },
  {
    id: "totalOwnerCount",
    label: "Total Owners",
    align: "center",
    // format: (value) => value.toFixed(2),
  },

  // {
  //   id: "view",
  //   label: "Action",
  //   align: "center",
  //   // format: (value) => value.toFixed(2),
  // },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  bgcolor: "background.paper",
  border: "2px solid #83a2b2",
  boxShadow: 30,
  height: "90vh",
  // overflow: "hidden",
  overflowY: "auto",
  p: 4,
  borderRadius: 2,
};


const ViewDataHotel = () => {
  const [wardId, setWardId] = useState();
  const [districtCode, setDistrictCode] = useState();
  const [municipalityId, setMunicipalityId] = useState();

  const [selectedItems, setSelectedItems] = useState([]);
  const [familyList, setfamilyList] = useState([]);
  const [selectedFamily, setselectedFamily] = useState({});
  const [detailCalled, setdetailCalled] = useState(false);
  const [isCardClicked, setCardClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);
  const [totalPage, setTotalPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [errorMessage, seterrorMessage] = React.useState("");

  const [totalPages, settotalPages] = React.useState(0);

  /**Handle Filters and Call the External Service */
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedMunicipality, setSelectedMunicipality] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [selectedVillage, setSelectedVillage] = useState(null);
  const [districtOptions, setDistrictOptions] = useState([])
  const [tehsilOptions, setTehsilOptions] = useState([])
  const [patwarOptions, setPatwarOptions] = useState([])
  const [villageOptions, setVillageOptions] = useState([])
  const [filterData, setFilterData] = useState({
    district: "",
    tehsil: "",
    patwar: "",
    village: "",
  })
  const [Loader, setLoader] = useState(true);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const familiesList = useSelector((state) => state.hotelList);

  const familiesDetailApi = useSelector((state) => state.hotelDetail);
  // const familiesDetailApi = useSelector((state) => state.hotelDetail);
  const [getRationFamilyData, setGetRationFamilyData] = useState({});

  const [isAdmin, setIsAdmin] = useState(false);

  // const globalUser = getToken();
  const router = useRouter();

  const districtListApi = useSelector(
    (state) => state.districtReducer?.data
  );
  const tehsilListApi = useSelector(
    (state) => state.tehsilReducer?.data
  );
  const patwarListApi = useSelector(
    (state) => state.patwarReducer?.data
  );
  const villageListApi = useSelector(
    (state) => state.villageReducer?.data
  );

  console.log('districtListApi', districtListApi, tehsilListApi, patwarListApi, villageListApi)

  useEffect(() => {

    dispatch(getDistrictApi())

  }, [])
  const getDistrictData = async () => {
    let district_list = [];

    if (districtListApi) {
      if (districtListApi) {

        for (let i = 0; i < districtListApi.length; i++) {
          let object = {
            label: districtListApi[i].nameE,
            value: districtListApi[i].lgdCode,
            id: districtListApi[i].lgdCode,
          };
          district_list.push(object);
        }
        setDistrictOptions(district_list);
      }
      const divisionCode = await getdistrictCode();
      console.log('divisionCode', divisionCode)
      if (divisionCode) {
        setFilterData({
          ...filterData, district: {
            label:await districtListApi?.find(v => v?.lgdCode == divisionCode)?.nameE,
            value: divisionCode,
            code: divisionCode,
          }
        })
        dispatch(getTehsilApi(+divisionCode))

      }
    }
}
  useEffect(() => {
    getDistrictData()
  }, [districtListApi]);
  const getTehsilData = async () => {
    let tehsil_list = [];

    if (tehsilListApi) {
      if (tehsilListApi) {

        for (let i = 0; i < tehsilListApi.length; i++) {
          let object = {
            label: tehsilListApi[i].nameE,
            value: tehsilListApi[i].lgdCode,
            id: tehsilListApi[i].lgdCode,
          };
          tehsil_list.push(object);
        }
        setTehsilOptions(tehsil_list);
      }
      const divisionCode = await gettehsilCode();
      console.log('tehsil', divisionCode)
      if (divisionCode) {
        setFilterData({
          ...filterData, tehsil: {
            label:await tehsilListApi?.find(v => v?.lgdCode == divisionCode)?.nameE,
            value: divisionCode,
            code: divisionCode,
          }
        })
        dispatch(getPatwarApi(+divisionCode))

      }
    }
  }
  useEffect(() => {
    getTehsilData()
  }, [tehsilListApi]);
  const getPatwar = async () => {
    let patwar_list = [];

    if (patwarListApi) {
      if (patwarListApi) {

        for (let i = 0; i < patwarListApi.length; i++) {
          let object = {
            label: patwarListApi[i].nameE,
            value: patwarListApi[i].rmsPatwarId,
            id: patwarListApi[i].rmsPatwarId,
          };
          patwar_list.push(object);
        }
        setPatwarOptions(patwar_list);
      }
      const divisionCode =await getPatwarCode();
      const divisionCode2 = await gettehsilCode();
      const divisionCode3 = await getKanungoCode();
      console.log('patwar', divisionCode)
      if (divisionCode) {
        setFilterData({
          ...filterData, patwar: {
            label:await patwarListApi?.find(v => v?.rmsPatwarId == divisionCode)?.nameE,
            value: divisionCode,
            code: divisionCode,
          }
        })
        dispatch(getVillageApi(+divisionCode, +divisionCode2, +divisionCode3))
        searchData()
      }
    }
  }
  useEffect(() => {
    getPatwar()
  }, [patwarListApi]);
  useEffect(() => {
    let village_list = [];

    if (villageListApi) {
      if (villageListApi) {

        for (let i = 0; i < villageListApi.length; i++) {
          let object = {
            label: villageListApi[i].nameE,
            value: villageListApi[i].lgdCode,
            id: villageListApi[i].lgdCode,
          };
          village_list.push(object);
        }
        setVillageOptions(village_list);
      }
      // const divisionCode = getPatwarCode();
      // console.log('patwar', divisionCode)
      //   if (divisionCode) {
      //       setFilterData({
      //           ...filterData, patwar: {
      //           label: villageListApi?.find(v => v?.rmsPatwarId == divisionCode)?.nameE,
      //               value: divisionCode,
      //               code: divisionCode,
      //           }
      //       })
      //     dispatch(getVillageApi(divisionCode))

      //   }
    }
  }, [villageListApi]);
  console.log('filterData', filterData)
  const handleChangeFilter = (e, name) => {
    console.log('e123', e)
    if (name == "district") {
      setFilterData({ ...filterData, [name]: e })

      dispatch(getTehsilApi(e?.value))

    }
    else if (name == "tehsil") {
      setFilterData({ ...filterData, [name]: e })
      dispatch(getPatwarApi(e?.value))

    }
    else if (name == "patwar") {
      const divisionCode3 = getKanungoCode();

      setFilterData({ ...filterData, [name]: e })
      dispatch(getVillageApi(e?.value, filterData?.tehsil?.value, divisionCode3))

    }
    else if (name == "village") {
      setFilterData({ ...filterData, [name]: e })
    }
    else if (name == "toDate") {
      setFilterData({ ...filterData, [name]: e.target.value })

    }
    else if (name == "fromDate") {
      setFilterData({ ...filterData, [name]: e.target.value })

    }

  }

  useEffect(() => {
    let roles;
    if (getRoles()) {

      roles = getRoles();
    } else {
      // removeToken();
      // router.push("/login");
    }
    // const { roles } = globalUser || {};
    // setIsAdmin(roles && roles.length > 0 && roles[0] === "Admin");
    setIsAdmin(
      roles &&
      roles.length > 0 &&
      (roles[0] === "Admin" || roles[0] === "Verifying Authority")
    );
  }, []);

  const handleFilterChange = (data) => {
    // setSelectedDistrict(district);
    // setSelectedMunicipality(municipal);
    // setSelectedWard(ward);
    // setSelectedVillage(village)
    // const queryParams = createQueryParamsDefault(
    //   0,
    //   100,
    //   district?.code,
    //   municipal?.value,
    //   ward?.id,
    //   village?.value,
    //   1
    // );
    setFilterData(data)
    dispatch(onHotelList(setLoader, 0, 20, data));
  };

  const handleCardClick = () => {
    setCardClicked(!isCardClicked);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);

    if (selectedDistrict || selectedMunicipality || selectedWard) {
      // const queryParams = createQueryParamsDefault(
      //   newPage - 1,
      //   100,
      //   selectedDistrict?.code,
      //   selectedMunicipality?.municipalId,
      //   selectedWard?.id,
      //   1
      // );
      dispatch(onHotelList(setLoader, newPage - 1, 20, filterData));

      // dispatch(onHotelList(setLoader,queryParams));
    } else {
      // const globalUser = JSON.parse(getToken());
      // const { districtDetail, municipalityDetail, ulb, roles } =
      //   globalUser || {};
      // const queryParams = createQueryParamsDefault(
      //   newPage - 1,
      //   100,
      //   districtDetail?.districtCode,
      //   municipalityDetail?.municipalId,
      //   ulb?.id,
      //   1
      // );
      dispatch(onHotelList(setLoader, newPage - 1, 20, filterData));

      // dispatch(onHotelList(setLoader,queryParams));
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const fetchRationCardData = async (rationCard) => {
    try {
      const response = await axios.get(`https://himparivarservices.hp.gov.in/hpsebl-survey-dashboard/survey/rationFamilyDetail?rationCardNumber=${encryptDataGet(rationCard)}`);
      return decryptData(response?.data?.data); // Adjust according to the response structure
    } catch (err) {
      console.error(`Error fetching data for ${rationCard}:`, err);
      return null; // Handle errors gracefully
    }
  };

  useEffect(() => {
    if (familiesDetailApi?.value?.id) {
      // const { data, status, message, rationCardAlreadyExists } =
      //   familiesList.data || {};
      setShowModal(true);
      // setrationList(data);

      setselectedFamily(familiesDetailApi?.value);
      const getdetail = async () => {
        let cardNo = familiesDetailApi?.value?.meters?.map(v => v?.rationCard && v?.rationCard?.cardNumber)
        let uniq = [...new Set(cardNo)]
        if (uniq?.length > 0) {
          const results = await Promise.all(uniq?.map(fetchRationCardData));
          // Filter out any null results (failed requests)
          const validResults = results.filter((result) => result !== null);

          setGetRationFamilyData(validResults)
          // dispatch(getRationFamily(uniq))
        }
      }
      if (familiesDetailApi?.value?.meters) {
        getdetail()
      }
      setdetailCalled(false);
      // setLoader(false)
    }
  }, [familiesDetailApi]);
  useEffect(() => {
    // setShowModal(false);
    if (familiesList?.error) {
      setOpen(true);

      if (familiesList?.error?.response?.data?.message) {
        seterrorMessage(familiesList.error.response.data.message);
      }
    }
    if (familiesList?.data) {
      const { data, status, message, rationCardAlreadyExists } =
        familiesList.data || {};

      //dispatch(onShowLoader(true));

      // setrationList(data);

      if (familiesList?.data?.totalPages) {
        setTotalPage(familiesList?.data?.totalPages);
      }

      setfamilyList(familiesList?.data);
      // setfamilyList();
    } else {
      //console.warn(familiesList.);
    }
  }, [dispatch, familiesList]);

  const createQueryParamsDefault = (
    pageNumber,
    pageSize,
    selectedDistrict,
    selectedMunicipality,
    selectedWard,
    selectedVillage,
    verificationStatusId
  ) => {
    const queryParams = {};
    if (pageNumber) queryParams.page = pageNumber;
    if (pageSize) queryParams.size = pageSize;
    if (selectedDistrict) queryParams.districtCode = selectedDistrict;
    if (selectedMunicipality) queryParams.blockCode = selectedMunicipality;
    if (selectedWard) queryParams.panchayatCode = selectedWard;
    if (selectedVillage) queryParams.villageCode = selectedVillage;
    // if (verificationStatusId)
    //   queryParams.verificationStatusId = verificationStatusId;


    return queryParams;
  };

  useEffect(() => {

    // const { districtDetail, municipalityDetail, ulb, roles } = globalUser || {};

    // const queryParams = createQueryParamsDefault(
    //   0,
    //   100,
    //   districtDetail?.districtCode,
    //   municipalityDetail?.municipalId,
    //   ulb?.id,
    //   1
    // );
    dispatch(onHotelList(setLoader, 0, 20, filterData));

    // dispatch(onHotelList(setLoader,queryParams));
  }, []);

  //Testing Working Code
  const handleSendtoedit = (himParivarId, RationCard) => {

    // Construct the URL with query parameters
    const queryParam = new URLSearchParams({
      himParivarId,
      RationCard,
    }).toString();
    router.push(`/edit_modify?${queryParam}`);
  };
  // if (Loader) {
  //   return <CircularProgress />
  // }


  const selectStyles = { menu: (styles) => ({ ...styles, zIndex: 999 }) };
  const searchData = () => {
    dispatch(onHotelList(setLoader, 0, 20, filterData));

  }

    const downloadReport = () => {
      // const {selectedDistrict, selectedWard, selectedMunicipal} = tableData || {};
      dispatch(
        onSummaryReportDownload(filterData)
      )
    }

  console.log('familyList', familyList)
  return (
    <>
      <Layout>
        <Grid container spacing={4} style={{ flex: 1, padding: 20 }}>

          <Grid item xs={1.8}>
            <InputLabel
              style={{ marginBottom: 5 }}
              id="demo-simple-select-helper-label"
            >
              District{" "}
            </InputLabel>

            <Select
              styles={selectStyles}
              closeMenuOnSelect={true}
              value={filterData?.district || {}}
              options={districtOptions}
              onChange={(e) => handleChangeFilter(e, "district")}
              isDisabled={getdistrictCode() ? true : false}
            />
          </Grid>

          <Grid item xs={1.8}>
            <InputLabel
              style={{ marginBottom: 5 }}
              id="demo-simple-select-helper-label"
            >
              Tehsil{" "}
            </InputLabel>

            <Select
              styles={selectStyles}
              closeMenuOnSelect={true}
              value={filterData?.tehsil || {}}
              options={tehsilOptions}
              onChange={(e) => handleChangeFilter(e, "tehsil")}
              isDisabled={gettehsilCode() ? true : false}
            />
          </Grid>
          <Grid item xs={1.8}>
            <InputLabel
              style={{ marginBottom: 5 }}
              id="demo-simple-select-helper-label"
            >
              Patwar{" "}
            </InputLabel>

            <Select
              styles={selectStyles}
              closeMenuOnSelect={true}
              value={filterData?.patwar || {}}
              options={patwarOptions}
              onChange={(e) => handleChangeFilter(e, "patwar")}
              isDisabled={getPatwarCode() ? true : false}
            />
          </Grid>
          <Grid item xs={1.8}>
            <InputLabel
              style={{ marginBottom: 5 }}
              id="demo-simple-select-helper-label"
            >
              Village{" "}
            </InputLabel>

            <Select
              styles={selectStyles}
              closeMenuOnSelect={true}
              value={filterData?.village || {}}
              options={villageOptions}
              onChange={(e) => handleChangeFilter(e, "village")}
              isDisabled={getVillageCode() ? true : false}
            />
          </Grid>
          <Grid item xs={1.8}>
            <InputLabel
              style={{ marginBottom: 5 }}
              id="demo-simple-select-helper-label"
            >
              From Date
            </InputLabel>
            <DatePickerNew
              title=""
              type="date"
              name="fromDate"
              value={filterData?.fromDate || {}}
              onChange={(e) => handleChangeFilter(e, "fromDate")}
            />
          </Grid>
          <Grid item xs={1.8}>
            <InputLabel
              style={{ marginBottom: 5 }}
              id="demo-simple-select-helper-label"
            >
              To Date
            </InputLabel>
            <DatePickerNew
              title=""
              type="date"
              name="toDate"
              value={filterData?.toDate || {}}
              onChange={(e) => handleChangeFilter(e, "toDate")}
            />
          </Grid>
          <Grid item xs={1} mt={2}>
            <Button variant="contained" onClick={searchData}>Search</Button>
          </Grid>
        </Grid>
        {errorMessage && (
          <ErrorSnack open={open} setOpen={setOpen} message={errorMessage} />
        )}

        <Box
          style={{
            background: "#074465",
            color: "#FFF",
            // borderRadius: 6,
            // marginLeft: 20,
            // marginRight: 20,
          }}
        >
          <Typography
            fontSize={20}
            fontStyle={700}
            textAlign={"center"}
            style={{ paddingLeft: 10 }}
          >
            Survey Report


            <Button onClick={() => downloadReport()} variant="contained" color="primary" style={{ marginTop: "0px" }}>

              <DownloadIcon />   Download Excel

            </Button>


          </Typography>

        </Box>
        <main className="p-6 space-y-6">
          {Loader == true ? <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"70vh"}><CircularProgress /></Box> : <>
            {familyList &&
              familyList.content &&
              (familyList.content.length > 0) ? (
              <Grid container sx={{ background: "#FFF", borderRadius: 6 }}>
                <Grid
                  item={true}
                  xs={12}
                  md={12}
                  lg={12}
                  sx={{ background: "#FFF", borderRadius: 6 }}
                >
                  <div
                    style={{
                      display: "table",
                      tableLayout: "fixed",
                      width: "100%",
                      maxHeight: "400px",
                    }}
                  >
                    <Paper sx={{ width: "100%", overflow: "hidden" }}>
                      <TableContainer sx={{ height: "65vh" }}>
                        <Table stickyHeader aria-label="sticky table">
                          <TableHead>
                            <TableRow>
                              {columns &&
                                columns.map((column, index) => (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{
                                      minWidth: column.minWidth,
                                      background: "#074465",
                                      color: "#FFF",
                                    }}
                                  >
                                    {column.label}
                                  </TableCell>
                                ))}
                            </TableRow>
                          </TableHead>
                          {familyList?.content &&
                            familyList?.content.map((row, index2) => {
                              return (
                                <TableRow
                                  hover
                                  role="checkbox"
                                  tabIndex={-1}
                                  key={index2}
                                >
                                  {columns.map((column, index) => {
                                    const value = row[column.id];
                                    return (
                                      <TableCell
                                        className="hoverable-cell"
                                        key={column.id}
                                        align={column.align}
                                        fontWeight={column.fontWeight}
                                      >
                                        {column.format &&
                                          (typeof value === "number" || index == 6)
                                          ? column.format(value)
                                          : value}
                                        {index > 7 && (
                                          <>
                                            <Stack spacing={2} direction="row">
                                              {/* {isAdmin && (
                                                <Button
                                                  color="success"
                                                  startIcon={
                                                    <RemoveRedEyeIcon />
                                                  }
                                                  onClick={(handleEvent) => {

                                                    setSelectedItems(row);
                                                    setdetailCalled(true);
                                                    dispatch(
                                                      onFamiliesDetailApi(
                                                        row.himParivarId,
                                                        row.rationCardNo
                                                      )
                                                    );
                                                  }}
                                                >
                                                  View
                                                </Button>
                                              )}
                                              {isAdmin && (
                                                <Button
                                                  color="error"
                                                  startIcon={<ModeEditIcon />}
                                                  onClick={() =>
                                                    handleSendtoedit(
                                                      row.himParivarId,
                                                      row.rationCardNo
                                                    )
                                                  }
                                                >
                                                  Verify
                                                </Button>
                                              )} */}
                                              {/* {!isAdmin && ( */}
                                              <Button
                                                color="success"
                                                startIcon={
                                                  <RemoveRedEyeIcon />
                                                }
                                                onClick={(handleEvent) => {

                                                  setSelectedItems(row);
                                                  setdetailCalled(true);
                                                  setShowModal(true);
                                                  dispatch(
                                                    onHotelDetailApi(
                                                      row?.id, setLoading
                                                    )
                                                  );
                                                }}
                                              >
                                                View
                                              </Button>
                                              {/* )} */}
                                            </Stack>
                                          </>
                                        )}
                                      </TableCell>
                                    );
                                  })}
                                </TableRow>
                              );
                            })}
                        </Table>
                      </TableContainer>

                      <Box
                        style={{
                          padding: 10,
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                        }}
                      >
                        <Typography textAlign={"center"}>
                          Total Records Found: {familyList.totalElements}
                        </Typography>
                        <Pagination
                          style={{
                            padding: 10,
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                          count={totalPage}
                          page={page == 0 ? 1 : page}
                          onChange={handleChangePage}
                          color="primary"
                        />
                      </Box>
                    </Paper>
                  </div>
                </Grid>
              </Grid>
            ) : !Loader ? (
              <div>
                {/* This is the "else" case, modify as needed */}
                <p>No data available.</p>
              </div>
            ) : ""}


          </>}
          <div className="p-4 flex-grow">
            <Modal
              open={showModal}
              onClose={() => {
                setShowModal(false);
              }}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              {loading == true ? <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"90vh"}><CircularProgress /></Box> : <Box sx={style} className="modalMain">
                <div style={{}}   >
                  <Grid container   >
                    <Grid item={true} xs={11.5}   >
                      <AadharDetailsHeader selectedFamily={selectedFamily?.aadhaarDetails} />

                    </Grid>

                    <Grid
                      item={true}
                      xs={0.5}
                      style={{
                        justifyContent: "flex-end",
                        alignContent: "flex-end",
                        alignItems: "flex-end",
                      }}
                    >
                      <IconButton
                        aria-label="delete"
                        size="small"
                        onClick={() => { setShowModal(false); dispatch(fetchHotelDetSuccess({})); }}
                      >
                        <HighlightOffIcon fontSize="medium" />
                      </IconButton>
                    </Grid>
                  </Grid>

                  <Paper elevation={3} variant="elevation">
                    <Aadhar selectedFamily={selectedFamily?.aadhaarDetails} />
                  </Paper>

                  <Divider>&nbsp; &nbsp;</Divider>
                  {selectedFamily?.aadhaarDetails && <><Grid container>
                    <Grid item={true} xs={12}>
                      <CorpDetailsHeader />
                    </Grid>
                  </Grid>

                    <Paper elevation={3} variant="elevation">
                      <Corp selectedFamily={selectedFamily} />
                    </Paper></>}
                  <Divider>&nbsp; &nbsp;</Divider>
                  {selectedFamily?.cropDetails && <><Grid container>
                    <Grid item={true} xs={12}>
                      <CorpDetailsHeader />
                    </Grid>


                  </Grid>
                    {selectedFamily?.cropDetails &&
                      selectedFamily?.cropDetails.map((cropDetail, index) => (
                        <Paper elevation={3} variant="elevation" key={index}>
                          <Corp selectedFamily={cropDetail} />
                        </Paper>
                      ))}
                  </>}

                  {/* <Divider>&nbsp; &nbsp;</Divider> */}
                  {selectedFamily?.meters && <><Grid container>
                    <Grid item={true} xs={12}>
                      <MemberDetailsHeader />
                    </Grid>
                  </Grid>
                    {selectedFamily?.meters &&
                      selectedFamily?.meters.map((landRecord, index) => (
                        <Paper
                          elevation={3}
                          variant="elevation"
                          style={{ marginBottom: 8 }}
                          key={index}
                        >
                          <Members memberObject={landRecord} />
                        </Paper>
                      ))}</>}

                  <Divider>&nbsp; &nbsp;</Divider>
                  {getRationFamilyData && getRationFamilyData?.length > 0 && getRationFamilyData?.map(p => (<>
                    {p?.members && <>

                      <Grid container>
                        <Grid item={true} xs={12}>
                          <RationDetailsHeader number={p?.rationDetails?.rationCardNumber} />
                        </Grid>
                      </Grid>
                      {p &&
                        p?.members?.map((landRecord, index) => (
                          <Paper
                            elevation={3}
                            variant="elevation"
                            style={{ marginBottom: 8 }}
                            key={index}
                          >
                            <RationCardMembers memberObject={landRecord} />
                          </Paper>
                        ))}
                      <Divider>&nbsp; &nbsp;</Divider>
                    </>}
                  </>))}

                </div>





                {selectedFamily?.farmerConsentUrl && <> <Grid container>
                  <Grid item={true} xs={12}>
                    <ConsentDetailsHeader />
                  </Grid>


                </Grid>
                  <Paper elevation={3} variant="elevation">
                    {selectedFamily && (
                      <ConsentHeader selectedFamily={selectedFamily} />
                    )}
                  </Paper> </>}
              </Box>}
            </Modal>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default ViewDataHotel;
