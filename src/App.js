import SidebarTemplate from "./components/sidebar/SidebarTemplate";
import { createGlobalStyle } from "styled-components";
import "./reset.css";
import MainSection from "./components/main/MainSection";
import { PostProvider } from "./contexts/postContext";

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
    <PostProvider>
      <div style={style}>
        <GlobalStyle />
        <SidebarTemplate />
        <MainSection />
      </div>
    </PostProvider>
  );
}

export default App;
