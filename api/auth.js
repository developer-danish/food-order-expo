import axios from "axios";
import { getToken } from "../helpers/cookies";
import { BaseUrl } from "../helpers/Constants";

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: async () => await getToken(),
  },
};
export const apiObject = {
  signin: async (data) => {
    const response = await axios.post(BaseUrl + "api/auth/signin", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  },
  signup: async (data) => {
    const response = await axios.post(BaseUrl + "api/auth/signup", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  },
  post: async (url, data) => {
    const response = await axios.post(BaseUrl + url, data, config);
    return response;
  },
  get: async (url) => {
    const response = await axios.get(BaseUrl + url, config);
    return response;
  },
  put: async (url, data) => {
    const response = await axios.put(BaseUrl + url, data, config);
    return response;
  },
  delete: async (url, id) => {
    const response = await axios.delete(BaseUrl + url, id, config);
    return response;
  },
};
