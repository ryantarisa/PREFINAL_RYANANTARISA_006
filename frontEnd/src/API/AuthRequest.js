import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:9000" });

export const logIn = (formData) =>
  API.post("/auth/login", formData)
    // .then((res) => {
    //   return res, console.log(res, formData);
    // })
    .catch((err) => {
      throw new Error(err.response.data.message);
    });

export const register = (formData) =>
  API.post("/auth/register", formData)
    // .then((res) => {
    //   return res, console.log(res, formData);
    // })
    .catch((err) => {
      throw new Error(err.response.data.message);
    });
