import React from "react";
import { File01, ThumbsUp } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { renderSpaceHeader } from "./space-header-helper";

export const ChangelogsPreview: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
  return (
    <div>
      {renderSpaceHeader(
        'Product Changelog',
        'Stay updated with latest features and improvements',
        <File01 className="w-7 h-7 text-white" />,
        'bg-teal-600',
        theme
      )}
      <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
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
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={cx(
                  "w-10 h-10 rounded-lg flex items-center justify-center",
                  i === 1 ? (theme === 'dark' ? "bg-green-900/30" : "bg-green-100")
                  : i === 2 ? (theme === 'dark' ? "bg-blue-900/30" : "bg-blue-100")
                  : i === 3 ? (theme === 'dark' ? "bg-purple-900/30" : "bg-purple-100")
                  : (theme === 'dark' ? "bg-orange-900/30" : "bg-orange-100")
                )}>
                  <span className="text-lg">
                    {i === 1 ? '🎉' : i === 2 ? '⚡' : i === 3 ? '🐛' : '🔧'}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className={cx("text-lg font-bold", theme === 'dark' ? "text-zinc-100" : "text-zinc-900")}>
                      Version {i === 1 ? '2.5.0' : i === 2 ? '2.4.0' : i === 3 ? '2.3.1' : '2.3.0'}
                    </h3>
                    <span className={cx(
                      "px-2 py-0.5 rounded-full text-xs font-semibold",
                      i === 1 ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                      : i === 2 ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                      : i === 3 ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                      : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
                    )}>
                      {i === 1 ? 'New Features' : i === 2 ? 'Improvements' : i === 3 ? 'Bug Fixes' : 'Updates'}
                    </span>
                  </div>
                  <p className={cx("text-xs mt-1", theme === 'dark' ? "text-gray-500" : "text-gray-400")}>
                    Released {i === 1 ? 'Today' : i === 2 ? '3 days ago' : i === 3 ? '1 week ago' : '2 weeks ago'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              {i === 1 && (
                <>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <p className={cx("text-sm", theme === 'dark' ? "text-zinc-300" : "text-zinc-600")}>Added dark mode support across all pages</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <p className={cx("text-sm", theme === 'dark' ? "text-zinc-300" : "text-zinc-600")}>New analytics dashboard with real-time metrics</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <p className={cx("text-sm", theme === 'dark' ? "text-zinc-300" : "text-zinc-600")}>Integrated AI-powered content recommendations</p>
                  </div>
                </>
              )}
              {i === 2 && (
                <>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">↑</span>
                    <p className={cx("text-sm", theme === 'dark' ? "text-zinc-300" : "text-zinc-600")}>50% faster page load times</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">↑</span>
                    <p className={cx("text-sm", theme === 'dark' ? "text-zinc-300" : "text-zinc-600")}>Improved mobile responsiveness</p>
                  </div>
                </>
              )}
              {i === 3 && (
                <>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-500 mt-0.5">×</span>
                    <p className={cx("text-sm", theme === 'dark' ? "text-zinc-300" : "text-zinc-600")}>Fixed notification delivery issues</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-500 mt-0.5">×</span>
                    <p className={cx("text-sm", theme === 'dark' ? "text-zinc-300" : "text-zinc-600")}>Resolved login authentication bugs</p>
                  </div>
                </>
              )}
              {i === 4 && (
                <>
                  <div className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">●</span>
                    <p className={cx("text-sm", theme === 'dark' ? "text-zinc-300" : "text-zinc-600")}>Updated dependencies and security patches</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">●</span>
                    <p className={cx("text-sm", theme === 'dark' ? "text-zinc-300" : "text-zinc-600")}>Improved accessibility features</p>
                  </div>
                </>
              )}
            </div>
            
            <div className={cx(
              "pt-3 border-t flex items-center justify-between",
              theme === 'dark' ? "border-zinc-800" : "border-zinc-200"
            )}>
              <div className={cx("flex items-center gap-2 text-xs", theme === 'dark' ? "text-gray-400" : "text-gray-500")}>
                <ThumbsUp className="h-3.5 w-3.5" />
                <span>{Math.floor(Math.random() * 50 + 10)} reactions</span>
              </div>
              <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                View Details →
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

