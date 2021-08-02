import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { apiEndPoint, useToken } from "../utils";
import UserPosts from "./UserPosts";
import { toggleSearch } from "../actions/settingsActions";
import Loader from "react-loader-spinner";
const userInit = {
  followers: [],
  following: [],
  diplayPicture:
    "https://res.cloudinary.com/hookupcloudddddddddddd/image/upload/v1602536872/temp_au3esd.png",
  _id: null,
  username: null,
  posts: []
};
export default function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userId } = useParams();
  const [profileUserData, setProfileUserData] = useState(userInit);
  const [status, setStatus] = useState("idle");
  const [followLoader, setFollowLoader] = useState(false);
  const token = useToken();
  console.log(profileUserData._id === userId);
  const getUser = useCallback(async () => {
    setStatus("loading");
    try {
      const res = await axios(`${apiEndPoint}/api/v1/user/${userId}`, {
        headers: {
          Authorization: "Bearer " + token
        }
      });
      if (res.data.user.username) {
        setStatus("success");
        setProfileUserData(res.data.user);
        return;
      }
      setStatus("fail");
    } catch (error) {
      console.log(error);
      setStatus("fail");
    }
  }, [token, userId]);
  useEffect(() => {
    getUser();
  }, [getUser]);
  useEffect(() => {
    dispatch(toggleSearch(false));
  }, [dispatch]);
  const handleFollow = async (e) => {
    if (profileUserData._id !== userId) {
      console.log("Bad request");
      return;
    }
    setFollowLoader(true);
    try {
      const res = await axios.put(
        `https://SocialMedia.amarjitsingh2.repl.co/api/v1/user/follow`,
        {
          userId: profileUserData._id
        },
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      if (res.data.success) {
        const newState = JSON.parse(JSON.stringify(profileUserData));
        newState.followers = res.data.followedUser.followers;
        setProfileUserData(newState);
        dispatch({
          type: "FOLLOW",
          payload: {
            following: res.data.loggedInUser.following
          }
        });
      } else {
        alert("Some error occured 😐");
      }
    } catch (error) {
      console.log(error);
    }
    setFollowLoader(false);
  };
  const handleUnFollow = async (e) => {
    if (profileUserData._id !== userId) {
      console.log("Bad request");
      return;
    }
    setFollowLoader(true);
    try {
      const res = await axios.put(
        `https://SocialMedia.amarjitsingh2.repl.co/api/v1/user/unfollow`,
        {
          userId: profileUserData._id
        },
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      if (res.data.success) {
        const newState = JSON.parse(JSON.stringify(profileUserData));
        newState.followers = res.data.unfollowedUser.followers;
        setProfileUserData(newState);
        dispatch({
          type: "UNFOLLOW",
          payload: {
            following: res.data.loggedInUser.following
          }
        });
      } else {
        alert("Can't log you in 😐");
      }
    } catch (error) {
      console.log(error);
    }
    setFollowLoader(false);
  };
  const isFollowed = useMemo(
    () => profileUserData.followers.includes(user._id),
    [user._id, profileUserData.followers]
  );
  return (
    <div className="profile">
      <img src={user.diplayPicture} alt="display" className="profile__dp" />
      {status === "success" && (
        <>
          <div>
            <div className="user-heading">{profileUserData.username}</div>
            <div className="user-info">
              <div>{profileUserData.followers.length} Followers</div>
              <div>{profileUserData.following.length} Following</div>
            </div>
          </div>
          <div>
            {followLoader ? (
              isFollowed ? (
                <button className="btn">UnFollowing...</button>
              ) : (
                <button className="btn">Following...</button>
              )
            ) : isFollowed ? (
              <button className="btn" onClick={handleUnFollow}>
                Unfollow
              </button>
            ) : (
              <button className="btn" onClick={handleFollow}>
                Follow
              </button>
            )}
          </div>
        </>
      )}
      {status === "error" && <button onClick={getUser}>Retry</button>}
      {status === "loading" && (
        <Loader type="Rings" color="#00BFFF" height={80} width={80} />
      )}
      <UserPosts userId={userId} />
    </div>
  );
}
