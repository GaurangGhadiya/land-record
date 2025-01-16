"use client";
import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "../components/Container";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import withAuth from "../utils/withAuth";
import { onDashboard } from "../network/actions/dashboard";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/dashboard/layout";
import { DataGrid } from "@mui/x-data-grid";
import { Alert, Button, CircularProgress, Grid, InputLabel, Paper, Snackbar } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import Pagination from "@mui/material/Pagination";

import TableRow from "@mui/material/TableRow";

import { getdivisionCode, getdivisionName, getsubDivisionCode, getsubDivisionName, getToken, removeToken } from "../utils/cookie";
import { useRouter } from "next/router";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import Filters from "../components/dashboard/filters";
import { onDashboarFilters } from "../network/actions/dashboardFilter";
import {
    CollectionsBookmark,
    Edit,
    Feedback,
    Help,
    PermMedia,
    UploadFile,
    Work,
} from "@mui/icons-material";
import { onSummaryReport } from "../network/actions/summaryReport";
import DownloadIcon from '@mui/icons-material/Download';
import { onSummaryReportDownload } from "../network/actions/downloadSummaryReport";
import TableData from "../components/TableData";
import DatePickerNew from "../components/DatePicker";
import { downloadData } from "../network/actions/downloadData";
import Select from "react-select";
import { getDivision } from "../network/actions/getDivision";
import { getSubDivision } from "../network/actions/getSubDivision";
import { onConsumerSummaryReport, onConsumerSummaryReportSuccess } from "../network/actions/onConsumerSummaryReport";
import ConsumerTable from "../components/TableData/ConsumerTable";


const drawWidth = 220;

