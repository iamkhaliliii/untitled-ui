import React from 'react';
import { Star01, Trophy01, Award01 } from "@untitledui/icons";
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

  const leaderboardData = [
    { rank: 1, name: "Sarah Chen", points: 2450, avatar: "https://images.unsplash.com/photo-1494790108755-2616c96f40ce?w=150&h=150&fit=crop&crop=face", isAdmin: false },
    { rank: 2, name: "Alex Johnson", points: 2280, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", isAdmin: true },
    { rank: 3, name: "Maria Garcia", points: 2150, avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face", isAdmin: false },
    { rank: 4, name: "David Kim", points: 1980, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face", isAdmin: false },
    { rank: 5, name: "Emma Wilson", points: 1850, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face", isAdmin: false },
    { rank: 6, name: "John Admin", points: 1750, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face", isAdmin: true },
  ];

  // Filter data based on configuration
  const filteredData = leaderboardConfig.excludeAdminsModerators 
    ? leaderboardData.filter(user => !user.isAdmin)
    : leaderboardData;

  // Limit to configured number of members
  const displayData = filteredData.slice(0, leaderboardConfig.numberOfMembers);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy01 className="w-4 h-4 text-yellow-500" />;
      case 2:
        return <Star01 className="w-4 h-4 text-gray-400" />;
      case 3:
        return <Award01 className="w-4 h-4 text-amber-600" />;
      default:
        return <span className="text-xs font-bold text-tertiary">#{rank}</span>;
    }
  };

  return (
    <div className={cx(
      "rounded-lg border bg-primary p-4",
      theme === 'dark' ? "border-gray-700" : "border-gray-200",
      className
    )}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Star01 className="w-4 h-4 text-yellow-500" />
        <h3 className="text-sm font-semibold text-primary">{leaderboardConfig.title}</h3>
      </div>

      {/* Leaderboard List */}
      <div className="space-y-3">
        {displayData.map((user, index) => (
          <div key={user.rank} className={cx(
            "flex items-center gap-3 p-2 rounded-lg transition-colors",
            user.rank <= 3 && "bg-gradient-to-r from-yellow-50/50 to-orange-50/50",
            theme === 'dark' && user.rank <= 3 && "from-yellow-900/10 to-orange-900/10",
            theme === 'dark' ? "hover:bg-gray-800" : "hover:bg-gray-50"
          )}>
            {/* Rank */}
            <div className="flex-shrink-0 w-6 flex items-center justify-center">
              {getRankIcon(user.rank)}
            </div>

            {/* Avatar */}
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-8 h-8 rounded-full"
            />

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-primary truncate">{user.name}</p>
              {leaderboardConfig.showScore && (
                <p className="text-xs text-tertiary">{user.points.toLocaleString()} points</p>
              )}
            </div>

            {/* Badge for top 3 */}
            {user.rank <= 3 && (
              <div className={cx(
                "px-2 py-1 rounded-full text-xs font-medium",
                user.rank === 1 && "bg-yellow-100 text-yellow-800",
                user.rank === 2 && "bg-gray-100 text-gray-800", 
                user.rank === 3 && "bg-amber-100 text-amber-800",
                theme === 'dark' && user.rank === 1 && "bg-yellow-900/30 text-yellow-300",
                theme === 'dark' && user.rank === 2 && "bg-gray-800 text-gray-300",
                theme === 'dark' && user.rank === 3 && "bg-amber-900/30 text-amber-300"
              )}>
                {user.rank === 1 ? "Gold" : user.rank === 2 ? "Silver" : "Bronze"}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="mt-4 pt-3 border-t border-secondary">
        <button className={cx(
          "w-full text-sm font-medium text-brand-solid hover:text-brand-solid_hover transition-colors",
          "py-2 rounded-lg",
          theme === 'dark' ? "hover:bg-gray-800" : "hover:bg-gray-50"
        )}>
          View Full Leaderboard
        </button>
      </div>
    </div>
  );
};
