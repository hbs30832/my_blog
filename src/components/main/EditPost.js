import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../common/Button";
import TitleBox from "../common/TitleBox";
import { useSelector, useDispatch } from "react-redux";
import { searchPost, updatePost } from "../../actions/post";
import { createPost } from "../../custom_axios";

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
  const params = useParams();
  const id = parseInt(params.id);
  const postList = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const post = postList.find((post) => post.id === id) || {
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

  // async의 return 값은 Promise기 때문에
  // 받을 때 async 함수안에서 await 받아서 사용하면 값으로 사용 가능.
  const onCreate = async () => {
    const { title, content } = inputs;
    let result = await createPost(title, content);
    console.log(result);
    if (result.status === 201) {
      navigate("/main/post");
    }
  };

  const onEdit = () => {
    const { title, content } = inputs;
    const created_at = new Date().toLocaleDateString("ko-KR", dateOpts);
    dispatch(updatePost(id, title, content, created_at));
    navigate("/post/");
  };

  return (
    <>
      <TitleBox title="글 작성하기" margin={"10px 100px"} />
      <InputForm
        onSubmit={(e) => {
          e.preventDefault();
          if (isNaN(id)) {
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
