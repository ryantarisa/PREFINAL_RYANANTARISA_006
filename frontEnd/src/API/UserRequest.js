import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:9000" });

export const getUser = (userId) => API.get(`/user/${userId}`);

export const updateUser = (id, formData) => API.patch(`/user/${id}`, formData);

export const verifyUser = (id) =>
  API.get(`/user/verified/${id._id}`)
    .then((res) => console.log(res), console.log(id))
    .catch((err) => console.log(err));
