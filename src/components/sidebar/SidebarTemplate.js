import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { removeCookie } from "../../cookies";
import { axiosInstance } from "../../custom_axios";
import Button from "../common/Button";
import { sub_color } from "../common/color";
import SidebarList from "./SidebarList";

const Block = styled.div`
  flex-basis: 250px;
  background-color: ${sub_color};
  display: flex;
  flex-direction: column;
`;

const ImgBox = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  border: 2px solid #fa9191;
  img {
    width: 100%;
  }
`;

function SidebarTemplate({ currentUser }) {
  const navigate = useNavigate();
  const [imgUrl, setImgUrl] = useState(currentUser.imgUrl);
  const uploadImage = (e) => {
    const form = new FormData();
    form.append("image", e.target.files[0]);

    axiosInstance
      .post("/cats/upload/cats", form)
      .then((res) => setImgUrl(res.data.imgUrl))
      .catch((e) => console.log(e));
  };
  const logOut = () => {
    removeCookie("token");
    navigate("/login");
  };
  return (
    <Block>
      <SidebarList />
      <Button text="LogOut" onClick={logOut} />
      <ImgBox>
        <img src={imgUrl ? imgUrl : currentUser.imgUrl} alt="" />
        <input type="file" style={{ display: "none" }} onChange={uploadImage} />
      </ImgBox>
    </Block>
  );
}

export default SidebarTemplate;
