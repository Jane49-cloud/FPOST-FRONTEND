import React from "react";
import { styled } from "@mui/system";
import { Box } from "@mui/material";

const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: "1.5rem, 1.5rem, 0.75rem, 1.5rem",
  backgroundColor: theme.palette.background.alt,
  borderRadius: "0.75",
}));

export default WidgetWrapper;
