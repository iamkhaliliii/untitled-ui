import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  EventsListConfig, 
  defaultEventsListConfig, 
  SpaceHeaderConfig, 
  defaultSpaceHeaderConfig,
  AnnouncementBannerConfig,
  defaultAnnouncementBannerConfig,
  ComposerConfig,
  defaultComposerConfig,
  LeaderboardConfig,
  defaultLeaderboardConfig,
  HtmlScriptConfig,
  defaultHtmlScriptConfig,
  RichTextConfig,
  defaultRichTextConfig
} from '@/types/widget-config';

interface ToggleStates {
  header: boolean;
  leftSidebar: boolean;
  rightSidebar: boolean;
  footer: boolean;
}

interface SpaceWidget {
  id: string;
  label: string;
  icon: any;
  enabled: boolean;
  containerId: string; // Which container/column this widget belongs to
}

interface SpaceWidgetStates {
  spaceHeader: boolean;
  eventsList: boolean;
  customEventsList: boolean;
  upcomingEvents: boolean;
  heroBanner: boolean;
  menu: boolean;
  // New widgets
  composer: boolean;
  announcementBanner: boolean;
  leaderboard: boolean;
  htmlScript: boolean;
  richText: boolean;
  // Dynamic widgets
  dynamicWidgets: SpaceWidget[];
}

interface SidebarWidget {
  id: string;
  label: string;
  icon: any;
  enabled: boolean;
}

interface SidebarWidgetStates {
  quickActions: boolean;
  recentActivity: boolean;
  // Dynamic widgets
  dynamicWidgets: SidebarWidget[];
}

interface LayoutStates {
  layoutStyle: 'simple' | 'with-sidebar' | 'full-width';
}

interface WidgetConfigContextType {
  eventsListConfig: EventsListConfig;
  updateEventsListConfig: (config: Partial<EventsListConfig>) => void;
  spaceHeaderConfig: SpaceHeaderConfig;
  updateSpaceHeaderConfig: (config: Partial<SpaceHeaderConfig>) => void;
  announcementBannerConfig: AnnouncementBannerConfig;
  updateAnnouncementBannerConfig: (config: Partial<AnnouncementBannerConfig>) => void;
  composerConfig: ComposerConfig;
  updateComposerConfig: (config: Partial<ComposerConfig>) => void;
  leaderboardConfig: LeaderboardConfig;
  updateLeaderboardConfig: (config: Partial<LeaderboardConfig>) => void;
  htmlScriptConfig: HtmlScriptConfig;
  updateHtmlScriptConfig: (config: Partial<HtmlScriptConfig>) => void;
  richTextConfig: RichTextConfig;
  updateRichTextConfig: (config: Partial<RichTextConfig>) => void;
  toggleStates: ToggleStates;
  updateToggleStates: (states: Partial<ToggleStates>) => void;
  spaceWidgetStates: SpaceWidgetStates;
  updateSpaceWidgetStates: (states: Partial<SpaceWidgetStates>) => void;
  addSpaceWidget: (widget: Omit<SpaceWidget, 'enabled'>, containerId?: string) => void;
  removeSpaceWidget: (widgetId: string) => void;
  duplicateSpaceWidget: (widgetId: string) => void;
  sidebarWidgetStates: SidebarWidgetStates;
  updateSidebarWidgetStates: (states: Partial<SidebarWidgetStates>) => void;
  addSidebarWidget: (widget: Omit<SidebarWidget, 'enabled'>) => void;
  removeSidebarWidget: (widgetId: string) => void;
  duplicateSidebarWidget: (widgetId: string) => void;
  layoutStates: LayoutStates;
  updateLayoutStates: (states: Partial<LayoutStates>) => void;
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
  const [announcementBannerConfig, setAnnouncementBannerConfig] = useState<AnnouncementBannerConfig>(defaultAnnouncementBannerConfig);
  const [composerConfig, setComposerConfig] = useState<ComposerConfig>(defaultComposerConfig);
  const [leaderboardConfig, setLeaderboardConfig] = useState<LeaderboardConfig>(defaultLeaderboardConfig);
  const [htmlScriptConfig, setHtmlScriptConfig] = useState<HtmlScriptConfig>(defaultHtmlScriptConfig);
  const [richTextConfig, setRichTextConfig] = useState<RichTextConfig>(defaultRichTextConfig);
  const [toggleStates, setToggleStates] = useState<ToggleStates>({
    header: true,
    leftSidebar: true,
    rightSidebar: false,
    footer: false,
  });
  const [spaceWidgetStates, setSpaceWidgetStates] = useState<SpaceWidgetStates>({
    spaceHeader: true,
    eventsList: true,
    customEventsList: false,
    upcomingEvents: true,
    heroBanner: false,
    menu: true,
    // New widgets - default to false
    composer: false,
    announcementBanner: false,
    leaderboard: false,
    htmlScript: false,
    richText: false,
    dynamicWidgets: [],
  });
  const [layoutStates, setLayoutStates] = useState<LayoutStates>({
    layoutStyle: 'simple',
  });
  const [sidebarWidgetStates, setSidebarWidgetStates] = useState<SidebarWidgetStates>({
    quickActions: true,
    recentActivity: false,
    dynamicWidgets: [],
  });

  const updateEventsListConfig = (config: Partial<EventsListConfig>) => {
    setEventsListConfig(prevConfig => ({ ...prevConfig, ...config }));
  };

  const updateSpaceHeaderConfig = (config: Partial<SpaceHeaderConfig>) => {
    setSpaceHeaderConfig(prevConfig => ({ ...prevConfig, ...config }));
  };

