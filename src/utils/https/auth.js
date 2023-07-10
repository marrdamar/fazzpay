import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_ANALYTICS_ID;

export const register = (body, controller) => {
  const url = `${baseUrl}auth/register`;
  return axios.post(url, body, { signal: controller.signal });
};

export const login = (body, controller) => {
  const url = `${baseUrl}auth/login`;
  return axios.post(url, body, { signal: controller.signal });
};

export const logout = (token, controller) => {
  const url = `${baseUrl}auth/logout`;
  return axios.post(url, {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getPin = (token, pin, controller) => {
  const url = `${baseUrl}user/pin/${pin}`;
  return axios.get(url, {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const changePin = (userId, token, pin, controller) => {
  const url = `${baseUrl}user/pin/${userId}`;
  return axios.patch(
    url,
    { pin },
    {
      signal: controller.signal,
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const forgotPassword = (body, controller) => {
  const url = `${baseUrl}auth/forgot-password`;
  return axios.post(url, body, { signal: controller.signal });
};

export const resetingPassword = (body, controller) => {
  const url = `${baseUrl}auth/reset-password`;
  return axios.patch(url, body, { signal: controller.signal });
};
