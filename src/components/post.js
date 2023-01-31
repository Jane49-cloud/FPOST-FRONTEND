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
import { useNavigate } from "react-router-dom";

const PostWidget = ({
  userId,
  postId,
  userPicturePath,
  name,
  description,
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
    <WidgetWrapper m="2rem 0">
      <FlexBetween>
        <Avatar
          src={`data:image/jpeg;base64,${userPicturePath}`}
          sx={{ margin: "20px" }}
        />
        <Typography margin={"20px"}>{name}</Typography>
        <IconButton
          margin={"20px"}
          onClick={() => navigate(`/profile/${userId}`)}>
          <MoreHorizIcon />
        </IconButton>
      </FlexBetween>
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.65rem", marginTop: "0.75rem" }}
          // src={`http://localhost:8000/assets/${picturePath}`}
          src={`data:image/jpeg;base64,${picturePath}`}

          // alt="Fetched Image"
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
