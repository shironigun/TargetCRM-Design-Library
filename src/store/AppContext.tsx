// TargetCRM Design Library — Application State Store
// Uses React Context + useReducer with localStorage persistence.

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  type ReactNode,
  type Dispatch,
} from 'react';
import { nanoid } from 'nanoid';
import {
  type AppState,
  type SidebarItem,
  type ComponentDef,
  type StyleTokens,
  type Variant,
  emptyAppState,
  defaultStyleTokens,
  migrateComponentDef,
} from '../types';

// ─── Storage key ──────────────────────────────────────────────────────────────

const STORAGE_KEY = 'targetcrm-design-lib';

// ─── Action types ─────────────────────────────────────────────────────────────

export type AppAction =
  // Sidebar
  | { type: 'ADD_SIDEBAR_ITEM'; payload: SidebarItem }
  | { type: 'RENAME_SIDEBAR_ITEM'; payload: { id: string; label: string } }
  | { type: 'DELETE_SIDEBAR_ITEM'; payload: { id: string } }
  | { type: 'REORDER_SIDEBAR_ITEMS'; payload: SidebarItem[] }
  | { type: 'LINK_COMPONENT'; payload: { itemId: string; componentId: string | null } }
  // Components
  | { type: 'CREATE_COMPONENT'; payload: ComponentDef }
  | { type: 'UPDATE_COMPONENT'; payload: { id: string; name?: string; description?: string } }
  | { type: 'DELETE_COMPONENT'; payload: { id: string } }
  | { type: 'UPDATE_TOKENS'; payload: { componentId: string; tokens: StyleTokens } }
  // Variants
  | { type: 'ADD_VARIANT'; payload: { componentId: string; variant: Variant } }
  | { type: 'UPDATE_VARIANT'; payload: { componentId: string; variant: Variant } }
  | { type: 'DELETE_VARIANT'; payload: { componentId: string; variantId: string } }
  // Selection
  | { type: 'SELECT_ITEM'; payload: { id: string | null } }
  | { type: 'SELECT_VARIANT'; payload: { id: string | null } }
  // Bulk
  | { type: 'LOAD_STATE'; payload: AppState }
  | { type: 'RESET_STATE' };

