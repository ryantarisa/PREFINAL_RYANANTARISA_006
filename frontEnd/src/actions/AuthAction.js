import * as AuthApi from "../API/AuthRequest.js";

export const logIn = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.logIn(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "AUTH_FAIL", error: error });
  }
};

export const register = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.register(formData);
    console.log(data);
    dispatch({ type: "AUTH_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "AUTH_FAIL", error: error });
    console.log(error);
  }
};

export const logOut = () => async (dispatch) => {
  dispatch({ type: "LOG_OUT" });
};
