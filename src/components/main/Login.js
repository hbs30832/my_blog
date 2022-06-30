import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Button from "../common/Button";
import axios from "axios";
import { setCookie } from "../../cookies";

const Positioner = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e8e8e8;
`;

const LoginBlock = styled.div`
  height: 300px;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-content: center;
  background-color: #fff;
  padding: 20px 30px;

  h2 {
    text-align: center;
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 20px;
    font-family: "Kdam Thmor Pro";
  }
`;

const InputBox = styled.div`
  text-align: center;
  input {
    width: 100%;
    outline: none;
    padding: 5px 10px;
    font-size: 14px;
  }
  input + input {
    margin-top: 10px;
  }
`;

const BtnLogin = styled.div`
  cursor: pointer;
  padding: 10px 20px;
  color: #fff;
  background-color: #b4b4b4;
  font-family: "Roboto";
  font-weight: 700;
  text-align: center;
  margin-top: 10px;
  border-radius: 4px;
  & + & {
    margin-top: 5px;
  }
`;

// const slidedown = keyframes`
//   0% {
//       height: 0;
//   }
//   100% {
//     height: 100px;
//   }
// `;

const BtnSignUp = styled(BtnLogin)`
  background-color: black;
`;

function Login() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });
  const { email, name, password } = inputs;
  const [isLogin, setLogin] = useState(true);

  const onChangeInput = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const signUp = () => {
    axios
      .post("http://43.200.114.213/cats", {
        email,
        name,
        password,
      })
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  const signIn = () => {
    axios
      .post("http://43.200.114.213/cats/login", {
        email,
        password,
      })
      .then((res) => {
        setCookie("token", `Bearer ${res.data.token}`);
        window.location.href = "/main";
      })
      .catch((e) => console.log(e));
  };

  return (
    <Positioner>
      <LoginBlock>
        <h2>Login</h2>
        <InputBox>
          <input
            type="email"
            placeholder="이메일을 입력하세요."
            name="email"
            value={inputs.email}
            onChange={onChangeInput}
          />
          <input
            type="text"
            placeholder="이름을 입력하세요."
            value={inputs.name}
            name="name"
            onChange={onChangeInput}
          />
          <input
            type="password"
            placeholder="패스워드를 입력하세요."
            value={inputs.password}
            name="password"
            onChange={onChangeInput}
          />
        </InputBox>
        <BtnLogin onClick={signIn}>Sign In</BtnLogin>
        <BtnSignUp style={{ backgroundColor: "black" }} onClick={signUp}>
          Sign Up
        </BtnSignUp>
      </LoginBlock>
    </Positioner>
  );
}

export default Login;
