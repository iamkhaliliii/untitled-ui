import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronDown } from '@untitledui/icons';
import { Button } from '@/components/base/buttons/button';
import { useResolvedTheme } from '@/hooks/use-resolved-theme';
import { cx } from '@/utils/cx';
import { 
  EventsListConfig, 
  CustomEventsListConfig, 
  SpaceHeaderConfig, 
  AnnouncementBannerConfig, 
  LeaderboardConfig, 
  HtmlScriptConfig, 
  RichTextConfig,
  DiscussionsListConfig,
  KnowledgesListConfig,
  WishlistsListConfig,
  QuestionsListConfig
} from './widget-configs';

interface WidgetConfigProps {
  selectedWidget: {
    id: string;
    label: string;
    icon?: React.ReactNode;
  };
  onBack: () => void;
  onSave: () => void;
  onTabConfigChange?: (isTabConfig: boolean, tabLabel?: string) => void;
  onFilterViewChange?: (isFilterView: boolean) => void;
}

const WidgetConfig: React.FC<WidgetConfigProps> = ({ selectedWidget, onBack, onSave, onTabConfigChange, onFilterViewChange }) => {
  const theme = useResolvedTheme();
  
  // Tab configuration view state
  const [isTabConfigView, setIsTabConfigView] = useState(false);
  const [currentConfigTab, setCurrentConfigTab] = useState<{ id: string; label: string } | null>(null);
  
  // Filter configuration view state
  const [isFilterView, setIsFilterView] = useState(false);
  
  // Filter items expanded state
  const [expandedFilters, setExpandedFilters] = useState<Set<string>>(new Set(['tags', 'start_date_time']));

  // Notify parent when filter view changes
  useEffect(() => {
    onFilterViewChange?.(isFilterView);
  }, [isFilterView, onFilterViewChange]);

  const handleBackFromConfig = () => {
    setIsTabConfigView(false);
    setCurrentConfigTab(null);
    onTabConfigChange?.(false);
  };

  // Toggle filter expansion
  const toggleFilterExpanded = (filterId: string) => {
    setExpandedFilters(prev => {
      const newSet = new Set(prev);
      if (newSet.has(filterId)) {
        newSet.delete(filterId);
      } else {
        newSet.add(filterId);
      }
      return newSet;
    });
  };

  const renderTabConfigView = () => {
    if (!currentConfigTab) return null;

    return (
      <div className="p-4 transition-all duration-300 ease-in-out">
        {/* Header with Back Button */}
        <div className="mb-6">
          {/* Back Button Row */}
          <div className="mb-3">
            <Button
              size="sm"
              color="secondary"
              iconLeading={ArrowLeft}
              onClick={handleBackFromConfig}
            />
          </div>
          
          {/* Title Row */}
          <div>
            <h2 className={cx(
              "text-lg font-semibold",
              theme === 'dark' ? "text-gray-100" : "text-gray-900"
            )}>
              "{currentConfigTab.label}" Tab Config
            </h2>
          </div>
        </div>

        <div className="space-y-4">
          {/* Filters Section */}
          <div className="space-y-2">
            {/* Filter Title */}
            <div className="px-2">
              <div>
                <h3 className={cx(
                  "text-sm font-semibold",
                  theme === 'dark' ? "text-gray-100" : "text-gray-900"
                )}>
                  <div className="flex justify-between items-center">
                    Fixed filters
                    <div className="text-sm font-normal">
                      <a className={cx(
                        "cursor-pointer rounded-base transition duration-200 focus:outline-none focus-visible:ring",
                        theme === 'dark' 
                          ? "text-blue-400 hover:text-blue-300 ring-blue-400" 
                          : "text-blue-600 hover:text-blue-700 ring-blue-600"
                      )}>
                        Clear
                      </a>
                    </div>
                  </div>
                </h3>
                <p className={cx(
                  "text-sm mt-1",
                  theme === 'dark' ? "text-gray-400" : "text-gray-600"
                )}>
                  These filters are applied to all the content.
                </p>
              </div>
            </div>
            
            <div className="h-px bg-secondary"></div>
            
            {/* Filter Items */}
            {['ID', 'Tags', 'Spaces', 'Title', 'Author', 'Published date', 'Start Date & Time', 'End Date & Time', 'Location Type', 'Location', 'Hosts'].map((filterName, index) => (
              <div key={filterName}>
                <div className="space-y-1 -mx-2">
                  <button
                    onClick={() => toggleFilterExpanded(filterName.toLowerCase().replace(/\s+/g, '_').replace('&', ''))}
                    className={cx(
                      "w-full flex items-center text-start rounded-base focus:outline-none focus-visible:ring ring-inset ring-offset-0 font-medium py-2 px-2 text-md transition-colors",
                      theme === 'dark' 
                        ? "text-gray-100 bg-transparent hover:text-gray-50 hover:bg-gray-800/50" 
                        : "text-gray-900 bg-transparent hover:text-gray-800 hover:bg-gray-50"
                    )}
                  >
                    <span className="flex-grow truncate">
                      <div className="flex space-x-1 flex-1 truncate justify-between items-center">
                        <span className={cx(
                          "font-semibold",
                          (filterName === 'Tags' || filterName === 'Start Date & Time') && expandedFilters.has(filterName.toLowerCase().replace(/\s+/g, '_').replace('&', ''))
                            ? theme === 'dark' ? "text-blue-400" : "text-blue-600"
                            : theme === 'dark' ? "text-gray-100" : "text-gray-900"
                        )}>
                          {filterName}
                        </span>
                        {(filterName === 'Tags' || filterName === 'Start Date & Time') && expandedFilters.has(filterName.toLowerCase().replace(/\s+/g, '_').replace('&', '')) && (
                          <span className="inline-block shrink-0 rounded-full h-2 w-2 bg-blue-500"></span>
                        )}
                      </div>
                    </span>
                    <ChevronDown className={cx(
                      "h-5 w-5 transform transition-all ease-in-out duration-150 flex-shrink-0 ms-2",
                      (filterName === 'Tags' || filterName === 'Start Date & Time') && expandedFilters.has(filterName.toLowerCase().replace(/\s+/g, '_').replace('&', '')) ? "rotate-180" : "",
                      theme === 'dark' ? "text-gray-400" : "text-gray-500"
                    )} />
                  </button>
                </div>
                {index < 10 && <div className="h-px bg-secondary"></div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderFilterView = () => {
    return (
      <div className="p-4 transition-all duration-300 ease-in-out">
        {/* Header with Back Button */}
        <div className="mb-6">
          {/* Back Button Row */}
          <div className="mb-3">
            <Button
              size="sm"
              color="secondary"
              iconLeading={ArrowLeft}
              onClick={() => setIsFilterView(false)}
            />
          </div>
          
          {/* Title Row */}
          <div>
            <h2 className={cx(
              "text-lg font-semibold",
              theme === 'dark' ? "text-gray-100" : "text-gray-900"
            )}>
              Event Filters
            </h2>
          </div>
        </div>

        <div className="space-y-4">
          {/* Filters Section */}
          <div className="space-y-2">
            {/* Filter Title */}
            <div className="px-2">
              <div>
                <h3 className={cx(
                  "text-sm font-semibold",
                  theme === 'dark' ? "text-gray-100" : "text-gray-900"
                )}>
                  <div className="flex justify-between items-center">
                    Available filters
                    <div className="text-sm font-normal">
                      <a className={cx(
                        "cursor-pointer rounded-base transition duration-200 focus:outline-none focus-visible:ring",
                        theme === 'dark' 
                          ? "text-blue-400 hover:text-blue-300 ring-blue-400" 
                          : "text-blue-600 hover:text-blue-700 ring-blue-600"
                      )}>
                        Clear all
                      </a>
                    </div>
                  </div>
                </h3>
                <p className={cx(
                  "text-sm mt-1",
                  theme === 'dark' ? "text-gray-400" : "text-gray-600"
                )}>
                  Configure filters to customize which events are displayed.
                </p>
              </div>
            </div>
            
            <div className="h-px bg-secondary"></div>
            
            {/* Filter Items */}
            {['Tags', 'Spaces', 'Title', 'Author', 'Published date', 'Start Date & Time', 'End Date & Time', 'Location Type', 'Location', 'Hosts'].map((filterName, index) => (
              <div key={filterName}>
                <div className="space-y-1 -mx-2">
                  <button
                    onClick={() => toggleFilterExpanded(filterName.toLowerCase().replace(/\s+/g, '_').replace('&', ''))}
                    className={cx(
                      "w-full flex items-center text-start rounded-base focus:outline-none focus-visible:ring ring-inset ring-offset-0 font-medium py-2 px-2 text-md transition-colors",
                      theme === 'dark' 
                        ? "text-gray-100 bg-transparent hover:text-gray-50 hover:bg-gray-800/50" 
                        : "text-gray-900 bg-transparent hover:text-gray-800 hover:bg-gray-50"
                    )}
                  >
                    <span className="flex-grow truncate">
                      <div className="flex space-x-1 flex-1 truncate justify-between items-center">
                        <span className={cx(
                          "font-semibold",
                          (filterName === 'Tags' || filterName === 'Start Date & Time') && expandedFilters.has(filterName.toLowerCase().replace(/\s+/g, '_').replace('&', ''))
                            ? theme === 'dark' ? "text-blue-400" : "text-blue-600"
                            : theme === 'dark' ? "text-gray-100" : "text-gray-900"
                        )}>
                          {filterName}
                        </span>
                        {(filterName === 'Tags' || filterName === 'Start Date & Time') && expandedFilters.has(filterName.toLowerCase().replace(/\s+/g, '_').replace('&', '')) && (
                          <span className="inline-block shrink-0 rounded-full h-2 w-2 bg-blue-500"></span>
                        )}
                      </div>
                    </span>
                    <ChevronDown className={cx(
                      "h-5 w-5 transform transition-all ease-in-out duration-150 flex-shrink-0 ms-2",
                      (filterName === 'Tags' || filterName === 'Start Date & Time') && expandedFilters.has(filterName.toLowerCase().replace(/\s+/g, '_').replace('&', '')) ? "rotate-180" : "",
                      theme === 'dark' ? "text-gray-400" : "text-gray-500"
                    )} />
                  </button>
                </div>
                {index < 9 && <div className="h-px bg-secondary"></div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {isTabConfigView ? (
        renderTabConfigView()
      ) : isFilterView ? (
        renderFilterView()
      ) : (
        <div className="transition-all duration-300 ease-in-out min-h-0">
          {selectedWidget.label === 'Events List' 
            ? <EventsListConfig onTabConfigChange={onTabConfigChange} />
            : selectedWidget.label === 'Posts'
              ? <CustomEventsListConfig onFilterViewChange={onFilterViewChange} />
            : selectedWidget.label === 'Discussions List'
              ? <DiscussionsListConfig onTabConfigChange={onTabConfigChange} />
            : selectedWidget.label === 'Knowledges List'
              ? <KnowledgesListConfig />
            : selectedWidget.label === 'Wishlists List'
              ? <WishlistsListConfig />
            : selectedWidget.label === 'Questions List'
              ? <QuestionsListConfig />
            : selectedWidget.label === 'Space Header'
              ? <SpaceHeaderConfig />
            : selectedWidget.label === 'Announcement Banner'
              ? <AnnouncementBannerConfig />
            : selectedWidget.label === 'Leaderboard'
              ? <LeaderboardConfig />
            : selectedWidget.label === 'Html Script'
              ? <HtmlScriptConfig />
            : selectedWidget.label === 'Rich Text'
              ? <RichTextConfig />
              : <div className="p-4 text-center text-tertiary">No configuration available for this widget</div>}
        </div>
      )}
    </>
  );
};

export default WidgetConfig;
