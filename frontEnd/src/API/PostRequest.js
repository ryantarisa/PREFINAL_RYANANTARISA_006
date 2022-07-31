import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:9000" });

export const getTimelinePosts = (id) => API.get(`/post/${id}/timeline`);

export const getPost = (id) => API.get(`/post/${id}`);

export const likePost = (id, userId) =>
  API.patch(`/post/${id}/likedislike`, { userId: userId });

export const editPost = (id, formData) =>
  API.patch(`/post/${id}`, { userId: formData.userId, desc: formData.desc });

export const delPost = (id, formData) =>
  API.delete(`/post/${id}`, { data: { userId: formData.userId } });
