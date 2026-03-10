import { useState } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, IconButton, Divider, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import DeleteIcon from '@mui/icons-material/Delete';
import type { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import PageHeader from '../../components/docs/PageHeader';
import ComponentPreview from '../../components/docs/ComponentPreview';
import CodeBlock from '../../components/docs/CodeBlock';
import TokenTable from '../../components/docs/TokenTable';
import { colors, borderRadius } from '../../theme/tokens';

const SlideUp = React.forwardRef(function SlideUp(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Modals() {
  const [basic, setBasic] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [form, setForm] = useState(false);
  const [destructive, setDestructive] = useState(false);

  return (
    <Box>
      <PageHeader
        title="Modal Patterns"
        description="Dialog and modal patterns for confirmations, forms, and warnings. Uses MUI Dialog with border-radius: 14px and overlay background."
      />

      {/* Basic dialog */}
      <ComponentPreview title="Basic Dialog" description="Simple informational dialog with a single action.">
        <Button variant="contained" onClick={() => setBasic(true)}>
          Open Basic Dialog
        </Button>
        <Dialog
          open={basic}
          onClose={() => setBasic(false)}
          PaperProps={{ sx: { borderRadius: `${borderRadius.xl}px`, minWidth: 380 } }}
        >
          <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            Information
            <IconButton size="small" onClick={() => setBasic(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              The contact has been successfully added to your list. You can now manage their details from the Contacts section.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button variant="contained" onClick={() => setBasic(false)}>
              Got it
            </Button>
          </DialogActions>
        </Dialog>
      </ComponentPreview>

      {/* Confirmation dialog */}
      <ComponentPreview title="Confirmation Dialog" description="Two-action dialog for confirming operations.">
        <Button variant="outlined" onClick={() => setConfirm(true)}>
          Open Confirmation
        </Button>
        <Dialog
          open={confirm}
          onClose={() => setConfirm(false)}
          PaperProps={{ sx: { borderRadius: `${borderRadius.xl}px`, minWidth: 380 } }}
        >
          <DialogTitle>Archive Deal?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to archive this deal? You can restore it later from the archive section.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button variant="outlined" color="inherit" onClick={() => setConfirm(false)}>
              Cancel
            </Button>
            <Button variant="contained" onClick={() => setConfirm(false)}>
              Archive
            </Button>
          </DialogActions>
        </Dialog>
      </ComponentPreview>

      {/* Destructive dialog */}
      <ComponentPreview title="Destructive Confirmation" description="Warning dialog for irreversible actions.">
        <Button variant="outlined" color="error" onClick={() => setDestructive(true)}>
          Delete Contact
        </Button>
        <Dialog
          open={destructive}
          onClose={() => setDestructive(false)}
          PaperProps={{ sx: { borderRadius: `${borderRadius.xl}px`, minWidth: 380 } }}
        >
          <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <WarningAmberIcon sx={{ color: colors.error.main }} />
            Delete Contact
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              This action <strong>cannot be undone</strong>. All data associated with this contact including messages, deals, and activity history will be permanently removed.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button variant="outlined" color="inherit" onClick={() => setDestructive(false)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => setDestructive(false)}
            >
              Delete Permanently
            </Button>
          </DialogActions>
        </Dialog>
      </ComponentPreview>

      {/* Form dialog */}
      <ComponentPreview title="Form Dialog" description="Modal with form inputs for quick data entry.">
        <Button variant="contained" onClick={() => setForm(true)}>
          Add Quick Note
        </Button>
        <Dialog
          open={form}
          onClose={() => setForm(false)}
          PaperProps={{ sx: { borderRadius: `${borderRadius.xl}px`, minWidth: 440 } }}
          TransitionComponent={SlideUp}
        >
          <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            New Note
            <IconButton size="small" onClick={() => setForm(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField label="Title" fullWidth required />
            <TextField label="Note Content" multiline rows={4} fullWidth />
            <TextField label="Tags" fullWidth helperText="Comma-separated tags" />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button variant="outlined" color="inherit" onClick={() => setForm(false)}>
              Discard
            </Button>
            <Button variant="contained" onClick={() => setForm(false)}>
              Save Note
            </Button>
          </DialogActions>
        </Dialog>
      </ComponentPreview>

      {/* Dialog anatomy */}
      <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>
        Modal Anatomy
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 4 }}>
        {[
          { part: 'Overlay', value: `${colors.background.overlay} @ opacity`, desc: 'Dim background' },
          { part: 'Container', value: `border-radius: ${borderRadius.xl}px`, desc: 'Dialog paper' },
          { part: 'Title Bar', value: 'h6, 600 weight + close icon', desc: 'Optional close button' },
          { part: 'Content', value: 'body1 or form fields', desc: '24px padding' },
          { part: 'Actions', value: 'right-aligned buttons', desc: 'Cancel (outlined) + Primary (contained)' },
        ].map((item) => (
          <Box key={item.part} sx={{ display: 'flex', gap: 2, alignItems: 'baseline' }}>
            <Typography variant="body2" fontWeight={600} sx={{ minWidth: 100 }}>
              {item.part}
            </Typography>
            <Typography variant="caption" sx={{ fontFamily: 'monospace', minWidth: 200 }}>
              {item.value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.desc}
            </Typography>
          </Box>
        ))}
      </Box>

      <TokenTable
        title="Modal Tokens"
        showPlatformColumns={true}
        tokens={[
          { name: 'dialog.borderRadius', value: `${borderRadius.xl}px`, muiPath: 'MuiDialog.paper.borderRadius', mauiKey: 'SfPopupCornerRadius', description: 'Dialog border-radius' },
          { name: 'dialog.overlay', value: colors.background.overlay, isColor: true, muiPath: 'MuiDialog.backdrop', mauiKey: 'SfPopupOverlayBackground', description: 'Overlay color' },
          { name: 'dialog.bg', value: colors.background.default, isColor: true, muiPath: 'MuiDialog.paper.bg', mauiKey: 'SfPopupNormalBackground', description: 'Dialog background' },
        ]}
      />

      <CodeBlock
        web={`import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

function ConfirmDialog({ open, onClose, onConfirm, title, message }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { borderRadius: '14px', minWidth: 380 } }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={onConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// Destructive variant
<Button variant="contained" color="error" startIcon={<Delete />}>
  Delete Permanently
</Button>`}
        mobile={`<!-- Modal — .NET MAUI with Syncfusion SfPopup -->
<syncfusion:SfPopup
    x:Name="confirmPopup"
    HeaderTitle="Archive Deal?"
    ShowFooter="True"
    ShowCloseButton="True"
    AppearanceMode="TwoButton"
    AcceptButtonText="Archive"
    DeclineButtonText="Cancel"
    PopupStyle.CornerRadius="14"
    PopupStyle.OverlayColor="{DynamicResource OverlayColor}">

    <syncfusion:SfPopup.ContentTemplate>
        <DataTemplate>
            <Label Text="Are you sure you want to archive this deal?"
                   Style="{DynamicResource Body1}"
                   Padding="16" />
        </DataTemplate>
    </syncfusion:SfPopup.ContentTemplate>
</syncfusion:SfPopup>

<!-- Show popup -->
<syncfusion:SfButton Text="Archive"
    Clicked="confirmPopup.Show()" />

<!-- Destructive variant -->
<syncfusion:SfPopup
    HeaderTitle="Delete Contact"
    AcceptButtonText="Delete"
    AcceptButtonBackground="{DynamicResource ErrorColor}" />`}
      />
    </Box>
  );
}
