export const loginUser = ({ user }) => {
  return {
    type: "LOGIN_USER",
    payload: { user }
  };
};

export const logoutUser = () => {
  return {
    type: "LOGOUT_USER"
  };
};

export const followUser = (following) => {
  return {
    type: "FOLLOW",
    payload: { following }
  };
};

export const unfollowUser = (following) => {
  return {
    type: "UNFOLLOW",
    payload: { following }
  };
};
