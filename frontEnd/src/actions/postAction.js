import * as PostApi from "../API/PostRequest.js";

export const getTimelinePosts = (id) => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    const { data } = await PostApi.getTimelinePosts(id);
    dispatch({ type: "RETREIVING_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "RETREIVING_FAIL" });
    console.log(error);
  }
};

export const getPost = (id) => async (dispatch) => {
  dispatch({ type: "GETPOST_START" });
  try {
    const { data } = await PostApi.getPost(id);
    dispatch({ type: "GETPOST_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "GETPOST_FAIL" });
    console.log(error);
  }
};

export const editPost = (id, formData) => async (dispatch) => {
  dispatch({ type: "EDIT_START" });
  try {
    console.log("Test data", formData);
    const { data } = await PostApi.editPost(id, formData);
    console.log(data);
    dispatch({ type: "EDIT_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "EDIT_FAIL" });
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  dispatch({ type: "LIKE_START" });
  try {
    const { data } = await PostApi.likePost(id);
    dispatch({ type: "LIKE_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "LIKE_FAIL" });
    console.log(error);
  }
};

export const delPost = (id, formData) => async (dispatch) => {
  dispatch({ type: "DELETE_START" });
  try {
    const { data } = await PostApi.delPost(id, formData);
    console.log("ini data:", data);
    dispatch({ type: "DELETE_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "DELETE_FAIL" });
    console.log(error);
  }
};
