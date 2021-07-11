export const login = {
  user: {
    followers: [],
    following: [],
    diplayPicture:
      "https://res.cloudinary.com/hookupcloudddddddddddd/image/upload/v1602536872/temp_au3esd.png",
    _id: "60e956860eaee10703113bce",
    username: "abhishek",
    __v: 0,
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGU5NTY4NjBlYWVlMTA3MDMxMTNiY2UiLCJ1c2VybmFtZSI6ImFiaGlzaGVrIiwiaWF0IjoxNjI1OTE3OTQwfQ.eqAoIBuTqd-TJmQYbNl3wD4WUNb4464xqK5uJEsHe3g"
  }
};
export const signup = {
  user: {
    followers: [],
    following: [],
    diplayPicture:
      "https://res.cloudinary.com/hookupcloudddddddddddd/image/upload/v1602536872/temp_au3esd.png",
    _id: "60e98a42977061063d57dfdd",
    username: "raj",
    password: "$2b$12$i5mrIhKTzmyzrdOyBvi0.ORR12l4cQ0GJvJeF/NVLzKZLmE9HLGYS",
    __v: 0
  },
  message: "Account created successfully"
};

/**
body => {
 "title": "Second post",
    "description": "Single Page Applications in React require a means of routing to navigate on to different views without refreshing the webpage. This can be done using React Router",
    "id": "60e956860eaee10703113bce"
}
 */
export const createpost = {
  post: {
    likes: [],
    _id: "60e98a63977061063d57dfdf",
    title: "Second post",
    description:
      "Single Page Applications in React require a means of routing to navigate on to different views without refreshing the webpage. This can be done using React Router",
    postedBy: "60e956860eaee10703113bce",
    time: "2021-07-10T11:54:11.081Z",
    __v: 0
  },
  message: "Successfully created post"
};

export const likepost = {
  post: {
    likes: ["60e956860eaee10703113bce"],
    _id: "60e98435fd350c050de11a0c",
    title: "First post",
    description:
      "Single Page Applications in React require a means of routing to navigate on to different views without refreshing the webpage. This can be done using React Router",
    postedBy: "60e956860eaee10703113bce",
    time: "2021-07-10T11:27:49.521Z",
    __v: 0
  }
};

export const unlikepost = {
  post: {
    likes: [],
    _id: "60e98435fd350c050de11a0c",
    title: "First post",
    description:
      "Single Page Applications in React require a means of routing to navigate on to different views without refreshing the webpage. This can be done using React Router",
    postedBy: "60e956860eaee10703113bce",
    time: "2021-07-10T11:27:49.521Z",
    __v: 0
  }
};
