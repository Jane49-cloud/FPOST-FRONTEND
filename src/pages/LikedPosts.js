import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../components/Navbar";
import PostsWidget from "../components/posts";
import UserProfile from "../components/UserProfile";
import MyPostWidget from "../components/NewPost";
import FlexBetween from "../components/FlexBetween";
import BreakingNews from "../components/BreakingNews";
import Advert from "../components/Advert";
import Adverts from "../data2";

const LikedPostsPage = () => {
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
            <PostsWidget isUserLikedPosts />
          </div>
        </div>
      </div>
      ;
    </>
  );
};
export default LikedPostsPage;
