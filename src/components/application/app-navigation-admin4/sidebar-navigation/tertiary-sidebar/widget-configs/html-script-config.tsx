import React, { useState } from 'react';
import { Square, Minimize01, X } from '@untitledui/icons';
import { TextArea } from '@/components/base/textarea/textarea';
import { useResolvedTheme } from '@/hooks/use-resolved-theme';
import { cx } from '@/utils/cx';
import { useWidgetConfig } from '@/providers/widget-config-provider';
import { CustomizerSection } from '../customizer-section';

export const HtmlScriptConfig: React.FC = () => {
  const { htmlScriptConfig, updateHtmlScriptConfig } = useWidgetConfig();
  const theme = useResolvedTheme();
  
  const { codeInput, cardStyle } = htmlScriptConfig;

  // Section collapse/expand states
  const [infoExpanded, setInfoExpanded] = useState(true);
  const [layoutExpanded, setLayoutExpanded] = useState(true);

  const cardStyleOptions = [
    { id: 'card', label: 'Card', icon: Square },
    { id: 'no_padding', label: 'No Padding', icon: Minimize01 },
    { id: 'none', label: 'None', icon: X }
  ];

  const StyleTile = ({ option, isSelected, onClick }: {
    option: { id: string; label: string; icon: React.ComponentType<any> };
    isSelected: boolean;
    onClick: () => void;
  }) => {
    const IconComponent = option.icon;
    return (
      <button
        onClick={onClick}
        className={cx(
          "flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all",
          isSelected
            ? theme === 'dark'
              ? "border-brand-solid bg-brand-solid/20 text-brand-primary"
              : "border-brand-solid bg-brand-50 text-brand-secondary"
            : theme === 'dark'
              ? "border-gray-700 bg-gray-800/50 text-gray-200 hover:border-gray-600 hover:bg-gray-700/60"
              : "border-secondary bg-primary text-secondary hover:border-brand-200 hover:bg-brand-25"
        )}
      >
        <div className={cx(
          "p-2 rounded-md",
          isSelected 
            ? theme === 'dark' 
              ? "bg-brand-solid/30" 
              : "bg-brand-100"
            : theme === 'dark'
              ? "bg-gray-700/60"
              : "bg-secondary/60"
        )}>
          <IconComponent className="size-4" />
        </div>
        <span className="text-xs font-medium">{option.label}</span>
      </button>
    );
  };

  return (
    <div className="space-y-2">
      {/* Basic Section */}
      <CustomizerSection
        title="Basic"
        isExpanded={infoExpanded}
        onExpandedChange={setInfoExpanded}
      >
        <div className="space-y-4">
          <div>
            <TextArea
              label="Code Input"
              id="html-code-input"
              value={codeInput}
              onChange={(e) => updateHtmlScriptConfig({ codeInput: e.target.value })}
              placeholder="Enter your HTML, CSS, or JavaScript code"
              rows={8}
              className="font-mono text-sm"
            />
          </div>
        </div>
      </CustomizerSection>

      {/* Divider */}
      <div className={cx(
        "border-t",
        theme === 'dark' ? "border-gray-700" : "border-secondary"
      )}></div>

      {/* Style Section */}
      <CustomizerSection
        title="Style"
        isExpanded={layoutExpanded}
        onExpandedChange={setLayoutExpanded}
      >
        <div className="space-y-6">
          <div>
            <div className="grid grid-cols-3 gap-2">
              {cardStyleOptions.map((option) => (
                <StyleTile
                  key={option.id}
                  option={option}
                  isSelected={cardStyle === option.id}
                  onClick={() => updateHtmlScriptConfig({ cardStyle: option.id as 'card' | 'no_padding' | 'none' })}
                />
              ))}
            </div>
          </div>
        </div>
      </CustomizerSection>
    </div>
  );
};

