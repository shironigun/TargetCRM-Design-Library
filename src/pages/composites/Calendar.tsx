import { Box, Typography, IconButton, Badge, Chip } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PageHeader from '../../components/docs/PageHeader';
import ComponentPreview from '../../components/docs/ComponentPreview';
import CodeBlock from '../../components/docs/CodeBlock';
import TokenTable from '../../components/docs/TokenTable';
import { colors, borderRadius, componentSizes, shadows } from '../../theme/tokens';
import { xamlSnippets } from '../../theme/maui-tokens';

const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const today = 15;
const selectedDate = 18;

// Mock calendar dates for June
const calendarDates = [
  [null, null, null, null, 1, 2, 3],
  [4, 5, 6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15, 16, 17],
  [18, 19, 20, 21, 22, 23, 24],
  [25, 26, 27, 28, 29, 30, null],
];

function CalendarWidget({ compact = false }: { compact?: boolean }) {
  const cellSize = compact ? 28 : 36;
  return (
    <Box
      sx={{
        width: compact ? 280 : componentSizes.calendar.card.width,
        bgcolor: colors.background.default,
        borderRadius: `${borderRadius.default}px`,
        boxShadow: shadows.card,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1.5,
        }}
      >
        <IconButton size="small" sx={{ color: colors.neutral[300] }}>
          <ChevronLeftIcon />
        </IconButton>
        <Typography variant="subtitle1" fontWeight={600}>
          June 2025
        </Typography>
        <IconButton size="small" sx={{ color: colors.neutral[300] }}>
          <ChevronRightIcon />
        </IconButton>
      </Box>

      {/* Day headers */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', px: 1 }}>
        {daysOfWeek.map((d, i) => (
          <Box key={i} sx={{ textAlign: 'center', py: 0.5 }}>
            <Typography variant="caption" color="text.secondary" fontWeight={600}>
              {d}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Date cells */}
      <Box sx={{ px: 1, pb: 1.5 }}>
        {calendarDates.map((week, wi) => (
          <Box key={wi} sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
            {week.map((date, di) => {
              const isToday = date === today;
              const isSelected = date === selectedDate;
              return (
                <Box
                  key={di}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: cellSize,
                    cursor: date ? 'pointer' : 'default',
                  }}
                >
                  {date && (
                    <Box
                      sx={{
                        width: componentSizes.calendar.selectedDate.size,
                        height: componentSizes.calendar.selectedDate.size,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: isSelected
                          ? colors.primary.main
                          : isToday
                            ? 'transparent'
                            : 'transparent',
                        border: isToday && !isSelected ? `1px solid ${colors.primary.main}` : 'none',
                        '&:hover': {
                          bgcolor: isSelected ? colors.primary.dark : colors.neutral[100],
                        },
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: isSelected
                            ? colors.text.inverse
                            : isToday
                              ? colors.primary.main
                              : colors.neutral[500],
                          fontWeight: isToday || isSelected ? 600 : 400,
                          fontSize: 13,
                        }}
                      >
                        {date}
                      </Typography>
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default function Calendar() {
  return (
    <Box>
      <PageHeader
        title="Calendar"
        description={`Composite date-picker widget built from Calendar.svg. Card size: ${componentSizes.calendar.card.width}×${componentSizes.calendar.card.height}px with ${componentSizes.calendar.selectedDate.size}px selected-date circles.`}
      />

      {/* Full calendar */}
      <ComponentPreview title="Default Calendar" description="Full calendar card with month navigation, today highlight, and selection.">
        <CalendarWidget />
      </ComponentPreview>

      {/* Compact */}
      <ComponentPreview title="Compact Calendar" description="Narrower calendar for side panels.">
        <CalendarWidget compact />
      </ComponentPreview>

      {/* Selection states */}
      <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>
        Date Cell States
      </Typography>
      <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
        {[
          { label: 'Default', bg: 'transparent', color: colors.neutral[500], border: 'none' },
          { label: 'Today', bg: 'transparent', color: colors.primary.main, border: `2px solid ${colors.primary.main}` },
          { label: 'Selected', bg: colors.primary.main, color: colors.text.inverse, border: 'none' },
          { label: 'Disabled', bg: 'transparent', color: colors.neutral[300], border: 'none' },
        ].map((state) => (
          <Box key={state.label} sx={{ textAlign: 'center' }}>
            <Box
              sx={{
                width: componentSizes.calendar.selectedDate.size,
                height: componentSizes.calendar.selectedDate.size,
                borderRadius: '50%',
                bgcolor: state.bg,
                border: state.border,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 1,
              }}
            >
              <Typography variant="body2" sx={{ color: state.color, fontWeight: 600, fontSize: 13 }}>
                15
              </Typography>
            </Box>
            <Typography variant="caption">{state.label}</Typography>
          </Box>
        ))}
      </Box>

      {/* With event indicators */}
      <ComponentPreview title="With Event Indicators" description="Calendar with badge dots for event days.">
        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {[8, 12, 18, 22].map((day) => (
            <Box key={day} sx={{ textAlign: 'center' }}>
              <Badge
                variant="dot"
                color="primary"
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              >
                <Box
                  sx={{
                    width: componentSizes.calendar.selectedDate.size,
                    height: componentSizes.calendar.selectedDate.size,
                    borderRadius: '50%',
                    bgcolor: day === 18 ? colors.primary.main : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: day === 18 ? colors.text.inverse : colors.neutral[500],
                      fontWeight: 600,
                      fontSize: 13,
                    }}
                  >
                    {day}
                  </Typography>
                </Box>
              </Badge>
              <Typography variant="caption" display="block">{day === 18 ? 'Selected + Event' : 'Event'}</Typography>
            </Box>
          ))}
        </Box>
      </ComponentPreview>

      {/* Navigation arrows */}
      <ComponentPreview title="Navigation Controls" description="Month navigation with neutral-300 arrow color.">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <IconButton sx={{ color: colors.neutral[300] }}>
            <ChevronLeftIcon />
          </IconButton>
          <Chip label="June 2025" variant="outlined" />
          <IconButton sx={{ color: colors.neutral[300] }}>
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </ComponentPreview>

      <TokenTable
        title="Calendar Tokens"
        showPlatformColumns={true}
        tokens={[
          { name: 'calendar.card.width', value: `${componentSizes.calendar.card.width}px`, muiPath: 'custom component', mauiKey: 'WidthRequest=375', description: 'Calendar card width' },
          { name: 'calendar.card.height', value: `${componentSizes.calendar.card.height}px`, muiPath: 'custom component', mauiKey: 'HeightRequest=314', description: 'Calendar card height' },
          { name: 'calendar.selectedDate.size', value: `${componentSizes.calendar.selectedDate.size}px`, muiPath: 'custom sx', mauiKey: 'SfCalendarSelectionSize', description: 'Selected date circle' },
          { name: 'calendar.borderRadius', value: `${borderRadius.default}px`, muiPath: 'Paper.borderRadius', mauiKey: 'CornerRadius=8', description: 'Card border-radius' },
          { name: 'calendar.shadow', value: shadows.card, muiPath: 'Paper.boxShadow', mauiKey: 'HasShadow=True', description: 'Card shadow' },
          { name: 'calendar.selection.bg', value: colors.primary.main, isColor: true, muiPath: 'custom sx', mauiKey: 'SfCalendarSelectionColor', description: 'Selection background' },
          { name: 'calendar.today.color', value: colors.primary.main, isColor: true, muiPath: 'custom sx', mauiKey: 'SfCalendarTodayHighlightColor', description: 'Today text/border color' },
          { name: 'calendar.nav.color', value: colors.neutral[300], isColor: true, muiPath: 'IconButton.color', mauiKey: 'SfCalendarNavigationArrowColor', description: 'Navigation arrow color' },
          { name: 'calendar.disabled.color', value: colors.neutral[500], isColor: true, muiPath: 'custom sx', mauiKey: 'SfCalendarDisabledDatesTextColor', description: 'Disabled dates text' },
        ]}
      />

      <CodeBlock
        web={`// Custom calendar widget using design tokens
import { Paper, Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

function CalendarCard() {
  return (
    <Paper sx={{
      width: 375,
      borderRadius: '8px',
      boxShadow: '0px 4px 16px rgba(32, 43, 63, 0.08)',
    }}>
      {/* Month header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
        <IconButton sx={{ color: '#C4C4C4' }}>
          <ChevronLeft />
        </IconButton>
        <Typography variant="subtitle1" fontWeight={600}>
          June 2025
        </Typography>
        <IconButton sx={{ color: '#C4C4C4' }}>
          <ChevronRight />
        </IconButton>
      </Box>

      {/* Date grid — 7 columns */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
        {dates.map((date) => (
          <Box
            key={date.day}
            sx={{
              width: 29,
              height: 29,
              borderRadius: '50%',
              // Selected state
              bgcolor: date.selected ? '#0055A4' : 'transparent',
              color: date.selected ? '#fff' : '#828282',
              // Today state
              border: date.today ? '1px solid #0055A4' : 'none',
            }}
          >
            {date.day}
          </Box>
        ))}
      </Box>
    </Paper>
  );
}`}
        mobile={xamlSnippets.calendar}
      />
    </Box>
  );
}
