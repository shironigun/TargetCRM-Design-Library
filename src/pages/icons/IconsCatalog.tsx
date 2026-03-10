import { useState } from 'react';
import { Box, Typography, TextField, InputAdornment, Chip, Tooltip, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// MUI Icons used in TargetCRM
import HomeIcon from '@mui/icons-material/Home';
import ContactsIcon from '@mui/icons-material/Contacts';
import HandshakeIcon from '@mui/icons-material/Handshake';
import MessageIcon from '@mui/icons-material/Message';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIconMui from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import NoteIcon from '@mui/icons-material/Note';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import BusinessIcon from '@mui/icons-material/Business';
import PhoneIcon from '@mui/icons-material/Phone';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FlagIcon from '@mui/icons-material/Flag';
import LabelIcon from '@mui/icons-material/Label';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LinkIcon from '@mui/icons-material/Link';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import RefreshIcon from '@mui/icons-material/Refresh';
import FacebookIcon from '@mui/icons-material/Facebook';
import ComputerIcon from '@mui/icons-material/Computer';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import DashboardIcon from '@mui/icons-material/Dashboard';

import PageHeader from '../../components/docs/PageHeader';
import ComponentPreview from '../../components/docs/ComponentPreview';
import CodeBlock from '../../components/docs/CodeBlock';
import { colors, borderRadius, componentSizes } from '../../theme/tokens';

interface IconEntry {
  icon: React.ReactElement;
  name: string;
  category: string;
}

const iconCatalog: IconEntry[] = [
  // Navigation
  { icon: <HomeIcon />, name: 'Home', category: 'Navigation' },
  { icon: <DashboardIcon />, name: 'Dashboard', category: 'Navigation' },
  { icon: <ContactsIcon />, name: 'Contacts', category: 'Navigation' },
  { icon: <HandshakeIcon />, name: 'Handshake', category: 'Navigation' },
  { icon: <MessageIcon />, name: 'Message', category: 'Navigation' },
  { icon: <CalendarTodayIcon />, name: 'CalendarToday', category: 'Navigation' },
  { icon: <BarChartIcon />, name: 'BarChart', category: 'Navigation' },
  { icon: <SettingsIcon />, name: 'Settings', category: 'Navigation' },
  { icon: <ChevronLeftIcon />, name: 'ChevronLeft', category: 'Navigation' },
  { icon: <ChevronRightIcon />, name: 'ChevronRight', category: 'Navigation' },
  { icon: <ExpandMoreIcon />, name: 'ExpandMore', category: 'Navigation' },

  // Actions
  { icon: <AddIcon />, name: 'Add', category: 'Action' },
  { icon: <EditIcon />, name: 'Edit', category: 'Action' },
  { icon: <DeleteIcon />, name: 'Delete', category: 'Action' },
  { icon: <CloseIcon />, name: 'Close', category: 'Action' },
  { icon: <CheckIcon />, name: 'Check', category: 'Action' },
  { icon: <SearchIconMui />, name: 'Search', category: 'Action' },
  { icon: <FilterListIcon />, name: 'FilterList', category: 'Action' },
  { icon: <SortIcon />, name: 'Sort', category: 'Action' },
  { icon: <RefreshIcon />, name: 'Refresh', category: 'Action' },
  { icon: <DownloadIcon />, name: 'Download', category: 'Action' },
  { icon: <UploadIcon />, name: 'Upload', category: 'Action' },
  { icon: <DragIndicatorIcon />, name: 'DragIndicator', category: 'Action' },

  // Communication
  { icon: <SendIcon />, name: 'Send', category: 'Communication' },
  { icon: <AttachFileIcon />, name: 'AttachFile', category: 'Communication' },
  { icon: <EmojiEmotionsIcon />, name: 'EmojiEmotions', category: 'Communication' },
  { icon: <CallIcon />, name: 'Call', category: 'Communication' },
  { icon: <EmailIcon />, name: 'Email', category: 'Communication' },
  { icon: <PhoneIcon />, name: 'Phone', category: 'Communication' },
  { icon: <ShareIcon />, name: 'Share', category: 'Communication' },
  { icon: <LinkIcon />, name: 'Link', category: 'Communication' },

  // People / CRM
  { icon: <PersonIcon />, name: 'Person', category: 'CRM' },
  { icon: <GroupIcon />, name: 'Group', category: 'CRM' },
  { icon: <BusinessIcon />, name: 'Business', category: 'CRM' },
  { icon: <NoteIcon />, name: 'Note', category: 'CRM' },
  { icon: <EventIcon />, name: 'Event', category: 'CRM' },
  { icon: <StarIcon />, name: 'Star', category: 'CRM' },
  { icon: <StarBorderIcon />, name: 'StarBorder', category: 'CRM' },
  { icon: <FlagIcon />, name: 'Flag', category: 'CRM' },
  { icon: <LabelIcon />, name: 'Label', category: 'CRM' },

  // Status
  { icon: <InfoIcon />, name: 'Info', category: 'Status' },
  { icon: <WarningIcon />, name: 'Warning', category: 'Status' },
  { icon: <ErrorIcon />, name: 'Error', category: 'Status' },
  { icon: <CheckCircleIcon />, name: 'CheckCircle', category: 'Status' },
  { icon: <NotificationsIcon />, name: 'Notifications', category: 'Status' },
  { icon: <VisibilityIcon />, name: 'Visibility', category: 'Status' },
  { icon: <VisibilityOffIcon />, name: 'VisibilityOff', category: 'Status' },

  // Misc
  { icon: <MoreVertIcon />, name: 'MoreVert', category: 'Misc' },
  { icon: <MoreHorizIcon />, name: 'MoreHoriz', category: 'Misc' },
  { icon: <FacebookIcon />, name: 'Facebook', category: 'Misc' },
  { icon: <ComputerIcon />, name: 'Computer', category: 'Misc' },
  { icon: <PhoneAndroidIcon />, name: 'PhoneAndroid', category: 'Misc' },
];

const categories = [...new Set(iconCatalog.map((i) => i.category))];

function IconCard({ entry }: { entry: IconEntry }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`<${entry.name}Icon />`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Tooltip title={copied ? 'Copied!' : `<${entry.name}Icon />`} arrow>
      <Box
        onClick={handleCopy}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0.5,
          p: 1.5,
          borderRadius: `${borderRadius.default}px`,
          border: `1px solid ${colors.neutral[100]}`,
          cursor: 'pointer',
          transition: 'all 0.15s',
          '&:hover': {
            bgcolor: colors.neutral[50],
            borderColor: colors.primary.main,
            '& .MuiSvgIcon-root': { color: colors.primary.main },
          },
        }}
      >
        <Box sx={{ color: colors.neutral[700], fontSize: 24, display: 'flex' }}>
          {entry.icon}
        </Box>
        <Typography variant="caption" noWrap sx={{ maxWidth: 80, textAlign: 'center', fontSize: 10 }}>
          {entry.name}
        </Typography>
      </Box>
    </Tooltip>
  );
}

