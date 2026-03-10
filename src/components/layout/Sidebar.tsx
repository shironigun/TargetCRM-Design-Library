// TargetCRM Design Library — Dynamic Sidebar with CRUD & Drag-and-Drop
// View Mode: read-only collapsible tree. Edit Mode: full CRUD + DnD reordering.

import { useState, useCallback } from 'react';
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  TextField,
  Button,
  Collapse,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Toolbar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon,
  DragIndicator as DragIcon,
  Widgets as ComponentIcon,
  Folder as FolderIcon,
  FolderOpen as FolderOpenIcon,
  SubdirectoryArrowRight as ChildIcon,
} from '@mui/icons-material';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { nanoid } from 'nanoid';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../store/AppContext';
import { useAppMode } from '../../store/ModeContext';
import type { SidebarItem } from '../../types';

export const DRAWER_WIDTH = 280;
export const DRAWER_WIDTH_EDIT = 320;

// ─── Single sortable tree item ────────────────────────────────────────────────

interface TreeItemProps {
  item: SidebarItem;
  depth: number;
  isSelected: boolean;
  isExpanded: boolean;
  hasChildren: boolean;
  hasComponent: boolean;
  onSelect: (id: string) => void;
  onToggleExpand: (id: string) => void;
  onRename: (id: string, label: string) => void;
  onDelete: (id: string) => void;
  onAddChild: (parentId: string) => void;
  isEdit: boolean;
}

function SortableTreeItem({
  item,
  depth,
  isSelected,
  isExpanded,
  hasChildren,
  hasComponent,
  onSelect,
  onToggleExpand,
  onRename,
  onDelete,
  onAddChild,
  isEdit,
}: TreeItemProps) {
  const [editing, setEditing] = useState(false);
  const [editLabel, setEditLabel] = useState(item.label);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id, disabled: !isEdit });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleStartEdit = () => {
    setEditLabel(item.label);
    setEditing(true);
  };

  const handleSaveEdit = () => {
    if (editLabel.trim()) {
      onRename(item.id, editLabel.trim());
    }
    setEditing(false);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setEditLabel(item.label);
  };

  return (
    <>
      <ListItemButton
        ref={setNodeRef}
        style={style}
        selected={isSelected}
        onClick={() => {
          if (!editing) onSelect(item.id);
        }}
        sx={{
          pl: 2 + depth * 2,
          py: 0.5,
          minHeight: 36,
          borderRadius: 1,
          mx: 0.5,
          mb: 0.25,
          '&.Mui-selected': {
            bgcolor: 'primary.main',
            color: '#fff',
            '& .MuiListItemIcon-root': { color: '#fff' },
            '&:hover': { bgcolor: 'primary.dark' },
          },
        }}
      >
        {/* Drag handle (edit mode only) */}
        {isEdit && (
          <Box
            {...attributes}
            {...listeners}
            aria-label={`Drag ${item.label}`}
            role="button"
            tabIndex={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              mr: 0.5,
              cursor: 'grab',
              color: 'text.disabled',
              '&:hover': { color: 'text.secondary' },
            }}
          >
            <DragIcon sx={{ fontSize: 16 }} />
          </Box>
        )}

        {/* Expand/collapse arrow */}
        {hasChildren ? (
          <ListItemIcon
            sx={{ minWidth: 24, cursor: 'pointer' }}
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand(item.id);
            }}
          >
            {isExpanded ? (
              <ExpandMoreIcon sx={{ fontSize: 18 }} />
            ) : (
              <ChevronRightIcon sx={{ fontSize: 18 }} />
            )}
          </ListItemIcon>
        ) : (
          <ListItemIcon sx={{ minWidth: 24 }}>
            <Box sx={{ width: 18 }} />
          </ListItemIcon>
        )}

        {/* Icon */}
        <ListItemIcon sx={{ minWidth: 28 }}>
          {hasComponent ? (
            <ComponentIcon sx={{ fontSize: 18 }} />
          ) : hasChildren ? (
            isExpanded ? (
              <FolderOpenIcon sx={{ fontSize: 18 }} />
            ) : (
              <FolderIcon sx={{ fontSize: 18 }} />
            )
          ) : (
            <FolderIcon sx={{ fontSize: 18, opacity: 0.5 }} />
          )}
        </ListItemIcon>

        {/* Label / inline edit */}
        {editing ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flex: 1 }}>
            <TextField
              size="small"
              value={editLabel}
              onChange={(e) => setEditLabel(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveEdit();
                if (e.key === 'Escape') handleCancelEdit();
              }}
              autoFocus
              variant="standard"
              sx={{ flex: 1, '& input': { fontSize: 13, py: 0 } }}
              onClick={(e) => e.stopPropagation()}
            />
            <IconButton size="small" onClick={handleSaveEdit}>
              <CheckIcon sx={{ fontSize: 14 }} />
            </IconButton>
            <IconButton size="small" onClick={handleCancelEdit}>
              <CloseIcon sx={{ fontSize: 14 }} />
            </IconButton>
          </Box>
        ) : (
          <ListItemText
            primary={item.label}
            primaryTypographyProps={{
              fontSize: 13,
              fontWeight: isSelected ? 600 : 500,
              noWrap: true,
            }}
          />
        )}

        {/* Action buttons (edit mode only) */}
        {isEdit && !editing && (
          <Box
            sx={{
              display: 'flex',
              gap: 0,
              ml: 0.5,
              opacity: 0,
              transition: 'opacity 0.15s',
              '.MuiListItemButton-root:hover &, .MuiListItemButton-root:focus-within &': { opacity: 1 },
            }}
          >
            <Tooltip title="Rename" arrow>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleStartEdit();
                }}
              >
                <EditIcon sx={{ fontSize: 14 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Add child" arrow>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddChild(item.id);
                }}
              >
                <ChildIcon sx={{ fontSize: 14 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete" arrow>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setConfirmDelete(true);
                }}
                color="error"
              >
                <DeleteIcon sx={{ fontSize: 14 }} />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </ListItemButton>

      {/* Delete confirmation dialog */}
      <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)}>
        <DialogTitle>Delete &ldquo;{item.label}&rdquo;?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will also delete all child items. This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setConfirmDelete(false);
              onDelete(item.id);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

