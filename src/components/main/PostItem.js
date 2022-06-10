import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Block = styled.li`
  /* display: flex; */
  border-bottom: 1px solid #b4b4b4;
  padding: 20px 0;
  & + & {
    margin-top: 30px;
  }
  h3 {
    font-size: 24px;
    font-weight: bold;
    color: #000000;
  }
  p {
    margin: 10px 0 15px;
  }
  span {
    font-size: 12px;
  }
`;

function PostItem({ post }) {
  const { title, content, created_at, id } = post;
  return (
    <Block>
      <Link to={`${id}`}>
        <h3>{title}</h3>
        <p>{content}</p>
        <span>{created_at}</span>
      </Link>
    </Block>
  );
}

export default PostItem;
