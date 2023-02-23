import { InputBase } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { useParams } from "react-router-dom";
import { setPosts } from "../siteslise";

const CreateComment = () => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const { _id } = useSelector((store) => store.site.user);
  const token = useSelector((store) => store.site.token);
  const postId = id;
  const index = new Date().now;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("text", text);

    // Pass the postId parameter to the URL
    const response = await fetch(
      `http://localhost:8000/posts/${postId}/comment`,
      {
        method: "PATCH",
        headers: { Authorization: `${token}` },
        body: formData,
      }
    );
    console.log(postId);
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setText("");
  };

  useEffect(() => {
    const getPost = async () => {
      const response = await fetch(`http://localhost:8000/posts/${postId}`, {
        method: "GET",
        headers: { Authorization: `${token}` },
      });
      const data = await response.json();
      setPost(data);
      setComments(data.comments); // Extract and store comments
    };
    getPost();
    console.log(comments);
  }, [postId, token]);
  return (
    <div className="comment-section">
      <div className="post-comment">
        <h2>Share your thoughts below</h2>
        <InputBase
          placeholder="Add a comment..."
          onChange={(e) => setText(e.target.value)}
          value={text}
          required
          sx={{
            width: "70%",
            marginTop: "10px",
            backgroundColor: "#eeee",
            borderRadius: "0.5rem",
            padding: "0.5rem 2rem",
            margin: "0.5rem",
          }}
        />
        <button type="submit" onClick={handlePost}>
          comment
        </button>
      </div>
      <div>
        {comments.map((comment) => (
          <div key={index} className="fetch-comment">
            <div className="img">
              <img src={`data:image/jpeg;base64,${comment.photo}`} alt="" />
            </div>
            <div className="comment-lower">
              <h3 className="author">{comment.author}</h3>
              <p>{comment.text}</p>
              <p>{new Date(comment.createdAt).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateComment;
