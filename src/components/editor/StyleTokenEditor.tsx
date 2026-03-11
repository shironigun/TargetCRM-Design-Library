// TargetCRM Design Library — Style Token Editor (FR4)
// Multi-group form controls for editing component style tokens.
// Each category (Box Model, Typography, Colours, Custom) supports
// multiple user-labelled groups. Colours are an unlimited list.

import { useCallback, useState } from 'react';
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
  Chip,
  Paper,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { nanoid } from 'nanoid';
import { useApp } from '../../store/AppContext';
import type {
  StyleTokens,
  BoxModelTokens,
  TypographyTokens,
  ColourEntry,
  ShadowTokens,
} from '../../types';
import {
  defaultBoxModel,
  defaultTypography,
  migrateStyleTokens,
} from '../../types';

// ─── Helpers ──────────────────────────────────────────────────────────────────

interface StyleTokenEditorProps {
  componentId: string;
  tokens: StyleTokens;
}

/** Inline-rename header for a group */
function GroupHeader({
  label,
  onRename,
  onDelete,
}: {
  label: string;
  onRename: (newLabel: string) => void;
  onDelete: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(label);

  const save = () => {
    if (draft.trim()) onRename(draft.trim());
    setEditing(false);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
      {editing ? (
        <>
          <TextField
            size="small"
            variant="standard"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') save();
              if (e.key === 'Escape') { setEditing(false); setDraft(label); }
            }}
            autoFocus
            sx={{ flex: 1, '& input': { fontSize: 13, fontWeight: 600, py: 0 } }}
          />
          <IconButton size="small" onClick={save}><CheckIcon sx={{ fontSize: 14 }} /></IconButton>
          <IconButton size="small" onClick={() => { setEditing(false); setDraft(label); }}><CloseIcon sx={{ fontSize: 14 }} /></IconButton>
        </>
      ) : (
        <>
          <Chip
            label={label}
            size="small"
            variant="outlined"
            sx={{ fontWeight: 600, fontSize: 12 }}
          />
          <IconButton size="small" onClick={() => { setDraft(label); setEditing(true); }}>
            <EditIcon sx={{ fontSize: 14 }} />
          </IconButton>
          <IconButton size="small" color="error" onClick={onDelete}>
            <DeleteIcon sx={{ fontSize: 14 }} />
          </IconButton>
        </>
      )}
    </Box>
  );
}

// ─── Main Editor ──────────────────────────────────────────────────────────────

