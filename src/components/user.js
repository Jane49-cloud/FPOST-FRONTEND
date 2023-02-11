import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FlexBetween from "./FlexBetween";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../siteslise";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";

const User = ({ email, name, picturePath }) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [imageData, setImageData] = useState(null);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  useEffect(() => {
    const originalImage = Buffer.from(picturePath, "base64").toString();
    setImageData(originalImage);
  }, [picturePath]);

  return (
    <div className="post-cards">
      <div className="post-card">
        <div className="top">
          <img src={`data:image/jpeg;base64,${picturePath}`} alt="" />
        </div>
        <div className="bottom">
          <h3>{name}</h3>
          <p>Email:{email}</p>
          <div className="footer">
            <FlexBetween>
              <FlexBetween gap={"5px"}>
                <h4>{name}</h4>
                <h4>2days ago</h4>
              </FlexBetween>
              <FlexBetween>
                <FlexBetween>
                  <p>View all blogs</p>
                </FlexBetween>
                <FlexBetween>
                  <p>Total blogs</p>
                </FlexBetween>
                <IconButton onClick={() => setIsComments(!isComments)}>
                  <ShareOutlined />
                </IconButton>
              </FlexBetween>
            </FlexBetween>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
