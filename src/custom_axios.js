import axios from "axios";
import { getCookie } from "./cookies";

export const axiosInstance = axios.create({
  baseURL: "http://43.200.114.213",
  headers: {
    Authorization: getCookie("token"),
  },
});

export const getPostList = async () => {
  try {
    let result = await axiosInstance.get("/posts/all");
    return result.data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const createPost = async (title, content) => {
  let result = await axiosInstance.post("/posts", {
    title,
    content,
  });
  return result;
};
