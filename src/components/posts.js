import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../siteslise";
import PostWidget from "./post";
import IsLoading from "./IsLoading";

const PostsWidget = ({
  isAllPosts = false,
  isProfile = false,
  isUserLikedPosts = false,
}) => {
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const posts = useSelector((store) => store.site.posts);
  const token = useSelector((store) => store.site.token);
  const myUserId = useSelector((store) => store.site.user._id);

  const getPosts = async () => {
    const response = await fetch("http://localhost:8000/posts", {
      method: "GET",
      headers: { Authorization: `${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
    setIsLoading(false);
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:8000/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
    setIsLoading(false);
  };

  const getUserLikedPosts = async () => {
    const response = await fetch(
      `http://localhost:8000/posts/${myUserId}/liked`,
      {
        method: "GET",
        headers: { Authorization: `${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
    setIsLoading(false);
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    }
    if (isUserLikedPosts) {
      getUserLikedPosts();
    }
    if (isAllPosts) {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {isLoading ? ( // Render isLoading element if isLoading is true
        <IsLoading />
      ) : (
        posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            title,
            content,
            picturePath,
            userPicturePath,
            likes,
            comments,
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName}`}
              description={description}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
              title={title}
              content={content}
            />
          )
        )
      )}
    </>
  );
};

export default PostsWidget;
