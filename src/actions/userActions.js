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

export const followUser = (id) => {
  return {
    type: "FOLLOW_USER",
    payload: { id }
  };
};

export const unfollowUser = (id) => {
  return {
    type: "UNFOLLOW_USER",
    payload: { id }
  };
};
