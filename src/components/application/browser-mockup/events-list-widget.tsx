import React, { useState, useEffect } from 'react';
import { DotsHorizontal, ArrowRight, Calendar, Users01, Ticket01, Clock, MarkerPin01, Heart, SearchLg, Home01, Rss01, Bookmark, User01, MessageChatCircle, MessageCircle01, Check, X, HelpCircle, Share02, Star01, Globe01 } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import type { Key } from "react-aria-components";
import { Tabs } from "@/components/application/tabs/tabs";
import { useWidgetConfig } from "@/providers/widget-config-provider";

interface EventsListWidgetProps {
  className?: string;
}

export const EventsListWidget: React.FC<EventsListWidgetProps> = ({ className }) => {
  const { eventsListConfig } = useWidgetConfig();
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
      title: "React Conference 2024",
      description: "Join us for the biggest React conference of the year with industry experts.",
      date: "March 15, 2024",
      time: "9:00 AM - 6:00 PM",
      location: "LA, USA",
      type: "In-Person",
      category: "Technology",
      organizer: "Tech Events Inc.",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=400&fit=crop&crop=center&auto=format&q=80"
    },
    {
      title: "Design Thinking Workshop",
      description: "Hands-on workshop to master design thinking methodology.",
      date: "March 18, 2024",
      time: "2:00 PM - 5:00 PM",
      location: "Online",
      type: "Online",
      category: "Design",
      organizer: "Design Academy",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop&crop=center&auto=format&q=80"
    },
    {
      title: "Startup Pitch Competition",
      description: "Watch innovative startups pitch their ideas to expert judges.",
      date: "March 22, 2024",
      time: "7:00 PM - 10:00 PM",
      location: "New York, NY",
      type: "In-Person",
      category: "Business",
      organizer: "Startup Hub",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=400&fit=crop&crop=center&auto=format&q=80"
    },
    {
      title: "AI & Machine Learning Summit",
      description: "Explore the latest trends in AI and ML with leading experts.",
      date: "March 25, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Online",
      type: "Online",
      category: "Technology",
      organizer: "AI Institute",
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
          "rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 ease-in-out group"
        )}
        style={{
          animationDelay: `${index * 100}ms`,
          animation: 'fadeInUp 0.6s ease-out forwards'
        }}>
          {/* Event Image */}
          {eventsListConfig.coverImage && (
            <div className="relative overflow-hidden rounded-t-lg aspect-[4/3]">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          )}

          {/* Event Content */}
          <div className="p-2">
            <h3 className="text-xs font-semibold text-primary mb-1 line-clamp-1">
              {event.title}
            </h3>

            {/* Event Details */}
            {eventsListConfig.eventDetails && (
            <div className="space-y-0.5 mb-2">
              
                <div className="flex items-center gap-1 text-[0.6rem] text-secondary transition-all duration-300 ease-in-out animate-in fade-in slide-in-from-left-2">
                  <Calendar className="h-2.5 w-2.5 flex-shrink-0" />
                  <span className="truncate">{event.date}</span>
                </div>
              
              <div className="flex items-center gap-1 text-[0.6rem] text-secondary">
                <Clock className="h-2.5 w-2.5 flex-shrink-0" />
                <span className="truncate">{event.time}</span>
              </div>
              <div className="flex items-center gap-1 text-[0.6rem] text-secondary">
                <MarkerPin01 className="h-2.5 w-2.5 flex-shrink-0" />
                <span className="truncate">{event.location}</span>
              </div>
            </div>
            )}

            {/* Organizer */}
            {eventsListConfig.hostInfo && (
              <div className="flex items-center gap-1 mb-2 transition-all duration-300 ease-in-out animate-in fade-in slide-in-from-right-2">
                <div className="w-3 h-3 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                </div>
                <span className="text-[0.6rem] text-tertiary truncate">
                  by {event.organizer}
                </span>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between gap-1">
              {eventsListConfig.reactionsCounter && (
                <div className="flex items-center gap-1.5">
                  <span className="text-[0.6rem] text-tertiary flex items-center gap-0.5">
                    <Heart className="w-2.5 h-2.5 text-tertiary" />
                    15
                  </span>
            
                  <span className="text-[0.6rem] text-tertiary flex items-center gap-0.5">
                    <MessageCircle01 className="w-2.5 h-2.5 text-tertiary" />
                    43
                  </span>
                
                </div>
              )}
               {eventsListConfig.rsvpAction && (
              <button className="px-2 py-1 bg-blue-600 text-white rounded-full text-[0.6rem] hover:bg-blue-700 transition-colors">
                RSVP
              </button>
               )}
            </div>
          </div>
        </div>
      );
    }

    // Modern card style (default)
    return (
      <div key={index} className={cx(
        "rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 ease-in-out group relative overflow-hidden"
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
            
            {/* Top badges */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="inline-flex items-center bg-black/50 backdrop-blur-sm text-white text-[0.65rem] px-1.5 py-0.5 font-medium shadow-sm border-0 rounded-md">
                  {event.category}
                </div>
                <div className="inline-flex items-center rounded-full bg-blue-600 text-white text-xs px-1.5 py-1 font-medium shadow-lg w-fit">
                  <Star01 className="w-3 h-3 fill-current" />
                </div>
              </div>
            </div>
            
            {/* Date badge */}
            <div className="absolute top-3 right-3 z-10">
              <div className="bg-black/50 backdrop-blur-sm text-white rounded-lg px-2 py-1.5">
                <div className="text-center">
                  <div className="text-[0.6rem] font-medium uppercase tracking-wider opacity-90">Jul</div>
                  <div className="text-[0.75rem] font-bold leading-none">25</div>
                </div>
              </div>
            </div>
            
            {/* Bottom content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
              <div className="space-y-1">
                <h3 className="font-bold text-sm text-white line-clamp-2 drop-shadow-lg">
                  {event.title}
                  <ArrowRight className="inline w-4 h-4 text-white/80 group-hover:text-white opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300 ml-1" />
                </h3>
                
                {eventsListConfig.eventDetails && (
                  <div className="flex items-center justify-between text-[0.75rem] text-white/80 mb-3">
                    <div className="flex items-center gap-1.5">
                      <MarkerPin01 className="w-3 h-3" />
                      <span className="truncate max-w-[120px]">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users01 className="w-3 h-3" />
                      <span className="text-xs font-medium">105</span>
                    </div>
                  </div>
                )}
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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <MarkerPin01 className="w-3 h-3" />
                <span className="text-xs text-gray-600 dark:text-gray-400">{event.location}</span>
              </div>
              {eventsListConfig.rsvpAction && (
                <button className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors">
                  RSVP
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderEventList = (event: any, index: number) => (
    <div key={index} className="group bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 cursor-pointer"
    style={{
      animationDelay: `${index * 80}ms`,
      animation: 'slideInLeft 0.5s ease-out forwards'
    }}>
      <div className="flex items-start gap-5">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="inline-flex items-center transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 bg-gray-200/50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-[0.75rem] px-1.5 py-0.5 font-medium border-0 rounded-md">
              {event.category}
            </div>
            {eventsListConfig.eventDetails && (
              <span className="text-[0.7rem] font-medium text-gray-700 dark:text-gray-300">{event.time}</span>
            )}
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 bg-blue-600 text-white text-xs px-1.5 py-0.5">
                <Star01 className="w-2.5 h-2.5 fill-current" />
              </div>
            </div>
          </div>
          
          <h4 className="font-semibold text-[1.4rem] mb-4 mt-2 line-clamp-2 text-gray-900 dark:text-gray-100">
            {event.title}
            <ArrowRight className="inline w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300 ml-1" />
          </h4>
          
          <div className="flex items-center gap-2 text-[0.8rem] text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              {/* Avatar Group */}
              <div className="flex items-center">
                <span className="inline-flex items-center rounded-full overflow-hidden border-2 border-white dark:border-gray-900" style={{width: '26px', height: '26px', zIndex: 1}}>
                  <img src="https://i.pravatar.cc/150?img=1" alt="Avatar" className="w-full h-full object-cover" />
                </span>
                <span className="inline-flex items-center -ml-2 rounded-full overflow-hidden border-2 border-white dark:border-gray-900" style={{width: '26px', height: '26px', zIndex: 2}}>
                  <img src="https://i.pravatar.cc/150?img=2" alt="Avatar" className="w-full h-full object-cover" />
                </span>
                <span className="inline-flex items-center -ml-2 rounded-full overflow-hidden border-2 border-white dark:border-gray-900" style={{width: '26px', height: '26px', zIndex: 3}}>
                  <img src="https://i.pravatar.cc/150?img=3" alt="Avatar" className="w-full h-full object-cover" />
                </span>
                <span className="inline-flex items-center -ml-2 rounded-full overflow-hidden border-2 border-white dark:border-gray-900" style={{width: '26px', height: '26px', zIndex: 4}}>
                  <img src="https://i.pravatar.cc/150?img=4" alt="Avatar" className="w-full h-full object-cover" />
                </span>
                <span className="inline-flex items-center -ml-2 rounded-full overflow-hidden border-2 border-white dark:border-gray-900 bg-gray-100 dark:bg-gray-800 justify-center text-gray-700 dark:text-gray-300 text-[0.625rem] leading-3 font-semibold" style={{width: '26px', height: '26px', zIndex: 5}}>
                  +6
                </span>
              </div>
            </div>
            
            {eventsListConfig.hostInfo && (
              <div className="flex items-center gap-1 bg-gray-200/50 dark:bg-gray-800 rounded-full px-2 py-1">
                <img src="https://i.pravatar.cc/150?img=1" alt="Host" className="w-5 h-5 rounded-full border border-gray-100 dark:border-gray-700" />
                <span>By <span className="font-semibold">{event.organizer}</span></span>
              </div>
            )}
            
            <div className="flex items-center gap-1">
              <MarkerPin01 className="w-3 h-3" />
              <span className="truncate max-w-[120px]">{event.location}</span>
            </div>
          </div>
        </div>
        
        {eventsListConfig.coverImage && (
          <div className="flex-shrink-0 relative">
            <div className="w-24 h-24 rounded-xl overflow-hidden group-hover:shadow-lg transition-shadow duration-300">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderEventFeed = (event: any, index: number) => (
    <div key={index} className="w-full max-w-2xl mx-auto cursor-pointer bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow"
    style={{
      animationDelay: `${index * 120}ms`,
      animation: 'fadeInRight 0.6s ease-out forwards'
    }}>
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3">
              {eventsListConfig.hostInfo && (
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
                  alt={event.organizer} 
                  className="w-12 h-12 rounded-full ring-2 ring-white dark:ring-gray-800"
                />
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  {eventsListConfig.hostInfo && (
                    <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">{event.organizer}</h3>
                  )}
                  <div className="inline-flex items-center rounded-full border border-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-normal">
                    <span className="mr-0.5">🎪</span>Event Host
                  </div>
                  <span className="text-base">🥉</span>
                </div>
                {eventsListConfig.eventDetails && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    8h ago<span> • posted on events</span>
                  </p>
                )}
              </div>
            </div>
            <button type="button" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <DotsHorizontal className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <p className="text-gray-600 dark:text-gray-300 mb-4">{event.description}</p>

          {/* Event Card */}
          <div className="space-y-4">
            <div className="rounded-2xl border overflow-hidden transition-all duration-300 border-gray-200 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-800/30 hover:bg-gray-50 dark:hover:bg-gray-800/70">
              <div className="p-5">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Event</h4>
                  </div>
                  <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold border-transparent bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs">
                    Upcoming
                  </div>
                </div>

                <div className="flex gap-4">
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
                  
                  <div className="w-px bg-gray-100 dark:bg-gray-700 my-1"></div>
                  
                  <div className="flex-1 min-w-0 space-y-2">
                    {eventsListConfig.eventDetails && (
                      <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                        <span>{event.date}</span>
                        <div className="w-px h-3 bg-gray-300 dark:bg-gray-600"></div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                    )}
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                      {event.title}
                    </h3>
                    
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Globe01 className="w-3 h-3" />
                        <span>{event.type}</span>
                      </div>
                      <div className="w-px h-3 bg-gray-300 dark:bg-gray-600"></div>
                      <div className="flex items-center gap-1">
                        <MarkerPin01 className="w-3 h-3" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {/* Avatar Group */}
                      <div className="flex items-center">
                        <span className="inline-flex items-center rounded-full overflow-hidden border-2 border-white dark:border-gray-900" style={{width: '24px', height: '24px', zIndex: 1}}>
                          <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face" alt="Avatar" className="w-full h-full object-cover" />
                        </span>
                        <span className="inline-flex items-center rounded-full overflow-hidden border-2 border-white dark:border-gray-900 -ml-2" style={{width: '24px', height: '24px', zIndex: 2}}>
                          <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face" alt="Avatar" className="w-full h-full object-cover" />
                        </span>
                        <span className="inline-flex items-center rounded-full overflow-hidden border-2 border-white dark:border-gray-900 -ml-2" style={{width: '24px', height: '24px', zIndex: 3}}>
                          <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=32&h=32&fit=crop&crop=face" alt="Avatar" className="w-full h-full object-cover" />
                        </span>
                        <span className="inline-flex items-center rounded-full overflow-hidden border-2 border-white dark:border-gray-900 bg-gray-100 dark:bg-gray-800 -ml-2 justify-center text-gray-700 dark:text-gray-300 text-[0.625rem] font-semibold" style={{width: '24px', height: '24px', zIndex: 4}}>
                          +2
                        </span>
                      </div>
                      
                      {eventsListConfig.hostInfo && (
                        <div className="flex items-center gap-2">
                          <img 
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
                            alt={event.organizer} 
                            className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800"
                          />
                          <span className="text-xs text-gray-500 dark:text-gray-400">By {event.organizer}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="mt-4 p-6 pt-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {eventsListConfig.rsvpAction && (
                <div className="flex items-center gap-1">
                  <button type="button" className="flex items-center gap-1 px-2 py-1 text-sm rounded-full transition-colors border text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 border-gray-200 dark:border-gray-700">
                    <Check className="w-4 h-4" />
                    <span className="text-[0.8rem] font-medium">Yes</span>
                  </button>
                  <button type="button" className="flex items-center gap-1 px-2 py-1 text-sm rounded-full transition-colors border text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 border-gray-200 dark:border-gray-700">
                    <X className="w-4 h-4" />
                    <span className="text-[0.8rem] font-medium">No</span>
                  </button>
                  <button type="button" className="flex items-center gap-1.5 px-2 py-1 text-sm rounded-full transition-colors border text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 border-gray-200 dark:border-gray-700">
                    <HelpCircle className="w-4 h-4" />
                    <span className="text-[0.8rem] font-medium">Maybe</span>
                  </button>
                </div>
              )}
              
              {eventsListConfig.reactionsCounter && (
                <button type="button" className="flex items-center gap-1 px-2 py-1 text-sm rounded-full transition-colors bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800">
                  <MessageCircle01 className="w-4 h-4" />
                  <span className="text-[0.7rem] font-medium">23</span>
                </button>
              )}
            </div>
            
            <div className="flex items-center gap-1">
              <button type="button" className="p-2 text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                <Share02 className="w-4 h-4" />
              </button>
              <button type="button" className="p-2 rounded-full transition-colors text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>
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
            <h2 className="text-base font-semibold text-primary">{eventsListConfig.title}</h2>
          )}
          {eventsListConfig.description && (
            <p className="text-xs text-secondary">{eventsListConfig.description}</p>
          )}
        </div>
      )}
      
      {/* Filter Tabs - Only show if tabView is enabled */}
      {eventsListConfig.tabView && availableTabs.length > 0 && (
        <div className="mb-4">
          <Tabs selectedKey={activeTab} onSelectionChange={setActiveTab} className="w-max">
            <Tabs.List type="button-gray" items={availableTabs}>
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
              <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  {(() => {
                    const { icon: IconComponent, label } = getGroupLabelAndIcon(groupKey, eventsListConfig.groupBy);
                    return (
                      <>
                        <IconComponent className="h-4 w-4 text-gray-600" />
                        <h3 className="text-sm font-semibold text-gray-900">{label}</h3>
                      </>
                    );
                  })()}
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {(events as any[]).length} {(events as any[]).length === 1 ? 'Event' : 'Events'}
                </span>
              </div>
              
              {/* Events in this group */}
              <div className={cx(
                "transition-all duration-700 ease-in-out",
                eventsListConfig.style === 'card' && "grid gap-2",
                eventsListConfig.style === 'card' && eventsListConfig.cardSize === 'small' && "grid-cols-4",
                eventsListConfig.style === 'card' && eventsListConfig.cardSize === 'medium' && "grid-cols-3",
                eventsListConfig.style === 'card' && eventsListConfig.cardSize === 'large' && "grid-cols-2",
                eventsListConfig.style === 'card' && eventsListConfig.cardSize === 'extralarge' && "grid-cols-1",
                eventsListConfig.style === 'list' && "space-y-3",
                eventsListConfig.style === 'feed' && "space-y-4"
              )}>
                {(events as any[]).map((event: any, index: number) => {
                  if (eventsListConfig.style === 'card') {
                    return renderEventCard(event, index);
                  } else if (eventsListConfig.style === 'list') {
                    return renderEventList(event, index);
                  } else if (eventsListConfig.style === 'feed') {
                    return renderEventFeed(event, index);
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
          eventsListConfig.style === 'card' && "grid gap-2",
          eventsListConfig.style === 'card' && eventsListConfig.cardSize === 'small' && "grid-cols-4",
          eventsListConfig.style === 'card' && eventsListConfig.cardSize === 'medium' && "grid-cols-3",
          eventsListConfig.style === 'card' && eventsListConfig.cardSize === 'large' && "grid-cols-2",
          eventsListConfig.style === 'card' && eventsListConfig.cardSize === 'extralarge' && "grid-cols-1",
          eventsListConfig.style === 'list' && "space-y-3",
          eventsListConfig.style === 'feed' && "space-y-4"
        )}
        key={`${eventsListConfig.style}-${eventsListConfig.cardSize}`}>
          {eventsData.map((event, index) => {
            if (eventsListConfig.style === 'card') {
              return renderEventCard(event, index);
            } else if (eventsListConfig.style === 'list') {
              return renderEventList(event, index);
            } else if (eventsListConfig.style === 'feed') {
              return renderEventFeed(event, index);
            }
            return null;
          })}
        </div>
      )}

      {/* Load More */}
      <div className="mt-4 text-center">
        <button className="px-3 py-1.5 bg-secondary text-primary rounded-lg transition-all duration-300 ease-in-out hover:bg-secondary_hover transform hover:scale-105 hover:shadow-md text-xs">
          Load More Events
        </button>
      </div>
    </div>
  );
}; 