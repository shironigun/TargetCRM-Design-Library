import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { Add as AddIcon, Send as SendIcon } from '@mui/icons-material';
import PageHeader from '../../components/docs/PageHeader';
import ComponentPreview from '../../components/docs/ComponentPreview';
import CodeBlock from '../../components/docs/CodeBlock';
import TokenTable from '../../components/docs/TokenTable';
import { colors, borderRadius, componentSizes } from '../../theme/tokens';
import { xamlSnippets } from '../../theme/maui-tokens';

export default function Buttons() {
  return (
    <Box>
      <PageHeader
        title="Buttons"
        description="Six button variants extracted from BUTTONS.svg — Small, Medium, Large, Pill, Outlined, and Icon. Each with full state coverage: default, hover, focus, and disabled."
      />

      {/* Sizes */}
      <ComponentPreview title="Sizes" description="Three standard sizes with consistent border-radius.">
        <Button variant="contained" size="small">Small</Button>
        <Button variant="contained" size="medium">Medium</Button>
        <Button variant="contained" size="large">Large</Button>
      </ComponentPreview>

      {/* Pill variant */}
      <ComponentPreview title="Pill" description="Fully rounded ends (border-radius: 21px) for prominent CTAs.">
        <Button variant="contained" className="pill" sx={{ borderRadius: borderRadius.pill + 'px', height: 42, px: 3 }}>
          Pill Button
        </Button>
        <Button variant="contained" className="pill" sx={{ borderRadius: borderRadius.pill + 'px', height: 42, px: 3 }} disabled>
          Disabled Pill
        </Button>
      </ComponentPreview>

      {/* Outlined */}
      <ComponentPreview title="Outlined" description="White background with primary stroke border.">
        <Button variant="outlined">Outlined</Button>
        <Button variant="outlined" disabled>Disabled</Button>
      </ComponentPreview>

      {/* Neutral */}
      <ComponentPreview title="Neutral" description="Neutral gray background for secondary actions.">
        <Button variant="contained" color="inherit">Neutral</Button>
      </ComponentPreview>

      {/* Icon button */}
      <ComponentPreview title="Icon Button" description="Icon-only buttons for compact UI areas.">
        <IconButton color="primary"><AddIcon /></IconButton>
        <IconButton color="primary"><SendIcon /></IconButton>
        <IconButton disabled><AddIcon /></IconButton>
      </ComponentPreview>

      {/* Color variants */}
      <ComponentPreview title="Color Variants" description="Custom palette colors for specific contexts.">
        <Button variant="contained" color="primary">Primary</Button>
        <Button variant="contained" color="error">Error</Button>
        <Button variant="contained" color="success">Success</Button>
        <Button variant="contained" color="warning">Warning</Button>
        <Button variant="contained" color="info">Info</Button>
        <Button variant="contained" sx={{ bgcolor: colors.messenger.main, '&:hover': { bgcolor: '#3E2F99' } }}>Messenger</Button>
        <Button variant="contained" sx={{ bgcolor: colors.facebook.main, '&:hover': { bgcolor: '#0651CC' } }}>Facebook</Button>
      </ComponentPreview>

      {/* States demo */}
      <ComponentPreview title="Interactive States" description="Hover and focus the buttons below to see state transitions.">
        <Stack spacing={1} alignItems="flex-start">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ width: 80, height: 32, bgcolor: colors.primary.main, borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="caption" color="white">Default</Typography>
            </Box>
            <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>{colors.primary.main}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ width: 80, height: 32, bgcolor: colors.primary.hover, borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="caption" color="white">Hover</Typography>
            </Box>
            <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>{colors.primary.hover}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ width: 80, height: 32, bgcolor: colors.primary.focus, borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="caption" color="white">Focus</Typography>
            </Box>
            <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>{colors.primary.focus}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ width: 80, height: 32, bgcolor: colors.neutral[300], borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="caption" color="white">Disabled</Typography>
            </Box>
            <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>{colors.neutral[300]}</Typography>
          </Box>
        </Stack>
      </ComponentPreview>

      {/* Dimensions table */}
      <TokenTable
        title="Button Dimensions"
        showPlatformColumns={false}
        tokens={Object.entries(componentSizes.button).map(([name, dims]) => ({
          name: `button.${name}`,
          value: `${'width' in dims ? dims.width + '×' : ''}${dims.height}px`,
          description: `border-radius: ${name === 'pill' ? borderRadius.pill : name === 'outlined' ? borderRadius.md : borderRadius.default}px`,
        }))}
      />

      <CodeBlock
        web={`import { Button, IconButton } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

// Standard sizes
<Button variant="contained" size="small">Small</Button>
<Button variant="contained" size="medium">Medium</Button>
<Button variant="contained" size="large">Large</Button>

// Pill variant
<Button variant="contained" sx={{ borderRadius: '21px', height: 42 }}>
  Pill Button
</Button>

// Outlined
<Button variant="outlined">Outlined</Button>

// Icon button
<IconButton color="primary"><AddIcon /></IconButton>

// Custom colors
<Button variant="contained" color="messenger">Messenger</Button>`}
        mobile={xamlSnippets.button + '\n\n' + xamlSnippets.buttonOutlined}
      />
    </Box>
  );
}
