import { Box, Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: string;
  children?: ReactNode;
}

export default function PageHeader({ title, description, badge, children }: PageHeaderProps) {
  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
        <Typography variant="h4" fontWeight={700}>
          {title}
        </Typography>
        {badge && (
          <Box
            sx={{
              px: 1,
              py: 0.25,
              borderRadius: 1,
              bgcolor: 'warning.light',
              color: 'warning.dark',
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            {badge}
          </Box>
        )}
      </Box>
      {description && (
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 680, mb: 2 }}>
          {description}
        </Typography>
      )}
      {children}
    </Box>
  );
}
