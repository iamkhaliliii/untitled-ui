import React from 'react';
import { Heart, User01, ArrowUp, MessageCircle01 } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { useResolvedTheme } from "@/hooks/use-resolved-theme";
import { useWidgetConfig } from "@/providers/widget-config-provider";
import { Badge } from '@/components/base/badges/badges';

interface WishlistsListWidgetProps {
  className?: string;
  theme?: 'light' | 'dark';
}

export const WishlistsListWidget: React.FC<WishlistsListWidgetProps> = ({ className, theme: propTheme }) => {
  const { wishlistsListConfig } = useWidgetConfig();
  const theme = useResolvedTheme(propTheme);

  const mockWishlists = [
    {
      id: 1,
      title: "Dark Mode Theme Support",
      description: "Add comprehensive dark mode support across all pages and components.",
      author: "Emily Rodriguez",
      avatar: "https://i.pravatar.cc/150?img=7",
      votes: 156,
      comments: 23,
      status: "Under Review",
      tags: ["Feature Request", "UI/UX"]
    },
    {
      id: 2,
      title: "Advanced Search Filters",
      description: "Implement advanced filtering options for better content discovery.",
      author: "David Kim",
      avatar: "https://i.pravatar.cc/150?img=8",
      votes: 98,
      comments: 15,
      status: "Planned",
      tags: ["Feature Request", "Search"]
    },
    {
      id: 3,
      title: "Mobile App Integration",
      description: "Native mobile app with push notifications and offline support.",
      author: "Lisa Wang",
      avatar: "https://i.pravatar.cc/150?img=9",
      votes: 234,
      comments: 42,
      status: "In Progress",
      tags: ["Feature Request", "Mobile"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Under Review': return 'warning';
      case 'Planned': return 'brand';
      case 'In Progress': return 'success';
      default: return 'gray';
    }
  };

  const renderCard = (wishlist: any) => (
    <div
      key={wishlist.id}
      className={cx(
        "group rounded-xl border p-4 cursor-pointer transition-all duration-200",
        theme === 'dark'
          ? "bg-gray-800 border-gray-700 hover:border-pink-500/50 hover:shadow-lg"
          : "bg-white border-gray-200 hover:border-pink-300 hover:shadow-md"
      )}
    >
      <div className="flex items-start gap-3">
        {/* Vote Button - Only show if votesCounter is enabled */}
        {wishlistsListConfig.votesCounter && (
          <button className={cx(
            "flex flex-col items-center gap-1 px-2 py-1.5 rounded-lg border transition-all",
            theme === 'dark'
              ? "border-gray-700 bg-gray-900/50 hover:bg-gray-700 hover:border-pink-500"
              : "border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-pink-400"
          )}>
            <ArrowUp className={cx(
              "w-5 h-5",
              theme === 'dark' ? "text-gray-400" : "text-gray-600"
            )} />
            <span className={cx(
              "text-xs font-semibold",
              theme === 'dark' ? "text-gray-300" : "text-gray-700"
            )}>
              {wishlist.votes}
            </span>
          </button>
        )}

        <div className="flex-1 min-w-0">
          {/* Status & Tags */}
          <div className="flex flex-wrap gap-2 mb-2">
            {wishlistsListConfig.statusBadge && (
              <Badge color={getStatusColor(wishlist.status) as any} type="pill-color" size="sm">
                {wishlist.status}
              </Badge>
            )}
            {wishlist.tags.map((tag: string) => (
              <Badge key={tag} color="gray" type="modern" size="sm">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h3 className={cx(
            "font-semibold text-base mb-1 group-hover:text-pink-600 transition-colors",
            theme === 'dark' ? "text-gray-100" : "text-gray-900"
          )}>
            {wishlist.title}
          </h3>

          {/* Description */}
          <p className={cx(
            "text-sm mb-3 line-clamp-2",
            theme === 'dark' ? "text-gray-400" : "text-gray-600"
          )}>
            {wishlist.description}
          </p>

          {/* Author & Stats */}
          <div className="flex items-center gap-4 text-sm text-tertiary">
            {wishlistsListConfig.creatorInfo && (
              <div className="flex items-center gap-1">
                <img
                  src={wishlist.avatar}
                  alt={wishlist.author}
                  className="w-5 h-5 rounded-full"
                />
                <span>{wishlist.author}</span>
              </div>
            )}
            {wishlistsListConfig.commentsCounter && (
              <div className="flex items-center gap-1">
                <MessageCircle01 className="w-4 h-4" />
                <span>{wishlist.comments}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Get enabled tabs for display
  const getEnabledTabs = () => {
    const tabs = [];
    if (wishlistsListConfig.allTab) tabs.push({ id: 'all', label: 'All' });
    if (wishlistsListConfig.trendingTab) tabs.push({ id: 'trending', label: 'Trending' });
    if (wishlistsListConfig.newTab) tabs.push({ id: 'new', label: 'New' });
    if (wishlistsListConfig.mostPopularTab) tabs.push({ id: 'most-popular', label: 'Most Popular' });
    if (wishlistsListConfig.deliveredTab) tabs.push({ id: 'delivered', label: 'Delivered' });
    return tabs;
  };

  const enabledTabs = getEnabledTabs();
  const showTabs = wishlistsListConfig.tabView && enabledTabs.length > 1;

  return (
    <div className={cx("space-y-4", className)}>
      {/* Title and Description */}
      <div className={cx("space-y-0", showTabs && "mb-4")}>
        <h2 className={cx(
          "text-base font-semibold",
          theme === 'dark' ? "text-gray-100" : "text-primary"
        )}>
          {wishlistsListConfig.title}
        </h2>
        <p className={cx(
          "text-xs",
          theme === 'dark' ? "text-gray-400" : "text-secondary"
        )}>
          {wishlistsListConfig.description}
        </p>
      </div>

      {/* Tab Navigation */}
      {showTabs && (
        <div className="mb-4">
          <div className="flex gap-1">
            {enabledTabs.map((tab, index) => (
              <button
                key={tab.id}
                className={cx(
                  "px-3 py-2 text-sm font-semibold rounded-md transition-colors",
                  index === 0
                    ? theme === 'dark'
                      ? "bg-gray-700 text-gray-100"
                      : "bg-active text-secondary"
                    : theme === 'dark'
                      ? "text-gray-400 hover:text-gray-200"
                      : "text-quaternary hover:text-secondary"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={cx(
        wishlistsListConfig.style === 'card' && "grid gap-4",
        wishlistsListConfig.style === 'card' && wishlistsListConfig.cardSize === 'small' && "grid-cols-4",
        wishlistsListConfig.style === 'card' && wishlistsListConfig.cardSize === 'medium' && "grid-cols-3",
        wishlistsListConfig.style === 'card' && wishlistsListConfig.cardSize === 'large' && "grid-cols-2",
        wishlistsListConfig.style === 'card' && wishlistsListConfig.cardSize === 'extralarge' && "grid-cols-1",
        wishlistsListConfig.style === 'list' && "space-y-3",
        wishlistsListConfig.style === 'feed' && "space-y-4"
      )}>
        {mockWishlists.map(wishlist => renderCard(wishlist))}
      </div>
    </div>
  );
};

