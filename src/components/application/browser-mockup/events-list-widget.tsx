import React, { useState, useEffect } from 'react';
import { DotsHorizontal, ArrowRight, Calendar, Users01, Ticket01, Clock, MarkerPin01, Heart, SearchLg, Home01, Rss01, Bookmark, User01, MessageChatCircle, MessageCircle01, Check, X, HelpCircle, Share02, Star01, Globe01, CheckCircle, Repeat02 } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import type { Key } from "react-aria-components";
import { Tabs } from "@/components/application/tabs/tabs";
import { useResolvedTheme } from "@/hooks/use-resolved-theme";
import { useWidgetConfig } from "@/providers/widget-config-provider";
import { Button } from '@/components/base/buttons/button';
import { Badge, BadgeWithIcon } from '@/components/base/badges/badges';


interface EventsListWidgetProps {
  className?: string;
  theme?: 'light' | 'dark';
  device?: 'mobile' | 'tablet' | 'desktop';
}

// RSVP States for Event Cards
type RSVPState = 'open' | 'closed' | 'completed';

interface RSVPStateConfig {
  label: string;
  color: 'primary' | 'secondary' | 'tertiary';
  disabled: boolean;
}

const rsvpStateConfig: Record<RSVPState, RSVPStateConfig> = {
  open: {
    label: 'RSVP Now',
    color: 'primary',
    disabled: false,
  },
  closed: {
    label: 'RSVP Closed',
    color: 'secondary',
    disabled: true,
  },
  completed: {
    label: 'Event Completed',
    color: 'tertiary',
    disabled: true,
  }
};

// Function to randomly assign RSVP state to events
const getRandomRSVPState = (eventId: number): RSVPState => {
  const states: RSVPState[] = ['open', 'closed', 'completed'];
  // Use event ID as seed for consistent random state per event
  const index = eventId % states.length;
  return states[index];
};

