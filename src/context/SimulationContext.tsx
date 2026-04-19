import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type SimulationScreen = 'idle' | 'otp' | 'review' | 'chat' | 'processing' | 'success';

interface SimulationContextType {
  currentScreen: SimulationScreen;
  setCurrentScreen: (screen: SimulationScreen) => void;
  progress: number;
  setProgress: (progress: number) => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export function SimulationProvider({ children }: { children: ReactNode }) {
  const [currentScreen, setCurrentScreen] = useState<SimulationScreen>('idle');
  const [progress, setProgress] = useState(0);

  return (
    <SimulationContext.Provider value={{ currentScreen, setCurrentScreen, progress, setProgress }}>
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulation() {
  const context = useContext(SimulationContext);
  if (context === undefined) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
}
