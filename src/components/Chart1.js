import React, { useEffect, useState } from 'react';
import { Box, Card, CircularProgress, Grid, InputLabel, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import the plugin
import { useDispatch, useSelector } from 'react-redux';
import Select from "react-select";
import { getTehsilApi } from '../network/actions/getTehsilApi';
import { getdistrictCode, getKanungoCode, getPatwarCode, gettehsilCode } from '../utils/cookie';
import { onChartDataFilters } from '../network/actions/onChartData';
import { getPatwarApi } from '../network/actions/getPatwarApi';
import { getVillageApi } from '../network/actions/getVillageApi';

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
                offset: 5
            },
        },
    },
};





const Chart1 = () => {
    const dispatch = useDispatch();
    const districtListApi = useSelector((state) => state.districtReducer?.data);
    const tehsilListApi = useSelector((state) => state.tehsilReducer?.data);
    const getGenderReportData = useSelector((state) => state.onChartDataRedux?.data);
    const patwarListApi = useSelector(
        (state) => state.patwarReducer?.data
    );
    const [Loader, setLoader] = useState(false);
    const [districtOptions, setDistrictOptions] = useState([]);
    const [tehsilOptions, setTehsilOptions] = useState([]);
    const [patwarOptions, setPatwarOptions] = useState([])

    const [filterData, setFilterData] = useState({
        district: "",
        tehsil: "",
        patwar: ""
    });

    console.log('districtListApi', districtListApi)
    console.log('filterData', filterData)

    const setData = async () => {
        const divisionCode = await getdistrictCode();
        const divisionCode2 = await gettehsilCode();
        const divisionCode3 = await getPatwarCode();


        setFilterData({
            ...filterData, district: {
                label: await districtListApi?.find(v => v?.lgdCode == divisionCode)?.nameE,
                value: divisionCode,
                code: divisionCode,
            },
            tehsil: {
                label: await tehsilListApi?.find(v => v?.lgdCode == divisionCode2)?.nameE,
                value: divisionCode2,
                code: divisionCode2,
            },
            patwar: {
                label: await patwarListApi?.find(v => v?.rmsPatwarId == divisionCode3)?.nameE,
                value: divisionCode3,
                code: divisionCode3,
            }
        })

        dispatch(onChartDataFilters({
            ...filterData, district: {
                label: await districtListApi?.find(v => v?.lgdCode == divisionCode)?.nameE,
                value: divisionCode,
                code: divisionCode,
            },
            tehsil: {
                label: await tehsilListApi?.find(v => v?.lgdCode == divisionCode2)?.nameE,
                value: divisionCode2,
                code: divisionCode2,
            },
            patwar: {
                label: await patwarListApi?.find(v => v?.rmsPatwarId == divisionCode3)?.nameE,
                value: divisionCode3,
                code: divisionCode3,
            }
        }, setLoader));

    }

    useEffect(() => {
        const divisionCode =  getdistrictCode();
        if (divisionCode) {

            setData()
        } else {

            dispatch(onChartDataFilters(filterData, setLoader));
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
        // if (divisionCode) {
        //   setFilterData({
        //     ...filterData, district: {
        //       label: await districtListApi?.find(v => v?.lgdCode == divisionCode)?.nameE,
        //       value: divisionCode,
        //       code: divisionCode,
        //     }
        //   })
        // //   dispatch(getTehsilApi(+divisionCode))

        // }
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
        // if (divisionCode) {
        //   setFilterData({
        //     ...filterData, tehsil: {
        //       label:await tehsilListApi?.find(v => v?.lgdCode == divisionCode)?.nameE,
        //       value: divisionCode,
        //       code: divisionCode,
        //     }
        //   })
        //   dispatch(getPatwarApi(+divisionCode))

        // }
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
            const divisionCode = await getPatwarCode();
              const divisionCode2 =await gettehsilCode();
              const divisionCode3 =await getKanungoCode();

            // if (divisionCode) {
            //     setFilterData({
            //         ...filterData, patwar: {
            //             label: await patwarListApi?.find(v => v?.rmsPatwarId == divisionCode)?.nameE,
            //             value: divisionCode,
            //             code: divisionCode,
            //         }
            //     })
            //     // dispatch(getVillageApi(+divisionCode, +divisionCode2, +divisionCode3))
            //     // searchData()
            // }
        }
    }
    useEffect(() => {
        setPatwatData()
    }, [patwarListApi]);

    const handleChangeFilter = (e, name) => {
        if (name === "district") {
            setFilterData({ ...filterData, [name]: e , tehsil : '', patwar : ''});
            dispatch(onChartDataFilters({ ...filterData, [name]: e, tehsil: '', patwar: '' }, setLoader));
            dispatch(getTehsilApi(e?.value));
        } else if (name === "tehsil") {
            setFilterData({ ...filterData,  [name]: e, patwar : ''});
            dispatch(getPatwarApi(e?.value))

            dispatch(onChartDataFilters({ ...filterData,  [name]: e , patwar : ''}, setLoader));
        }
        else if (name == "patwar") {
            // const divisionCode3 = getKanungoCode();
            setFilterData({ ...filterData, [name]: e })
            dispatch(onChartDataFilters({ ...filterData, [name]: e }, setLoader));
            // dispatch(getVillageApi(e?.value, filterData?.tehsil?.value, divisionCode3))

        }
    };

    useEffect(() => {
        // dispatch(onChartDataFilters(filterData, setLoader));
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
                <Grid item xs={6}></Grid>
                <Grid item xs={2}>
                    <InputLabel style={{ marginBottom: 5 }} id="demo-simple-select-helper-label">District</InputLabel>
                    <Select
                        styles={{ menu: (styles) => ({ ...styles, zIndex: 999 }) }}
                        closeMenuOnSelect={true}
                        value={filterData?.district || {}}
                        options={districtOptions}
                        onChange={(e) => handleChangeFilter(e, "district")}
                        isDisabled={getdistrictCode() ? true : false}

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
                        isDisabled={gettehsilCode() ? true : false}

                    />
                </Grid>
                <Grid item xs={2}>
                    <InputLabel
                        style={{ marginBottom: 5 }}
                        id="demo-simple-select-helper-label"
                    >
                        Patwar{" "}
                    </InputLabel>

                    <Select
                        styles={{ menu: (styles) => ({ ...styles, zIndex: 999 }) }}
                        closeMenuOnSelect={true}
                        value={filterData?.patwar || {}}
                        options={patwarOptions}
                        onChange={(e) => handleChangeFilter(e, "patwar")}
                        isDisabled={getPatwarCode() ? true : false}
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
