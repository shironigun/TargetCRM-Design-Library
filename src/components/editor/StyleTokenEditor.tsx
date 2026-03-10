// TargetCRM Design Library — Style Token Editor (FR4)
// Grouped form controls for editing component style tokens.
// Changes dispatch UPDATE_TOKENS immediately for real-time preview.

import { useCallback } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Grid,
  Box,
  IconButton,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useApp } from '../../store/AppContext';
import type {
  StyleTokens,
  BoxModelTokens,
  TypographyTokens,
  ColourTokens,
  ShadowTokens,
} from '../../types';

interface StyleTokenEditorProps {
  componentId: string;
  tokens: StyleTokens;
}

export default function StyleTokenEditor({
  componentId,
  tokens,
}: StyleTokenEditorProps) {
  const { dispatch } = useApp();

  const update = useCallback(
    (updater: (t: StyleTokens) => StyleTokens) => {
      dispatch({
        type: 'UPDATE_TOKENS',
        payload: { componentId, tokens: updater(tokens) },
      });
    },
    [dispatch, componentId, tokens],
  );

  const updateBoxModel = (key: keyof BoxModelTokens, value: string) =>
    update((t) => ({
      ...t,
      boxModel: { ...t.boxModel, [key]: value },
    }));

  const updateTypography = (key: keyof TypographyTokens, value: string) =>
    update((t) => ({
      ...t,
      typography: { ...t.typography, [key]: value },
    }));

  const updateColours = (key: keyof ColourTokens, value: string) =>
    update((t) => ({
      ...t,
      colours: { ...t.colours, [key]: value },
    }));

  const updateShadows = (key: keyof ShadowTokens, value: string) =>
    update((t) => ({
      ...t,
      shadows: { ...t.shadows, [key]: value },
    }));

  const addCustom = () =>
    update((t) => ({
      ...t,
      custom: { ...t.custom, [`prop-${Object.keys(t.custom).length + 1}`]: '' },
    }));

  const updateCustomKey = (oldKey: string, newKey: string) =>
    update((t) => {
      const { [oldKey]: value, ...rest } = t.custom;
      return { ...t, custom: { ...rest, [newKey]: value ?? '' } };
    });

  const updateCustomValue = (key: string, value: string) =>
    update((t) => ({
      ...t,
      custom: { ...t.custom, [key]: value },
    }));

  const removeCustom = (key: string) =>
    update((t) => {
      const { [key]: _, ...rest } = t.custom;
      return { ...t, custom: rest };
    });

  // Shadow presets
  const shadowPresets = [
    { label: 'None', value: 'none' },
    { label: 'Subtle', value: '0 1px 3px rgba(0,0,0,0.12)' },
    { label: 'Card', value: '0 2px 8px rgba(0,0,0,0.08)' },
    { label: 'Elevated', value: '0 4px 16px rgba(0,0,0,0.12)' },
    { label: 'Heavy', value: '0 8px 32px rgba(0,0,0,0.16)' },
  ];

  return (
    <Box>
      {/* ── Box Model ───────────────────────────────────────── */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Box Model
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1.5}>
            {/* Dimensions */}
            {(
              [
                ['width', 'Width'],
                ['height', 'Height'],
                ['minWidth', 'Min Width'],
                ['maxWidth', 'Max Width'],
                ['minHeight', 'Min Height'],
                ['maxHeight', 'Max Height'],
              ] as [keyof BoxModelTokens, string][]
            ).map(([key, label]) => (
              <Grid size={{ xs: 6, sm: 4 }} key={key}>
                <TextField
                  label={label}
                  size="small"
                  fullWidth
                  value={tokens.boxModel[key]}
                  onChange={(e) => updateBoxModel(key, e.target.value)}
                  placeholder="e.g. 100px, 50%, auto"
                />
              </Grid>
            ))}
            {/* Margin */}
            <Grid size={12}>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                Margin
              </Typography>
            </Grid>
            {(
              [
                ['marginTop', 'Top'],
                ['marginRight', 'Right'],
                ['marginBottom', 'Bottom'],
                ['marginLeft', 'Left'],
              ] as [keyof BoxModelTokens, string][]
            ).map(([key, label]) => (
              <Grid size={{ xs: 6, sm: 3 }} key={key}>
                <TextField
                  label={label}
                  size="small"
                  fullWidth
                  value={tokens.boxModel[key]}
                  onChange={(e) => updateBoxModel(key, e.target.value)}
                  placeholder="0"
                />
              </Grid>
            ))}
            {/* Padding */}
            <Grid size={12}>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                Padding
              </Typography>
            </Grid>
            {(
              [
                ['paddingTop', 'Top'],
                ['paddingRight', 'Right'],
                ['paddingBottom', 'Bottom'],
                ['paddingLeft', 'Left'],
              ] as [keyof BoxModelTokens, string][]
            ).map(([key, label]) => (
              <Grid size={{ xs: 6, sm: 3 }} key={key}>
                <TextField
                  label={label}
                  size="small"
                  fullWidth
                  value={tokens.boxModel[key]}
                  onChange={(e) => updateBoxModel(key, e.target.value)}
                  placeholder="0"
                />
              </Grid>
            ))}
            {/* Border Radius */}
            <Grid size={{ xs: 6, sm: 4 }}>
              <TextField
                label="Border Radius"
                size="small"
                fullWidth
                value={tokens.boxModel.borderRadius}
                onChange={(e) => updateBoxModel('borderRadius', e.target.value)}
                placeholder="e.g. 8px, 50%"
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* ── Typography ──────────────────────────────────────── */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Typography
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1.5}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Font Family"
                size="small"
                fullWidth
                value={tokens.typography.fontFamily}
                onChange={(e) => updateTypography('fontFamily', e.target.value)}
                placeholder="e.g. Inter, sans-serif"
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <FormControl size="small" fullWidth>
                <InputLabel>Weight</InputLabel>
                <Select
                  label="Weight"
                  value={tokens.typography.fontWeight}
                  onChange={(e) =>
                    updateTypography('fontWeight', e.target.value as string)
                  }
                >
                  <MenuItem value="">—</MenuItem>
                  {['100', '200', '300', '400', '500', '600', '700', '800', '900'].map(
                    (w) => (
                      <MenuItem value={w} key={w}>
                        {w}
                      </MenuItem>
                    ),
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <TextField
                label="Font Size"
                size="small"
                fullWidth
                value={tokens.typography.fontSize}
                onChange={(e) => updateTypography('fontSize', e.target.value)}
                placeholder="e.g. 16px, 1rem"
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <TextField
                label="Line Height"
                size="small"
                fullWidth
                value={tokens.typography.lineHeight}
                onChange={(e) => updateTypography('lineHeight', e.target.value)}
                placeholder="e.g. 1.5, 24px"
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <TextField
                label="Letter Spacing"
                size="small"
                fullWidth
                value={tokens.typography.letterSpacing}
                onChange={(e) =>
                  updateTypography('letterSpacing', e.target.value)
                }
                placeholder="e.g. 0.02em"
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <FormControl size="small" fullWidth>
                <InputLabel>Text Transform</InputLabel>
                <Select
                  label="Text Transform"
                  value={tokens.typography.textTransform}
                  onChange={(e) =>
                    updateTypography('textTransform', e.target.value as string)
                  }
                >
                  <MenuItem value="">—</MenuItem>
                  <MenuItem value="none">none</MenuItem>
                  <MenuItem value="uppercase">uppercase</MenuItem>
                  <MenuItem value="lowercase">lowercase</MenuItem>
                  <MenuItem value="capitalize">capitalize</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* ── Colours ─────────────────────────────────────────── */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Colours
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1.5}>
            {(
              [
                ['background', 'Background'],
                ['color', 'Text Color'],
                ['borderColor', 'Border Color'],
              ] as [keyof ColourTokens, string][]
            ).map(([key, label]) => (
              <Grid size={{ xs: 12, sm: 4 }} key={key}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
                    {tokens.colours[key] ? (
                      <input
                        type="color"
                        value={tokens.colours[key] || '#000000'}
                        onChange={(e) => updateColours(key, e.target.value)}
                        style={{
                          width: 40,
                          height: 40,
                          border: '1px solid',
                          borderColor: 'inherit',
                          borderRadius: 4,
                          cursor: 'pointer',
                          padding: 0,
                          background: 'none',
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '4px',
                          border: '1px dashed',
                          borderColor: 'divider',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          backgroundImage: 'linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%), linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%)',
                          backgroundSize: '8px 8px',
                          backgroundPosition: '0 0, 4px 4px',
                        }}
                        onClick={() => updateColours(key, '#000000')}
                        title="Click to set color"
                      />
                    )}
                    <TextField
                      label={label}
                      size="small"
                      fullWidth
                      value={tokens.colours[key]}
                      onChange={(e) => updateColours(key, e.target.value)}
                      placeholder="#000000 or rgba(...)"
                    />
                  </Box>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Button
                      size="small"
                      variant="text"
                      sx={{ fontSize: 11, minWidth: 0, px: 0.75, py: 0.25, textTransform: 'none' }}
                      onClick={() => updateColours(key, '')}
                    >
                      Clear
                    </Button>
                    <Button
                      size="small"
                      variant="text"
                      sx={{ fontSize: 11, minWidth: 0, px: 0.75, py: 0.25, textTransform: 'none' }}
                      onClick={() => updateColours(key, 'transparent')}
                    >
                      Transparent
                    </Button>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* ── Shadows ─────────────────────────────────────────── */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Shadows
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1.5}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <FormControl size="small" fullWidth>
                <InputLabel>Preset</InputLabel>
                <Select
                  label="Preset"
                  value={shadowPresets.find((p) => p.value === tokens.shadows.boxShadow)?.value ?? ''}
                  onChange={(e) => updateShadows('boxShadow', e.target.value as string)}
                >
                  {shadowPresets.map((p) => (
                    <MenuItem value={p.value} key={p.label}>
                      {p.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 8 }}>
              <TextField
                label="Box Shadow"
                size="small"
                fullWidth
                value={tokens.shadows.boxShadow}
                onChange={(e) => updateShadows('boxShadow', e.target.value)}
                placeholder="0 2px 8px rgba(0,0,0,0.08)"
              />
            </Grid>
            {/* Preview */}
            {tokens.shadows.boxShadow && (
              <Grid size={12}>
                <Box
                  sx={{
                    width: 120,
                    height: 60,
                    borderRadius: 1,
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    boxShadow: tokens.shadows.boxShadow,
                    mx: 'auto',
                    mt: 1,
                  }}
                />
              </Grid>
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* ── Custom Properties ───────────────────────────────── */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Custom Properties
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {Object.entries(tokens.custom).map(([key, value]) => (
            <Box
              key={key}
              sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}
            >
              <TextField
                size="small"
                label="Property"
                value={key}
                onChange={(e) => updateCustomKey(key, e.target.value)}
                sx={{ flex: 1 }}
              />
              <TextField
                size="small"
                label="Value"
                value={value}
                onChange={(e) => updateCustomValue(key, e.target.value)}
                sx={{ flex: 1 }}
              />
              <IconButton
                size="small"
                color="error"
                onClick={() => removeCustom(key)}
              >
                <DeleteIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>
          ))}
          <Button
            size="small"
            startIcon={<AddIcon />}
            onClick={addCustom}
            sx={{ mt: 1 }}
          >
            Add Property
          </Button>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
