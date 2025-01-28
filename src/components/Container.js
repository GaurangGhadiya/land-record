import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputLabel,
} from "@mui/material";
import Select from "react-select";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { TopCard } from "./TopCard";
import Filters from "./dashboard/filters";
import { onDashboarFilters } from "../network/actions/dashboardFilter";
import formatNumber from "../utils/NumberFormat";
import { getdistrictCode, getKanungoCode, getPatwarCode, gettehsilCode, getUserName, getVillageCode } from "../utils/cookie";
import { getDistrictApi } from "../network/actions/getDistrictApi";
import { getTehsilApi } from "../network/actions/getTehsilApi";
import { getPatwarApi } from "../network/actions/getPatwarApi";
import { getVillageApi } from "../network/actions/getVillageApi";
import DatePickerNew from "./DatePicker";
import Chart1 from "./Chart1";

const Dashboard = () => {
  /**
   * Dashboard Object
   */
  const [surveyInfo, setSurveyInfo] = useState([]);
  const [totalRecords, setTotalRecords] = useState([]);
  const [verificationInfoList, setVerificationInfoList] = useState([]);
  const [aadhaarEkycInfoList, setAadhaarEkycInfoList] = useState([]);
  const [economicCategoryInfoList, setEconomicCategoryInfoList] = useState([]);
  const [retainInInfoList, setRetainInInfoList] = useState([]);

  const [buildingData, setBuildingData] = useState([])
  const [hotelData, setHotelData] = useState([])
  const [Loader, setLoader] = useState(false)
  const [districtOptions, setDistrictOptions] = useState([])
  const [tehsilOptions, setTehsilOptions] = useState([])
  const [patwarOptions, setPatwarOptions] = useState([])
  const [villageOptions, setVillageOptions] = useState([])
  const [userName, setUserName] = useState("");
  const [filterData, setFilterData] = useState({
    district: "",
    tehsil: "",
   patwar: "",
    village: "",
  })
  const dispatch = useDispatch();
  const dashboardFilterState = useSelector(
    (state) => state.dashboardFilterRedux
  );
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


  useEffect(() => {

    dispatch(getDistrictApi())
    const divisionCode = getUserName();
    if (divisionCode) {

      setUserName(divisionCode)
    }


  }, [])


  const setDistrictData = async () => {
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
      console.log('divisionCode', divisionCode, typeof divisionCode)
      if (divisionCode) {
        setFilterData({
          ...filterData, district: {
            label: await districtListApi?.find(v => v?.lgdCode == divisionCode)?.nameE,
            value: divisionCode,
            code: divisionCode,
          }
        })
        dispatch(getTehsilApi(+divisionCode))

      }
    }
  }
 useEffect(() => {
       setDistrictData()
 }, [districtListApi]);

  const setTehsilData = async () => {
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
   setTehsilData()
 }, [tehsilListApi]);

  const setPatwatData = async () => {
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
      const divisionCode2 =await gettehsilCode();
      const divisionCode3 =await getKanungoCode();

      if (divisionCode) {
        setFilterData({
          ...filterData, patwar: {
            label: await patwarListApi?.find(v => v?.rmsPatwarId == divisionCode)?.nameE,
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
   setPatwatData()
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

      setFilterData({ ...filterData,  [name]: e })
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
      dispatch(onDashboarFilters(filterData, setLoader));
  }, []);

  useEffect(() => {
    if (dashboardFilterState?.data) {
      // const { data, status, message } = dashboardFilterState.data || {};
      if (dashboardFilterState?.data) {
        // Set the parsed data to state variables
        setSurveyInfo(dashboardFilterState?.data?.surveyInfoList);
        setTotalRecords(dashboardFilterState?.data?.totalRecordsList);
        setBuildingData(dashboardFilterState?.data?.buldingSurveyInfo);
        setHotelData(dashboardFilterState?.data?.hotelSurveyInfo);
        setVerificationInfoList(dashboardFilterState?.data?.verificationInfoList);
        setAadhaarEkycInfoList(dashboardFilterState?.data?.aadhaarEkycInfoList);
        setEconomicCategoryInfoList(dashboardFilterState?.data?.economicCategoryInfoList);
        setRetainInInfoList(dashboardFilterState?.data?.retainInInfoList);
      } else {
        console.warn("No data in dashboardFilterState");
      }
    } else {
      console.warn("No data in dashboardFilterState");
    }
  }, [dashboardFilterState]);

  // if (Loader) {
  //   return <p>fsdf</p>;
  // }

  const selectStyles = { menu: (styles) => ({ ...styles, zIndex: 999 }) };
  const searchData = () => {
    dispatch(onDashboarFilters(filterData, setLoader));
        // if (filterData?.division && filterData?.subDivision && filterData?.fromDate && filterData?.toDate) {

        //     // dispatch(onConsumerSummaryReport(filterData, 0, setLoading));
        // } else {


        // }
    }
  return (
    surveyInfo?.length > 0 ? <>
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
      {/* <Filters onChange={handleFilterChange} /> */}
      {Loader == true ? <Box display={"flex"} alignItems={"center"} justifyContent={"center"} height={"70vh"}><CircularProgress /></Box> :<main className="p-6 space-y-6">
        {totalRecords?.length > 0 && (
          <>
            <Box
              style={{ background: "#074465", color: "#FFF", borderRadius: 6 }}
            >
              <Typography
                fontSize={20}
                fontStyle={700}
                textAlign={"left"}
                style={{ paddingLeft: 10 }}
              >
                Total Records
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TopCard
                  top_header_data={totalRecords.map((item) => ({
                    label: item.headerName.toUpperCase(),
                    value: item.headerValueCount ? formatNumber(item.headerValueCount) : 0,
                    color: "red", // You can customize this color based on your requirements
                  }))}
                />
              </Grid>
            </Grid>
          </>
        )}
        {surveyInfo?.length > 0 && (
          <>
            <Box
              style={{ background: "#074465", color: "#FFF", borderRadius: 6 }}
            >
              <Typography
                fontSize={20}
                fontStyle={700}
                textAlign={"left"}
                style={{ paddingLeft: 10 }}
              >
                Survey Status
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TopCard
                  top_header_data={surveyInfo.map((item) => ({
                    label: item.headerName.toUpperCase(),
                    value: item.headerValueCount ? formatNumber(item.headerValueCount) : 0,
                    color: "red", // You can customize this color based on your requirements
                  }))}
                />
              </Grid>
            </Grid>
          </>
        )}

        {hotelData?.length > 0 && (
          <>
            <Box
              style={{ background: "#074465", color: "#FFF", borderRadius: 6 }}
            >
              <Typography
                fontSize={20}
                fontStyle={700}
                textAlign={"left"}
                style={{ paddingLeft: 10 }}
              >
                Hotel Survey
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TopCard
                  top_header_data={hotelData.map((item) => ({
                    label: item.headerName.toUpperCase(),
                    value: item.headerValueCount ? formatNumber(item.headerValueCount) : 0,
                    color: "red", // You can customize this color based on your requirements
                  }))}
                />
              </Grid>
            </Grid>
          </>
        )}
        {buildingData?.length > 0 && (
          <>
            <Box
              style={{ background: "#074465", color: "#FFF", borderRadius: 6 }}
            >
              <Typography
                fontSize={20}
                fontStyle={700}
                textAlign={"left"}
                style={{ paddingLeft: 10 }}
              >
                Domestic Consumers Survey
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TopCard
                  top_header_data={buildingData.map((item) => ({
                    label: item.headerName.toUpperCase(),
                    value: item.headerValueCount ? formatNumber(item.headerValueCount) : 0,
                    color: "red", // You can customize this color based on your requirements
                  }))}
                />
              </Grid>
            </Grid>
          </>
        )}
        {verificationInfoList?.length > 0 && (
          <>
            <Box
              style={{ background: "#074465", color: "#FFF", borderRadius: 6 }}
            >
              <Typography
                fontSize={20}
                fontStyle={700}
                textAlign={"left"}
                style={{ paddingLeft: 10 }}
              >
                Verification Status
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TopCard
                  top_header_data={verificationInfoList.map((item) => ({
                    label: item.headerName.toUpperCase(),
                    value: item.headerValueCount ? item.headerValueCount : 0,
                    color: "red", // You can customize this color based on your requirements
                  }))}
                />
              </Grid>
            </Grid>
          </>
        )}

        {aadhaarEkycInfoList?.length > 0 && (
          <>
            <Box
              style={{ background: "#074465", color: "#FFF", borderRadius: 6 }}
            >
              <Typography
                fontSize={20}
                fontStyle={700}
                textAlign={"left"}
                style={{ paddingLeft: 10 }}
              >
                Aadhaar eKYC Status
              </Typography>
            </Box>

            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TopCard
                  top_header_data={aadhaarEkycInfoList.map((item) => ({
                    label: item.headerName.toUpperCase(),
                    value: item.headerValueCount ? item.headerValueCount : 0,
                    color: "red", // You can customize this color based on your requirements
                  }))}
                />
              </Grid>
            </Grid>
          </>
        )}



      {economicCategoryInfoList?.length > 0 && (
          <>
            <Box
              style={{ background: "#074465", color: "#FFF", borderRadius: 6 }}
            >
              <Typography
                fontSize={20}
                fontStyle={700}
                textAlign={"left"}
                style={{ paddingLeft: 10 }}
              >
                Economic Status (Family)
              </Typography>
            </Box>

            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TopCard
                  top_header_data={economicCategoryInfoList.map((item) => ({
                    label: item.headerName.toUpperCase(),
                    value: item.headerValueCount ? item.headerValueCount : 0,
                    color: "red", // You can customize this color based on your requirements
                  }))}
                />
              </Grid>
            </Grid>
          </>
        )}



      {retainInInfoList?.length > 0 && (
          <>
            <Box
              style={{ background: "#074465", color: "#FFF", borderRadius: 6 }}
            >
              <Typography
                fontSize={20}
                fontStyle={700}
                textAlign={"left"}
                style={{ paddingLeft: 10 }}
              >
               Urban / Rural Family Retention  Status
              </Typography>
            </Box>

            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TopCard
                  top_header_data={retainInInfoList.map((item) => ({
                    label: item.headerName.toUpperCase(),
                    value: item.headerValueCount ? item.headerValueCount : 0,
                    color: "red", // You can customize this color based on your requirements
                  }))}
                />
              </Grid>
            </Grid>
          </>
        )}

        {userName == "Admin" &&
          <Chart1  />
        }
      </main>}
    </> : <Box display={"flex"} alignItems={"center"} justifyContent={"center"} height={"90vh"}><CircularProgress /></Box>
  );
};

export default Dashboard;
