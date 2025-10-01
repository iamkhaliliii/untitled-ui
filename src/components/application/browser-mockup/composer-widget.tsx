import React from 'react';
import { Edit03, Image01, Paperclip, HelpCircle, Send01 } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { useResolvedTheme } from "@/hooks/use-resolved-theme";

interface ComposerWidgetProps {
  className?: string;
  theme?: 'light' | 'dark';
}

export const ComposerWidget: React.FC<ComposerWidgetProps> = ({ className, theme: propTheme }) => {
  const theme = useResolvedTheme(propTheme);

  return (
    <div className={cx(
      "rounded-lg border bg-primary p-4",
      theme === 'dark' ? "border-gray-700" : "border-gray-200",
      className
    )}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <Edit03 className="w-4 h-4 text-brand-solid" />
        <h3 className="text-sm font-semibold text-primary">Create Post</h3>
      </div>

      {/* Composer */}
      <div className="space-y-3">
        {/* User Avatar and Input */}
        <div className="flex gap-3">
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
            alt="Your avatar" 
            className="w-8 h-8 rounded-full"
          />
          <div className="flex-1">
            <textarea
              placeholder="What's on your mind?"
              className={cx(
                "w-full p-3 rounded-lg border resize-none text-sm",
                "focus:outline-none focus:ring-2 focus:ring-brand-solid/20 focus:border-brand-solid",
                theme === 'dark' 
                  ? "bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400" 
                  : "bg-white border-gray-200 text-gray-900 placeholder-gray-500"
              )}
              rows={3}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pl-11">
          <div className="flex items-center gap-2">
            <button className={cx(
              "p-2 rounded-lg transition-colors",
              theme === 'dark' ? "hover:bg-gray-700" : "hover:bg-gray-100"
            )}>
              <Image01 className="w-4 h-4 text-tertiary" />
            </button>
            <button className={cx(
              "p-2 rounded-lg transition-colors",
              theme === 'dark' ? "hover:bg-gray-700" : "hover:bg-gray-100"
            )}>
              <Paperclip className="w-4 h-4 text-tertiary" />
            </button>
            <button className={cx(
              "p-2 rounded-lg transition-colors",
              theme === 'dark' ? "hover:bg-gray-700" : "hover:bg-gray-100"
            )}>
              <HelpCircle className="w-4 h-4 text-tertiary" />
            </button>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-solid text-white rounded-lg hover:bg-brand-solid_hover transition-colors text-sm font-medium">
            <Send01 className="w-4 h-4" />
            Post
          </button>
        </div>
      </div>
    </div>
  );
};
