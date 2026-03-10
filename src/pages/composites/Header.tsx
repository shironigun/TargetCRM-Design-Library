import { Box, Typography, Avatar, IconButton, Badge, Chip, Divider } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import PageHeader from '../../components/docs/PageHeader';
import ComponentPreview from '../../components/docs/ComponentPreview';
import CodeBlock from '../../components/docs/CodeBlock';
import TokenTable from '../../components/docs/TokenTable';
import { colors, borderRadius, componentSizes } from '../../theme/tokens';

function HeaderBar({ variant = 'full' }: { variant?: 'full' | 'minimal' }) {
  return (
    <Box
      sx={{
        height: componentSizes.header.height,
        bgcolor: colors.background.default,
        borderBottom: `1px solid ${colors.neutral[200]}`,
        display: 'flex',
        alignItems: 'center',
        px: 2,
        gap: 2,
        width: '100%',
      }}
    >
      {/* Logo */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: `${borderRadius.xs}px`,
            bgcolor: colors.brand.gold,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="subtitle2" fontWeight={700} sx={{ color: '#fff' }}>
            T
          </Typography>
        </Box>
        {variant === 'full' && (
          <Typography variant="subtitle1" fontWeight={600} sx={{ color: colors.text.primary }}>
            TargetCRM
          </Typography>
        )}
      </Box>

      {/* Navigation chips */}
      {variant === 'full' && (
        <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
          <Chip
            label="Contacts"
            size="small"
            sx={{
              height: componentSizes.headerChip.height,
              borderRadius: `${borderRadius.xl}px`,
              bgcolor: colors.primary.main,
              color: colors.text.inverse,
              fontWeight: 600,
            }}
          />
          <Chip
            label="Deals"
            size="small"
            variant="outlined"
            sx={{
              height: componentSizes.headerChip.height,
              borderRadius: `${borderRadius.xl}px`,
            }}
          />
          <Chip
            label="Messages"
            size="small"
            variant="outlined"
            sx={{
              height: componentSizes.headerChip.height,
              borderRadius: `${borderRadius.xl}px`,
            }}
          />
        </Box>
      )}

      <Box sx={{ flex: 1 }} />

      {/* Search */}
      <IconButton size="small" sx={{ color: colors.neutral[500] }}>
        <SearchIcon />
      </IconButton>

      {/* Notifications */}
      <Badge
        badgeContent={3}
        color="error"
        sx={{
          '& .MuiBadge-badge': {
            width: componentSizes.notificationBadge.size,
            height: componentSizes.notificationBadge.size,
            fontSize: 10,
            minWidth: componentSizes.notificationBadge.size,
          },
        }}
      >
        <IconButton size="small" sx={{ color: colors.neutral[500] }}>
          <NotificationsIcon />
        </IconButton>
      </Badge>

      {/* User profile */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Avatar
          sx={{
            width: componentSizes.avatar.size,
            height: componentSizes.avatar.size,
            bgcolor: colors.primary.main,
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          JD
        </Avatar>
        {variant === 'full' && (
          <>
            <Typography variant="body2" fontWeight={500} sx={{ ml: 0.5 }}>
              John Doe
            </Typography>
            <ArrowDropDownIcon sx={{ color: colors.neutral[400], fontSize: 20 }} />
          </>
        )}
      </Box>
    </Box>
  );
}

export default function Header() {
  return (
    <Box>
      <PageHeader
        title="Header"
        description={`Application header composite from Header.svg. Fixed height: ${componentSizes.header.height}px with brand logo, navigation chips, notifications, and user profile.`}
      />

      {/* Full header */}
      <ComponentPreview title="Full Header" description="Complete header with navigation, search, notifications, and user profile.">
        <Box sx={{ width: '100%', border: `1px solid ${colors.neutral[100]}`, borderRadius: `${borderRadius.default}px`, overflow: 'hidden' }}>
          <HeaderBar variant="full" />
        </Box>
      </ComponentPreview>

      {/* Minimal header */}
      <ComponentPreview title="Minimal Header" description="Condensed header for narrow layouts or mobile.">
        <Box sx={{ width: '100%', maxWidth: 400, border: `1px solid ${colors.neutral[100]}`, borderRadius: `${borderRadius.default}px`, overflow: 'hidden' }}>
          <HeaderBar variant="minimal" />
        </Box>
      </ComponentPreview>

      {/* Anatomy */}
      <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>
        Header Anatomy
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
        {[
          { label: 'Logo Area', desc: 'Brand gold square (28×28) + app name' },
          { label: 'Navigation Chips', desc: `Header chip height: ${componentSizes.headerChip.height}px, border-radius: ${borderRadius.xl}px` },
          { label: 'Notification Badge', desc: `${componentSizes.notificationBadge.size}px circle, error-red background` },
          { label: 'User Avatar', desc: `${componentSizes.avatar.size}×${componentSizes.avatar.size}px, border-radius: ${borderRadius.avatar}px (circle)` },
        ].map((item) => (
          <Box key={item.label} sx={{ display: 'flex', gap: 2, alignItems: 'baseline' }}>
            <Typography variant="body2" fontWeight={600} sx={{ minWidth: 160 }}>
              {item.label}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.desc}
            </Typography>
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Sub-components */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Sub-Components
      </Typography>

      <ComponentPreview title="Navigation Chips" description="Active + inactive states for section switching.">
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip
            label="Active"
            sx={{
              height: componentSizes.headerChip.height,
              borderRadius: `${borderRadius.xl}px`,
              bgcolor: colors.primary.main,
              color: colors.text.inverse,
              fontWeight: 600,
            }}
          />
          <Chip
            label="Inactive"
            variant="outlined"
            sx={{
              height: componentSizes.headerChip.height,
              borderRadius: `${borderRadius.xl}px`,
            }}
          />
        </Box>
      </ComponentPreview>

      <ComponentPreview title="Notification Badge" description="Badge on bell icon with count.">
        <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <Badge badgeContent={3} color="error">
            <NotificationsIcon sx={{ color: colors.neutral[500] }} />
          </Badge>
          <Badge badgeContent={99} color="error">
            <NotificationsIcon sx={{ color: colors.neutral[500] }} />
          </Badge>
          <Badge variant="dot" color="error">
            <NotificationsIcon sx={{ color: colors.neutral[500] }} />
          </Badge>
        </Box>
      </ComponentPreview>

      <TokenTable
        title="Header Tokens"
        showPlatformColumns={true}
        tokens={[
          { name: 'header.height', value: `${componentSizes.header.height}px`, muiPath: 'AppBar.height', mauiKey: 'HeightRequest=60', description: 'Fixed header height' },
          { name: 'headerChip.height', value: `${componentSizes.headerChip.height}px`, muiPath: 'Chip sx', mauiKey: 'HeightRequest=28', description: 'Navigation chip height' },
          { name: 'headerChip.borderRadius', value: `${borderRadius.xl}px`, muiPath: 'Chip sx', mauiKey: 'CornerRadius=14', description: 'Header chip radius' },
          { name: 'avatar.size', value: `${componentSizes.avatar.size}px`, muiPath: 'MuiAvatar.root', mauiKey: 'WidthRequest=40', description: 'Avatar dimensions' },
          { name: 'notificationBadge.size', value: `${componentSizes.notificationBadge.size}px`, muiPath: 'MuiBadge.badge', mauiKey: 'SfBadgeSize=18', description: 'Badge size' },
          { name: 'header.border', value: colors.neutral[200], isColor: true, muiPath: 'AppBar.borderBottom', mauiKey: 'Stroke', description: 'Bottom border color' },
          { name: 'brand.gold', value: colors.brand.gold, isColor: true, muiPath: 'logo sx', mauiKey: 'Background', description: 'Brand logo background' },
        ]}
      />

      <CodeBlock
        web={`import { AppBar, Toolbar, Avatar, Badge, Chip, IconButton } from '@mui/material';
import { Notifications, Search } from '@mui/icons-material';

function AppHeader() {
  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={0}
      sx={{ height: 60, borderBottom: '1px solid #D9D9D9' }}
    >
      <Toolbar sx={{ gap: 2 }}>
        {/* Brand logo */}
        <Box sx={{ width: 28, height: 28, bgcolor: '#EFB310', borderRadius: 2 }}>
          <Typography color="#fff" fontWeight={700}>T</Typography>
        </Box>

        {/* Nav chips */}
        <Chip label="Contacts" color="primary" sx={{ height: 28, borderRadius: '14px' }} />
        <Chip label="Deals" variant="outlined" sx={{ height: 28, borderRadius: '14px' }} />

        <Box sx={{ flex: 1 }} />

        <IconButton><Search /></IconButton>
        <Badge badgeContent={3} color="error">
          <IconButton><Notifications /></IconButton>
        </Badge>
        <Avatar sx={{ width: 40, height: 40 }}>JD</Avatar>
      </Toolbar>
    </AppBar>
  );
}`}
        mobile={`<!-- .NET MAUI Header -->
<Grid HeightRequest="60"
      ColumnDefinitions="Auto,*,Auto,Auto,Auto"
      Padding="16,0"
      BackgroundColor="{DynamicResource PageBackgroundColor}">

    <!-- Brand logo -->
    <Frame Grid.Column="0"
           WidthRequest="28" HeightRequest="28"
           CornerRadius="2"
           BackgroundColor="{DynamicResource BrandGoldColor}"
           Padding="0">
        <Label Text="T" TextColor="White"
               FontAttributes="Bold"
               HorizontalOptions="Center"
               VerticalOptions="Center" />
    </Frame>

    <!-- Navigation chips -->
    <syncfusion:SfChipGroup Grid.Column="1"
                            Type="Choice"
                            ItemHeight="28">
        <syncfusion:SfChip Text="Contacts"
                           Background="{DynamicResource PrimaryColor}"
                           TextColor="White" />
        <syncfusion:SfChip Text="Deals"
                           Background="Transparent"
                           Stroke="{DynamicResource Neutral200}" />
    </syncfusion:SfChipGroup>

    <!-- Notifications -->
    <ImageButton Grid.Column="3"
                 Source="bell_icon.png"
                 WidthRequest="24" HeightRequest="24" />

    <!-- Avatar -->
    <Frame Grid.Column="4"
           WidthRequest="40" HeightRequest="40"
           CornerRadius="20"
           BackgroundColor="{DynamicResource PrimaryColor}"
           Padding="0">
        <Label Text="JD" TextColor="White"
               HorizontalOptions="Center"
               VerticalOptions="Center" />
    </Frame>
</Grid>`}
      />
    </Box>
  );
}
