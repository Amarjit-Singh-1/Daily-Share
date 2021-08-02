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
const userReducer = (state = userInit, action) => {
  switch (action.type) {
    case "LOGIN_USER": {
      // let newState = JSON.parse(JSON.stringify(state));
      if (action.payload.user.token) {
        localStorage.setItem("jwt", action.payload.user.token);
      }
      const user = JSON.parse(JSON.stringify(action.payload.user));
      // newState = {...user}
      return { ...user };
    }
    case "LOGOUT_USER": {
      localStorage.removeItem("jwt");
      return userInit;
    }
    case "FOLLOW": {
      const newState = JSON.parse(JSON.stringify(state));
      newState.following = action.payload.following;
      return newState;
    }
    case "UNFOLLOW": {
      const newState = JSON.parse(JSON.stringify(state));
      newState.following = action.payload.following;
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
