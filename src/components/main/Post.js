import React from "react";
import { Route, Routes } from "react-router-dom";
import { PostProvider } from "../../contexts/postContext";
import EidtPost from "./EditPost";
import PostList from "./PostList";

function Post() {
  return (
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route path=":id" element={<EidtPost />} />
    </Routes>
  );
}

export default Post;
