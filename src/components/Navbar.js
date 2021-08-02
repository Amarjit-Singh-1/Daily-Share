import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser, logoutUser } from "../actions/userActions";
import "../App.css";
import { Svg } from "../Svg";
import { apiEndPoint, useToken } from "../utils";
import Search from "./Search";

function Navbar({ user }) {
  const dispatch = useDispatch();
  const token = useToken();
  const [waiting, setWaiting] = useState(false);
  const isSignedIn = useCallback(async () => {
    if (!user && token) {
      setWaiting(true);
      try {
        const res = await axios(`${apiEndPoint}/api/v1/auth/user`, {
          headers: {
            Authorization: "Bearer " + token
          }
        });
        console.log(res.data.user);
        dispatch(loginUser({ user: res.data.user }));
      } catch (error) {
        console.log(error.message);
        console.log(error);
        dispatch(logoutUser());
      }
      setWaiting(false);
    }
  }, [dispatch, token, user]);
  useEffect(() => {
    isSignedIn();
  }, [isSignedIn]);
  if (waiting) {
    return (
      <div className="navigation-bar">
        <span className="navigation-bar-logo">
          <Svg />
        </span>
      </div>
    );
  }
  return (
    <div className="navigation-bar">
      <span className="navigation-bar-logo">
        <Svg />
      </span>
      <nav>
        <ul className="navigation-bar-links">
          {!user && (
            <>
              <li>
                <Link to="/signin">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <Search />
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/signin" onClick={() => dispatch(logoutUser())}>
                  Logout
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}
export default Navbar;
