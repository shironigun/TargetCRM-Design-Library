// TargetCRM Design Library — Component Page (FR3, FR6, FR7)
// Dynamic page that shows/edits a single component definition.
// View Mode: read-only style guide. Edit Mode: full editing.

import { useState, useCallback, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  Paper,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Chip,
  Grid,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Code as CodeIcon,
  ExpandLess as ExpandLessIcon,
  ContentCopy as CopyIcon,
  Link as LinkIcon,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useApp } from '../store/AppContext';
import { useAppMode } from '../store/ModeContext';
import StyleTokenEditor from '../components/editor/StyleTokenEditor';
import VariantManager from '../components/editor/VariantManager';
import LivePreview from '../components/preview/LivePreview';
import type { StyleTokens } from '../types';

// ─── View Mode: Token Display Table ──────────────────────────────────────────

function TokenDisplayTable({ tokens }: { tokens: StyleTokens }) {
  const rows: { group: string; property: string; value: string }[] = [];

  // Box model
  Object.entries(tokens.boxModel).forEach(([k, v]) => {
    if (v) rows.push({ group: 'Box Model', property: k, value: v });
  });
  // Typography
  Object.entries(tokens.typography).forEach(([k, v]) => {
    if (v) rows.push({ group: 'Typography', property: k, value: v });
  });
  // Colours
  Object.entries(tokens.colours).forEach(([k, v]) => {
    if (v) rows.push({ group: 'Colours', property: k, value: v });
  });
  // Shadows
  Object.entries(tokens.shadows).forEach(([k, v]) => {
    if (v) rows.push({ group: 'Shadows', property: k, value: v });
  });
  // Custom
  Object.entries(tokens.custom).forEach(([k, v]) => {
    if (v) rows.push({ group: 'Custom', property: k, value: v });
  });

  if (rows.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
        No style tokens set.
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2, mb: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700, fontSize: 12 }}>Group</TableCell>
            <TableCell sx={{ fontWeight: 700, fontSize: 12 }}>Property</TableCell>
            <TableCell sx={{ fontWeight: 700, fontSize: 12 }}>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((r, i) => (
            <TableRow key={`${r.group}-${r.property}-${i}`}>
              <TableCell sx={{ fontSize: 12 }}>{r.group}</TableCell>
              <TableCell sx={{ fontFamily: 'monospace', fontSize: 12 }}>
                {r.property}
              </TableCell>
              <TableCell sx={{ fontFamily: 'monospace', fontSize: 12 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {(r.group === 'Colours' && r.value.startsWith('#')) && (
                    <Box
                      sx={{
                        width: 14,
                        height: 14,
                        borderRadius: '3px',
                        bgcolor: r.value,
                        border: '1px solid rgba(0,0,0,0.15)',
                        flexShrink: 0,
                      }}
                    />
                  )}
                  {r.value}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// ─── View Mode: Code Viewer ──────────────────────────────────────────────────

function CodeViewer({ source, language = 'jsx' }: { source: string; language?: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(source);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box>
      <Button
        size="small"
        variant="outlined"
        startIcon={open ? <ExpandLessIcon /> : <CodeIcon />}
        onClick={() => setOpen(!open)}
        sx={{ mb: 1 }}
      >
        {open ? 'Hide Code' : 'Show Code'}
      </Button>
      <Collapse in={open}>
        <Paper
          variant="outlined"
          sx={{ borderRadius: 2, overflow: 'hidden', position: 'relative' }}
        >
          <IconButton
            size="small"
            onClick={handleCopy}
            aria-label="Copy code"
            sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
          >
            {copied ? (
              <Typography variant="caption" sx={{ fontSize: 11, fontWeight: 600, color: 'success.main' }}>
                Copied!
              </Typography>
            ) : (
              <CopyIcon sx={{ fontSize: 16 }} />
            )}
          </IconButton>
          <SyntaxHighlighter
            language={language}
            style={oneLight}
            customStyle={{
              margin: 0,
              padding: 16,
              fontSize: 13,
              borderRadius: 0,
            }}
          >
            {source}
          </SyntaxHighlighter>
        </Paper>
      </Collapse>
    </Box>
  );
}

// ─── Main Component Page ─────────────────────────────────────────────────────

export default function ComponentPage() {
  const { componentId } = useParams<{ componentId: string }>();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const { isEdit } = useAppMode();
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const component = componentId ? state.components[componentId] : undefined;

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    component?.variants[0]?.id ?? null,
  );

  const selectedVariant = useMemo(
    () => component?.variants.find((v) => v.id === selectedVariantId) ?? null,
    [component, selectedVariantId],
  );

  const handleSelectVariant = useCallback((id: string | null) => {
    setSelectedVariantId(id);
    dispatch({ type: 'SELECT_VARIANT', payload: { id } });
  }, [dispatch]);

  // Check if sidebar links to this component
  const linkedItem = state.sidebarItems.find((i) => i.componentId === componentId);

  if (!component) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          Component not found
        </Typography>
        <Button sx={{ mt: 2 }} variant="outlined" onClick={() => navigate('/')}>
          Go Home
        </Button>
      </Box>
    );
  }

  const handleDelete = () => {
    dispatch({ type: 'DELETE_COMPONENT', payload: { id: component.id } });
    navigate('/');
  };

  // ═══════════════════════════════════════════════════════════
  // EDIT MODE
  // ═══════════════════════════════════════════════════════════
  if (isEdit) {
    return (
      <Box>
        {/* Name & Description */}
        <Box sx={{ mb: 3 }}>
          <TextField
            variant="standard"
            value={component.name}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_COMPONENT',
                payload: { id: component.id, name: e.target.value },
              })
            }
            inputProps={{ style: { fontSize: 28, fontWeight: 800 } }}
            fullWidth
            placeholder="Component Name"
            sx={{ mb: 1 }}
          />
          <TextField
            variant="outlined"
            multiline
            minRows={2}
            maxRows={4}
            value={component.description}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_COMPONENT',
                payload: { id: component.id, description: e.target.value },
              })
            }
            fullWidth
            placeholder="Component description..."
            size="small"
          />
        </Box>

        {/* Sidebar link indicator */}
        {linkedItem ? (
          <Chip
            icon={<LinkIcon />}
            label={`Linked to nav: "${linkedItem.label}"`}
            size="small"
            color="info"
            variant="outlined"
            sx={{ mb: 2 }}
          />
        ) : (
          <Chip
            label="Not linked to navigation"
            size="small"
            variant="outlined"
            sx={{ mb: 2, borderStyle: 'dashed' }}
          />
        )}

        {/* Two-column layout: Tokens left, Preview right */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, lg: 5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
              Style Tokens
            </Typography>
            <StyleTokenEditor
              componentId={component.id}
              tokens={component.styleTokens}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 7 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
              Preview
            </Typography>
            {selectedVariant ? (
              <LivePreview
                variant={selectedVariant}
                styleTokens={component.styleTokens}
              />
            ) : (
              <Paper
                variant="outlined"
                sx={{
                  p: 4,
                  textAlign: 'center',
                  borderStyle: 'dashed',
                  borderRadius: 2,
                  minHeight: 120,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Select or add a variant to see a preview
                </Typography>
              </Paper>
            )}
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Variant Manager */}
        <VariantManager
          componentId={component.id}
          variants={component.variants}
          selectedVariantId={selectedVariantId}
          onSelectVariant={handleSelectVariant}
          isEdit
        />

        <Divider sx={{ my: 3 }} />

        {/* Delete Component */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => setDeleteConfirm(true)}
          >
            Delete Component
          </Button>
        </Box>

        {/* Delete Confirmation */}
        <Dialog open={deleteConfirm} onClose={() => setDeleteConfirm(false)}>
          <DialogTitle>Delete &ldquo;{component.name}&rdquo;?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This will permanently delete this component, all its variants, and
              unlink it from any sidebar items. This cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteConfirm(false)}>Cancel</Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }

  // ═══════════════════════════════════════════════════════════
  // VIEW MODE (FR7)
  // ═══════════════════════════════════════════════════════════
  return (
    <Box>
      {/* Header */}
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
        {component.name}
      </Typography>
      {component.description && (
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {component.description}
        </Typography>
      )}

      {/* Variant selector */}
      <VariantManager
        componentId={component.id}
        variants={component.variants}
        selectedVariantId={selectedVariantId}
        onSelectVariant={handleSelectVariant}
        isEdit={false}
      />

      {/* Variant details */}
      {component.variants.length > 0 && (
        <Box sx={{ mt: 3 }}>
          {/* Shared token table — shown once for the component */}
          <Paper variant="outlined" sx={{ p: 3, mb: 3, borderRadius: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              Style Tokens
            </Typography>
            <TokenDisplayTable tokens={component.styleTokens} />
          </Paper>

          {(selectedVariant ? [selectedVariant] : component.variants).map((v) => (
            <Paper
              key={v.id}
              variant="outlined"
              sx={{ p: 3, mb: 3, borderRadius: 2 }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                {v.name}
                <Chip
                  label={v.type.toUpperCase()}
                  size="small"
                  variant="outlined"
                  sx={{ ml: 1, fontSize: 11 }}
                />
              </Typography>

              {/* Live Preview */}
              <Box sx={{ mb: 2 }}>
                <LivePreview variant={v} styleTokens={component.styleTokens} />
              </Box>

              {/* Code Viewer */}
              <CodeViewer source={v.source} />
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
}
