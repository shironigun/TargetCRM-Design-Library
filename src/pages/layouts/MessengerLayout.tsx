import { Box, Typography, TextField, Avatar, Chip, Divider, List, ListItem, ListItemAvatar, ListItemText, IconButton, InputAdornment, Badge } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PageHeader from '../../components/docs/PageHeader';
import ComponentPreview from '../../components/docs/ComponentPreview';
import CodeBlock from '../../components/docs/CodeBlock';
import { colors, borderRadius } from '../../theme/tokens';

const conversations = [
  { name: 'Sarah Johnson', msg: 'Hey, about the pricing...', time: '2:34 PM', unread: 3, platform: 'messenger' as const },
  { name: 'Mike Reynolds', msg: 'The contract is signed!', time: '1:15 PM', unread: 0, platform: 'facebook' as const },
  { name: 'Lisa Chen', msg: 'Can you send the file?', time: '11:42 AM', unread: 1, platform: 'messenger' as const },
  { name: 'David Park', msg: 'Thanks for following up.', time: 'Yesterday', unread: 0, platform: null },
];

const messages = [
  { text: 'Hi! About the Q3 pricing changes.', time: '10:30 AM', incoming: true },
  { text: 'We have some budget adjustments.', time: '10:31 AM', incoming: true },
  { text: 'Sure! I prepared a new proposal.', time: '10:32 AM', incoming: false },
  { text: 'Should be in your inbox shortly.', time: '10:33 AM', incoming: false },
  { text: 'Great, looking forward to it!', time: '10:35 AM', incoming: true },
];

