import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_ANALYTICS_ID;

export const getHistories = (token, params, controller) => {
  const { page, limit, filter } = params;
  const url = `${baseUrl}transaction/history?page=${page}&limit=${limit}&filter=${filter}`;
  return axios.get(url, {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const postTopup = (token, body, controller) => {
  const url = `${baseUrl}transaction/top-up`;
  return axios.post(url, body, {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${token}` },
  });
};
