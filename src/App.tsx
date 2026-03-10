import { ThemeProvider, CssBaseline } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { PlatformProvider } from './context/PlatformContext';
import { ModeProvider } from './store/ModeContext';
import { AppProvider } from './store/AppContext';
import targetCRMTheme from './theme/targetcrm-theme';
import { router } from './router';

export default function App() {
  return (
    <ThemeProvider theme={targetCRMTheme}>
      <CssBaseline />
      <PlatformProvider>
        <ModeProvider>
          <AppProvider>
            <RouterProvider router={router} />
          </AppProvider>
        </ModeProvider>
      </PlatformProvider>
    </ThemeProvider>
  );
}
