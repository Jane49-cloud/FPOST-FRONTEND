import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
  MessageRounded,
  Store,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import FlexBetween from "./FlexBetween";
import { setMode, setLogout } from "../siteslise";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { mode, posts, users } = useSelector((store) => store.site);
  const user = useSelector((store) => store.site.user);
  // console.log(user.picturePath);

  const image = "http://localhost:8000/assets/${picturePath}";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  const fullName = user && `${user.firstName}`;
  const img = `${user.picturePath}`;

  return (
    <section>
      <FlexBetween backgroundColor={mode.light ? alt : dark} height="60px">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}>
          FPOSTS
        </Typography>
        <FlexBetween>
          <img src={image} alt="" />
        </FlexBetween>
        <FlexBetween marginRight={"20px"}>
          <IconButton onClick={() => dispatch(setMode(!mode.light))}>
            {mode.light ? <LightMode /> : <DarkMode className="MuiIcon-root" />}
          </IconButton>
          <IconButton>
            <Notifications></Notifications>
          </IconButton>
          <IconButton>
            <MessageRounded></MessageRounded>
          </IconButton>
          <IconButton>
            <Help></Help>
          </IconButton>
        </FlexBetween>
        <FlexBetween>
          {user.role == "writer" ? <Link to={"/new-post"}>New Post</Link> : " "}
        </FlexBetween>
        <FlexBetween>
          {" "}
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}>
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              {user.role == "admin" ? (
                <MenuItem value={fullName}>
                  {" "}
                  <Typography>{fullName}</Typography>{" "}
                </MenuItem>
              ) : (
                " "
              )}
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      </FlexBetween>
    </section>
  );
};

export default Navbar;
