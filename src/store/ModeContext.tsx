// TargetCRM Design Library — Edit / View Mode Context
// Edit mode is gated behind a simple password check.

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type AppMode = 'view' | 'edit';

const EDIT_PASSWORD = 'dumb';

interface ModeContextValue {
  mode: AppMode;
  isEdit: boolean;
  isView: boolean;
  /** Attempt to enter edit mode. Returns true if password correct. */
  enterEditMode: (password: string) => boolean;
  /** Exit back to view mode. */
  exitEditMode: () => void;
}

const ModeContext = createContext<ModeContextValue | null>(null);

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AppMode>('view');

  const enterEditMode = useCallback((password: string): boolean => {
    if (password === EDIT_PASSWORD) {
      setMode('edit');
      return true;
    }
    return false;
  }, []);

  const exitEditMode = useCallback(() => setMode('view'), []);

  const value: ModeContextValue = {
    mode,
    isEdit: mode === 'edit',
    isView: mode === 'view',
    enterEditMode,
    exitEditMode,
  };

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
}

export function useAppMode(): ModeContextValue {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error('useAppMode must be used inside <ModeProvider>');
  return ctx;
}
