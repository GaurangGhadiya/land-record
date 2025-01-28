import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import React, { useEffect, useState } from 'react'
import { Box, Card, CircularProgress, Grid, InputLabel, Typography } from '@mui/material';
import { getTehsilApi } from '../network/actions/getTehsilApi';
import { useDispatch, useSelector } from 'react-redux';
import Select from "react-select";
import { getdistrictCode, gettehsilCode } from '../utils/cookie';
import { onChartDataFilters } from '../network/actions/onChartData';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
    responsive: true,
    maintainAspectRatio: false, // Ensure the chart uses the full size of the container
    plugins: {
        legend: {
            // position: 'top',
            display: false
        },
        tooltip: {
            callbacks: {
                label: function (tooltipItem) {
                    return `Total Count: ${tooltipItem.raw}`;
                },
            },
        },
        // title: {
        //   display: true,
        //   text: 'Monthly Sales Data',
        // },
    },
    animation: {
        duration: 1000, // Animation duration in milliseconds
        easing: 'easeOutBounce', // Animation easing
    },
    scales: {
        x: {
            beginAtZero: true,
            grid: {
                display: false, // Remove vertical grid lines
            },
        },
        y: {
            beginAtZero: true,
            grid: {
                display: false, // Remove vertical grid lines
            },
            // ticks: {
            //   callback: function(value) {
            //     // Format y-axis ticks to integer
            //     return Number(value).toFixed(0);
            //   },
            // },

        },
    },
};


const Chart1 = () => {
    const dispatch = useDispatch()
      const districtListApi = useSelector(
        (state) => state.districtReducer?.data
      );
      const tehsilListApi = useSelector(
        (state) => state.tehsilReducer?.data
      );
    const getGenderReportData = useSelector(
          (state) => state.onChartDataRedux?.data
    );
    console.log('getGenderReportData', getGenderReportData)
      const [Loader, setLoader] = useState(false)

    // const [getGenderReportData, setGetGenderReportData] = useState({});
 const [districtOptions, setDistrictOptions] = useState([])
  const [tehsilOptions, setTehsilOptions] = useState([])
    const [filterData, setFilterData] = useState({
        district: "",
        tehsil: "",
    })
    const selectStyles = { menu: (styles) => ({ ...styles, zIndex: 999 }) };

     useEffect(() => {
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
              const divisionCode = getdistrictCode();
              console.log('divisionCode', divisionCode, typeof divisionCode)
                if (divisionCode) {
                    setFilterData({
                        ...filterData, district: {
                        label: districtListApi?.find(v => v?.lgdCode == divisionCode)?.nameE,
                            value: divisionCode,
                            code: divisionCode,
                        }
                    })
                  dispatch(getTehsilApi(+divisionCode))

                }
            }
     }, [districtListApi]);
     useEffect(() => {
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
              const divisionCode = gettehsilCode();
              console.log('tehsil', divisionCode)
                if (divisionCode) {
                    setFilterData({
                        ...filterData, tehsil: {
                        label: tehsilListApi?.find(v => v?.lgdCode == divisionCode)?.nameE,
                            value: divisionCode,
                            code: divisionCode,
                        }
                    })
                //   dispatch(getPatwarApi(+divisionCode))

                }
            }
     }, [tehsilListApi]);

    const handleChangeFilter = (e, name) => {
        console.log('e123', e, name)
        if (name == "district") {
            setFilterData({ ...filterData, [name]: e, tehsil : '' })
            dispatch(onChartDataFilters({ ...filterData, [name]: e }, setLoader));

            dispatch(getTehsilApi(e?.value))

        }
        else if (name == "tehsil") {
            setFilterData({ ...filterData, [name]: e })
            dispatch(onChartDataFilters({ ...filterData, [name]: e }, setLoader));

            //   dispatch(getPatwarApi(e?.value))

        }
    }

  useEffect(() => {
      dispatch(onChartDataFilters(filterData, setLoader));
  }, []);
    const Chartdata = {
        labels: getGenderReportData?.map(v => v?.date) || [],
        datasets: [
            {
                label: 'Sales',
                data: getGenderReportData?.map(v => v?.count) || [],
                backgroundColor: [
                    '#22CFCF',
                    '#FF6384',
                    '#059BFF',

                ],
                // borderColor: '',
                borderWidth: 0,
            },
        ],
    };
    return (<>
        <Card backgroundColor="white" p={2}
            elevation={10}
                sx={{
                alignItems: "center",
                backgroundColor: "#FFF",
                borderRadius: 1,
                    p: 2,

            }}>
            <Grid container spacing={2} mb={2}>

                <Grid item xs={8}></Grid>
                <Grid item xs={2}>
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
                        // isDisabled={getdistrictCode() ? true : false}
                    />
                </Grid>

                <Grid item xs={2}>
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
                    // isDisabled={gettehsilCode() ? true : false}
                    />
                </Grid>
            </Grid>

            {/* <Typography color={"#858796"} fontSize={16} mb={2}>Gender Wise</Typography> */}
            {Loader == true ? <Box display={"flex"} alignItems={"center"} justifyContent={"center"} height={"400px"}><CircularProgress /></Box> :
                <div style={{ width: "100%", height: "400px" }}>
                <Bar data={Chartdata} options={options} />
            </div>}
        </Card>
    </>
    )
}

export default Chart1
