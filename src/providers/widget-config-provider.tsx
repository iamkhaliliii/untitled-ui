import React, { createContext, useContext, useState, ReactNode } from 'react';
import { EventsListConfig, defaultEventsListConfig, SpaceHeaderConfig, defaultSpaceHeaderConfig } from '@/types/widget-config';

interface WidgetConfigContextType {
  eventsListConfig: EventsListConfig;
  updateEventsListConfig: (config: Partial<EventsListConfig>) => void;
  spaceHeaderConfig: SpaceHeaderConfig;
  updateSpaceHeaderConfig: (config: Partial<SpaceHeaderConfig>) => void;
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

  const updateEventsListConfig = (config: Partial<EventsListConfig>) => {
    setEventsListConfig(prevConfig => ({ ...prevConfig, ...config }));
  };

  const updateSpaceHeaderConfig = (config: Partial<SpaceHeaderConfig>) => {
    setSpaceHeaderConfig(prevConfig => ({ ...prevConfig, ...config }));
  };

  return (
    <WidgetConfigContext.Provider value={{ 
      eventsListConfig, 
      updateEventsListConfig,
      spaceHeaderConfig,
      updateSpaceHeaderConfig
    }}>
      {children}
    </WidgetConfigContext.Provider>
  );
}; 