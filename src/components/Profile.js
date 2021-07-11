// import { user } from "../fakedata";
// import { followUser, unfollowUser } from "../actions/userActions";
import {  useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
export default function Profile() {
  // const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // const { userId } = useParams();
  // const handleFollow = (e) => {};
  // const handleUnFollow = (e) => {};
  return (
    <div className="profile">
      <h1>User Profile</h1>
      <img src={user.diplayPicture} alt="display" className="profile__dp" />
      <div>
        <div>Username: {user.username}</div>
        <div>{user.followers.length} Followers</div>
        <div>{user.following.length} Following</div>
      </div>
    </div>
  );
}
