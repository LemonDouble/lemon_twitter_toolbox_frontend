import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import './App.css';

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/system";
import { QueryClient, QueryClientProvider } from "react-query";
import TwitterOAuthHandler from "./pages/TwitterOAuthHandler";

import {
  RecoilRoot,
} from 'recoil';
import axios from "axios";
import { requestURI } from "./hooks/serverData";
import MyPage from "./pages/MyPage";

const theme = createTheme({
  typography:{
    fontFamily:'Youth',
  },
});

const queryClient = new QueryClient();

axios.defaults.baseURL = requestURI;
// 같은 Domain 사용할 경우 False로 바꿔도 됨
axios.defaults.withCredentials = true;

function App() {


  return (
    <div id="App" css={style}>
      <RecoilRoot>
        <QueryClientProvider client = {queryClient}>
          <ThemeProvider theme={theme}>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/mypage" element={<MyPage />} />
                  <Route path="/api/oauth/twitter" element={<TwitterOAuthHandler />}></Route>
                </Routes>
              </BrowserRouter>
            </ThemeProvider>
          </QueryClientProvider>
        </RecoilRoot>
    </div>
  );
}

const style = css({
  backgroundColor: "#0a1929",
  minHeight: "100vh",
  color: "white"
})

export default App;
