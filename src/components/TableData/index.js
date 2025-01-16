"use client";
import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";


import Typography from "@mui/material/Typography";



import { useDispatch, useSelector } from "react-redux";


import { Button, CircularProgress, Grid, Paper } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import Pagination from "@mui/material/Pagination";

import TableRow from "@mui/material/TableRow";

import {
  CollectionsBookmark,
  Edit,
  Feedback,
  Help,
  PermMedia,
  UploadFile,
  Work,
} from "@mui/icons-material";
import DownloadIcon from '@mui/icons-material/Download';
import { onSummaryReportDownload } from "../../network/actions/downloadSummaryReport";




const TableData = ({ tableData, selectedWard, selectedMunicipal, selectedDistrict, filterData, totalPage, totalRecord, handleChangePage, page }) => {
  const dispatch = useDispatch();
  const downloadReport = () => {
    // const {selectedDistrict, selectedWard, selectedMunicipal} = tableData || {};
    dispatch(
      onSummaryReportDownload(filterData)
    )
  }

  let cloumnData = ["division Name", "sub Division Name", "surveyed premises Count", " surveyed meter Count", "total meter count", "completion percentage"]
  let cloumnDataHotel = ["division Name", "sub Division Name", "surveyed premises Count", " surveyed meter Count"]
  const [columName, setcolumName] = useState();

  useEffect(() => {
    if (filterData?.type?.value == "hotel") {
      setcolumName(cloumnDataHotel)
    } else {
      setcolumName(cloumnData)

    }
  }, [filterData])



  // console.log('filterData', filterData)

  return (
   tableData?.length == 0 ? <Box display={"flex"} justifyContent={"center"} alignItems={"center"} mt={5}><Typography>No Data Found</Typography></Box> : <>
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
          Summary Report


          <Button onClick={() => downloadReport()} variant="contained" color="primary" style={{ marginTop: "0px" }}>

            <DownloadIcon />   Download Excel

          </Button>


        </Typography>

      </Box>

      <Grid
        container
spacing={3}
      >
        <Grid
          item={true}
          xs={12}
          md={12}
          lg={12}
          // sx={{ background: "#FFF", borderRadius: 6 }}
        >
          <div
            style={{
              display: "table",
              tableLayout: "fixed",
              width: "96%",
              maxHeight: "400px",
              marginBottom: "50px",
              marginLeft : "20px"
            }}
          >
            <Paper sx={{ width: "100", overflow: "hidden", marginTop: 3 }}>
              <TableContainer
                sx={{
                  height: '80vh',
                  border: 1,
                  borderColor: "gray",
                }}
              >
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columName?.map(
                        (column, index) => (
                          <TableCell
                            key={index}
                            align={"left"}
                            style={{
                              // minWidth: column.minWidth,
                              background: "#565656",
                              color: "#FFF",
                              borderBottom: 1,
                              fontStyle: "Bold",
                            }}
                          >
                            <Typography style={{ fontWeight: 600 }}>
                              {column }
                            </Typography>
                          </TableCell>
                        )
                      )}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {tableData?.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.2)", // Change this to your desired hover color
                          },
                        }}
                      >
                          <TableCell key={index}>
                            <Typography
                              style={{
                                fontWeight: 700,
                                // color: index === 0 ? "#074465" : "#000", // First element black, others red
                              }}
                            >
                            {row.divisionName}
                            </Typography>
                          </TableCell>
                          <TableCell key={index}>
                            <Typography
                              style={{
                                fontWeight: 700,
                                // color: index === 0 ? "#074465" : "#000", // First element black, others red
                              }}
                            >
                            {row.subDivisionName}
                            </Typography>
                          </TableCell>
                          <TableCell key={index}>
                            <Typography
                              style={{
                                fontWeight: 700,
                                // color: index === 0 ? "#074465" : "#000", // First element black, others red
                              }}
                            >
                            {row.surveyCount}
                            </Typography>
                          </TableCell>
                          <TableCell key={index}>
                            <Typography
                              style={{
                                fontWeight: 700,
                                // color: index === 0 ? "#074465" : "#000", // First element black, others red
                              }}
                          >
                            {row.meterCount}

                            </Typography>
                          </TableCell>
                        {filterData?.type?.value != "hotel" &&<TableCell key={index}>
                            <Typography
                              style={{
                                fontWeight: 700,
                                // color: index === 0 ? "#074465" : "#000", // First element black, others red
                              }}
                            >
                            {row.totalMeters || "-"}
                            </Typography>
                          </TableCell>}
                        {filterData?.type?.value != "hotel" && <TableCell key={index}>
                            <Typography
                              style={{
                                fontWeight: 700,
                                // color: index === 0 ? "#074465" : "#000", // First element black, others red
                              }}
                            >
                            {row.completionPercentage+"%" || "-"}
                            </Typography>
                          </TableCell>}
                      </TableRow>
                    ))}
                  </TableBody>
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
                  Total Records Found: {totalRecord}
                </Typography>
                <Pagination
                  style={{
                    padding: 10,
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                  count={totalPage}
                  page={page == 0 ? 1 : page} // Set the active page here

                  onChange={(e) => handleChangePage(+e.target.textContent)}
                  color="primary"
                />
              </Box>
            </Paper>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default TableData;