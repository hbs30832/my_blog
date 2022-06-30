import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import SidebarItem from "./SidebarItem";

const Block = styled.div`
  flex: 1;
  ul {
    padding: 50px 10px 0;
  }
`;

const sidemenu = [
  { id: 1, text: "HOME", url: "/main", active: true },
  { id: 2, text: "ABOUT", url: "/main/about", active: false },
  { id: 4, text: "POST", url: "/main/post", active: false },
];

function SidebarList() {
  const [state, setState] = useState(sidemenu);

  const { pathname } = useLocation();

  useEffect(() => {
    setState((state) =>
      state.map((item) =>
        item.url === pathname
          ? { ...item, active: true }
          : { ...item, active: false }
      )
    );
  }, [pathname]);

  return (
    <Block>
      <ul>
        {state.map((item) => (
          <SidebarItem data={item} key={item.id} />
        ))}
      </ul>
    </Block>
  );
}

export default SidebarList;
