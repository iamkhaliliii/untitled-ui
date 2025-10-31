import React from 'react';
import { Code01, Link01 } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { useResolvedTheme } from "@/hooks/use-resolved-theme";
import { useWidgetConfig } from "@/providers/widget-config-provider";

interface HtmlScriptWidgetProps {
  className?: string;
  theme?: 'light' | 'dark';
}

export const HtmlScriptWidget: React.FC<HtmlScriptWidgetProps> = ({ className, theme: propTheme }) => {
  const theme = useResolvedTheme(propTheme);
  const { htmlScriptConfig } = useWidgetConfig();

  const getContainerClasses = () => {
    const baseClasses = className;
    
    switch (htmlScriptConfig.cardStyle) {
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

  return (
    <div className={getContainerClasses()}>
      {/* Render the HTML content */}
      <div 
        dangerouslySetInnerHTML={{ __html: htmlScriptConfig.codeInput }}
        className="custom-html-content"
      />
    </div>
  );
};
