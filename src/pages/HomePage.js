import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../components/Navbar";
import PostsWidget from "../components/posts";
import UserProfile from "../components/UserProfile";
import MyPostWidget from "../components/NewPost";
import FlexBetween from "../components/FlexBetween";
import Advert from "../components/Advert";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between">
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserProfile />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}>
          <MyPostWidget />
          <PostsWidget />
        </Box>

        <Advert />
      </Box>
    </Box>
  );
};
export default HomePage;
