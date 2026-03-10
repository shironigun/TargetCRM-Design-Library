import { Box, Typography, Avatar, Checkbox, Chip, IconButton, Divider } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FacebookIcon from '@mui/icons-material/Facebook';
import PageHeader from '../../components/docs/PageHeader';
import ComponentPreview from '../../components/docs/ComponentPreview';
import CodeBlock from '../../components/docs/CodeBlock';
import TokenTable from '../../components/docs/TokenTable';
import { colors, borderRadius, componentSizes, shadows } from '../../theme/tokens';

interface ConversationCardProps {
  name: string;
  message: string;
  time: string;
  unread?: number;
  platform?: 'messenger' | 'facebook';
  selected?: boolean;
  avatarColor?: string;
}

function ConversationCard({
  name,
  message,
  time,
  unread,
  platform,
  selected,
  avatarColor = colors.primary.main,
}: ConversationCardProps) {
  return (
    <Box
      sx={{
        width: componentSizes.messengerCard.card.width,
        height: componentSizes.messengerCard.card.height,
        bgcolor: selected ? colors.info.background : colors.background.default,
        borderRadius: `${borderRadius.default}px`,
        boxShadow: shadows.card,
        display: 'flex',
        alignItems: 'center',
        px: 2,
        gap: 1.5,
        cursor: 'pointer',
        transition: 'background-color 0.15s',
        '&:hover': {
          bgcolor: selected ? colors.info.background : colors.neutral[50],
        },
      }}
    >
      {/* Checkbox */}
      <Checkbox
        size="small"
        checked={selected}
        sx={{
          '& .MuiSvgIcon-root': {
            fontSize: componentSizes.messengerCard.checkbox.size,
          },
        }}
      />

      {/* Avatar */}
      <Avatar
        sx={{
          width: componentSizes.avatar.size,
          height: componentSizes.avatar.size,
          bgcolor: avatarColor,
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        {name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
      </Avatar>

      {/* Content */}
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            variant="body2"
            fontWeight={unread ? 700 : 500}
            noWrap
            sx={{ color: colors.text.primary }}
          >
            {name}
          </Typography>
          {platform && (
            <Box
              component="span"
              sx={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                bgcolor: platform === 'messenger' ? colors.messenger.main : colors.facebook.main,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FacebookIcon sx={{ fontSize: 10, color: '#fff' }} />
            </Box>
          )}
        </Box>
        <Typography
          variant="caption"
          noWrap
          sx={{
            color: unread ? colors.text.primary : colors.text.secondary,
            fontWeight: unread ? 500 : 400,
            display: 'block',
          }}
        >
          {message}
        </Typography>
      </Box>

      {/* Meta */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5, minWidth: 48 }}>
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: 11 }}>
          {time}
        </Typography>
        {unread && unread > 0 ? (
          <Chip
            label={unread > 99 ? '99+' : unread}
            size="small"
            sx={{
              height: 18,
              minWidth: 18,
              fontSize: 10,
              fontWeight: 700,
              bgcolor: colors.badge.main,
              color: colors.badge.contrastText,
              '& .MuiChip-label': { px: 0.5 },
            }}
          />
        ) : null}
      </Box>

      {/* More */}
      <IconButton size="small" sx={{ color: colors.neutral[400] }}>
        <MoreVertIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}

export default function MessengerCard() {
  return (
    <Box>
      <PageHeader
        title="Messenger Card"
        description={`Conversation list item from Messenger Card.svg. Card: ${componentSizes.messengerCard.card.width}×${componentSizes.messengerCard.card.height}px with checkbox (${componentSizes.messengerCard.checkbox.size}px), avatar (${componentSizes.avatar.size}px), and unread badge.`}
      />

      {/* Default states */}
      <ComponentPreview title="Card States" description="Read, unread, selected, and platform-tagged cards.">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <ConversationCard
            name="Sarah Johnson"
            message="Hey, I wanted to check in about the deal..."
            time="2:34 PM"
            unread={3}
            platform="messenger"
          />
          <ConversationCard
            name="Mike Reynolds"
            message="The contract has been signed. We're good to go!"
            time="1:15 PM"
            selected
          />
          <ConversationCard
            name="Lisa Chen"
            message="Can you send me the updated pricing sheet?"
            time="11:42 AM"
            platform="facebook"
          />
          <ConversationCard
            name="David Park"
            message="Thanks for the follow up. Let me review and get back to you."
            time="Yesterday"
            avatarColor={colors.success.main}
          />
        </Box>
      </ComponentPreview>

      {/* Anatomy breakdown */}
      <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>
        Card Anatomy
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 4 }}>
        {[
          { element: 'Checkbox', size: `${componentSizes.messengerCard.checkbox.size}px`, detail: 'Xs border-radius, neutral border' },
          { element: 'Avatar', size: `${componentSizes.avatar.size}×${componentSizes.avatar.size}px`, detail: 'Circular, initials, primary bg' },
          { element: 'Name + platform icon', size: 'body2', detail: 'Bold when unread, 16px platform dot' },
          { element: 'Message preview', size: 'caption', detail: 'Single line, truncated with ellipsis' },
          { element: 'Timestamp', size: '11px caption', detail: 'Right-aligned, secondary text' },
          { element: 'Unread badge', size: '18px', detail: 'Badge-red background, white text' },
        ].map((row) => (
          <Box key={row.element} sx={{ display: 'flex', gap: 2, alignItems: 'baseline' }}>
            <Typography variant="body2" fontWeight={600} sx={{ minWidth: 160 }}>
              {row.element}
            </Typography>
            <Typography variant="caption" sx={{ fontFamily: 'monospace', minWidth: 100 }}>
              {row.size}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {row.detail}
            </Typography>
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Platform indicators */}
      <ComponentPreview title="Platform Indicators" description="Messenger (purple) and Facebook (blue) platform dots.">
        <Box sx={{ display: 'flex', gap: 4 }}>
          {[
            { label: 'Messenger', color: colors.messenger.main },
            { label: 'Facebook', color: colors.facebook.main },
          ].map((p) => (
            <Box key={p.label} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: p.color }} />
              <Typography variant="body2">{p.label}</Typography>
              <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>{p.color}</Typography>
            </Box>
          ))}
        </Box>
      </ComponentPreview>

      <TokenTable
        title="Messenger Card Tokens"
        showPlatformColumns={true}
        tokens={[
          { name: 'messengerCard.width', value: `${componentSizes.messengerCard.card.width}px`, muiPath: 'custom component', mauiKey: 'WidthRequest=430', description: 'Card width' },
          { name: 'messengerCard.height', value: `${componentSizes.messengerCard.card.height}px`, muiPath: 'custom component', mauiKey: 'HeightRequest=108', description: 'Card height' },
          { name: 'messengerCard.checkbox', value: `${componentSizes.messengerCard.checkbox.size}px`, muiPath: 'Checkbox iconSize', mauiKey: 'WidthRequest=23', description: 'Checkbox size' },
          { name: 'messengerCard.shadow', value: shadows.card, muiPath: 'Paper.boxShadow', mauiKey: 'HasShadow=True', description: 'Card shadow' },
          { name: 'messenger.main', value: colors.messenger.main, isColor: true, muiPath: 'palette.messenger', mauiKey: 'MessengerColor', description: 'Messenger brand' },
          { name: 'facebook.main', value: colors.facebook.main, isColor: true, muiPath: 'palette.facebook', mauiKey: 'FacebookColor', description: 'Facebook brand' },
          { name: 'badge.main', value: colors.badge.main, isColor: true, muiPath: 'MuiBadge.colorError', mauiKey: 'SfBadgeNormalBackground', description: 'Unread badge color' },
          { name: 'selected.bg', value: colors.info.background!, isColor: true, muiPath: 'custom sx', mauiKey: 'SfListViewSelectionBackground', description: 'Selected row highlight' },
        ]}
      />

      <CodeBlock
        web={`import { Box, Avatar, Checkbox, Chip, Typography } from '@mui/material';

function MessengerCard({ name, message, time, unread, selected }) {
  return (
    <Box sx={{
      width: 430,
      height: 108,
      bgcolor: selected ? '#DEEFF9' : '#fff',
      borderRadius: '8px',
      boxShadow: '0px 4px 16px rgba(32,43,63,0.08)',
      display: 'flex',
      alignItems: 'center',
      px: 2,
      gap: 1.5,
    }}>
      <Checkbox size="small" checked={selected} />
      <Avatar sx={{ width: 40, height: 40 }}>{name[0]}</Avatar>

      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <Typography variant="body2" fontWeight={unread ? 700 : 500} noWrap>
          {name}
        </Typography>
        <Typography variant="caption" noWrap>{message}</Typography>
      </Box>

      <Box sx={{ textAlign: 'right' }}>
        <Typography variant="caption">{time}</Typography>
        {unread > 0 && (
          <Chip label={unread}
            sx={{ height: 18, bgcolor: '#C32828', color: '#fff', fontSize: 10 }} />
        )}
      </Box>
    </Box>
  );
}`}
        mobile={`<!-- Messenger Card — .NET MAUI -->
<Frame WidthRequest="430"
       HeightRequest="108"
       CornerRadius="8"
       HasShadow="True"
       Padding="16"
       BackgroundColor="{DynamicResource PageBackgroundColor}">
    <Grid ColumnDefinitions="Auto,Auto,*,Auto"
          ColumnSpacing="12">
        <!-- Checkbox -->
        <CheckBox Grid.Column="0"
                  WidthRequest="23" HeightRequest="23" />

        <!-- Avatar -->
        <Frame Grid.Column="1"
               WidthRequest="40" HeightRequest="40"
               CornerRadius="20"
               BackgroundColor="{DynamicResource PrimaryColor}"
               Padding="0">
            <Label Text="JD" TextColor="White"
                   HorizontalOptions="Center"
                   VerticalOptions="Center" />
        </Frame>

        <!-- Content -->
        <VerticalStackLayout Grid.Column="2" Spacing="2">
            <Label Text="Sarah Johnson"
                   FontAttributes="Bold"
                   Style="{DynamicResource Body1}" />
            <Label Text="Hey, I wanted to check in..."
                   Style="{DynamicResource Caption}"
                   LineBreakMode="TailTruncation" />
        </VerticalStackLayout>

        <!-- Badge -->
        <syncfusion:SfBadgeView Grid.Column="3"
                                BadgeText="3"
                                Background="{DynamicResource BadgeColor}" />
    </Grid>
</Frame>`}
      />
    </Box>
  );
}
