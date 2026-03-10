// TargetCRM Design Library — Live Preview (FR6)
// Renders a variant with style tokens applied in real time.
// Code variants: transpiled via @babel/standalone + evaluated via new Function()
// SVG variants: SVGR-converted React component or raw SVG with resizer

import { useMemo, useState } from 'react';
import { Box, Paper, Alert, ToggleButtonGroup, ToggleButton, Typography } from '@mui/material';
import {
  Code as CodeIcon,
  Image as ImageIcon,
} from '@mui/icons-material';
import * as React from 'react';
import * as MuiMaterial from '@mui/material';
import * as MuiIcons from '@mui/icons-material';
import { transform } from '@babel/standalone';
import SvgResizer from './SvgResizer';
import type { Variant, StyleTokens } from '../../types';

interface LivePreviewProps {
  variant: Variant;
  styleTokens: StyleTokens;
}

/** Build a flat CSS style object from StyleTokens (non-empty values only) */
function tokensToStyle(tokens: StyleTokens): React.CSSProperties {
  const s: Record<string, string> = {};
  const { boxModel: bm, typography: ty, colours: co, shadows: sh, custom } = tokens;

  // Box model
  if (bm.width) s.width = bm.width;
  if (bm.height) s.height = bm.height;
  if (bm.minWidth) s.minWidth = bm.minWidth;
  if (bm.maxWidth) s.maxWidth = bm.maxWidth;
  if (bm.minHeight) s.minHeight = bm.minHeight;
  if (bm.maxHeight) s.maxHeight = bm.maxHeight;
  if (bm.marginTop) s.marginTop = bm.marginTop;
  if (bm.marginRight) s.marginRight = bm.marginRight;
  if (bm.marginBottom) s.marginBottom = bm.marginBottom;
  if (bm.marginLeft) s.marginLeft = bm.marginLeft;
  if (bm.paddingTop) s.paddingTop = bm.paddingTop;
  if (bm.paddingRight) s.paddingRight = bm.paddingRight;
  if (bm.paddingBottom) s.paddingBottom = bm.paddingBottom;
  if (bm.paddingLeft) s.paddingLeft = bm.paddingLeft;
  if (bm.borderRadius) s.borderRadius = bm.borderRadius;

  // Typography
  if (ty.fontFamily) s.fontFamily = ty.fontFamily;
  if (ty.fontWeight) s.fontWeight = ty.fontWeight;
  if (ty.fontSize) s.fontSize = ty.fontSize;
  if (ty.lineHeight) s.lineHeight = ty.lineHeight;
  if (ty.letterSpacing) s.letterSpacing = ty.letterSpacing;
  if (ty.textTransform) s.textTransform = ty.textTransform;

  // Colours
  if (co.background) s.backgroundColor = co.background;
  if (co.color) s.color = co.color;
  if (co.borderColor) {
    s.borderColor = co.borderColor;
    s.borderStyle = 'solid';
    s.borderWidth = '1px';
  }

  // Shadows
  if (sh.boxShadow && sh.boxShadow !== 'none') s.boxShadow = sh.boxShadow;

  // Custom
  Object.entries(custom).forEach(([k, v]) => {
    if (v) s[k] = v;
  });

  return s as React.CSSProperties;
}

/** Allowed import prefixes for live evaluation */
const ALLOWED_PREFIXES = ['react', '@mui/', '@syncfusion/', '@emotion/', 'maui'];

/** Exact-match registry of modules we can actually provide at runtime */
const RUNTIME_MODULES: Record<string, unknown> = {
  react: React,
  React: React,
  '@mui/material': MuiMaterial,
  '@mui/icons-material': MuiIcons,
};

/** Resolve a module path to a runtime object.
 *  - Exact matches (e.g. '@mui/material') → return the module
 *  - Subpath matches (e.g. '@mui/material/Button') → return parent module
 *  - Allowed but not available at runtime (syncfusion, maui) → return empty stub
 */
function resolveImport(modulePath: string): { mod: unknown; strip: boolean } | null {
  // Exact match first
  if (RUNTIME_MODULES[modulePath]) {
    return { mod: RUNTIME_MODULES[modulePath], strip: false };
  }
  // Subpath: try parent package  (e.g. '@mui/material/Button' → '@mui/material')
  const parts = modulePath.split('/');
  const parentKey = modulePath.startsWith('@') ? parts.slice(0, 2).join('/') : parts[0];
  if (RUNTIME_MODULES[parentKey]) {
    return { mod: RUNTIME_MODULES[parentKey], strip: false };
  }
  // Check if it matches an allowed prefix — return empty stub so import is stripped
  const isAllowed = modulePath === 'react' || ALLOWED_PREFIXES.some((p) => modulePath.startsWith(p));
  if (isAllowed) {
    return { mod: {}, strip: true };
  }
  return null; // not allowed
}

