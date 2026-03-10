import { Box, Typography, Paper, Grid } from '@mui/material';
import PageHeader from '../../components/docs/PageHeader';
import TokenTable from '../../components/docs/TokenTable';
import CodeBlock from '../../components/docs/CodeBlock';
import { spacing, componentSizes, borderRadius } from '../../theme/tokens';

export default function Spacing() {
  return (
    <Box>
      <PageHeader
        title="Spacing & Sizing"
        description="Spacing tokens based on an 8px grid unit and component dimensions extracted from the SVG component library."
      />

      {/* Spacing scale visual */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Spacing Scale ({spacing.unit}px base)
      </Typography>
      <Paper variant="outlined" sx={{ p: 3, mb: 4, borderColor: 'divider' }}>
        {spacing.scale.map((px, idx) => (
          <Box
            key={idx}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              py: 1,
              borderBottom: idx < spacing.scale.length - 1 ? '1px solid' : 'none',
              borderColor: 'divider',
            }}
          >
            <Typography
              variant="caption"
              sx={{ fontFamily: 'monospace', minWidth: 60, color: 'text.secondary' }}
            >
              space.{idx}
            </Typography>
            <Box
              sx={{
                width: px,
                height: 16,
                bgcolor: 'primary.main',
                borderRadius: 0.5,
                opacity: 0.6,
                minWidth: px > 0 ? 2 : 0,
              }}
            />
            <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
              {px}px
            </Typography>
          </Box>
        ))}
      </Paper>

      {/* Border radius visual */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Border Radius Scale
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {Object.entries(borderRadius).map(([name, value]) => (
          <Grid size={{ xs: 4, sm: 3, md: 2 }} key={name}>
            <Paper
              variant="outlined"
              sx={{ p: 2, textAlign: 'center', borderColor: 'divider' }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: 'primary.main',
                  borderRadius: `${Math.min(value, 24)}px`,
                  mx: 'auto',
                  mb: 1,
                  opacity: 0.8,
                }}
              />
              <Typography variant="caption" sx={{ fontFamily: 'monospace', fontWeight: 600 }}>
                {name}
              </Typography>
              <Typography variant="caption" display="block" color="text.secondary">
                {value}px
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Component dimensions */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Component Dimensions
      </Typography>
      <TokenTable
        title="Buttons"
        showPlatformColumns={false}
        tokens={Object.entries(componentSizes.button).map(([name, dims]) => ({
          name: `button.${name}`,
          value: `${'width' in dims ? dims.width : '—'}×${dims.height}px`,
          description: name,
        }))}
      />
      <TokenTable
        title="Inputs"
        showPlatformColumns={false}
        tokens={Object.entries(componentSizes.input).map(([name, dims]) => ({
          name: `input.${name}`,
          value: `${dims.width}×${dims.height}px`,
          description: name,
        }))}
      />
      <TokenTable
        title="Other Components"
        showPlatformColumns={false}
        tokens={[
          { name: 'chip', value: `h:${componentSizes.chip.height}px`, description: 'Chip height' },
          { name: 'avatar', value: `${componentSizes.avatar.size}×${componentSizes.avatar.size}px`, description: 'Avatar circle' },
          { name: 'fab', value: `${componentSizes.fab.size}×${componentSizes.fab.size}px`, description: 'Floating action button' },
          { name: 'badge', value: `${componentSizes.notificationBadge.size}×${componentSizes.notificationBadge.size}px`, description: 'Notification badge' },
          { name: 'header', value: `h:${componentSizes.header.height}px`, description: 'App header bar' },
          { name: 'snackbar', value: `${componentSizes.snackbar.width}×${componentSizes.snackbar.height}px`, description: 'Snackbar' },
        ]}
      />

      <CodeBlock
        web={`import { spacing, borderRadius, componentSizes } from './theme/tokens';

// Spacing in sx prop (MUI uses 8px base)
<Box sx={{ p: 2 }} />        // 16px padding
<Box sx={{ m: 3 }} />        // 24px margin
<Box sx={{ gap: 1.5 }} />    // 12px gap

// Border radius
<Box sx={{ borderRadius: 1 }} />   // 8px (theme shape.borderRadius)
<Chip sx={{ borderRadius: '${borderRadius.lg}px' }} />  // 11.5px pill`}
        mobile={`<!-- Spacing in XAML -->
<StackLayout Padding="16" Spacing="8" />

<!-- Border radius -->
<Frame CornerRadius="{StaticResource RadiusDefault}" />  <!-- 8 -->
<Frame CornerRadius="{StaticResource RadiusPill}" />     <!-- 21 -->

<!-- Component sizing -->
<syncfusion:SfButton HeightRequest="36" />  <!-- medium -->`}
      />
    </Box>
  );
}
