// TargetCRM Design Library — Variant Manager (FR5)
// Add/edit/delete SVG and Code variants for a component.

import { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Chip,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Image as SvgIcon,
  Code as CodeIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { nanoid } from 'nanoid';
import { useApp } from '../../store/AppContext';
import type { Variant } from '../../types';

interface VariantManagerProps {
  componentId: string;
  variants: Variant[];
  selectedVariantId: string | null;
  onSelectVariant: (id: string | null) => void;
  isEdit: boolean;
}

// ─── SVG → SVGR conversion (runtime) ─────────────────────────────────────────

/** Convert raw SVG markup into a JSX function component string (browser-safe, no Node deps). */
function convertSvgToReact(svgString: string, name: string): string {
  const cleanName = name.replace(/[^a-zA-Z0-9]/g, '') || 'SvgComponent';

  // Sanitise SVG: strip XML processing instructions, DOCTYPE, and HTML comments
  let sanitised = svgString
    .replace(/<\?xml[^?]*\?>/gi, '')
    .replace(/<!DOCTYPE[^>]*>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .trim();

  // Escape curly braces inside <style> blocks so JSX doesn't interpret them
  sanitised = sanitised.replace(
    /(<style[^>]*>)([\s\S]*?)(<\/style>)/gi,
    (_m, open: string, body: string, close: string) =>
      `${open}{\`${body.replace(/`/g, '\\`')}\`}${close}`,
  );

  // Convert SVG attributes to JSX camelCase equivalents
  let jsx = sanitised
    // HTML attr → JSX attr
    .replace(/\bclass=/g, 'className=')
    .replace(/\bfill-rule=/g, 'fillRule=')
    .replace(/\bclip-rule=/g, 'clipRule=')
    .replace(/\bclip-path=/g, 'clipPath=')
    .replace(/\bstroke-width=/g, 'strokeWidth=')
    .replace(/\bstroke-linecap=/g, 'strokeLinecap=')
    .replace(/\bstroke-linejoin=/g, 'strokeLinejoin=')
    .replace(/\bstroke-dasharray=/g, 'strokeDasharray=')
    .replace(/\bstroke-dashoffset=/g, 'strokeDashoffset=')
    .replace(/\bstroke-miterlimit=/g, 'strokeMiterlimit=')
    .replace(/\bstroke-opacity=/g, 'strokeOpacity=')
    .replace(/\bfill-opacity=/g, 'fillOpacity=')
    .replace(/\bfont-family=/g, 'fontFamily=')
    .replace(/\bfont-size=/g, 'fontSize=')
    .replace(/\bfont-weight=/g, 'fontWeight=')
    .replace(/\btext-anchor=/g, 'textAnchor=')
    .replace(/\btext-decoration=/g, 'textDecoration=')
    .replace(/\bdominant-baseline=/g, 'dominantBaseline=')
    .replace(/\balignment-baseline=/g, 'alignmentBaseline=')
    .replace(/\bstop-color=/g, 'stopColor=')
    .replace(/\bstop-opacity=/g, 'stopOpacity=')
    .replace(/\bcolor-interpolation=/g, 'colorInterpolation=')
    .replace(/\bcolor-interpolation-filters=/g, 'colorInterpolationFilters=')
    .replace(/\bflood-color=/g, 'floodColor=')
    .replace(/\bflood-opacity=/g, 'floodOpacity=')
    .replace(/\blighting-color=/g, 'lightingColor=')
    .replace(/\bxlink:href=/g, 'xlinkHref=')
    .replace(/\bxml:space=/g, 'xmlSpace=')
    // Remove xmlns:xlink (not valid in JSX)
    .replace(/\s+xmlns:xlink="[^"]*"/g, '');

  // Spread props onto the root <svg> element
  jsx = jsx.replace(/^(<svg)(\s)/, '$1 {...props}$2');
  if (!jsx.includes('{...props}')) {
    jsx = jsx.replace('<svg', '<svg {...props}');
  }

  return `function ${cleanName}(props) {\n  return (\n    ${jsx}\n  );\n}`;
}

// ─── JSX Validation ───────────────────────────────────────────────────────────

async function validateJsx(source: string): Promise<string | null> {
  try {
    const babel = await import('@babel/standalone');
    babel.transform(source, { presets: ['react', 'typescript'], filename: 'test.tsx' });
    return null; // valid
  } catch (err) {
    return err instanceof Error ? err.message : String(err);
  }
}

// Allowed import prefixes
const ALLOWED_PREFIXES = [
  'react',
  '@mui/',
  '@syncfusion/',
  '@emotion/',
  'maui',
];