  const updateAnnouncementBannerConfig = (config: Partial<AnnouncementBannerConfig>) => {
    setAnnouncementBannerConfig(prevConfig => ({ ...prevConfig, ...config }));
  };

  const updateComposerConfig = (config: Partial<ComposerConfig>) => {
    setComposerConfig(prevConfig => ({ ...prevConfig, ...config }));
  };

  const updateLeaderboardConfig = (config: Partial<LeaderboardConfig>) => {
    setLeaderboardConfig(prevConfig => ({ ...prevConfig, ...config }));
  };

  const updateHtmlScriptConfig = (config: Partial<HtmlScriptConfig>) => {
    setHtmlScriptConfig(prevConfig => ({ ...prevConfig, ...config }));
  };

  const updateRichTextConfig = (config: Partial<RichTextConfig>) => {
    setRichTextConfig(prevConfig => ({ ...prevConfig, ...config }));
  };

  const updateToggleStates = (states: Partial<ToggleStates>) => {
    setToggleStates(prevStates => ({ ...prevStates, ...states }));
  };

  const updateSpaceWidgetStates = (states: Partial<SpaceWidgetStates>) => {
    setSpaceWidgetStates(prevStates => ({ ...prevStates, ...states }));
  };

  const updateSidebarWidgetStates = (states: Partial<SidebarWidgetStates>) => {
    setSidebarWidgetStates(prevStates => ({ ...prevStates, ...states }));
  };

  const updateLayoutStates = (states: Partial<LayoutStates>) => {
    setLayoutStates(prevStates => ({ ...prevStates, ...states }));
  };

  const addSpaceWidget = (widget: Omit<SpaceWidget, 'enabled'>, containerId?: string) => {
    const newWidget: SpaceWidget = {
      ...widget,
      enabled: true,
      containerId: containerId || 'mainColumn', // Default to mainColumn if not specified
    };
    
    console.log('Adding widget to provider:', newWidget);
    
    setSpaceWidgetStates(prevStates => {
      const newStates = {
        ...prevStates,
        dynamicWidgets: [...prevStates.dynamicWidgets, newWidget],
      };
      console.log('New space widget states:', newStates);
      return newStates;
    });
  };

  const removeSpaceWidget = (widgetId: string) => {
    setSpaceWidgetStates(prevStates => ({
      ...prevStates,
      dynamicWidgets: prevStates.dynamicWidgets.filter(widget => widget.id !== widgetId),
    }));
  };

  const addSidebarWidget = (widget: Omit<SidebarWidget, 'enabled'>) => {
    const newWidget: SidebarWidget = {
      ...widget,
      enabled: true,
    };
    
    console.log('Adding sidebar widget to provider:', newWidget);
    
    setSidebarWidgetStates(prevStates => {
      const newStates = {
        ...prevStates,
        dynamicWidgets: [...prevStates.dynamicWidgets, newWidget],
      };
      console.log('New sidebar widget states:', newStates);
      return newStates;
    });
  };

  const removeSidebarWidget = (widgetId: string) => {
    setSidebarWidgetStates(prevStates => ({
      ...prevStates,
      dynamicWidgets: prevStates.dynamicWidgets.filter(widget => widget.id !== widgetId),
    }));
  };

  const duplicateSpaceWidget = (widgetId: string) => {
    const widgetToDuplicate = spaceWidgetStates.dynamicWidgets.find(widget => widget.id === widgetId);
    if (widgetToDuplicate) {
      const newWidget: SpaceWidget = {
        ...widgetToDuplicate,
        id: `${widgetToDuplicate.id}_copy_${Date.now()}`,
        label: `${widgetToDuplicate.label} Copy`,
        enabled: false, // Start disabled
      };
      
      console.log('Duplicating space widget:', newWidget);
      
      setSpaceWidgetStates(prevStates => ({
        ...prevStates,
        dynamicWidgets: [...prevStates.dynamicWidgets, newWidget],
      }));
    }
  };

  const duplicateSidebarWidget = (widgetId: string) => {
    const widgetToDuplicate = sidebarWidgetStates.dynamicWidgets.find(widget => widget.id === widgetId);
    if (widgetToDuplicate) {
      const newWidget: SidebarWidget = {
        ...widgetToDuplicate,
        id: `${widgetToDuplicate.id}_copy_${Date.now()}`,
        label: `${widgetToDuplicate.label} Copy`,
        enabled: false, // Start disabled
      };
      
      console.log('Duplicating sidebar widget:', newWidget);
      
      setSidebarWidgetStates(prevStates => ({
        ...prevStates,
        dynamicWidgets: [...prevStates.dynamicWidgets, newWidget],
      }));
    }
  };

  return (
    <WidgetConfigContext.Provider value={{ 
      eventsListConfig, 
      updateEventsListConfig,
      spaceHeaderConfig,
      updateSpaceHeaderConfig,
      announcementBannerConfig,
      updateAnnouncementBannerConfig,
      composerConfig,
      updateComposerConfig,
      leaderboardConfig,
      updateLeaderboardConfig,
      htmlScriptConfig,
      updateHtmlScriptConfig,
      richTextConfig,
      updateRichTextConfig,
      toggleStates,
      updateToggleStates,
      spaceWidgetStates,
      updateSpaceWidgetStates,
      addSpaceWidget,
      removeSpaceWidget,
      duplicateSpaceWidget,
      sidebarWidgetStates,
      updateSidebarWidgetStates,
      addSidebarWidget,
      removeSidebarWidget,
      duplicateSidebarWidget,
      layoutStates,
      updateLayoutStates
    }}>
      {children}
    </WidgetConfigContext.Provider>
  );
}; 