import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import About from "./About";
import Home from "./Home";
import Post from "./Post";

const Block = styled.div`
  flex: 1;
  padding: 50px;
`;

function MainSection() {
  return (
    <Block>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about/*" element={<About />} />
        <Route path="/post/*" element={<Post />} />
      </Routes>
    </Block>
  );
}

export default MainSection;
