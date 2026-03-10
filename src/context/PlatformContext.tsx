import { createContext, useContext, useState, type ReactNode } from 'react';

export type Platform = 'web' | 'mobile';

interface PlatformContextValue {
  platform: Platform;
  setPlatform: (p: Platform) => void;
  isWeb: boolean;
  isMobile: boolean;
}

const PlatformContext = createContext<PlatformContextValue>({
  platform: 'web',
  setPlatform: () => {},
  isWeb: true,
  isMobile: false,
});

export function PlatformProvider({ children }: { children: ReactNode }) {
  const [platform, setPlatform] = useState<Platform>('web');

  return (
    <PlatformContext.Provider
      value={{
        platform,
        setPlatform,
        isWeb: platform === 'web',
        isMobile: platform === 'mobile',
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
}

export function usePlatform() {
  return useContext(PlatformContext);
}

export default PlatformContext;
