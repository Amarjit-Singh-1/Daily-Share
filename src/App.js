import "./App.css";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { PrivateRouter } from "./components/PrivateRouter";
import { Home } from "./components/Home";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import UserProfile from "./components/UserProfile";
import { useCloseSearchListner, useToken } from "./utils";

export default function App() {
  const user = useSelector((state) => state.user);
  useCloseSearchListner();
  const token = useToken();
  return (
    <div className="App">
      <Navbar user={user.username} />
      <div className="container">
        <Routes>
          <PrivateRouter
            condition={token}
            redirectPath="/signin"
            path="/"
            element={<Home />}
          />
          <PrivateRouter
            condition={token}
            redirectPath="/signin"
            path="/profile"
            element={<Profile />}
          />
          <PrivateRouter
            condition={token}
            redirectPath="/signin"
            path="/profile/:userId"
            element={<UserProfile />}
          />
          <PrivateRouter
            condition={!token}
            redirectPath="/"
            path="/signin"
            element={<SignIn />}
          />
          <PrivateRouter
            condition={!token}
            redirectPath="/"
            path="/signup"
            element={<SignUp />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}
function NotFound() {
  return "Not Found 404!";
}
