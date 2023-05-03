import "./App.css";
import Navbar from "./components/Navbar";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Loginpage from "./pages/Loginpage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import LikedPostsPage from "./pages/LikedPosts";
import WritersPage from "./pages/writersPage";
import NewPostPage from "./pages/NewPost";
import SinglePostPage from "./pages/SinglePage";

function App() {
  const mode = useSelector((store) => store.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((store) => store.site.token));
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Loginpage />} />
            <Route path="liked-posts" element={<LikedPostsPage />} />

            <Route path="new-post" element={<NewPostPage />} />
            <Route path="writers" element={<WritersPage />} />
            {/* <Route path="/admin" element={<Adminpage />} /> */}
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/"></Navigate>}
            />
            <Route path="/posts/:id" element={<SinglePostPage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