// ─── Recursive tree renderer ──────────────────────────────────────────────────

interface TreeProps {
  parentId: string | null;
  depth: number;
  items: SidebarItem[];
  expanded: Set<string>;
  selectedId: string | null;
  isEdit: boolean;
  onSelect: (id: string) => void;
  onToggleExpand: (id: string) => void;
  onRename: (id: string, label: string) => void;
  onDelete: (id: string) => void;
  onAddChild: (parentId: string) => void;
}

function TreeLevel({
  parentId,
  depth,
  items,
  expanded,
  selectedId,
  isEdit,
  onSelect,
  onToggleExpand,
  onRename,
  onDelete,
  onAddChild,
}: TreeProps) {
  const children = items
    .filter((i) => i.parentId === parentId)
    .sort((a, b) => a.order - b.order);

  if (children.length === 0) return null;

  const ids = children.map((c) => c.id);

  return (
    <SortableContext items={ids} strategy={verticalListSortingStrategy}>
      {children.map((item) => {
        const hasChildren = items.some((i) => i.parentId === item.id);
        const isExpanded = expanded.has(item.id);

        return (
          <Box key={item.id}>
            <SortableTreeItem
              item={item}
              depth={depth}
              isSelected={selectedId === item.id}
              isExpanded={isExpanded}
              hasChildren={hasChildren}
              hasComponent={!!item.componentId}
              onSelect={onSelect}
              onToggleExpand={onToggleExpand}
              onRename={onRename}
              onDelete={onDelete}
              onAddChild={onAddChild}
              isEdit={isEdit}
            />
            {hasChildren && (
              <Collapse in={isExpanded} timeout="auto">
                <TreeLevel
                  parentId={item.id}
                  depth={depth + 1}
                  items={items}
                  expanded={expanded}
                  selectedId={selectedId}
                  isEdit={isEdit}
                  onSelect={onSelect}
                  onToggleExpand={onToggleExpand}
                  onRename={onRename}
                  onDelete={onDelete}
                  onAddChild={onAddChild}
                />
              </Collapse>
            )}
          </Box>
        );
      })}
    </SortableContext>
  );
}

