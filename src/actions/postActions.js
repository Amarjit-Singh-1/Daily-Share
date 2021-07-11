export const createPost = (post, user) => {
  return {
    type: "CREATE_POST",
    payload: { post, user }
  };
};

export const likePost = (postId, userId) => {
  return {
    type: "LIKE_POST",
    payload: { postId, userId }
  };
};

export const unlikePost = (postId, userId) => {
  return {
    type: "UNLIKE_POST",
    payload: { postId, userId }
  };
};

export const deletePost = () => {
  return {
    type: "DELETE_POSTS"
  };
};

export const editPost = () => {
  return {
    type: "EDIT_POSTS"
  };
};

export const setPosts = (posts) => {
  return {
    type: "SET_POSTS",
    payload: { posts }
  };
};

// closures
// promises
// usestate vs usereducer
