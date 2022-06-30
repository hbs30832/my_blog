import SidebarTemplate from "./components/sidebar/SidebarTemplate";
import { createGlobalStyle } from "styled-components";
import "./reset.css";
import MainSection from "./components/main/MainSection";
import { combineReducers } from "redux";
import post from "./actions/post";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import Login from "./components/main/Login";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { axiosInstance } from "./custom_axios";
import { useEffect, useState } from "react";
import { getCookie } from "./cookies";

const rootReducer = combineReducers({
  post,
});

const store = configureStore({
  reducer: rootReducer,
});

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }
  a{
      color:inherit;
     text-decoration: none;
   }
`;

const style = {
  display: "flex",
  width: "100vw",
  height: "100vh",
};

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState({});
  console.log(getCookie("token"));

  useEffect(() => {
    if (location.pathname !== "/login") {
      axiosInstance
        .get("/cats")
        .then((res) => setCurrentUser(res.data))
        .catch((e) => {
          alert("로그인을 해주시기 바랍니다.");
          navigate("/login");
        });
    }
  }, []);

  return (
    <Provider store={store}>
      <div style={style}>
        <GlobalStyle />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/main/*"
            element={
              <>
                <SidebarTemplate currentUser={currentUser} />
                <MainSection />
              </>
            }
          />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