// ─── Main Sidebar component ──────────────────────────────────────────────────

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const { state, dispatch } = useApp();
  const { isEdit } = useAppMode();

  const drawerWidth = isEdit ? DRAWER_WIDTH_EDIT : DRAWER_WIDTH;

  // Expanded items state (local UI state, not persisted)
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const toggleExpand = useCallback((id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleSelect = useCallback(
    (id: string) => {
      dispatch({ type: 'SELECT_ITEM', payload: { id } });
      const item = state.sidebarItems.find((i) => i.id === id);
      if (item?.componentId) {
        navigate(`/component/${item.componentId}`);
      } else {
        navigate(`/item/${id}`);
      }
      if (isMobile) onClose();
    },
    [dispatch, state.sidebarItems, navigate, isMobile, onClose],
  );

  const handleRename = useCallback(
    (id: string, label: string) => {
      dispatch({ type: 'RENAME_SIDEBAR_ITEM', payload: { id, label } });
    },
    [dispatch],
  );

  const handleDelete = useCallback(
    (id: string) => {
      dispatch({ type: 'DELETE_SIDEBAR_ITEM', payload: { id } });
    },
    [dispatch],
  );

  const handleAddRoot = useCallback(() => {
    const rootItems = state.sidebarItems.filter((i) => i.parentId === null);
    const newItem: SidebarItem = {
      id: nanoid(),
      label: 'New Item',
      parentId: null,
      order: rootItems.length,
      componentId: null,
    };
    dispatch({ type: 'ADD_SIDEBAR_ITEM', payload: newItem });
  }, [dispatch, state.sidebarItems]);

  const handleAddChild = useCallback(
    (parentId: string) => {
      const siblings = state.sidebarItems.filter((i) => i.parentId === parentId);
      const newItem: SidebarItem = {
        id: nanoid(),
        label: 'New Item',
        parentId,
        order: siblings.length,
        componentId: null,
      };
      dispatch({ type: 'ADD_SIDEBAR_ITEM', payload: newItem });
      setExpanded((prev) => new Set([...prev, parentId]));
    },
    [dispatch, state.sidebarItems],
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const items = [...state.sidebarItems];
      const activeItem = items.find((i) => i.id === active.id);
      const overItem = items.find((i) => i.id === over.id);
      if (!activeItem || !overItem) return;

      // Move active item to same parent as over item, placed at over's position
      const newParent = overItem.parentId;
      const siblings = items
        .filter((i) => i.parentId === newParent && i.id !== activeItem.id)
        .sort((a, b) => a.order - b.order);

      const overIndex = siblings.findIndex((i) => i.id === overItem.id);
      siblings.splice(overIndex, 0, { ...activeItem, parentId: newParent });

      const reordered = siblings.map((item, idx) => ({ ...item, order: idx }));

      const updated = items
        .filter((i) => i.parentId !== newParent && i.id !== activeItem.id)
        .concat(reordered);

      dispatch({ type: 'REORDER_SIDEBAR_ITEMS', payload: updated });
    },
    [dispatch, state.sidebarItems],
  );

  // Derive selectedId from URL
  const pathMatch = location.pathname.match(/\/(component|item)\/(.+)/);
  const selectedId = pathMatch ? pathMatch[2] : state.selectedItemId;
  const effectiveSelectedId =
    pathMatch?.[1] === 'component'
      ? state.sidebarItems.find((i) => i.componentId === pathMatch[2])?.id ?? null
      : selectedId;

  const drawerContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
      }}
    >
      <Toolbar />

      {/* Header */}
      <Box
        sx={{
          px: 2,
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 700,
            fontSize: 12,
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}
        >
          Components
        </Typography>
        {isEdit && (
          <Tooltip title="Add root item" arrow>
            <IconButton size="small" onClick={handleAddRoot} color="primary">
              <AddIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {/* Tree */}
      <Box sx={{ flex: 1, overflow: 'auto', py: 0.5 }}>
        {state.sidebarItems.length === 0 ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              No items yet
            </Typography>
            {isEdit && (
              <Button
                variant="outlined"
                size="small"
                startIcon={<AddIcon />}
                onClick={handleAddRoot}
              >
                Add first item
              </Button>
            )}
          </Box>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <List dense disablePadding>
              <TreeLevel
                parentId={null}
                depth={0}
                items={state.sidebarItems}
                expanded={expanded}
                selectedId={effectiveSelectedId}
                isEdit={isEdit}
                onSelect={handleSelect}
                onToggleExpand={toggleExpand}
                onRename={handleRename}
                onDelete={handleDelete}
                onAddChild={handleAddChild}
              />
            </List>
          </DndContext>
        )}
      </Box>
    </Box>
  );

  return isMobile ? (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      {drawerContent}
    </Drawer>
  ) : (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        width: open ? drawerWidth : 0,
        flexShrink: 0,
        transition: theme.transitions.create('width'),
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: '1px solid',
          borderColor: 'divider',
          top: theme.mixins.toolbar.minHeight ?? 64,
          height: `calc(100vh - ${(theme.mixins.toolbar.minHeight as number) ?? 64}px)`,
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}
