import { Box, Typography, Chip, Card, CardContent, Avatar, LinearProgress, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import PageHeader from '../../components/docs/PageHeader';
import ComponentPreview from '../../components/docs/ComponentPreview';
import CodeBlock from '../../components/docs/CodeBlock';
import TokenTable from '../../components/docs/TokenTable';
import { colors, borderRadius, componentSizes, shadows } from '../../theme/tokens';

interface DealCardProps {
  name: string;
  company: string;
  value: string;
  progress: number;
  avatar: string;
  priority?: 'high' | 'medium' | 'low';
}

function DealCard({ name, company, value, progress, avatar, priority = 'medium' }: DealCardProps) {
  const priorityColor = {
    high: colors.error.main,
    medium: colors.warning.main,
    low: colors.success.main,
  };

  return (
    <Card
      sx={{
        borderRadius: `${borderRadius.default}px`,
        boxShadow: shadows.card,
        cursor: 'grab',
        '&:hover': { boxShadow: '0px 6px 20px rgba(32, 43, 63, 0.12)' },
        transition: 'box-shadow 0.15s',
      }}
    >
      <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <DragIndicatorIcon sx={{ fontSize: 16, color: colors.neutral[300] }} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" fontWeight={600} noWrap>{name}</Typography>
            <Typography variant="caption" color="text.secondary">{company}</Typography>
          </Box>
          <Avatar sx={{ width: 28, height: 28, fontSize: 11, bgcolor: colors.primary.main }}>
            {avatar}
          </Avatar>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" fontWeight={600} color="primary">
            {value}
          </Typography>
          <Chip
            label={priority}
            size="small"
            sx={{
              height: 18,
              fontSize: 10,
              fontWeight: 600,
              bgcolor: `${priorityColor[priority]}20`,
              color: priorityColor[priority],
              textTransform: 'capitalize',
            }}
          />
        </Box>

        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: componentSizes.progressBar.height,
            borderRadius: `${borderRadius.full}px`,
            bgcolor: colors.neutral[100],
            '& .MuiLinearProgress-bar': {
              borderRadius: `${borderRadius.full}px`,
            },
          }}
        />
      </CardContent>
    </Card>
  );
}

interface PipelineColumnProps {
  title: string;
  count: number;
  total: string;
  color: string;
  deals: DealCardProps[];
}

