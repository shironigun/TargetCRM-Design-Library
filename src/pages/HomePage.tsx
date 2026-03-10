// TargetCRM Design Library — Home Page
// Dashboard with stats + quick actions. Edit mode adds create/import/export.

import { useRef, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import {
  Add as AddIcon,
  FileDownload as ExportIcon,
  FileUpload as ImportIcon,
  DeleteForever as ResetIcon,
  Widgets as ComponentIcon,
  AccountTree as TreeIcon,
  Style as VariantIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import { useApp } from '../store/AppContext';
import { useAppMode } from '../store/ModeContext';
import { colors } from '../theme/tokens';
import type { AppState } from '../types';

export default function HomePage() {
  const { state, dispatch, createComponent } = useApp();
  const { isEdit } = useAppMode();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [snack, setSnack] = useState<{ open: boolean; msg: string; severity: 'success' | 'error' }>({
    open: false,
    msg: '',
    severity: 'success',
  });
  const [resetConfirm, setResetConfirm] = useState(false);

  const componentCount = Object.keys(state.components).length;
  const variantCount = Object.values(state.components).reduce(
    (sum, c) => sum + c.variants.length,
    0,
  );
  const itemCount = state.sidebarItems.length;

  // ── Handlers ────────────────────────────────────────────────────

  const handleCreateComponent = () => {
    const comp = createComponent('Untitled Component');
    navigate(`/component/${comp.id}`);
  };

  const handleExport = () => {
    const json = JSON.stringify(state, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `targetcrm-design-library-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setSnack({ open: true, msg: 'Exported successfully', severity: 'success' });
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string) as AppState;
        if (parsed.sidebarItems && parsed.components) {
          dispatch({ type: 'LOAD_STATE', payload: parsed });
          setSnack({ open: true, msg: 'Imported successfully', severity: 'success' });
        } else {
          throw new Error('Invalid schema');
        }
      } catch {
        setSnack({ open: true, msg: 'Invalid JSON file', severity: 'error' });
      }
    };
    reader.readAsText(file);
    // Reset input so same file can be re-imported
    e.target.value = '';
  };

  const handleReset = () => {
    dispatch({ type: 'RESET_STATE' });
    setResetConfirm(false);
    setSnack({ open: true, msg: 'All data has been reset', severity: 'success' });
  };

  // ── Stats cards data ────────────────────────────────────────────

  const stats = [
    { label: 'Components', value: componentCount, icon: <ComponentIcon />, color: colors.primary.main },
    { label: 'Variants', value: variantCount, icon: <VariantIcon />, color: colors.secondary.main },
    { label: 'Nav Items', value: itemCount, icon: <TreeIcon />, color: colors.success.main },
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
          TargetCRM Design Library
        </Typography>
        <Typography variant="body1" color="text.secondary">
          A centralised, dynamic component library for designers and developers.
          {isEdit
            ? ' You are in Edit Mode — create, organise, and document components.'
            : ' Browse components, inspect tokens, and copy code.'}
        </Typography>
      </Box>

      {/* Stats */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {stats.map((s) => (
          <Grid size={{ xs: 12, sm: 4 }} key={s.label}>
            <Paper
              variant="outlined"
              sx={{
                p: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                borderRadius: 2,
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  bgcolor: alpha(s.color, 0.08),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: s.color,
                }}
              >
                {s.icon}
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {s.value}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {s.label}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Edit Mode Actions */}
      {isEdit && (
        <Paper variant="outlined" sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
            Quick Actions
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreateComponent}
            >
              Create Component
            </Button>
            <Button
              variant="outlined"
              startIcon={<ExportIcon />}
              onClick={handleExport}
            >
              Export JSON
            </Button>
            <Button
              variant="outlined"
              startIcon={<ImportIcon />}
              onClick={() => fileInputRef.current?.click()}
            >
              Import JSON
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              hidden
              onChange={handleImport}
            />
            <Button
              variant="outlined"
              color="error"
              startIcon={<ResetIcon />}
              onClick={() => setResetConfirm(true)}
            >
              Reset All
            </Button>
          </Box>
        </Paper>
      )}

      {/* Getting started help */}
      {componentCount === 0 && (
        <Paper
          variant="outlined"
          sx={{
            p: 4,
            textAlign: 'center',
            borderRadius: 2,
            borderStyle: 'dashed',
          }}
        >
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
            Get Started
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: 480, mx: 'auto' }}>
            {isEdit
              ? 'Create your first component, then add it to the sidebar navigation. Upload SVGs or paste JSX code to create variants.'
              : 'Switch to Edit Mode to create your first component. Use the toggle in the top bar.'}
          </Typography>
          {isEdit && (
            <Button
              variant="contained"
              size="large"
              startIcon={<AddIcon />}
              onClick={handleCreateComponent}
            >
              Create First Component
            </Button>
          )}
        </Paper>
      )}

      {/* Reset confirmation dialog */}
      <Dialog open={resetConfirm} onClose={() => setResetConfirm(false)}>
        <DialogTitle>Reset All Data?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will permanently delete all components, variants, sidebar items,
            and tokens. This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setResetConfirm(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleReset}>
            Reset Everything
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={snack.severity}
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
          variant="filled"
        >
          {snack.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
