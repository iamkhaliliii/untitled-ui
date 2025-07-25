import React, { createContext, useContext, useState, ReactNode } from 'react';
import { EventsListConfig, defaultEventsListConfig, SpaceHeaderConfig, defaultSpaceHeaderConfig } from '@/types/widget-config';

interface ToggleStates {
  header: boolean;
  leftSidebar: boolean;
  rightSidebar: boolean;
  footer: boolean;
}

interface WidgetConfigContextType {
  eventsListConfig: EventsListConfig;
  updateEventsListConfig: (config: Partial<EventsListConfig>) => void;
  spaceHeaderConfig: SpaceHeaderConfig;
  updateSpaceHeaderConfig: (config: Partial<SpaceHeaderConfig>) => void;
  toggleStates: ToggleStates;
  updateToggleStates: (states: Partial<ToggleStates>) => void;
}

const WidgetConfigContext = createContext<WidgetConfigContextType | undefined>(undefined);

export const useWidgetConfig = () => {
  const context = useContext(WidgetConfigContext);
  if (!context) {
    throw new Error('useWidgetConfig must be used within a WidgetConfigProvider');
  }
  return context;
};

interface WidgetConfigProviderProps {
  children: ReactNode;
}

export const WidgetConfigProvider: React.FC<WidgetConfigProviderProps> = ({ children }) => {
  const [eventsListConfig, setEventsListConfig] = useState<EventsListConfig>(defaultEventsListConfig);
  const [spaceHeaderConfig, setSpaceHeaderConfig] = useState<SpaceHeaderConfig>(defaultSpaceHeaderConfig);
  const [toggleStates, setToggleStates] = useState<ToggleStates>({
    header: true,
    leftSidebar: true,
    rightSidebar: false,
    footer: false,
  });

  const updateEventsListConfig = (config: Partial<EventsListConfig>) => {
    setEventsListConfig(prevConfig => ({ ...prevConfig, ...config }));
  };

  const updateSpaceHeaderConfig = (config: Partial<SpaceHeaderConfig>) => {
    setSpaceHeaderConfig(prevConfig => ({ ...prevConfig, ...config }));
  };

  const updateToggleStates = (states: Partial<ToggleStates>) => {
    setToggleStates(prevStates => ({ ...prevStates, ...states }));
  };

  return (
    <WidgetConfigContext.Provider value={{ 
      eventsListConfig, 
      updateEventsListConfig,
      spaceHeaderConfig,
      updateSpaceHeaderConfig,
      toggleStates,
      updateToggleStates
    }}>
      {children}
    </WidgetConfigContext.Provider>
  );
}; 