import { useState } from 'react';
import { Box, Button, Snackbar, Alert, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PageHeader from '../../components/docs/PageHeader';
import ComponentPreview from '../../components/docs/ComponentPreview';
import CodeBlock from '../../components/docs/CodeBlock';
import TokenTable from '../../components/docs/TokenTable';
import { colors, borderRadius, componentSizes, shadows } from '../../theme/tokens';
import { xamlSnippets } from '../../theme/maui-tokens';

type SnackbarSeverity = 'info' | 'warning' | 'error' | 'success';

export default function Snackbars() {
  const [open, setOpen] = useState<{ [key: string]: boolean }>({});

  const handleOpen = (key: string) => setOpen((prev) => ({ ...prev, [key]: true }));
  const handleClose = (key: string) => setOpen((prev) => ({ ...prev, [key]: false }));

  return (
    <Box>
      <PageHeader
        title="Snackbars"
        description="Transient notification toasts from Snackbar.svg. Four semantic types matching the alert color system, with auto-dismiss behavior."
      />

      {/* Interactive demo */}
      <ComponentPreview title="Interactive Demo" description="Click buttons to trigger snackbar notifications.">
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {(['info', 'success', 'warning', 'error'] as SnackbarSeverity[]).map((severity) => (
            <Button
              key={severity}
              variant="contained"
              color={severity}
              onClick={() => handleOpen(severity)}
              sx={{ textTransform: 'capitalize' }}
            >
              Show {severity}
            </Button>
          ))}
        </Box>

        {(['info', 'success', 'warning', 'error'] as SnackbarSeverity[]).map((severity) => (
          <Snackbar
            key={severity}
            open={!!open[severity]}
            autoHideDuration={4000}
            onClose={() => handleClose(severity)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert
              onClose={() => handleClose(severity)}
              severity={severity}
              variant="filled"
              sx={{ width: '100%' }}
            >
              This is a {severity} snackbar message!
            </Alert>
          </Snackbar>
        ))}
      </ComponentPreview>

      {/* Static previews */}
      <ComponentPreview title="Static Previews" description="Visual reference for all four snackbar types.">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
          {(['info', 'success', 'warning', 'error'] as SnackbarSeverity[]).map((severity) => (
            <Alert
              key={severity}
              severity={severity}
              variant="filled"
              action={
                <IconButton size="small" color="inherit">
                  <CloseIcon fontSize="small" />
                </IconButton>
              }
            >
              This is a {severity} snackbar notification
            </Alert>
          ))}
        </Box>
      </ComponentPreview>

      {/* Positions */}
      <ComponentPreview title="Anchor Positions" description="Snackbars can appear in 6 positions.">
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {[
            { v: 'top', h: 'left' },
            { v: 'top', h: 'center' },
            { v: 'top', h: 'right' },
            { v: 'bottom', h: 'left' },
            { v: 'bottom', h: 'center' },
            { v: 'bottom', h: 'right' },
          ].map((pos) => (
            <Button
              key={`${pos.v}-${pos.h}`}
              variant="outlined"
              size="small"
              onClick={() => handleOpen(`${pos.v}-${pos.h}`)}
              sx={{ textTransform: 'none', fontSize: 12 }}
            >
              {pos.v}-{pos.h}
            </Button>
          ))}
        </Box>

        {[
          { v: 'top' as const, h: 'left' as const },
          { v: 'top' as const, h: 'center' as const },
          { v: 'top' as const, h: 'right' as const },
          { v: 'bottom' as const, h: 'left' as const },
          { v: 'bottom' as const, h: 'center' as const },
          { v: 'bottom' as const, h: 'right' as const },
        ].map((pos) => (
          <Snackbar
            key={`${pos.v}-${pos.h}`}
            open={!!open[`${pos.v}-${pos.h}`]}
            autoHideDuration={3000}
            onClose={() => handleClose(`${pos.v}-${pos.h}`)}
            anchorOrigin={{ vertical: pos.v, horizontal: pos.h }}
            message={`Position: ${pos.v}-${pos.h}`}
          />
        ))}
      </ComponentPreview>

      {/* With action */}
      <ComponentPreview title="With Action" description="Snackbars with undo/retry action buttons.">
        <Button variant="outlined" onClick={() => handleOpen('action')}>
          Show with Action
        </Button>
        <Snackbar
          open={!!open['action']}
          autoHideDuration={6000}
          onClose={() => handleClose('action')}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          message="Item deleted"
          action={
            <Button color="primary" size="small" onClick={() => handleClose('action')}>
              UNDO
            </Button>
          }
        />
      </ComponentPreview>

      {/* Auto-dismiss timing */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Auto-Dismiss Timing
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 4 }}>
        {[
          { label: 'Info / Success', delay: '4 000 ms', type: 'info' },
          { label: 'Warning', delay: '6 000 ms', type: 'warning' },
          { label: 'Error', delay: '8 000 ms (or manual)', type: 'error' },
        ].map((timing) => (
          <Box key={timing.label} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                bgcolor: colors[timing.type as keyof typeof colors] && typeof colors[timing.type as keyof typeof colors] === 'object' ? (colors[timing.type as keyof typeof colors] as { main: string }).main : colors.primary.main,
              }}
            />
            <Typography variant="body2">
              <strong>{timing.label}:</strong> {timing.delay}
            </Typography>
          </Box>
        ))}
      </Box>

      <TokenTable
        title="Snackbar Tokens"
        showPlatformColumns={true}
        tokens={[
          { name: 'snackbar.height', value: `${componentSizes.snackbar.height}px`, muiPath: 'MuiSnackbarContent', mauiKey: 'SfPopupHeight', description: 'Default snackbar height' },
          { name: 'snackbar.borderRadius', value: `${borderRadius.md}px`, muiPath: 'MuiSnackbarContent.borderRadius', mauiKey: 'CornerRadius=7.5', description: 'Border radius' },
          { name: 'snackbar.shadow', value: shadows.card, muiPath: 'MuiSnackbarContent.boxShadow', mauiKey: 'HasShadow=True', description: 'Elevation shadow' },
          { name: 'snackbar.bg', value: colors.neutral[900], isColor: true, muiPath: 'MuiSnackbarContent.backgroundColor', mauiKey: 'SfPopupBg', description: 'Default dark background' },
          { name: 'snackbar.text', value: '#FFFFFF', isColor: true, muiPath: 'MuiSnackbarContent.color', mauiKey: 'SfPopupTextColor', description: 'Default text on dark bg' },
        ]}
      />

      <CodeBlock
        web={`import { Snackbar, Alert, Button } from '@mui/material';
import { useState } from 'react';

function NotificationDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Notify</Button>

      {/* Simple snackbar */}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        message="Action completed"
      />

      {/* With Alert for colored snackbar */}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setOpen(false)}
        >
          Deal saved successfully!
        </Alert>
      </Snackbar>

      {/* With undo action */}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message="Contact deleted"
        action={
          <Button color="primary" size="small">
            UNDO
          </Button>
        }
      />
    </>
  );
}`}
        mobile={xamlSnippets.snackbar}
      />
    </Box>
  );
}
