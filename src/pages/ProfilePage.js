import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((store) => store.site.token);

  console.log("userId:", userId);

  const getUser = async () => {
    if (!userId) return; // check if userId is defined
    const response = await fetch(`/users/user/${userId}`, {
      method: "GET",
      headers: { Authorization: ` ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, [userId]); // add userId to the dependency array

  if (!userId) {
    return <div>Loading user data...</div>;
  }

  return (
    <Box>
      <h1>Profile Page</h1>
      <p>userId: {userId}</p>
      {user ? (
        <div>
          <p>First name: {user.firstName}</p>
          <p>Last name: {user.lastName}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </Box>
  );
};

export default ProfilePage;
