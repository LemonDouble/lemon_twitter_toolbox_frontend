import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeProvider as Emotion10ThemeProvider } from 'emotion-theming';
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from 'recoil';

const defaultTheme = createTheme({
  typography:{
    fontFamily:'Youth',
  },}); // or your custom theme

const withThemeProvider = (Story, context) => {
  return (
      <Emotion10ThemeProvider theme={defaultTheme}>
        <ThemeProvider theme={defaultTheme}>
          <Story {...context} />
        </ThemeProvider>
      </Emotion10ThemeProvider>
  );
};

const MemoryRouters = (Story) => <MemoryRouter><Story /></MemoryRouter>


export const decorators = [withThemeProvider, MemoryRouters];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};