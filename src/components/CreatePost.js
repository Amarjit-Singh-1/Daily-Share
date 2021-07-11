import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../actions/postActions";
import axios from "axios";
import { useToken } from "../utils.js";

export function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const token = useToken();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://SocialMedia.amarjitsingh2.repl.co/api/v1/post`,
        {
          title,
          description
        },
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      if (res.data.post.title) {
        dispatch(createPost(res.data.post));
      } else {
        alert("Can't log you in 😐");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        className="input"
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="input"
        type="text"
        placeholder="Write your post here..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" className="btn">
        Post
      </button>
    </form>
  );
}
