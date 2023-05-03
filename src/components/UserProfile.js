import React from "react";
import { useSelector } from "react-redux";
import FlexBetween from "./FlexBetween";
import { Avatar, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Typography, Divider, useTheme, Box } from "@mui/material";

import {
  LocationOnOutlined,
  WorkOutlineOutlined,
  EditOutlined,
  ManageAccountsOutlined,
} from "@mui/icons-material";
import Facebook from "../assets/facebook.png";
import Twitter from "../assets/twitter.png";
import Whatsapp from "../assets/whatsapp.png";
import Gmail from "../assets/gmail.png";
import Instagram from "../assets/instagram.png";

const UserProfile = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.site.user);
  const userId = user._id;
  console.log(userId);

  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const navigateToProfile = () => {
    navigate(`/profile/${userId}`);
  };

  return (
    <>
      <div className="user-profile">
        {/* user image starts here */}
        <div className="user-avatar" onClick={navigateToProfile}>
          <img
            src={`data:image/jpeg;base64,${user.picturePath}`}
            alt=""
            className="image"
          />
          <h2>
            {user.firstName} {user.lastName}
          </h2>
        </div>
        {/* user links start here */}

        <div className="user-links">
          <Link to={"/home"}>All Blogs</Link>
          <Link to={"/liked-posts"}>liked Blogs</Link>
          <Link to={"/#"}>Topics</Link>
          <Link to={"/writers"}>Writers</Link>
          <Link to={"/#"}>My Replies</Link>
          <Link to={"/#"}>Bookmarked</Link>
        </div>
        {/* subscribe starts here */}
        <div className="subscribe">
          <a href="#">Demo</a>
        </div>
        {/* socials start here */}
        <div className="socials">
          <img src={Facebook} alt="" />

          <img src={Whatsapp} alt="" />

          <img src={Gmail} alt="" />

          <img src={Twitter} alt="" />

          <img src={Instagram} alt="" />
        </div>
      </div>
    </>
  );
};

export default UserProfile;