const SurveySummary = (props) => {
    /**Handle Filters and Call the External Service */
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedMunicipality, setSelectedMunicipality] = useState(null);
    const [selectedWard, setSelectedWard] = useState(null);
    const [filterData, setFilterData] = useState();
    const [divisionList, setdivisionList] = useState([]);
    const [page, setPage] = useState(0);
    const [subDivision, setSubDivision] = useState([]);
    const [message, setMessage] = React.useState("");
    const [showAlert, setShowAlert] = React.useState(false);


    const [tableData, setTableData] = useState([]);
    const [totalRecord, setTotalRecord] = useState(0);
    const [totalPage, setTotalPage] = useState(0)
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch();
    const summaryReportDashboard = useSelector(
        (state) => state.onConsumerSummaryReport
    );

    const getDivisionList = useSelector(
        (state) => state.division_reducer?.data
    );
    const getSubDivisionList = useSelector(
        (state) => state.sub_division_reducer?.data
    );

    useEffect(() => {
        dispatch(getDivision())
        return (() => {
            dispatch(onConsumerSummaryReportSuccess([]));

})

    }, [])
    // useEffect(() => {
    //     // setPage(0)
    //     dispatch(onSummaryReport(filterData, 0, setLoading));

    // }, [filterData])

    const searchData = () => {
        if (filterData?.division && filterData?.subDivision && filterData?.fromDate && filterData?.toDate) {

            dispatch(onConsumerSummaryReport(filterData, 0, setLoading));
        } else {


        }
    }

    const handleChangePage = (e) => {
        setPage(e)
        dispatch(onConsumerSummaryReport(filterData, e - 1, setLoading));
    }
    useEffect(() => {
        let division_list = [];

        if (getDivisionList) {
            if (getDivisionList) {
                division_list.push({
                    label: "-- Please Select -- ",
                    value: null,
                    id: null,
                });

                for (let i = 0; i < getDivisionList.length; i++) {
                    let object = {
                        label: getDivisionList[i].divisionName,
                        value: getDivisionList[i].divisionCode,
                        id: getDivisionList[i].divisionCode,
                    };
                    division_list.push(object);
                    // if (ulbData.wardNo === data[i].wardNo) {
                    //   setward(object);
                    //   setwardId(object);
                    // }
                }
                setdivisionList(division_list);
            }
            const divisionCode = getdivisionCode();
            const divisionName = getdivisionName();
            if (divisionCode) {
                setFilterData({
                    ...filterData, division: {
                        label: divisionName,
                        value: divisionCode,
                        code: divisionCode,
                    }
                })
                dispatch(getSubDivision({
                    label: divisionName,
                    value: divisionCode,
                    code: divisionCode,
                }))
            }
        }
    }, [getDivisionList]);
    useEffect(() => {
        let sub_division_list = [];

        if (getSubDivisionList) {
            if (getSubDivisionList) {
                sub_division_list.push({
                    label: "-- Please Select -- ",
                    value: null,
                    id: null,
                });

                for (let i = 0; i < getSubDivisionList.length; i++) {
                    let object = {
                        label: getSubDivisionList[i].subDivisionName,
                        value: getSubDivisionList[i].subDivisionCode,
                        id: getSubDivisionList[i].subDivisionCode,
                    };
                    sub_division_list.push(object);
                    // if (ulbData.wardNo === data[i].wardNo) {
                    //   setward(object);
                    //   setwardId(object);
                    // }
                }
                setSubDivision(sub_division_list);
            }
            const subDivisionCode = getsubDivisionCode();
            const subDivisionName = getsubDivisionName();
            const divisionCode = getdivisionCode();
            const divisionName = getdivisionName();

            if (subDivisionCode) {
                setFilterData({
                    ...filterData, subDivision: {
                        label: subDivisionName,
                        value: subDivisionCode,
                        code: subDivisionCode,
                    },
                    division: {
                        label: divisionName,
                        value: divisionCode,
                        code: divisionCode,
                    }
                })

            }
        }
    }, [getSubDivisionList]);








    useEffect(() => {
        setTableData(summaryReportDashboard?.data?.content);
        setTotalPage(summaryReportDashboard?.data?.totalPages)
        setTotalRecord(summaryReportDashboard?.data?.totalElements)
        if (summaryReportDashboard?.data?.content?.length > 0) {
            setMessage("")
        } else if (summaryReportDashboard?.data?.size) {
            setMessage("No Data Found")
        }

        if (summaryReportDashboard?.data) {
            const { data, status, message } = summaryReportDashboard.data || {};
            if (status === "OK" && message === "SUCCESS") {
                if (data.jurisdictionReport) {
                    const filteredHeaders = data.jurisdictionReport.headers.filter(
                        (header) => header !== "Municipality Id" && header !== "Ward Id"
                    );
                    const containsDistrict = filteredHeaders.includes("District");

                    const rowData = Object.entries(data.jurisdictionReport.data).map(
                        ([municipalityName, info]) => {
                            // Here the if-else block is used correctly
                            if (containsDistrict) {
                                // Return object with a certain structure if the condition is true
                                return {
                                    municipalityName,
                                    district: info.district,
                                    population: info.population,
                                    familyCount: info.familyCount,
                                    memberCount: info.memberCount,
                                    completionPercentage: info.completionPercentage

                                };
                            } else {

                                if (info.population) {
                                    return {
                                        municipalityName,
                                        population: info.population,
                                        familyCount: info.familyCount,
                                        memberCount: info.memberCount,
                                        completionPercentage: info.completionPercentage
                                    };
                                } else {

                                    return {
                                        municipalityName,
                                        familyCount: info.familyCount,
                                        memberCount: info.memberCount
                                    };

                                }


                            }
                        }
                    );

                    // setTableData({ filteredHeaders, rowData });
                    // setTableData(summaryReportDashboard?.data?.content);
                } else {
                    console.warn("Unable to read Data");
                }
            } else {
                console.warn("No data in dashboardFilterState");
            }
        } else {
            console.warn("No data in dashboardFilterState");
        }
    }, [summaryReportDashboard]);

    const handleChangeFilter = (e, name) => {
        if (name == "toDate") {
            setFilterData({ ...filterData, [name]: e.target.value })

        }
        else if (name == "fromDate") {
            setFilterData({ ...filterData, [name]: e.target.value })

        }
        else if (name == "division") {
            setFilterData({ ...filterData, subDivision: "", [name]: e })
            dispatch(getSubDivision(e))

        }
        else if (name == "subDivision") {
            setFilterData({ ...filterData, [name]: e })
        }
        else if (name == "type") {
            setFilterData({ [name]: e })
        }

    }


    const selectStyles = { menu: (styles) => ({ ...styles, zIndex: 999 }) };



    return (

        <Layout>


            <Grid container spacing={4} style={{ flex: 1, padding: 20 }}>

                <Grid item xs={3}>
                    <InputLabel
                        style={{ marginBottom: 5 }}
                        id="demo-simple-select-helper-label"
                    >
                        Division{" "}
                    </InputLabel>

                    <Select
                        styles={selectStyles}
                        closeMenuOnSelect={true}
                        value={filterData?.division || {}}
                        options={divisionList}
                        onChange={(e) => handleChangeFilter(e, "division")}
                        isDisabled={getdivisionCode() ? true : false}
                    />
                </Grid>
                <Grid item xs={3}>
                    <InputLabel
                        style={{ marginBottom: 5 }}
                        id="demo-simple-select-helper-label"
                    >
                        Sub Division{" "}
                    </InputLabel>

                    <Select
                        styles={selectStyles}
                        closeMenuOnSelect={true}
                        value={filterData?.subDivision || {}}
                        options={subDivision}
                        onChange={(e) => handleChangeFilter(e, "subDivision")}
                        // isDisabled={selectDisabledDistrict}
                        isDisabled={getsubDivisionCode() ? true : false}
                    />
                </Grid>
                <Grid item xs={2}>
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
                <Grid item xs={2}>
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
                <Grid item xs={2} mt={2}>
          <Button variant="contained" onClick={searchData}>Search</Button>
        </Grid>
            </Grid>

            {loading == true ? <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"90vh"}><CircularProgress /></Box> :

                 tableData?.length > 0 && filterData?.division && filterData?.subDivision && filterData?.fromDate && filterData?.toDate && <ConsumerTable tableData={tableData} selectedDistrict={selectedDistrict} selectedWard={selectedWard}
                    selectedMunicipal={selectedMunicipality} props={props} filterData={filterData} totalPage={totalPage} totalRecord={totalRecord} handleChangePage={handleChangePage} page={page} />
        }
        {message && <Box display={"flex"} justifyContent={"center"} alignItems={"center"} mt={5}>{ message}</Box>}


        </Layout>
    );
};



export default withAuth(SurveySummary);
