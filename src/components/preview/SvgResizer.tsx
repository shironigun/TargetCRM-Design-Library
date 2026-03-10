// TargetCRM Design Library — SVG Resizer Component
// Renders raw SVG with a proportional resize slider.

import { useState, useMemo } from 'react';
import { Box, Slider, Typography } from '@mui/material';
import type { StyleTokens } from '../../types';

interface SvgResizerProps {
  svgString: string;
  styleTokens: StyleTokens;
}

/** Parse viewBox or width/height from SVG to get aspect ratio */
function parseSvgDimensions(svg: string): { width: number; height: number } {
  // Try viewBox first
  const vbMatch = svg.match(/viewBox=["']([^"']+)["']/);
  if (vbMatch) {
    const parts = vbMatch[1].trim().split(/[\s,]+/).map(Number);
    if (parts.length >= 4 && parts[2] > 0 && parts[3] > 0) {
      return { width: parts[2], height: parts[3] };
    }
  }
  // Try width/height attributes
  const wMatch = svg.match(/\bwidth=["'](\d+(?:\.\d+)?)(?:px)?["']/);
  const hMatch = svg.match(/\bheight=["'](\d+(?:\.\d+)?)(?:px)?["']/);
  const w = wMatch ? parseFloat(wMatch[1]) : 200;
  const h = hMatch ? parseFloat(hMatch[1]) : 200;
  return { width: w || 200, height: h || 200 };
}

export default function SvgResizer({ svgString, styleTokens }: SvgResizerProps) {
  const dims = useMemo(() => parseSvgDimensions(svgString), [svgString]);
  const aspectRatio = dims.width / dims.height;
  const [width, setWidth] = useState(Math.min(dims.width, 400));

  const currentHeight = Math.round(width / aspectRatio);

  // Build inline style from tokens
  const tokenStyle: React.CSSProperties = {};
  const { boxModel, typography, colours, shadows, custom } = styleTokens;
  if (colours.background) tokenStyle.backgroundColor = colours.background;
  if (colours.color) tokenStyle.color = colours.color;
  if (colours.borderColor) {
    tokenStyle.borderColor = colours.borderColor;
    tokenStyle.borderStyle = 'solid';
    tokenStyle.borderWidth = '1px';
  }
  if (shadows.boxShadow && shadows.boxShadow !== 'none')
    tokenStyle.boxShadow = shadows.boxShadow;
  if (boxModel.borderRadius) tokenStyle.borderRadius = boxModel.borderRadius;
  if (boxModel.paddingTop) tokenStyle.paddingTop = boxModel.paddingTop;
  if (boxModel.paddingRight) tokenStyle.paddingRight = boxModel.paddingRight;
  if (boxModel.paddingBottom) tokenStyle.paddingBottom = boxModel.paddingBottom;
  if (boxModel.paddingLeft) tokenStyle.paddingLeft = boxModel.paddingLeft;
  if (typography.fontFamily) tokenStyle.fontFamily = typography.fontFamily;
  Object.entries(custom).forEach(([k, v]) => {
    if (v) (tokenStyle as Record<string, string>)[k] = v;
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* SVG container */}
      <Box
        sx={{
          width,
          height: currentHeight,
          ...tokenStyle,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '& svg': {
            width: '100%',
            height: '100%',
            display: 'block',
          },
        }}
        dangerouslySetInnerHTML={{ __html: svgString }}
      />

      {/* Dimensions label */}
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
        {Math.round(width)} &times; {currentHeight} px
      </Typography>

      {/* Resize slider */}
      <Box sx={{ width: '100%', maxWidth: 400, px: 2, mt: 1 }}>
        <Slider
          value={width}
          onChange={(_, val) => setWidth(val as number)}
          min={24}
          max={800}
          step={1}
          size="small"
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v}px`}
        />
      </Box>
    </Box>
  );
}
