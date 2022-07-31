import "./App.css";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/home/Home";
import Profile from "./pages/Profile/Profile";
import Verification from "./pages/Verification/Verification";
import { MantineProvider } from "@mantine/core";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PostDetail from "./pages/PostDetail/PostDetail";

function App() {
  const user = useSelector((state) => state.authReducer.authData);
  return (
    <MantineProvider theme={{ colorScheme: "dark" }}>
      <div className="App">
        <div style={{ top: "-18%", right: "0" }}></div>
        <div style={{ top: "36%", left: "-8rem" }}></div>
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="home" /> : <Navigate to="auth" />}
          />
          <Route
            path="/home"
            element={user ? <Home /> : <Navigate to="../auth" />}
          />
          <Route
            path="/auth"
            element={user ? <Navigate to="../home" /> : <Auth />}
          />
          <Route
            path="/profile/:id"
            element={user ? <Profile /> : <Navigate to="../auth" />}
          ></Route>
          <Route
            path="/verification/:token"
            element={user ? <Verification /> : <Navigate to="./auth" />}
          ></Route>
          <Route
            path="/post/:id"
            element={user ? <PostDetail /> : <Navigate to="../auth" />}
          ></Route>
        </Routes>
      </div>
    </MantineProvider>
  );
}

export default App;
