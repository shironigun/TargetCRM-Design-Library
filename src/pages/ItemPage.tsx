// TargetCRM Design Library — Item Page (sidebar item without a linked component)
// Shows option to link or create a component in Edit Mode.

import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  Link as LinkIcon,
  Add as AddIcon,
  Widgets as ComponentIcon,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { useAppMode } from '../store/ModeContext';

export default function ItemPage() {
  const { itemId } = useParams<{ itemId: string }>();
  const { state, dispatch, createComponent } = useApp();
  const { isEdit } = useAppMode();
  const navigate = useNavigate();
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);

  const item = state.sidebarItems.find((i) => i.id === itemId);

  if (!item) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          Item not found
        </Typography>
      </Box>
    );
  }

  // If item has a linked component, redirect there
  if (item.componentId) {
    navigate(`/component/${item.componentId}`, { replace: true });
    return null;
  }

  const unlinkedComponents = Object.values(state.components).filter(
    (comp) => !state.sidebarItems.some((i) => i.componentId === comp.id),
  );

  const handleLinkComponent = (componentId: string) => {
    dispatch({
      type: 'LINK_COMPONENT',
      payload: { itemId: item.id, componentId },
    });
    setLinkDialogOpen(false);
    navigate(`/component/${componentId}`);
  };

  const handleCreateAndLink = () => {
    const comp = createComponent(item.label);
    dispatch({
      type: 'LINK_COMPONENT',
      payload: { itemId: item.id, componentId: comp.id },
    });
    setLinkDialogOpen(false);
    navigate(`/component/${comp.id}`);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
        {item.label}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        This navigation item has no linked component.
      </Typography>

      {isEdit ? (
        <Paper
          variant="outlined"
          sx={{
            p: 4,
            textAlign: 'center',
            borderRadius: 2,
            borderStyle: 'dashed',
          }}
        >
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Link an existing component or create a new one.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center' }}>
            <Button
              variant="contained"
              startIcon={<LinkIcon />}
              onClick={() => setLinkDialogOpen(true)}
            >
              Link Component
            </Button>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleCreateAndLink}
            >
              Create &amp; Link New
            </Button>
          </Box>
        </Paper>
      ) : (
        <Paper
          variant="outlined"
          sx={{
            p: 4,
            textAlign: 'center',
            borderRadius: 2,
            borderStyle: 'dashed',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            No component is associated with this item. Switch to Edit Mode to
            link one.
          </Typography>
        </Paper>
      )}

      {/* Link component picker dialog */}
      <Dialog
        open={linkDialogOpen}
        onClose={() => setLinkDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Link a Component</DialogTitle>
        <DialogContent>
          {unlinkedComponents.length > 0 ? (
            <List>
              {unlinkedComponents.map((comp) => (
                <ListItemButton
                  key={comp.id}
                  onClick={() => handleLinkComponent(comp.id)}
                >
                  <ListItemIcon>
                    <ComponentIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={comp.name}
                    secondary={comp.description || 'No description'}
                  />
                </ListItemButton>
              ))}
            </List>
          ) : (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ py: 2, textAlign: 'center' }}
            >
              No unlinked components available.
            </Typography>
          )}
          <Divider sx={{ my: 1 }} />
          <Button
            fullWidth
            startIcon={<AddIcon />}
            onClick={handleCreateAndLink}
          >
            Create New Component &amp; Link
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLinkDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
