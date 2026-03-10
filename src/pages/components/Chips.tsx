import { Box, Chip, Typography, Avatar } from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';
import DoneIcon from '@mui/icons-material/Done';
import PageHeader from '../../components/docs/PageHeader';
import ComponentPreview from '../../components/docs/ComponentPreview';
import CodeBlock from '../../components/docs/CodeBlock';
import TokenTable from '../../components/docs/TokenTable';
import { colors, borderRadius, componentSizes } from '../../theme/tokens';
import { xamlSnippets } from '../../theme/maui-tokens';

export default function Chips() {
  return (
    <Box>
      <PageHeader
        title="Chips"
        description="Compact elements for filters, tags, and selections. Height: 23px from Chip.svg, fully rounded (pill shape)."
      />

      {/* Default filled chips */}
      <ComponentPreview title="Filled Chips" description="Default filled variant for primary actions and status.">
        <Chip label="Default" />
        <Chip label="Primary" color="primary" />
        <Chip label="Secondary" color="secondary" />
        <Chip label="Success" color="success" />
        <Chip label="Warning" color="warning" />
        <Chip label="Error" color="error" />
        <Chip label="Info" color="info" />
      </ComponentPreview>

      {/* Outlined chips */}
      <ComponentPreview title="Outlined Chips" description="Lower emphasis variant for secondary information.">
        <Chip label="Default" variant="outlined" />
        <Chip label="Primary" variant="outlined" color="primary" />
        <Chip label="Secondary" variant="outlined" color="secondary" />
        <Chip label="Success" variant="outlined" color="success" />
        <Chip label="Error" variant="outlined" color="error" />
      </ComponentPreview>

      {/* Deletable chips */}
      <ComponentPreview title="Deletable Chips" description="Chips with delete action for removable tags.">
        <Chip label="Deletable" onDelete={() => {}} />
        <Chip label="Primary" color="primary" onDelete={() => {}} />
        <Chip label="With Icon" icon={<FaceIcon />} onDelete={() => {}} />
      </ComponentPreview>

      {/* Clickable chips */}
      <ComponentPreview title="Clickable Chips" description="Interactive chips for filtering and selection.">
        <Chip label="Click me" onClick={() => {}} />
        <Chip label="Selected" color="primary" deleteIcon={<DoneIcon />} onDelete={() => {}} onClick={() => {}} />
        <Chip label="With Avatar" avatar={<Avatar>T</Avatar>} onClick={() => {}} />
      </ComponentPreview>

      {/* Badge variant */}
      <ComponentPreview title="Badge-style Chips" description="Compact chips used as badges for counts and status indicators.">
        <Chip label="3" color="primary" size="small" />
        <Chip label="New" color="success" size="small" />
        <Chip label="99+" color="error" size="small" />
        <Chip
          label="Premium"
          size="small"
          sx={{
            bgcolor: colors.brand.gold,
            color: colors.text.primary,
            fontWeight: 600,
          }}
        />
      </ComponentPreview>

      {/* Messenger & Facebook brand chips */}
      <ComponentPreview title="Brand Chips" description="Custom brand-color chips for platform-specific features.">
        <Chip
          label="Messenger"
          sx={{
            bgcolor: colors.messenger.main,
            color: '#fff',
            '&:hover': { bgcolor: '#4A38A6' },
          }}
        />
        <Chip
          label="Facebook"
          sx={{
            bgcolor: colors.facebook.main,
            color: '#fff',
            '&:hover': { bgcolor: '#0052CC' },
          }}
        />
      </ComponentPreview>

      {/* Size comparison */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Size Comparison
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Chip label="Small" size="small" color="primary" />
          <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>Small</Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Chip label="Medium (Default)" color="primary" />
          <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>Medium</Typography>
        </Box>
      </Box>

      <TokenTable
        title="Chip Tokens"
        showPlatformColumns={true}
        tokens={[
          { name: 'chip.height', value: `${componentSizes.chip.height}px`, muiPath: 'MuiChip.root.height', mauiKey: 'SfChipItemHeight', description: 'Chip height' },
          { name: 'chip.borderRadius', value: `${borderRadius.full}px`, muiPath: 'MuiChip.root.borderRadius', mauiKey: 'CornerRadius=999', description: 'Fully rounded' },
          { name: 'chip.bg.primary', value: colors.primary.main, isColor: true, muiPath: 'colorPrimary.bg', mauiKey: 'SfChipItemSelBg', description: 'Primary chip background' },
          { name: 'chip.bg.secondary', value: colors.secondary.main, isColor: true, muiPath: 'colorSecondary.bg', mauiKey: 'SfChipItemBg', description: 'Secondary chip background' },
          { name: 'brand.gold', value: colors.brand.gold, isColor: true, muiPath: 'custom sx', mauiKey: 'SfBadgeBg', description: 'Badge gold color' },
        ]}
      />

      <CodeBlock
        web={`import { Chip, Avatar } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';

// Filled chip
<Chip label="Tag" color="primary" />

// Outlined chip
<Chip label="Filter" variant="outlined" color="primary" />

// Deletable chip
<Chip label="Remove me" onDelete={handleDelete} />

// With avatar
<Chip label="User" avatar={<Avatar>U</Avatar>} />

// Clickable selection chip
<Chip
  label="Selected"
  color="primary"
  deleteIcon={<DoneIcon />}
  onDelete={handleToggle}
  onClick={handleToggle}
/>`}
        mobile={xamlSnippets.chip}
      />
    </Box>
  );
}