function PipelineColumn({ title, count, total, color, deals }: PipelineColumnProps) {
  return (
    <Box
      sx={{
        width: 260,
        minWidth: 260,
        bgcolor: colors.neutral[50],
        borderRadius: `${borderRadius.xl}px`,
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100%',
      }}
    >
      {/* Column header */}
      <Box sx={{ p: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box sx={{ width: 4, height: 20, borderRadius: 2, bgcolor: color }} />
        <Typography variant="body2" fontWeight={600} sx={{ flex: 1 }}>
          {title}
        </Typography>
        <Chip
          label={count}
          size="small"
          sx={{ height: 20, minWidth: 20, fontSize: 11, fontWeight: 600, bgcolor: colors.neutral[200] }}
        />
        <IconButton size="small"><MoreHorizIcon sx={{ fontSize: 16 }} /></IconButton>
      </Box>

      <Typography variant="caption" color="text.secondary" sx={{ px: 1.5, mb: 1 }}>
        Total: {total}
      </Typography>

      {/* Deal cards */}
      <Box sx={{ flex: 1, overflow: 'auto', px: 1, pb: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
        {deals.map((deal, i) => (
          <DealCard key={i} {...deal} />
        ))}
      </Box>

      {/* Add button */}
      <Box
        sx={{
          p: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0.5,
          cursor: 'pointer',
          color: colors.text.secondary,
          '&:hover': { color: colors.primary.main },
          borderTop: `1px solid ${colors.neutral[200]}`,
        }}
      >
        <AddIcon sx={{ fontSize: 16 }} />
        <Typography variant="caption" fontWeight={500}>
          Add Deal
        </Typography>
      </Box>
    </Box>
  );
}

const pipelineData: PipelineColumnProps[] = [
  {
    title: 'Lead',
    count: 4,
    total: '$62,000',
    color: colors.info.main,
    deals: [
      { name: 'Website Redesign', company: 'Acme Corp', value: '$25,000', progress: 20, avatar: 'JD', priority: 'high' },
      { name: 'SEO Package', company: 'Beta Inc', value: '$12,000', progress: 10, avatar: 'MR', priority: 'low' },
      { name: 'App Development', company: 'Nova LLC', value: '$25,000', progress: 15, avatar: 'LC' },
    ],
  },
  {
    title: 'Qualified',
    count: 3,
    total: '$87,000',
    color: colors.primary.main,
    deals: [
      { name: 'CRM Integration', company: 'Tech Co', value: '$45,000', progress: 40, avatar: 'DP', priority: 'high' },
      { name: 'Email Campaign', company: 'Sales Pro', value: '$18,000', progress: 50, avatar: 'SJ', priority: 'medium' },
      { name: 'Data Migration', company: 'Cloud9', value: '$24,000', progress: 35, avatar: 'AW' },
    ],
  },
  {
    title: 'Negotiation',
    count: 2,
    total: '$55,000',
    color: colors.warning.main,
    deals: [
      { name: 'Enterprise Plan', company: 'BigCo', value: '$35,000', progress: 70, avatar: 'RK', priority: 'high' },
      { name: 'Support Upgrade', company: 'FastTrack', value: '$20,000', progress: 60, avatar: 'TM', priority: 'medium' },
    ],
  },
  {
    title: 'Closed Won',
    count: 2,
    total: '$72,000',
    color: colors.success.main,
    deals: [
      { name: 'Platform License', company: 'Mega Inc', value: '$52,000', progress: 100, avatar: 'NS', priority: 'high' },
      { name: 'Consulting Pack', company: 'StartUp.io', value: '$20,000', progress: 100, avatar: 'KL', priority: 'low' },
    ],
  },
];

export default function DealsPipeline() {
  return (
    <Box>
      <PageHeader
        title="Deals Pipeline"
        description="Kanban board layout for deal management. Columns represent pipeline stages; cards are draggable deal items with progress bars, priority chips, and assignee avatars."
      />

      {/* Full pipeline */}
      <ComponentPreview title="Pipeline Board" description="Four-stage kanban with deal cards.">
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            pb: 1,
            width: '100%',
            '&::-webkit-scrollbar': { height: 8 },
            '&::-webkit-scrollbar-thumb': {
              borderRadius: borderRadius.full,
              bgcolor: colors.neutral[300],
            },
          }}
        >
          {pipelineData.map((col) => (
            <PipelineColumn key={col.title} {...col} />
          ))}
        </Box>
      </ComponentPreview>

      {/* Single deal card */}
      <ComponentPreview title="Deal Card Anatomy" description="Individual deal card showing all sub-elements.">
        <Box sx={{ maxWidth: 260 }}>
          <DealCard
            name="Enterprise CRM Suite"
            company="Acme Corporation"
            value="$125,000"
            progress={65}
            avatar="JD"
            priority="high"
          />
        </Box>
      </ComponentPreview>

      {/* Progress bar */}
      <ComponentPreview title="Progress Bar" description={`${componentSizes.progressBar.width}×${componentSizes.progressBar.height}px with primary color fill.`}>
        <Box sx={{ width: 200, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {[0, 25, 50, 75, 100].map((v) => (
            <Box key={v} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <LinearProgress
                variant="determinate"
                value={v}
                sx={{
                  flex: 1,
                  height: componentSizes.progressBar.height,
                  borderRadius: borderRadius.full,
                  bgcolor: colors.neutral[100],
                  '& .MuiLinearProgress-bar': { borderRadius: borderRadius.full },
                }}
              />
              <Typography variant="caption" sx={{ minWidth: 32 }}>{v}%</Typography>
            </Box>
          ))}
        </Box>
      </ComponentPreview>

      {/* Priority chips */}
      <ComponentPreview title="Priority Chips" description="Semantic priority indicators.">
        <Box sx={{ display: 'flex', gap: 2 }}>
          {[
            { label: 'High', color: colors.error.main },
            { label: 'Medium', color: colors.warning.main },
            { label: 'Low', color: colors.success.main },
          ].map((p) => (
            <Chip
              key={p.label}
              label={p.label}
              size="small"
              sx={{
                height: 18,
                fontSize: 10,
                fontWeight: 600,
                bgcolor: `${p.color}20`,
                color: p.color,
              }}
            />
          ))}
        </Box>
      </ComponentPreview>

      {/* Stage colors */}
      <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>
        Stage Color Mapping
      </Typography>
      <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
        {pipelineData.map((col) => (
          <Box key={col.title} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 4, height: 20, borderRadius: 2, bgcolor: col.color }} />
            <Typography variant="body2" fontWeight={600}>{col.title}</Typography>
            <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>{col.color}</Typography>
          </Box>
        ))}
      </Box>

      <TokenTable
        title="Pipeline Tokens"
        showPlatformColumns={false}
        tokens={[
          { name: 'progressBar.height', value: `${componentSizes.progressBar.height}px`, description: 'Progress bar height' },
          { name: 'progressBar.width', value: `${componentSizes.progressBar.width}px`, description: 'Progress bar default width' },
          { name: 'card.borderRadius', value: `${borderRadius.default}px`, description: 'Deal card border-radius' },
          { name: 'card.shadow', value: shadows.card, description: 'Card shadow' },
          { name: 'column.borderRadius', value: `${borderRadius.xl}px`, description: 'Column container radius' },
          { name: 'column.bg', value: colors.neutral[50], isColor: true, description: 'Column background' },
        ]}
      />

      <CodeBlock
        web={`// Kanban pipeline layout
function DealsPipeline({ stages }) {
  return (
    <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto' }}>
      {stages.map(stage => (
        <Box key={stage.id} sx={{
          width: 260,
          bgcolor: '#F7F7F7',
          borderRadius: '14px',
        }}>
          {/* Stage header */}
          <Box sx={{ p: 1.5, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: 4, height: 20, bgcolor: stage.color }} />
            <Typography>{stage.title}</Typography>
            <Chip label={stage.count} size="small" />
          </Box>

          {/* Deal cards — draggable */}
          {stage.deals.map(deal => (
            <Card key={deal.id} sx={{
              mx: 1, mb: 1,
              borderRadius: '8px',
              boxShadow: '0px 4px 16px rgba(32,43,63,0.08)',
            }}>
              <CardContent>
                <Typography>{deal.name}</Typography>
                <Typography color="primary">{deal.value}</Typography>
                <LinearProgress value={deal.progress} sx={{ height: 3 }} />
              </CardContent>
            </Card>
          ))}
        </Box>
      ))}
    </Box>
  );
}`}
        mobile={`<!-- Deals Pipeline — .NET MAUI -->
<!-- Mobile uses a horizontally scrollable collection view -->
<ScrollView Orientation="Horizontal">
    <HorizontalStackLayout Spacing="12" Padding="16">

        <!-- Pipeline Column -->
        <Frame WidthRequest="260"
               CornerRadius="14"
               BackgroundColor="{DynamicResource Neutral50}"
               Padding="0">
            <VerticalStackLayout>
                <!-- Header -->
                <Grid Padding="12" ColumnDefinitions="Auto,*,Auto">
                    <BoxView Grid.Column="0"
                             WidthRequest="4" HeightRequest="20"
                             Color="{DynamicResource InfoColor}"
                             CornerRadius="2" />
                    <Label Grid.Column="1" Text="Lead"
                           FontAttributes="Bold" Margin="8,0" />
                    <syncfusion:SfBadgeView Grid.Column="2"
                                             BadgeText="4" />
                </Grid>

                <!-- Deal cards -->
                <syncfusion:SfListView ItemsSource="{Binding Deals}">
                    <syncfusion:SfListView.ItemTemplate>
                        <DataTemplate>
                            <Frame Margin="8,4"
                                   CornerRadius="8"
                                   HasShadow="True"
                                   Padding="12">
                                <VerticalStackLayout Spacing="4">
                                    <Label Text="{Binding Name}"
                                           FontAttributes="Bold" />
                                    <Label Text="{Binding Value}"
                                           TextColor="{DynamicResource PrimaryColor}" />
                                    <ProgressBar Progress="{Binding ProgressDecimal}"
                                                 ProgressColor="{DynamicResource PrimaryColor}"
                                                 HeightRequest="3" />
                                </VerticalStackLayout>
                            </Frame>
                        </DataTemplate>
                    </syncfusion:SfListView.ItemTemplate>
                </syncfusion:SfListView>
            </VerticalStackLayout>
        </Frame>

    </HorizontalStackLayout>
</ScrollView>`}
      />
    </Box>
  );
}
