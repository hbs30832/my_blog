import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PostStateContext } from "../../contexts/postContext";
import Button from "../common/Button";
import TitleBox from "../common/TitleBox";
import PostItem from "./PostItem";

const Block = styled.div`
  ul {
    border-top: 1px solid #b4b4b4;
    margin-bottom: 20px;
  }
`;

function PostList() {
  const postList = useContext(PostStateContext);
  const navigate = useNavigate();
  console.log(postList);

  return (
    <Block>
      <TitleBox title="포스트 목록" />
      <ul>
        {postList.map((post) => (
          <PostItem key={post.id} post={post}>
            {post.title} {post.content} {post.created_at}
          </PostItem>
        ))}
      </ul>
      <Button text="작성하기" onClick={() => navigate("/post/write")} />
    </Block>
  );
}

export default PostList;