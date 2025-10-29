import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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
  defaultRichTextConfig,
  DiscussionsListConfig,
  defaultDiscussionsListConfig,
  KnowledgesListConfig,
  defaultKnowledgesListConfig,
  WishlistsListConfig,
  defaultWishlistsListConfig,
  QuestionsListConfig,
  defaultQuestionsListConfig
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
  // List widgets
  discussionsList: boolean;
  knowledgesList: boolean;
  wishlistsList: boolean;
  questionsList: boolean;
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
  discussionsListConfig: DiscussionsListConfig;
  updateDiscussionsListConfig: (config: Partial<DiscussionsListConfig>) => void;
  knowledgesListConfig: KnowledgesListConfig;
  updateKnowledgesListConfig: (config: Partial<KnowledgesListConfig>) => void;
  wishlistsListConfig: WishlistsListConfig;
  updateWishlistsListConfig: (config: Partial<WishlistsListConfig>) => void;
  questionsListConfig: QuestionsListConfig;
  updateQuestionsListConfig: (config: Partial<QuestionsListConfig>) => void;
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
  const [discussionsListConfig, setDiscussionsListConfig] = useState<DiscussionsListConfig>(defaultDiscussionsListConfig);
  const [knowledgesListConfig, setKnowledgesListConfig] = useState<KnowledgesListConfig>(defaultKnowledgesListConfig);
  const [wishlistsListConfig, setWishlistsListConfig] = useState<WishlistsListConfig>(defaultWishlistsListConfig);
  const [questionsListConfig, setQuestionsListConfig] = useState<QuestionsListConfig>(defaultQuestionsListConfig);
  const [toggleStates, setToggleStates] = useState<ToggleStates>({
    header: true,
    leftSidebar: true,
    rightSidebar: false,
    footer: false,
  });
  const [spaceWidgetStates, setSpaceWidgetStates] = useState<SpaceWidgetStates>(() => {
    // Detect current URL to set appropriate initial state
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
    const isGrowthDiscussion = currentPath.includes('/site/spaces/growth/discussion') || currentPath.includes('/design/spaces/discussions');
    const isGrowthQuestion = currentPath.includes('/site/spaces/growth/question') || currentPath.includes('/design/spaces/questions');
    const isGrowthWishlist = currentPath.includes('/site/spaces/growth/wishlist') || currentPath.includes('/design/spaces/wishlist');
    const isGrowthEvents = currentPath.includes('/site/spaces/growth/events') || currentPath.includes('/design/spaces/events');
    
    return {
      spaceHeader: true,
      eventsList: isGrowthEvents,
      customEventsList: false,
      upcomingEvents: false,
      heroBanner: false,
      menu: false,
      composer: false,
      // List widgets - set based on space type
      discussionsList: isGrowthDiscussion,
      knowledgesList: false,
      wishlistsList: isGrowthWishlist,
      questionsList: isGrowthQuestion,
      // Other widgets - all disabled by default
      announcementBanner: false,
      leaderboard: false,
      htmlScript: false,
      richText: false,
      dynamicWidgets: [],
    };
  });
  const [layoutStates, setLayoutStates] = useState<LayoutStates>({
    layoutStyle: 'simple',
  });
  const [sidebarWidgetStates, setSidebarWidgetStates] = useState<SidebarWidgetStates>({
    quickActions: true,
    recentActivity: false,
    dynamicWidgets: [],
  });

  // Watch for URL changes and update widget states accordingly
  useEffect(() => {
    let lastPath = window.location.pathname;
    
    const updateWidgetStates = () => {
      const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
      const isGrowthDiscussion = currentPath.includes('/site/spaces/growth/discussion') || currentPath.includes('/design/spaces/discussions');
      const isGrowthQuestion = currentPath.includes('/site/spaces/growth/question') || currentPath.includes('/design/spaces/questions');
      const isGrowthWishlist = currentPath.includes('/site/spaces/growth/wishlist') || currentPath.includes('/design/spaces/wishlist');
      const isGrowthEvents = currentPath.includes('/site/spaces/growth/events') || currentPath.includes('/design/spaces/events');
      
      // Only update if we're on a Growth folder page or Design space page
      if (isGrowthDiscussion || isGrowthQuestion || isGrowthWishlist || isGrowthEvents) {
        setSpaceWidgetStates(prev => ({
          ...prev,
          eventsList: isGrowthEvents,
          discussionsList: isGrowthDiscussion,
          questionsList: isGrowthQuestion,
          wishlistsList: isGrowthWishlist,
        }));
      }
    };

    // Update on mount
    updateWidgetStates();

    // Listen for URL changes (for browser back/forward)
    window.addEventListener('popstate', updateWidgetStates);
    
    // Poll for URL changes (catches React Router navigation)
    const intervalId = setInterval(() => {
      if (window.location.pathname !== lastPath) {
        lastPath = window.location.pathname;
        updateWidgetStates();
      }
    }, 100);

    return () => {
      window.removeEventListener('popstate', updateWidgetStates);
      clearInterval(intervalId);
    };
  }, []);

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

  const updateDiscussionsListConfig = (config: Partial<DiscussionsListConfig>) => {
    setDiscussionsListConfig(prevConfig => ({ ...prevConfig, ...config }));
  };

  const updateKnowledgesListConfig = (config: Partial<KnowledgesListConfig>) => {
    setKnowledgesListConfig(prevConfig => ({ ...prevConfig, ...config }));
  };

  const updateWishlistsListConfig = (config: Partial<WishlistsListConfig>) => {
    setWishlistsListConfig(prevConfig => ({ ...prevConfig, ...config }));
  };

  const updateQuestionsListConfig = (config: Partial<QuestionsListConfig>) => {
    setQuestionsListConfig(prevConfig => ({ ...prevConfig, ...config }));
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
      discussionsListConfig,
      updateDiscussionsListConfig,
      knowledgesListConfig,
      updateKnowledgesListConfig,
      wishlistsListConfig,
      updateWishlistsListConfig,
      questionsListConfig,
      updateQuestionsListConfig,
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