export default function StyleTokenEditor({
  componentId,
  tokens: rawTokens,
}: StyleTokenEditorProps) {
  // Defensively normalise — handles old-format data surviving HMR / stale state
  const tokens = migrateStyleTokens(rawTokens);
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

  // ── Box Model helpers ─────────────────────────────────────────────────────

  const addBoxModel = () =>
    update((t) => ({
      ...t,
      boxModels: [
        ...t.boxModels,
        { id: nanoid(), label: `Box Model ${t.boxModels.length + 1}`, tokens: { ...defaultBoxModel } },
      ],
    }));

  const updateBoxModelGroup = (groupId: string, key: keyof BoxModelTokens, value: string) =>
    update((t) => ({
      ...t,
      boxModels: t.boxModels.map((g) =>
        g.id === groupId ? { ...g, tokens: { ...g.tokens, [key]: value } } : g,
      ),
    }));

  const renameBoxModel = (groupId: string, label: string) =>
    update((t) => ({
      ...t,
      boxModels: t.boxModels.map((g) => (g.id === groupId ? { ...g, label } : g)),
    }));

  const deleteBoxModel = (groupId: string) =>
    update((t) => ({ ...t, boxModels: t.boxModels.filter((g) => g.id !== groupId) }));

  // ── Typography helpers ────────────────────────────────────────────────────

  const addTypography = () =>
    update((t) => ({
      ...t,
      typographies: [
        ...t.typographies,
        { id: nanoid(), label: `Typography ${t.typographies.length + 1}`, tokens: { ...defaultTypography } },
      ],
    }));

  const updateTypographyGroup = (groupId: string, key: keyof TypographyTokens, value: string) =>
    update((t) => ({
      ...t,
      typographies: t.typographies.map((g) =>
        g.id === groupId ? { ...g, tokens: { ...g.tokens, [key]: value } } : g,
      ),
    }));

  const renameTypography = (groupId: string, label: string) =>
    update((t) => ({
      ...t,
      typographies: t.typographies.map((g) => (g.id === groupId ? { ...g, label } : g)),
    }));

  const deleteTypography = (groupId: string) =>
    update((t) => ({ ...t, typographies: t.typographies.filter((g) => g.id !== groupId) }));

  // ── Colour helpers ────────────────────────────────────────────────────────

  const addColour = () =>
    update((t) => ({
      ...t,
      colours: [
        ...t.colours,
        { id: nanoid(), label: `Color ${t.colours.length + 1}`, value: '' },
      ],
    }));

  const updateColour = (id: string, patch: Partial<ColourEntry>) =>
    update((t) => ({
      ...t,
      colours: t.colours.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    }));

  const deleteColour = (id: string) =>
    update((t) => ({ ...t, colours: t.colours.filter((c) => c.id !== id) }));

  // ── Shadows helper ────────────────────────────────────────────────────────

  const updateShadows = (key: keyof ShadowTokens, value: string) =>
    update((t) => ({ ...t, shadows: { ...t.shadows, [key]: value } }));

  // ── Custom helpers ────────────────────────────────────────────────────────

  const addCustomGroup = () =>
    update((t) => ({
      ...t,
      customs: [
        ...t.customs,
        { id: nanoid(), label: `Custom ${t.customs.length + 1}`, tokens: {} },
      ],
    }));

  const renameCustomGroup = (groupId: string, label: string) =>
    update((t) => ({
      ...t,
      customs: t.customs.map((g) => (g.id === groupId ? { ...g, label } : g)),
    }));

  const deleteCustomGroup = (groupId: string) =>
    update((t) => ({ ...t, customs: t.customs.filter((g) => g.id !== groupId) }));

  const addCustomProp = (groupId: string) =>
    update((t) => ({
      ...t,
      customs: t.customs.map((g) =>
        g.id === groupId
          ? { ...g, tokens: { ...g.tokens, [`prop-${Object.keys(g.tokens).length + 1}`]: '' } }
          : g,
      ),
    }));

  const updateCustomKey = (groupId: string, oldKey: string, newKey: string) =>
    update((t) => ({
      ...t,
      customs: t.customs.map((g) => {
        if (g.id !== groupId) return g;
        const { [oldKey]: value, ...rest } = g.tokens;
        return { ...g, tokens: { ...rest, [newKey]: value ?? '' } };
      }),
    }));

  const updateCustomValue = (groupId: string, key: string, value: string) =>
    update((t) => ({
      ...t,
      customs: t.customs.map((g) =>
        g.id === groupId ? { ...g, tokens: { ...g.tokens, [key]: value } } : g,
      ),
    }));

  const removeCustomProp = (groupId: string, key: string) =>
    update((t) => ({
      ...t,
      customs: t.customs.map((g) => {
        if (g.id !== groupId) return g;
        const { [key]: _, ...rest } = g.tokens;
        return { ...g, tokens: rest };
      }),
    }));

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
      {/* ── Box Model Groups ────────────────────────────────── */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, flex: 1 }}>
              Box Model
            </Typography>
            <Chip label={tokens.boxModels.length} size="small" sx={{ height: 20, fontSize: 11 }} />
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {tokens.boxModels.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', mb: 1 }}>
              No box model groups yet.
            </Typography>
          )}

          {tokens.boxModels.map((group) => (
            <Paper key={group.id} variant="outlined" sx={{ p: 2, mb: 2, borderRadius: 1.5 }}>
              <GroupHeader
                label={group.label}
                onRename={(l) => renameBoxModel(group.id, l)}
                onDelete={() => deleteBoxModel(group.id)}
              />
              <BoxModelFields
                tokens={group.tokens}
                onChange={(key, val) => updateBoxModelGroup(group.id, key, val)}
              />
            </Paper>
          ))}

          <Button size="small" startIcon={<AddIcon />} onClick={addBoxModel} sx={{ mt: 0.5 }}>
            Add Box Model Group
          </Button>
        </AccordionDetails>
      </Accordion>

      {/* ── Typography Groups ───────────────────────────────── */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, flex: 1 }}>
              Typography
            </Typography>
            <Chip label={tokens.typographies.length} size="small" sx={{ height: 20, fontSize: 11 }} />
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {tokens.typographies.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', mb: 1 }}>
              No typography groups yet.
            </Typography>
          )}

          {tokens.typographies.map((group) => (
            <Paper key={group.id} variant="outlined" sx={{ p: 2, mb: 2, borderRadius: 1.5 }}>
              <GroupHeader
                label={group.label}
                onRename={(l) => renameTypography(group.id, l)}
                onDelete={() => deleteTypography(group.id)}
              />
              <TypographyFields
                tokens={group.tokens}
                onChange={(key, val) => updateTypographyGroup(group.id, key, val)}
              />
            </Paper>
          ))}

          <Button size="small" startIcon={<AddIcon />} onClick={addTypography} sx={{ mt: 0.5 }}>
            Add Typography Group
          </Button>
        </AccordionDetails>
      </Accordion>

      {/* ── Colours (unlimited labelled entries) ────────────── */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, flex: 1 }}>
              Colours
            </Typography>
            <Chip label={tokens.colours.length} size="small" sx={{ height: 20, fontSize: 11 }} />
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {tokens.colours.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', mb: 1 }}>
              No colours added yet.
            </Typography>
          )}

          {tokens.colours.map((entry) => (
            <Box key={entry.id} sx={{ display: 'flex', gap: 1, mb: 1.5, alignItems: 'flex-start' }}>
              {/* Colour swatch / picker */}
              {entry.value && entry.value !== 'transparent' ? (
                <input
                  type="color"
                  value={entry.value.startsWith('#') ? entry.value : '#000000'}
                  onChange={(e) => updateColour(entry.id, { value: e.target.value })}
                  style={{
                    width: 40,
                    height: 40,
                    border: '1px solid',
                    borderColor: 'inherit',
                    borderRadius: 4,
                    cursor: 'pointer',
                    padding: 0,
                    background: 'none',
                    flexShrink: 0,
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
                    cursor: 'pointer',
                    backgroundImage: entry.value === 'transparent'
                      ? 'none'
                      : 'linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%), linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%)',
                    backgroundSize: '8px 8px',
                    backgroundPosition: '0 0, 4px 4px',
                    bgcolor: entry.value === 'transparent' ? 'transparent' : undefined,
                  }}
                  onClick={() => updateColour(entry.id, { value: '#000000' })}
                  title="Click to set color"
                />
              )}
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    size="small"
                    label="Label"
                    value={entry.label}
                    onChange={(e) => updateColour(entry.id, { label: e.target.value })}
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    size="small"
                    label="Value"
                    value={entry.value}
                    onChange={(e) => updateColour(entry.id, { value: e.target.value })}
                    placeholder="#000000 or rgba(...)"
                    sx={{ flex: 1 }}
                  />
                </Box>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  <Button
                    size="small"
                    variant="text"
                    sx={{ fontSize: 11, minWidth: 0, px: 0.75, py: 0.25, textTransform: 'none' }}
                    onClick={() => updateColour(entry.id, { value: '' })}
                  >
                    Clear
                  </Button>
                  <Button
                    size="small"
                    variant="text"
                    sx={{ fontSize: 11, minWidth: 0, px: 0.75, py: 0.25, textTransform: 'none' }}
                    onClick={() => updateColour(entry.id, { value: 'transparent' })}
                  >
                    Transparent
                  </Button>
                </Box>
              </Box>
              <IconButton size="small" color="error" onClick={() => deleteColour(entry.id)} sx={{ mt: 0.5 }}>
                <DeleteIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Box>
          ))}

          <Button size="small" startIcon={<AddIcon />} onClick={addColour} sx={{ mt: 0.5 }}>
            Add Colour
          </Button>
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

      {/* ── Custom Property Groups ──────────────────────────── */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, flex: 1 }}>
              Custom Properties
            </Typography>
            <Chip label={tokens.customs.length} size="small" sx={{ height: 20, fontSize: 11 }} />
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {tokens.customs.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', mb: 1 }}>
              No custom property groups yet.
            </Typography>
          )}

          {tokens.customs.map((group) => (
            <Paper key={group.id} variant="outlined" sx={{ p: 2, mb: 2, borderRadius: 1.5 }}>
              <GroupHeader
                label={group.label}
                onRename={(l) => renameCustomGroup(group.id, l)}
                onDelete={() => deleteCustomGroup(group.id)}
              />
              {Object.entries(group.tokens).map(([key, value]) => (
                <Box key={key} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
                  <TextField
                    size="small"
                    label="Property"
                    value={key}
                    onChange={(e) => updateCustomKey(group.id, key, e.target.value)}
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    size="small"
                    label="Value"
                    value={value}
                    onChange={(e) => updateCustomValue(group.id, key, e.target.value)}
                    sx={{ flex: 1 }}
                  />
                  <IconButton size="small" color="error" onClick={() => removeCustomProp(group.id, key)}>
                    <DeleteIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </Box>
              ))}
              <Button
                size="small"
                startIcon={<AddIcon />}
                onClick={() => addCustomProp(group.id)}
                sx={{ mt: 0.5 }}
              >
                Add Property
              </Button>
            </Paper>
          ))}

          <Button size="small" startIcon={<AddIcon />} onClick={addCustomGroup} sx={{ mt: 0.5 }}>
            Add Custom Group
          </Button>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

