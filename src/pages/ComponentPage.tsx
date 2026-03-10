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
  Collapse,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Chip,
  Grid,
  Tabs,
  Tab,
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

// ─── View Mode: Box Model Diagram (Chrome DevTools style) ────────────────────

function BoxModelDiagram({ tokens }: { tokens: StyleTokens }) {
  const { boxModel: bm } = tokens;
  const hasMargin = bm.marginTop || bm.marginRight || bm.marginBottom || bm.marginLeft;
  const hasPadding = bm.paddingTop || bm.paddingRight || bm.paddingBottom || bm.paddingLeft;
  const hasDims = bm.width || bm.height || bm.minWidth || bm.maxWidth || bm.minHeight || bm.maxHeight || bm.borderRadius;

  if (!hasMargin && !hasPadding && !hasDims) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
        No box model tokens set.
      </Typography>
    );
  }

  const val = (v: string) => v || '\u2013';
  const cellSx = {
    fontFamily: 'monospace',
    fontSize: 11,
    textAlign: 'center' as const,
    lineHeight: 1.2,
    color: 'text.primary',
    minWidth: 28,
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {/* Box model diagram */}
      <Box sx={{ display: 'inline-flex', justifyContent: 'center' }}>
        {/* Margin layer */}
        <Box
          sx={{
            border: '1px dashed',
            borderColor: '#f9cc9d',
            bgcolor: 'rgba(249,204,157,0.15)',
            p: 0,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ ...cellSx, fontSize: 10, color: '#b07730', position: 'absolute', top: 2, left: 4 }}>
            margin
          </Typography>
          <Box sx={cellSx}>{val(bm.marginTop)}</Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ ...cellSx, px: 1 }}>{val(bm.marginLeft)}</Box>
            {/* Padding layer */}
            <Box
              sx={{
                border: '1px dashed',
                borderColor: '#b4d6a5',
                bgcolor: 'rgba(180,214,165,0.15)',
                p: 0,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: 140,
              }}
            >
              <Typography sx={{ ...cellSx, fontSize: 10, color: '#558040', position: 'absolute', top: 2, left: 4 }}>
                padding
              </Typography>
              <Box sx={cellSx}>{val(bm.paddingTop)}</Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ ...cellSx, px: 1 }}>{val(bm.paddingLeft)}</Box>
                {/* Element core */}
                <Box
                  sx={{
                    border: '1px solid',
                    borderColor: '#7ab9db',
                    bgcolor: 'rgba(122,185,219,0.15)',
                    px: 2,
                    py: 1.5,
                    minWidth: 80,
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0.25,
                  }}
                >
                  <Typography sx={{ fontFamily: 'monospace', fontSize: 11 }}>
                    {bm.width || 'auto'} &times; {bm.height || 'auto'}
                  </Typography>
                  {bm.borderRadius && (
                    <Typography sx={{ fontFamily: 'monospace', fontSize: 10, color: 'text.secondary' }}>
                      r: {bm.borderRadius}
                    </Typography>
                  )}
                </Box>
                <Box sx={{ ...cellSx, px: 1 }}>{val(bm.paddingRight)}</Box>
              </Box>
              <Box sx={cellSx}>{val(bm.paddingBottom)}</Box>
            </Box>
            <Box sx={{ ...cellSx, px: 1 }}>{val(bm.marginRight)}</Box>
          </Box>
          <Box sx={cellSx}>{val(bm.marginBottom)}</Box>
        </Box>
      </Box>

      {/* Min/Max dimensions */}
      {(bm.minWidth || bm.maxWidth || bm.minHeight || bm.maxHeight) && (
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 0.5 }}>
          {bm.minWidth && (
            <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
              min-w: {bm.minWidth}
            </Typography>
          )}
          {bm.maxWidth && (
            <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
              max-w: {bm.maxWidth}
            </Typography>
          )}
          {bm.minHeight && (
            <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
              min-h: {bm.minHeight}
            </Typography>
          )}
          {bm.maxHeight && (
            <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
              max-h: {bm.maxHeight}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}

// ─── View Mode: Categorized Token Display ────────────────────────────────────

function TokenCategorySection({ title, children, empty }: { title: string; children: React.ReactNode; empty?: boolean }) {
  if (empty) return null;
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5, color: 'text.secondary', mb: 1 }}>
        {title}
      </Typography>
      {children}
    </Box>
  );
}