// ─── Reducer ──────────────────────────────────────────────────────────────────

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    // ── Sidebar ─────────────────────────────────────────────────────
    case 'ADD_SIDEBAR_ITEM':
      return { ...state, sidebarItems: [...state.sidebarItems, action.payload] };

    case 'RENAME_SIDEBAR_ITEM':
      return {
        ...state,
        sidebarItems: state.sidebarItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, label: action.payload.label }
            : item,
        ),
      };

    case 'DELETE_SIDEBAR_ITEM': {
      // Recursively collect IDs of item and all descendants
      const toDelete = new Set<string>();
      const collect = (id: string) => {
        toDelete.add(id);
        state.sidebarItems
          .filter((i) => i.parentId === id)
          .forEach((i) => collect(i.id));
      };
      collect(action.payload.id);
      return {
        ...state,
        sidebarItems: state.sidebarItems.filter((i) => !toDelete.has(i.id)),
        selectedItemId: toDelete.has(state.selectedItemId ?? '')
          ? null
          : state.selectedItemId,
      };
    }

    case 'REORDER_SIDEBAR_ITEMS':
      return { ...state, sidebarItems: action.payload };

    case 'LINK_COMPONENT':
      return {
        ...state,
        sidebarItems: state.sidebarItems.map((item) =>
          item.id === action.payload.itemId
            ? { ...item, componentId: action.payload.componentId }
            : item,
        ),
      };

    // ── Components ──────────────────────────────────────────────────
    case 'CREATE_COMPONENT':
      return {
        ...state,
        components: {
          ...state.components,
          [action.payload.id]: action.payload,
        },
      };

    case 'UPDATE_COMPONENT': {
      const comp = state.components[action.payload.id];
      if (!comp) return state;
      return {
        ...state,
        components: {
          ...state.components,
          [action.payload.id]: {
            ...comp,
            name: action.payload.name ?? comp.name,
            description: action.payload.description ?? comp.description,
            updatedAt: new Date().toISOString(),
          },
        },
      };
    }

    case 'DELETE_COMPONENT': {
      const { [action.payload.id]: _deleted, ...remaining } = state.components;
      void _deleted;
      return {
        ...state,
        components: remaining,
        // Unlink all sidebar items referencing this component (FR3.3)
        sidebarItems: state.sidebarItems.map((item) =>
          item.componentId === action.payload.id
            ? { ...item, componentId: null }
            : item,
        ),
      };
    }

    case 'UPDATE_TOKENS': {
      const comp = state.components[action.payload.componentId];
      if (!comp) return state;
      return {
        ...state,
        components: {
          ...state.components,
          [action.payload.componentId]: {
            ...comp,
            styleTokens: action.payload.tokens,
            updatedAt: new Date().toISOString(),
          },
        },
      };
    }

    // ── Variants ────────────────────────────────────────────────────
    case 'ADD_VARIANT': {
      const comp = state.components[action.payload.componentId];
      if (!comp) return state;
      return {
        ...state,
        components: {
          ...state.components,
          [action.payload.componentId]: {
            ...comp,
            variants: [...comp.variants, action.payload.variant],
            updatedAt: new Date().toISOString(),
          },
        },
      };
    }

    case 'UPDATE_VARIANT': {
      const comp = state.components[action.payload.componentId];
      if (!comp) return state;
      return {
        ...state,
        components: {
          ...state.components,
          [action.payload.componentId]: {
            ...comp,
            variants: comp.variants.map((v) =>
              v.id === action.payload.variant.id ? action.payload.variant : v,
            ),
            updatedAt: new Date().toISOString(),
          },
        },
      };
    }

    case 'DELETE_VARIANT': {
      const comp = state.components[action.payload.componentId];
      if (!comp) return state;
      return {
        ...state,
        components: {
          ...state.components,
          [action.payload.componentId]: {
            ...comp,
            variants: comp.variants.filter(
              (v) => v.id !== action.payload.variantId,
            ),
            updatedAt: new Date().toISOString(),
          },
        },
        selectedVariantId:
          state.selectedVariantId === action.payload.variantId
            ? null
            : state.selectedVariantId,
      };
    }

    // ── Selection ───────────────────────────────────────────────────
    case 'SELECT_ITEM':
      return {
        ...state,
        selectedItemId: action.payload.id,
        selectedVariantId: null,
      };

    case 'SELECT_VARIANT':
      return { ...state, selectedVariantId: action.payload.id };

    // ── Bulk ────────────────────────────────────────────────────────
    case 'LOAD_STATE':
      return { ...action.payload };

    case 'RESET_STATE':
      return { ...emptyAppState };

    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface AppContextValue {
  state: AppState;
  dispatch: Dispatch<AppAction>;
  /** Get a flat list of children for a given parentId */
  getChildren: (parentId: string | null) => SidebarItem[];
  /** Get a component by its ID */
  getComponent: (id: string) => ComponentDef | undefined;
  /** Get the component linked to a sidebar item */
  getLinkedComponent: (itemId: string) => ComponentDef | undefined;
  /** Create a new component with default tokens */
  createComponent: (name: string, description?: string) => ComponentDef;
}

const AppContext = createContext<AppContextValue | null>(null);

// ─── Load initial state from localStorage ─────────────────────────────────────

function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AppState;
      if (parsed.sidebarItems && parsed.components) {
        // Migrate old flat-token components to multi-group model
        for (const id of Object.keys(parsed.components)) {
          parsed.components[id] = migrateComponentDef(parsed.components[id]);
        }
        return parsed;
      }
    }
  } catch {
    // Corrupted data — start fresh
  }
  return { ...emptyAppState };
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, undefined, loadState);

  // Persist to localStorage on every change (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {
        // localStorage full or unavailable — ignore
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [state]);

  const getChildren = useCallback(
    (parentId: string | null) =>
      state.sidebarItems
        .filter((i) => i.parentId === parentId)
        .sort((a, b) => a.order - b.order),
    [state.sidebarItems],
  );

  const getComponent = useCallback(
    (id: string) => state.components[id],
    [state.components],
  );

  const getLinkedComponent = useCallback(
    (itemId: string) => {
      const item = state.sidebarItems.find((i) => i.id === itemId);
      if (item?.componentId) return state.components[item.componentId];
      return undefined;
    },
    [state.sidebarItems, state.components],
  );

  const createComponent = useCallback(
    (name: string, description = ''): ComponentDef => {
      const comp: ComponentDef = {
        id: nanoid(),
        name,
        description,
        styleTokens: {
          boxModels: [],
          typographies: [],
          colours: [],
          shadows: { ...defaultStyleTokens.shadows },
          customs: [],
        },
        variants: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      dispatch({ type: 'CREATE_COMPONENT', payload: comp });
      return comp;
    },
    [dispatch],
  );

  const value: AppContextValue = {
    state,
    dispatch,
    getChildren,
    getComponent,
    getLinkedComponent,
    createComponent,
  };

  return React.createElement(AppContext.Provider, { value }, children);
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
  return ctx;
}
