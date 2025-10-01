import React from 'react';
import { HelpCircle, X, ArrowRight } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { useResolvedTheme } from "@/hooks/use-resolved-theme";
import { useWidgetConfig } from "@/providers/widget-config-provider";

interface AnnouncementBannerWidgetProps {
  className?: string;
  theme?: 'light' | 'dark';
}

export const AnnouncementBannerWidget: React.FC<AnnouncementBannerWidgetProps> = ({ className, theme: propTheme }) => {
  const theme = useResolvedTheme(propTheme);
  const { announcementBannerConfig } = useWidgetConfig();

  // Style configurations based on the selected style
  const getStyleClasses = () => {
    const baseClasses = "rounded-lg border p-4";
    
    switch (announcementBannerConfig.style) {
      case 'primary':
        return cx(
          baseClasses,
          "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200",
          theme === 'dark' && "from-blue-900/20 to-indigo-900/20 border-blue-700"
        );
      case 'natural':
        return cx(
          baseClasses,
          "bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200",
          theme === 'dark' && "from-gray-900/20 to-slate-900/20 border-gray-700"
        );
      case 'warning':
        return cx(
          baseClasses,
          "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200",
          theme === 'dark' && "from-yellow-900/20 to-orange-900/20 border-yellow-700"
        );
      case 'error':
        return cx(
          baseClasses,
          "bg-gradient-to-r from-red-50 to-pink-50 border-red-200",
          theme === 'dark' && "from-red-900/20 to-pink-900/20 border-red-700"
        );
      case 'info':
        return cx(
          baseClasses,
          "bg-gradient-to-r from-cyan-50 to-teal-50 border-cyan-200",
          theme === 'dark' && "from-cyan-900/20 to-teal-900/20 border-cyan-700"
        );
      default:
        return cx(
          baseClasses,
          "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200",
          theme === 'dark' && "from-blue-900/20 to-indigo-900/20 border-blue-700"
        );
    }
  };

  const getIconColor = () => {
    switch (announcementBannerConfig.style) {
      case 'primary': return 'text-blue-600';
      case 'natural': return 'text-gray-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      case 'info': return 'text-cyan-600';
      default: return 'text-blue-600';
    }
  };

  const getTextColor = () => {
    switch (announcementBannerConfig.style) {
      case 'primary': return theme === 'dark' ? "text-blue-100" : "text-blue-900";
      case 'natural': return theme === 'dark' ? "text-gray-100" : "text-gray-900";
      case 'warning': return theme === 'dark' ? "text-yellow-100" : "text-yellow-900";
      case 'error': return theme === 'dark' ? "text-red-100" : "text-red-900";
      case 'info': return theme === 'dark' ? "text-cyan-100" : "text-cyan-900";
      default: return theme === 'dark' ? "text-blue-100" : "text-blue-900";
    }
  };

  const BannerContent = () => (
    <div className="flex items-start gap-3">
      {/* Icon */}
      {announcementBannerConfig.showIcon && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-white/50 flex items-center justify-center">
            <HelpCircle className={cx("w-4 h-4", getIconColor())} />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className={cx("text-sm font-semibold mb-1", getTextColor())}>
          {announcementBannerConfig.title}
        </h3>
        
        <p className={cx("text-sm", getTextColor())}>
          {announcementBannerConfig.description}
        </p>
      </div>

      {/* Close Button */}
      {announcementBannerConfig.showCloseButton && (
        <button 
          className={cx(
            "flex-shrink-0 p-1 rounded-md transition-colors",
            "hover:bg-white/20",
            getTextColor()
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );

  return (
    <div className={cx(getStyleClasses(), className)}>
      {announcementBannerConfig.url && announcementBannerConfig.url !== '#' ? (
        <a 
          href={announcementBannerConfig.url}
          className="block cursor-pointer hover:opacity-90 transition-opacity"
        >
          <BannerContent />
        </a>
      ) : (
        <BannerContent />
      )}
    </div>
  );
};
