import { Box, Typography, TextField, Tabs, Tab, IconButton, List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import NoteIcon from '@mui/icons-material/Note';
import EventIcon from '@mui/icons-material/Event';
import PageHeader from '../../components/docs/PageHeader';
import ComponentPreview from '../../components/docs/ComponentPreview';
import CodeBlock from '../../components/docs/CodeBlock';
import TokenTable from '../../components/docs/TokenTable';
import { colors, borderRadius, componentSizes } from '../../theme/tokens';

const quickActions = [
  { icon: <CallIcon />, label: 'Call', color: colors.success.main },
  { icon: <EmailIcon />, label: 'Email', color: colors.info.main },
  { icon: <NoteIcon />, label: 'Note', color: colors.warning.main },
  { icon: <EventIcon />, label: 'Event', color: colors.primary.main },
];

export default function QuickActions() {
  return (
    <Box>
      <PageHeader
        title="Quick Actions"
        description={`Quick access panel from Quick Actions.svg. Header: ${componentSizes.quickAction.headerHeight}px, search bar: ${componentSizes.quickAction.searchBar.width}×${componentSizes.quickAction.searchBar.height}px, tab indicator: ${componentSizes.quickAction.tabIndicator.height}px thick.`}
      />

      {/* Full panel demo */}
      <ComponentPreview title="Quick Actions Panel" description="Complete panel with header, search, tabs, and action list.">
        <Box
          sx={{
            width: '100%',
            maxWidth: 400,
            bgcolor: colors.background.default,
            border: `1px solid ${colors.neutral[200]}`,
            borderRadius: `${borderRadius.xl}px`,
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              height: componentSizes.quickAction.headerHeight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2,
              borderBottom: `1px solid ${colors.neutral[100]}`,
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              Quick Actions
            </Typography>
            <IconButton size="small" color="primary">
              <AddIcon />
            </IconButton>
          </Box>

          {/* Search bar */}
          <Box sx={{ p: 2 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search contacts, deals..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: colors.neutral[400], fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: componentSizes.quickAction.searchBar.height,
                  borderRadius: `${borderRadius.search}px`,
                },
              }}
            />
          </Box>

          {/* Tabs */}
          <Tabs
            value={0}
            variant="fullWidth"
            sx={{
              '& .MuiTabs-indicator': {
                height: componentSizes.quickAction.tabIndicator.height,
              },
            }}
          >
            <Tab label="All" />
            <Tab label="Contacts" />
            <Tab label="Deals" />
          </Tabs>

          <Divider />

          {/* Action buttons */}
          <Box sx={{ display: 'flex', gap: 2, p: 2, justifyContent: 'center' }}>
            {quickActions.map((action) => (
              <Box key={action.label} sx={{ textAlign: 'center' }}>
                <IconButton
                  sx={{
                    bgcolor: action.color,
                    color: '#fff',
                    '&:hover': { bgcolor: action.color, opacity: 0.9 },
                    width: 44,
                    height: 44,
                  }}
                >
                  {action.icon}
                </IconButton>
                <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                  {action.label}
                </Typography>
              </Box>
            ))}
          </Box>

          <Divider />

          {/* Recent items */}
          <List dense sx={{ maxHeight: 200 }}>
            {[
              { name: 'John Smith', desc: 'Last contacted 2h ago', avatar: 'JS' },
              { name: 'Acme Corp Deal', desc: '$45,000 — Negotiation', avatar: 'AC' },
              { name: 'Sarah Connor', desc: 'Follow-up scheduled', avatar: 'SC' },
            ].map((item, i) => (
              <ListItem key={i} sx={{ '&:hover': { bgcolor: colors.neutral[50] }, cursor: 'pointer' }}>
                <ListItemAvatar>
                  <Avatar sx={{ width: 36, height: 36, fontSize: 13, bgcolor: colors.primary.main }}>
                    {item.avatar}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={item.desc}
                  primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                  secondaryTypographyProps={{ variant: 'caption' }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </ComponentPreview>

      {/* Search bar isolated */}
      <ComponentPreview title="Search Bar" description={`${componentSizes.quickAction.searchBar.height}px tall with ${borderRadius.search}px pill radius.`}>
        <TextField
          placeholder="Search contacts, deals..."
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: colors.neutral[400] }} />
              </InputAdornment>
            ),
          }}
          sx={{
            width: componentSizes.quickAction.searchBar.width,
            '& .MuiOutlinedInput-root': {
              height: componentSizes.quickAction.searchBar.height,
              borderRadius: `${borderRadius.search}px`,
            },
          }}
        />
      </ComponentPreview>

      {/* Tab indicator */}
      <ComponentPreview title="Tab Indicator" description={`${componentSizes.quickAction.tabIndicator.height}px thick, primary blue.`}>
        <Tabs
          value={0}
          sx={{
            minWidth: 340,
            '& .MuiTabs-indicator': {
              height: componentSizes.quickAction.tabIndicator.height,
            },
          }}
        >
          <Tab label="All" />
          <Tab label="Contacts" />
          <Tab label="Deals" />
        </Tabs>
      </ComponentPreview>

      {/* Quick action buttons */}
      <ComponentPreview title="Action Buttons" description="Circular icon buttons for primary actions.">
        <Box sx={{ display: 'flex', gap: 3 }}>
          {quickActions.map((action) => (
            <Box key={action.label} sx={{ textAlign: 'center' }}>
              <IconButton
                sx={{
                  bgcolor: action.color,
                  color: '#fff',
                  '&:hover': { bgcolor: action.color, opacity: 0.9 },
                  width: 44,
                  height: 44,
                }}
              >
                {action.icon}
              </IconButton>
              <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                {action.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </ComponentPreview>

      {/* Scrollbar */}
      <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>
        Scrollbar
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Box
          sx={{
            width: componentSizes.quickAction.scrollbarThumb.width,
            height: 60,
            bgcolor: colors.neutral[300],
            borderRadius: `${borderRadius.full}px`,
          }}
        />
        <Typography variant="body2">
          Scrollbar thumb: {componentSizes.quickAction.scrollbarThumb.width}px wide, neutral-300, fully rounded
        </Typography>
      </Box>

      <TokenTable
        title="Quick Actions Tokens"
        showPlatformColumns={true}
        tokens={[
          { name: 'quickAction.headerHeight', value: `${componentSizes.quickAction.headerHeight}px`, muiPath: 'Box sx', mauiKey: 'HeightRequest=60', description: 'Panel header height' },
          { name: 'quickAction.searchBar.width', value: `${componentSizes.quickAction.searchBar.width}px`, muiPath: 'TextField sx', mauiKey: 'WidthRequest=335', description: 'Search bar width' },
          { name: 'quickAction.searchBar.height', value: `${componentSizes.quickAction.searchBar.height}px`, muiPath: 'TextField sx', mauiKey: 'HeightRequest=49', description: 'Search bar height' },
          { name: 'quickAction.searchBar.radius', value: `${borderRadius.search}px`, muiPath: 'OutlinedInput.borderRadius', mauiKey: 'CornerRadius=24.5', description: 'Search bar pill radius' },
          { name: 'quickAction.tabIndicator.height', value: `${componentSizes.quickAction.tabIndicator.height}px`, muiPath: 'MuiTabs.indicator.height', mauiKey: 'SfTabViewIndicatorHeight', description: 'Tab indicator thickness' },
          { name: 'quickAction.scrollbar.width', value: `${componentSizes.quickAction.scrollbarThumb.width}px`, muiPath: '::-webkit-scrollbar', mauiKey: 'ScrollBarThumbWidth=8', description: 'Scrollbar thumb width' },
        ]}
      />

      <CodeBlock
        web={`import { Box, TextField, Tabs, Tab, IconButton, List } from '@mui/material';
import { Search, Call, Email, Note, Event } from '@mui/icons-material';

function QuickActionsPanel() {
  return (
    <Box sx={{ width: 400, border: '1px solid #D9D9D9', borderRadius: '14px' }}>
      {/* Header */}
      <Box sx={{ height: 60, display: 'flex', alignItems: 'center', px: 2 }}>
        <Typography variant="h6">Quick Actions</Typography>
      </Box>

      {/* Search */}
      <TextField
        fullWidth
        size="small"
        placeholder="Search..."
        InputProps={{ startAdornment: <Search /> }}
        sx={{
          mx: 2, my: 1,
          '& .MuiOutlinedInput-root': {
            height: 49,
            borderRadius: '24.5px',
          },
        }}
      />

      {/* Tabs */}
      <Tabs value={0} variant="fullWidth">
        <Tab label="All" />
        <Tab label="Contacts" />
        <Tab label="Deals" />
      </Tabs>

      {/* Action buttons grid */}
      <Box sx={{ display: 'flex', gap: 2, p: 2, justifyContent: 'center' }}>
        <IconButton sx={{ bgcolor: '#5BAE4C', color: '#fff' }}><Call /></IconButton>
        <IconButton sx={{ bgcolor: '#5BB0DF', color: '#fff' }}><Email /></IconButton>
        <IconButton sx={{ bgcolor: '#F9932F', color: '#fff' }}><Note /></IconButton>
        <IconButton sx={{ bgcolor: '#0055A4', color: '#fff' }}><Event /></IconButton>
      </Box>
    </Box>
  );
}`}
        mobile={`<!-- Quick Actions Panel — .NET MAUI -->
<VerticalStackLayout>
    <!-- Header -->
    <Grid HeightRequest="60" Padding="16,0">
        <Label Text="Quick Actions"
               Style="{DynamicResource Heading2}"
               VerticalOptions="Center" />
    </Grid>

    <!-- Search Bar -->
    <syncfusion:SfTextInputLayout
        Hint="Search..."
        ContainerType="Outlined"
        HelperText=""
        CornerRadius="24.5"
        HeightRequest="49"
        Margin="16,0">
        <Entry />
    </syncfusion:SfTextInputLayout>

    <!-- Tabs -->
    <syncfusion:SfTabView
        TabBarHeight="40"
        SelectionIndicatorSettings="{OnPlatform
            Default='{syncfusion:SelectionIndicator Height=2}'}"
        IndicatorColor="{DynamicResource PrimaryColor}">
        <syncfusion:SfTabItem Header="All" />
        <syncfusion:SfTabItem Header="Contacts" />
        <syncfusion:SfTabItem Header="Deals" />
    </syncfusion:SfTabView>

    <!-- Quick Action Buttons -->
    <HorizontalStackLayout Spacing="16" Padding="16"
                           HorizontalOptions="Center">
        <ImageButton Source="call.png"
                     BackgroundColor="{DynamicResource SuccessColor}"
                     CornerRadius="22"
                     WidthRequest="44" HeightRequest="44" />
        <ImageButton Source="email.png"
                     BackgroundColor="{DynamicResource InfoColor}"
                     CornerRadius="22"
                     WidthRequest="44" HeightRequest="44" />
    </HorizontalStackLayout>
</VerticalStackLayout>`}
      />
    </Box>
  );
}
