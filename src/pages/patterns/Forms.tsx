import { Box, Typography, TextField, Button, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio, Checkbox, Switch, Select, MenuItem, InputLabel, Divider, Alert } from '@mui/material';
import PageHeader from '../../components/docs/PageHeader';
import ComponentPreview from '../../components/docs/ComponentPreview';
import CodeBlock from '../../components/docs/CodeBlock';
import { colors, borderRadius, spacing } from '../../theme/tokens';

export default function Forms() {
  return (
    <Box>
      <PageHeader
        title="Form Patterns"
        description="Standard form layouts, validation patterns, and field groupings used across TargetCRM. Built on MUI TextField, FormControl, and validation conventions."
      />

      {/* Contact form */}
      <ComponentPreview title="Contact Form" description="Standard CRM contact creation form with validation.">
        <Box
          component="form"
          sx={{
            width: '100%',
            maxWidth: 480,
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5,
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            New Contact
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="First Name" required fullWidth />
            <TextField label="Last Name" required fullWidth />
          </Box>

          <TextField label="Email Address" type="email" required fullWidth />
          <TextField label="Phone Number" type="tel" fullWidth />
          <TextField label="Company" fullWidth />

          <FormControl fullWidth>
            <InputLabel>Lead Source</InputLabel>
            <Select label="Lead Source" defaultValue="">
              <MenuItem value="web">Website</MenuItem>
              <MenuItem value="referral">Referral</MenuItem>
              <MenuItem value="social">Social Media</MenuItem>
              <MenuItem value="event">Event</MenuItem>
            </Select>
          </FormControl>

          <TextField label="Notes" multiline rows={3} fullWidth />

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button variant="outlined" color="inherit">Cancel</Button>
            <Button variant="contained">Save Contact</Button>
          </Box>
        </Box>
      </ComponentPreview>

      {/* Validation states */}
      <ComponentPreview title="Validation States" description="Required, error, success, and helper text patterns.">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, width: '100%', maxWidth: 400 }}>
          <TextField label="Required Field" required helperText="* This field is required" />
          <TextField label="Error State" error helperText="Please enter a valid email address" value="invalid-email" />
          <TextField
            label="Success State"
            value="john@example.com"
            helperText="Email verified"
            color="success"
            focused
          />
          <TextField label="With Helper Text" helperText="Enter your full legal name as it appears on ID" />
          <TextField label="Character Count" helperText="0/120" inputProps={{ maxLength: 120 }} />
        </Box>
      </ComponentPreview>

      {/* Field groups */}
      <ComponentPreview title="Field Groups" description="Logical grouping of related fields.">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%', maxWidth: 480 }}>
          {/* Address group */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1.5 }}>
              Address
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField label="Street Address" fullWidth />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField label="City" fullWidth />
                <TextField label="State" sx={{ width: 120 }} />
                <TextField label="ZIP" sx={{ width: 100 }} />
              </Box>
            </Box>
          </Box>

          <Divider />

          {/* Preferences */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1.5 }}>
              Communication Preferences
            </Typography>
            <FormControl component="fieldset">
              <FormLabel component="legend">Preferred Contact Method</FormLabel>
              <RadioGroup defaultValue="email" row>
                <FormControlLabel value="email" control={<Radio />} label="Email" />
                <FormControlLabel value="phone" control={<Radio />} label="Phone" />
                <FormControlLabel value="text" control={<Radio />} label="SMS" />
              </RadioGroup>
            </FormControl>

            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Receive email updates" />
              <FormControlLabel control={<Checkbox />} label="Receive SMS notifications" />
              <FormControlLabel control={<Switch defaultChecked />} label="Marketing opt-in" />
            </Box>
          </Box>
        </Box>
      </ComponentPreview>

      {/* Inline editing */}
      <ComponentPreview title="Inline Edit Pattern" description="Click-to-edit fields for quick data updates.">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, width: '100%', maxWidth: 400 }}>
          {[
            { label: 'Name', value: 'Sarah Johnson' },
            { label: 'Email', value: 'sarah@acme.com' },
            { label: 'Phone', value: '+1 (555) 123-4567' },
          ].map((field) => (
            <Box
              key={field.label}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 1,
                borderRadius: `${borderRadius.default}px`,
                '&:hover': { bgcolor: colors.neutral[50] },
                cursor: 'pointer',
              }}
            >
              <Typography variant="caption" color="text.secondary" sx={{ minWidth: 60 }}>
                {field.label}
              </Typography>
              <Typography variant="body2" sx={{ flex: 1 }}>
                {field.value}
              </Typography>
              <Typography variant="caption" color="primary" sx={{ opacity: 0 , '.MuiBox-root:hover &': { opacity: 1 } }}>
                Edit
              </Typography>
            </Box>
          ))}
        </Box>
      </ComponentPreview>

      {/* Form with error summary */}
      <ComponentPreview title="Error Summary Pattern" description="Form with top-level error summary alert.">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: 480 }}>
          <Alert severity="error">
            <Typography variant="body2" fontWeight={600}>Please fix the following errors:</Typography>
            <ul style={{ margin: '4px 0 0', paddingLeft: 20 }}>
              <li><Typography variant="body2">First Name is required</Typography></li>
              <li><Typography variant="body2">Email format is invalid</Typography></li>
            </ul>
          </Alert>
          <TextField label="First Name" required error helperText="Required" />
          <TextField label="Email" error helperText="Invalid format" value="bad@" />
          <TextField label="Phone" value="+1 (555) 000-0000" />
        </Box>
      </ComponentPreview>

      {/* Spacing guide */}
      <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>
        Form Spacing Guidelines
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 4 }}>
        {[
          { label: 'Between fields', value: `${spacing.scale[4]}px (spacing.4 = 16px)` },
          { label: 'Between field groups', value: `${spacing.scale[6]}px (spacing.6 = 24px)` },
          { label: 'Between sections', value: `${spacing.scale[8]}px (spacing.8 = 32px)` },
          { label: 'Form padding', value: `${spacing.scale[6]}px (spacing.6 = 24px)` },
          { label: 'Button row gap', value: `${spacing.scale[4]}px (spacing.4 = 16px)` },
        ].map((rule) => (
          <Box key={rule.label} sx={{ display: 'flex', gap: 2 }}>
            <Typography variant="body2" fontWeight={600} sx={{ minWidth: 160 }}>
              {rule.label}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
              {rule.value}
            </Typography>
          </Box>
        ))}
      </Box>

      <CodeBlock
        web={`import { TextField, Button, FormControl, Select } from '@mui/material';

function ContactForm({ onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        {/* Name row */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField label="First Name" required fullWidth />
          <TextField label="Last Name" required fullWidth />
        </Box>

        <TextField label="Email" type="email" required fullWidth />
        <TextField label="Phone" type="tel" fullWidth />

        {/* Validation */}
        <TextField
          label="Email"
          error={!!errors.email}
          helperText={errors.email || ''}
          fullWidth
        />

        {/* Actions */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button variant="outlined" color="inherit">Cancel</Button>
          <Button variant="contained" type="submit">Save</Button>
        </Box>
      </Box>
    </form>
  );
}`}
        mobile={`<!-- Form Pattern — .NET MAUI -->
<ScrollView Padding="24">
    <VerticalStackLayout Spacing="16">

        <!-- Name fields -->
        <HorizontalStackLayout Spacing="12">
            <syncfusion:SfTextInputLayout Hint="First Name"
                ContainerType="Outlined" HorizontalOptions="FillAndExpand">
                <Entry />
            </syncfusion:SfTextInputLayout>
            <syncfusion:SfTextInputLayout Hint="Last Name"
                ContainerType="Outlined" HorizontalOptions="FillAndExpand">
                <Entry />
            </syncfusion:SfTextInputLayout>
        </HorizontalStackLayout>

        <syncfusion:SfTextInputLayout Hint="Email"
            ContainerType="Outlined" Keyboard="Email">
            <Entry />
        </syncfusion:SfTextInputLayout>

        <!-- Error state -->
        <syncfusion:SfTextInputLayout Hint="Phone"
            ContainerType="Outlined"
            HasError="True"
            ErrorText="Invalid phone number">
            <Entry />
        </syncfusion:SfTextInputLayout>

        <!-- Actions -->
        <HorizontalStackLayout Spacing="12"
            HorizontalOptions="End">
            <syncfusion:SfButton Text="Cancel"
                Background="Transparent"
                TextColor="{DynamicResource PrimaryColor}"
                Stroke="{DynamicResource PrimaryColor}" />
            <syncfusion:SfButton Text="Save Contact"
                Background="{DynamicResource PrimaryColor}" />
        </HorizontalStackLayout>

    </VerticalStackLayout>
</ScrollView>`}
      />
    </Box>
  );
}
