import React from "react";
import { Route, Routes } from "react-router-dom";
import EidtPost from "./EditPost";
import PostDetail from "./PostDetail";
import PostList from "./PostList";

function Post() {
  return (
    <Routes>
      <Route path="/" element={<PostList />} />
      {/* post/1 */}
      <Route path=":id" element={<PostDetail />} />
      {/* post/eidt/write */}
      <Route path="/edit/:id" element={<EidtPost />} />
    </Routes>
  );
}

export default Post;
