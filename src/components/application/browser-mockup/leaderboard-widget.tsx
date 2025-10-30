import React, { useState, useEffect } from 'react';
import { Star01 } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { useResolvedTheme } from "@/hooks/use-resolved-theme";
import { useWidgetConfig } from "@/providers/widget-config-provider";

interface LeaderboardWidgetProps {
  className?: string;
  theme?: 'light' | 'dark';
}

export const LeaderboardWidget: React.FC<LeaderboardWidgetProps> = ({ className, theme: propTheme }) => {
  const theme = useResolvedTheme(propTheme);
  const { leaderboardConfig } = useWidgetConfig();
  const [activeTab, setActiveTab] = useState<'all' | 'month' | 'week'>(leaderboardConfig.tabView);

  // Update active tab when config changes
  useEffect(() => {
    setActiveTab(leaderboardConfig.tabView);
  }, [leaderboardConfig.tabView]);

  // All members data
  const allLeaderboardData = [
    { rank: 1, name: "Sarah Chen", points: 2450, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop", isAdmin: false },
    { rank: 2, name: "Alex Johnson", points: 2280, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop", isAdmin: true },
    { rank: 3, name: "Maria Garcia", points: 2150, avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop", isAdmin: false },
    { rank: 4, name: "David Kim", points: 1980, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop", isAdmin: false },
    { rank: 5, name: "Emma Wilson", points: 1850, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop", isAdmin: false },
    { rank: 6, name: "John Admin", points: 1750, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop", isAdmin: true },
  ];

  // Current space members (subset)
  const currentSpaceData = allLeaderboardData.slice(0, 4);

  // Select data based on source
  let sourceData = leaderboardConfig.source === 'all' ? allLeaderboardData : currentSpaceData;

  // Filter admins if needed
  if (leaderboardConfig.excludeAdmins) {
    sourceData = sourceData.filter(user => !user.isAdmin);
  }

  // Limit to configured number
  const displayData = sourceData.slice(0, leaderboardConfig.numberOfMembers);

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return null;
    }
  };

  // Get enabled tabs from config
  const tabs = [
    { id: 'all', label: 'All time', enabled: leaderboardConfig.allTab },
    { id: 'month', label: 'Month', enabled: leaderboardConfig.monthTab },
    { id: 'week', label: 'Week', enabled: leaderboardConfig.weekTab }
  ];
  
  const enabledTabs = tabs.filter(t => t.enabled);
  const showTabs = enabledTabs.length > 1; // Only show tabs if more than 1 enabled

  return (
    <div className={cx(
      "rounded-lg border overflow-hidden",
      theme === 'dark' ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
      className
    )}>
      {/* Title */}
      <div className="p-4 pb-0">
        <div className="flex items-center gap-2 mb-4">
          <Star01 className="w-5 h-5 text-yellow-500" />
          <h3 className={cx("text-lg font-semibold", theme === 'dark' ? "text-gray-100" : "text-gray-900")}>
            Leaderboard
          </h3>
        </div>
      </div>

      {/* Tabs - Full Width Sections */}
      {showTabs && (
        <div className={cx("grid border-b border-secondary", `grid-cols-${enabledTabs.length}`)}>
          {enabledTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cx(
                "py-4 px-4 text-base font-medium transition-colors border-b-2",
                activeTab === tab.id
                  ? "border-brand-solid bg-secondary"
                  : theme === 'dark'
                    ? "border-transparent text-gray-400 hover:bg-gray-700/50"
                    : "border-transparent text-gray-600 hover:bg-gray-50"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Leaderboard List */}
      <div className="space-y-2 p-4">
        {displayData.map((user, index) => {
          const displayRank = index + 1; // Always show 1, 2, 3... based on filtered position
          return (
          <div key={user.rank} className={cx(
            "flex items-center gap-3 p-3 rounded-lg transition-colors",
            displayRank <= 3 
              ? theme === 'dark' 
                ? "bg-gradient-to-r from-yellow-900/20 to-orange-900/20"
                : "bg-gradient-to-r from-yellow-50 to-orange-50"
              : theme === 'dark' ? "hover:bg-gray-700" : "hover:bg-gray-50"
          )}>
            {/* Rank Badge */}
            <div className="flex-shrink-0 w-8 flex items-center justify-center">
              {getRankBadge(displayRank) ? (
                <span className="text-2xl">{getRankBadge(displayRank)}</span>
              ) : (
                <span className={cx(
                  "text-sm font-bold",
                  theme === 'dark' ? "text-gray-400" : "text-gray-600"
                )}>
                  #{displayRank}
                </span>
              )}
            </div>

            {/* Avatar */}
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <p className={cx(
                "text-sm font-medium truncate",
                theme === 'dark' ? "text-gray-100" : "text-gray-900"
              )}>
                {user.name}
              </p>
            </div>

            {/* Score */}
            {leaderboardConfig.showScore && (
              <p className={cx(
                "text-sm font-bold",
                theme === 'dark' ? "text-gray-300" : "text-gray-700"
              )}>
                {user.points.toLocaleString()}
              </p>
            )}
          </div>
          );
        })}
      </div>
    </div>
  );
};