export default function IconsCatalog() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = iconCatalog.filter((entry) => {
    const matchesSearch = !search || entry.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !activeCategory || entry.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Box>
      <PageHeader
        title="Icons & Logos"
        description="Icon catalog using @mui/icons-material for web. All icons are from Google's Material Design icon set. Click any icon to copy its import."
      />

      {/* Brand logos */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Brand Logos
      </Typography>
      <Box sx={{ display: 'flex', gap: 4, mb: 4, flexWrap: 'wrap', alignItems: 'flex-end' }}>
        {/* Full logo */}
        <Box sx={{ textAlign: 'center' }}>
          <Box
            sx={{
              width: componentSizes.logo.full.width,
              height: componentSizes.logo.full.height,
              bgcolor: colors.background.paper,
              borderRadius: `${borderRadius.default}px`,
              border: `1px solid ${colors.neutral[200]}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: `${borderRadius.xs}px`,
                bgcolor: colors.brand.gold,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h5" fontWeight={700} color="#fff">T</Typography>
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={700} sx={{ color: colors.brand.navy, lineHeight: 1.2 }}>
                TargetCRM
              </Typography>
              <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                Notify360
              </Typography>
            </Box>
          </Box>
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            Full Logo ({componentSizes.logo.full.width}×{componentSizes.logo.full.height})
          </Typography>
        </Box>

        {/* Compact logo */}
        <Box sx={{ textAlign: 'center' }}>
          <Box
            sx={{
              width: componentSizes.logo.compact.width,
              height: componentSizes.logo.compact.height,
              bgcolor: colors.background.paper,
              borderRadius: `${borderRadius.default}px`,
              border: `1px solid ${colors.neutral[200]}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: `${borderRadius.xs}px`,
                bgcolor: colors.brand.gold,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="subtitle1" fontWeight={700} color="#fff">T</Typography>
            </Box>
            <Typography variant="subtitle1" fontWeight={700} sx={{ color: colors.brand.navy }}>
              TargetCRM
            </Typography>
          </Box>
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            Compact ({componentSizes.logo.compact.width}×{componentSizes.logo.compact.height})
          </Typography>
        </Box>

        {/* Icon-only */}
        <Box sx={{ textAlign: 'center' }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: `${borderRadius.xs}px`,
              bgcolor: colors.brand.gold,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h5" fontWeight={700} color="#fff">T</Typography>
          </Box>
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            Icon Only
          </Typography>
        </Box>
      </Box>

      {/* Brand colors */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        {[
          { label: 'Brand Gold', value: colors.brand.gold },
          { label: 'Brand Navy', value: colors.brand.navy },
        ].map((c) => (
          <Box key={c.label} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 24, height: 24, borderRadius: 1, bgcolor: c.value }} />
            <Typography variant="body2" fontWeight={500}>{c.label}</Typography>
            <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>{c.value}</Typography>
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Icon catalog */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Icon Catalog ({iconCatalog.length} icons)
      </Typography>

      {/* Search & filter */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size="small"
          placeholder="Search icons..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 18 }} />
              </InputAdornment>
            ),
          }}
          sx={{ width: 260 }}
        />
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Chip
            label="All"
            size="small"
            variant={activeCategory === null ? 'filled' : 'outlined'}
            color={activeCategory === null ? 'primary' : 'default'}
            onClick={() => setActiveCategory(null)}
          />
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              size="small"
              variant={activeCategory === cat ? 'filled' : 'outlined'}
              color={activeCategory === cat ? 'primary' : 'default'}
              onClick={() => setActiveCategory(cat)}
            />
          ))}
        </Box>
      </Box>

      {/* Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(88px, 1fr))',
          gap: 1,
          mb: 4,
        }}
      >
        {filtered.map((entry) => (
          <IconCard key={entry.name} entry={entry} />
        ))}
      </Box>

      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
          No icons found matching "{search}"
        </Typography>
      )}

      <Divider sx={{ my: 4 }} />

      {/* Sizes */}
      <ComponentPreview title="Icon Sizes" description="Standard icon sizes used across the design system.">
        <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-end' }}>
          {[
            { size: 'small', px: 16 },
            { size: 'default', px: 24 },
            { size: 'large', px: 32 },
          ].map((s) => (
            <Box key={s.size} sx={{ textAlign: 'center' }}>
              <HomeIcon sx={{ fontSize: s.px, color: colors.neutral[700] }} />
              <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                {s.size} ({s.px}px)
              </Typography>
            </Box>
          ))}
        </Box>
      </ComponentPreview>

      <CodeBlock
        web={`// Install @mui/icons-material
import { Home, Contacts, Handshake } from '@mui/icons-material';

// Usage
<Home />                      // Default 24px
<Home fontSize="small" />     // 16px
<Home fontSize="large" />     // 32px
<Home sx={{ fontSize: 40 }}  // Custom size
       color="primary" />     // Theme color

// Import pattern
import HomeIcon from '@mui/icons-material/Home';
// or tree-shakeable named import:
import { Home } from '@mui/icons-material';`}
        mobile={`<!-- .NET MAUI Icons -->
<!-- Option 1: Font icons (recommended) -->
<Label Text="&#xE88A;"
       FontFamily="MaterialIcons"
       FontSize="24"
       TextColor="{DynamicResource PrimaryTextColor}" />

<!-- Option 2: Image assets -->
<Image Source="home.png"
       WidthRequest="24"
       HeightRequest="24" />

<!-- Option 3: Syncfusion built-in icons -->
<syncfusion:SfButton
    ImageSource="home.png"
    ShowIcon="True"
    Text=""
    WidthRequest="40"
    HeightRequest="40" />`}
      />
    </Box>
  );
}
