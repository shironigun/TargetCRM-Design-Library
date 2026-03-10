import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Computer as WebIcon,
  PhoneAndroid as MobileIcon,
} from '@mui/icons-material';
import { usePlatform } from '../../context/PlatformContext';
import type { Platform } from '../../context/PlatformContext';
import { colors } from '../../theme/tokens';

interface TopBarProps {
  onMenuToggle: () => void;
}

export default function TopBar({ onMenuToggle }: TopBarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { platform, setPlatform } = usePlatform();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: colors.primary.main,
        borderBottom: '1px solid',
        borderColor: 'rgba(255,255,255,0.12)',
        zIndex: (t) => t.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ gap: 1 }}>
        {isMobile && (
          <IconButton color="inherit" edge="start" onClick={onMenuToggle}>
            <MenuIcon />
          </IconButton>
        )}

        {/* Logo / Brand */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mr: 2 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '6px',
              bgcolor: colors.brand.gold,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 14,
              color: colors.brand.navy,
            }}
          >
            T
          </Box>
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, color: '#fff', lineHeight: 1.2 }}
            >
              TargetCRM
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1, fontSize: 10 }}
            >
              Design System
            </Typography>
          </Box>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* Platform Toggle */}
        <ToggleButtonGroup
          value={platform}
          exclusive
          onChange={(_, val) => val && setPlatform(val as Platform)}
          size="small"
          sx={{
            bgcolor: 'rgba(255,255,255,0.12)',
            borderRadius: 2,
            '& .MuiToggleButton-root': {
              color: 'rgba(255,255,255,0.7)',
              borderColor: 'transparent',
              textTransform: 'none',
              fontSize: 12,
              fontWeight: 600,
              px: 1.5,
              py: 0.5,
              '&.Mui-selected': {
                bgcolor: 'rgba(255,255,255,0.24)',
                color: '#fff',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
              },
              '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
            },
          }}
        >
          <ToggleButton value="web">
            <WebIcon sx={{ fontSize: 16, mr: 0.5 }} />
            Web
          </ToggleButton>
          <ToggleButton value="mobile">
            <MobileIcon sx={{ fontSize: 16, mr: 0.5 }} />
            Mobile
          </ToggleButton>
        </ToggleButtonGroup>
      </Toolbar>
    </AppBar>
  );
}
