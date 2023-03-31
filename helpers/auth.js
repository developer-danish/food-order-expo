import { setToken, getToken, deleteToken } from "./cookies";
import {
  setLocalStorage,
  getLocalStorage,
  deleteLocalStorage,
} from "./localStorage";

export const setAuthentication = (token, user) => {
  setToken(token);
  setLocalStorage("user", user);
};

export const isAuthenticated = async () => {
  if (getToken() && (await getLocalStorage("user"))) {
    return getLocalStorage("user");
  } else {
    return false;
  }
};
export const logout = () => {
  deleteToken();
  deleteLocalStorage("user");
};
