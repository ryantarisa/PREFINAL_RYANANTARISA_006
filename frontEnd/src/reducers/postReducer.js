const postReducer = (
  state = { posts: [], loading: false, error: false, uploading: false },
  action
) => {
  switch (action.type) {
    case "UPLOAD_START":
      return { ...state, uploading: true, error: false };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        posts: [action.data, ...state.posts],
        uploading: false,
        error: false,
      };
    case "UPLOAD_FAIL":
      return { ...state, uploading: false, error: true };

    case "EDIT_START":
      return { ...state, editLoading: true, error: false };
    case "EDIT_SUCCESS":
      localStorage.setItem("store", JSON.stringify({ ...action?.data }));
      const index = state.posts.findIndex(
        (post) => post._id === action.data._id
      );
      const newPosts = [...state.posts];
      newPosts[index] = action.data;
      return {
        ...state,
        posts: newPosts,
        editLoading: false,
        error: false,
      };
    case "EDIT_FAIL":
      return { ...state, editLoading: false, error: true };

    ///// DELETE
    case "DELETE_START":
      return { ...state, deleteLoading: true, error: false };
    case "DELETE_SUCCESS":
      localStorage.setItem("store", JSON.stringify({ ...action?.data }));

      let newPostList = [];
      state.posts.forEach((post) => {
        if (post._id !== action.data._id) {
          newPostList.push(post);
        }
      });
      return {
        ...state,
        posts: newPostList,
        deleteLoading: false,
        error: false,
      };
    case "DELETE_FAIL":
      return { ...state, deleteLoading: false, error: true };
    case "RETREIVING_START":
      return { ...state, loading: true, error: false };
    case "RETREIVING_SUCCESS":
      return { ...state, posts: action.data, loading: false, error: false };
    case "RETREIVING_FAIL":
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default postReducer;
