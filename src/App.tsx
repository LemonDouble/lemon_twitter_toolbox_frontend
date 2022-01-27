import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import './App.css';

import { Breakpoint, createTheme, Theme, ThemeProvider, useTheme } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "react-query";
import TwitterOAuthHandler from "./pages/TwitterOAuthHandler";

import {
  RecoilRoot,
} from 'recoil';
import axios from "axios";
import { requestURI } from "./hooks/serverData";
import MyPage from "./pages/MyPage";
import { Box, useMediaQuery } from "@mui/material";

const queryClient = new QueryClient();

axios.defaults.baseURL = requestURI;
// 같은 Domain 사용할 경우 False로 바꿔도 됨
axios.defaults.withCredentials = true;

type BreakpointOrNull = Breakpoint | null;

export function useWidth() {
  const theme: Theme = useTheme();
  const keys: readonly Breakpoint[] = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output: BreakpointOrNull, key: Breakpoint) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || 'xs'
  );
}

function App() {

  useEffect(()=> {
    const acces_token = localStorage.getItem("token");
    axios.defaults.headers.common['Authorization'] = `Bearer ${acces_token}`;
  })

  return (
    <>
        <Box sx = {{
          width:'100vw',
          minHeight :'100vh',
          bgcolor: 'background.default',
          color: 'text.primary',
          display: 'flex',
          flexDirection : 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <RecoilRoot>
            <QueryClientProvider client = {queryClient}>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/mypage" element={<MyPage />} />
                  <Route path="/api/oauth/twitter" element={<TwitterOAuthHandler />}></Route>
                </Routes>
              </BrowserRouter>
            </QueryClientProvider>
          </RecoilRoot>
        </Box>
    </>
  );
}

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export function ToggleColorModeApp(){
  const [mode, setMode] = React.useState<'light' | 'dark'>('dark');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        typography:{
          fontFamily: 'Youth',
        }
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}