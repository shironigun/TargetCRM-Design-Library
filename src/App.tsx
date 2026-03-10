import { ThemeProvider, CssBaseline } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { PlatformProvider } from './context/PlatformContext';
import targetCRMTheme from './theme/targetcrm-theme';
import { router } from './router';

export default function App() {
  return (
    <ThemeProvider theme={targetCRMTheme}>
      <CssBaseline />
      <PlatformProvider>
        <RouterProvider router={router} />
      </PlatformProvider>
    </ThemeProvider>
  );
}
