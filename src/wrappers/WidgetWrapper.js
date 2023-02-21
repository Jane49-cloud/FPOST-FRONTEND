import React from "react";
import { styled } from "@mui/system";
import { Box } from "@mui/material";

const WidgetWrapper = styled(Box)(({ theme }) => ({
  boxShadow: "-1px 4px 20px -6px rgba(0, 0, 0, 0.75)",
  width: "90vw",
  margin: "10px auto",
  borderRadius: "0.75",
  height: "auto",
  marginBottom: "30px",
}));

export default WidgetWrapper;
