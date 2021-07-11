import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../actions/userActions";
import { Link } from "react-router-dom";
export function SignUp() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
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
  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        className="input"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        className="input"
        type="text"
        placeholder="Enter Password"
        password={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Link to="/signin">Have an account already?</Link>
      <button type="submit" className="btn">
        {isLogging && "Creating account..."}
        {!isLogging && "Sign Up"}
      </button>
    </form>
  );
}
// const res = await fetch(
//   "https://SocialMedia.amarjitsingh2.repl.co/api/v1/auth",
//   {
//     method: "POST",
//     body: JSON.stringify({
//       username,
//       password
//     })
//   }
// );
