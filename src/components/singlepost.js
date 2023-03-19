import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IsLoading from "./IsLoading";
import ReactQuill from "react-quill";
import "highlight.js/styles/github.css";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const token = useSelector((store) => store.site.token);
  const user = useSelector((store) => store.site.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const getPost = async () => {
      const response = await fetch(`http://localhost:8000/posts/${id}`, {
        method: "GET",
        headers: { Authorization: `${token}` },
      });
      const data = await response.json();
      setPost(data);
    };
    getPost();
  }, [id, token]);

  const handleEdit = () => {
    setIsEditMode(!isEditMode);
    setTitle(post.title);
    setDescription(post.description);
    setContent(post.content);
  };

  const handleSave = async () => {
    const response = await fetch(`http://localhost:8000/posts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        title: title,
        description: description,
        content: content,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setPost(data);
      setIsEditMode(false);
    }
    setIsEditMode(false);
  };

  return (
    <>
      {Object.keys(post).length === 0 ? (
        <IsLoading />
      ) : (
        <>
          <div className="blogger-profile">
            <div>
              <img
                src={`data:image/jpeg;base64,${post.userPicturePath}`}
                alt=""
              />
            </div>
            <div className="bio">
              <p>
                By:{" "}
                <span>
                  {post.firstName} {post.lastName}
                </span>
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptas, totam. Pariatur deserunt commodi tempore aut accusamus
                placeat, praesentium, a, vel aliquid cupiditate laudantium.
              </p>
              {/* <p>
                {user._id === post.userId ? (
                  <>
                    <button className="btn" onClick={handleEdit}>
                      Edit
                    </button>
                    <button className="btn">Delete</button>
                  </>
                ) : (
                  ""
                )}
              </p> */}
            </div>
          </div>
          <div className="full-blog">
            <div className="blog-head" style={{ visibility: "hidden" }}>
              {isEditMode ? (
                <input
                  type="text"
                  value={post.title}
                  onChange={(e) => setPost({ ...post, title: e.target.value })}
                />
              ) : (
                <p>do not wish to edit</p>
              )}
              <div>
                {user._id === post.userId ? (
                  <>
                    <button className="btn" onClick={handleEdit}>
                      cancel
                    </button>
                    {/* <button className="btn">Delete</button> */}
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="full-blog">
              {isEditMode ? (
                <div>
                  <div>
                    <input
                      type="text"
                      value={post.title}
                      onChange={(e) =>
                        setPost({ ...post, title: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <textarea
                      value={post.description}
                      onChange={(e) =>
                        setPost({ ...post, description: e.target.value })
                      }></textarea>
                  </div>
                  <div>
                    <ReactQuill
                      value={post.content}
                      onChange={(value) => setPost({ ...post, content: value })}
                    />
                  </div>
                  <div>
                    <button onClick={handleSave} className="btn">
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="blog-head">
                    <h1>{post.title}</h1>
                    <div>
                      {user._id === post.userId ? (
                        <>
                          <button className="btn" onClick={handleEdit}>
                            Edit
                          </button>
                          <button className="btn">Delete</button>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="img">
                    <img
                      src={`data:image/jpeg;base64,${post.picturePath}`}
                      alt=""
                    />
                  </div>
                  <div>
                    <h3>{post.description}</h3>
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SinglePost;
