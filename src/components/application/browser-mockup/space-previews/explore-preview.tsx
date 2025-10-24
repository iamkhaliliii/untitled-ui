import React from "react";
import { Globe01, Users01, MessageCircle01 } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { renderSpaceHeader } from "./space-header-helper";

export const ExplorePreview: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
  return (
    <div className="space-preview-container">
      {renderSpaceHeader(
        'Explore Community',
        'Discover trending topics and popular discussions',
        <Globe01 className="w-7 h-7 text-white" />,
        'bg-blue-600',
        theme
      )}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 space-preview-grid">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div 
          key={i} 
          className={cx(
            "group relative rounded-xl sm:rounded-2xl border overflow-hidden flex flex-col cursor-pointer transition-all duration-200",
            theme === 'dark' 
              ? "bg-gray-800 border-gray-700 hover:shadow-md hover:border-blue-500/50" 
              : "bg-white border-gray-300 hover:shadow-md hover:border-brand-200"
          )}
          style={{ 
            animation: `fadeInUp 0.4s ease-out ${i * 0.1}s both`
          }}
        >
          <div className="relative overflow-hidden aspect-video">
            <div className={cx(
              "w-full h-full bg-gradient-to-br flex items-center justify-center",
              i === 1 ? "from-blue-400 to-blue-600"
              : i === 2 ? "from-purple-400 to-purple-600"
              : i === 3 ? "from-green-400 to-green-600"
              : i === 4 ? "from-orange-400 to-orange-600"
              : i === 5 ? "from-pink-400 to-pink-600"
              : "from-teal-400 to-teal-600"
            )}>
              <Globe01 className="w-12 h-12 sm:w-16 sm:h-16 text-white/30" />
            </div>
          </div>

          <div className="p-3 sm:p-4 flex flex-col flex-1">
            <div className="mb-2 sm:mb-3">
              <span className={cx(
                "inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium",
                i === 1 ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                : i === 2 ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                : i === 3 ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                : i === 4 ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
                : i === 5 ? "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300"
                : "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300"
              )}>
                {i === 1 ? '🔥 Trending' : i === 2 ? '⭐ Popular' : i === 3 ? '🆕 New' : i === 4 ? '💡 Featured' : i === 5 ? '🚀 Rising' : '📌 Pinned'}
              </span>
            </div>

            <h3 className={cx(
              "text-sm sm:text-lg font-bold mb-1.5 sm:mb-2 line-clamp-2 group-hover:text-brand-solid transition-colors",
              theme === 'dark' ? "text-gray-100" : "text-primary"
            )}>
              {i === 1 ? 'Technology & Innovation' 
               : i === 2 ? 'Design & Creative' 
               : i === 3 ? 'Product Development'
               : i === 4 ? 'Marketing & Growth'
               : i === 5 ? 'Community & Culture'
               : 'Resources & Tools'}
            </h3>

            <div className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs mb-2 sm:mb-3">
              <div className={cx("flex items-center gap-1", theme === 'dark' ? "text-gray-400" : "text-gray-500")}>
                <Users01 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                <span>{Math.floor(Math.random() * 500 + 100)} members</span>
              </div>
              <div className={cx("flex items-center gap-1", theme === 'dark' ? "text-gray-400" : "text-gray-500")}>
                <MessageCircle01 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                <span>{Math.floor(Math.random() * 200 + 50)} posts</span>
              </div>
            </div>

            <p className={cx(
              "text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 flex-1",
              theme === 'dark' ? "text-gray-400" : "text-secondary"
            )}>
              Discover trending {i === 1 ? 'tech innovations' : i === 2 ? 'creative works' : i === 3 ? 'product ideas' : i === 4 ? 'growth strategies' : i === 5 ? 'community stories' : 'useful resources'} and join the conversation.
            </p>

            <div className={cx(
              "pt-2 sm:pt-3 border-t",
              theme === 'dark' ? "border-gray-700" : "border-gray-200"
            )}>
              <button className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                Explore Topic →
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

