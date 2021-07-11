import { Post } from "./Post";
import { CreatePost } from "./CreatePost";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { apiEndPoint, useToken } from "../utils";
import { setPosts } from "../actions/postActions";
export function Home() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const token = useToken();
  const [status, setStatus] = useState("idle");
  const getPosts = useCallback(async () => {
    setStatus("loading");
    try {
      const newPosts = await axios.get(`${apiEndPoint}/api/v1/post`, {
        headers: {
          Authorization: "Bearer " + token
        }
      });
      if (newPosts.data.posts.length) {
        dispatch(setPosts(newPosts.data.posts));
        setStatus("success");
        return;
      }
      setStatus("fail");
    } catch (error) {
      setStatus("fail");
      console.log(error.message);
      alert("Failed to fetch");
    }
  }, [dispatch, token]);
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div className="home">
      <CreatePost />
      {status === "success" && (
        <button onClick={getPosts}>
          <span role="img" aria-label="">
            🔄
          </span>
        </button>
      )}
      {status === "success" &&
        state.posts.map((post) => {
          return <Post key={post._id} post={post} />;
        })}
      {status === "loading" && <p>Loading all the posts...</p>}
      {status === "fail" && (
        <p>
          There was an error
          <button onClick={getPosts}>
            <span role="img" aria-label="">
              🔄
            </span>
          </button>
        </p>
      )}
    </div>
  );
}
