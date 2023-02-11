import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../siteslise";
import User from "./user";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((store) => store.site.users);
  const token = useSelector((store) => store.site.token);
  //   const myUserId = useSelector((store) => store.site.user._id);

  const getWriters = async () => {
    const response = await fetch("http://localhost:8000/users/writers", {
      method: "GET",
      headers: { Authorization: `${token}` },
    });
    const data = await response.json();
    dispatch(setUsers({ users: data }));
  };

  useEffect(() => {
    getWriters();
  }, []);

  return (
    <>
      {users.map(({ _id, firstName, lastName, picturePath, email }) => (
        <User
          key={_id}
          name={`${firstName} ${lastName}`}
          picturePath={picturePath}
          email={email}
        />
      ))}
    </>
  );
};

export default Users;
