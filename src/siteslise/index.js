import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: { light: true },
  user: null,
  token: null,
  users: [],
  posts: [],
};

const siteSlice = createSlice({
  name: "site",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode.light = !state.mode.light;
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setUsers: (state, action) => {
      state.users = action.payload.users;
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  setUsers,
} = siteSlice.actions;
export default siteSlice.reducer;
