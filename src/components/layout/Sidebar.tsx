import { useState } from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Collapse,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Home as HomeIcon,
  Palette as PaletteIcon,
  TextFields as TypographyIcon,
  SpaceBar as SpacingIcon,
  FilterDrama as ShadowsIcon,
  SmartButton as ButtonsIcon,
  Input as InputsIcon,
  Label as ChipsIcon,
  Warning as AlertsIcon,
  Notifications as SnackbarsIcon,
  CalendarMonth as CalendarIcon,
  ViewQuilt as HeaderIcon,
  Chat as MessengerIcon,
  Message as MessagesIcon,
  FlashOn as QuickActionsIcon,
  ViewSidebar as NavigationIcon,
  Forum as MessengerLayoutIcon,
  ViewKanban as DealsIcon,
  Category as IconsIcon,
  DynamicForm as FormsIcon,
  PictureInPicture as ModalsIcon,
  NotificationsActive as NotificationsIcon,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

export const DRAWER_WIDTH = 280;

interface NavSection {
  label: string;
  items: NavItem[];
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactElement;
}

const sections: NavSection[] = [
  {
    label: '',
    items: [
      { label: 'Getting Started', path: '/', icon: <HomeIcon /> },
    ],
  },
  {
    label: 'Design Tokens',
    items: [
      { label: 'Colors', path: '/tokens/colors', icon: <PaletteIcon /> },
      { label: 'Typography', path: '/tokens/typography', icon: <TypographyIcon /> },
      { label: 'Spacing', path: '/tokens/spacing', icon: <SpacingIcon /> },
      { label: 'Shadows', path: '/tokens/shadows', icon: <ShadowsIcon /> },
    ],
  },
  {
    label: 'Components',
    items: [
      { label: 'Buttons', path: '/components/buttons', icon: <ButtonsIcon /> },
      { label: 'Inputs', path: '/components/inputs', icon: <InputsIcon /> },
      { label: 'Chips', path: '/components/chips', icon: <ChipsIcon /> },
      { label: 'Alerts', path: '/components/alerts', icon: <AlertsIcon /> },
      { label: 'Snackbars', path: '/components/snackbars', icon: <SnackbarsIcon /> },
    ],
  },
  {
    label: 'Composites',
    items: [
      { label: 'Calendar', path: '/composites/calendar', icon: <CalendarIcon /> },
      { label: 'Header', path: '/composites/header', icon: <HeaderIcon /> },
      { label: 'Messenger Card', path: '/composites/messenger-card', icon: <MessengerIcon /> },
      { label: 'Messages', path: '/composites/messages', icon: <MessagesIcon /> },
      { label: 'Quick Actions', path: '/composites/quick-actions', icon: <QuickActionsIcon /> },
    ],
  },
  {
    label: 'Layouts',
    items: [
      { label: 'Navigation', path: '/layouts/navigation', icon: <NavigationIcon /> },
      { label: 'Messenger Layout', path: '/layouts/messenger', icon: <MessengerLayoutIcon /> },
      { label: 'Deals Pipeline', path: '/layouts/deals-pipeline', icon: <DealsIcon /> },
    ],
  },
  {
    label: 'Resources',
    items: [
      { label: 'Icons & Logos', path: '/icons', icon: <IconsIcon /> },
    ],
  },
  {
    label: 'Patterns',
    items: [
      { label: 'Forms', path: '/patterns/forms', icon: <FormsIcon /> },
      { label: 'Modals', path: '/patterns/modals', icon: <ModalsIcon /> },
      { label: 'Notifications', path: '/patterns/notifications', icon: <NotificationsIcon /> },
    ],
  },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    sections.forEach((s) => {
      if (s.label) init[s.label] = true;
    });
    return init;
  });

  const toggleSection = (label: string) => {
    setExpanded((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleNav = (path: string) => {
    navigate(path);
    if (isMobile) onClose();
  };

  const drawerContent = (
    <Box
      sx={{
        width: DRAWER_WIDTH,
        pt: 2,
        pb: 4,
        height: '100%',
        overflowY: 'auto',
        bgcolor: 'background.default',
      }}
    >
      {sections.map((section) => (
        <Box key={section.label || '_home'}>
          {section.label && (
            <ListItemButton
              onClick={() => toggleSection(section.label)}
              sx={{ px: 2, py: 0.5 }}
            >
              <ListSubheader
                component="span"
                sx={{
                  bgcolor: 'transparent',
                  color: 'text.secondary',
                  fontWeight: 700,
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  lineHeight: 2.5,
                  p: 0,
                }}
              >
                {section.label}
              </ListSubheader>
              <Box sx={{ ml: 'auto' }}>
                {expanded[section.label] ? (
                  <ExpandLess fontSize="small" sx={{ color: 'text.secondary' }} />
                ) : (
                  <ExpandMore fontSize="small" sx={{ color: 'text.secondary' }} />
                )}
              </Box>
            </ListItemButton>
          )}

          <Collapse in={!section.label || expanded[section.label]} unmountOnExit>
            <List disablePadding>
              {section.items.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <ListItemButton
                    key={item.path}
                    onClick={() => handleNav(item.path)}
                    selected={active}
                    sx={{
                      pl: section.label ? 3 : 2,
                      py: 0.75,
                      borderRadius: 1,
                      mx: 1,
                      '&.Mui-selected': {
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        '& .MuiListItemIcon-root': { color: 'primary.contrastText' },
                        '&:hover': { bgcolor: 'primary.dark' },
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 36, color: active ? 'inherit' : 'text.secondary' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: 13,
                        fontWeight: active ? 600 : 400,
                      }}
                    />
                  </ListItemButton>
                );
              })}
            </List>
          </Collapse>
        </Box>
      ))}
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' } }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          borderRight: '1px solid',
          borderColor: 'divider',
          top: 64,
          height: 'calc(100% - 64px)',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}
