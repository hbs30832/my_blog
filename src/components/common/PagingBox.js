import React from "react";
import styled, { css } from "styled-components";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Block = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 0;
`;

const NumBox = styled.div`
  display: flex;
  margin: 0 15px;
`;

const BtnNum = styled.div`
  cursor: pointer;
  font-size: 20px;
  &:hover {
    font-weight: 700;
  }
  ${({ active }) =>
    active &&
    css`
      font-weight: bold;
      text-decoration: underline;
    `}
  margin: 0 10px;
`;

const BtnsArrow = styled.div`
  padding: 5px;
  border-radius: 4px;
  background-color: #f2f2f2;
  cursor: pointer;
`;

function PagingBox({ length, currentPage, setCurrentPage, count }) {
  let max = Math.ceil(length / count);
  console.log(length, max);
  const renderNum = () => {
    let numArr = [];
    for (let i = 1; i <= max; i++) {
      numArr.push(
        <BtnNum
          key={i}
          active={i === currentPage}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </BtnNum>
      );
    }
    console.log(numArr);
    return numArr;
  };

  return (
    <Block>
      <BtnsArrow
        onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
      >
        <FaAngleLeft />
      </BtnsArrow>

      <NumBox>
        {/* <BtnNum active={true}>1</BtnNum>
        <BtnNum>2</BtnNum> */}
        {renderNum()}
      </NumBox>

      <BtnsArrow
        onClick={() => currentPage < max && setCurrentPage(currentPage + 1)}
      >
        <FaAngleRight />
      </BtnsArrow>
    </Block>
  );
}

export default PagingBox;
