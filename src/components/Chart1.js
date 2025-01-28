import React, { useEffect, useState } from 'react';
import { Box, Card, CircularProgress, Grid, InputLabel, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import the plugin
import { useDispatch, useSelector } from 'react-redux';
import Select from "react-select";
import { getTehsilApi } from '../network/actions/getTehsilApi';
import { getdistrictCode, gettehsilCode } from '../utils/cookie';
import { onChartDataFilters } from '../network/actions/onChartData';

// Register ChartJS components and plugin
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            callbacks: {
                label: function (tooltipItem) {
                    return `Total Count: ${new Intl.NumberFormat('en-IN').format(tooltipItem.raw)}`;
                },
            },
        },
        datalabels: {
            color: '#000',
            font: {
                weight: 'bold',
                size: 12,
            },
            formatter: (value) => new Intl.NumberFormat('en-IN').format(value),
            position: 'top',  // Force the labels to be on top
            align: 'center',  // Center the labels horizontally
            anchor: 'end',    // Anchor the label at the top end of the bar
            offset: 10,       // Create space above the bar
            padding: {
                top: 15,       // Ensure space above the bar
                bottom: 10     // No padding below the bar
            },
        },
    },
    scales: {
        x: {
            beginAtZero: true,
            grid: {
                display: false,
            },
        },
        y: {
            beginAtZero: true,
            grid: {
                display: false,
            },
            ticks: {
                // Format the Y-axis labels with a comma separator
                callback: function (value) {
                    return new Intl.NumberFormat('en-IN').format(value);  // Format y-axis labels with commas
                },
                padding: 10,  // Add some padding to avoid conflict with data labels
                offset:5
            },
        },
    },
};





const Chart1 = () => {
    const dispatch = useDispatch();
    const districtListApi = useSelector((state) => state.districtReducer?.data);
    const tehsilListApi = useSelector((state) => state.tehsilReducer?.data);
const getGenderReportData = useSelector((state) => state.onChartDataRedux?.data);
const [Loader, setLoader] = useState(false);
const [districtOptions, setDistrictOptions] = useState([]);
const [tehsilOptions, setTehsilOptions] = useState([]);
const [filterData, setFilterData] = useState({
    district: "",
    tehsil: "",
});

useEffect(() => {
    let district_list = [];
    if (districtListApi) {
        districtListApi.forEach((item) => {
            let object = {
                label: item.nameE,
                value: item.lgdCode,
                id: item.lgdCode,
            };
            district_list.push(object);
        });
        setDistrictOptions(district_list);
        const divisionCode = getdistrictCode();
        if (divisionCode) {
            setFilterData({
                ...filterData,
                district: {
                    label: districtListApi.find((v) => v.lgdCode == divisionCode)?.nameE,
                    value: divisionCode,
                    code: divisionCode,
                },
            });
            dispatch(getTehsilApi(+divisionCode));
        }
    }
}, [districtListApi]);

useEffect(() => {
    let tehsil_list = [];
    if (tehsilListApi) {
        tehsilListApi.forEach((item) => {
            let object = {
                label: item.nameE,
                value: item.lgdCode,
                id: item.lgdCode,
            };
            tehsil_list.push(object);
        });
        setTehsilOptions(tehsil_list);
        const divisionCode = gettehsilCode();
        if (divisionCode) {
            setFilterData({
                ...filterData,
                tehsil: {
                    label: tehsilListApi.find((v) => v.lgdCode == divisionCode)?.nameE,
                    value: divisionCode,
                    code: divisionCode,
                },
            });
        }
    }
}, [tehsilListApi]);

const handleChangeFilter = (e, name) => {
    if (name === "district") {
        setFilterData({ ...filterData, [name]: e, tehsil: '' });
        dispatch(onChartDataFilters({ ...filterData, [name]: e }, setLoader));
        dispatch(getTehsilApi(e?.value));
    } else if (name === "tehsil") {
        setFilterData({ ...filterData, [name]: e });
        dispatch(onChartDataFilters({ ...filterData, [name]: e }, setLoader));
    }
};

useEffect(() => {
    dispatch(onChartDataFilters(filterData, setLoader));
}, []);

const Chartdata = {
    labels: getGenderReportData?.map((v) => v?.date) || [],
    datasets: [
        {
            label: 'Sales',
            data: getGenderReportData?.map((v) => v?.count) || [],
            backgroundColor: ['#22CFCF', '#FF6384', '#059BFF'],
            borderWidth: 0,
        },
    ],
};

return (
    <Card backgroundColor="white" p={2} elevation={10} sx={{ alignItems: "center", backgroundColor: "#FFF", borderRadius: 1, p: 2 }}>
        <Grid container spacing={2} mb={2}>
            <Grid item xs={8}></Grid>
            <Grid item xs={2}>
                <InputLabel style={{ marginBottom: 5 }} id="demo-simple-select-helper-label">District</InputLabel>
                <Select
                    styles={{ menu: (styles) => ({ ...styles, zIndex: 999 }) }}
                    closeMenuOnSelect={true}
                    value={filterData?.district || {}}
                    options={districtOptions}
                    onChange={(e) => handleChangeFilter(e, "district")}
                />
            </Grid>

            <Grid item xs={2}>
                <InputLabel style={{ marginBottom: 5 }} id="demo-simple-select-helper-label">Tehsil</InputLabel>
                <Select
                    styles={{ menu: (styles) => ({ ...styles, zIndex: 999 }) }}
                    closeMenuOnSelect={true}
                    value={filterData?.tehsil || {}}
                    options={tehsilOptions}
                    onChange={(e) => handleChangeFilter(e, "tehsil")}
                />
            </Grid>
        </Grid>

        {Loader ? (
            <Box display={"flex"} alignItems={"center"} justifyContent={"center"} height={"400px"}>
                <CircularProgress />
            </Box>
        ) : (
            <div style={{ width: "100%", height: "400px" }}>
                <Bar data={Chartdata} options={options} />
            </div>
        )}
    </Card>
);
};

export default Chart1;
