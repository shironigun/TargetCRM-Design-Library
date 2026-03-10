import { Box, Tabs, Tab, IconButton, Tooltip, Snackbar } from '@mui/material';
import { ContentCopy as CopyIcon } from '@mui/icons-material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';

interface CodeBlockProps {
  /** TSX code for web (React + MUI) */
  web?: string;
  /** XAML code for mobile (.NET MAUI + Syncfusion) */
  mobile?: string;
  /** If only one platform, use this */
  code?: string;
  language?: string;
  title?: string;
}

export default function CodeBlock({ web, mobile, code, language, title }: CodeBlockProps) {
  const { platform } = usePlatform();
  const [tab, setTab] = useState<'web' | 'mobile'>(platform === 'mobile' ? 'mobile' : 'web');
  const [copied, setCopied] = useState(false);

  // Single-platform mode
  if (code) {
    return (
      <CodeBlockInner
        code={code}
        language={language || 'tsx'}
        title={title}
        onCopy={() => {
          navigator.clipboard.writeText(code);
          setCopied(true);
        }}
        copied={copied}
        onCloseCopied={() => setCopied(false)}
      />
    );
  }

  const currentCode = tab === 'web' ? (web || '') : (mobile || '');
  const currentLang = tab === 'web' ? 'tsx' : 'xml';

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{ minHeight: 36, '& .MuiTab-root': { minHeight: 36, py: 0.5 } }}
        >
          {web && <Tab label="React / MUI" value="web" />}
          {mobile && <Tab label="MAUI / Syncfusion" value="mobile" />}
        </Tabs>
        <Box sx={{ ml: 'auto' }}>
          <Tooltip title="Copy code">
            <IconButton
              size="small"
              onClick={() => {
                navigator.clipboard.writeText(currentCode);
                setCopied(true);
              }}
            >
              <CopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <SyntaxHighlighter
        language={currentLang}
        style={oneLight}
        customStyle={{
          margin: 0,
          borderRadius: '0 0 8px 8px',
          fontSize: 13,
          border: '1px solid #e0e0e0',
          borderTop: 'none',
        }}
      >
        {currentCode}
      </SyntaxHighlighter>
      <Snackbar
        open={copied}
        autoHideDuration={2000}
        onClose={() => setCopied(false)}
        message="Copied to clipboard"
      />
    </Box>
  );
}

function CodeBlockInner({
  code,
  language,
  title: _title,
  onCopy,
  copied,
  onCloseCopied,
}: {
  code: string;
  language: string;
  title?: string;
  onCopy: () => void;
  copied: boolean;
  onCloseCopied: () => void;
}) {
  return (
    <Box sx={{ mb: 3, position: 'relative' }}>
      <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
        <Tooltip title="Copy code">
          <IconButton size="small" onClick={onCopy}>
            <CopyIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      <SyntaxHighlighter
        language={language}
        style={oneLight}
        customStyle={{
          margin: 0,
          borderRadius: 8,
          fontSize: 13,
          border: '1px solid #e0e0e0',
        }}
      >
        {code}
      </SyntaxHighlighter>
      <Snackbar
        open={copied}
        autoHideDuration={2000}
        onClose={onCloseCopied}
        message="Copied to clipboard"
      />
    </Box>
  );
}
