import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const getCookie = (name) => {
  return cookies.get(name);
};

export const setCookie = (name, value) => {
  cookies.set(name, value);
};

export const removeCookie = (name) => {
  cookies.remove(name);
};
