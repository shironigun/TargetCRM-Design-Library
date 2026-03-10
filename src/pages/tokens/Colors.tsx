import { Box, Grid, Paper, Typography, Tooltip } from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import PageHeader from '../../components/docs/PageHeader';
import TokenTable from '../../components/docs/TokenTable';
import CodeBlock from '../../components/docs/CodeBlock';
import { colors } from '../../theme/tokens';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function hexToRgb(hex: string) {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return { r, g, b };
}

function relativeLuminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(hex1: string, hex2: string) {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function ContrastBadge({ fg, bg }: { fg: string; bg: string }) {
  const ratio = contrastRatio(fg, bg);
  const aa = ratio >= 4.5;
  const aaa = ratio >= 7;
  return (
    <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
      <Tooltip title={`Contrast ratio: ${ratio.toFixed(2)}:1`}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
          {aa ? (
            <CheckCircle sx={{ fontSize: 14, color: 'success.main' }} />
          ) : (
            <Cancel sx={{ fontSize: 14, color: 'error.main' }} />
          )}
          <Typography variant="caption" sx={{ fontSize: 10 }}>
            AA
          </Typography>
        </Box>
      </Tooltip>
      <Tooltip title={`Contrast ratio: ${ratio.toFixed(2)}:1`}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
          {aaa ? (
            <CheckCircle sx={{ fontSize: 14, color: 'success.main' }} />
          ) : (
            <Cancel sx={{ fontSize: 14, color: 'error.main' }} />
          )}
          <Typography variant="caption" sx={{ fontSize: 10 }}>
            AAA
          </Typography>
        </Box>
      </Tooltip>
    </Box>
  );
}

function ColorSwatch({
  name,
  hex,
  muiPath,
  mauiKey,
}: {
  name: string;
  hex: string;
  muiPath?: string;
  mauiKey?: string;
}) {
  const { r, g, b } = hexToRgb(hex);
  const isLight = relativeLuminance(hex) > 0.5;

  return (
    <Paper
      variant="outlined"
      sx={{
        borderColor: 'divider',
        borderRadius: 2,
        overflow: 'hidden',
        transition: 'box-shadow 0.2s',
        '&:hover': { boxShadow: 2 },
      }}
    >
      <Box
        sx={{
          bgcolor: hex,
          height: 80,
          display: 'flex',
          alignItems: 'flex-end',
          p: 1,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: isLight ? '#202B3F' : '#FFFFFF',
            fontWeight: 600,
            fontFamily: 'monospace',
          }}
        >
          {hex}
        </Typography>
      </Box>
      <Box sx={{ p: 1.5 }}>
        <Typography variant="subtitle2" sx={{ fontSize: 13, fontWeight: 600 }}>
          {name}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace', display: 'block' }}>
          rgb({r}, {g}, {b})
        </Typography>
        {muiPath && (
          <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace', display: 'block', fontSize: 10 }}>
            {muiPath}
          </Typography>
        )}
        {mauiKey && (
          <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace', display: 'block', fontSize: 10 }}>
            MAUI: {mauiKey}
          </Typography>
        )}
        <Box sx={{ mt: 0.5 }}>
          <ContrastBadge fg={hex} bg="#FFFFFF" />
        </Box>
      </Box>
    </Paper>
  );
}

// ─── Color groups ─────────────────────────────────────────────────────────────

const colorGroups = [
  {
    title: 'Primary & Secondary',
    colors: [
      { name: 'Primary', hex: colors.primary.main, muiPath: 'palette.primary.main', mauiKey: 'PrimaryColor' },
      { name: 'Primary Hover', hex: colors.primary.hover, muiPath: 'palette.primary.dark' },
      { name: 'Primary Focus', hex: colors.primary.focus, muiPath: 'palette.primary.light' },
      { name: 'Secondary', hex: colors.secondary.main, muiPath: 'palette.secondary.main', mauiKey: 'SecondaryColor' },
    ],
  },
  {
    title: 'Semantic Status',
    colors: [
      { name: 'Error', hex: colors.error.main, muiPath: 'palette.error.main', mauiKey: 'ErrorColor' },
      { name: 'Error Bg', hex: colors.error.background, muiPath: 'palette.error.light', mauiKey: 'ErrorBackgroundColor' },
      { name: 'Warning', hex: colors.warning.main, muiPath: 'palette.warning.main', mauiKey: 'WarningColor' },
      { name: 'Warning Bg', hex: colors.warning.background, muiPath: 'palette.warning.light', mauiKey: 'WarningBackgroundColor' },
      { name: 'Info', hex: colors.info.main, muiPath: 'palette.info.main', mauiKey: 'InfoColor' },
      { name: 'Info Bg', hex: colors.info.background, muiPath: 'palette.info.light', mauiKey: 'InfoBackgroundColor' },
      { name: 'Success', hex: colors.success.main, muiPath: 'palette.success.main', mauiKey: 'SuccessColor' },
      { name: 'Success Bg', hex: colors.success.background, muiPath: 'palette.success.light', mauiKey: 'SuccessBackgroundColor' },
    ],
  },
  {
    title: 'Custom / Brand',
    colors: [
      { name: 'Messenger', hex: colors.messenger.main, muiPath: 'palette.messenger.main', mauiKey: 'MessengerColor' },
      { name: 'Facebook', hex: colors.facebook.main, muiPath: 'palette.facebook.main', mauiKey: 'FacebookColor' },
      { name: 'Destructive', hex: colors.destructive.main, muiPath: 'palette.destructive.main' },
      { name: 'Badge', hex: colors.badge.main, mauiKey: 'BadgeColor' },
      { name: 'Brand Gold', hex: colors.brand.gold, mauiKey: 'BrandGoldColor' },
      { name: 'Brand Navy', hex: colors.brand.navy, mauiKey: 'BrandNavyColor' },
    ],
  },
  {
    title: 'Neutral Scale',
    colors: [
      { name: 'Neutral 900', hex: colors.neutral[900], muiPath: 'palette.text.primary', mauiKey: 'Neutral900' },
      { name: 'Neutral 600', hex: colors.neutral[600], mauiKey: 'Neutral600' },
      { name: 'Neutral 500', hex: colors.neutral[500], muiPath: 'palette.text.secondary', mauiKey: 'Neutral500' },
      { name: 'Neutral 300', hex: colors.neutral[300], muiPath: 'palette.text.disabled', mauiKey: 'Neutral300' },
      { name: 'Neutral 200', hex: colors.neutral[200], muiPath: 'palette.divider', mauiKey: 'Neutral200' },
      { name: 'Neutral 100', hex: colors.neutral[100], mauiKey: 'Neutral100' },
      { name: 'Neutral 50', hex: colors.neutral[50], muiPath: 'palette.background.paper', mauiKey: 'Neutral50' },
      { name: 'White', hex: colors.neutral[0], muiPath: 'palette.background.default', mauiKey: 'White' },
    ],
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Colors() {
  return (
    <Box>
      <PageHeader
        title="Colors"
        description="The TargetCRM color system is designed for clarity and accessibility. Every color has a defined semantic role and maps to both MUI palette values (web) and Syncfusion/MAUI ResourceDictionary keys (mobile)."
      />

      {colorGroups.map((group) => (
        <Box key={group.title} sx={{ mb: 5 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {group.title}
          </Typography>
          <Grid container spacing={2}>
            {group.colors.map((c) => (
              <Grid size={{ xs: 6, sm: 4, md: 3 }} key={c.name}>
                <ColorSwatch {...c} />
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}

      {/* Token reference table */}
      <TokenTable
        title="Full Color Token Reference"
        tokens={colorGroups.flatMap((g) =>
          g.colors.map((c) => ({
            name: c.name,
            value: c.hex,
            isColor: true,
            muiPath: c.muiPath,
            mauiKey: c.mauiKey,
            description: '',
          }))
        )}
      />

      <CodeBlock
        web={`import { useTheme } from '@mui/material/styles';

const theme = useTheme();

// Access colors
theme.palette.primary.main     // "${colors.primary.main}"
theme.palette.error.main       // "${colors.error.main}"
theme.palette.messenger.main   // "${colors.messenger.main}"
theme.palette.neutral[900]     // "${colors.neutral[900]}"

// In sx prop
<Box sx={{ color: 'primary.main', bgcolor: 'background.paper' }} />`}
        mobile={`<!-- Access colors in XAML -->
<Color x:Key="PrimaryColor">${colors.primary.main}</Color>

<!-- Usage in controls -->
<Label TextColor="{DynamicResource PrimaryColor}" />
<Frame BackgroundColor="{DynamicResource ErrorBackgroundColor}" />

<!-- Syncfusion control theming -->
<Color x:Key="SfButtonNormalBackground">
    {DynamicResource PrimaryColor}
</Color>`}
      />
    </Box>
  );
}
