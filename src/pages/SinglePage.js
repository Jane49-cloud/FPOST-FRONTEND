import React from "react";
import "./post.css";
import SinglePost from "../components/singlepost";
import Navbar from "../components/Navbar";
import CreateComment from "../components/CreateComment";

const SinglePostPage = () => {
  return (
    <>
      <Navbar />
      <div className="post-section">
        <div className="full-post">
          <SinglePost />
          <CreateComment />
        </div>
        <div className="others"></div>
      </div>
    </>
  );
};

export default SinglePostPage;
