import { Box, Alert, AlertTitle, Typography } from '@mui/material';
import PageHeader from '../../components/docs/PageHeader';
import ComponentPreview from '../../components/docs/ComponentPreview';
import CodeBlock from '../../components/docs/CodeBlock';
import TokenTable from '../../components/docs/TokenTable';
import { colors, borderRadius, componentSizes } from '../../theme/tokens';
import { xamlSnippets } from '../../theme/maui-tokens';

const alertTypes = ['info', 'warning', 'error', 'success'] as const;

export default function Alerts() {
  return (
    <Box>
      <PageHeader
        title="Alerts"
        description="Status alerts in three sizes from Alert.svg — Small (35px), Medium (45px), Large (70px). Four semantic types: info, warning, error, and success."
      />

      {/* Standard alerts */}
      <ComponentPreview title="Standard Alerts" description="Default filled alerts for all four types.">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
          {alertTypes.map((severity) => (
            <Alert key={severity} severity={severity}>
              This is a <strong>{severity}</strong> alert — check it out!
            </Alert>
          ))}
        </Box>
      </ComponentPreview>

      {/* With title */}
      <ComponentPreview title="Alerts with Title" description="Larger alerts with a heading for more important messages.">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
          {alertTypes.map((severity) => (
            <Alert key={severity} severity={severity}>
              <AlertTitle>{severity.charAt(0).toUpperCase() + severity.slice(1)}</AlertTitle>
              This is a {severity} alert with a descriptive title — <strong>take action now!</strong>
            </Alert>
          ))}
        </Box>
      </ComponentPreview>

      {/* Outlined variant */}
      <ComponentPreview title="Outlined Alerts" description="Lower-emphasis outlined variant.">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
          {alertTypes.map((severity) => (
            <Alert key={severity} severity={severity} variant="outlined">
              Outlined {severity} alert
            </Alert>
          ))}
        </Box>
      </ComponentPreview>

      {/* Closable alerts */}
      <ComponentPreview title="Closable Alerts" description="Alerts with a close button for dismissible messages.">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
          <Alert severity="info" onClose={() => {}}>
            Dismissible info alert
          </Alert>
          <Alert severity="warning" onClose={() => {}}>
            Dismissible warning alert
          </Alert>
          <Alert severity="error" onClose={() => {}}>
            <AlertTitle>Error</AlertTitle>
            Dismissible error with title
          </Alert>
        </Box>
      </ComponentPreview>

      {/* Size comparison */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Size Reference
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
        {[
          { label: `Small (${componentSizes.alert.small.height}px)`, height: componentSizes.alert.small.height },
          { label: `Medium (${componentSizes.alert.medium.height}px)`, height: componentSizes.alert.medium.height },
          { label: `Large (${componentSizes.alert.large.height}px)`, height: componentSizes.alert.large.height },
        ].map((size) => (
          <Box key={size.label} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: '100%',
                maxWidth: 420,
                height: size.height,
                bgcolor: colors.info.light,
                border: `1px solid ${colors.info.main}`,
                borderRadius: `${borderRadius.md}px`,
                display: 'flex',
                alignItems: 'center',
                px: 2,
              }}
            >
              <Typography variant="body2" color="info.main" fontWeight={600}>
                {size.label}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Color matrix */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Alert Color Mapping
      </Typography>
      <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
        {[
          { type: 'Info', bg: colors.info.light, fg: colors.info.main },
          { type: 'Warning', bg: colors.warning.light, fg: colors.warning.main },
          { type: 'Error', bg: colors.error.light, fg: colors.error.main },
          { type: 'Success', bg: colors.success.light, fg: colors.success.main },
        ].map((c) => (
          <Box key={c.type} sx={{ textAlign: 'center' }}>
            <Box
              sx={{
                width: 80,
                height: 40,
                bgcolor: c.bg,
                border: `2px solid ${c.fg}`,
                borderRadius: `${borderRadius.md}px`,
                mb: 0.5,
              }}
            />
            <Typography variant="caption" fontWeight={600}>{c.type}</Typography>
            <Typography variant="caption" display="block" sx={{ fontFamily: 'monospace', fontSize: 10 }}>{c.fg}</Typography>
          </Box>
        ))}
      </Box>

      <TokenTable
        title="Alert Tokens"
        showPlatformColumns={true}
        tokens={[
          { name: 'alert.small.height', value: `${componentSizes.alert.small.height}px`, muiPath: 'MuiAlert sx override', mauiKey: 'HeightRequest=35', description: 'Small alert height' },
          { name: 'alert.medium.height', value: `${componentSizes.alert.medium.height}px`, muiPath: 'MuiAlert default', mauiKey: 'HeightRequest=45', description: 'Medium alert height' },
          { name: 'alert.large.height', value: `${componentSizes.alert.large.height}px`, muiPath: 'MuiAlert sx override', mauiKey: 'HeightRequest=70', description: 'Large alert height' },
          { name: 'alert.borderRadius', value: `${borderRadius.md}px`, muiPath: 'MuiAlert.root.borderRadius', mauiKey: 'CornerRadius=7.5', description: 'Alert border-radius' },
          { name: 'alert.info.bg', value: colors.info.light, isColor: true, muiPath: 'standardInfo.bg', mauiKey: 'Background', description: 'Info background' },
          { name: 'alert.info.fg', value: colors.info.main, isColor: true, muiPath: 'standardInfo.color', mauiKey: 'TextColor', description: 'Info foreground' },
          { name: 'alert.warning.bg', value: colors.warning.light, isColor: true, muiPath: 'standardWarning.bg', mauiKey: 'Background', description: 'Warning background' },
          { name: 'alert.warning.fg', value: colors.warning.main, isColor: true, muiPath: 'standardWarning.color', mauiKey: 'TextColor', description: 'Warning foreground' },
          { name: 'alert.error.bg', value: colors.error.light, isColor: true, muiPath: 'standardError.bg', mauiKey: 'Background', description: 'Error background' },
          { name: 'alert.error.fg', value: colors.error.main, isColor: true, muiPath: 'standardError.color', mauiKey: 'TextColor', description: 'Error foreground' },
          { name: 'alert.success.bg', value: colors.success.light, isColor: true, muiPath: 'standardSuccess.bg', mauiKey: 'Background', description: 'Success background' },
          { name: 'alert.success.fg', value: colors.success.main, isColor: true, muiPath: 'standardSuccess.color', mauiKey: 'TextColor', description: 'Success foreground' },
        ]}
      />

      <CodeBlock
        web={`import { Alert, AlertTitle } from '@mui/material';

// Standard alerts
<Alert severity="info">Informational message</Alert>
<Alert severity="warning">Warning message</Alert>
<Alert severity="error">Error message</Alert>
<Alert severity="success">Success message</Alert>

// With title
<Alert severity="error">
  <AlertTitle>Error</AlertTitle>
  Something went wrong — <strong>try again.</strong>
</Alert>

// Outlined variant
<Alert severity="info" variant="outlined">
  Outlined info alert
</Alert>

// Closable
<Alert severity="warning" onClose={() => setOpen(false)}>
  Dismissible warning
</Alert>`}
        mobile={xamlSnippets.alert}
      />
    </Box>
  );
}
