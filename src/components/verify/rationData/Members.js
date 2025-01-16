import React, { useState } from "react";
import AttachFileIcon from '@mui/icons-material/AttachFile';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import {
  Close,
  Delete,
  DoneAll,
  Edit,
  EditAttributes,
  EditAttributesOutlined,
  EditAttributesRounded,
  EditAttributesTwoTone,
  Error,
  ExpandMore,
  More,
  RemoveRedEye,
  Save,
  Update,
  Visibility,
} from "@mui/icons-material";
import ConfirmDialogEdit from "../ConfirmDialogEdit";

export default function Members({ memberObject }) {

  const memberObject1 = {
    name: memberObject?.memberName,
    aadhaarNumber: `XXXX-XXXX-${memberObject?.aadhaarNumber
      .toString()
      .slice(-4)}`,

    address : memberObject?.address,
    category: memberObject?.casteCategory,
    dateOfBirth : memberObject?.dateOfBirth,
    gender : memberObject?.gender == "M" ? "Male" : "Female",
    mobileNumber : memberObject?.mobileNumber,
    occupation : memberObject?.occupation,
    district : memberObject?.district,
    block : memberObject?.block,
    panchayatName : memberObject?.panchayatName,
    villageName : memberObject?.villageName,
    // consumerFoundInRation: memberObject?.consumerFoundInRation == true ? "Yes" : "No",


  }
  const memberObject2 = {
    memberName: memberObject?.rationCard?.memberName,
    cardNumber: memberObject?.rationCard?.cardNumber,
    cardType : memberObject?.rationCard?.cardType,
    dateOfBirth : memberObject?.rationCard?.dateOfBirth,
    ekycStatus : memberObject?.rationCard?.ekycStatus,
    relationName : memberObject?.rationCard?.relationName,
    address : memberObject?.rationCard?.address,
    district : memberObject?.rationCard?.district,
    block : memberObject?.rationCard?.block,
    panchayatName : memberObject?.rationCard?.panchayatName,
    villageName : memberObject?.rationCard?.villageName,
    gender : memberObject?.rationCard?.gender == "M" ? "Male" : "Female",
    // consumerFoundInRation: memberObject?.consumerFoundInRation == true ? "Yes" : "No",


  }

  const [expanded, setExpanded] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableMemberObject, setEditableMemberObject] = useState({
    memberObject,
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState(null);

  const handleViewOrCloseClick = () => {
    setExpanded(!expanded);
    setIsEditMode(false);
  };

  const handleEditClick = () => {
    setMemberToEdit(memberObject);
    setOpenDialog(true);
  };

  const handleConfirmEdit = () => {
    setOpenDialog(false);
    setExpanded(true);
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setOpenDialog(false);
    setEditableMemberObject(memberObject);
  };

  const handleCloseClick = () => {
    setIsEditMode(false);
    setExpanded(false); // Optionally, collapse the accordion here
  };

  // Function to render member fields
  const renderMemberFields = () => {
    return Object.entries(editableMemberObject).map(([key, value]) => {
      if (isEditMode) {
        return (
          <TextField
            key={key}
            label={key}
            value={value || ""}
            onChange={(e) =>
              setEditableMemberObject({
                ...editableMemberObject,
                [key]: e.target.value,
              })
            }
          />
        );
      } else {
        return <Typography key={key}>{`${key}: ${value}`}</Typography>;
      }
    });
  };

  return (
    <>
      <div>
        <Accordion expanded={expanded}>
          <Box display="flex" alignItems="center" width="100%">
            <Box flexBasis="80%">
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
                style={{
                  backgroundColor: "#FFF",
                  color: "#074465",
                  borderRadius: 5,
                }}
              >
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(4, 1fr)"
                  width="100%"
                  gap={1}
                >
                  <Box style={{ textAlign: "center" }}>
                    <Typography variant="subtitle1">
                      {memberObject.memberName}
                    </Typography>
                  </Box>
                  <Box style={{ textAlign: "center" }}>
                    <Typography variant="subtitle1">
                      {memberObject.gender == "M" ? "Male" : "Female"}
                    </Typography>
                  </Box>
                  <Box style={{ textAlign: "center" }}>
                    <Typography variant="subtitle1">
                      {/* {memberObject?.dateOfBirth} */}
                      {`XXXX-XXXX-${memberObject?.aadhaarNumber
                        .toString()
                        .slice(-4)}`}
                    </Typography>
                  </Box>
                  <Box style={{ textAlign: "center" }}>
                    {memberObject?.dateOfBirth}

                  </Box>
                </Box>
              </AccordionSummary>
            </Box>
            <Box
              flexBasis="20%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {!expanded && !isEditMode && (
                <>
                  <Button
                    // color="error"
                    style={{ color: "#344147" }}
                    startIcon={<More />}
                    onClick={handleViewOrCloseClick}
                  >
                    More
                  </Button>
                </>
              )}
              {expanded && !isEditMode && (
                <>
                  <Button
                    onClick={handleViewOrCloseClick}
                    style={{ color: "#A04040" }}
                    endIcon={<Close />}
                  >
                    Close
                  </Button>
                </>
              )}
              {isEditMode && (
                <>
                  <Button startIcon={<Save />} style={{ color: "#28a745" }}>
                    Save
                  </Button>
                  <Button
                    // onClick={handleCloseClick}
                    style={{ color: "#A04040" }}
                    startIcon={<Delete />}
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={handleCloseClick}
                    style={{ color: "#A04040" }}
                    startIcon={<Close />}
                  >
                    Close
                  </Button>
                </>
              )}
            </Box>
          </Box>

          <AccordionDetails>
            <Box
              display="grid"
              gridTemplateColumns="repeat(3, 1fr)"
              gap={2}
              style={{
                borderTop: "2px dashed #ccc",
                padding: "10px",
              }}
            >
              {Object.entries(memberObject1).map(([key, value]) => {
                if (key === "himMemberId") return null; // Skip rendering for "himMemberId"

                return (
                  <Box
                    gridColumn="span 1"
                    key={key}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      wordWrap: "break-word",
                      padding: "5px",
                    }}
                  >
                    <Box
                      style={{
                        flex: 1,
                        textAlign: "right",
                        paddingRight: "5px",
                        fontWeight: "bold",
                        color: "#396984",
                      }}
                    >
                      {key
                        .replace(/([A-Z])/g, " $1")
                        .trim()
                        .charAt(0)
                        .toUpperCase() +
                        key
                          .replace(/([A-Z])/g, " $1")
                          .trim()
                          .slice(1)}
                      :
                    </Box>
                    <Box
                      style={{
                        flex: 1,
                        textAlign: "left",
                        fontWeight: "bold",
                        paddingLeft: "5px",
                        color: "#555",
                      }}
                    >
                      {isEditMode ? (
                        <TextField
                          fullWidth
                          size="small"
                          value={value || ""}
                          onChange={(e) =>
                            setEditableMemberObject({
                              ...editableMemberObject,
                              [key]: e.target.value,
                            })
                          }
                        />
                      )  : typeof value === "boolean" ? (
                        value ? (
                          <Chip
                            icon={<DoneAll fontSize="small" color="success" />}
                            label="Verified"
                            style={{ height: 20 }}
                          />
                        ) : (
                          <Chip
                            icon={<Error color="error" fontSize="small" />}
                            label="Not Verified"
                            style={{ height: 20 }}
                          />
                        )
                      ) : key == "attachment1" ? (
                        <p style={{cursor : "pointer", color : "blue", display: "flex", alignItems : "center"}} onClick={() => window.open(memberObject?.pdfDownload)}><AttachFileIcon />View File</p>
                      ) : key == "attachment2" ? (
                        <p style={{cursor : "pointer", color : "blue", display: "flex", alignItems : "center"}} onClick={() => window.open(memberObject?.pdf2)}><AttachFileIcon />View File</p>
                      ) : (
                        value?.toString()
                      )}
                    </Box>
                  </Box>
                );
              })}


            </Box>
            {
              memberObject?.rationCard && <>

                <div style={{ backgroundColor: "#074465", borderRadius: "4px", fontSize: "16px", color: "white", width: "100%", paddingLeft: "20px" }}>Consumer Ration Card Details</div>
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(3, 1fr)"
                  gap={2}
                  style={{
                    borderTop: "2px dashed #ccc",
                    padding: "10px",
                  }}
                >
                  {Object.entries(memberObject2).map(([key, value]) => {
                    if (key === "himMemberId") return null; // Skip rendering for "himMemberId"

                    return (
                      <Box
                        gridColumn="span 1"
                        key={key}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          wordWrap: "break-word",
                          padding: "5px",
                        }}
                      >
                        <Box
                          style={{
                            flex: 1,
                            textAlign: "right",
                            paddingRight: "5px",
                            fontWeight: "bold",
                            color: "#396984",
                          }}
                        >
                          {key
                            .replace(/([A-Z])/g, " $1")
                            .trim()
                            .charAt(0)
                            .toUpperCase() +
                            key
                              .replace(/([A-Z])/g, " $1")
                              .trim()
                              .slice(1)}
                          :
                        </Box>
                        <Box
                          style={{
                            flex: 1,
                            textAlign: "left",
                            fontWeight: "bold",
                            paddingLeft: "5px",
                            color: "#555",
                          }}
                        >
                          {isEditMode ? (
                            <TextField
                              fullWidth
                              size="small"
                              value={value || ""}
                              onChange={(e) =>
                                setEditableMemberObject({
                                  ...editableMemberObject,
                                  [key]: e.target.value,
                                })
                              }
                            />
                          ) : typeof value === "boolean" ? (
                            value ? (
                              <Chip
                                icon={<DoneAll fontSize="small" color="success" />}
                                label="Verified"
                                style={{ height: 20 }}
                              />
                            ) : (
                              <Chip
                                icon={<Error color="error" fontSize="small" />}
                                label="Not Verified"
                                style={{ height: 20 }}
                              />
                            )
                          ) : key == "attachment1" ? (
                            <p style={{ cursor: "pointer", color: "blue", display: "flex", alignItems: "center" }} onClick={() => window.open(memberObject?.pdfDownload)}><AttachFileIcon />View File</p>
                          ) : key == "attachment2" ? (
                            <p style={{ cursor: "pointer", color: "blue", display: "flex", alignItems: "center" }} onClick={() => window.open(memberObject?.pdf2)}><AttachFileIcon />View File</p>
                          ) : (
                            value?.toString()
                          )}
                        </Box>
                      </Box>
                    );
                  })}


                </Box>
              </>
            }
          </AccordionDetails>
        </Accordion>
      </div>

      <ConfirmDialogEdit
        open={openDialog}
        handleConfirm={handleConfirmEdit}
        handleCancel={handleCancelEdit}
        memberObject={memberObject}
        sx={{ width: "50%", maxWidth: "600px", mx: "auto" }}
      />
    </>
  );
}
