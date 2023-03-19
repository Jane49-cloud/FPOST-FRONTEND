import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
  Avatar,
  Select,
  MenuItem,
  FormHelperText,
  FormControl,
} from "@mui/material";
import FlexBetween from "./FlexBetween";
import Dropzone from "react-dropzone";
import WidgetWrapper from "../wrappers/WidgetWrapper";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../siteslise";
import ReactQuill from "react-quill";
import "highlight.js/styles/github.css";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

const MyPostWidget = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  // const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((store) => store.site.user);
  const user = useSelector((store) => store.site.user);
  const token = useSelector((store) => store.site.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  const role = user.role;

  useEffect(() => {
    if (role === "user") {
      setIsUser(true);
      console.log(isUser);
    }
  }, [user]);

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("content", content);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const response = await fetch(`http://localhost:8000/posts/create`, {
      method: "POST",
      headers: { Authorization: `${token}` },
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setTitle("");
    setDescription("");
    setContent("");

    navigate("/home");
  };

  return !isUser ? (
    <WidgetWrapper height={"auto"}>
      <FlexBetween p={"0.5rem  13rem"}>
        <Avatar
          src={`data:image/jpeg;base64,${user.picturePath}`}
          sx={{
            fontSize: "large",
            margin: "4px",
          }}
        />
        <Button
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "0.5rem",
            marginRight: "4px",
          }}>
          POST
        </Button>
      </FlexBetween>
      <FlexBetween gap="1.5rem" flexDirection="column">
        <InputBase
          placeholder="Add a title..."
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          sx={{
            width: "85%",
            marginTop: "4px",
            backgroundColor: palette.neutral.light,
            borderRadius: "0.5rem",
            padding: "0.5rem 2rem",
            marginRight: "0.5rem",
          }}
        />
        <InputBase
          placeholder="Add a subtitle..."
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          sx={{
            width: "85%",
            marginTop: "4px",
            backgroundColor: palette.neutral.light,
            borderRadius: "0.5rem",
            padding: "0.5rem 2rem",
            marginRight: "0.5rem",
          }}
        />
        <FlexBetween margin={"0px"}>
          <FormControl>
            <FormHelperText
              sx={{
                flex: 1,
                fontWeight: 400,
                color: "#11142d",
                fontSize: "16px",
              }}>
              select topic
            </FormHelperText>
            <Select
              variant="outlined"
              color="info"
              displayEmpty
              required
              inputProps={{ "aria-label": "without-label" }}
              defaultValue="technology">
              <MenuItem value="health and wellness">
                Health and Wellness
              </MenuItem>
              <MenuItem value="travel">Travel</MenuItem>
              <MenuItem value="coding">Coding</MenuItem>
              <MenuItem value="technology">Technology</MenuItem>
              <MenuItem value="education">Education</MenuItem>
              <MenuItem value="entertainment">Entertainment</MenuItem>
              <MenuItem value="Beauty">Beauty</MenuItem>
              <MenuItem value="fashion">Fashion</MenuItem>
            </Select>
          </FormControl>

          <div></div>
        </FlexBetween>

        <ReactQuill
          placeholder="Add content..."
          value={content}
          onChange={setContent}
          modules={{
            toolbar: [
              [
                { header: "1" },
                { header: "2" },
                // { header: "3" },
                // { header: "4" },
                { font: [] },
              ],
              [{ size: [] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              ["link", "image", "code-block"],
              ["clean"],
            ],
          }}
          className="quill-editor"
          theme="snow"
          style={{
            width: "85%",
            // marginTop: "4px",
            backgroundColor: palette.neutral.light,
            borderRadius: "0.5rem",
            // padding: "0.5rem 2rem",
            marginRight: "0.5rem",
            height: "auto",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          height="auto"
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem">
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}>
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}>
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}>
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}>
            Image
          </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            {/* <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween> */}
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}
      </FlexBetween>
    </WidgetWrapper>
  ) : null;
};

export default MyPostWidget;
