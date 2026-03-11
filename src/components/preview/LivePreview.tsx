// TargetCRM Design Library — Live Preview (FR6)
// Renders a variant with style tokens applied in real time.
// Code variants: transpiled via @babel/standalone + evaluated via new Function()
// SVG variants: SVGR-converted React component or raw SVG with resizer

import { useMemo, useState } from 'react';
import { Box, Paper, Alert, ToggleButtonGroup, ToggleButton, Typography, Slider, Tooltip } from '@mui/material';
import {
  Code as CodeIcon,
  Image as ImageIcon,
} from '@mui/icons-material';
import * as React from 'react';
import * as MuiMaterial from '@mui/material';
import * as MuiIcons from '@mui/icons-material';
import { transform } from '@babel/standalone';
import SvgResizer from './SvgResizer';
import type { Variant } from '../../types';

interface LivePreviewProps {
  variant: Variant;
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
 *  - Subpath matches (e.g. '@mui/material/Button') → return parent + subpathKey
 *  - Allowed but not available at runtime (syncfusion, maui) → return empty stub
 */
function resolveImport(modulePath: string): {
  mod: Record<string, unknown>;
  /** The subpath component name, e.g. 'Button' for '@mui/material/Button' */
  subpathKey: string | null;
} | null {
  // Exact match first
  if (RUNTIME_MODULES[modulePath]) {
    return { mod: RUNTIME_MODULES[modulePath] as Record<string, unknown>, subpathKey: null };
  }
  // Subpath: try parent package  (e.g. '@mui/material/Button' → '@mui/material')
  const parts = modulePath.split('/');
  const parentKey = modulePath.startsWith('@') ? parts.slice(0, 2).join('/') : parts[0];
  if (RUNTIME_MODULES[parentKey]) {
    // The last path segment is the component name
    const subpathKey = parts[parts.length - 1];
    return {
      mod: RUNTIME_MODULES[parentKey] as Record<string, unknown>,
      subpathKey: subpathKey !== parentKey.split('/').pop() ? subpathKey : null,
    };
  }
  // Check if it matches an allowed prefix — return empty stub so import is stripped
  const isAllowed = modulePath === 'react' || ALLOWED_PREFIXES.some((p) => modulePath.startsWith(p));
  if (isAllowed) {
    return { mod: {} as Record<string, unknown>, subpathKey: null };
  }
  return null; // not allowed
}

/**
 * Parse a single import statement string, resolve the module,
 * and inject bindings into the given scope object.
 *
 * Supports:  import X from '...'
 *            import { A, B as C } from '...'
 *            import X, { A } from '...'
 *            import * as X from '...'
 *            import '...'  (side-effect only, ignored)
 */
function processImportStatement(stmt: string, scope: Record<string, unknown>): void {
  // Extract module path
  const fromMatch = stmt.match(/from\s+['"]([^'"]+)['"]/);
  if (!fromMatch) return; // side-effect import like `import 'foo'`

  const modulePath = fromMatch[1];
  const resolved = resolveImport(modulePath);
  if (!resolved) {
    throw new Error(
      `Import from "${modulePath}" is not allowed. Allowed: react, @mui/*, @syncfusion/*, @emotion/*, maui*`,
    );
  }
  const { mod, subpathKey } = resolved;

  // Get the part before `from`
  const specPart = stmt.replace(/^import\s+/, '').replace(/\s+from\s+['"][^'"]+['"]\s*;?\s*$/, '').trim();
  if (!specPart) return;

  // namespace:  * as Foo
  const nsMatch = specPart.match(/^\*\s+as\s+(\w+)$/);
  if (nsMatch) {
    // For subpath (e.g. `import * as Select from '@mui/material/Select'`),
    // scope the specific export; otherwise give the whole module.
    scope[nsMatch[1]] = subpathKey ? (mod[subpathKey] ?? mod) : mod;
    return;
  }

  // Split default and named:  "React, { useState, useEffect as ue }"
  // or just named:  "{ useState }"
  // or just default:  "React"
  const braceMatch = specPart.match(/\{([^}]*)\}/);
  const namedPart = braceMatch ? braceMatch[1] : null;
  const defaultPart = specPart.replace(/\{[^}]*\}/, '').replace(/,/g, '').trim();

  // Default import
  if (defaultPart) {
    if (subpathKey) {
      // Subpath import: `import Select from '@mui/material/Select'`
      // → mod is @mui/material barrel, Select = mod['Select']
      const resolved = mod[subpathKey];
      scope[defaultPart] = resolved ?? mod;
    } else {
      scope[defaultPart] = mod['default'] || mod;
    }
  }

  // Named imports
  if (namedPart) {
    namedPart.split(',').forEach((spec) => {
      const s = spec.trim();
      if (!s) return;
      // Handle `type Foo` — skip type-only imports
      if (s.startsWith('type ')) return;
      const parts = s.split(/\s+as\s+/);
      const importName = parts[0].trim();
      const localName = (parts[1] || importName).trim();
      // Try direct module export first, then subpath component's property
      scope[localName] = mod[importName];
    });
  }
}

