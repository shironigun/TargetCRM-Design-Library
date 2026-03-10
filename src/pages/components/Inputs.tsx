import { Box, TextField, Typography } from '@mui/material';
import PageHeader from '../../components/docs/PageHeader';
import ComponentPreview from '../../components/docs/ComponentPreview';
import CodeBlock from '../../components/docs/CodeBlock';
import TokenTable from '../../components/docs/TokenTable';
import { colors, borderRadius, componentSizes } from '../../theme/tokens';
import { xamlSnippets } from '../../theme/maui-tokens';

export default function Inputs() {
  return (
    <Box>
      <PageHeader
        title="Input Fields"
        description="Two input sizes from Input Fields.svg — Default (54px) and Compact (39px). Four states: default, focused, error, and disabled."
      />

      {/* Default size */}
      <ComponentPreview title="Default Size" description={`Height: ${componentSizes.input.default.height}px, border-radius: ${borderRadius.md}px`}>
        <TextField label="Default" placeholder="Enter text..." />
        <TextField label="Focused" placeholder="Focused state" focused />
        <TextField label="Error" placeholder="Error state" error helperText="This field is required" />
        <TextField label="Disabled" placeholder="Disabled" disabled />
      </ComponentPreview>

      {/* Compact size */}
      <ComponentPreview title="Compact Size" description={`Height: ${componentSizes.input.compact.height}px, border-radius: ${borderRadius.md}px`}>
        <TextField label="Compact" size="small" placeholder="Compact input" />
        <TextField label="Focused" size="small" placeholder="Focused" focused />
        <TextField label="Error" size="small" error helperText="Error" />
        <TextField label="Disabled" size="small" disabled />
      </ComponentPreview>

      {/* With helper text */}
      <ComponentPreview title="Helper Text" description="Inputs with descriptions and validation messages.">
        <TextField
          label="Email"
          placeholder="user@example.com"
          helperText="We'll never share your email"
        />
        <TextField
          label="Phone"
          placeholder="+1 (555) 000-0000"
          error
          helperText="Invalid phone number format"
        />
      </ComponentPreview>

      {/* Multiline */}
      <ComponentPreview title="Multiline" description="Expanding text area for longer content.">
        <TextField
          label="Message"
          multiline
          rows={3}
          placeholder="Type your message..."
          sx={{ minWidth: 300 }}
        />
      </ComponentPreview>

      {/* State colors */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Border State Colors
      </Typography>
      <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
        {[
          { label: 'Default', color: colors.neutral[200] },
          { label: 'Focused', color: colors.primary.main },
          { label: 'Error', color: colors.error.main },
          { label: 'Disabled', color: colors.neutral[300] },
        ].map((state) => (
          <Box key={state.label} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 40,
                height: 4,
                bgcolor: state.color,
                borderRadius: 1,
              }}
            />
            <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
              {state.label}: {state.color}
            </Typography>
          </Box>
        ))}
      </Box>

      <TokenTable
        title="Input Tokens"
        showPlatformColumns={true}
        tokens={[
          { name: 'input.default.height', value: `${componentSizes.input.default.height}px`, muiPath: 'MuiTextField.medium', mauiKey: 'HeightRequest=54', description: 'Default input height' },
          { name: 'input.compact.height', value: `${componentSizes.input.compact.height}px`, muiPath: 'MuiTextField.small', mauiKey: 'HeightRequest=39', description: 'Compact input height' },
          { name: 'input.borderRadius', value: `${borderRadius.md}px`, muiPath: 'shape.borderRadius (7.5)', mauiKey: 'RadiusMd', description: 'Border radius' },
          { name: 'input.border.default', value: colors.neutral[200], isColor: true, muiPath: 'fieldset borderColor', mauiKey: 'SfTextInputLayoutStrokeColor', description: 'Default border' },
          { name: 'input.border.focused', value: colors.primary.main, isColor: true, muiPath: 'Mui-focused fieldset', mauiKey: 'SfTextInputLayoutFocusedStrokeColor', description: 'Focused border' },
          { name: 'input.border.error', value: colors.error.main, isColor: true, muiPath: 'Mui-error fieldset', mauiKey: 'SfTextInputLayoutErrorStrokeColor', description: 'Error border' },
          { name: 'input.border.disabled', value: colors.neutral[300], isColor: true, muiPath: 'Mui-disabled fieldset', mauiKey: 'SfTextInputLayoutDisabledStrokeColor', description: 'Disabled border' },
        ]}
      />

      <CodeBlock
        web={`import { TextField } from '@mui/material';

// Default size (54px height)
<TextField label="Name" placeholder="Enter name" />

// Compact size (39px height)
<TextField label="Name" size="small" placeholder="Compact" />

// Error state
<TextField label="Email" error helperText="Required" />

// Disabled
<TextField label="Locked" disabled value="Read only" />`}
        mobile={xamlSnippets.textInput}
      />
    </Box>
  );
}
