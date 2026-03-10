import { Box, Typography, Grid, Paper, Chip } from '@mui/material';
import PageHeader from '../components/docs/PageHeader';
import { colors } from '../theme/tokens';

export default function GettingStarted() {
  return (
    <Box>
      <PageHeader
        title="TargetCRM Design System"
        description="A comprehensive design system for TargetCRM / Notify360 — the customer engagement platform for dealerships. Built from the SVG component library with full support for React + MUI (web) and .NET MAUI + Syncfusion (mobile)."
      />

      {/* Stats cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {[
          { label: 'Colors', value: '27+', color: colors.primary.main },
          { label: 'Components', value: '14', color: colors.info.main },
          { label: 'Patterns', value: '8', color: colors.success.main },
          { label: 'Platforms', value: '2', color: colors.messenger.main },
        ].map((stat) => (
          <Grid size={{ xs: 6, sm: 3 }} key={stat.label}>
            <Paper
              variant="outlined"
              sx={{ p: 2.5, textAlign: 'center', borderColor: 'divider' }}
            >
              <Typography variant="h3" fontWeight={700} sx={{ color: stat.color }}>
                {stat.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stat.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Platform support */}
      <Paper variant="outlined" sx={{ p: 3, mb: 4, borderColor: 'divider' }}>
        <Typography variant="h6" gutterBottom>
          Platform Support
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Typography variant="subtitle2" fontWeight={600}>
                Web Application
              </Typography>
              <Chip label="React + MUI" size="small" color="primary" />
            </Box>
            <Typography variant="body2" color="text.secondary">
              React 19 + TypeScript + Material UI v6. Uses createTheme() with custom palette,
              typography, and component overrides. CSS variables enabled for runtime theming.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Typography variant="subtitle2" fontWeight={600}>
                Mobile Application
              </Typography>
              <Chip label=".NET MAUI + Syncfusion" size="small" sx={{ bgcolor: colors.messenger.main, color: '#fff' }} />
            </Box>
            <Typography variant="body2" color="text.secondary">
              .NET MAUI with Syncfusion controls. Uses ResourceDictionary with DynamicResource
              bindings for runtime theme switching. Per-control Syncfusion theme keys mapped.
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Quick nav */}
      <Typography variant="h6" gutterBottom>
        Explore
      </Typography>
      <Grid container spacing={2}>
        {[
          { title: 'Colors', desc: '27+ color tokens with semantic meanings', path: '/tokens/colors' },
          { title: 'Typography', desc: 'Type scale and font configuration', path: '/tokens/typography' },
          { title: 'Buttons', desc: '6 button variants with all interactive states', path: '/components/buttons' },
          { title: 'Inputs', desc: 'Text fields with default and compact sizes', path: '/components/inputs' },
          { title: 'Messenger', desc: 'Chat bubbles, cards, and layout patterns', path: '/composites/messages' },
          { title: 'Deals Pipeline', desc: 'Kanban board layout for sales pipeline', path: '/layouts/deals-pipeline' },
        ].map((item) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.path}>
            <Paper
              variant="outlined"
              sx={{
                p: 2.5,
                cursor: 'pointer',
                borderColor: 'divider',
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: 'primary.main',
                  boxShadow: `0 0 0 1px ${colors.primary.main}`,
                },
              }}
              onClick={() => window.location.href = item.path}
            >
              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                {item.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {item.desc}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
