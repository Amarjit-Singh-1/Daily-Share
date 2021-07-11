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
      const user = JSON.parse(JSON.stringify(action.payload.user));
      // newState = {...user}
      return { ...user };
    }
    case "LOGOUT_USER": {
      return userInit;
    }
    case "FOLLOW_USER": {
      const newState = JSON.parse(JSON.stringify(state));
      console.log(action.payload.id);
      return newState;
    }
    case "UNFOLLOW_USER": {
      const newState = JSON.parse(JSON.stringify(state));
      console.log(action.payload.id);
      return newState;
    }
    default: {
      return state;
    }
  }
};

// https://replit.com/@AmarjitSingh2/SocialMedia#Models/post.js

export default userReducer;
