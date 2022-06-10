import React from "react";
import styled from "styled-components";
import { sub_color } from "../common/color";
import SidebarList from "./SidebarList";

const Block = styled.div`
  flex-basis: 250px;
  background-color: ${sub_color};
`;

function SidebarTemplate() {
  return (
    <Block>
      <SidebarList />
    </Block>
  );
}

export default SidebarTemplate;
