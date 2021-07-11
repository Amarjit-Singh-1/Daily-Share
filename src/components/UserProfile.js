// import { user } from "../fakedata";
import { followUser, unfollowUser } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { apiEndPoint, useToken } from "../utils";
import UserPosts from "./UserPosts";
import { toggleSearch } from "../actions/settingsActions";
const userInit = {
  username: null,
  token: null,
  _id: null,
  password: null,
  followers: [],
  following: [],
  diplayPicture:
    "https://res.cloudinary.com/hookupcloudddddddddddd/image/upload/v1602536872/temp_au3esd.png"
};
export default function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userId } = useParams();
  // const handleFollow = (e) => {};
  // const handleUnFollow = (e) => {};
  // const [showPosts, setShowPosts] = useState(false);
  const [profileUserData, setProfileUserData] = useState(userInit);
  const [status, setStatus] = useState("idle");
  const token = useToken();
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
  return (
    <div className="profile">
      <h1>User Profile</h1>
      <img src={user.diplayPicture} alt="display" className="profile__dp" />
      {status === "success" && (
        <>
          <div>
            <div>Username: {profileUserData.username}</div>
            <div>{profileUserData.followers.length} Followers</div>
            <div>{profileUserData.following.length} Following</div>
          </div>
          <div>
            {profileUserData.followers.includes(userId) ? (
              <button
                className="btn"
                onClick={() => dispatch(unfollowUser(profileUserData._id))}
              >
                unFollow
              </button>
            ) : (
              <button
                className="btn"
                onClick={() => dispatch(followUser(profileUserData._id))}
              >
                Follow
              </button>
            )}
          </div>
        </>
      )}
      {status === "error" && <button onClick={getUser}>Retry</button>}
      {status === "loading" && <p>Loading user data....</p>}
      <UserPosts userId={userId} />
    </div>
  );
}
