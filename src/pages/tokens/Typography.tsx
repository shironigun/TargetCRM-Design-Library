import { Box, Typography, Paper, Grid } from '@mui/material';
import PageHeader from '../../components/docs/PageHeader';
import TokenTable from '../../components/docs/TokenTable';
import CodeBlock from '../../components/docs/CodeBlock';
import { typography } from '../../theme/tokens';

const variantEntries = Object.entries(typography.variants) as [
  string,
  (typeof typography.variants)[keyof typeof typography.variants]
][];

export default function TypographyPage() {
  return (
    <Box>
      <PageHeader
        title="Typography"
        description="The TargetCRM type scale provides a consistent hierarchy across all UI surfaces. Uses Inter as the primary font."
        badge="Interim"
      />

      <Paper variant="outlined" sx={{ p: 2, mb: 4, bgcolor: 'warning.light', borderColor: 'warning.main' }}>
        <Typography variant="body2" color="warning.dark">
          <strong>Note:</strong> Typography values are interim — inferred from component heights in the SVG library.
          Final specifications from the Style Guide PDF will be integrated once available.
        </Typography>
      </Paper>

      {/* Type specimen */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Type Scale
      </Typography>
      <Paper variant="outlined" sx={{ p: 3, mb: 4, borderColor: 'divider' }}>
        {variantEntries.map(([name, style]) => (
          <Box
            key={name}
            sx={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 3,
              py: 1.5,
              borderBottom: '1px solid',
              borderColor: 'divider',
              '&:last-child': { borderBottom: 'none' },
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontFamily: 'monospace',
                color: 'text.secondary',
                minWidth: 80,
                fontWeight: 600,
              }}
            >
              {name}
            </Typography>
            <Typography
              sx={{
                fontSize: style.fontSize,
                fontWeight: style.fontWeight,
                lineHeight: style.lineHeight,
                textTransform: ('textTransform' in style ? style.textTransform : undefined) as any,
                letterSpacing: ('letterSpacing' in style ? style.letterSpacing : undefined) as any,
              }}
            >
              The quick brown fox jumps over the lazy dog
            </Typography>
            <Typography
              variant="caption"
              sx={{ fontFamily: 'monospace', color: 'text.disabled', ml: 'auto', whiteSpace: 'nowrap' }}
            >
              {style.fontSize}px / {style.fontWeight}
            </Typography>
          </Box>
        ))}
      </Paper>

      {/* Font family */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Font Family
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {[
          { weight: 400, label: 'Regular' },
          { weight: 500, label: 'Medium' },
          { weight: 600, label: 'Semi Bold' },
          { weight: 700, label: 'Bold' },
        ].map((f) => (
          <Grid size={{ xs: 6, sm: 3 }} key={f.weight}>
            <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', borderColor: 'divider' }}>
              <Typography sx={{ fontSize: 24, fontWeight: f.weight, mb: 1 }}>
                Aa
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Inter {f.label} ({f.weight})
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Token table */}
      <TokenTable
        title="Typography Tokens"
        showPlatformColumns={true}
        tokens={variantEntries.map(([name, style]) => ({
          name,
          value: `${style.fontSize}px / ${style.fontWeight} / ${style.lineHeight}`,
          muiPath: `theme.typography.${name}`,
          mauiKey: name === 'h1' ? 'Heading1' : name === 'body1' ? 'Body1' : name === 'caption' ? 'Caption' : `Style.${name}`,
          description: `${'textTransform' in style ? (style.textTransform || 'none') : 'none'}`,
        }))}
      />

      <CodeBlock
        web={`import { Typography, useTheme } from '@mui/material';

const theme = useTheme();

// Using Typography component
<Typography variant="h1">Heading 1</Typography>
<Typography variant="body1">Body text</Typography>
<Typography variant="caption" color="text.secondary">Caption</Typography>

// Theme values
theme.typography.fontFamily  // "${typography.fontFamily}"
theme.typography.h1.fontSize // ${typography.variants.h1.fontSize}`}
        mobile={`<!-- Typography styles in XAML -->
<Label Text="Heading 1"
       Style="{StaticResource Heading1}" />

<Label Text="Body text"
       Style="{StaticResource Body1}" />

<Label Text="Caption text"
       Style="{StaticResource Caption}" />

<!-- Direct usage -->
<Label Text="Custom"
       FontFamily="Inter"
       FontSize="14"
       TextColor="{DynamicResource PrimaryTextColor}" />`}
      />
    </Box>
  );
}
