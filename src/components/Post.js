import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { likePost } from "../actions/postActions";
import { unlikePost } from "../actions/postActions";
import axios from "axios";
import "../App.css";
import { useToken } from "../utils";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Post({ post }) {
  const [likeLoader, setLikeLoader] = useState(false);
  const dispatch = useDispatch();
  const _id = useSelector((state) => state.user._id);
  const token = useToken();
  const handleLike = async (e) => {
    setLikeLoader(true);
    try {
      e.preventDefault();
      const res = await axios.put(
        `https://SocialMedia.amarjitsingh2.repl.co/api/v1/post/like`,
        {
          postId: post._id
        },
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      if (res.data.post.title) {
        dispatch(likePost(post._id, _id));
      } else {
        alert("Can't log you in 😐");
      }
    } catch (error) {
      console.log(error);
    }
    setLikeLoader(false);
  };
  const handleUnlike = async (e) => {
    setLikeLoader(true);
    try {
      e.preventDefault();
      const res = await axios.put(
        `https://SocialMedia.amarjitsingh2.repl.co/api/v1/post/unlike`,
        {
          postId: post._id
        },
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      console.log(res);
      if (res.data.post.title) {
        dispatch(unlikePost(post._id));
      } else {
        alert("Can't log you in 😐");
      }
    } catch (error) {
      console.log(error);
    }
    setLikeLoader(false);
  };
  return (
    <div className="card">
      <div className="card-front">
        <Link
          to={`/profile/${
            _id === post.postedBy?._id ? "" : post.postedBy?._id
          }`}
        >
          <h2>{post.postedBy?.username}</h2>
        </Link>
        <h4>
          {post.title} <span> - {moment(post.time).fromNow()}</span>
        </h4>
        <p>{post.description}</p>
        {likeLoader && (
          <button className="icon-btn">
            <span class="material-icons-outlined">loop</span>
          </button>
        )}
        {!likeLoader && (
          <>
            {post.likes.includes(_id) ? (
              <button className="icon-btn btn-red" onClick={handleUnlike}>
                <i className="material-icons-outlined">favorite</i>
              </button>
            ) : (
              <button className="icon-btn" onClick={handleLike}>
                <i className="material-icons-outlined">favorite_border</i>
              </button>
            )}
          </>
        )}
        {post.likes.length}
      </div>
    </div>
  );
}

/* <div class="card text-left">
  <div class="card-front">
    <div class="card-content">
      <h3>Basic card: left text</h3>
      <p>I'm just a standard card with my text aligned to the left</p>
      <button class="btn">Click me!</button>
    </div>
  </div>
</div>; */
