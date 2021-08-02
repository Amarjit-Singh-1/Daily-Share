import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../actions/userActions";
import { Link } from "react-router-dom";
export function SignUp() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [retypedPassword, setRetypedPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    setIsLogging(true);
    try {
      e.preventDefault();
      const res = await axios.post(
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
      setIsLogging(false);
      console.log(error);
    }
  };
  const isPasswordMatched =
    retypedPassword !== "" && retypedPassword === password;
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="form Signup">
        <span className="heading">SignUp</span>
        <input
          className="input"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <div className="password">
          <input
            className="input"
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            password={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            class="material-icons-outlined"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "visibility" : "visibility_off"}
          </span>
        </div>
        <input
          className="input"
          type="text"
          placeholder="Re-Type Password"
          password={retypedPassword}
          onChange={(e) => setRetypedPassword(e.target.value)}
          required
        />
        <span className="font-1 color-1">
          {retypedPassword !== "" && !isPasswordMatched
            ? "Both Password must Match!"
            : ""}
        </span>
        <span>
          Have an account already?{" "}
          <Link to="/signin" style={{ textDecoration: "none" }}>
            Sign In
          </Link>
        </span>
        <button
          type="submit"
          className={
            retypedPassword !== "" && !isPasswordMatched
              ? "disabled-btn"
              : "btn"
          }
          disabled={!isPasswordMatched}
        >
          {isLogging && "Creating account..."}
          {!isLogging && "Sign Up"}
        </button>
      </form>
    </div>
  );
}
