import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FlexBetween from "./FlexBetween";
import WidgetWrapper from "../wrappers/WidgetWrapper";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../siteslise";
import { Avatar } from "@mui/material";
import { Buffer } from "buffer";
import { Link, useNavigate } from "react-router-dom";

const PostWidget = ({
  userId,
  postId,
  userPicturePath,
  name,
  description,
  title,
  content,
  picturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((store) => store.site.token);
  const loggedInUserId = useSelector((store) => store.site.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const [imageData, setImageData] = useState(null);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  useEffect(() => {
    const originalImage = Buffer.from(picturePath, "base64").toString();
    setImageData(originalImage);
  }, [picturePath]);

  const patchLike = async () => {
    const response = await fetch(`http://localhost:8000/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    console.log("updating likes");
  };

  return (
    <div className="post-cards">
      <div className="post-card">
        <div className="top">
          <img src={`data:image/jpeg;base64,${picturePath}`} alt="" />
        </div>
        <div className="bottom">
          <h3>{title}</h3>
          <p>{description}</p>
          <div className="footer">
            <FlexBetween>
              <FlexBetween gap={"5px"}>
                <h4>{name}</h4>
                <h4>2days ago</h4>
              </FlexBetween>
              <FlexBetween>
                <FlexBetween>
                  <IconButton onClick={patchLike}>
                    {isLiked ? (
                      <FavoriteOutlined sx={{ color: primary }} />
                    ) : (
                      <FavoriteBorderOutlined />
                    )}
                  </IconButton>
                  <span>{likeCount}</span>
                </FlexBetween>
                <FlexBetween>
                  <IconButton onClick={() => setIsComments(!isComments)}>
                    <ChatBubbleOutlineOutlined />
                  </IconButton>
                  <span>{comments.length}</span>
                </FlexBetween>
                <IconButton onClick={() => setIsComments(!isComments)}>
                  <ShareOutlined />
                </IconButton>
                <Link to={`/posts/${postId}`}>
                  <h4>Read</h4>
                </Link>
              </FlexBetween>
            </FlexBetween>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostWidget;
