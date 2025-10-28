import React, { useState } from 'react';
import { MessageSquare01, User01, Heart, MessageCircle01, Eye, ArrowUp } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import type { Key } from "react-aria-components";
import { Tabs } from "@/components/application/tabs/tabs";
import { useResolvedTheme } from "@/hooks/use-resolved-theme";
import { useWidgetConfig } from "@/providers/widget-config-provider";
import { Badge } from '@/components/base/badges/badges';

interface DiscussionsListWidgetProps {
  className?: string;
  theme?: 'light' | 'dark';
}

export const DiscussionsListWidget: React.FC<DiscussionsListWidgetProps> = ({ className, theme: propTheme }) => {
  const { discussionsListConfig } = useWidgetConfig();
  const theme = useResolvedTheme(propTheme);
  const [activeTab, setActiveTab] = useState<Key>('All');

  // Generate tab items based on config
  const getTabItems = () => {
    const tabs = [];
    if (discussionsListConfig.allTab) tabs.push({ id: 'All', label: 'All' });
    if (discussionsListConfig.trendingTab) tabs.push({ id: 'Trending', label: 'Trending' });
    if (discussionsListConfig.recentTab) tabs.push({ id: 'Recent', label: 'Recent' });
    return tabs;
  };

  const mockDiscussions = [
    {
      id: 1,
      title: "How to integrate authentication in Next.js?",
      author: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?img=1",
      replies: 24,
      views: 342,
      likes: 18,
      tags: ["Next.js", "Authentication"],
      timestamp: "2 hours ago",
      isAnswered: true
    },
    {
      id: 2,
      title: "Best practices for state management",
      author: "Mike Chen",
      avatar: "https://i.pravatar.cc/150?img=2",
      replies: 15,
      views: 256,
      likes: 12,
      tags: ["React", "State Management"],
      timestamp: "5 hours ago",
      isAnswered: false
    },
    {
      id: 3,
      title: "Performance optimization tips",
      author: "Emma Davis",
      avatar: "https://i.pravatar.cc/150?img=3",
      replies: 32,
      views: 487,
      likes: 28,
      tags: ["Performance", "Optimization"],
      timestamp: "1 day ago",
      isAnswered: true
    }
  ];

  const renderListItem = (discussion: any) => (
    <div
      key={discussion.id}
      className={cx(
        "group flex items-start gap-4 p-4 border-b cursor-pointer transition-all duration-200",
        theme === 'dark'
          ? "border-gray-700 hover:bg-gray-800/50"
          : "border-gray-200 hover:bg-gray-50"
      )}
    >
      {/* Member Avatar */}
      {discussionsListConfig.memberAvatar && (
        <img
          src={discussion.avatar}
          alt={discussion.author}
          className="w-12 h-12 rounded-full flex-shrink-0"
        />
      )}

      <div className="flex-1 min-w-0">
        {/* Title */}
        <h3 className={cx(
          "font-semibold text-base mb-1 group-hover:text-brand-600 transition-colors",
          theme === 'dark' ? "text-gray-100" : "text-gray-900"
        )}>
          {discussion.title}
        </h3>

        {/* Post Summary */}
        {discussionsListConfig.postSummary && (
          <p className={cx(
            "text-sm mb-2 line-clamp-2",
            theme === 'dark' ? "text-gray-400" : "text-gray-600"
          )}>
            A discussion about {discussion.title.toLowerCase()}
          </p>
        )}

        {/* Tags */}
        {discussionsListConfig.tags && (
          <div className="flex flex-wrap gap-2 mb-2">
            {discussion.tags.map((tag: string) => (
              <Badge key={tag} color="gray" type="modern" size="sm">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Reaction and Reply */}
        {discussionsListConfig.reactionAndReply && (
          <div className="flex items-center gap-4 text-sm text-tertiary">
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span>{discussion.likes} reactions</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle01 className="w-4 h-4" />
              <span>{discussion.replies} replies</span>
            </div>
            <span>{discussion.timestamp}</span>
          </div>
        )}
      </div>
    </div>
  );

  const renderFeedItem = (discussion: any) => (
    <div
      key={discussion.id}
      className={cx(
        "group rounded-xl border p-5 cursor-pointer transition-all duration-200",
        theme === 'dark'
          ? "bg-gray-800 border-gray-700 hover:border-blue-500/50 hover:shadow-lg"
          : "bg-white border-gray-200 hover:border-brand-300 hover:shadow-md"
      )}
    >
      <div className="flex items-start gap-4">
        {/* Member Avatar */}
        {discussionsListConfig.memberAvatar && (
          <img
            src={discussion.avatar}
            alt={discussion.author}
            className="w-12 h-12 rounded-full flex-shrink-0"
          />
        )}

        <div className="flex-1 min-w-0">
          {/* Author and Time */}
          <div className="flex items-center gap-2 mb-2">
            <span className={cx(
              "font-semibold text-sm",
              theme === 'dark' ? "text-gray-100" : "text-gray-900"
            )}>
              {discussion.author}
            </span>
            <span className="text-sm text-tertiary">{discussion.timestamp}</span>
          </div>

          {/* Title */}
          <h3 className={cx(
            "font-semibold text-lg mb-2 group-hover:text-brand-600 transition-colors",
            theme === 'dark' ? "text-gray-100" : "text-gray-900"
          )}>
            {discussion.title}
          </h3>

          {/* Post Content */}
          {discussionsListConfig.postContent && (
            <p className={cx(
              "text-sm mb-3 line-clamp-3",
              theme === 'dark' ? "text-gray-400" : "text-gray-600"
            )}>
              This is a detailed discussion about {discussion.title.toLowerCase()}. Join the conversation and share your thoughts with the community.
            </p>
          )}

          {/* Tags */}
          {discussionsListConfig.tags && (
            <div className="flex flex-wrap gap-2 mb-3">
              {discussion.tags.map((tag: string) => (
                <Badge key={tag} color="brand" type="pill-color" size="sm">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Reaction and Reply */}
          {discussionsListConfig.reactionAndReply && (
            <div className="flex items-center gap-4 text-sm text-tertiary mb-3">
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span>{discussion.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle01 className="w-4 h-4" />
                <span>{discussion.replies} replies</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{discussion.views} views</span>
              </div>
            </div>
          )}

          {/* Comments Preview */}
          {discussionsListConfig.comments && (
            <div className={cx(
              "border-t pt-3 mt-3",
              theme === 'dark' ? "border-gray-700" : "border-gray-200"
            )}>
              <div className="flex items-start gap-2">
                <img
                  src="https://i.pravatar.cc/150?img=20"
                  alt="Commenter"
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1">
                  <p className={cx(
                    "text-sm",
                    theme === 'dark' ? "text-gray-300" : "text-gray-700"
                  )}>
                    Great discussion! I'd like to add...
                  </p>
                  <span className="text-xs text-tertiary">2 hours ago</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderCard = (discussion: any) => (
    <div
      key={discussion.id}
      className={cx(
        "group rounded-xl border p-4 cursor-pointer transition-all duration-200",
        theme === 'dark'
          ? "bg-gray-800 border-gray-700 hover:border-blue-500/50 hover:shadow-lg"
          : "bg-white border-gray-200 hover:border-brand-300 hover:shadow-md"
      )}
    >
      <div className="flex items-start gap-3">
        {/* Author Avatar - Only show if authorInfo is enabled */}
        {discussionsListConfig.authorInfo && (
          <img
            src={discussion.avatar}
            alt={discussion.author}
            className="w-10 h-10 rounded-full flex-shrink-0"
          />
        )}

        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3 className={cx(
            "font-semibold text-base mb-2 group-hover:text-brand-600 transition-colors",
            theme === 'dark' ? "text-gray-100" : "text-gray-900"
          )}>
            {discussion.title}
          </h3>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {discussion.tags.map((tag: string) => (
              <Badge key={tag} color="brand" type="pill-color" size="sm">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-tertiary">
            {discussionsListConfig.authorInfo && (
              <div className="flex items-center gap-1">
                <User01 className="w-4 h-4" />
                <span>{discussion.author}</span>
              </div>
            )}
            {discussionsListConfig.repliesCounter && (
              <div className="flex items-center gap-1">
                <MessageCircle01 className="w-4 h-4" />
                <span>{discussion.replies} replies</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{discussion.views} views</span>
            </div>
            {discussionsListConfig.reactionsCounter && (
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span>{discussion.likes}</span>
              </div>
            )}
          </div>
        </div>

        {/* Answered Badge */}
        {discussion.isAnswered && (
          <Badge color="success" type="pill-color" size="sm">
            Answered
          </Badge>
        )}
      </div>
    </div>
  );

  return (
    <div className={cx("space-y-4", className)}>
      {discussionsListConfig.tabView && getTabItems().length > 0 && (
        <div className="mb-4">
          <Tabs selectedKey={activeTab} onSelectionChange={setActiveTab} className="w-max">
            <Tabs.List type="button-gray" items={getTabItems()}>
              {(tab) => <Tabs.Item {...tab} />}
            </Tabs.List>
          </Tabs>
        </div>
      )}

      <div>
        {discussionsListConfig.style === 'card' && (
          <div className={cx(
            "grid gap-4",
            discussionsListConfig.cardSize === 'small' && "grid-cols-4",
            discussionsListConfig.cardSize === 'medium' && "grid-cols-3",
            discussionsListConfig.cardSize === 'large' && "grid-cols-2",
            discussionsListConfig.cardSize === 'extralarge' && "grid-cols-1"
          )}>
            {mockDiscussions.map(discussion => renderCard(discussion))}
          </div>
        )}

        {discussionsListConfig.style === 'list' && (
          <div className={cx(
            "border rounded-xl overflow-hidden",
            theme === 'dark' ? "border-gray-700" : "border-gray-200"
          )}>
            {mockDiscussions.map(discussion => renderListItem(discussion))}
          </div>
        )}

        {discussionsListConfig.style === 'feed' && (
          <div className="space-y-4">
            {mockDiscussions.map(discussion => renderFeedItem(discussion))}
          </div>
        )}
      </div>
    </div>
  );
};

