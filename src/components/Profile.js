import { useSelector } from "react-redux";
import UserPosts from "./UserPosts";
export default function Profile() {
  const user = useSelector((state) => state.user);
  return (
    <div className="profile">
      <h1>User Profile</h1>
      <img src={user.diplayPicture} alt="display" className="profile__dp" />
      <div>
        <div className="user-heading"> {user.username}</div>
        <div>{user.followers.length} Followers</div>
        <div>{user.following.length} Following</div>
      </div>
      <UserPosts userId={user._id} />
    </div>
  );
}