function TokenDisplayCategorized({ tokens }: { tokens: StyleTokens }) {
  const { boxModel: bm, typography: ty, colours: co, shadows: sh, custom } = tokens;

  const hasBox = Object.values(bm).some(Boolean);
  const hasTypo = Object.values(ty).some(Boolean);
  const hasColour = Object.values(co).some(Boolean);
  const hasShadow = sh.boxShadow && sh.boxShadow !== 'none';
  const hasCustom = Object.entries(custom).some(([, v]) => !!v);

  if (!hasBox && !hasTypo && !hasColour && !hasShadow && !hasCustom) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
        No style tokens set.
      </Typography>
    );
  }

  return (
    <Box>
      {/* Box Model — visual diagram */}
      <TokenCategorySection title="Box Model" empty={!hasBox}>
        <BoxModelDiagram tokens={tokens} />
      </TokenCategorySection>

      {/* Typography */}
      <TokenCategorySection title="Typography" empty={!hasTypo}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {ty.fontFamily && (
            <Chip size="small" variant="outlined" label={`family: ${ty.fontFamily}`} sx={{ fontFamily: 'monospace', fontSize: 11 }} />
          )}
          {ty.fontWeight && (
            <Chip size="small" variant="outlined" label={`weight: ${ty.fontWeight}`} sx={{ fontFamily: 'monospace', fontSize: 11 }} />
          )}
          {ty.fontSize && (
            <Chip size="small" variant="outlined" label={`size: ${ty.fontSize}`} sx={{ fontFamily: 'monospace', fontSize: 11 }} />
          )}
          {ty.lineHeight && (
            <Chip size="small" variant="outlined" label={`line-height: ${ty.lineHeight}`} sx={{ fontFamily: 'monospace', fontSize: 11 }} />
          )}
          {ty.letterSpacing && (
            <Chip size="small" variant="outlined" label={`letter-spacing: ${ty.letterSpacing}`} sx={{ fontFamily: 'monospace', fontSize: 11 }} />
          )}
          {ty.textTransform && (
            <Chip size="small" variant="outlined" label={`transform: ${ty.textTransform}`} sx={{ fontFamily: 'monospace', fontSize: 11 }} />
          )}
        </Box>
      </TokenCategorySection>

      {/* Colours */}
      <TokenCategorySection title="Colours" empty={!hasColour}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {(
            [
              ['background', 'Background', co.background],
              ['color', 'Text', co.color],
              ['borderColor', 'Border', co.borderColor],
            ] as [string, string, string][]
          )
            .filter(([, , v]) => !!v)
            .map(([key, label, value]) => (
              <Box key={key} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: 1,
                    bgcolor: value,
                    border: '1px solid rgba(0,0,0,0.15)',
                    flexShrink: 0,
                  }}
                />
                <Box>
                  <Typography variant="caption" sx={{ display: 'block', fontWeight: 600, lineHeight: 1.2 }}>
                    {label}
                  </Typography>
                  <Typography variant="caption" sx={{ fontFamily: 'monospace', fontSize: 11 }}>
                    {value}
                  </Typography>
                </Box>
              </Box>
            ))}
        </Box>
      </TokenCategorySection>

      {/* Shadows */}
      <TokenCategorySection title="Shadows" empty={!hasShadow}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 60,
              height: 40,
              borderRadius: 1,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: sh.boxShadow,
            }}
          />
          <Typography variant="caption" sx={{ fontFamily: 'monospace', fontSize: 11 }}>
            {sh.boxShadow}
          </Typography>
        </Box>
      </TokenCategorySection>

      {/* Custom */}
      <TokenCategorySection title="Custom Properties" empty={!hasCustom}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {Object.entries(custom)
            .filter(([, v]) => !!v)
            .map(([k, v]) => (
              <Chip
                key={k}
                size="small"
                variant="outlined"
                label={`${k}: ${v}`}
                sx={{ fontFamily: 'monospace', fontSize: 11 }}
              />
            ))}
        </Box>
      </TokenCategorySection>
    </Box>
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
            {component.variants.length > 0 ? (
              <Box>
                <Tabs
                  value={Math.max(0, component.variants.findIndex((v) => v.id === selectedVariantId))}
                  onChange={(_, idx) => handleSelectVariant(component.variants[idx]?.id ?? null)}
                  variant="scrollable"
                  scrollButtons="auto"
                  sx={{ borderBottom: 1, borderColor: 'divider', mb: 2, minHeight: 36 }}
                >
                  {component.variants.map((v) => (
                    <Tab
                      key={v.id}
                      label={v.name}
                      sx={{ textTransform: 'none', fontSize: 13, minHeight: 36, py: 0.5 }}
                    />
                  ))}
                </Tabs>
                {selectedVariant && <LivePreview variant={selectedVariant} />}
              </Box>
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
                  Add a variant below to see a preview
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

  const activeVariant = selectedVariant ?? component.variants[0] ?? null;
  const activeTabIndex = Math.max(
    0,
    component.variants.findIndex((v) => v.id === (activeVariant?.id ?? '')),
  );

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

      {/* Style Tokens */}
      <Paper variant="outlined" sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
          Style Tokens
        </Typography>
        <TokenDisplayCategorized tokens={component.styleTokens} />
      </Paper>

      {/* Tabbed Variants (MUI-docs style) */}
      {component.variants.length > 0 ? (
        <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
          {/* Variant tabs */}
          <Tabs
            value={activeTabIndex}
            onChange={(_, idx) => handleSelectVariant(component.variants[idx]?.id ?? null)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              bgcolor: 'grey.50',
              borderBottom: 1,
              borderColor: 'divider',
              minHeight: 42,
              '& .MuiTab-root': { textTransform: 'none', fontSize: 14, fontWeight: 600, minHeight: 42 },
            }}
          >
            {component.variants.map((v) => (
              <Tab
                key={v.id}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {v.name}
                    <Chip
                      label={v.type.toUpperCase()}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: 10, height: 18, pointerEvents: 'none' }}
                    />
                  </Box>
                }
              />
            ))}
          </Tabs>

          {/* Active variant panel */}
          {activeVariant && (
            <Box sx={{ p: 3 }}>
              {/* Live Preview */}
              <Box sx={{ mb: 2 }}>
                <LivePreview variant={activeVariant} />
              </Box>

              {/* Code Viewer */}
              <CodeViewer source={activeVariant.source} />
            </Box>
          )}
        </Paper>
      ) : (
        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', mt: 2 }}>
          No variants defined for this component.
        </Typography>
      )}
    </Box>
  );
}
