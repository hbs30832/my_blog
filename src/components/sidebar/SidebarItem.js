import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { main_color } from "../common/color";

const Block = styled.li`
  border-radius: 4px;
  color: #fff;
  & + & {
    margin-top: 10px;
  }

  &:hover {
    background-color: ${main_color};
  }

  ${({ active }) =>
    active &&
    css`
      background-color: ${main_color};
      color: #fff;
    `}
`;

const StyledLink = styled(Link)`
  display: block;
  height: 100%;
  padding: 20px 10px;
  font-weight: 700;
`;

function SidebarItem({ data }) {
  const { text, url, active } = data;
  return (
    <Block active={active}>
      <StyledLink to={url}>{text}</StyledLink>
    </Block>
  );
}

export default SidebarItem;
