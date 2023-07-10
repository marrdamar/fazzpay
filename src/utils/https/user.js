import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_ANALYTICS_ID;

export const getDashboard = (token, userId, controller) => {
  const url = `${baseUrl}dashboard/${userId}`;
  return axios.get(url, {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getProfile = (token, userId, controller) => {
  const url = `${baseUrl}user/profile/${userId}`;
  return axios.get(url, {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const editProfile = (token, userId, body, controller) => {
  const url = `${baseUrl}user/profile/${userId}`;
  return axios.patch(url, body, {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const editPassword = (token, userId, body, controller) => {
  const url = `${baseUrl}user/password/${userId}`;
  return axios.patch(url, body, {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const editImage = (token, userId, file, controller) => {
  const url = `${baseUrl}user/image/${userId}`;
  const formData = new FormData();
  if (file !== "") {
    formData.append("image", file);
  }
  return axios.patch(url, formData, {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${token}` },
  });
};
