import { Box, Typography, Avatar, TextField, IconButton, Fab } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import PageHeader from '../../components/docs/PageHeader';
import ComponentPreview from '../../components/docs/ComponentPreview';
import CodeBlock from '../../components/docs/CodeBlock';
import TokenTable from '../../components/docs/TokenTable';
import { colors, borderRadius, componentSizes } from '../../theme/tokens';
import { xamlSnippets } from '../../theme/maui-tokens';

interface MessageBubbleProps {
  text: string;
  time: string;
  incoming?: boolean;
  showAvatar?: boolean;
}

function MessageBubble({ text, time, incoming = false, showAvatar = false }: MessageBubbleProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: incoming ? 'row' : 'row-reverse',
        gap: 1,
        alignItems: 'flex-end',
        ml: incoming ? 0 : 'auto',
        mr: incoming ? 'auto' : 0,
        maxWidth: '75%',
      }}
    >
      {incoming && showAvatar ? (
        <Avatar sx={{ width: 28, height: 28, bgcolor: colors.neutral[400], fontSize: 11, fontWeight: 600 }}>
          SC
        </Avatar>
      ) : incoming ? (
        <Box sx={{ width: 28 }} />
      ) : null}

      <Box>
        <Box
          sx={{
            px: 2,
            py: 1,
            borderRadius: incoming
              ? `${borderRadius.xl}px ${borderRadius.xl}px ${borderRadius.xl}px 4px`
              : `${borderRadius.xl}px ${borderRadius.xl}px 4px ${borderRadius.xl}px`,
            bgcolor: incoming ? colors.background.default : colors.messenger.main,
            color: incoming ? colors.text.primary : colors.messenger.contrastText,
            border: incoming ? `1px solid ${colors.neutral[200]}` : 'none',
          }}
        >
          <Typography variant="body2">{text}</Typography>
        </Box>
        <Typography
          variant="caption"
          sx={{
            color: colors.text.secondary,
            fontSize: 10,
            display: 'block',
            textAlign: incoming ? 'left' : 'right',
            mt: 0.25,
            px: 0.5,
          }}
        >
          {time}
        </Typography>
      </Box>
    </Box>
  );
}

function MessageComposer() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        p: 1.5,
        borderTop: `1px solid ${colors.neutral[200]}`,
      }}
    >
      <IconButton size="small" sx={{ color: colors.neutral[400] }}>
        <AttachFileIcon />
      </IconButton>
      <IconButton size="small" sx={{ color: colors.neutral[400] }}>
        <EmojiEmotionsIcon />
      </IconButton>
      <TextField
        placeholder="Type a message..."
        size="small"
        fullWidth
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: `${borderRadius.search}px`,
          },
        }}
      />
      <Fab
        color="primary"
        size="small"
        sx={{
          width: 36,
          height: 36,
          minHeight: 36,
        }}
      >
        <SendIcon fontSize="small" />
      </Fab>
    </Box>
  );
}

