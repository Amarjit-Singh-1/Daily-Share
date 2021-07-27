import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleSearch } from "../actions/settingsActions";
import { apiEndPoint, useToken } from "../utils";

const Search = () => {
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("idle");
  const dispatch = useDispatch();
  const isSearchOpen = useSelector((state) => state.settings.isSearchOpen);
  const token = useToken();
  const getUsers = useCallback(async () => {
    try {
      if (input) {
        setStatus("loading");
        const { data } = await axios(
          `${apiEndPoint}/api/v1/user/search/${input}`,
          {
            headers: {
              Authorization: "Bearer " + token
            }
          }
        );
        console.log(data);
        setUsers(data.users);
        setStatus("success");
      }
    } catch (error) {
      setStatus("fail");
      console.log(error.message);
    }
  }, [input, token]);
  useEffect(() => {
    let timer = setTimeout(() => {
      getUsers(); //debouncing implemented
    }, 400);
    return () => {
      clearTimeout(timer);
    };
  }, [getUsers]);
  useEffect(() => {
    if (input) {
      dispatch(toggleSearch(true));
    } else {
      dispatch(toggleSearch(false));
    }
  }, [input, dispatch]);

  return (
    <div className="search">
      <input
        value={input}
        type="search"
        className="search"
        onChange={(e) => setInput(e.target.value)}
        placeholder="search by username"
      />
      <ul className="search-list-container">
        {isSearchOpen &&
          input &&
          status === "success" &&
          users.map((user) => (
            <li key={user._id} className="search-list-item">
              <Link to={`/profile/${user._id}`}>{user.username}</Link>
            </li>
          ))}
        {users.length === 0 && status === "success" && isSearchOpen && (
          <p>No users found</p>
        )}
        {isSearchOpen && status === "loading" && <p>loading users...</p>}
        {isSearchOpen && status === "fail" && <p>some error</p>}
      </ul>
    </div>
  );
};
export default Search;
