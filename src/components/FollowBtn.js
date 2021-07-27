import axios from "axios";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";

const FollowBtn = ({ profileUserData, setProfileUserData, token, userId }) => {
  const [followLoader, setFollowLoader] = useState(false);
  const dispatch = useDispatch();
  console.log(profileUserData._id);
  const handleFollow = async (e) => {
    setFollowLoader(true);
    try {
      e.preventDefault();
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
      console.log(res);
      if (res.data.loggedInUser.username) {
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
    setFollowLoader(true);
    try {
      e.preventDefault();
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
      console.log(res);
      if (res.data.loggedInUser.username) {
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
  const isFollowed = useMemo(() => profileUserData.followers.includes(userId), [
    userId,
    profileUserData.followers
  ]);
  return (
    <div>
      {followLoader && <p>Loading....</p>}
      {isFollowed && !followLoader ? (
        <button className="btn" onClick={handleFollow}>
          unFollow
        </button>
      ) : (
        <button className="btn" onClick={handleUnFollow}>
          Follow
        </button>
      )}
    </div>
  );
};
