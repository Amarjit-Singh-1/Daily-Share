import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { apiEndPoint, useToken } from "../utils";
import { Post } from "./Post";

export default function UserPosts({ userId }) {
  const [userPosts, setUserPosts] = useState([]);
  const [status, setStatus] = useState("idle");
  const token = useToken();
  const getPosts = useCallback(async () => {
    setStatus("loading");
    try {
      const res = await axios(`${apiEndPoint}/api/v1/user/${userId}/posts`, {
        headers: {
          Authorization: "Bearer " + token
        }
      });
      if (res.data.posts) {
        setStatus("success");
        setUserPosts(res.data.posts);
        return;
      }
      setStatus("fail");
    } catch (error) {
      console.log(error);
      setStatus("fail");
    }
  }, [token, userId]);
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return (
    <div className="home">
      {status === "success" &&
        userPosts.map((post) => <Post key={post._id} post={post} />)}
      {status === "loading" && <p>Loading posts...</p>}
      {status === "error" && (
        <p>
          There was an error <button onClick={getPosts}>retry</button>
        </p>
      )}
      {status === "success" && userPosts.length === 0 && <p>No posts found</p>}
    </div>
  );
}
