import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import About from "./About";
import Home from "./Home";
import Post from "./Post";

import imgSrc from "../../images/yeji05.jpg";

const Block = styled.div`
  flex: 1;
  padding: 50px;
  /* background-image: url(${imgSrc}); */
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
