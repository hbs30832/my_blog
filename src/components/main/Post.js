import React from "react";
import { Route, Routes } from "react-router-dom";
import EidtPost from "./EditPost";
import PostDetail from "./PostDetail";
import PostList from "./PostList";

function Post() {
  return (
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route path=":id" element={<PostDetail />} />
      <Route path="/edit/:id" element={<EidtPost />} />
    </Routes>
  );
}

export default Post;
