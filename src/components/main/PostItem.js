import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { removePost } from "../../actions/post";

const Block = styled.li`
  display: flex;
  align-items: center;
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

const StyledLink = styled(Link)`
  flex: 1;
`;

const BtnRemove = styled.button`
  padding: 5px 10px;
  background-color: #c2c2c2;
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #ff4b4b;
  }
`;

function PostItem({ post }) {
  const { title, content, created_at, id } = post;
  console.log(post);

  const dispatch = useDispatch();

  const onRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) dispatch(removePost(id));
  };
  return (
    <Block>
      <StyledLink to={`${id}`}>
        <h3>{title}</h3>
        <p>{content}</p>
        <span>{created_at}</span>
      </StyledLink>
      <BtnRemove onClick={onRemove}>삭제</BtnRemove>
    </Block>
  );
}

export default PostItem;