export const EventsListWidget: React.FC<EventsListWidgetProps> = ({ className, theme: propTheme, device = 'desktop' }) => {
  const { eventsListConfig } = useWidgetConfig();
  const theme = useResolvedTheme(propTheme);
  const [activeTab, setActiveTab] = useState<Key>('All Events');
  
  // Generate available tabs based on configuration
  const getAvailableTabs = () => {
    const tabs = [];
    if (eventsListConfig.allEventsTab) tabs.push({ id: 'All Events', label: 'All Events' });
    if (eventsListConfig.upcomingEventsTab) tabs.push({ id: 'Upcoming Events', label: 'Upcoming Events' });
    if (eventsListConfig.pastEventsTab) tabs.push({ id: 'Past Events', label: 'Past Events' });
    if (eventsListConfig.thisMonthEventsTab) tabs.push({ id: 'This Month Events', label: 'This Month Events' });
    return tabs;
  };
  
  const availableTabs = getAvailableTabs();
  
  // Reset active tab when configuration changes
  useEffect(() => {
    const tabIds = availableTabs.map(tab => tab.id);
    if (tabIds.length > 0 && !tabIds.includes(activeTab as string)) {
      setActiveTab(tabIds[0]);
    }
  }, [availableTabs, activeTab]);

  // Sample events data
  const eventsData = [
    {
      id: 1,
      title: "React Conference 2024",
      description: "Join us for the biggest React conference of the year with industry experts.",
      date: "March 15, 2024",
      time: "9:00 AM - 6:00 PM",
      location: "LA, USA",
      type: "In-Person",
      category: "Technology",
      organizer: "Tech Events Inc.",
      attendees: 42,
      status: "live",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=400&fit=crop&crop=center&auto=format&q=80"
    },
    {
      id: 2,
      title: "Design Thinking Workshop",
      description: "Hands-on workshop to master design thinking methodology.",
      date: "March 18, 2024",
      time: "2:00 PM - 5:00 PM",
      location: "Online",
      type: "Online",
      category: "Design",
      organizer: "Design Academy",
      organizers: [
        {
          name: "Emily Chertow",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616c9ad0096?w=32&h=32&fit=crop&crop=face"
        },
        {
          name: "MacKenzie Huneke",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face"
        }
      ],
      attendees: 1,
      isRecurring: true,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop&crop=center&auto=format&q=80"
    },
    {
      id: 3,
      title: "Startup Pitch Competition",
      description: "Watch innovative startups pitch their ideas to expert judges.",
      date: "March 22, 2024",
      time: "7:00 PM - 10:00 PM",
      location: "New York, NY",
      type: "In-Person",
      category: "Business",
      attendees: 0,
      organizer: "Startup Hub",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=400&fit=crop&crop=center&auto=format&q=80"
    },
    {
      id: 4,
      title: "AI & Machine Learning Summit",
      description: "Explore the latest trends in AI and ML with leading experts.",
      date: "March 25, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Online",
      type: "Online",
      category: "Technology",
      organizer: "AI Institute",
      status: "live",
      isRecurring: true,
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop&crop=center&auto=format&q=80"
    }
  ];

  // Group events based on the selected groupBy criteria
  const groupEvents = (events: any[], groupBy: string) => {
    const grouped = events.reduce((acc, event) => {
      let groupKey = '';
      
      switch (groupBy) {
        case 'date':
          groupKey = event.date;
          break;
        case 'location':
          groupKey = event.location;
          break;
        case 'type':
          groupKey = event.type;
          break;
        case 'category':
          groupKey = event.category;
          break;
        case 'organizer':
        case 'author':
        case 'host':
          groupKey = event.organizer;
          break;
        case 'status':
          groupKey = 'Active'; // Default status since our sample data doesn't have status
          break;
        default:
          groupKey = 'All Events';
      }
      
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(event);
      return acc;
    }, {} as Record<string, any[]>);
    
    return grouped;
  };

  const groupedEvents = eventsListConfig.groupView ? groupEvents(eventsData, eventsListConfig.groupBy) : { 'All Events': eventsData };

  // Get group label and icon for display
  const getGroupLabelAndIcon = (groupKey: string, groupBy: string) => {
    switch (groupBy) {
      case 'date':
        return { icon: Calendar, label: groupKey };
      case 'location':
        return { icon: MarkerPin01, label: groupKey };
      case 'type':
        return { icon: Ticket01, label: groupKey };
      case 'category':
        return { icon: Rss01, label: groupKey };
      case 'organizer':
      case 'author':
      case 'host':
        return { icon: Users01, label: groupKey };
      case 'status':
        return { icon: Clock, label: groupKey };
      default:
        return { icon: Rss01, label: groupKey };
    }
  };

  const renderEventCard = (event: any, index: number) => {
    if (eventsListConfig.cardStyle === 'simple') {
      return (
        <div key={index} className={cx(
          "group relative rounded-2xl border overflow-hidden flex flex-col h-full cursor-pointer transition-all duration-200 hover:shadow-md",
          theme === 'dark' 
            ? "bg-gray-900 border-gray-700 hover:border-gray-600 hover:shadow-gray-900/50" 
            : "bg-white border-gray-300 hover:shadow-gray-100/10 hover:border-brand-200"
        )}
        style={{
          animationDelay: `${index * 100}ms`,
          animation: 'fadeInUp 0.6s ease-out forwards'
        }}>
          {/* Event Image */}
          {eventsListConfig.coverImage && (
            <div className="relative overflow-hidden aspect-square">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-102"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
              
              {/* Overlay badges */}
              <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                {event.status === 'live' && (
                  <span className={cx(
                    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-sm font-medium ring-1 ring-inset",
                    theme === 'dark'
                      ? "bg-red-900/80 text-red-200 ring-red-800"
                      : "bg-utility-error-50 text-utility-error-700 ring-utility-error-200"
                  )}>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error-600 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-error-600"></span>
                    </span>
                    Live Now
                  </span>
                )}
                {event.isRecurring && (
                  <span className={cx(
                    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-sm font-medium ring-1 ring-inset",
                    theme === 'dark'
                      ? "bg-blue-900/80 text-blue-200 ring-blue-800"
                      : "bg-utility-brand-50 text-utility-brand-700 ring-utility-brand-200"
                  )}>
                    <Repeat02 className="w-4 h-4" />
                    Recurring Event
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Event Content */}
          <div className="p-3 flex flex-col flex-1">
            {/* Organizer(s) - Moved to top */}
            {eventsListConfig.hostInfo && (
              <div className="mb-2">
                <div className="flex items-center gap-2">
                  {event.organizers && event.organizers.length > 1 ? (
                    <>
                      <div className="flex -space-x-2">
                        {event.organizers.slice(0, 4).map((org: any, idx: number) => (
                          <div
                            key={idx}
                            className={cx(
                              "w-6 h-6 rounded-full overflow-hidden ring-1",
                              theme === 'dark'
                                ? "border-2 border-gray-900 ring-gray-700"
                                : "border-2 border-white ring-gray-200"
                            )}
                            style={{ zIndex: event.organizers.length - idx }}
                          >
                            <img
                              src={org.avatar}
                              alt={org.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(org.name)}&background=667eea&color=fff&size=128`;
                              }}
                            />
                          </div>
                        ))}
                        {event.organizers.length > 4 && (
                          <div className={cx(
                            "w-6 h-6 rounded-full flex items-center justify-center ring-1",
                            theme === 'dark'
                              ? "border-2 border-gray-900 bg-gray-800 ring-gray-700"
                              : "border-2 border-white bg-gray-100 ring-gray-200"
                          )}>
                            <span className={cx(
                              "text-[10px] font-semibold",
                              theme === 'dark' ? "text-gray-300" : "text-gray-600"
                            )}>+{event.organizers.length - 4}</span>
                          </div>
                        )}
                      </div>
                      <span className={cx(
                        "text-xs",
                        theme === 'dark' ? "text-gray-400" : "text-gray-600"
                      )}>By {event.organizers.length} hosts</span>
                    </>
                  ) : (
                    <>
                      <div className={cx(
                        "w-6 h-6 rounded-full overflow-hidden ring-1",
                        theme === 'dark'
                          ? "border-2 border-gray-900 ring-gray-700"
                          : "border-2 border-white ring-gray-200"
                      )}>
                        <img 
                          src="https://i.pravatar.cc/150?img=1" 
                          alt={event.organizer} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(event.organizer)}&background=667eea&color=fff&size=128`;
                          }}
                        />
                      </div>
                      <span className={cx(
                        "text-xs",
                        theme === 'dark' ? "text-gray-400" : "text-gray-600"
                      )}>By {event.organizer}</span>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Event Title */}
            <h3 className={cx(
              "text-xl font-bold mb-3 line-clamp-2 group-hover:text-brand-solid transition-colors duration-200",
              theme === 'dark' ? "text-gray-100" : "text-gray-900"
            )}>
              {event.title}
            </h3>

            {/* Event Details */}
            <div className="space-y-1 flex-1">
              {eventsListConfig.eventDetails && (
                <>
                  <div className={cx(
                    "flex items-center gap-2 text-sm transition-colors",
                    theme === 'dark' ? "text-gray-400 group-hover:text-gray-200" : "text-gray-600 group-hover:text-gray-900"
                  )}>
                    <Calendar className="h-3.5 w-3.5 text-brand-solid" />
                    <span className="font-medium">{event.date}</span>
                  </div>
                  <div className={cx(
                    "flex items-center gap-2 text-sm transition-colors",
                    theme === 'dark' ? "text-gray-400 group-hover:text-gray-200" : "text-gray-600 group-hover:text-gray-900"
                  )}>
                    <Clock className="h-3.5 w-3.5 text-success-solid" />
                    <span>{event.time}</span>
                  </div>
                </>
              )}
              
              {/* Location - Always visible */}
              <div className={cx(
                "flex items-center gap-2 text-sm transition-colors",
                theme === 'dark' ? "text-gray-400 group-hover:text-gray-200" : "text-gray-600 group-hover:text-gray-900"
              )}>
                <MarkerPin01 className="h-3.5 w-3.5 text-warning-solid" />
                <span>{event.location}</span>
              </div>
            </div>

            {/* Actions Footer */}
            <div className={cx(
              "pt-3 mt-2 border-t transition-colors",
              theme === 'dark' ? "border-gray-700 group-hover:border-gray-600" : "border-gray-200 group-hover:border-gray-300"
            )}>
              <div className="flex items-center justify-end">
                {/* RSVP Button - Right Side only */}
                {(() => {
                  const rsvpState = getRandomRSVPState(event.id);
                  const rsvpConfig = rsvpStateConfig[rsvpState];
                  const label = rsvpConfig.label === 'RSVP Now' ? 'RSVP Now →' : rsvpConfig.label;
                  const disabled = rsvpState !== 'open';
                  
                  return (
                    <Button
                      color="secondary"
                      size="sm"
                      onClick={(e: React.MouseEvent) => e.stopPropagation()}
                      className={cx(
                        "px-4 py-2",
                        disabled && 'opacity-50 cursor-not-allowed',
                        theme === 'dark' && "!bg-gray-700 !text-gray-200 hover:!bg-gray-600 !ring-gray-600"
                      )}
                      disabled={disabled}
                    >
                      {label}
                    </Button>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Modern card style (default) - original design
    return (
      <div key={index} className={cx(
        "rounded-lg border cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 ease-in-out group relative overflow-hidden",
        theme === 'dark'
          ? "bg-gray-900 border-gray-800 hover:border-gray-700"
          : "bg-white border-gray-200 hover:border-gray-300"
      )}
      style={{
        animationDelay: `${index * 100}ms`,
        animation: 'fadeInUp 0.6s ease-out forwards'
      }}>
        {/* Event Image */}
        {eventsListConfig.coverImage && (
          <div className="relative overflow-hidden rounded-lg aspect-[1/1]">
            <img 
              src={event.image} 
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Bottom blur gradient effect */}
            <div className="pointer-events-none absolute bottom-0 left-0 h-[40%] w-full">
              <div className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{maskImage: 'linear-gradient(rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 11.1111%, rgb(255, 255, 255) 22.2222%, rgba(255, 255, 255, 0) 33.3333%)', backdropFilter: 'blur(0px)'}}></div>
              <div className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{maskImage: 'linear-gradient(rgba(255, 255, 255, 0) 11.1111%, rgb(255, 255, 255) 22.2222%, rgb(255, 255, 255) 33.3333%, rgba(255, 255, 255, 0) 44.4444%)', backdropFilter: 'blur(8px)'}}></div>
              <div className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{maskImage: 'linear-gradient(rgba(255, 255, 255, 0) 22.2222%, rgb(255, 255, 255) 33.3333%, rgb(255, 255, 255) 44.4444%, rgba(255, 255, 255, 0) 55.5556%)', backdropFilter: 'blur(16px)'}}></div>
              <div className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{maskImage: 'linear-gradient(rgba(255, 255, 255, 0) 33.3333%, rgb(255, 255, 255) 44.4444%, rgb(255, 255, 255) 55.5556%, rgba(255, 255, 255, 0) 66.6667%)', backdropFilter: 'blur(24px)'}}></div>
              <div className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{maskImage: 'linear-gradient(rgba(255, 255, 255, 0) 44.4444%, rgb(255, 255, 255) 55.5556%, rgb(255, 255, 255) 66.6667%, rgba(255, 255, 255, 0) 77.7778%)', backdropFilter: 'blur(32px)'}}></div>
              <div className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{maskImage: 'linear-gradient(rgba(255, 255, 255, 0) 55.5556%, rgb(255, 255, 255) 66.6667%, rgb(255, 255, 255) 77.7778%, rgba(255, 255, 255, 0) 88.8889%)', backdropFilter: 'blur(40px)'}}></div>
              <div className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{maskImage: 'linear-gradient(rgba(255, 255, 255, 0) 66.6667%, rgb(255, 255, 255) 77.7778%, rgb(255, 255, 255) 88.8889%, rgba(255, 255, 255, 0) 100%)', backdropFilter: 'blur(48px)'}}></div>
              <div className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{maskImage: 'linear-gradient(rgba(255, 255, 255, 0) 77.7778%, rgb(255, 255, 255) 88.8889%, rgb(255, 255, 255) 100%, rgba(255, 255, 255, 0) 111.111%)', backdropFilter: 'blur(56px)'}}></div>
            </div>
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10"></div>
            
            {/* Overlay badges - Top Left */}
            <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
              {event.status === 'live' && (
                <span className={cx(
                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-sm font-medium ring-1 ring-inset",
                  theme === 'dark'
                    ? "bg-red-900/80 text-red-200 ring-red-800"
                    : "bg-utility-error-50 text-utility-error-700 ring-utility-error-200"
                )}>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error-600 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-error-600"></span>
                  </span>
                  Live Now
                </span>
              )}
              {event.isRecurring && (
                <span className={cx(
                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-sm font-medium ring-1 ring-inset",
                  theme === 'dark'
                    ? "bg-blue-900/80 text-blue-200 ring-blue-800"
                    : "bg-utility-brand-50 text-utility-brand-700 ring-utility-brand-200"
                )}>
                  <Repeat02 className="w-4 h-4" />
                  Recurring Event
                </span>
              )}
            </div>
            
            {/* Date badge */}
            {eventsListConfig.eventDetails && (
              <div className="absolute top-3 right-3 z-10">
                <div className="bg-black/50 backdrop-blur-sm text-white rounded-lg px-2 py-1.5">
                  <div className="text-center">
                    <div className="text-[0.6rem] font-medium uppercase tracking-wider opacity-90">Jul</div>
                    <div className="text-[0.75rem] font-bold leading-none">25</div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Bottom content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
              <div className="space-y-2">
                {/* Host Info */}
                {eventsListConfig.hostInfo && (
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-4 h-4 rounded-full overflow-hidden border border-white/30">
                      <div className="w-full h-full bg-white/80"></div>
                    </div>
                    <span className="text-[0.7rem] text-white/90 font-medium drop-shadow-sm">
                      by {event.organizer}
                    </span>
                  </div>
                )}
                
                <h3 className="font-bold text-sm text-white line-clamp-2 drop-shadow-lg">
                  {event.title}
                  <ArrowRight className="inline w-4 h-4 text-white/80 group-hover:text-white opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300 ml-1" />
                </h3>
                
                {/* Location, Attendees, and RSVP in one line */}
                <div className="flex items-center justify-between text-[0.75rem] text-white/80">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <MarkerPin01 className="w-3 h-3" />
                      <span className="truncate max-w-[120px]">{event.location}</span>
                    </div>
                    {eventsListConfig.attended && (
                      <div className="flex items-center gap-1.5">
                        <Users01 className="w-3 h-3" />
                        <span className="text-xs font-medium">105</span>
                      </div>
                    )}
                  </div>
                  
                  {/* RSVP Button */}
                  <Button 
                    color="tertiary" 
                    size="sm" 
                    onClick={(e: React.MouseEvent) => e.stopPropagation()}
                    className="text-white rounded-full text-xs font-medium transition-all duration-200 hover:scale-105 shadow-lg backdrop-blur-sm border border-blue-500/30"
                  >
                    RSVP Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fallback content when no image */}
        {!eventsListConfig.coverImage && (
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              {event.title}
            </h3>
            {eventsListConfig.eventDetails && (
              <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mb-2">
                <Calendar className="h-3 w-3" />
                <span>{event.date}</span>
              </div>
            )}
            {/* Member Count */}
            {eventsListConfig.attended && (
              <div className="flex items-center gap-1.5 mb-3">
                <Users01 className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">105</span>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <MarkerPin01 className="w-3 h-3" />
                <span className="text-xs text-gray-600 dark:text-gray-400">{event.location}</span>
              </div>
              <button className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors">
                RSVP Now
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderEventList = (event: any, index: number) => (
    <div key={index} className={cx(
      "group rounded-lg border p-5 transition-all duration-300 cursor-pointer relative",
      theme === 'dark' 
        ? "bg-gray-900 border-gray-800 hover:border-gray-700"
        : "bg-white border-gray-200 hover:border-gray-300"
    )}
    style={{
      animationDelay: `${index * 80}ms`,
      animation: 'slideInLeft 0.5s ease-out forwards'
    }}>
      {/* Badges - Top Right */}
      <div className="absolute top-4 right-4 flex gap-2 items-center z-10">
        {event.status === 'live' && (
          <span className={cx(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-sm font-medium ring-1 ring-inset",
            theme === 'dark'
              ? "bg-red-900/80 text-red-200 ring-red-800"
              : "bg-utility-error-50 text-utility-error-700 ring-utility-error-200"
          )}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error-600 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-error-600"></span>
            </span>
            Live Now
          </span>
        )}
        {event.isRecurring && (
          <span className={cx(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-sm font-medium ring-1 ring-inset",
            theme === 'dark'
              ? "bg-blue-900/80 text-blue-200 ring-blue-800"
              : "bg-utility-brand-50 text-utility-brand-700 ring-utility-brand-200"
          )}>
            <Repeat02 className="w-4 h-4" />
            Recurring Event
          </span>
        )}
      </div>

      <div className="flex gap-4">
        {/* Cover Image - Left Side */}
        {eventsListConfig.coverImage && (
          <div className="flex-shrink-0">
            <div className="w-24 h-24 rounded-lg overflow-hidden">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
        
        {eventsListConfig.coverImage && (
          <div className={cx(
            "w-px my-1",
            theme === 'dark' ? "bg-gray-700" : "bg-gray-100"
          )}></div>
        )}
        
        <div className="flex-1 min-w-0 space-y-2">
          {eventsListConfig.eventDetails && (
            <div className={cx(
              "flex items-center gap-2 text-xs font-medium",
              theme === 'dark' ? "text-gray-400" : "text-gray-500"
            )}>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{event.date}</span>
              </div>
              <div className={cx(
                "w-px h-3",
                theme === 'dark' ? "bg-gray-600" : "bg-gray-300"
              )}></div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{event.time}</span>
              </div>
            </div>
          )}
          
          <h3 className={cx(
            "text-xl font-bold leading-tight",
            theme === 'dark' ? "text-gray-100" : "text-gray-900"
          )}>
            {event.title}
          </h3>
          
          <div className={cx(
            "flex items-center gap-3 text-xs",
            theme === 'dark' ? "text-gray-400" : "text-gray-500"
          )}>
            <div className="flex items-center gap-1">
              <MarkerPin01 className="w-3 h-3" />
              <span>{event.location}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Avatar Group - Attendees */}
              {eventsListConfig.attended && (
                <div className="flex items-center gap-2">
                  {event.attendees === 0 ? (
                    // No attendees - just label
                    <span className={cx(
                      "text-xs",
                      theme === 'dark' ? "text-gray-400" : "text-gray-600"
                    )}>
                      0 attending
                    </span>
                  ) : event.attendees === 1 ? (
                    // Single attendee
                    <>
                      <div className={cx(
                        "w-6 h-6 rounded-full overflow-hidden ring-1",
                        theme === 'dark' ? "border-2 border-gray-900 ring-gray-700" : "border-2 border-white ring-gray-200"
                      )}>
                        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face" alt="Avatar" className="w-full h-full object-cover" />
                      </div>
                      <span className={cx(
                        "text-xs",
                        theme === 'dark' ? "text-gray-400" : "text-gray-600"
                      )}>
                        1 attending
                      </span>
                    </>
                  ) : (
                    // Multiple attendees
                    <>
                      <div className="flex -space-x-2">
                        <div className={cx(
                          "w-6 h-6 rounded-full overflow-hidden ring-1",
                          theme === 'dark' ? "border-2 border-gray-900 ring-gray-700" : "border-2 border-white ring-gray-200"
                        )} style={{ zIndex: 3 }}>
                          <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face" alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                        <div className={cx(
                          "w-6 h-6 rounded-full overflow-hidden ring-1",
                          theme === 'dark' ? "border-2 border-gray-900 ring-gray-700" : "border-2 border-white ring-gray-200"
                        )} style={{ zIndex: 2 }}>
                          <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face" alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                        <div className={cx(
                          "w-6 h-6 rounded-full overflow-hidden ring-1",
                          theme === 'dark' ? "border-2 border-gray-900 ring-gray-700" : "border-2 border-white ring-gray-200"
                        )} style={{ zIndex: 1 }}>
                          <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=32&h=32&fit=crop&crop=face" alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                      </div>
                      <span className={cx(
                        "text-xs",
                        theme === 'dark' ? "text-gray-400" : "text-gray-600"
                      )}>
                        {event.attendees} attending
                      </span>
                    </>
                  )}
                </div>
              )}
              
              {/* Host Info - Moved here next to attending */}
              {eventsListConfig.hostInfo && (
                <div className="flex items-center gap-2">
                  {event.organizers && event.organizers.length > 1 ? (
                    <>
                      <div className="flex -space-x-2">
                        {event.organizers.slice(0, 4).map((org: any, idx: number) => (
                          <div
                            key={idx}
                            className={cx(
                              "w-6 h-6 rounded-full overflow-hidden ring-1",
                              theme === 'dark' ? "border-2 border-gray-900 ring-gray-700" : "border-2 border-white ring-gray-200"
                            )}
                            style={{ zIndex: event.organizers.length - idx }}
                          >
                            <img
                              src={org.avatar}
                              alt={org.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(org.name)}&background=667eea&color=fff&size=128`;
                              }}
                            />
                          </div>
                        ))}
                        {event.organizers.length > 4 && (
                          <div className={cx(
                            "w-6 h-6 rounded-full flex items-center justify-center ring-1",
                            theme === 'dark' ? "border-2 border-gray-900 bg-gray-800 ring-gray-700" : "border-2 border-white bg-gray-100 ring-gray-200"
                          )}>
                            <span className={cx(
                              "text-[10px] font-semibold",
                              theme === 'dark' ? "text-gray-300" : "text-gray-600"
                            )}>+{event.organizers.length - 4}</span>
                          </div>
                        )}
                      </div>
                      <span className={cx(
                        "text-xs",
                        theme === 'dark' ? "text-gray-400" : "text-gray-600"
                      )}>By {event.organizers.length} hosts</span>
                    </>
                  ) : (
                    <>
                      <div className={cx(
                        "w-6 h-6 rounded-full overflow-hidden ring-1",
                        theme === 'dark' ? "border-2 border-gray-900 ring-gray-700" : "border-2 border-white ring-gray-200"
                      )}>
                        <img 
                          src="https://i.pravatar.cc/150?img=1" 
                          alt={event.organizer} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(event.organizer)}&background=667eea&color=fff&size=128`;
                          }}
                        />
                      </div>
                      <span className={cx(
                        "text-xs",
                        theme === 'dark' ? "text-gray-400" : "text-gray-600"
                      )}>By {event.organizer}</span>
                    </>
                  )}
                </div>
              )}
            </div>
            
            {/* RSVP Button on the right side */}
            <Button
              color="secondary"
              size="sm"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className={cx(
                "px-3 py-1.5 text-xs",
                theme === 'dark' && "!bg-gray-700 !text-gray-200 hover:!bg-gray-600 !ring-gray-600"
              )}
            >
              RSVP Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEventFeed = (event: any, index: number) => (
    <div key={index} className={cx(
      "w-full cursor-pointer rounded-xl shadow-sm hover:shadow-md transition-shadow border",
      theme === 'dark' ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
    )}
    style={{
      animationDelay: `${index * 120}ms`,
      animation: 'fadeInRight 0.6s ease-out forwards'
    }}>
      <div className={cx(
        "divide-y",
        theme === 'dark' ? "divide-gray-800" : "divide-gray-200"
      )}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
                alt={event.organizer} 
                className={cx(
                  "w-12 h-12 rounded-full ring-2",
                  theme === 'dark' ? "ring-gray-800" : "ring-white"
                )}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className={cx(
                    "text-base font-semibold",
                    theme === 'dark' ? "text-gray-100" : "text-gray-900"
                  )}>{event.organizer}</h3>
                  <div className={cx(
                    "inline-flex items-center rounded-full border border-transparent text-xs px-2 py-0.5 font-normal",
                    theme === 'dark' 
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}>
                    <span className="mr-0.5">🎪</span>Event Host
                  </div>
                  <span className="text-base">🥉</span>
                </div>
                <p className={cx(
                  "text-sm",
                  theme === 'dark' ? "text-gray-400" : "text-gray-500"
                )}>
                  8h ago<span> • posted on events</span>
                </p>
              </div>
            </div>
            <button type="button" className={cx(
              "p-2 rounded-full transition-colors",
              theme === 'dark' ? "hover:bg-gray-800" : "hover:bg-gray-100"
            )}>
              <DotsHorizontal className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Content */}
          {eventsListConfig.eventDetails && (
            <p className={cx(
              "mb-4",
              theme === 'dark' ? "text-gray-300" : "text-gray-600"
            )}>{event.description}</p>
          )}

          {/* Event Card */}
          <div className="space-y-4">
            <div className={cx(
              "rounded-2xl border overflow-hidden transition-all duration-300 relative",
              theme === 'dark'
                ? "border-gray-700 bg-gray-800/30 hover:bg-gray-800/70"
                : "border-gray-200 bg-gray-50/30 hover:bg-gray-50"
            )}>
              {/* Badges - Top Right of inner card */}
              <div className="absolute top-4 right-4 flex gap-2 items-center z-10">
                {event.status === 'live' && (
                  <span className={cx(
                    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-sm font-medium ring-1 ring-inset",
                    theme === 'dark'
                      ? "bg-red-900/80 text-red-200 ring-red-800"
                      : "bg-utility-error-50 text-utility-error-700 ring-utility-error-200"
                  )}>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error-600 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-error-600"></span>
                    </span>
                    Live Now
                  </span>
                )}
                {event.isRecurring && (
                  <span className={cx(
                    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-sm font-medium ring-1 ring-inset",
                    theme === 'dark'
                      ? "bg-blue-900/80 text-blue-200 ring-blue-800"
                      : "bg-utility-brand-50 text-utility-brand-700 ring-utility-brand-200"
                  )}>
                    <Repeat02 className="w-4 h-4" />
                    Recurring Event
                  </span>
                )}
              </div>

              <div className="p-5 max-lg:p-4 max-md:p-4">
                <div className="flex items-center mb-6 max-md:mb-4">
                  <div className="flex items-center gap-1.5">
                    <div className={cx(
                      "w-6 h-6 rounded-lg flex items-center justify-center",
                      theme === 'dark' ? "bg-blue-900/30" : "bg-blue-100"
                    )}>
                      <Calendar className={cx(
                        "w-4 h-4",
                        theme === 'dark' ? "text-blue-400" : "text-blue-600"
                      )} />
                    </div>
                    <h4 className={cx(
                      "text-sm font-medium",
                      theme === 'dark' ? "text-gray-100" : "text-gray-900"
                    )}>Event</h4>
                  </div>
                </div>

                <div className="flex gap-4 max-md:flex-col max-md:gap-3">
                  {eventsListConfig.coverImage && (
                    <div className="flex-shrink-0 max-md:flex-shrink">
                      <div className={cx(
                        "rounded-lg overflow-hidden",
                        device === 'mobile' ? "w-full aspect-square" : "w-32 max-lg:w-28 aspect-square"
                      )}>
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                  
                  {eventsListConfig.coverImage && (
                    <div className={cx(
                      "w-px my-1 max-md:hidden",
                      theme === 'dark' ? "bg-gray-700" : "bg-gray-100"
                    )}></div>
                  )}
                  
                  <div className="flex-1 min-w-0 space-y-2 max-md:space-y-3">
                    {eventsListConfig.eventDetails && (
                      <div className={cx(
                        "flex items-center gap-2 font-medium max-md:flex-wrap",
                        device === 'mobile' ? "text-sm" : "text-xs",
                        theme === 'dark' ? "text-gray-400" : "text-gray-500"
                      )}>
                        <div className="flex items-center gap-1">
                          <Calendar className={cx("w-3 h-3", device === 'mobile' && "w-4 h-4")} />
                          <span>{event.date}</span>
                        </div>
                        <div className={cx(
                          "w-px h-3 max-md:hidden",
                          theme === 'dark' ? "bg-gray-600" : "bg-gray-300"
                        )}></div>
                        <div className="flex items-center gap-1">
                          <Clock className={cx("w-3 h-3", device === 'mobile' && "w-4 h-4")} />
                          <span>{event.time}</span>
                        </div>
                      </div>
                    )}
                    
                    <h3 className={cx(
                      "font-bold leading-tight",
                      device === 'mobile' ? "text-xl" : "text-xl max-lg:text-lg",
                      theme === 'dark' ? "text-gray-100" : "text-gray-900"
                    )}>
                      {event.title}
                    </h3>
                    
                    <div className={cx(
                      "flex items-center gap-3 max-md:flex-wrap",
                      device === 'mobile' ? "text-sm" : "text-xs",
                      theme === 'dark' ? "text-gray-400" : "text-gray-500"
                    )}>
                      <div className="flex items-center gap-1">
                        <MarkerPin01 className="w-3 h-3" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* Avatar Group - Attendees */}
                        {eventsListConfig.attended && (
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                              <div className={cx(
                                "w-6 h-6 rounded-full overflow-hidden ring-1",
                                theme === 'dark' ? "border-2 border-gray-900 ring-gray-700" : "border-2 border-white ring-gray-200"
                              )} style={{ zIndex: 3 }}>
                                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face" alt="Avatar" className="w-full h-full object-cover" />
                              </div>
                              <div className={cx(
                                "w-6 h-6 rounded-full overflow-hidden ring-1",
                                theme === 'dark' ? "border-2 border-gray-900 ring-gray-700" : "border-2 border-white ring-gray-200"
                              )} style={{ zIndex: 2 }}>
                                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face" alt="Avatar" className="w-full h-full object-cover" />
                              </div>
                              <div className={cx(
                                "w-6 h-6 rounded-full overflow-hidden ring-1",
                                theme === 'dark' ? "border-2 border-gray-900 ring-gray-700" : "border-2 border-white ring-gray-200"
                              )} style={{ zIndex: 1 }}>
                                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=32&h=32&fit=crop&crop=face" alt="Avatar" className="w-full h-full object-cover" />
                              </div>
                            </div>
                            <span className={cx(
                              "text-xs",
                              theme === 'dark' ? "text-gray-400" : "text-gray-600"
                            )}>42 attending</span>
                          </div>
                        )}
                        
                        {/* Host Info */}
                        {eventsListConfig.hostInfo && (
                          <div className="flex items-center gap-2">
                            {event.organizers && event.organizers.length > 1 ? (
                              <>
                                <div className="flex -space-x-2">
                                  {event.organizers.slice(0, 4).map((org: any, idx: number) => (
                                    <div
                                      key={idx}
                                      className={cx(
                                        "w-6 h-6 rounded-full overflow-hidden ring-1",
                                        theme === 'dark' ? "border-2 border-gray-900 ring-gray-700" : "border-2 border-white ring-gray-200"
                                      )}
                                      style={{ zIndex: event.organizers.length - idx }}
                                    >
                                      <img
                                        src={org.avatar}
                                        alt={org.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(org.name)}&background=667eea&color=fff&size=128`;
                                        }}
                                      />
                                    </div>
                                  ))}
                                  {event.organizers.length > 4 && (
                                    <div className={cx(
                                      "w-6 h-6 rounded-full flex items-center justify-center ring-1",
                                      theme === 'dark' ? "border-2 border-gray-900 bg-gray-800 ring-gray-700" : "border-2 border-white bg-gray-100 ring-gray-200"
                                    )}>
                                      <span className={cx(
                                        "text-[10px] font-semibold",
                                        theme === 'dark' ? "text-gray-300" : "text-gray-600"
                                      )}>+{event.organizers.length - 4}</span>
                                    </div>
                                  )}
                                </div>
                                <span className={cx(
                                  "text-xs",
                                  theme === 'dark' ? "text-gray-400" : "text-gray-600"
                                )}>By {event.organizers.length} hosts</span>
                              </>
                            ) : (
                              <>
                                <div className={cx(
                                  "w-6 h-6 rounded-full overflow-hidden ring-1",
                                  theme === 'dark' ? "border-2 border-gray-900 ring-gray-700" : "border-2 border-white ring-gray-200"
                                )}>
                                  <img 
                                    src="https://i.pravatar.cc/150?img=1" 
                                    alt={event.organizer} 
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(event.organizer)}&background=667eea&color=fff&size=128`;
                                    }}
                                  />
                                </div>
                                <span className={cx(
                          "text-xs",
                          theme === 'dark' ? "text-gray-400" : "text-gray-600"
                        )}>By {event.organizer}</span>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                      
                      {/* RSVP Button - Full width on mobile */}
                      <div className="flex items-center justify-end max-md:justify-center pt-0">
                        <Button
                          color="secondary"
                          size="sm"
                          onClick={(e: React.MouseEvent) => e.stopPropagation()}
                          className={cx(
                            "px-3 py-1.5 text-xs",
                            device === 'mobile' && "w-full text-base py-3",
                            theme === 'dark' && "!bg-gray-700 !text-gray-200 hover:!bg-gray-600 !ring-gray-600"
                          )}
                        >
                          {device === 'mobile' ? 'View Details & Register →' : 'RSVP Now'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEventCarousel = (event: any, index: number) => (
    <div key={index} className={cx(
      "flex-shrink-0 w-80 group rounded-xl border p-4 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md",
      theme === 'dark'
        ? "bg-gray-900 border-gray-800 hover:border-gray-700"
        : "bg-white border-gray-200 hover:border-gray-300"
    )}
    style={{
      animationDelay: `${index * 100}ms`,
      animation: 'slideInRight 0.6s ease-out forwards'
    }}>
      {/* Cover Image */}
      {eventsListConfig.coverImage && (
        <div className="relative overflow-hidden aspect-[4/3] mb-4 rounded-lg">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
        </div>
      )}

      {/* Event Content */}
      <div className="space-y-3">
        {/* Host Badge */}
        {eventsListConfig.hostInfo && (
          <div className={cx(
            "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium",
            theme === 'dark' ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"
          )}>
            <div className="w-4 h-4 rounded-full overflow-hidden">
              <img 
                src="https://i.pravatar.cc/150?img=1" 
                alt={event.organizer} 
                className="w-full h-full object-cover"
              />
            </div>
            <span>{event.organizer}</span>
          </div>
        )}

        {/* Event Title */}
        <h3 className={cx(
          "text-lg font-bold line-clamp-2 group-hover:text-brand-solid transition-colors duration-200",
          theme === 'dark' ? "text-gray-100" : "text-gray-900"
        )}>
          {event.title}
        </h3>

        {/* Event Details */}
        {eventsListConfig.eventDetails && (
          <div className="space-y-1">
            <div className={cx(
              "flex items-center gap-2 text-sm",
              theme === 'dark' ? "text-gray-400" : "text-gray-600"
            )}>
              <Calendar className="h-3.5 w-3.5 text-brand-solid" />
              <span className="font-medium">{event.date}</span>
            </div>
            <div className={cx(
              "flex items-center gap-2 text-sm",
              theme === 'dark' ? "text-gray-400" : "text-gray-600"
            )}>
              <Clock className="h-3.5 w-3.5 text-success-solid" />
              <span>{event.time}</span>
            </div>
          </div>
        )}

        {/* Location */}
        <div className={cx(
          "flex items-center gap-2 text-sm",
          theme === 'dark' ? "text-gray-400" : "text-gray-600"
        )}>
          <MarkerPin01 className="h-3.5 w-3.5 text-warning-solid" />
          <span>{event.location}</span>
        </div>

        {/* Avatar Group and RSVP */}
        <div className="flex items-center justify-between pt-2">
          {eventsListConfig.attended ? (
            <div className="flex items-center">
              <span className={cx(
                "inline-flex items-center rounded-full overflow-hidden",
                theme === 'dark' ? "border-2 border-gray-900" : "border-2 border-white"
              )} style={{width: '20px', height: '20px', zIndex: 1}}>
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face" alt="Avatar" className="w-full h-full object-cover" />
              </span>
              <span className={cx(
                "inline-flex items-center rounded-full overflow-hidden -ml-1.5",
                theme === 'dark' ? "border-2 border-gray-900" : "border-2 border-white"
              )} style={{width: '20px', height: '20px', zIndex: 2}}>
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face" alt="Avatar" className="w-full h-full object-cover" />
              </span>
              <span className={cx(
                "inline-flex items-center rounded-full overflow-hidden -ml-1.5",
                theme === 'dark' ? "border-2 border-gray-900" : "border-2 border-white"
              )} style={{width: '20px', height: '20px', zIndex: 3}}>
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=32&h=32&fit=crop&crop=face" alt="Avatar" className="w-full h-full object-cover" />
              </span>
              <span className={cx(
                "inline-flex items-center rounded-full overflow-hidden -ml-1.5 justify-center text-[0.5rem] font-semibold",
                theme === 'dark'
                  ? "border-2 border-gray-900 bg-gray-800 text-gray-300"
                  : "border-2 border-white bg-gray-100 text-gray-700"
              )} style={{width: '20px', height: '20px', zIndex: 4}}>
                +2
              </span>
            </div>
          ) : (
            <div></div>
          )}
          
          {/* RSVP Button */}
          <Button
            color="secondary"
            size="sm"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className={cx(
              "px-3 py-1.5 text-xs",
              theme === 'dark' && "!bg-gray-700 !text-gray-200 hover:!bg-gray-600 !ring-gray-600"
            )}
          >
            RSVP Now
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={className}>
      {/* Widget Info Section */}
      {(eventsListConfig.title || eventsListConfig.description) && (
        <div className="mb-4 space-y-0">
          {eventsListConfig.title && (
            <h2 className={cx(
              "text-base font-semibold",
              theme === 'dark' ? "text-gray-100" : "text-gray-900"
            )}>{eventsListConfig.title}</h2>
          )}
          {eventsListConfig.description && (
            <p className={cx(
              "text-xs",
              theme === 'dark' ? "text-gray-400" : "text-gray-600"
            )}>{eventsListConfig.description}</p>
          )}
        </div>
      )}
      
      {/* Filter Tabs - Only show if tabView is enabled */}
      {eventsListConfig.tabView && availableTabs.length > 0 && (
        <div className="mb-4">
          <Tabs selectedKey={activeTab} onSelectionChange={setActiveTab} className="w-max">
            <Tabs.List 
              type="button-gray" 
              items={availableTabs}
              className={cx(
                theme === 'dark' && "[&_button]:text-gray-400 [&_button[data-selected]]:bg-gray-800 [&_button[data-selected]]:text-gray-100 [&_button:hover]:bg-gray-800/50 [&_button:hover]:text-gray-200"
              )}
            >
              {(tab) => <Tabs.Item {...tab} />}
            </Tabs.List>
          </Tabs>
        </div>
      )}
    
      {/* Events List */}
      {eventsListConfig.groupView ? (
        // Grouped display
        <div className="space-y-6">
          {Object.entries(groupedEvents).map(([groupKey, events]) => (
            <div key={groupKey} className="space-y-4">
              {/* Group Header */}
              <div className={cx(
                "flex items-center gap-3 pb-2 border-b",
                theme === 'dark' ? "border-gray-700" : "border-gray-200"
              )}>
                <div className="flex items-center gap-2">
                  {(() => {
                    const { icon: IconComponent, label } = getGroupLabelAndIcon(groupKey, eventsListConfig.groupBy);
                    return (
                      <>
                        <IconComponent className={cx(
                          "h-4 w-4",
                          theme === 'dark' ? "text-gray-400" : "text-gray-600"
                        )} />
                        <h3 className={cx(
                          "text-sm font-semibold",
                          theme === 'dark' ? "text-gray-100" : "text-gray-900"
                        )}>{label}</h3>
                      </>
                    );
                  })()}
                </div>
                <span className={cx(
                  "text-xs px-2 py-1 rounded-full",
                  theme === 'dark' ? "text-gray-400 bg-gray-800" : "text-gray-500 bg-gray-100"
                )}>
                  {(events as any[]).length} {(events as any[]).length === 1 ? 'Event' : 'Events'}
                </span>
              </div>
              
              {/* Events in this group */}
              <div className={cx(
                "transition-all duration-700 ease-in-out",
                theme === 'dark' && 'dark',
                eventsListConfig.style === 'card' && "grid gap-2",
                // Responsive grid columns based on device
                eventsListConfig.style === 'card' && eventsListConfig.cardSize === 'small' && (
                  device === 'mobile' ? "grid-cols-1" : device === 'tablet' ? "grid-cols-2" : "grid-cols-4"
                ),
                eventsListConfig.style === 'card' && eventsListConfig.cardSize === 'medium' && (
                  device === 'mobile' ? "grid-cols-1" : device === 'tablet' ? "grid-cols-2" : "grid-cols-3"
                ),
                eventsListConfig.style === 'card' && eventsListConfig.cardSize === 'large' && (
                  device === 'mobile' ? "grid-cols-1" : "grid-cols-2"
                ),
                eventsListConfig.style === 'card' && eventsListConfig.cardSize === 'extralarge' && "grid-cols-1",
                eventsListConfig.style === 'list' && "space-y-3",
                eventsListConfig.style === 'feed' && "space-y-4",
                eventsListConfig.style === 'carousel' && "flex gap-4 overflow-x-auto pb-2"
              )}>
                {(events as any[]).map((event: any, index: number) => {
                  if (eventsListConfig.style === 'card') {
                    return renderEventCard(event, index);
                  } else if (eventsListConfig.style === 'list') {
                    return renderEventList(event, index);
                  } else if (eventsListConfig.style === 'feed') {
                    return renderEventFeed(event, index);
                  } else if (eventsListConfig.style === 'carousel') {
                    return renderEventCarousel(event, index);
                  }
                  return null;
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Regular display (no grouping)
        <div className={cx(
          "transition-all duration-700 ease-in-out",
          theme === 'dark' && 'dark',
          eventsListConfig.style === 'card' && "grid gap-2",
          // Responsive grid columns based on device
          eventsListConfig.style === 'card' && eventsListConfig.cardSize === 'small' && (
            device === 'mobile' ? "grid-cols-1" : device === 'tablet' ? "grid-cols-2" : "grid-cols-4"
          ),
          eventsListConfig.style === 'card' && eventsListConfig.cardSize === 'medium' && (
            device === 'mobile' ? "grid-cols-1" : device === 'tablet' ? "grid-cols-2" : "grid-cols-3"
          ),
          eventsListConfig.style === 'card' && eventsListConfig.cardSize === 'large' && (
            device === 'mobile' ? "grid-cols-1" : "grid-cols-2"
          ),
          eventsListConfig.style === 'card' && eventsListConfig.cardSize === 'extralarge' && "grid-cols-1",
          eventsListConfig.style === 'list' && "space-y-3",
          eventsListConfig.style === 'feed' && "space-y-4",
          eventsListConfig.style === 'carousel' && "flex gap-4 overflow-x-auto pb-2"
        )}
        key={`${eventsListConfig.style}-${eventsListConfig.cardSize}`}>
          {eventsData.map((event, index) => {
            if (eventsListConfig.style === 'card') {
              return renderEventCard(event, index);
            } else if (eventsListConfig.style === 'list') {
              return renderEventList(event, index);
            } else if (eventsListConfig.style === 'feed') {
              return renderEventFeed(event, index);
            } else if (eventsListConfig.style === 'carousel') {
              return renderEventCarousel(event, index);
            }
            return null;
          })}
        </div>
      )}

      {/* Load More */}
      <div className="mt-4 text-center">
        <button className={cx(
          "px-3 py-1.5 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md text-xs font-medium",
          theme === 'dark'
            ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
            : "bg-gray-100 text-gray-900 hover:bg-gray-200"
        )}>
          Load More Events
        </button>
      </div>
    </div>
  );
}; 