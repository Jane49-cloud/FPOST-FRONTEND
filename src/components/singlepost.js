import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IsLoading from "./IsLoading";
import { useDispatch, useSelector } from "react-redux";
import FlexBetween from "./FlexBetween";

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const token = useSelector((store) => store.site.token);

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
    console.log(post);
  }, [id, token]);

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
            </div>
          </div>
          <br />
          <div className="full-blog">
            <div>
              <h1>{post.title}</h1>
            </div>

            <div className="img">
              <img src={`data:image/jpeg;base64,${post.picturePath}`} alt="" />
            </div>
            <div>
              <h3>{post.description}</h3>
            </div>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </>
      )}
    </>
  );
};

export default SinglePost;
