import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import SidebarItem from "./SidebarItem";

const Block = styled.div`
  ul {
    padding: 50px 10px 0;
  }
`;

const sidemenu = [
  { id: 1, text: "HOME", url: "/", active: true },
  { id: 2, text: "ABOUT", url: "/about", active: false },
  { id: 4, text: "POST", url: "/post", active: false },
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
