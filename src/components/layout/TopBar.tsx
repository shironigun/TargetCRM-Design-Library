import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  Box,
  Chip,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Computer as WebIcon,
  PhoneAndroid as MobileIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { usePlatform } from '../../context/PlatformContext';
import type { Platform } from '../../context/PlatformContext';
import { useAppMode } from '../../store/ModeContext';
import { colors } from '../../theme/tokens';

interface TopBarProps {
  onMenuToggle: () => void;
}

export default function TopBar({ onMenuToggle }: TopBarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { platform, setPlatform } = usePlatform();
  const { mode, isEdit, enterEditMode, exitEditMode } = useAppMode();

  const [passwordOpen, setPasswordOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const handleModeToggle = (_: React.MouseEvent<HTMLElement>, val: string | null) => {
    if (!val || val === mode) return;
    if (val === 'edit') {
      setPasswordOpen(true);
      setPassword('');
      setPasswordError(false);
    } else {
      exitEditMode();
    }
  };

  const handlePasswordSubmit = () => {
    const ok = enterEditMode(password);
    if (ok) {
      setPasswordOpen(false);
      setPassword('');
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  return (
    <>
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
            <IconButton color="inherit" edge="start" onClick={onMenuToggle} aria-label="Toggle navigation">
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo / Brand */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mr: 2 }}>
            <Box
              aria-hidden="true"
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
                sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1, fontSize: 11 }}
              >
                Design Library
              </Typography>
            </Box>
          </Box>

          {/* Editing indicator chip */}
          {isEdit && (
            <Chip
              label="EDITING"
              size="small"
              sx={{
                bgcolor: colors.warning.main,
                color: '#fff',
                fontWeight: 700,
                fontSize: 11,
                height: 22,
              }}
            />
          )}

          <Box sx={{ flexGrow: 1 }} />

          {/* Edit / View Mode Toggle */}
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={handleModeToggle}
            size="small"
            aria-label="Edit or view mode"
            sx={{
              bgcolor: 'rgba(255,255,255,0.12)',
              borderRadius: 2,
              mr: 1,
              '& .MuiToggleButton-root': {
                color: 'rgba(255,255,255,0.7)',
                borderColor: 'transparent',
                textTransform: 'none',
                fontSize: 12,
                fontWeight: 600,
                px: 2,
                py: 0.75,
                '&.Mui-selected': {
                  bgcolor: isEdit
                    ? 'rgba(249,147,47,0.35)'
                    : 'rgba(255,255,255,0.24)',
                  color: '#fff',
                  '&:hover': {
                    bgcolor: isEdit
                      ? 'rgba(249,147,47,0.45)'
                      : 'rgba(255,255,255,0.3)',
                  },
                },
                '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
              },
            }}
          >
            <ToggleButton value="view">
              <ViewIcon sx={{ fontSize: 18, mr: 0.75 }} />
              View
            </ToggleButton>
            <ToggleButton value="edit">
              <EditIcon sx={{ fontSize: 18, mr: 0.75 }} />
              Edit
            </ToggleButton>
          </ToggleButtonGroup>

          {/* Platform Toggle */}
          <ToggleButtonGroup
            value={platform}
            exclusive
            onChange={(_, val) => val && setPlatform(val as Platform)}
            size="small"
            aria-label="Platform selection"
            sx={{
              bgcolor: 'rgba(255,255,255,0.12)',
              borderRadius: 2,
              '& .MuiToggleButton-root': {
                color: 'rgba(255,255,255,0.7)',
                borderColor: 'transparent',
                textTransform: 'none',
                fontSize: 12,
                fontWeight: 600,
                px: 2,
                py: 0.75,
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
              <WebIcon sx={{ fontSize: 18, mr: 0.75 }} />
              Web
            </ToggleButton>
            <ToggleButton value="mobile">
              <MobileIcon sx={{ fontSize: 18, mr: 0.75 }} />
              Mobile
            </ToggleButton>
          </ToggleButtonGroup>
        </Toolbar>
      </AppBar>

      {/* Password Dialog */}
      <Dialog
        open={passwordOpen}
        onClose={() => setPasswordOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Enter Edit Mode</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            type="password"
            label="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError(false);
            }}
            onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()}
            error={passwordError}
            helperText={passwordError ? 'Incorrect password' : ' '}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPasswordOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handlePasswordSubmit}>
            Unlock
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
