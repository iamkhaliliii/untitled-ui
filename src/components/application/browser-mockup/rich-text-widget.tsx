import React from 'react';
import { File01, Edit03, Link01 } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { useResolvedTheme } from "@/hooks/use-resolved-theme";
import { useWidgetConfig } from "@/providers/widget-config-provider";

interface RichTextWidgetProps {
  className?: string;
  theme?: 'light' | 'dark';
}

export const RichTextWidget: React.FC<RichTextWidgetProps> = ({ className, theme: propTheme }) => {
  const theme = useResolvedTheme(propTheme);
  const { richTextConfig } = useWidgetConfig();

  const getContainerClasses = () => {
    const baseClasses = className;
    
    switch (richTextConfig.cardStyle) {
      case 'card':
        return cx(
          "rounded-lg border bg-primary p-4",
          theme === 'dark' ? "border-gray-700" : "border-gray-200",
          baseClasses
        );
      case 'no_padding':
        return cx(
          "rounded-lg border bg-primary",
          theme === 'dark' ? "border-gray-700" : "border-gray-200",
          baseClasses
        );
      case 'none':
        return cx(baseClasses);
      default:
        return cx(
          "rounded-lg border bg-primary p-4",
          theme === 'dark' ? "border-gray-700" : "border-gray-200",
          baseClasses
        );
    }
  };

  const getContentClasses = () => {
    switch (richTextConfig.cardStyle) {
      case 'card':
        return "";
      case 'no_padding':
        return "p-4";
      case 'none':
        return "";
      default:
        return "";
    }
  };

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        // Headers
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-lg font-bold text-primary mb-3">{line.slice(2)}</h1>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-base font-semibold text-primary mb-2">{line.slice(3)}</h2>;
        }
        // Lists
        if (line.startsWith('- ')) {
          return (
            <div key={index} className="flex items-start gap-2 text-sm text-secondary">
              <span className="text-brand-solid mt-1">•</span>
              <span>{line.slice(2)}</span>
            </div>
          );
        }
        // Quotes
        if (line.startsWith('> ')) {
          return (
            <blockquote key={index} className={cx(
              "border-l-4 border-brand-solid pl-4 py-2 italic text-sm",
              theme === 'dark' ? "bg-gray-800/50" : "bg-gray-50"
            )}>
              {line.slice(2)}
            </blockquote>
          );
        }
        // Empty lines
        if (line.trim() === '') {
          return <div key={index} className="h-2"></div>;
        }
        // Regular paragraphs
        return <p key={index} className="text-sm text-secondary leading-relaxed">{line}</p>;
      });
  };

  return (
    <div className={getContainerClasses()}>
      <div className={getContentClasses()}>
        {/* Rich Text Content */}
        <div className="prose prose-sm max-w-none space-y-3">
          {renderContent(richTextConfig.content)}
        </div>
      </div>
    </div>
  );
};
