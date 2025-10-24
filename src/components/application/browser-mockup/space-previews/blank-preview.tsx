import React from "react";
import { File05 } from "@untitledui/icons";
import { cx } from "@/utils/cx";

export const BlankPreview: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
  return (
    <div 
      className={cx(
        "w-full rounded-xl sm:rounded-2xl border p-6 sm:p-20 text-center transition-all duration-200",
        theme === 'dark' ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      )}
      style={{ 
        animation: `fadeInUp 0.4s ease-out both`
      }}
    >
      <div className={cx(
        "w-14 h-14 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-6 rounded-lg sm:rounded-2xl flex items-center justify-center",
        theme === 'dark' ? "bg-gray-700/50" : "bg-gray-100"
      )}>
        <File05 className={cx("size-7 sm:size-10", theme === 'dark' ? "text-gray-500" : "text-gray-400")} />
      </div>
      <h3 className={cx("text-base sm:text-2xl font-bold mb-1.5 sm:mb-3", theme === 'dark' ? "text-gray-100" : "text-gray-900")}>
        Blank Canvas
      </h3>
      <p className={cx("text-xs sm:text-base max-w-md mx-auto mb-3 sm:mb-6 line-clamp-2 sm:line-clamp-none", theme === 'dark' ? "text-gray-400" : "text-gray-600")}>
        Start from scratch and create your own unique space layout
      </p>
      <button className="px-3 py-1.5 sm:px-6 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
        Start Building →
      </button>
    </div>
  );
};

