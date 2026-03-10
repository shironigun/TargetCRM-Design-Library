import { useState } from 'react';
import { Box, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import Sidebar, { DRAWER_WIDTH, DRAWER_WIDTH_EDIT } from './Sidebar';
import { useAppMode } from '../../store/ModeContext';

export default function AppShell() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const { isEdit } = useAppMode();

  const drawerWidth = isEdit ? DRAWER_WIDTH_EDIT : DRAWER_WIDTH;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <TopBar onMenuToggle={() => setSidebarOpen((o) => !o)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: isMobile ? 0 : sidebarOpen ? `${drawerWidth}px` : 0,
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          px: { xs: 2, sm: 3, md: 4 },
          py: 3,
          maxWidth: 1200,
          width: '100%',
        }}
      >
        <Toolbar /> {/* spacer for fixed AppBar */}
        <Outlet />
      </Box>
    </Box>
  );
}