// ─── Box Model Fields Sub-Component ──────────────────────────────────────────

function BoxModelFields({
  tokens: bm,
  onChange,
}: {
  tokens: BoxModelTokens;
  onChange: (key: keyof BoxModelTokens, value: string) => void;
}) {
  return (
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
            value={bm[key]}
            onChange={(e) => onChange(key, e.target.value)}
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
            value={bm[key]}
            onChange={(e) => onChange(key, e.target.value)}
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
            value={bm[key]}
            onChange={(e) => onChange(key, e.target.value)}
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
          value={bm.borderRadius}
          onChange={(e) => onChange('borderRadius', e.target.value)}
          placeholder="e.g. 8px, 50%"
        />
      </Grid>
    </Grid>
  );
}

// ─── Typography Fields Sub-Component ─────────────────────────────────────────

function TypographyFields({
  tokens: ty,
  onChange,
}: {
  tokens: TypographyTokens;
  onChange: (key: keyof TypographyTokens, value: string) => void;
}) {
  return (
    <Grid container spacing={1.5}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          label="Font Family"
          size="small"
          fullWidth
          value={ty.fontFamily}
          onChange={(e) => onChange('fontFamily', e.target.value)}
          placeholder="e.g. Inter, sans-serif"
        />
      </Grid>
      <Grid size={{ xs: 6, sm: 3 }}>
        <FormControl size="small" fullWidth>
          <InputLabel>Weight</InputLabel>
          <Select
            label="Weight"
            value={ty.fontWeight}
            onChange={(e) => onChange('fontWeight', e.target.value as string)}
          >
            <MenuItem value="">—</MenuItem>
            {['100', '200', '300', '400', '500', '600', '700', '800', '900'].map((w) => (
              <MenuItem value={w} key={w}>{w}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 6, sm: 3 }}>
        <TextField
          label="Font Size"
          size="small"
          fullWidth
          value={ty.fontSize}
          onChange={(e) => onChange('fontSize', e.target.value)}
          placeholder="e.g. 16px, 1rem"
        />
      </Grid>
      <Grid size={{ xs: 6, sm: 4 }}>
        <TextField
          label="Line Height"
          size="small"
          fullWidth
          value={ty.lineHeight}
          onChange={(e) => onChange('lineHeight', e.target.value)}
          placeholder="e.g. 1.5, 24px"
        />
      </Grid>
      <Grid size={{ xs: 6, sm: 4 }}>
        <TextField
          label="Letter Spacing"
          size="small"
          fullWidth
          value={ty.letterSpacing}
          onChange={(e) => onChange('letterSpacing', e.target.value)}
          placeholder="e.g. 0.02em"
        />
      </Grid>
      <Grid size={{ xs: 6, sm: 4 }}>
        <FormControl size="small" fullWidth>
          <InputLabel>Text Transform</InputLabel>
          <Select
            label="Text Transform"
            value={ty.textTransform}
            onChange={(e) => onChange('textTransform', e.target.value as string)}
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
  );
}
