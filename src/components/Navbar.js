import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../actions/userActions";
import "../App.css";
import Search from "./Search";

function Navbar({ user }) {
  const dispatch = useDispatch();
  return (
    <ul className="navigation-bar">
      {!user && (
        <>
          <li>
            <Link to="/signin">Signin</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </>
      )}
      {user && (
        <>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Search />
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
  );
}
export default Navbar;
//<span className="navigation-bar-logo">
//<Svg />
//</span>