/** Transpile JSX source and evaluate into a React element */
function evaluateCode(source: string): React.ReactNode {
  // Strip import statements and collect what they import
  const importRegex =
    /import\s+(?:\{([^}]*)\}|\*\s+as\s+(\w+)|(\w+))\s+from\s+['"]([^'"]+)['"]\s*;?/g;
  const scope: Record<string, unknown> = {
    React,
    ...MuiMaterial,
    ...MuiIcons,
  };

  let cleanedSource = source;
  let match;
  while ((match = importRegex.exec(source)) !== null) {
    const [fullMatch, namedImports, namespaceImport, defaultImport, modulePath] = match;
    const resolved = resolveImport(modulePath);
    if (!resolved) {
      throw new Error(`Import from "${modulePath}" is not allowed. Allowed: react, @mui/*, @syncfusion/*, @emotion/*, maui*`);
    }
    const mod = resolved.mod;

    if (namedImports) {
      namedImports.split(',').forEach((spec) => {
        const parts = spec.trim().split(/\s+as\s+/);
        const importName = parts[0].trim();
        const localName = (parts[1] || importName).trim();
        scope[localName] = (mod as Record<string, unknown>)[importName];
      });
    } else if (namespaceImport) {
      scope[namespaceImport] = mod;
    } else if (defaultImport) {
      scope[defaultImport] = (mod as Record<string, unknown>)['default'] || mod;
    }

    cleanedSource = cleanedSource.replace(fullMatch, '');
  }

  // Also strip any export default/export statements
  cleanedSource = cleanedSource
    .replace(/export\s+default\s+/g, '')
    .replace(/export\s+/g, '');

  // Transpile JSX → JS
  const result = transform(cleanedSource, {
    presets: ['react'],
    filename: 'component.tsx',
  });

  if (!result.code) throw new Error('Transpilation produced no output');

  // Wrap in a function that returns the last expression
  // We look for a function component or a JSX expression
  let code = result.code;

  // If the code defines a function component, call it
  const funcMatch = code.match(/function\s+(\w+)\s*\(/);
  if (funcMatch) {
    code += `\nreturn React.createElement(${funcMatch[1]});`;
  } else {
    // Assume the code is a JSX expression — wrap the last statement as return
    const lines = code.trim().split('\n');
    const lastLine = lines[lines.length - 1];
    // If last line looks like an expression (starts with React.createElement or a variable)
    if (
      lastLine.startsWith('React.createElement') ||
      lastLine.startsWith('/*#__PURE__*/')
    ) {
      lines[lines.length - 1] = `return ${lastLine}`;
      code = lines.join('\n');
    } else {
      code += '\nreturn null;';
    }
  }

  const scopeKeys = Object.keys(scope);
  const scopeValues = scopeKeys.map((k) => scope[k]);
  const fn = new Function(...scopeKeys, code);
  const output = fn(...scopeValues);

  // Guard: reject plain objects that aren't valid React children
  if (
    output !== null &&
    output !== undefined &&
    typeof output === 'object' &&
    !React.isValidElement(output) &&
    !Array.isArray(output)
  ) {
    throw new Error(
      'Component returned an invalid object instead of a React element. ' +
        'Switch to raw SVG render mode for safe display.',
    );
  }
  return output as React.ReactNode;
}

export default function LivePreview({ variant, styleTokens }: LivePreviewProps) {
  // Default SVG variants to raw mode (safe — uses SvgResizer with slider)
  const [svgMode, setSvgMode] = useState<'component' | 'raw'>(
    variant.type === 'svg' ? 'raw' : 'component',
  );

  const tokenStyle = useMemo(() => tokensToStyle(styleTokens), [styleTokens]);

  const rendered = useMemo(() => {
    try {
      if (variant.type === 'svg') {
        if (svgMode === 'raw' && variant.svgOriginal) {
          return { element: null, isSvgRaw: true, error: null };
        }
        // SVGR-converted code
        const el = evaluateCode(variant.source);
        return { element: el, isSvgRaw: false, error: null };
      } else {
        // Code variant
        const el = evaluateCode(variant.source);
        return { element: el, isSvgRaw: false, error: null };
      }
    } catch (err) {
      return {
        element: null,
        isSvgRaw: false,
        error: err instanceof Error ? err.message : String(err),
      };
    }
  }, [variant, svgMode]);

  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      {/* SVG mode toggle — always visible for SVG variants */}
      {variant.type === 'svg' && variant.svgOriginal && (
        <Box
          sx={{
            px: 2,
            py: 1.5,
            borderBottom: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            bgcolor: 'grey.50',
          }}
        >
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
            Render mode:
          </Typography>
          <ToggleButtonGroup
            value={svgMode}
            exclusive
            onChange={(_, val) => val && setSvgMode(val)}
            size="small"
          >
            <ToggleButton value="raw" sx={{ px: 2 }}>
              <ImageIcon sx={{ fontSize: 16, mr: 0.5 }} />
              Raw SVG
            </ToggleButton>
            <ToggleButton value="component" sx={{ px: 2 }}>
              <CodeIcon sx={{ fontSize: 16, mr: 0.5 }} />
              React Component
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      )}

      {/* Preview area with checkerboard background */}
      <Box
        sx={{
          p: 3,
          minHeight: 120,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'grey.50',
          backgroundImage:
            'linear-gradient(45deg, rgba(0,0,0,0.04) 25%, transparent 25%), linear-gradient(-45deg, rgba(0,0,0,0.04) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(0,0,0,0.04) 75%), linear-gradient(-45deg, transparent 75%, rgba(0,0,0,0.04) 75%)',
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
        }}
      >
        {rendered.error ? (
          <Alert severity="error" sx={{ width: '100%' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Preview Error
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: 12, mt: 0.5 }}>
              {rendered.error}
            </Typography>
          </Alert>
        ) : rendered.isSvgRaw && variant.svgOriginal ? (
          <SvgResizer svgString={variant.svgOriginal} styleTokens={styleTokens} />
        ) : (
          <div style={tokenStyle}>{rendered.element}</div>
        )}
      </Box>
    </Paper>
  );
}
