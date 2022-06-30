import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../common/Button";
import TitleBox from "../common/TitleBox";
import PostItem from "./PostItem";
import { useSelector, useDispatch } from "react-redux";
import PagingBox from "../common/PagingBox";
import axios from "axios";
import { getPostList } from "../../custom_axios";
import { searchPost } from "../../actions/post";

const Block = styled.div`
  ul {
    border-top: 1px solid #b4b4b4;
    margin-bottom: 20px;
  }
`;

function PostList() {
  const postList = useSelector((state) => state.post);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const [count, setCount] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    getPostData();
    // getPostList((list) => dispatch(searchPost(list)));
    //
  }, []);

  const getPostData = async () => {
    let data = await getPostList();
    dispatch(searchPost(data));
  };

  const renderList = postList.filter(
    (_, idx) => (currentPage - 1) * count < idx + 1 && currentPage * count > idx
  );

  return (
    <Block>
      <TitleBox title="포스트 목록" />
      <select
        name=""
        id=""
        onChange={(e) => {
          setCount(parseInt(e.target.value));
        }}
      >
        <option value="10">10개씩 보기</option>
        <option value="30">30개씩 보기</option>
      </select>
      <ul>
        {renderList.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </ul>
      <PagingBox
        length={postList.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        count={count}
      />
      <Button
        text="작성하기"
        onClick={() => navigate("/main/post/edit/write")}
      />

      {/* 총 페이지를 계산 몇개의 번호가 나와야되나  */}
      {/* 버튼 눌렀을 때 현재 페이지 세팅 */}
      {/* 화살표 버튼 현재 페이지 +1, -1 */}
      {/* 재사용성 고려 */}
    </Block>
  );
}

export default PostList;
