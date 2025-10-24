import React from "react";
import { DotsHorizontal, SearchLg } from "@untitledui/icons";
import { cx } from "@/utils/cx";

export const renderSpaceHeader = (
  title: string, 
  description: string, 
  icon: React.ReactNode, 
  iconBg: string,
  theme: 'light' | 'dark'
) => {
  return (
    <div 
      className={cx(
        "mb-4 sm:mb-6 rounded-xl sm:rounded-2xl overflow-hidden px-3 py-3 sm:px-6 sm:py-6",
        theme === 'dark' ? "bg-gradient-to-r from-gray-800 to-gray-700" : "bg-gradient-to-r from-blue-50 to-purple-50"
      )}
      style={{ 
        animation: `fadeInUp 0.3s ease-out both`
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Left side */}
        <div className="flex-1">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Icon */}
            <div className={cx("w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0", iconBg)}>
              {icon}
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <h1 className={cx("text-base sm:text-xl font-bold leading-tight mb-0.5 sm:mb-1 truncate", theme === 'dark' ? "text-gray-100" : "text-gray-900")}>
                {title}
              </h1>
              <p className={cx("text-xs sm:text-sm leading-relaxed line-clamp-1 sm:line-clamp-none", theme === 'dark' ? "text-gray-300" : "text-gray-600")}>
                {description}
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-2 sm:ml-4">
          <button className={cx(
            "px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors flex-1 sm:flex-none",
            theme === 'dark' ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-600 text-white hover:bg-blue-700"
          )}>
            Join Space
          </button>
          <button className={cx(
            "p-1.5 sm:p-2 rounded-lg transition-colors border",
            theme === 'dark' ? "border-gray-600 text-gray-400 hover:text-gray-200 hover:bg-gray-700" : "border-gray-300 text-gray-600 hover:text-gray-800 hover:bg-gray-100"
          )}>
            <SearchLg className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <button className={cx(
            "p-1.5 sm:p-2 rounded-lg transition-colors border",
            theme === 'dark' ? "border-gray-600 text-gray-400 hover:text-gray-200 hover:bg-gray-700" : "border-gray-300 text-gray-600 hover:text-gray-800 hover:bg-gray-100"
          )}>
            <DotsHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

