import {
  getCookie as get,
  setCookie as set,
  deleteCookie as del,
} from "cookies-next/client";

export const setToken = (key: string, token: string) => {
  set(key, token, {
    path: "/",
    sameSite: "lax",
    secure: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
};

export const removeToken = (key: string) => {
  del(key);
};

export const getToken = (key: string): string | null => {
  return get(key) ?? null;
};