/** Transpile JSX source and evaluate into a React element */
function evaluateCode(source: string): React.ReactNode {
  const scope: Record<string, unknown> = {
    React,
    ...MuiMaterial,
    ...MuiIcons,
  };

  // ── Strip ALL import statements (line-by-line) and populate scope ──
  // Handles: import X from '...',  import { A, B } from '...',
  //          import X, { A } from '...',  import * as X from '...',
  //          import type { X } from '...',  import '...' (side-effect)
  const lines = source.split('\n');
  const cleanedLines: string[] = [];
  let inMultiLineImport = false;
  let importBuffer = '';

  for (const line of lines) {
    if (inMultiLineImport) {
      importBuffer += ' ' + line;
      if (line.includes("from ") || line.match(/['"];?\s*$/)) {
        processImportStatement(importBuffer, scope);
        inMultiLineImport = false;
        importBuffer = '';
      }
      continue;
    }

    const trimmed = line.trim();

    // Skip type-only imports entirely
    if (/^import\s+type\s/.test(trimmed)) continue;

    // Detect start of an import statement
    if (/^import\s/.test(trimmed)) {
      // Check if it's a complete single-line import
      if (trimmed.includes('from ') || /^import\s+['"]/.test(trimmed)) {
        processImportStatement(trimmed, scope);
      } else {
        // Multi-line import (e.g. opening brace not closed)
        inMultiLineImport = true;
        importBuffer = trimmed;
      }
      continue;
    }

    cleanedLines.push(line);
  }

  let cleanedSource = cleanedLines.join('\n');

  // Capture the name of the export-default function/const BEFORE stripping exports
  const exportDefaultFuncMatch = cleanedSource.match(
    /export\s+default\s+function\s+(\w+)/,
  );
  // Also handle `export default X` (referencing a previously defined name)
  const exportDefaultRefMatch = cleanedSource.match(
    /export\s+default\s+(\w+)\s*;/,
  );
  const exportDefaultName = exportDefaultFuncMatch?.[1]
    ?? exportDefaultRefMatch?.[1]
    ?? null;

  cleanedSource = cleanedSource
    .replace(/export\s+default\s+/g, '')
    .replace(/export\s+/g, '');

  // Transpile TSX/JSX → JS
  const result = transform(cleanedSource, {
    presets: ['react', 'typescript'],
    filename: 'component.tsx',
  });

  if (!result.code) throw new Error('Transpilation produced no output');

  // Wrap in a function that returns the last expression
  // We look for a function component or a JSX expression
  let code = result.code;

  // Collect ALL function names defined in the code (handles both
  // `function Foo(` and Babel-compiled `var Foo = function Foo(`)
  const allFuncs: string[] = [];
  const funcRegex = /(?:function\s+(\w+)\s*\(|var\s+(\w+)\s*=\s*function\s)/g;
  let fm;
  while ((fm = funcRegex.exec(code)) !== null) {
    const name = fm[1] || fm[2];
    if (name && !allFuncs.includes(name)) allFuncs.push(name);
  }

  if (allFuncs.length > 0) {
    // Priority: 1) export-default name, 2) last PascalCase function, 3) last function
    let componentName: string;
    if (exportDefaultName && allFuncs.includes(exportDefaultName)) {
      componentName = exportDefaultName;
    } else {
      const pascalFuncs = allFuncs.filter((n) => /^[A-Z]/.test(n));
      componentName = pascalFuncs.length > 0
        ? pascalFuncs[pascalFuncs.length - 1]
        : allFuncs[allFuncs.length - 1];
    }
    code += `\nreturn React.createElement(${componentName});`;
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
  // Post-process: fix any string `style` props → object style maps.
  // User JSX may contain style="color:red" which Babel preserves as a string.
  return fixStyleProps(output as React.ReactNode);
}

/**
 * Parse a CSS string like "color: red; margin: 10px" into a React style obj.
 */
function parseCssString(css: string): Record<string, string> {
  const result: Record<string, string> = {};
  css.split(';').forEach((decl) => {
    const idx = decl.indexOf(':');
    if (idx < 0) return;
    const prop = decl.slice(0, idx).trim();
    const value = decl.slice(idx + 1).trim();
    if (!prop || !value) return;
    // Convert kebab-case to camelCase (e.g. "font-size" → "fontSize")
    const jsProp = prop.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
    result[jsProp] = value;
  });
  return result;
}

/**
 * Recursively clone a React element tree, converting any string `style`
 * props into object style maps so React 19 doesn't throw.
 */
function fixStyleProps(node: React.ReactNode): React.ReactNode {
  if (node == null || typeof node !== 'object') return node;
  if (Array.isArray(node)) return node.map(fixStyleProps);
  if (!React.isValidElement(node)) return node;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const props = node.props as Record<string, any>;
  let changed = false;
  const newProps: Record<string, unknown> = {};

  // Fix string style → object
  if (typeof props.style === 'string') {
    newProps.style = parseCssString(props.style);
    changed = true;
  }

  // Recurse into children
  if (props.children != null) {
    const fixed = Array.isArray(props.children)
      ? props.children.map(fixStyleProps)
      : fixStyleProps(props.children);
    if (fixed !== props.children) {
      newProps.children = fixed;
      changed = true;
    }
  }

  if (!changed) return node;
  return React.cloneElement(node, { ...props, ...newProps });
}

export default function LivePreview({ variant }: LivePreviewProps) {
  // Default SVG variants to raw mode (safe — uses SvgResizer with slider)
  const [svgMode, setSvgMode] = useState<'component' | 'raw'>(
    variant.type === 'svg' ? 'raw' : 'component',
  );

  /** Zoom percentage — 100 = no zoom */
  const [zoom, setZoom] = useState<number>(100);

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

  const zoomMarks = [
    { value: 25, label: '25%' },
    { value: 50, label: '50%' },
    { value: 100, label: '100%' },
    { value: 200, label: '200%' },
    { value: 300, label: '300%' },
  ];

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      {/* Main preview panel */}
      <Paper
        variant="outlined"
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          flex: 1,
          minWidth: 0,
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
            overflow: 'auto',
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
          ) : (
            <Box
              sx={{
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'center center',
                transition: 'transform 0.15s ease',
              }}
            >
              {rendered.isSvgRaw && variant.svgOriginal ? (
                <SvgResizer svgString={variant.svgOriginal} />
              ) : (
                <div>{rendered.element}</div>
              )}
            </Box>
          )}
        </Box>
      </Paper>

      {/* Vertical zoom slider — right side of preview */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 2,
          px: 0.5,
          minWidth: 44,
          maxWidth: 44,
        }}
      >
        <Tooltip title="Reset zoom to 100%" placement="left">
          <Typography
            variant="caption"
            onClick={() => setZoom(100)}
            sx={{
              mb: 1.5,
              fontWeight: 700,
              fontSize: 11,
              color: zoom === 100 ? 'text.secondary' : 'primary.main',
              cursor: 'pointer',
              userSelect: 'none',
              '&:hover': { color: 'primary.dark' },
            }}
          >
            {zoom}%
          </Typography>
        </Tooltip>
        <Slider
          orientation="vertical"
          value={zoom}
          onChange={(_, v) => setZoom(v as number)}
          min={25}
          max={300}
          step={5}
          marks={zoomMarks}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v}%`}
          sx={{
            flex: 1,
            minHeight: 100,
            '& .MuiSlider-markLabel': {
              fontSize: 10,
              left: -4,
            },
            '& .MuiSlider-thumb': {
              width: 14,
              height: 14,
            },
            '& .MuiSlider-track': {
              width: 3,
            },
            '& .MuiSlider-rail': {
              width: 3,
            },
          }}
        />
      </Box>
    </Box>
  );
}
