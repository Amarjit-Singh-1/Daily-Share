import "./App.css";
// import  from "./actions";
// import { petIncrement, petDecrement } from "./actions";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { PrivateRouter } from "./components/PrivateRouter";
import { Home } from "./components/Home";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import UserProfile from "./components/UserProfile";
import { useCloseSearchListner } from "./utils";

/**
 auth -> signin, signup
//  auth
 user -> user details,
 post -> create a post, get a post, get all posts 

 bcrypt -> hash pwd
 jwt -> user login -> token -> `BEARER token`
 */
export default function App() {
  const user = useSelector((state) => state.user);
  useCloseSearchListner();
  return (
    <div className="App">
      <Navbar user={user.username} />
      <div className="container">
        <Routes>
          <PrivateRouter
            condition={user.username}
            redirectPath="/signin"
            path="/"
            element={<Home />}
          />
          <PrivateRouter
            condition={user.username}
            redirectPath="/signin"
            path="/profile"
            element={<Profile />}
          />
          <PrivateRouter
            condition={user.username}
            redirectPath="/signin"
            path="/profile/:userId"
            element={<UserProfile />}
          />
          <PrivateRouter
            condition={!user.username}
            redirectPath="/"
            path="/signin"
            element={<SignIn />}
          />
          <PrivateRouter
            condition={!user.username}
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

/**
 const headers = {
	headers: {
		Authorization: "Bearer " + state.user.token,
	},
};
  axios.put(
			`${apiEndPoint}/like`,
			{ postId },
			{ ...headers }
		);
  */
