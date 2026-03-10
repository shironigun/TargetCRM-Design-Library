import { Box, Paper, Typography, useTheme } from '@mui/material';
import type { ReactNode } from 'react';

interface ComponentPreviewProps {
  title?: string;
  description?: string;
  children: ReactNode;
  bgcolor?: string;
}

export default function ComponentPreview({
  title,
  description,
  children,
  bgcolor,
}: ComponentPreviewProps) {
  const theme = useTheme();

  return (
    <Box sx={{ mb: 4 }}>
      {title && (
        <Typography variant="h6" sx={{ mb: 0.5 }}>
          {title}
        </Typography>
      )}
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
      )}
      <Paper
        variant="outlined"
        sx={{
          p: 3,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 2,
          bgcolor: bgcolor || theme.palette.background.default,
          borderColor: 'divider',
        }}
      >
        {children}
      </Paper>
    </Box>
  );
}