export default function Messages() {
  return (
    <Box>
      <PageHeader
        title="Messages"
        description="Chat message bubbles and composer from Messages.svg. Outgoing uses messenger purple, incoming uses white with border. Action buttons: 73×28px."
      />

      {/* Thread demo */}
      <ComponentPreview title="Message Thread" description="Incoming and outgoing message bubbles with timestamps.">
        <Box
          sx={{
            width: '100%',
            maxWidth: 480,
            bgcolor: colors.neutral[50],
            borderRadius: `${borderRadius.xl}px`,
            overflow: 'hidden',
            border: `1px solid ${colors.neutral[200]}`,
          }}
        >
          {/* Messages area */}
          <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <MessageBubble
              incoming
              showAvatar
              text="Hi! I wanted to discuss the new pricing for Q3."
              time="10:30 AM"
            />
            <MessageBubble
              incoming
              text="We have some budget changes to consider."
              time="10:30 AM"
            />
            <MessageBubble
              text="Sure! I've prepared a new proposal for you."
              time="10:32 AM"
            />
            <MessageBubble
              text="Let me send it over. Should be in your inbox shortly."
              time="10:32 AM"
            />
            <MessageBubble
              incoming
              showAvatar
              text="Great, looking forward to reviewing it!"
              time="10:35 AM"
            />
          </Box>

          {/* Composer */}
          <MessageComposer />
        </Box>
      </ComponentPreview>

      {/* Bubble states */}
      <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>
        Message Bubble Styles
      </Typography>
      <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
        {[
          {
            label: 'Outgoing',
            bg: colors.messenger.main,
            color: '#fff',
            borderColor: 'none',
          },
          {
            label: 'Incoming',
            bg: colors.background.default,
            color: colors.text.primary,
            borderColor: colors.neutral[200],
          },
        ].map((style) => (
          <Box key={style.label} sx={{ textAlign: 'center' }}>
            <Box
              sx={{
                width: 160,
                height: 48,
                bgcolor: style.bg,
                borderRadius: `${borderRadius.xl}px`,
                border: style.borderColor !== 'none' ? `1px solid ${style.borderColor}` : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="body2" sx={{ color: style.color }}>
                Sample text
              </Typography>
            </Box>
            <Typography variant="caption" display="block" sx={{ mt: 1, fontWeight: 600 }}>
              {style.label}
            </Typography>
            <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
              {style.bg}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Action buttons */}
      <ComponentPreview title="Message Action Buttons" description={`Quick action buttons (${componentSizes.msgActionButton.width}×${componentSizes.msgActionButton.height}px) for message context actions.`}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {['Reply', 'Forward', 'Archive', 'Delete'].map((action) => (
            <Box
              key={action}
              sx={{
                width: componentSizes.msgActionButton.width,
                height: componentSizes.msgActionButton.height,
                borderRadius: `${borderRadius.default}px`,
                border: `1px solid ${colors.neutral[200]}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                '&:hover': { bgcolor: colors.neutral[50] },
              }}
            >
              <Typography variant="caption" fontWeight={600}>
                {action}
              </Typography>
            </Box>
          ))}
        </Box>
      </ComponentPreview>

      {/* Composer */}
      <ComponentPreview title="Message Composer" description="Input area with attach, emoji, and send button.">
        <Box sx={{ width: '100%', maxWidth: 480, border: `1px solid ${colors.neutral[200]}`, borderRadius: `${borderRadius.default}px` }}>
          <MessageComposer />
        </Box>
      </ComponentPreview>

      <TokenTable
        title="Message Tokens"
        showPlatformColumns={true}
        tokens={[
          { name: 'message.outgoing.bg', value: colors.messenger.main, isColor: true, muiPath: 'custom sx', mauiKey: 'SfChatOutgoingMessageBackground', description: 'Outgoing bubble' },
          { name: 'message.outgoing.text', value: colors.messenger.contrastText, isColor: true, muiPath: 'custom sx', mauiKey: 'SfChatOutgoingMessageTextColor', description: 'Outgoing text' },
          { name: 'message.incoming.bg', value: colors.background.default, isColor: true, muiPath: 'custom sx', mauiKey: 'SfChatIncomingMessageBackground', description: 'Incoming bubble' },
          { name: 'message.incoming.text', value: colors.text.primary, isColor: true, muiPath: 'custom sx', mauiKey: 'SfChatIncomingMessageTextColor', description: 'Incoming text' },
          { name: 'message.timestamp', value: colors.text.secondary, isColor: true, muiPath: 'custom sx', mauiKey: 'SfChatTimestampTextColor', description: 'Timestamp text' },
          { name: 'message.incoming.border', value: colors.neutral[200], isColor: true, muiPath: 'custom sx', mauiKey: 'SfChatEditorStrokeColor', description: 'Incoming bubble border' },
          { name: 'message.borderRadius', value: `${borderRadius.xl}px`, muiPath: 'custom sx', mauiKey: 'CornerRadius=14', description: 'Bubble border-radius' },
          { name: 'msgActionButton.width', value: `${componentSizes.msgActionButton.width}px`, muiPath: 'Button sx', mauiKey: 'WidthRequest=73', description: 'Action button width' },
          { name: 'msgActionButton.height', value: `${componentSizes.msgActionButton.height}px`, muiPath: 'Button sx', mauiKey: 'HeightRequest=28', description: 'Action button height' },
        ]}
      />

      <CodeBlock
        web={`// Message bubble component
function MessageBubble({ text, time, incoming }) {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: incoming ? 'row' : 'row-reverse',
      maxWidth: '75%',
    }}>
      <Box sx={{
        px: 2, py: 1,
        borderRadius: incoming
          ? '14px 14px 14px 4px'
          : '14px 14px 4px 14px',
        bgcolor: incoming ? '#FFFFFF' : '#5742BF',
        color: incoming ? '#202B3F' : '#FFFFFF',
        border: incoming ? '1px solid #D9D9D9' : 'none',
      }}>
        <Typography variant="body2">{text}</Typography>
      </Box>
    </Box>
  );
}

// Composer
<Box sx={{ display: 'flex', gap: 1, p: 1.5 }}>
  <IconButton><AttachFile /></IconButton>
  <TextField placeholder="Type a message..." size="small" fullWidth />
  <Fab color="primary" size="small"><Send /></Fab>
</Box>`}
        mobile={xamlSnippets.chat}
      />
    </Box>
  );
}
