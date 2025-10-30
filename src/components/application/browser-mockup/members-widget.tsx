import React, { useRef } from 'react';
import { MessageSquare01, ChevronLeft, ChevronRight } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { useResolvedTheme } from "@/hooks/use-resolved-theme";
import { useWidgetConfig } from "@/providers/widget-config-provider";

interface MembersWidgetProps {
  className?: string;
  theme?: 'light' | 'dark';
}

export const MembersWidget: React.FC<MembersWidgetProps> = ({ 
  className, 
  theme: propTheme 
}) => {
  const theme = useResolvedTheme(propTheme);
  const { membersConfig } = useWidgetConfig();
  
  const { source, hideAdmins, sort, layout, showAvatar, showBadges, showMessageButton, showDetails } = membersConfig;
  
  // Carousel scroll ref
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 400; // Scroll by ~2 cards
      const newScrollLeft = carouselRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
      carouselRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }
  };

  // Sample member data
  const allMembers = [
    { id: 1, name: 'Sarah Johnson', role: 'Admin', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop', badge: '👑', joinDate: '2024-01-15', isAdmin: true },
    { id: 2, name: 'Michael Chen', role: 'Staff', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop', badge: '⭐', joinDate: '2024-02-20', isAdmin: true },
    { id: 3, name: 'Emma Davis', role: 'Member', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop', badge: '', joinDate: '2024-03-10', isAdmin: false },
    { id: 4, name: 'James Wilson', role: 'Member', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop', badge: '🔥', joinDate: '2024-01-25', isAdmin: false },
    { id: 5, name: 'Lisa Anderson', role: 'Member', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop', badge: '💎', joinDate: '2024-02-05', isAdmin: false },
    { id: 6, name: 'David Brown', role: 'Member', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop', badge: '', joinDate: '2024-03-01', isAdmin: false },
  ];

  // Current space members (subset)
  const currentSpaceMembers = allMembers.slice(0, 4);

  // Filter members based on source and hideAdmins
  let filteredMembers = source === 'all' ? allMembers : currentSpaceMembers;
  if (hideAdmins) {
    filteredMembers = filteredMembers.filter(m => !m.isAdmin);
  }

  // Sort members
  const sortedMembers = [...filteredMembers].sort((a, b) => {
    switch (sort) {
      case 'alphabetic':
        return a.name.localeCompare(b.name);
      case 'oldest':
        return new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime();
      case 'newest':
        return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
      default:
        return 0;
    }
  });

  return (
    <div className={cx(
      "rounded-lg border p-4",
      theme === 'dark' ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
      className
    )}>
      <h3 className={cx(
        "text-lg font-semibold mb-4",
        theme === 'dark' ? "text-gray-100" : "text-gray-900"
      )}>
        Members
      </h3>

      {/* List Layout */}
      {layout === 'list' && (
        <div className="space-y-2">
          {sortedMembers.map((member) => (
          <div 
            key={member.id}
            className={cx(
              "flex items-center gap-3 p-3 rounded-lg border transition-colors",
              theme === 'dark' 
                ? "bg-gray-900/50 border-gray-700 hover:bg-gray-900" 
                : "bg-gray-50 border-gray-200 hover:bg-gray-100"
            )}
          >
            {/* Avatar */}
            {showAvatar && (
              <img 
                src={member.avatar} 
                alt={member.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
            
            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className={cx(
                  "font-medium text-sm truncate",
                  theme === 'dark' ? "text-gray-100" : "text-gray-900"
                )}>
                  {member.name}
                </p>
                {showBadges && member.badge && (
                  <span className="text-sm">{member.badge}</span>
                )}
              </div>
              {showDetails && (
                <p className={cx(
                  "text-xs",
                  theme === 'dark' ? "text-gray-400" : "text-gray-600"
                )}>
                  {member.role}
                </p>
              )}
            </div>

            {/* Message Button */}
            {showMessageButton && (
              <button className={cx(
                "p-2 rounded-lg transition-colors",
                theme === 'dark'
                  ? "hover:bg-gray-800 text-gray-400 hover:text-gray-200"
                  : "hover:bg-gray-200 text-gray-600 hover:text-gray-900"
              )}>
                <MessageSquare01 className="w-4 h-4" />
              </button>
            )}
          </div>
          ))}
        </div>
      )}

      {/* Card Layout */}
      {layout === 'card' && (
        <div className="grid grid-cols-3 gap-3">
          {sortedMembers.map((member) => (
            <div 
              key={member.id}
              className={cx(
                "flex flex-col items-center gap-2 p-4 rounded-lg border transition-colors text-center",
                theme === 'dark' 
                  ? "bg-gray-900/50 border-gray-700 hover:bg-gray-900" 
                  : "bg-gray-50 border-gray-200 hover:bg-gray-100"
              )}
            >
              {/* Avatar */}
              {showAvatar && (
                <img 
                  src={member.avatar} 
                  alt={member.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
              
              {/* Info */}
              <div className="w-full">
                <div className="flex items-center justify-center gap-2">
                  <p className={cx(
                    "font-medium text-sm truncate",
                    theme === 'dark' ? "text-gray-100" : "text-gray-900"
                  )}>
                    {member.name}
                  </p>
                  {showBadges && member.badge && (
                    <span className="text-sm">{member.badge}</span>
                  )}
                </div>
                {showDetails && (
                  <p className={cx(
                    "text-xs mt-1",
                    theme === 'dark' ? "text-gray-400" : "text-gray-600"
                  )}>
                    {member.role}
                  </p>
                )}
              </div>

              {/* Message Button */}
              {showMessageButton && (
                <button className={cx(
                  "w-full py-2 px-4 rounded-lg transition-colors text-sm font-medium",
                  theme === 'dark'
                    ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                )}>
                  Message
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Carousel Layout */}
      {layout === 'carousel' && (
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scrollCarousel('left')}
            className={cx(
              "absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-lg transition-all",
              theme === 'dark' 
                ? "bg-gray-800 border border-gray-700 text-gray-200 hover:bg-gray-700" 
                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
            )}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scrollCarousel('right')}
            className={cx(
              "absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-lg transition-all",
              theme === 'dark' 
                ? "bg-gray-800 border border-gray-700 text-gray-200 hover:bg-gray-700" 
                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
            )}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Carousel Container */}
          <div 
            ref={carouselRef}
            className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide px-10"
          >
          {sortedMembers.map((member) => (
            <div 
              key={member.id}
              className={cx(
                "flex-shrink-0 w-[calc(33.333%-0.5rem)] min-w-[150px] flex flex-col items-center gap-2 p-4 rounded-lg border transition-colors text-center",
                theme === 'dark' 
                  ? "bg-gray-900/50 border-gray-700 hover:bg-gray-900" 
                  : "bg-gray-50 border-gray-200 hover:bg-gray-100"
              )}
            >
              {/* Avatar */}
              {showAvatar && (
                <img 
                  src={member.avatar} 
                  alt={member.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
              
              {/* Info */}
              <div className="w-full">
                <div className="flex items-center justify-center gap-2">
                  <p className={cx(
                    "font-medium text-sm truncate",
                    theme === 'dark' ? "text-gray-100" : "text-gray-900"
                  )}>
                    {member.name}
                  </p>
                  {showBadges && member.badge && (
                    <span className="text-sm">{member.badge}</span>
                  )}
                </div>
                {showDetails && (
                  <p className={cx(
                    "text-xs mt-1",
                    theme === 'dark' ? "text-gray-400" : "text-gray-600"
                  )}>
                    {member.role}
                  </p>
                )}
              </div>

              {/* Message Button */}
              {showMessageButton && (
                <button className={cx(
                  "w-full py-2 px-4 rounded-lg transition-colors text-sm font-medium",
                  theme === 'dark'
                    ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                )}>
                  Message
                </button>
              )}
            </div>
          ))}
          </div>
        </div>
      )}
    </div>
  );
};

