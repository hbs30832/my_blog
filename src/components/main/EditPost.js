import React, { useContext, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  PostDispatchContext,
  PostStateContext,
} from "../../contexts/postContext";
import Button from "../common/Button";
import TitleBox from "../common/TitleBox";

const InputForm = styled.form`
  font-size: 21px;
  width: 600px;
  table {
    margin-bottom: 30px;
    tr {
      td {
        padding: 10px 0;
      }
    }
  }
`;

const InputTitle = styled.input`
  padding: 5px 10px;
  outline: none;
  width: 600px;
  border-radius: 4px;
  /* font-size: 20px; */
  font-size: inherit;
`;

const InputContent = styled.textarea`
  resize: none;
  width: 600px;
  height: 400px;
  outline: none;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 0.9em;
`;

const dateOpts = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

function EidtPost() {
  const { id } = useParams();
  const postList = useContext(PostStateContext);
  const lastId = postList[postList.length - 1].id;
  const dispatch = useContext(PostDispatchContext);
  const navigate = useNavigate();

  const post = postList.filter((post) => post.id === parseInt(id))[0] || {
    title: "",
    content: "",
  };

  const [inputs, setInputs] = useState({
    title: post.title,
    content: post.content,
  });

  // cannot read properties of undefined => 옵셔널 체이닝 => ex) obj?.name
  // undefined에 옵셔널 체이닝을 하며 에러는 안나오지만 undefined를 반환.

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onCreate = () => {
    const { title, content } = inputs;
    const created_at = new Date().toLocaleDateString("ko-KR", dateOpts);
    dispatch({
      type: "CREATE_POST",
      post: {
        id: lastId + 1,
        title,
        content,
        created_at,
      },
    });
    navigate("/post");
  };

  const onEdit = () => {
    const { title, content } = inputs;
    const created_at = new Date().toLocaleDateString("ko-KR", dateOpts);
    dispatch({
      type: "EDIT_POST",
      post: { ...post, title, content, created_at },
    });
    navigate("/post");
  };

  return (
    <>
      <TitleBox title="글 작성하기" />
      <InputForm
        onSubmit={(e) => {
          e.preventDefault();
          if (id === "write") {
            onCreate();
          } else {
            onEdit();
          }
        }}
      >
        <table>
          <tr>
            <td>
              <InputTitle
                name="title"
                onChange={handleInput}
                defaultValue={post?.title}
              />
            </td>
          </tr>
          <tr>
            <td>
              <InputContent
                name="content"
                onChange={handleInput}
                defaultValue={post?.content}
              />
            </td>
          </tr>
        </table>
        <Button text="저장하기" />
      </InputForm>
    </>
  );
}

export default EidtPost;
