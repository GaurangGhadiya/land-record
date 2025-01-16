import React, { useEffect, useState } from 'react'
import Layout from '../components/dashboard/layout'
import StatisticsCard from './StatisticsCard';
import { Box, Card, Grid, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axiosInstance from '../network/api';
import { decryptData } from '../utils/encryptDecrypt';
import { CircularProgress } from '@mui/material';
import formatNumber from "../utils/NumberFormat"

const AnalyticsDashboard = () => {
    const [data, setData] = useState({})
    useEffect(() => {
        const getData =async () => {
            const response = await axiosInstance.get("/dashboard/survey/meter-summary");

            let resData = decryptData(response?.data?.data)
            setData(resData)
        }
        getData()
    }, [])

    return (
        <Layout>
          {data && Object.keys(data)?.length > 0 ?  <main className="p-6 space-y-6">
                <Box
                    sx={{
                        gap: 3,
                        display: "grid",
                        gridTemplateColumns: {
                            md: "repeat(3, 1fr)",
                            sm: "repeat(2, 1fr)",
                            xs: "repeat(1, 1fr)",
                        },
                    }}
                >

                    <Card
                        elevation={10}
                        sx={{
                            alignItems: "center",
                            backgroundColor: "#FFF",
                            borderRadius: 1,
                            p: 2,
                            "&:hover": {
                                transform: "scale(1.03)", // Scale the card on hover
                            },
                        }}
                    >
                        <Typography color="primary" variant="overline">
                            Total No. of Meters surveyed
                        </Typography>
                        <Typography variant="h5" color="red">
                            {formatNumber(data?.totalMeters)}
                        </Typography>
                    </Card>
                    <Card
                        elevation={10}
                        sx={{
                            alignItems: "center",
                            backgroundColor: "#FFF",
                            borderRadius: 1,
                            p: 2,
                            "&:hover": {
                                transform: "scale(1.03)", // Scale the card on hover
                            },
                        }}
                    >
                        <Typography color="primary" variant="overline">
                            No. of Meters in name of alive persons
                        </Typography>
                        <Typography variant="h5" color="red">
                            {formatNumber(data?.metersForAlive)}
                        </Typography>
                    </Card>
                    <Card
                        elevation={10}
                        sx={{
                            alignItems: "center",
                            backgroundColor: "#FFF",
                            borderRadius: 1,
                            p: 2,
                            "&:hover": {
                                transform: "scale(1.03)", // Scale the card on hover
                            },
                        }}
                    >
                        <Typography color="primary" variant="overline">
                            No. of Meters in name of not alive persons
                        </Typography>
                        <Typography variant="h5" color="red">
                            {formatNumber(data?.metersForNotAlive)}
                        </Typography>
                    </Card>

                    </Box>
                <Box
                    sx={{
                        gap: 3,
                        display: "grid",
                        gridTemplateColumns: {
                            md: "repeat(3, 1fr)",
                            sm: "repeat(2, 1fr)",
                            xs: "repeat(1, 1fr)",
                        },
                    }}
                >

                    <Card
                        elevation={10}
                        sx={{
                            alignItems: "center",
                            backgroundColor: "#FFF",
                            borderRadius: 1,
                            p: 2,
                            "&:hover": {
                                transform: "scale(1.03)", // Scale the card on hover
                            },
                        }}
                    >
                        <Typography color="primary" variant="overline">
                            Total No. of Families Surveyed
                        </Typography>
                        <Typography variant="h5" color="red">
                            {formatNumber(data?.totalFamiliesCatered)}
                        </Typography>
                    </Card>
                    <Card
                        elevation={10}
                        sx={{
                            alignItems: "center",
                            backgroundColor: "#FFF",
                            borderRadius: 1,
                            p: 2,
                            "&:hover": {
                                transform: "scale(1.03)", // Scale the card on hover
                            },
                        }}
                    >
                        <Typography color="primary" variant="overline">
                            Total No. Of Consumers Surveyed
                        </Typography>
                        <Typography variant="h5" color="red">
                            {formatNumber(data?.totalConsumersCatered)}
                        </Typography>
                    </Card>
                    <Card
                        elevation={10}
                        sx={{
                            alignItems: "center",
                            backgroundColor: "#FFF",
                            borderRadius: 1,
                            p: 2,
                            "&:hover": {
                                transform: "scale(1.03)", // Scale the card on hover
                            },
                        }}
                    >
                        <Typography color="primary" variant="overline">
                            Total No. Of APL Families Surveyed
                        </Typography>
                        <Typography variant="h5" color="red">
                            {formatNumber(data?.totalAplFamiliesCatered)}
                        </Typography>
                    </Card>

                </Box>



                <Box
                    sx={{
                        gap: 3,
                        display: "grid",
                        gridTemplateColumns: {
                            md: "repeat(3, 1fr)",
                            sm: "repeat(2, 1fr)",
                            xs: "repeat(1, 1fr)",
                        },
                    }}
                >

                    <Card
                        elevation={10}
                        sx={{
                            alignItems: "center",
                            backgroundColor: "#FFF",
                            borderRadius: 1,
                            p: 2,
                            "&:hover": {
                                transform: "scale(1.03)", // Scale the card on hover
                            },
                        }}
                    >
                        <Typography color="primary" variant="overline">
                            Total No. Of BPL Families Surveyed
                        </Typography>
                        <Typography variant="h5" color="red">
                            {formatNumber(data?.totalBplFamiliesCatered)}
                        </Typography>
                    </Card>
                    <Card
                        elevation={10}
                        sx={{
                            alignItems: "center",
                            backgroundColor: "#FFF",
                            borderRadius: 1,
                            p: 2,
                            "&:hover": {
                                transform: "scale(1.03)", // Scale the card on hover
                            },
                        }}
                    >
                        <Typography color="primary" variant="overline">
                            Total No. Of Consumers With Aadhaaar Not Available
                        </Typography>
                        <Typography variant="h5" color="red">
                            {formatNumber(data?.metersWithConsumerAadhaarNotAvailable)}
                        </Typography>
                    </Card>
                    <Card
                        elevation={10}
                        sx={{
                            alignItems: "center",
                            backgroundColor: "#FFF",
                            borderRadius: 1,
                            p: 2,
                            "&:hover": {
                                transform: "scale(1.03)", // Scale the card on hover
                            },
                        }}
                    >
                        <Typography color="primary" variant="overline">
                            Meters With Ration Not Available
                        </Typography>
                        <Typography variant="h5" color="red">
                            {formatNumber(data?.metersWithRationNotAvailable)}
                        </Typography>
                    </Card>

                </Box>
                <Box
                     sx={{
                        gap: 3,
                        display: "grid",
                        gridTemplateColumns: {
                            md: "repeat(3, 1fr)",
                            sm: "repeat(2, 1fr)",
                            xs: "repeat(1, 1fr)",
                        },
                    }}
                >
                    <Card
                        elevation={10}
                        sx={{
                            alignItems: "center",
                            backgroundColor: "#FFF",
                            borderRadius: 1,
                            p: 2,
                            "&:hover": {
                                transform: "scale(1.03)", // Scale the card on hover
                            },
                        }}
                    >
                        <Typography color="primary" variant="overline">
                            Average No. of Meter Per Person
                        </Typography>
                        <Typography variant="h5" color="red">
                            {data?.avgMetersPerPerson?.toFixed(2)}
                        </Typography>
                    </Card>
                    <Card
                        elevation={10}
                        sx={{
                            alignItems: "center",
                            backgroundColor: "#FFF",
                            borderRadius: 1,
                            p: 2,
                            "&:hover": {
                                transform: "scale(1.03)", // Scale the card on hover
                            },
                        }}
                    >
                        <Typography color="primary" variant="overline">
                            Average No. of Meter Per Family
                        </Typography>
                        <Typography variant="h5" color="red">
                            {data?.avgMetersPerFamily?.toFixed(2)}
                        </Typography>
                    </Card>

                    <Card
                        elevation={10}
                        sx={{
                            alignItems: "center",
                            backgroundColor: "#FFF",
                            borderRadius: 1,
                            p: 2,
                            "&:hover": {
                                transform: "scale(1.03)", // Scale the card on hover
                            },
                        }}
                    >
                        <Typography color="primary" variant="overline">
                            Meters With Consumer Not Found In Ration
                        </Typography>
                        <Typography variant="h5" color="red">
                            {formatNumber(data?.metersWithConsumerNotFoundInRation)}
                        </Typography>
                    </Card>
                </Box>

                <Grid container spacing={3}>
                    <Grid item sx={12} md={6}>
                        <div
                            style={{
                                display: "table",
                                tableLayout: "fixed",
                                width: "100%",
                                maxHeight: "400px",
                            }}
                        >
                            <Paper sx={{ overflow: "hidden" }}>
                                <TableContainer sx={{ height: "65vh" }}>
                                    <Box textAlign={"center"} py={1} fontWeight={"500"} fontSize={"17px"}>Meters per Consumer</Box>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell
                                                    style={{
                                                        minWidth: 200,
                                                        background: "#074465",
                                                        color: "#FFF",
                                                    }}
                                                >
                                                    No. of Meters per Consumer
                                                </TableCell>
                                                <TableCell


                                                    style={{
                                                        minWidth: 200,
                                                        background: "#074465",
                                                        color: "#FFF",
                                                    }}
                                                >
                                                    Population
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>

                                            {data?.metersPerPerson?.map((v, i) => (
                                                <TableRow
                                                    hover
                                                    role="checkbox"
                                                    tabIndex={-1}
                                                    key={i}
                                                >
                                                <TableCell
                                                    className="hoverable-cell"
                                                >
                                                    {/* {Object.keys(v)?.map(k => k)} */}
                                                        {v?.meterCount}
                                                </TableCell>
                                                <TableCell
                                                    className="hoverable-cell"
                                                >
                                                    {/* {Object.keys(v)?.map(k => k)} */}
                                                    {v?.population}
                                                </TableCell>
                                        </TableRow>
                                            ))}



                                    </Table>
                                </TableContainer>

                            </Paper>
                        </div>
                    </Grid>
                    <Grid item sx={12} md={6}>
                        <div
                            style={{
                                display: "table",
                                tableLayout: "fixed",
                                width: "100%",
                                maxHeight: "400px",
                            }}
                        >
                            <Paper sx={{ overflow: "hidden" }}>
                                <TableContainer sx={{ height: "65vh" }}>
                                    <Box textAlign={"center"} py={1} fontWeight={"500"} fontSize={"17px"}>Meters per Family as per ration card</Box>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell
                                                    style={{
                                                        minWidth: 200,
                                                        background: "#074465",
                                                        color: "#FFF",
                                                    }}
                                                >
                                                    No. of Meters per Family as per ration card
                                                </TableCell>
                                                <TableCell


                                                    style={{
                                                        minWidth: 200,
                                                        background: "#074465",
                                                        color: "#FFF",
                                                    }}
                                                >
                                                    No. of Families
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>

                                        {data?.metersPerFamily?.map((v, i) => (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={i}
                                            >
                                                <TableCell
                                                    className="hoverable-cell"
                                                >
                                                    {/* {Object.keys(v)?.map(k => k)} */}
                                                    {v?.meterCount}
                                                </TableCell>
                                                <TableCell
                                                    className="hoverable-cell"
                                                >
                                                    {/* {Object.keys(v)?.map(k => k)} */}
                                                    {v?.familyCount}
                                                </TableCell>
                                            </TableRow>
                                        ))}

                                    </Table>
                                </TableContainer>

                            </Paper>
                        </div>

                    </Grid>

                </Grid>
                <Grid container spacing={3}>
                    <Grid item sx={12} md={6}>
                        <div
                            style={{
                                display: "table",
                                tableLayout: "fixed",
                                width: "100%",
                                maxHeight: "400px",
                            }}
                        >
                            <Paper sx={{ overflow: "hidden" }}>
                                <TableContainer sx={{ height: "65vh" }}>
                                    <Box textAlign={"center"} py={1} fontWeight={"500"} fontSize={"17px"}>Meters per APL Family as per ration card</Box>

                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell
                                                    style={{
                                                        minWidth: 200,
                                                        background: "#074465",
                                                        color: "#FFF",
                                                    }}
                                                >
                                                    No. of Meters per APL Family as per ration card
                                                </TableCell>
                                                <TableCell


                                                    style={{
                                                        minWidth: 200,
                                                        background: "#074465",
                                                        color: "#FFF",
                                                    }}
                                                >
                                                    No. of APL Families
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>

                                        {data?.metersPerAPL?.map((v, i) => (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={i}
                                            >
                                                <TableCell
                                                    className="hoverable-cell"
                                                >
                                                    {/* {Object.keys(v)?.map(k => k)} */}
                                                    {v?.meterCount}
                                                </TableCell>
                                                <TableCell
                                                    className="hoverable-cell"
                                                >
                                                    {/* {Object.keys(v)?.map(k => k)} */}
                                                    {v?.familyCount}
                                                </TableCell>
                                            </TableRow>
                                        ))}

                                    </Table>
                                </TableContainer>

                            </Paper>
                        </div>
                    </Grid>
                    <Grid item sx={12} md={6}>
                        <div
                            style={{
                                display: "table",
                                tableLayout: "fixed",
                                width: "100%",
                                maxHeight: "400px",
                            }}
                        >
                            <Paper sx={{ overflow: "hidden" }}>
                                <TableContainer sx={{ height: "65vh" }}>
                                    <Box textAlign={"center"} py={1} fontWeight={"500"} fontSize={"17px"}>Meters per BPL Family as per ration card</Box>

                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell
                                                    style={{
                                                        minWidth: 200,
                                                        background: "#074465",
                                                        color: "#FFF",
                                                    }}
                                                >
                                                    No. of Meters per BPL Family as per ration card
                                                </TableCell>
                                                <TableCell


                                                    style={{
                                                        minWidth: 200,
                                                        background: "#074465",
                                                        color: "#FFF",
                                                    }}
                                                >
                                                    No. of BPL Families
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>

                                        {data?.metersPerBPL?.map((v, i) => (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={i}
                                            >
                                                <TableCell
                                                    className="hoverable-cell"
                                                >
                                                    {/* {Object.keys(v)?.map(k => k)} */}
                                                    {v?.meterCount}
                                                </TableCell>
                                                <TableCell
                                                    className="hoverable-cell"
                                                >
                                                    {/* {Object.keys(v)?.map(k => k)} */}
                                                    {v?.familyCount}
                                                </TableCell>
                                            </TableRow>
                                        ))}

                                    </Table>
                                </TableContainer>

                            </Paper>
                        </div>

                    </Grid>

                </Grid>



            </main> : <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"85vh"}><CircularProgress /></Box>}
        </Layout>
    )
}

export default AnalyticsDashboard