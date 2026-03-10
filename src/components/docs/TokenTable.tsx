import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
  Paper,
} from '@mui/material';

interface TokenRow {
  name: string;
  value: string;
  /** Show a color swatch if this is a color token */
  isColor?: boolean;
  /** MUI usage path, e.g. theme.palette.primary.main */
  muiPath?: string;
  /** MAUI / Syncfusion key name */
  mauiKey?: string;
  description?: string;
}

interface TokenTableProps {
  title?: string;
  tokens: TokenRow[];
  showPlatformColumns?: boolean;
}

export default function TokenTable({ title, tokens, showPlatformColumns = true }: TokenTableProps) {
  return (
    <Box sx={{ mb: 4 }}>
      {title && (
        <Typography variant="h6" sx={{ mb: 1.5 }}>
          {title}
        </Typography>
      )}
      <TableContainer component={Paper} variant="outlined" sx={{ borderColor: 'divider' }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: 'background.paper' }}>
              <TableCell sx={{ fontWeight: 600, fontSize: 12 }}>Token</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: 12 }}>Value</TableCell>
              {showPlatformColumns && (
                <>
                  <TableCell sx={{ fontWeight: 600, fontSize: 12 }}>MUI Path</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: 12 }}>MAUI Key</TableCell>
                </>
              )}
              <TableCell sx={{ fontWeight: 600, fontSize: 12 }}>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tokens.map((token) => (
              <TableRow key={token.name} hover>
                <TableCell>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 500 }}>
                    {token.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {token.isColor && (
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          borderRadius: 0.5,
                          bgcolor: token.value,
                          border: '1px solid',
                          borderColor: 'divider',
                          flexShrink: 0,
                        }}
                      />
                    )}
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                      {token.value}
                    </Typography>
                  </Box>
                </TableCell>
                {showPlatformColumns && (
                  <>
                    <TableCell>
                      <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                        {token.muiPath || '—'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                        {token.mauiKey || '—'}
                      </Typography>
                    </TableCell>
                  </>
                )}
                <TableCell>
                  <Typography variant="caption" color="text.secondary">
                    {token.description || '—'}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
