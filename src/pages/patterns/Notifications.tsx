import { useState } from 'react';
import { Box, Typography, Button, Alert, AlertTitle, Snackbar, Chip, Divider, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PageHeader from '../../components/docs/PageHeader';
import ComponentPreview from '../../components/docs/ComponentPreview';
import CodeBlock from '../../components/docs/CodeBlock';
import { colors, borderRadius } from '../../theme/tokens';

type NotificationType = 'info' | 'success' | 'warning' | 'error';

interface NotificationItem {
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const sampleNotifications: NotificationItem[] = [
  { type: 'success', title: 'Deal Closed', message: 'Enterprise CRM Suite — $125,000 won!', time: '2 min ago', read: false },
  { type: 'info', title: 'New Message', message: 'Sarah Johnson sent you a message', time: '15 min ago', read: false },
  { type: 'warning', title: 'Follow-up Due', message: 'Contact Mike Reynolds — overdue by 2 days', time: '1 hour ago', read: true },
  { type: 'error', title: 'Sync Failed', message: 'Email integration encountered an error', time: '3 hours ago', read: true },
];

export default function Notifications() {
  const [toasts, setToasts] = useState<{ [key: string]: boolean }>({});

  const showToast = (key: string) => setToasts((prev) => ({ ...prev, [key]: true }));
  const hideToast = (key: string) => setToasts((prev) => ({ ...prev, [key]: false }));

  return (
    <Box>
      <PageHeader
        title="Notification Patterns"
        description="Notification strategies including inline alerts, toast snackbars, notification center panel, and badge indicators."
      />

      {/* Notification types */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Notification Types
      </Typography>
      <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
        {[
          { label: 'Inline Alert', desc: 'Persistent, in-page status message', icon: '📋' },
          { label: 'Toast / Snackbar', desc: 'Auto-dismiss transient message', icon: '🔔' },
          { label: 'Notification Center', desc: 'Aggregated notification panel', icon: '📬' },
          { label: 'Badge', desc: 'Unread count on icons/tabs', icon: '🔴' },
        ].map((t) => (
          <Box
            key={t.label}
            sx={{
              flex: '1 1 180px',
              p: 2,
              borderRadius: `${borderRadius.default}px`,
              border: `1px solid ${colors.neutral[200]}`,
            }}
          >
            <Typography variant="h5" sx={{ mb: 0.5 }}>{t.icon}</Typography>
            <Typography variant="body2" fontWeight={600}>{t.label}</Typography>
            <Typography variant="caption" color="text.secondary">{t.desc}</Typography>
          </Box>
        ))}
      </Box>

      {/* Inline alerts */}
      <ComponentPreview title="Inline Alerts" description="Persistent in-page notifications for contextual feedback.">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
          <Alert severity="success" onClose={() => {}}>
            <AlertTitle>Deal Saved</AlertTitle>
            Your changes to "Enterprise Suite" have been saved successfully.
          </Alert>
          <Alert severity="info">
            <AlertTitle>Auto-sync Enabled</AlertTitle>
            Contacts will sync with your email provider every 15 minutes.
          </Alert>
          <Alert severity="warning">
            <AlertTitle>Approaching Limit</AlertTitle>
            You've used 85% of your monthly email quota (850/1000).
          </Alert>
          <Alert severity="error" onClose={() => {}}>
            <AlertTitle>Connection Failed</AlertTitle>
            Unable to connect to the mail server. Check your credentials.
          </Alert>
        </Box>
      </ComponentPreview>

      {/* Toast triggers */}
      <ComponentPreview title="Toast Notifications" description="Transient snackbar messages with auto-dismiss.">
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {[
            { key: 'save', severity: 'success' as const, msg: 'Contact saved successfully' },
            { key: 'sync', severity: 'info' as const, msg: 'Syncing 24 contacts...' },
            { key: 'overdue', severity: 'warning' as const, msg: '3 follow-ups are overdue' },
            { key: 'fail', severity: 'error' as const, msg: 'Failed to delete record' },
          ].map((t) => (
            <Box key={t.key}>
              <Button
                variant="contained"
                color={t.severity}
                onClick={() => showToast(t.key)}
                sx={{ textTransform: 'capitalize' }}
              >
                {t.severity} Toast
              </Button>
              <Snackbar
                open={!!toasts[t.key]}
                autoHideDuration={4000}
                onClose={() => hideToast(t.key)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              >
                <Alert severity={t.severity} variant="filled" onClose={() => hideToast(t.key)}>
                  {t.msg}
                </Alert>
              </Snackbar>
            </Box>
          ))}
        </Box>
      </ComponentPreview>

      {/* Notification center */}
      <ComponentPreview title="Notification Center" description="Dropdown panel showing recent notifications.">
        <Box
          sx={{
            width: '100%',
            maxWidth: 380,
            border: `1px solid ${colors.neutral[200]}`,
            borderRadius: `${borderRadius.xl}px`,
            bgcolor: colors.background.default,
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.5, borderBottom: `1px solid ${colors.neutral[100]}` }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <NotificationsActiveIcon sx={{ fontSize: 20, color: colors.primary.main }} />
              <Typography variant="subtitle2" fontWeight={600}>
                Notifications
              </Typography>
              <Chip
                label={sampleNotifications.filter((n) => !n.read).length}
                size="small"
                color="error"
                sx={{ height: 18, fontSize: 10, fontWeight: 700 }}
              />
            </Box>
            <Button size="small" sx={{ textTransform: 'none', fontSize: 12 }}>
              Mark all read
            </Button>
          </Box>

          {/* Items */}
          {sampleNotifications.map((notif, i) => (
            <Box
              key={i}
              sx={{
                display: 'flex',
                gap: 1.5,
                px: 2,
                py: 1.5,
                bgcolor: notif.read ? 'transparent' : `${colors.primary.main}08`,
                borderBottom: `1px solid ${colors.neutral[100]}`,
                cursor: 'pointer',
                '&:hover': { bgcolor: colors.neutral[50] },
              }}
            >
              {/* Type indicator */}
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: notif.read ? 'transparent' : colors[notif.type].main,
                  mt: 0.75,
                  flexShrink: 0,
                }}
              />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <Typography variant="body2" fontWeight={notif.read ? 400 : 600} noWrap>
                    {notif.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: 10, flexShrink: 0, ml: 1 }}>
                    {notif.time}
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary" noWrap>
                  {notif.message}
                </Typography>
              </Box>
            </Box>
          ))}

          {/* Footer */}
          <Box sx={{ p: 1.5, textAlign: 'center' }}>
            <Button size="small" sx={{ textTransform: 'none', fontSize: 12 }}>
              View All Notifications
            </Button>
          </Box>
        </Box>
      </ComponentPreview>

      {/* Badge indicators */}
      <ComponentPreview title="Badge Indicators" description="Unread counts on navigation and action icons.">
        <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <Box sx={{ textAlign: 'center' }}>
            <Badge badgeContent={3} color="error">
              <NotificationsIcon sx={{ fontSize: 28 }} />
            </Badge>
            <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>Count</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Badge badgeContent={99} color="error">
              <NotificationsIcon sx={{ fontSize: 28 }} />
            </Badge>
            <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>Max 99</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Badge variant="dot" color="error">
              <NotificationsIcon sx={{ fontSize: 28 }} />
            </Badge>
            <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>Dot</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Badge badgeContent={0} color="error">
              <NotificationsIcon sx={{ fontSize: 28 }} />
            </Badge>
            <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>Zero (hidden)</Typography>
          </Box>
        </Box>
      </ComponentPreview>

      {/* Timing guidelines */}
      <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>
        Auto-Dismiss Guidelines
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 4 }}>
        {[
          { type: 'Success', duration: '4s', rationale: 'Quick confirmation, no action needed' },
          { type: 'Info', duration: '4s', rationale: 'Informational, non-critical' },
          { type: 'Warning', duration: '6s', rationale: 'Needs attention, may need action' },
          { type: 'Error', duration: '8s or manual', rationale: 'Critical, user must acknowledge' },
        ].map((rule) => (
          <Box key={rule.type} sx={{ display: 'flex', gap: 2, alignItems: 'baseline' }}>
            <Chip
              label={rule.type}
              size="small"
              color={rule.type.toLowerCase() as 'success' | 'info' | 'warning' | 'error'}
              sx={{ width: 80, justifyContent: 'center' }}
            />
            <Typography variant="body2" fontWeight={600} sx={{ minWidth: 100 }}>
              {rule.duration}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {rule.rationale}
            </Typography>
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Decision tree */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        When to Use Which
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 4 }}>
        {[
          { q: 'Is it contextual to the current view?', a: '→ Inline Alert' },
          { q: 'Is it a brief confirmation?', a: '→ Toast Snackbar' },
          { q: 'Does the user need to come back to it?', a: '→ Notification Center' },
          { q: 'Is it just a count indicator?', a: '→ Badge' },
          { q: 'Is it destructive / irreversible?', a: '→ Error Toast + Modal confirmation' },
        ].map((item, i) => (
          <Box key={i} sx={{ display: 'flex', gap: 2, alignItems: 'baseline' }}>
            <Typography variant="body2" sx={{ minWidth: 320 }}>
              {item.q}
            </Typography>
            <Typography variant="body2" fontWeight={600} color="primary">
              {item.a}
            </Typography>
          </Box>
        ))}
      </Box>

      <CodeBlock
        web={`// Notification pattern — centralized notification service
import { createContext, useContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null);

  const notify = (message, severity = 'info', duration = 4000) => {
    setNotification({ message, severity, duration });
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <Snackbar
        open={!!notification}
        autoHideDuration={notification?.duration}
        onClose={() => setNotification(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        {notification && (
          <Alert
            severity={notification.severity}
            variant="filled"
            onClose={() => setNotification(null)}
          >
            {notification.message}
          </Alert>
        )}
      </Snackbar>
    </NotificationContext.Provider>
  );
}

// Usage in any component
const { notify } = useNotification();
notify('Contact saved!', 'success');
notify('Sync failed', 'error', 8000);`}
        mobile={`<!-- Notification Patterns — .NET MAUI -->

<!-- 1. Inline Alert using Frame -->
<Frame BackgroundColor="{DynamicResource SuccessBackgroundColor}"
       CornerRadius="7.5" Padding="16">
    <Label Text="Contact saved successfully!"
           TextColor="{DynamicResource SuccessColor}" />
</Frame>

<!-- 2. Toast using SfPopup -->
<syncfusion:SfPopup x:Name="toast"
    IsOpen="False"
    ShowFooter="False"
    ShowHeader="False"
    AutoCloseDuration="4000">
    <syncfusion:SfPopup.ContentTemplate>
        <DataTemplate>
            <Label Text="Action completed"
                   TextColor="White" Padding="16" />
        </DataTemplate>
    </syncfusion:SfPopup.ContentTemplate>
</syncfusion:SfPopup>

<!-- 3. Badge on navigation -->
<syncfusion:SfBadgeView BadgeText="3"
    Position="TopRight"
    Background="{DynamicResource BadgeColor}">
    <ImageButton Source="bell.png" />
</syncfusion:SfBadgeView>`}
      />
    </Box>
  );
}
