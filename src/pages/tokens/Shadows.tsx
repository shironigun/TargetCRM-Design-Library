import { Box, Typography, Paper, Grid } from '@mui/material';
import PageHeader from '../../components/docs/PageHeader';
import TokenTable from '../../components/docs/TokenTable';
import CodeBlock from '../../components/docs/CodeBlock';
import { shadows } from '../../theme/tokens';

export default function Shadows() {
  return (
    <Box>
      <PageHeader
        title="Shadows"
        description="Three distinct shadow levels extracted from the SVG component library, each tuned for specific use cases."
      />

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          {
            name: 'Card',
            token: 'shadows.card',
            value: shadows.card,
            desc: 'Subtle, wide-spread shadow for elevated containers like cards, dialogs, and dropdowns.',
            usage: 'Cards, Calendar, FAB, Dialogs',
          },
          {
            name: 'Button Micro',
            token: 'shadows.buttonMicro',
            value: shadows.buttonMicro,
            desc: 'Tight micro-shadow giving depth to interactive elements. Barely visible but adds tactile feel.',
            usage: 'Buttons, Interactive controls',
          },
          {
            name: 'Chip',
            token: 'shadows.chip',
            value: shadows.chip,
            desc: 'Directional offset shadow (2px down-right) for small surface elements.',
            usage: 'Chips, Header elements, Tags',
          },
        ].map((s) => (
          <Grid size={{ xs: 12, md: 4 }} key={s.name}>
            <Paper variant="outlined" sx={{ borderColor: 'divider', overflow: 'hidden' }}>
              <Box
                sx={{
                  p: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: '#F7F7F7',
                }}
              >
                <Box
                  sx={{
                    width: 120,
                    height: 80,
                    bgcolor: 'background.default',
                    borderRadius: 2,
                    boxShadow: s.value,
                  }}
                />
              </Box>
              <Box sx={{ p: 2 }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  {s.name}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace', display: 'block', mb: 1 }}>
                  {s.token}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: 12 }}>
                  {s.desc}
                </Typography>
                <Typography variant="caption" sx={{ mt: 1, display: 'block', fontWeight: 500 }}>
                  Used by: {s.usage}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Raw values table */}
      <TokenTable
        title="Shadow Tokens"
        showPlatformColumns={false}
        tokens={[
          { name: 'shadows.card', value: shadows.card, description: 'Card / elevated containers' },
          { name: 'shadows.buttonMicro', value: shadows.buttonMicro, description: 'Buttons / small interactives' },
          { name: 'shadows.chip', value: shadows.chip, description: 'Chips / directional accent' },
          { name: 'shadows.none', value: 'none', description: 'No shadow' },
        ]}
      />

      {/* Comparison */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Comparison
      </Typography>
      <Paper
        variant="outlined"
        sx={{
          p: 4,
          mb: 4,
          borderColor: 'divider',
          display: 'flex',
          gap: 4,
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          bgcolor: '#F7F7F7',
        }}
      >
        {(['none', 'buttonMicro', 'chip', 'card'] as const).map((key) => (
          <Box key={key} sx={{ textAlign: 'center' }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'background.default',
                borderRadius: 2,
                boxShadow: shadows[key],
                mb: 1,
              }}
            />
            <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
              {key}
            </Typography>
          </Box>
        ))}
      </Paper>

      <CodeBlock
        web={`import { shadows } from './theme/tokens';

// In sx prop
<Card sx={{ boxShadow: shadows.card }} />
<Button sx={{ boxShadow: shadows.buttonMicro }} />
<Chip sx={{ boxShadow: shadows.chip }} />

// MUI theme applies these automatically:
// - MuiCard: shadows.card
// - MuiButton: shadows.buttonMicro
// - MuiFab: shadows.card`}
        mobile={`<!-- Shadows in MAUI -->
<!-- MAUI uses Shadow class -->
<Frame>
    <Frame.Shadow>
        <Shadow Brush="#202B3F"
               Offset="0,4"
               Radius="16"
               Opacity="0.08" />
    </Frame.Shadow>
</Frame>

<!-- For buttons -->
<syncfusion:SfButton>
    <syncfusion:SfButton.Shadow>
        <Shadow Brush="Black"
               Offset="0,1"
               Radius="1"
               Opacity="0.25" />
    </syncfusion:SfButton.Shadow>
</syncfusion:SfButton>`}
      />
    </Box>
  );
}
