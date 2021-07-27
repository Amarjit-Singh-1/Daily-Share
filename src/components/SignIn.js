import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../actions/userActions";
export function SignIn() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLogging, setIsLogging] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    setIsLogging(true);
    try {
      e.preventDefault();
      const res = await axios.put(
        `https://SocialMedia.amarjitsingh2.repl.co/api/v1/auth`,
        {
          username,
          password
        }
      );
      setIsLogging(false);
      setPassword("");
      setUserName("");
      if (res.data.user.username) {
        dispatch(loginUser({ user: res.data.user }));
      } else {
        alert("Can't log you in 😐");
      }
    } catch (error) {
      console.log(error);
      setIsLogging(false);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="signin-container">
      <form onSubmit={handleSubmit} className="form Signin">
        <span className="heading">Login</span>
        <input
          className="input"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter Username"
          required
        />
        <div className="password">
          <input
            className="input"
            type={showPassword ? "text" : "password"}
            password={password}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="material-icons-outlined"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "visibility" : "visibility_off"}
          </span>
        </div>
        <span>
          Don't have an account?{" "}
          <Link to="/signup" style={{ textDecoration: "none", color: "" }}>
            Sign Up
          </Link>
          .
        </span>
        <button className="btn" type="submit">
          {isLogging && "Logging you in..."}
          {!isLogging && "Login"}
        </button>
      </form>
    </div>
  );
}
