import * as UserApi from "../API/UserRequest.js";

export const updateUser = (id, formData) => async (dispatch) => {
  dispatch({ type: "UPDATING_START" });
  try {
    const { data } = await UserApi.updateUser(id, formData);
    dispatch({ type: "UPDATING_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "UPDATING_FAIL" });
  }
};

export const verifyUser = (id, isVerified) => async (dispatch) => {
  dispatch({ type: "VERIFICATION_START" });
  try {
    const { data } = await UserApi.verifyUser(id, isVerified);
    dispatch({ type: "VERIFICATION_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "VERIFICATION_FAIL" });
  }
};