export default function MessengerLayout() {
  return (
    <Box>
      <PageHeader
        title="Messenger Layout"
        description="Full messenger screen layout combining conversation list, message thread, and contact details into a three-panel layout."
      />

      {/* Full layout */}
      <ComponentPreview title="Three-Panel Layout" description="Conversation list + message thread + contact panel.">
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            height: 500,
            border: `1px solid ${colors.neutral[200]}`,
            borderRadius: `${borderRadius.xl}px`,
            overflow: 'hidden',
            bgcolor: colors.background.default,
          }}
        >
          {/* Left panel — conversation list */}
          <Box sx={{ width: 300, borderRight: `1px solid ${colors.neutral[200]}`, display: 'flex', flexDirection: 'column' }}>
            {/* Search */}
            <Box sx={{ p: 1.5 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search messages..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ fontSize: 18, color: colors.neutral[400] }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <FilterListIcon sx={{ fontSize: 18, color: colors.neutral[400] }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: `${borderRadius.search}px` },
                }}
              />
            </Box>

            {/* Conversation list */}
            <List sx={{ flex: 1, overflow: 'auto', px: 0.5 }}>
              {conversations.map((conv, i) => (
                <ListItem
                  key={i}
                  sx={{
                    bgcolor: i === 0 ? colors.info.background : 'transparent',
                    borderRadius: `${borderRadius.default}px`,
                    mb: 0.25,
                    cursor: 'pointer',
                    '&:hover': { bgcolor: i === 0 ? colors.info.background : colors.neutral[50] },
                  }}
                  secondaryAction={
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="caption" sx={{ fontSize: 10 }}>{conv.time}</Typography>
                      {conv.unread > 0 && (
                        <Box
                          sx={{
                            mt: 0.25,
                            width: 18,
                            height: 18,
                            borderRadius: '50%',
                            bgcolor: colors.badge.main,
                            color: '#fff',
                            fontSize: 10,
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            ml: 'auto',
                          }}
                        >
                          {conv.unread}
                        </Box>
                      )}
                    </Box>
                  }
                >
                  <ListItemAvatar>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant="dot"
                      invisible={!conv.platform}
                      sx={{
                        '& .MuiBadge-dot': {
                          bgcolor: conv.platform === 'messenger' ? colors.messenger.main : colors.facebook.main,
                          width: 10,
                          height: 10,
                          border: `2px solid ${i === 0 ? colors.info.background : colors.background.default}`,
                        },
                      }}
                    >
                      <Avatar sx={{ width: 36, height: 36, fontSize: 13, bgcolor: colors.primary.main }}>
                        {conv.name.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={conv.name}
                    secondary={conv.msg}
                    primaryTypographyProps={{ variant: 'body2', fontWeight: conv.unread ? 700 : 500, noWrap: true }}
                    secondaryTypographyProps={{ variant: 'caption', noWrap: true }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Center panel — message thread */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* Thread header */}
            <Box sx={{ height: 56, display: 'flex', alignItems: 'center', px: 2, borderBottom: `1px solid ${colors.neutral[100]}`, gap: 1.5 }}>
              <Avatar sx={{ width: 32, height: 32, fontSize: 12, bgcolor: colors.primary.main }}>SJ</Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" fontWeight={600}>Sarah Johnson</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: 11 }}>Online</Typography>
              </Box>
              <IconButton size="small"><MoreVertIcon /></IconButton>
            </Box>

            {/* Messages */}
            <Box sx={{ flex: 1, px: 2, py: 1.5, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 0.75, bgcolor: colors.neutral[50] }}>
              {messages.map((msg, i) => (
                <Box
                  key={i}
                  sx={{
                    display: 'flex',
                    justifyContent: msg.incoming ? 'flex-start' : 'flex-end',
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: '70%',
                      px: 1.5,
                      py: 0.75,
                      borderRadius: msg.incoming
                        ? `${borderRadius.xl}px ${borderRadius.xl}px ${borderRadius.xl}px 4px`
                        : `${borderRadius.xl}px ${borderRadius.xl}px 4px ${borderRadius.xl}px`,
                      bgcolor: msg.incoming ? colors.background.default : colors.messenger.main,
                      color: msg.incoming ? colors.text.primary : '#fff',
                      border: msg.incoming ? `1px solid ${colors.neutral[200]}` : 'none',
                    }}
                  >
                    <Typography variant="body2" sx={{ fontSize: 13 }}>{msg.text}</Typography>
                    <Typography variant="caption" sx={{ fontSize: 10, opacity: 0.7, display: 'block', textAlign: 'right', mt: 0.25 }}>
                      {msg.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Composer */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1, borderTop: `1px solid ${colors.neutral[200]}` }}>
              <IconButton size="small"><AttachFileIcon sx={{ fontSize: 20 }} /></IconButton>
              <TextField
                size="small"
                fullWidth
                placeholder="Type a message..."
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: `${borderRadius.search}px` } }}
              />
              <IconButton size="small" color="primary"><SendIcon sx={{ fontSize: 20 }} /></IconButton>
            </Box>
          </Box>

          {/* Right panel — contact details */}
          <Box sx={{ width: 220, borderLeft: `1px solid ${colors.neutral[200]}`, p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ width: 64, height: 64, bgcolor: colors.primary.main, fontSize: 22, mt: 2 }}>SJ</Avatar>
            <Typography variant="subtitle1" fontWeight={600}>Sarah Johnson</Typography>
            <Chip label="Active Lead" size="small" color="success" />

            <Divider sx={{ width: '100%', my: 1 }} />

            <Box sx={{ width: '100%' }}>
              <Typography variant="caption" color="text.secondary">Email</Typography>
              <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>sarah@acme.com</Typography>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Typography variant="caption" color="text.secondary">Phone</Typography>
              <Typography variant="body2">+1 (555) 123-4567</Typography>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Typography variant="caption" color="text.secondary">Company</Typography>
              <Typography variant="body2">Acme Corp</Typography>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Typography variant="caption" color="text.secondary">Deal Value</Typography>
              <Typography variant="body2" fontWeight={600} color="primary">$45,000</Typography>
            </Box>
          </Box>
        </Box>
      </ComponentPreview>

      {/* Panel proportions */}
      <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>
        Panel Layout Guideline
      </Typography>
      <Box sx={{ display: 'flex', height: 48, width: '100%', maxWidth: 600, borderRadius: `${borderRadius.default}px`, overflow: 'hidden', mb: 4 }}>
        <Box sx={{ width: '25%', bgcolor: colors.neutral[100], display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="caption" fontWeight={600}>List (25%)</Typography>
        </Box>
        <Box sx={{ flex: 1, bgcolor: colors.neutral[50], display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: `2px solid ${colors.neutral[200]}`, borderRight: `2px solid ${colors.neutral[200]}` }}>
          <Typography variant="caption" fontWeight={600}>Thread (50%)</Typography>
        </Box>
        <Box sx={{ width: '25%', bgcolor: colors.neutral[100], display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="caption" fontWeight={600}>Details (25%)</Typography>
        </Box>
      </Box>

      <CodeBlock
        web={`// Three-panel messenger layout
<Box sx={{ display: 'flex', height: '100vh' }}>
  {/* Left — Conversation list (25%) */}
  <Box sx={{ width: 300, borderRight: '1px solid #D9D9D9' }}>
    <TextField placeholder="Search..." />
    <List>
      {conversations.map(conv => (
        <ListItem selected={conv.active}>
          <Avatar>{conv.initials}</Avatar>
          <ListItemText primary={conv.name} secondary={conv.lastMessage} />
          {conv.unread > 0 && <Badge>{conv.unread}</Badge>}
        </ListItem>
      ))}
    </List>
  </Box>

  {/* Center — Message thread (50%) */}
  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
    <Box sx={{ height: 56, borderBottom: '1px solid #EFEFEF' }}>
      {/* Thread header */}
    </Box>
    <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
      {messages.map(msg => <MessageBubble {...msg} />)}
    </Box>
    <MessageComposer />
  </Box>

  {/* Right — Contact details (25%) */}
  <Box sx={{ width: 220, borderLeft: '1px solid #D9D9D9', p: 2 }}>
    <Avatar sx={{ width: 64, height: 64 }} />
    <Typography variant="subtitle1">Contact Name</Typography>
    {/* Contact fields */}
  </Box>
</Box>`}
        mobile={`<!-- Messenger Layout — .NET MAUI -->
<!-- Mobile uses a navigation stack instead of panels -->
<Shell>
    <!-- Conversation list as main page -->
    <ShellContent ContentTemplate="{DataTemplate local:ConversationListPage}" />
</Shell>

<!-- ConversationListPage.xaml -->
<ContentPage>
    <syncfusion:SfListView ItemsSource="{Binding Conversations}"
                           SelectionMode="Single"
                           SelectionBackground="{DynamicResource InfoBackgroundColor}">
        <syncfusion:SfListView.ItemTemplate>
            <DataTemplate>
                <Grid ColumnDefinitions="Auto,*,Auto"
                      Padding="16" ColumnSpacing="12">
                    <Frame Grid.Column="0"
                           WidthRequest="36" HeightRequest="36"
                           CornerRadius="18"
                           BackgroundColor="{DynamicResource PrimaryColor}" />
                    <VerticalStackLayout Grid.Column="1">
                        <Label Text="{Binding Name}" FontAttributes="Bold" />
                        <Label Text="{Binding LastMessage}"
                               Style="{DynamicResource Caption}"
                               LineBreakMode="TailTruncation" />
                    </VerticalStackLayout>
                </Grid>
            </DataTemplate>
        </syncfusion:SfListView.ItemTemplate>
    </syncfusion:SfListView>
</ContentPage>

<!-- MessageThreadPage.xaml — pushed on selection -->
<ContentPage>
    <syncfusion:SfChat CurrentUser="{Binding CurrentUser}"
                       Messages="{Binding Messages}"
                       OutgoingMessageBackground="{DynamicResource MessengerColor}"
                       IncomingMessageBackground="{DynamicResource White}" />
</ContentPage>`}
      />
    </Box>
  );
}
