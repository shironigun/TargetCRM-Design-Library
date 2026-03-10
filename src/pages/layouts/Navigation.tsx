import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ContactsIcon from '@mui/icons-material/Contacts';
import HandshakeIcon from '@mui/icons-material/Handshake';
import MessageIcon from '@mui/icons-material/Message';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import PageHeader from '../../components/docs/PageHeader';
import ComponentPreview from '../../components/docs/ComponentPreview';
import CodeBlock from '../../components/docs/CodeBlock';
import { colors, borderRadius } from '../../theme/tokens';

const navItems = [
  { icon: <HomeIcon />, label: 'Dashboard', active: false },
  { icon: <ContactsIcon />, label: 'Contacts', active: true, badge: null },
  { icon: <HandshakeIcon />, label: 'Deals', active: false, badge: '12' },
  { icon: <MessageIcon />, label: 'Messages', active: false, badge: '3' },
  { icon: <CalendarTodayIcon />, label: 'Calendar', active: false },
  { icon: <BarChartIcon />, label: 'Reports', active: false },
  { icon: <SettingsIcon />, label: 'Settings', active: false },
];

function SideNav({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <Box
      sx={{
        width: collapsed ? 64 : 240,
        bgcolor: colors.background.default,
        borderRight: `1px solid ${colors.neutral[200]}`,
        height: 420,
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.2s',
      }}
    >
      {/* Brand */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1.5, justifyContent: collapsed ? 'center' : 'flex-start' }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: `${borderRadius.xs}px`,
            bgcolor: colors.brand.gold,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Typography variant="subtitle2" fontWeight={700} color="#fff">
            T
          </Typography>
        </Box>
        {!collapsed && (
          <Typography variant="subtitle1" fontWeight={600}>
            TargetCRM
          </Typography>
        )}
      </Box>

      <Divider />

      {/* Nav items */}
      <List sx={{ flex: 1, px: 1, py: 1 }}>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding sx={{ mb: 0.25 }}>
            <ListItemButton
              selected={item.active}
              sx={{
                borderRadius: `${borderRadius.default}px`,
                minHeight: 40,
                px: collapsed ? 1.5 : 2,
                justifyContent: collapsed ? 'center' : 'flex-start',
                '&.Mui-selected': {
                  bgcolor: colors.primary.main,
                  color: colors.text.inverse,
                  '&:hover': { bgcolor: colors.primary.hover },
                  '& .MuiListItemIcon-root': { color: colors.text.inverse },
                },
                '&:hover': {
                  bgcolor: item.active ? colors.primary.hover : colors.neutral[50],
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: collapsed ? 0 : 36,
                  color: item.active ? colors.text.inverse : colors.neutral[500],
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              {!collapsed && (
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    variant: 'body2',
                    fontWeight: item.active ? 600 : 400,
                  }}
                />
              )}
              {!collapsed && item.badge && (
                <Box
                  sx={{
                    minWidth: 20,
                    height: 18,
                    borderRadius: `${borderRadius.full}px`,
                    bgcolor: item.active ? 'rgba(255,255,255,0.2)' : colors.badge.main,
                    color: item.active ? '#fff' : colors.badge.contrastText,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 10,
                    fontWeight: 700,
                    px: 0.5,
                  }}
                >
                  {item.badge}
                </Box>
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default function Navigation() {
  return (
    <Box>
      <PageHeader
        title="Navigation"
        description="Sidebar navigation layout pattern. Expanded (240px) and collapsed (64px) states with active selection, badges, and brand header."
      />

      {/* Expanded */}
      <ComponentPreview title="Expanded Navigation" description="Full sidebar with labels, badges, and active state.">
        <SideNav />
      </ComponentPreview>

      {/* Collapsed */}
      <ComponentPreview title="Collapsed Navigation" description="Icon-only mode for maximum content space.">
        <SideNav collapsed />
      </ComponentPreview>

      {/* Side by side */}
      <ComponentPreview title="Responsive Comparison" description="Expanded and collapsed side by side.">
        <Box sx={{ display: 'flex', gap: 2 }}>
          <SideNav />
          <SideNav collapsed />
        </Box>
      </ComponentPreview>

      {/* Active state anatomy */}
      <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>
        Navigation Item States
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 4, maxWidth: 300 }}>
        {[
          { label: 'Default', bg: 'transparent', color: colors.text.primary, iconColor: colors.neutral[500] },
          { label: 'Hover', bg: colors.neutral[50], color: colors.text.primary, iconColor: colors.neutral[500] },
          { label: 'Active', bg: colors.primary.main, color: colors.text.inverse, iconColor: colors.text.inverse },
          { label: 'Active + Hover', bg: colors.primary.hover, color: colors.text.inverse, iconColor: colors.text.inverse },
        ].map((state) => (
          <Box
            key={state.label}
            sx={{
              height: 40,
              borderRadius: `${borderRadius.default}px`,
              bgcolor: state.bg,
              display: 'flex',
              alignItems: 'center',
              px: 2,
              gap: 1.5,
            }}
          >
            <HomeIcon sx={{ color: state.iconColor, fontSize: 20 }} />
            <Typography variant="body2" fontWeight={500} sx={{ color: state.color, flex: 1 }}>
              {state.label}
            </Typography>
            <Typography variant="caption" sx={{ fontFamily: 'monospace', color: state.color, opacity: 0.7, fontSize: 10 }}>
              {state.bg === 'transparent' ? '—' : state.bg}
            </Typography>
          </Box>
        ))}
      </Box>

      <CodeBlock
        web={`import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Home, Contacts, Handshake, Message } from '@mui/icons-material';

function Sidebar({ collapsed }) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? 64 : 240,
        '& .MuiDrawer-paper': { width: collapsed ? 64 : 240 },
      }}
    >
      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.label}
            selected={item.active}
            sx={{
              borderRadius: '8px',
              mx: 1,
              '&.Mui-selected': {
                bgcolor: '#0055A4',
                color: '#fff',
                '&:hover': { bgcolor: '#014787' },
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            {!collapsed && <ListItemText primary={item.label} />}
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}`}
        mobile={`<!-- Navigation — .NET MAUI -->
<!-- Use Shell for top-level navigation -->
<Shell>
    <FlyoutItem Title="Dashboard" Icon="home.png">
        <ShellContent ContentTemplate="{DataTemplate local:DashboardPage}" />
    </FlyoutItem>

    <FlyoutItem Title="Contacts" Icon="contacts.png">
        <ShellContent ContentTemplate="{DataTemplate local:ContactsPage}" />
    </FlyoutItem>

    <FlyoutItem Title="Deals" Icon="deals.png">
        <ShellContent ContentTemplate="{DataTemplate local:DealsPage}" />
    </FlyoutItem>

    <FlyoutItem Title="Messages" Icon="messages.png">
        <ShellContent ContentTemplate="{DataTemplate local:MessagesPage}" />
    </FlyoutItem>
</Shell>

<!-- Or use SfTabView for bottom navigation -->
<syncfusion:SfTabView
    TabBarPlacement="Bottom"
    IndicatorColor="{DynamicResource PrimaryColor}">
    <syncfusion:SfTabItem Header="Home" ImageSource="home.png" />
    <syncfusion:SfTabItem Header="Contacts" ImageSource="contacts.png" />
    <syncfusion:SfTabItem Header="Deals" ImageSource="deals.png" />
    <syncfusion:SfTabItem Header="Messages" ImageSource="messages.png" />
</syncfusion:SfTabView>`}
      />
    </Box>
  );
}
