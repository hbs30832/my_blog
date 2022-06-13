import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TitleBox from "../common/TitleBox";
import { main_color, sub_color } from "../common/color";
import { createComment } from "../../actions/post";

const CotentContainer = styled.div`
  max-width: 1000px;
`;

const ContentBox = styled.div`
  padding: 20px;
  min-height: 500px;
  border: 1px solid ${main_color};
  border-radius: 4px;
`;

const CommentInputBox = styled.div`
  width: 50%;
  margin-top: 10px;
  border-bottom: 1px solid ${sub_color};
  padding: 5px 10px;
`;

const CommentInput = styled.input`
  width: 100%;
  outline: none;
  border: none;
`;

const CommmentList = styled.div`
  margin-top: 30px;
  h3 {
    margin: 15px 10px;
    font-weight: 700;
  }
  ul {
  }
`;
const CommentItem = styled.li`
  padding: 10px;
  margin-bottom: 10px;
  h4 {
    font-weight: bold;
    margin-bottom: 10px;
    border-radius: 15px;
    background-color: #a5a5a5;
    color: #fff;
    display: inline-block;
    padding: 5px;
  }
  p {
  }
`;

function PostDetail() {
  const params = useParams("id");
  const id = parseInt(params.id);
  const postList = useSelector((state) => state.post);
  const post = postList.filter((post) => post.id === id)[0];
  const comments = post.comments;
  const dispatch = useDispatch();
  console.log(comments);

  return (
    <CotentContainer>
      <TitleBox title={post.title} />
      <ContentBox>
        <p>{post.content}</p>
      </ContentBox>
      <CommmentList>
        <h3>댓글</h3>
        <ul>
          {comments?.map((comment) => (
            <CommentItem key={comment.id}>
              <h4>{comment.user.name}</h4>
              <p>{comment.content}</p>
            </CommentItem>
          ))}
        </ul>
      </CommmentList>
      <CommentInputBox>
        <CommentInput
          placeholder="댓글을 입력후 Enter키를 누르세요"
          onKeyDown={(e) => {
            if (e.key === "Enter")
              dispatch(createComment(id, e.target.value, 1, "황보석"));
          }}
        />
      </CommentInputBox>
    </CotentContainer>
  );
}

export default PostDetail;