function checkImports(source: string): string | null {
  const importRegex = /import\s+.*?\s+from\s+['"]([^'"]+)['"]/g;
  let match;
  while ((match = importRegex.exec(source)) !== null) {
    const mod = match[1];
    const allowed = mod === 'react' || ALLOWED_PREFIXES.some((p) => mod.startsWith(p));
    if (!allowed) {
      return `Import from "${mod}" is not allowed. Allowed: react, @mui/*, @syncfusion/*, @emotion/*, maui*`;
    }
  }
  return null;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function VariantManager({
  componentId,
  variants,
  selectedVariantId,
  onSelectVariant,
  isEdit,
}: VariantManagerProps) {
  const { dispatch } = useApp();

  // SVG dialog state
  const [svgDialogOpen, setSvgDialogOpen] = useState(false);
  const [svgName, setSvgName] = useState('');
  const [svgContent, setSvgContent] = useState('');
  const [svgConverting, setSvgConverting] = useState(false);
  const [svgError, setSvgError] = useState<string | null>(null);

  // Code dialog state
  const [codeDialogOpen, setCodeDialogOpen] = useState(false);
  const [codeName, setCodeName] = useState('');
  const [codeSource, setCodeSource] = useState('');
  const [codeError, setCodeError] = useState<string | null>(null);

  // Edit dialog state
  const [editingVariant, setEditingVariant] = useState<Variant | null>(null);
  const [editName, setEditName] = useState('');
  const [editSource, setEditSource] = useState('');
  const [editError, setEditError] = useState<string | null>(null);
  const [editTab, setEditTab] = useState(0);

  // ── SVG Upload Handler ──────────────────────────────────────

  const handleSvgFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result as string;
      setSvgContent(content);
      setSvgName(file.name.replace(/\.svg$/i, ''));
      setSvgError(null);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleSvgSubmit = useCallback(async () => {
    if (!svgContent.trim()) {
      setSvgError('Please upload an SVG file');
      return;
    }
    if (!svgName.trim()) {
      setSvgError('Please provide a name');
      return;
    }

    setSvgConverting(true);
    setSvgError(null);
    try {
      const svgrOutput = convertSvgToReact(svgContent, svgName);
      const variant: Variant = {
        id: nanoid(),
        name: svgName.trim(),
        type: 'svg',
        source: svgrOutput,
        svgOriginal: svgContent,
      };
      dispatch({ type: 'ADD_VARIANT', payload: { componentId, variant } });
      onSelectVariant(variant.id);
      setSvgDialogOpen(false);
      setSvgName('');
      setSvgContent('');
    } catch (err) {
      setSvgError(err instanceof Error ? err.message : 'SVG conversion failed');
    } finally {
      setSvgConverting(false);
    }
  }, [svgContent, svgName, componentId, dispatch, onSelectVariant]);

  // ── Code Submit Handler ─────────────────────────────────────

  const handleCodeSubmit = useCallback(async () => {
    if (!codeSource.trim()) {
      setCodeError('Please provide code');
      return;
    }
    if (!codeName.trim()) {
      setCodeError('Please provide a name');
      return;
    }

    const importErr = checkImports(codeSource);
    if (importErr) {
      setCodeError(importErr);
      return;
    }

    const syntaxErr = await validateJsx(codeSource);
    if (syntaxErr) {
      setCodeError(syntaxErr);
      return;
    }

    const variant: Variant = {
      id: nanoid(),
      name: codeName.trim(),
      type: 'code',
      source: codeSource,
    };
    dispatch({ type: 'ADD_VARIANT', payload: { componentId, variant } });
    onSelectVariant(variant.id);
    setCodeDialogOpen(false);
    setCodeName('');
    setCodeSource('');
    setCodeError(null);
  }, [codeSource, codeName, componentId, dispatch, onSelectVariant]);

  // ── Edit handler ────────────────────────────────────────────

  const handleEditSave = useCallback(async () => {
    if (!editingVariant) return;

    if (editingVariant.type === 'code') {
      const importErr = checkImports(editSource);
      if (importErr) {
        setEditError(importErr);
        return;
      }
      const syntaxErr = await validateJsx(editSource);
      if (syntaxErr) {
        setEditError(syntaxErr);
        return;
      }
    }

    const updated: Variant = {
      ...editingVariant,
      name: editName.trim() || editingVariant.name,
      source: editSource,
    };
    dispatch({ type: 'UPDATE_VARIANT', payload: { componentId, variant: updated } });
    setEditingVariant(null);
    setEditError(null);
  }, [editingVariant, editName, editSource, componentId, dispatch]);

  // ── Delete handler ──────────────────────────────────────────

  const handleDelete = useCallback(
    (variantId: string) => {
      dispatch({
        type: 'DELETE_VARIANT',
        payload: { componentId, variantId },
      });
      if (selectedVariantId === variantId) {
        onSelectVariant(variants.length > 1 ? variants.find((v) => v.id !== variantId)?.id ?? null : null);
      }
    },
    [dispatch, componentId, selectedVariantId, onSelectVariant, variants],
  );

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Variants ({variants.length})
        </Typography>
        {isEdit && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              size="small"
              variant="outlined"
              startIcon={<SvgIcon />}
              onClick={() => {
                setSvgDialogOpen(true);
                setSvgError(null);
              }}
            >
              Add SVG
            </Button>
            <Button
              size="small"
              variant="outlined"
              startIcon={<CodeIcon />}
              onClick={() => {
                setCodeDialogOpen(true);
                setCodeError(null);
              }}
            >
              Add Code
            </Button>
          </Box>
        )}
      </Box>

      {/* Variant list */}
      {variants.length === 0 ? (
        <Paper
          variant="outlined"
          sx={{
            p: 3,
            textAlign: 'center',
            borderStyle: 'dashed',
            borderRadius: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            No variants yet.{' '}
            {isEdit ? 'Add an SVG or code snippet to get started.' : ''}
          </Typography>
        </Paper>
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
          {variants.map((v) => (
            <Box key={v.id} sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.25 }}>
              <Chip
                label={v.name}
                icon={v.type === 'svg' ? <SvgIcon /> : <CodeIcon />}
                variant={selectedVariantId === v.id ? 'filled' : 'outlined'}
                color={selectedVariantId === v.id ? 'primary' : 'default'}
                onClick={() => onSelectVariant(v.id)}
                onDelete={
                  isEdit
                    ? () => handleDelete(v.id)
                    : undefined
                }
                deleteIcon={<DeleteIcon />}
                sx={{ cursor: 'pointer' }}
              />
              {isEdit && selectedVariantId === v.id && (
                <IconButton
                  size="small"
                  onClick={() => {
                    setEditingVariant(v);
                    setEditName(v.name);
                    setEditSource(v.source);
                    setEditError(null);
                    setEditTab(0);
                  }}
                  aria-label={`Edit ${v.name}`}
                  sx={{ ml: 0.25 }}
                >
                  <EditIcon sx={{ fontSize: 16 }} />
                </IconButton>
              )}
            </Box>
          ))}
        </Box>
      )}

      {/* ═══ SVG Upload Dialog ═══════════════════════════════════ */}
      <Dialog
        open={svgDialogOpen}
        onClose={() => setSvgDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add SVG Variant</DialogTitle>
        <DialogContent>
          <TextField
            label="Variant Name"
            size="small"
            fullWidth
            value={svgName}
            onChange={(e) => setSvgName(e.target.value)}
            sx={{ mb: 2, mt: 1 }}
          />

          <Button variant="outlined" component="label" fullWidth sx={{ mb: 2 }}>
            {svgContent ? 'Replace SVG File' : 'Upload SVG File'}
            <input
              type="file"
              accept=".svg"
              hidden
              onChange={handleSvgFileChange}
            />
          </Button>

          {svgContent && (
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                maxHeight: 200,
                overflow: 'auto',
                mb: 2,
                bgcolor: '#f5f5f5',
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontFamily: 'monospace', fontSize: 11, whiteSpace: 'pre-wrap' }}
              >
                {svgContent.slice(0, 2000)}
                {svgContent.length > 2000 && '...'}
              </Typography>
            </Paper>
          )}

          {svgError && (
            <Alert severity="error" sx={{ mb: 1 }}>
              {svgError}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSvgDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSvgSubmit}
            disabled={svgConverting || !svgContent}
          >
            {svgConverting ? 'Converting...' : 'Add Variant'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ═══ Code Snippet Dialog ═════════════════════════════════ */}
      <Dialog
        open={codeDialogOpen}
        onClose={() => setCodeDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Add Code Variant</DialogTitle>
        <DialogContent>
          <TextField
            label="Variant Name"
            size="small"
            fullWidth
            value={codeName}
            onChange={(e) => setCodeName(e.target.value)}
            sx={{ mb: 2, mt: 1 }}
          />

          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Paste JSX/TSX code. Allowed imports: react, @mui/material, @mui/icons-material
          </Typography>

          <TextField
            multiline
            minRows={10}
            maxRows={25}
            fullWidth
            value={codeSource}
            onChange={(e) => {
              setCodeSource(e.target.value);
              setCodeError(null);
            }}
            placeholder={`import { Button } from '@mui/material';\n\n<Button variant="contained">Hello</Button>`}
            sx={{
              fontFamily: 'monospace',
              '& textarea': { fontFamily: 'monospace', fontSize: 13 },
            }}
          />

          {codeError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {codeError}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCodeDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleCodeSubmit}
            disabled={!codeSource.trim()}
          >
            Add Variant
          </Button>
        </DialogActions>
      </Dialog>

      {/* ═══ Edit Variant Dialog ═════════════════════════════════ */}
      <Dialog
        open={!!editingVariant}
        onClose={() => setEditingVariant(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Edit Variant: {editingVariant?.name}
        </DialogTitle>
        <DialogContent>
          <Tabs value={editTab} onChange={(_, v) => setEditTab(v)} sx={{ mb: 2 }}>
            <Tab label="Name" />
            <Tab label="Source" />
          </Tabs>

          {editTab === 0 && (
            <TextField
              label="Variant Name"
              size="small"
              fullWidth
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
          )}

          {editTab === 1 && (
            <TextField
              multiline
              minRows={10}
              maxRows={25}
              fullWidth
              value={editSource}
              onChange={(e) => {
                setEditSource(e.target.value);
                setEditError(null);
              }}
              sx={{
                fontFamily: 'monospace',
                '& textarea': { fontFamily: 'monospace', fontSize: 13 },
              }}
            />
          )}

          {editError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {editError}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditingVariant(null)} startIcon={<CloseIcon />}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleEditSave}
            startIcon={<CheckIcon />}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
