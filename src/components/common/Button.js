import React from "react";
import styled from "styled-components";
import { main_color } from "./color";

const Btn = styled.button`
  padding: 10px 20px;
  background-color: ${main_color};
  color: #fff;
  font-weight: bold;
  font-size: 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

function Button({ text, onClick }) {
  return <Btn onClick={onClick}>{text}</Btn>;
}

export default Button;
