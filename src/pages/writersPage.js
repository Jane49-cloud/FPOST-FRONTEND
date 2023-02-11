import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../components/Navbar";
import Users from "../components/users";
import UserProfile from "../components/UserProfile";
import BreakingNews from "../components/BreakingNews";
import Advert from "../components/Advert";

const WritersPage = () => {
  return (
    <>
      <Navbar />
      <div className="section-center">
        <div className="user-sidebar">
          <UserProfile />
        </div>
        <div className="main-section">
          <div className="news-section">
            <BreakingNews />
            <Advert />
          </div>
          <div className="blogs">
            <Users />
          </div>
        </div>
      </div>
      ;
    </>
  );
};
export default WritersPage;
