import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../actions/postActions";
import axios from "axios";
import { useToken } from "../utils.js";

export function CreatePost() {
  const user = useSelector((state) => state.user);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const token = useToken();
  const dispatch = useDispatch();
  // console.log(user);
  const handleSubmit = async (e) => {
    setIsPosting(true);
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://SocialMedia.amarjitsingh2.repl.co/api/v1/post`,
        {
          title,
          description,
          id: user._id
        },
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      setIsPosting(false);
      setTitle("");
      setDescription("");
      console.log(res);
      if (res.data.post.title) {
        dispatch(createPost(res.data.post, user));
      } else {
        alert("Can't log you in 😐");
      }
    } catch (error) {
      console.log(error);
      setIsPosting(false);
    }
  };
  return (
    <div
      className="Signin"
      style={{ marginTop: "0rem", marginBottom: "1.5rem" }}
    >
      <form onSubmit={handleSubmit} className="form">
        <input
          className="post-title"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="post-description resizedTextbox"
          type="text"
          placeholder="Write your post here..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" className="btn">
          {isPosting ? "Posting..." : "Post"}
        </button>
      </form>
    </div>
  );
}
