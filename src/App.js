import SidebarTemplate from "./components/sidebar/SidebarTemplate";
import { createGlobalStyle } from "styled-components";
import "./reset.css";
import MainSection from "./components/main/MainSection";
import { combineReducers } from "redux";
import post from "./actions/post";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

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
  return (
    <Provider store={store}>
      <div style={style}>
        <GlobalStyle />
        <SidebarTemplate />
        <MainSection />
      </div>
    </Provider>
  );
}

export default App;
