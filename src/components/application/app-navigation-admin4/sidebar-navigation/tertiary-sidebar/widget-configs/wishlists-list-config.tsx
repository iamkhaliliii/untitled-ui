import React, { useState, useEffect } from 'react';
import { Calendar, Grid01, Rows02, Dotpoints02, User02, Monitor01, Square, Maximize01, Minimize01, CheckCircle, Image01, DotsGrid } from '@untitledui/icons';
import { Input } from '@/components/base/input/input';
import { TextArea } from '@/components/base/textarea/textarea';
import { Select } from '@/components/base/select/select';
import { Toggle } from '@/components/base/toggle/toggle';
import { useResolvedTheme } from '@/hooks/use-resolved-theme';
import { cx } from '@/utils/cx';
import { useWidgetConfig } from '@/providers/widget-config-provider';
import { CustomizerSection } from '../customizer-section';

export const WishlistsListConfig: React.FC = () => {
  const { wishlistsListConfig, updateWishlistsListConfig } = useWidgetConfig();
  const theme = useResolvedTheme();
  
  const { 
    style, 
    cardSize, 
    cardStyle, 
    authorInfo,
    votesCounter,
    commentsCounter,
    statusBadge,
    reactionAndReply,
    tags,
    title,
    description,
    tabView,
    allTab,
    trendingTab,
    newTab,
    mostPopularTab,
    deliveredTab
  } = wishlistsListConfig;
  
  // Section collapse/expand states
  const [infoExpanded, setInfoExpanded] = useState(true);
  const [tabViewsExpanded, setTabViewsExpanded] = useState(true);
  const [layoutExpanded, setLayoutExpanded] = useState(true);
  const [propertiesExpanded, setPropertiesExpanded] = useState(true);
  
  // Tab views state
  const [tabViews, setTabViews] = useState([
    { id: 'all', label: 'All', enabled: allTab },
    { id: 'trending', label: 'Trending', enabled: trendingTab },
    { id: 'new', label: 'New', enabled: newTab },
    { id: 'most-popular', label: 'Most Popular', enabled: mostPopularTab },
    { id: 'delivered', label: 'Delivered', enabled: deliveredTab }
  ]);
  const [editingTabId, setEditingTabId] = useState<string | null>(null);
  
  // Update tabView and individual tab configs whenever tabViews change
  useEffect(() => {
    const enabledTabsCount = tabViews.filter(tab => tab.enabled).length;
    const allTabItem = tabViews.find(tab => tab.id === 'all');
    const trendingTabItem = tabViews.find(tab => tab.id === 'trending');
    const newTabItem = tabViews.find(tab => tab.id === 'new');
    const mostPopularTabItem = tabViews.find(tab => tab.id === 'most-popular');
    const deliveredTabItem = tabViews.find(tab => tab.id === 'delivered');
    
    updateWishlistsListConfig({ 
      tabView: enabledTabsCount > 1,
      allTab: allTabItem?.enabled || false,
      trendingTab: trendingTabItem?.enabled || false,
      newTab: newTabItem?.enabled || false,
      mostPopularTab: mostPopularTabItem?.enabled || false,
      deliveredTab: deliveredTabItem?.enabled || false
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabViews]);
  
  // Tab views handlers
  const handleToggleTab = (tabId: string) => {
    if (tabId === 'all') return;
    
    setTabViews(prev => {
      const updatedTabs = prev.map(tab => 
        tab.id === tabId ? { ...tab, enabled: !tab.enabled } : tab
      );
      return updatedTabs;
    });
  };
  
  const handleRenameTab = (tabId: string, newLabel: string) => {
    setTabViews(prev => prev.map(tab => 
      tab.id === tabId ? { ...tab, label: newLabel } : tab
    ));
  };

  const styleOptions = [
    { id: 'card', label: 'Card', icon: Grid01 },
    { id: 'list', label: 'List', icon: Dotpoints02 },
    { id: 'feed', label: 'Feed', icon: Rows02 }
  ];

  const cardSizeOptions = [
    { id: 'small', label: 'Small', icon: Minimize01 },
    { id: 'medium', label: 'Medium', icon: Square },
    { id: 'large', label: 'Large', icon: Maximize01 },
    { id: 'extralarge', label: 'Extra Large', icon: Monitor01 }
  ];

  const cardStyleOptions = [
    { id: 'modern', label: 'Modern Style', icon: Calendar },
    { id: 'simple', label: 'Simple Card', icon: Square }
  ];

  const PropertyToggle = ({ icon: Icon, label, isSelected, onChange, id }: {
    icon: React.ComponentType<any>;
    label: string;
    isSelected: boolean;
    onChange: (value: boolean) => void;
    id: string;
  }) => (
    <div className={cx(
      "flex items-center py-2 px-2 border rounded-md transition-all duration-300 ease-in-out",
      theme === 'dark' 
        ? "border-gray-700 bg-gray-800/50 hover:bg-gray-800/80 hover:border-gray-600"
        : "border-gray-200 bg-white/50 hover:bg-white/80 hover:border-gray-300"
    )}>
      <div className="flex items-center space-x-2">
        <Icon className={cx(
          "h-4 w-4",
          theme === 'dark' ? "text-gray-400" : "text-gray-500"
        )} />
        <span className={cx(
          "text-sm font-medium",
          theme === 'dark' ? "text-gray-100" : "text-gray-900"
        )}>{label}</span>
      </div>
      <div className="ml-auto">
        <Toggle
          id={id}
          isSelected={isSelected}
          onChange={onChange}
          size="sm"
          slim
        />
      </div>
    </div>
  );

  const TabViewItem = ({ tab, onToggle, onRename }: {
    tab: { id: string; label: string; enabled: boolean };
    onToggle: (tabId: string) => void;
    onRename: (tabId: string, newLabel: string) => void;
  }) => {
    const isEditing = editingTabId === tab.id;
    const [editLabel, setEditLabel] = useState(tab.label);

    useEffect(() => {
      setEditLabel(tab.label);
    }, [tab.label]);

    const handleRename = () => {
      onRename(tab.id, editLabel);
      setEditingTabId(null);
    };

    const handleStartEdit = () => {
      setEditingTabId(tab.id);
      setEditLabel(tab.label);
    };

    const handleCancelEdit = () => {
      setEditLabel(tab.label);
      setEditingTabId(null);
    };

    return (
      <div className={cx(
        "flex items-center px-2 py-2 border rounded-lg transition-all duration-200",
        theme === 'dark' 
          ? "border-gray-700 bg-gray-800/50 hover:bg-gray-800/80 hover:border-gray-600"
          : "border-gray-200 bg-white/50 hover:bg-white/80 hover:border-gray-300"
      )}>
        <DotsGrid className={cx(
          "size-4 mr-3 cursor-grab",
          theme === 'dark' ? "text-gray-500" : "text-gray-400"
        )} />

        <div className="flex-1">
          {isEditing ? (
            <Input
              value={editLabel}
              onChange={(value) => setEditLabel(value)}
              onBlur={handleRename}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleRename();
                if (e.key === 'Escape') handleCancelEdit();
              }}
              size="sm"
              autoFocus
            />
          ) : (
            <span 
              className={cx(
                "text-sm font-medium cursor-pointer",
                theme === 'dark' ? "text-gray-100" : "text-gray-900"
              )}
              onDoubleClick={handleStartEdit}
            >
              {tab.label}
            </span>
          )}
        </div>

        <div className="mr-2">
          <Toggle
            isSelected={tab.enabled}
            onChange={() => onToggle(tab.id)}
            size="sm"
            slim
            isDisabled={tab.id === 'all'}
          />
        </div>
      </div>
    );
  };

  const StyleTile = ({ option, isSelected, onClick }: {
    option: { id: string; label: string; icon: React.ComponentType<any> };
    isSelected: boolean;
    onClick: () => void;
  }) => {
    const IconComponent = option.icon;
    return (
      <button
        onClick={onClick}
        className={cx(
          "flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all",
          isSelected
            ? theme === 'dark'
              ? "border-brand-solid bg-brand-solid/20 text-brand-primary"
              : "border-brand-solid bg-brand-50 text-brand-secondary"
            : theme === 'dark'
              ? "border-gray-700 bg-gray-800/50 text-gray-200 hover:border-gray-600 hover:bg-gray-700/60"
              : "border-secondary bg-primary text-secondary hover:border-brand-200 hover:bg-brand-25"
        )}
      >
        <div className={cx(
          "p-2 rounded-md",
          isSelected 
            ? theme === 'dark' 
              ? "bg-brand-solid/30" 
              : "bg-brand-100"
            : theme === 'dark'
              ? "bg-gray-700/60"
              : "bg-secondary/60"
        )}>
          <IconComponent className="size-4" />
        </div>
        <span className="text-xs font-medium">{option.label}</span>
      </button>
    );
  };

  return (
    <div className="space-y-2">
      {/* Info Section */}
      <CustomizerSection
        title="Info"
        isExpanded={infoExpanded}
        onExpandedChange={setInfoExpanded}
      >
        <div className="space-y-3">
          <div>
            <Input
              label='Widget Title'
              id="widget-title"
              value={title}
              onChange={(value) => updateWishlistsListConfig({ title: value })}
              placeholder="Enter widget title"
            />
          </div>

          <div>
            <TextArea
              label='Description'
              id="description"
              value={description}
              onChange={(e) => updateWishlistsListConfig({ description: e.target.value })}
              placeholder="Enter widget description"
              rows={3}
            />
          </div>
        </div>
      </CustomizerSection>

      {/* Divider */}
      <div className="border-t border-secondary"></div>

      {/* Tab Views Section */}
      <CustomizerSection
        title="Tab views"
        isExpanded={tabViewsExpanded}
        onExpandedChange={setTabViewsExpanded}
      >
        <div className="space-y-1.5">
          {tabViews.map((tab) => (
            <TabViewItem
              key={tab.id}
              tab={tab}
              onToggle={handleToggleTab}
              onRename={handleRenameTab}
            />
          ))}
        </div>
      </CustomizerSection>

      {/* Divider */}
      <div className="border-t border-secondary"></div>

      {/* Layout Section */}
      <CustomizerSection
        title="Layout"
        isExpanded={layoutExpanded}
        onExpandedChange={setLayoutExpanded}
      >
        <div className="space-y-4">
          <div>
            <div className="grid grid-cols-3 gap-2">
              {styleOptions.map((option) => (
                <StyleTile
                  key={option.id}
                  option={option}
                  isSelected={style === option.id}
                  onClick={() => updateWishlistsListConfig({ style: option.id as 'card' | 'list' | 'feed' })}
                />
              ))}
            </div>
          </div>

          {style === 'card' && (
            <>
              <div>
                <Select 
                  label="Card Size"
                  items={cardSizeOptions} 
                  selectedKey={cardSize}
                  onSelectionChange={(key) => updateWishlistsListConfig({ cardSize: key as 'small' | 'medium' | 'large' | 'extralarge' })}
                >
                  {(item) => <Select.Item id={item.id} label={item.label} icon={item.icon} />}
                </Select>
              </div>

              <div>
                <Select 
                  label="Card Style"
                  items={cardStyleOptions} 
                  selectedKey={cardStyle}
                  onSelectionChange={(key) => updateWishlistsListConfig({ cardStyle: key as 'modern' | 'simple' })}
                >
                  {(item) => <Select.Item id={item.id} label={item.label} icon={item.icon} />}
                </Select>
              </div>
            </>
          )}
        </div>
      </CustomizerSection>

      {/* Divider */}
      <div className={cx(
        "border-t",
        theme === 'dark' ? "border-gray-700" : "border-secondary"
      )}></div>

      {/* Properties Section */}
      <CustomizerSection
        title="Properties"
        isExpanded={propertiesExpanded}
        onExpandedChange={setPropertiesExpanded}
      >
        <div className="space-y-2">
          <PropertyToggle
            icon={User02}
            label="Author info"
            isSelected={authorInfo}
            onChange={(value) => updateWishlistsListConfig({ authorInfo: value })}
            id="author-info"
          />

          <PropertyToggle
            icon={CheckCircle}
            label="Votes counter"
            isSelected={votesCounter}
            onChange={(value) => updateWishlistsListConfig({ votesCounter: value })}
            id="votes-counter"
          />
          
          <PropertyToggle
            icon={Image01}
            label="Status badge"
            isSelected={statusBadge}
            onChange={(value) => updateWishlistsListConfig({ statusBadge: value })}
            id="status-badge"
          />
          
          <PropertyToggle
            icon={Calendar}
            label="Comments"
            isSelected={commentsCounter}
            onChange={(value) => updateWishlistsListConfig({ commentsCounter: value })}
            id="comments"
          />
          
          <PropertyToggle
            icon={CheckCircle}
            label="Reaction & reply"
            isSelected={reactionAndReply}
            onChange={(value) => updateWishlistsListConfig({ reactionAndReply: value })}
            id="reaction-and-reply"
          />
          
          <PropertyToggle
            icon={Image01}
            label="Tags"
            isSelected={tags}
            onChange={(value) => updateWishlistsListConfig({ tags: value })}
            id="tags"
          />
        </div>
      </CustomizerSection>
    </div>
  );
};

