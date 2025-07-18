import React, { useState } from 'react';
import { ArrowLeft, Settings01, Heart, MessageCircle02, MessageSquare01, Calendar, Eye, InfoCircle, LayoutAlt01, Code01, ChevronDown, ChevronUp, Grid01, List, Rss01, Rows02, Dotpoints02, DotsGrid, User02, Monitor01, Browser, File04, Square, Maximize01, Minimize01, FileCheck01, MarkerPin01, Tag01, Users01, AlertCircle, CheckCircle, Database01, Zap } from '@untitledui/icons';
import { Button } from '@/components/base/buttons/button';
import { Input } from '@/components/base/input/input';
import { Label } from '@/components/base/input/label';
import { TextArea } from '@/components/base/textarea/textarea';
import { Select } from '@/components/base/select/select';
import { Toggle } from '@/components/base/toggle/toggle';
import { Checkbox } from '@/components/base/checkbox/checkbox';
import { Dot } from '@/components/foundations/dot-icon';
import { useWidgetConfig } from '@/providers/widget-config-provider';

interface WidgetConfigProps {
  selectedWidget: {
    id: string;
    label: string;
    icon?: React.ReactNode;
  };
  onBack: () => void;
  onSave: () => void;
}

const WidgetConfig: React.FC<WidgetConfigProps> = ({ selectedWidget, onBack, onSave }) => {
  const { eventsListConfig, updateEventsListConfig } = useWidgetConfig();
  
  // Use config from context
  const { 
    style, 
    cardSize, 
    cardStyle, 
    groupView, 
    groupBy, 
    openPageIn, 
    reactionsCounter, 
    rsvpAction, 
    eventDetails, 
    hostInfo, 
    coverImage,
    tabView,
    allEventsTab,
    upcomingEventsTab,
    pastEventsTab,
    thisMonthEventsTab,
    title,
    description
  } = eventsListConfig;
  
  // Section collapse/expand states
  const [infoExpanded, setInfoExpanded] = useState(true);
  const [layoutExpanded, setLayoutExpanded] = useState(true);
  const [propertiesExpanded, setPropertiesExpanded] = useState(true);
  const [customCSSExpanded, setCustomCSSExpanded] = useState(true);

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
    { id: 'modern', label: 'Modern Style', icon: Zap },
    { id: 'simple', label: 'Simple Card', icon: Square }
  ];

  const openPageOptions = [
    { id: 'post', label: 'Post Page', icon: File04 },
    { id: 'modal', label: 'Modal Content', icon: Browser }
  ];

  const groupByOptions = [
    { id: 'date', label: 'Date', icon: Calendar },
    { id: 'location', label: 'Location', icon: MarkerPin01 },
    { id: 'type', label: 'Type', icon: Tag01 },
    { id: 'author', label: 'Author', icon: User02 },
    { id: 'host', label: 'Host', icon: Users01 },
    { id: 'category', label: 'Category', icon: Grid01 },
    { id: 'status', label: 'Status', icon: CheckCircle }
  ];

  const feedStyleOptions = [
    { id: 'simple', label: 'Simple', icon: List },
    { id: 'expendable', label: 'Expendable', icon: Maximize01 },
    { id: 'withcomments', label: 'With Comments', icon: MessageCircle02 }
  ];

  const PropertyToggle = ({ icon: Icon, label, isSelected, onChange, id }: {
    icon: React.ComponentType<any>;
    label: string;
    isSelected: boolean;
    onChange: (value: boolean) => void;
    id: string;
  }) => (
    <div className="flex items-center py-2 px-2 border border-gray-200 rounded-md bg-white/50 transition-all duration-300 ease-in-out hover:bg-white/80 hover:border-gray-300">
      <div className="flex items-center space-x-2">
        <Icon className="h-4 w-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-900">{label}</span>
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

  const StyleTile = ({ option, isSelected, onClick }: {
    option: { id: string; label: string; icon: React.ComponentType<any> };
    isSelected: boolean;
    onClick: () => void;
  }) => {
    const IconComponent = option.icon;
    return (
      <div
        className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 ${
          isSelected 
            ? 'border-brand-solid bg-brand-50 text-brand-primary shadow-md' 
            : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm'
        }`}
        onClick={onClick}
      >
        <IconComponent className="h-6 w-6 mb-2" />
        <span className="text-sm font-medium">{option.label}</span>
      </div>
    );
  };

  const SectionHeader = ({ icon: Icon, title, isExpanded, onToggle }: {
    icon: React.ComponentType<any>;
    title: string;
    isExpanded: boolean;
    onToggle: () => void;
  }) => (
    <div 
      className={`flex items-center justify-between mb-2 pb-2 cursor-pointer ${
        isExpanded ? 'border-b border-secondary' : ''
      }`}
      onClick={onToggle}
    >
      <div className="flex items-center gap-2">
        <Icon className="size-4 text-brand-secondary" />
        <h5 className="text-xs font-semibold text-primary">{title}</h5>
      </div>
      {isExpanded ? (
        <ChevronUp className="size-4 text-brand-secondary" />
      ) : (
        <ChevronDown className="size-4 text-gray-400" />
      )}
    </div>
  );

  const renderEventsListConfig = () => (
    <div className="space-y-4">
      {/* Info Section */}
      <div className="border border-secondary rounded-lg bg-primary p-2">
        <SectionHeader
          icon={InfoCircle}
          title="Info"
          isExpanded={infoExpanded}
          onToggle={() => setInfoExpanded(!infoExpanded)}
        />
        {infoExpanded && (
          <div className="bg-secondary/20 rounded-lg p-2">
            <div className="space-y-3">
              <div>
                <Input
                label='Widget Title'
                  id="widget-title"
                  value={title}
                  onChange={(value) => updateEventsListConfig({ title: value })}
                  placeholder="Enter widget title"
                />
              </div>

              <div>
                <TextArea
                  label='Description'
                  id="description"
                  value={description}
                  onChange={(e) => updateEventsListConfig({ description: e.target.value })}
                  placeholder="Enter widget description"
                  rows={3}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Layout Section */}
      <div className="border border-secondary rounded-lg bg-primary p-2">
        <SectionHeader
          icon={LayoutAlt01}
          title="Layout"
          isExpanded={layoutExpanded}
          onToggle={() => setLayoutExpanded(!layoutExpanded)}
        />
        {layoutExpanded && (
          <div className="bg-secondary/20 rounded-lg p-3">
            <div className="space-y-6">
              <div>
                <Label htmlFor="style">Style</Label>
                <div className="grid grid-cols-3 gap-2">
                  {styleOptions.map((option) => (
                    <StyleTile
                      key={option.id}
                      option={option}
                      isSelected={style === option.id}
                      onClick={() => updateEventsListConfig({ style: option.id as 'card' | 'list' | 'feed' })}
                    />
                  ))}
                </div>
              </div>

              {style === 'card' && (
                <>
                  <div>
                    <Label htmlFor="card-size">Card Size</Label>
                    <Select 
                      items={cardSizeOptions} 
                      selectedKey={cardSize}
                      onSelectionChange={(key) => updateEventsListConfig({ cardSize: key as 'small' | 'medium' | 'large' | 'extralarge' })}
                    >
                      {(item) => <Select.Item id={item.id} label={item.label} icon={item.icon} />}
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="card-style">Card Style</Label>
                    <Select 
                      items={cardStyleOptions} 
                      selectedKey={cardStyle}
                      onSelectionChange={(key) => updateEventsListConfig({ cardStyle: key as 'modern' | 'simple' })}
                    >
                      {(item) => <Select.Item id={item.id} label={item.label} icon={item.icon} />}
                    </Select>
                  </div>
                </>
              )}

              {style === 'list' && (
                <>
                </>
              )}

              {style === 'feed' && (
                <>
                  <div>
                    <Label htmlFor="feed-layout">Feed Style</Label>
                    <Select 
                      items={feedStyleOptions} 
                      selectedKey="simple"
                      onSelectionChange={(key) => console.log('Feed layout:', key)}
                    >
                      {(item) => <Select.Item id={item.id} label={item.label} icon={item.icon} />}
                    </Select>
                  </div>
                </>
              )}
<div className="space-y-6">
                  {/* Tab View Section */}
                  <div className="shadow-xs ring-1 ring-primary rounded-lg bg-primary py-2 px-3 space-y-4 mb-6">

<div className="flex items-center justify-between">
<Label htmlFor="group-view" className="truncate text-md font-medium text-primary">Tab View</Label>
<div className="ml-auto">
<Toggle
id="tab-view"
isSelected={tabView}
onChange={(value) => updateEventsListConfig({ tabView: value })}
size="sm"
slim
/>
</div>
</div>

{tabView && (
<div className="ml-1 space-y-3 border-l-2 border-gray-200 pl-4 pb-2">
  <div className="flex items-center justify-between gap-2">
    <DotsGrid className="size-4 text-gray-400" />
    <Checkbox label="All Events" size="sm" isDisabled={true} isSelected={allEventsTab} onChange={(value) => updateEventsListConfig({ allEventsTab: value })}/>
  </div>
  <div className="flex items-center justify-between gap-2">
    <DotsGrid className="size-4 text-gray-400" />
    <Checkbox label="Upcoming Events" size="sm" isSelected={upcomingEventsTab} onChange={(value) => updateEventsListConfig({ upcomingEventsTab: value })}/>
  </div>
  <div className="flex items-center justify-between gap-2">
    <DotsGrid className="size-4 text-gray-400" />
    <Checkbox label="Past Events" size="sm" isSelected={pastEventsTab} onChange={(value) => updateEventsListConfig({ pastEventsTab: value })}/>
  </div>
  <div className="flex items-center justify-between gap-2">
    <DotsGrid className="size-4 text-gray-400" />
    <Checkbox label="This Month Events" size="sm" isSelected={thisMonthEventsTab} onChange={(value) => updateEventsListConfig({ thisMonthEventsTab: value })}/>
</div>

</div>
)}
</div>
{/* Group View Section */}
<div className="shadow-xs ring-1 ring-primary rounded-lg bg-primary py-2 px-3 space-y-4 ">

<div className="flex items-center justify-between">
<Label htmlFor="group-view" className="truncate text-md font-medium text-primary">Group View</Label>
<div className="ml-auto">
<Toggle
id="group-view"
isSelected={groupView}
onChange={(value) => updateEventsListConfig({ groupView: value })}
size="sm"
slim
/>
</div>
</div>

{groupView && (
<div className="ml-1 space-y-3 border-l-2 border-gray-200 pl-4 pb-2">
  <div>
    <Label htmlFor="group-by">Group by</Label>
    <Select 
      items={groupByOptions} 
      selectedKey={groupBy}
                            onSelectionChange={(key) => updateEventsListConfig({ groupBy: key as 'date' | 'location' | 'type' | 'author' | 'host' | 'category' | 'status' })}
    >
      {(item) => <Select.Item id={item.id} label={item.label} icon={item.icon} />}
    </Select>
  </div>
</div>
)}
                </div>

</div>
              <div>
                <Label htmlFor="open-page-in">Open Page In</Label>
                <Select 
                  items={openPageOptions} 
                  selectedKey={openPageIn}
                  onSelectionChange={(key) => updateEventsListConfig({ openPageIn: key as 'post' | 'modal' })}
                >
                  {(item) => <Select.Item id={item.id} label={item.label} icon={item.icon} />}
                </Select>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border border-secondary rounded-lg bg-primary p-2">
        <SectionHeader
          icon={Eye}
          title="Properties"
          isExpanded={propertiesExpanded}
          onToggle={() => setPropertiesExpanded(!propertiesExpanded)}
        />
        {propertiesExpanded && (
          <div className="bg-secondary/20 rounded-lg p-1">
            <div className="space-y-2">
            {!(style === 'card' && cardStyle === 'modern') && (
              <PropertyToggle
                icon={Monitor01}
                label="Cover image"
                isSelected={coverImage}
                onChange={(value) => updateEventsListConfig({ coverImage: value })}
                id="cover-image"
              />
            )}
                            <PropertyToggle
                icon={Calendar}
                label="Event details"
                isSelected={eventDetails}
                onChange={(value) => updateEventsListConfig({ eventDetails: value })}
                id="event-details"
              />

            <PropertyToggle
                icon={User02}
                label="Host info"
                isSelected={hostInfo}
                onChange={(value) => updateEventsListConfig({ hostInfo: value })}
                id="host-info"
              />
              
              
              <PropertyToggle
                icon={Heart}
                label="Reactions counter"
                isSelected={reactionsCounter}
                onChange={(value) => updateEventsListConfig({ reactionsCounter: value })}
                id="reactions-counter"
              />
              
              {!(style === 'card' && cardStyle === 'modern') && (
                <PropertyToggle
                  icon={CheckCircle}
                  label="RSVP Action"
                  isSelected={rsvpAction}
                  onChange={(value) => updateEventsListConfig({ rsvpAction: value })}
                  id="rsvp-action"
                />
              )}
              

              

            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderDefaultConfig = () => (
    <div className="space-y-4">
      {/* Info Section */}
      <div className="border border-secondary rounded-lg bg-primary p-2">
        <SectionHeader
          icon={InfoCircle}
          title="Info"
          isExpanded={infoExpanded}
          onToggle={() => setInfoExpanded(!infoExpanded)}
        />
        {infoExpanded && (
          <div className="bg-secondary/20 rounded-lg p-2">
            <div className="space-y-3">
              <div>
                <Input
                label='Widget Title'
                  id="widget-title"
                  value={title}
                  onChange={(value) => updateEventsListConfig({ title: value })}
                  placeholder="Enter widget title"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <TextArea
                  id="description"
                  value={description}
                  onChange={(e) => updateEventsListConfig({ description: e.target.value })}
                  placeholder="Enter widget description"
                  rows={3}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Layout Section */}
      <div className="border border-secondary rounded-lg bg-primary p-2">
        <SectionHeader
          icon={LayoutAlt01}
          title="Layout"
          isExpanded={layoutExpanded}
          onToggle={() => setLayoutExpanded(!layoutExpanded)}
        />
        {layoutExpanded && (
          <div className="bg-secondary/20 rounded-lg p-3">
            <div className="space-y-4">
              <div>
                <Label htmlFor="max-items">Max Items</Label>
                <Input
                  id="max-items"
                  type="number"
                  defaultValue="10"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom CSS Section */}
      <div className="border border-secondary rounded-lg bg-primary p-2">
        <SectionHeader
          icon={Code01}
          title="Custom CSS"
          isExpanded={customCSSExpanded}
          onToggle={() => setCustomCSSExpanded(!customCSSExpanded)}
        />
        {customCSSExpanded && (
          <div className="bg-secondary/20 rounded-lg p-3">
            <div className="space-y-4">
              <div>
                <TextArea
                  placeholder="Enter custom CSS styles..."
                  rows={4}
                  className="font-mono text-sm"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-4 transition-all duration-300 ease-in-out">
      {selectedWidget.label === 'Events List' ? renderEventsListConfig() : renderDefaultConfig()}
    </div>
  );
};

export default WidgetConfig; 