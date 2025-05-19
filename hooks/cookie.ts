import {
  setCookie as set,
  getCookie as get,
  deleteCookie as del,
} from "cookies-next";

const TOKEN_KEY = "token";

export const setToken = (token: string) => {
  set(TOKEN_KEY, token, {
    maxAge: 60 * 60 * 24,
    secure: true,
  });
};

export const getToken = (): string | undefined => {
  return get(TOKEN_KEY) as string | undefined;
};

export const deleteToken = () => {
  del(TOKEN_KEY);
};
