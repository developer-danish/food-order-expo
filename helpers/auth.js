import { setToken, getToken, deleteToken } from './cookies';
import { setLocalStorage, getLocalStorage, deleteLocalStorage } from './localStorage';

export const setAuthentication = (token, user) => {
    setToken(token);
    setLocalStorage('user', user);
}

export const isAuthenticated = () => {
    if (getToken() && getLocalStorage('user')){
        return getLocalStorage('user');
    }
    else {
        return false;
    }
}
export const logout = next => {
    deleteToken('token');
    deleteLocalStorage('user');
    next();
}