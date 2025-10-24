import React from "react";
import { File01, ThumbsUp, Eye, Bookmark } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { renderSpaceHeader } from "./space-header-helper";

export const ArticlesPreview: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
  return (
    <div className="space-preview-container">
      {renderSpaceHeader(
        'Knowledge Base',
        'Learn from articles and guides written by experts',
        <File01 className="w-7 h-7 text-white" />,
        'bg-indigo-600',
        theme
      )}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 space-preview-grid">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div 
          key={i} 
          className={cx(
            "group relative rounded-xl sm:rounded-2xl border overflow-hidden flex flex-col cursor-pointer transition-all duration-200",
            theme === 'dark' 
              ? "bg-gray-800 border-gray-700 hover:shadow-md hover:border-indigo-500/50" 
              : "bg-white border-gray-300 hover:shadow-md hover:border-brand-200"
          )}
          style={{ 
            animation: `fadeInUp 0.4s ease-out ${i * 0.1}s both`
          }}
        >
          <div className="relative overflow-hidden aspect-video">
            <div className={cx(
              "w-full h-full bg-gradient-to-br",
              i === 1 ? "from-indigo-400 to-purple-500"
              : i === 2 ? "from-blue-400 to-cyan-500"
              : i === 3 ? "from-emerald-400 to-teal-500"
              : i === 4 ? "from-amber-400 to-orange-500"
              : i === 5 ? "from-rose-400 to-pink-500"
              : "from-violet-400 to-purple-500"
            )}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute top-3 right-3">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-white/90 dark:bg-black/80 text-gray-900 dark:text-white backdrop-blur-sm">
                {Math.floor(Math.random() * 10 + 3)} min read
              </span>
            </div>
          </div>
          <div className="p-2 sm:p-4 flex flex-col flex-1">
            <div className="mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
              <img 
                src={`https://images.unsplash.com/photo-${i === 1 ? '1472099645785' : i === 2 ? '1494790108755' : i === 3 ? '1507003211169' : i === 4 ? '1438761681033' : i === 5 ? '1500648767791' : '1519345182560'}-5658abf4ff4e?w=32&h=32&fit=crop&crop=face`}
                alt="Author" 
                className={cx("w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2", theme === 'dark' ? "border-gray-800" : "border-white")}
                onError={(e) => {
                  const names = ['Emily', 'Mike', 'Alex', 'Sarah', 'David', 'James'];
                  e.currentTarget.outerHTML = `<div class="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 ${theme === 'dark' ? 'border-gray-800 bg-indigo-600' : 'border-white bg-indigo-600'} flex items-center justify-center text-white font-semibold text-xs">${names[i-1].charAt(0)}</div>`;
                }}
              />
              <span className={cx("text-[10px] sm:text-xs font-medium", theme === 'dark' ? "text-gray-400" : "text-gray-600")}>
                {i === 1 ? 'Emily Chen' : i === 2 ? 'Mike Johnson' : i === 3 ? 'Alex Kim' : i === 4 ? 'Sarah Davis' : i === 5 ? 'David Lee' : 'James Wilson'}
              </span>
            </div>
            <h3 className={cx(
              "text-sm sm:text-xl font-bold mb-1.5 sm:mb-2 line-clamp-2 group-hover:text-brand-solid transition-colors",
              theme === 'dark' ? "text-gray-100" : "text-primary"
            )}>
              {i === 1 ? 'Complete Guide to Getting Started' 
               : i === 2 ? 'Best Practices for Modern Development' 
               : i === 3 ? 'Advanced Features Deep Dive'
               : i === 4 ? 'Tips & Tricks for Productivity'
               : i === 5 ? 'Common Mistakes to Avoid'
               : 'Expert Insights & Analysis'}
            </h3>
            <p className={cx("text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 flex-1", theme === 'dark' ? "text-gray-400" : "text-secondary")}>
              Learn essential techniques and best practices to {i === 1 ? 'kickstart your journey' : i === 2 ? 'write better code' : i === 3 ? 'master advanced concepts' : i === 4 ? 'boost your productivity' : i === 5 ? 'prevent common pitfalls' : 'gain expert knowledge'}.
            </p>
            <div className="flex items-center justify-between text-[10px] sm:text-xs">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className={cx("flex items-center gap-0.5 sm:gap-1", theme === 'dark' ? "text-gray-400" : "text-gray-500")}>
                  <ThumbsUp className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  <span>{Math.floor(Math.random() * 100 + 20)}</span>
                </div>
                <div className={cx("flex items-center gap-0.5 sm:gap-1", theme === 'dark' ? "text-gray-400" : "text-gray-500")}>
                  <Eye className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  <span>{Math.floor(Math.random() * 500 + 100)}</span>
                </div>
              </div>
              <Bookmark className={cx("h-3.5 w-3.5 sm:h-4 sm:w-4 cursor-pointer", theme === 'dark' ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600")} />
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};
