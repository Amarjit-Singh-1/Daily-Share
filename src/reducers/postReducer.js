const postInit = [
  {
    title: "something",
    _id: 1,
    description: "what the fuck is this app",
    likes: [],
    postedBy: { name: "someone", _id: 1 },
    time: Date.now()
  },
  {
    title: "something",
    _id: 2,
    description: "what the fuck is this app",
    likes: [],
    postedBy: { name: "someone", _id: 1 },
    time: Date.now()
  },
  {
    title: "something",
    _id: 3,
    description: "what the fuck is this app",
    likes: [],
    postedBy: { name: "someone", _id: 1 },
    time: Date.now()
  }
];

const postReducer = (state = postInit, action) => {
  switch (action.type) {
    case "SET_POSTS": {
      return action.payload.posts;
    }
    case "CREATE_POST": {
      const newState = JSON.parse(JSON.stringify(state));
      const newPost = JSON.parse(JSON.stringify(action.payload.post));
      newPost.postedBy = {
        _id: action.payload.user._id,
        diplayPicture: action.payload.user.diplayPicture,
        username: action.payload.user.username
      };
      newState.unshift(newPost);
      return newState;
    }
    case "DELETE_POST": {
      const newState = JSON.parse(JSON.stringify(state));
      const idx = state.findIndex((el) => el._id === action.payload.id);
      newState.splice(idx, 1);
      return newState;
    }
    case "LIKE_POST": {
      const newState = JSON.parse(JSON.stringify(state));
      const idx = newState.findIndex((el) => el._id === action.payload.postId);
      newState[idx].likes.push(action.payload.userId);
      return newState;
    }
    case "UNLIKE_POST": {
      const newState = JSON.parse(JSON.stringify(state));
      const idx = newState.findIndex((el) => el._id === action.payload.postId);
      const index = newState[idx].likes.findIndex(
        (el) => el === action.payload.userId
      );
      newState[idx].likes.splice(index, 1);
      return newState;
    }
    case "EDIT_POST": {
      const newState = JSON.parse(JSON.stringify(state));
      console.log(action.payload.id);
      return newState;
    }
    default:
      return state;
  }
};

export default postReducer;
// {
//   title: "something",
//   _id: 1,
//   description: "what the fuck is this app",
//   likes: [],
//   postedBy: "someone",
//   time: Date.now()
// },
// {
//   title: "something",
//   _id: 2,
//   description: "what the fuck is this app",
//   likes: [],
//   postedBy: "someone",
//   time: Date.now()
// },
// {
//   title: "something",
//   _id: 3,
//   description: "what the fuck is this app",
//   likes: [],
//   postedBy: "someone",
//   time: Date.now()
// }
