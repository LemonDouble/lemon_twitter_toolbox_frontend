import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import './App.css';

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/system";
import { QueryClient, QueryClientProvider } from "react-query";

const theme = createTheme({
  typography:{
    fontFamily:'Youth',
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <div id="App" css={style}>
      <QueryClientProvider client = {queryClient}>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </BrowserRouter>
          </ThemeProvider>
        </QueryClientProvider>
    </div>
  );
}

const style = css({
  backgroundColor: "#0a1929",
  minHeight: "100vh",
  color: "white"
})

export default App;
