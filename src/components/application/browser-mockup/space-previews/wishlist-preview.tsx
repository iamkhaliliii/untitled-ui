import React from "react";
import { Star01, MessageCircle01, Eye } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { renderSpaceHeader } from "./space-header-helper";

export const WishlistPreview: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
  return (
    <div>
      {renderSpaceHeader(
        'Feature Wishlist',
        'Vote and suggest features you want to see',
        <Star01 className="w-7 h-7 text-white" />,
        'bg-yellow-600',
        theme
      )}
      <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div 
          key={i} 
          className={cx(
            "w-full cursor-pointer rounded-xl shadow-sm hover:shadow-md transition-shadow",
            theme === 'dark' ? "bg-zinc-900 border border-zinc-800" : "bg-white border border-zinc-200"
          )}
          style={{ 
            animation: `fadeInUp 0.4s ease-out ${i * 0.1}s both`
          }}
        >
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center gap-1">
                <button className={cx(
                  "w-10 h-10 rounded-lg border-2 flex items-center justify-center transition-all",
                  theme === 'dark' 
                    ? "border-gray-700 hover:bg-gray-800 hover:border-blue-500" 
                    : "border-gray-300 hover:bg-gray-100 hover:border-blue-400"
                )}>
                  <span className="text-lg">▲</span>
                </button>
                <span className={cx("text-base font-bold", theme === 'dark' ? "text-gray-300" : "text-gray-700")}>
                  {Math.floor(Math.random() * 200 + 50)}
                </span>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <img 
                    src={`https://images.unsplash.com/photo-${i === 1 ? '1500648767791' : i === 2 ? '1472099645785' : i === 3 ? '1494790108755' : i === 4 ? '1507003211169' : '1438761681033'}-00dcc994a43e?w=32&h=32&fit=crop&crop=face`}
                    alt="Author" 
                    className={cx("w-6 h-6 rounded-full", theme === 'dark' ? "ring-1 ring-gray-700" : "ring-1 ring-gray-200")}
                    onError={(e) => {
                      const names = ['David', 'Emily', 'Mike', 'Alex', 'Sarah'];
                      e.currentTarget.outerHTML = `<div class="w-6 h-6 rounded-full ${theme === 'dark' ? 'bg-yellow-600 ring-1 ring-gray-700' : 'bg-yellow-600 ring-1 ring-gray-200'} flex items-center justify-center text-white font-semibold text-xs">${names[i-1].charAt(0)}</div>`;
                    }}
                  />
                  <span className={cx("text-xs font-medium", theme === 'dark' ? "text-gray-400" : "text-gray-600")}>
                    {i === 1 ? 'David Wilson' : i === 2 ? 'Emily Chen' : i === 3 ? 'Mike Brown' : i === 4 ? 'Alex Kim' : 'Sarah Lee'}
                  </span>
                  <span className={cx("text-xs", theme === 'dark' ? "text-gray-500" : "text-gray-400")}>
                    • {i} days ago
                  </span>
                </div>
                
                <h3 className={cx("text-lg font-bold mb-2", theme === 'dark' ? "text-zinc-100" : "text-zinc-900")}>
                  {i === 1 ? 'Dark mode support for all pages' 
                   : i === 2 ? 'Native mobile application' 
                   : i === 3 ? 'Comprehensive API documentation'
                   : i === 4 ? 'Real-time collaboration features'
                   : 'Advanced analytics dashboard'}
                </h3>
                
                <p className={cx("text-sm mb-4 line-clamp-2", theme === 'dark' ? "text-zinc-300" : "text-zinc-600")}>
                  {i === 1 
                    ? "We need dark mode support to reduce eye strain during nighttime usage. This would greatly improve user experience and accessibility."
                    : i === 2 
                    ? "A native mobile app would make it easier to stay connected on the go. Push notifications and offline access would be amazing features."
                    : i === 3
                    ? "Detailed API documentation with code examples would help developers integrate faster and reduce support burden."
                    : i === 4
                    ? "Enable multiple users to work on the same document simultaneously, similar to Google Docs collaboration."
                    : "A comprehensive analytics dashboard to track user engagement, content performance, and community growth metrics."
                  }
                </p>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className={cx(
                    "px-2.5 py-1 rounded-full text-xs font-semibold",
                    i === 1 ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                    : i === 2 ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                    : i === 3 ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                    : i === 4 ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                  )}>
                    {i === 1 ? '🚀 In Progress' : i === 2 ? '👀 Under Review' : i === 3 ? '📋 Planned' : i === 4 ? '💡 Considering' : '📝 Open'}
                  </span>
                  <span className={cx("text-xs px-2 py-1 rounded-md", theme === 'dark' ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700")}>
                    {i === 1 ? 'UI/UX' : i === 2 ? 'Mobile' : i === 3 ? 'Documentation' : i === 4 ? 'Collaboration' : 'Analytics'}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-xs">
                  <div className={cx("flex items-center gap-1", theme === 'dark' ? "text-gray-400" : "text-gray-500")}>
                    <MessageCircle01 className="h-3.5 w-3.5" />
                    <span>{Math.floor(Math.random() * 30 + 5)} comments</span>
                  </div>
                  <div className={cx("flex items-center gap-1", theme === 'dark' ? "text-gray-400" : "text-gray-500")}>
                    <Eye className="h-3.5 w-3.5" />
                    <span>{Math.floor(Math.random() * 500 + 100)} views</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

