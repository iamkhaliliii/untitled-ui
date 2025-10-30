import React, { useState } from 'react';
import { Settings01, Palette, Image01, VideoRecorder, Upload01, Square, Zap, GridDotsOuter, FlexAlignRight, FlexAlignLeft, FlexAlignTop, FlexAlignBottom, AlignLeft, AlignCenter, AlignRight } from '@untitledui/icons';
import { Input } from '@/components/base/input/input';
import { TextArea } from '@/components/base/textarea/textarea';
import { Toggle } from '@/components/base/toggle/toggle';
import { useResolvedTheme } from '@/hooks/use-resolved-theme';
import { cx } from '@/utils/cx';
import { useWidgetConfig } from '@/providers/widget-config-provider';
import { CustomizerSection } from '../customizer-section';
import { FileTrigger } from '@/components/base/file-upload-trigger/file-upload-trigger';

export const HeroBannerConfig: React.FC = () => {
  const { heroBannerConfig, updateHeroBannerConfig } = useWidgetConfig();
  const theme = useResolvedTheme();
  
  const { layout, style, alignment, title, description, showCTA, ctaText, ctaUrl, backgroundColor, imageUrl, videoUrl } = heroBannerConfig;

  // Section collapse/expand states
  const [layoutExpanded, setLayoutExpanded] = useState(true);
  const [styleExpanded, setStyleExpanded] = useState(true);
  const [contentExpanded, setContentExpanded] = useState(true);
  const [ctaExpanded, setCtaExpanded] = useState(true);

  const layoutOptions = [
    { id: 'fill', label: 'Fill', icon: GridDotsOuter },
    { id: 'right', label: 'Right', icon: FlexAlignRight },
    { id: 'left', label: 'Left', icon: FlexAlignLeft },
    { id: 'top', label: 'Top', icon: FlexAlignTop },
    { id: 'bottom', label: 'Bottom', icon: FlexAlignBottom }
  ];

  const styleOptions = [
    { id: 'simple', label: 'Simple', icon: Square },
    { id: 'color', label: 'Color', icon: Palette },
    { id: 'image', label: 'Image', icon: Image01 },
    { id: 'video', label: 'Video', icon: VideoRecorder }
  ];

  const alignmentOptions = [
    { id: 'left', label: 'Left', icon: AlignLeft },
    { id: 'center', label: 'Center', icon: AlignCenter },
    { id: 'right', label: 'Right', icon: AlignRight }
  ];

  const PropertyToggle = ({ icon: Icon, label, isSelected, onChange, id }: {
    icon: React.ComponentType<any>;
    label: string;
    isSelected: boolean;
    onChange: (value: boolean) => void;
    id: string;
  }) => (
    <div className={cx(
      "flex items-center py-2 px-2 border rounded-md transition-all duration-300 ease-in-out",
      theme === 'dark' 
        ? "border-gray-700 bg-gray-800/50 hover:bg-gray-800/80 hover:border-gray-600"
        : "border-gray-200 bg-white/50 hover:bg-white/80 hover:border-gray-300"
    )}>
      <div className="flex items-center space-x-2">
        <Icon className={cx(
          "h-4 w-4",
          theme === 'dark' ? "text-gray-400" : "text-gray-500"
        )} />
        <span className={cx(
          "text-sm font-medium",
          theme === 'dark' ? "text-gray-100" : "text-gray-900"
        )}>{label}</span>
      </div>
      <div className="ml-auto">
        <Toggle
          id={id}
          isSelected={isSelected}
          onChange={onChange}
          size="sm"
          slim
        />
      </div>
    </div>
  );

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
      {/* Layout Section */}
      <CustomizerSection
        title="Layout"
        isExpanded={layoutExpanded}
        onExpandedChange={setLayoutExpanded}
      >
        <div className="space-y-6">
          <div>
            <div className="grid grid-cols-5 gap-2">
              {layoutOptions.map((option) => (
                <StyleTile
                  key={option.id}
                  option={option}
                  isSelected={layout === option.id}
                  onClick={() => updateHeroBannerConfig({ layout: option.id as any })}
                />
              ))}
            </div>
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
        isExpanded={styleExpanded}
        onExpandedChange={setStyleExpanded}
      >
        <div className="space-y-6">
          <div>
            <div className="grid grid-cols-3 gap-2">
              {styleOptions
                .filter(option => layout === 'fill' || option.id !== 'simple')
                .map((option) => (
                  <StyleTile
                    key={option.id}
                    option={option}
                    isSelected={style === option.id}
                    onClick={() => updateHeroBannerConfig({ style: option.id as any })}
                  />
                ))}
            </div>
          </div>

          {/* Color Selector - Show when Color style is selected */}
          {style === 'color' && (
            <div>
              {/* Color Input with Circle Preview */}
              <div className="flex items-center gap-3">
                <label className={cx(
                  "text-sm font-medium",
                  theme === 'dark' ? "text-gray-100" : "text-secondary"
                )}>
                  Background color
                </label>
                
                <div className="ml-auto relative">
                  {/* Color Circle Button */}
                  <label htmlFor="hero-color-input" className="cursor-pointer">
                    <div 
                      className={cx(
                        "w-10 h-10 rounded-full border-2 transition-all shadow-sm hover:scale-110",
                        theme === 'dark' ? "border-gray-600" : "border-gray-300"
                      )}
                      style={{ backgroundColor: backgroundColor }}
                    />
                  </label>
                  
                  {/* Hidden Color Input */}
                  <input
                    id="hero-color-input"
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => updateHeroBannerConfig({ backgroundColor: e.target.value })}
                    className="absolute opacity-0 w-0 h-0"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Image Upload - Show when Image style is selected */}
          {style === 'image' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className={cx(
                  "text-sm font-medium",
                  theme === 'dark' ? "text-gray-100" : "text-secondary"
                )}>
                  Background Image
                </label>
                
                {imageUrl && (
                  <button
                    onClick={() => updateHeroBannerConfig({ imageUrl: '' })}
                    className={cx(
                      "text-xs font-medium transition-colors",
                      theme === 'dark'
                        ? "text-red-400 hover:text-red-300"
                        : "text-red-600 hover:text-red-700"
                    )}
                  >
                    Clear
                  </button>
                )}
              </div>
              
              <FileTrigger
                acceptedFileTypes={['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/svg+xml']}
                onSelect={(files) => {
                  if (files && files.length > 0) {
                    const file = files[0];
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      updateHeroBannerConfig({ imageUrl: e.target?.result as string });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              >
                <div className={cx(
                  "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all",
                  theme === 'dark'
                    ? "border-gray-700 hover:border-gray-600 bg-gray-800/50"
                    : "border-gray-300 hover:border-brand-300 hover:bg-brand-25"
                )}>
                  {imageUrl ? (
                    <div className="space-y-2">
                      <img src={imageUrl} alt="Hero preview" className="w-full h-32 object-cover rounded-lg" />
                      <p className={cx(
                        "text-xs",
                        theme === 'dark' ? "text-gray-400" : "text-gray-600"
                      )}>
                        Click to change image
                      </p>
                    </div>
                  ) : (
                    <>
                      <Upload01 className={cx(
                        "w-8 h-8 mx-auto mb-2",
                        theme === 'dark' ? "text-gray-400" : "text-gray-500"
                      )} />
                      <p className={cx(
                        "text-sm font-medium mb-1",
                        theme === 'dark' ? "text-gray-200" : "text-gray-900"
                      )}>
                        Upload Background
                      </p>
                      <p className={cx(
                        "text-xs",
                        theme === 'dark' ? "text-gray-400" : "text-gray-600"
                      )}>
                        SVG, PNG, JPG or GIF
                      </p>
                    </>
                  )}
                </div>
              </FileTrigger>
            </div>
          )}

          {/* Video Upload - Show when Video style is selected */}
          {style === 'video' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className={cx(
                  "text-sm font-medium",
                  theme === 'dark' ? "text-gray-100" : "text-secondary"
                )}>
                  Background Video
                </label>
                
                {videoUrl && (
                  <button
                    onClick={() => updateHeroBannerConfig({ videoUrl: '' })}
                    className={cx(
                      "text-xs font-medium transition-colors",
                      theme === 'dark'
                        ? "text-red-400 hover:text-red-300"
                        : "text-red-600 hover:text-red-700"
                    )}
                  >
                    Clear
                  </button>
                )}
              </div>
              
              <FileTrigger
                acceptedFileTypes={['video/mp4', 'video/webm', 'video/ogg']}
                onSelect={(files) => {
                  if (files && files.length > 0) {
                    const file = files[0];
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      updateHeroBannerConfig({ videoUrl: e.target?.result as string });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              >
                <div className={cx(
                  "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all",
                  theme === 'dark'
                    ? "border-gray-700 hover:border-gray-600 bg-gray-800/50"
                    : "border-gray-300 hover:border-brand-300 hover:bg-brand-25"
                )}>
                  {videoUrl ? (
                    <div className="space-y-2">
                      <video src={videoUrl} className="w-full h-32 object-cover rounded-lg" controls />
                      <p className={cx(
                        "text-xs",
                        theme === 'dark' ? "text-gray-400" : "text-gray-600"
                      )}>
                        Click to change video
                      </p>
                    </div>
                  ) : (
                    <>
                      <Upload01 className={cx(
                        "w-8 h-8 mx-auto mb-2",
                        theme === 'dark' ? "text-gray-400" : "text-gray-500"
                      )} />
                      <p className={cx(
                        "text-sm font-medium mb-1",
                        theme === 'dark' ? "text-gray-200" : "text-gray-900"
                      )}>
                        Upload Video
                      </p>
                      <p className={cx(
                        "text-xs",
                        theme === 'dark' ? "text-gray-400" : "text-gray-600"
                      )}>
                        MP4, WebM or OGG
                      </p>
                    </>
                  )}
                </div>
              </FileTrigger>
            </div>
          )}
        </div>
      </CustomizerSection>

      {/* Divider */}
      <div className={cx(
        "border-t",
        theme === 'dark' ? "border-gray-700" : "border-secondary"
      )}></div>

      {/* Content Section */}
      <CustomizerSection
        title="Content"
        isExpanded={contentExpanded}
        onExpandedChange={setContentExpanded}
      >
        <div className="space-y-4">
          <Input
            label="Title"
            value={title}
            onChange={(value) => updateHeroBannerConfig({ title: value })}
            placeholder="Enter hero title"
          />
          
          <TextArea
            label="Description"
            value={description}
            onChange={(e) => updateHeroBannerConfig({ description: e.target.value })}
            placeholder="Enter hero description"
            rows={3}
          />

          {/* Alignment */}
          <div>
            <label className={cx(
              "text-sm font-medium mb-2 block",
              theme === 'dark' ? "text-gray-100" : "text-secondary"
            )}>
              Alignment
            </label>
            <div className="grid grid-cols-3 gap-2">
              {alignmentOptions.map((option) => (
                <StyleTile
                  key={option.id}
                  option={option}
                  isSelected={alignment === option.id}
                  onClick={() => updateHeroBannerConfig({ alignment: option.id as any })}
                />
              ))}
            </div>
          </div>
        </div>
      </CustomizerSection>

      {/* Divider */}
      <div className={cx(
        "border-t",
        theme === 'dark' ? "border-gray-700" : "border-secondary"
      )}></div>

      {/* Call to Action Section */}
      <CustomizerSection
        title="Call to Action"
        isExpanded={ctaExpanded}
        onExpandedChange={setCtaExpanded}
      >
        <div className="space-y-2">
          <PropertyToggle
            icon={Zap}
            label="Show CTA Button"
            isSelected={showCTA}
            onChange={(value) => updateHeroBannerConfig({ showCTA: value })}
            id="show-cta"
          />
          
          {showCTA && (
            <>
              <div className="pt-2">
                <Input
                  label="Button Text"
                  value={ctaText}
                  onChange={(value) => updateHeroBannerConfig({ ctaText: value })}
                  placeholder="Enter button text"
                />
              </div>
              
              <div className="pt-2">
                <Input
                  label="Button URL"
                  value={ctaUrl}
                  onChange={(value) => updateHeroBannerConfig({ ctaUrl: value })}
                  placeholder="Enter button URL"
                />
              </div>
            </>
          )}
        </div>
      </CustomizerSection>
    </div>
  );
};

const PropertyToggle = ({ icon: Icon, label, isSelected, onChange, id }: {
  icon: React.ComponentType<any>;
  label: string;
  isSelected: boolean;
  onChange: (value: boolean) => void;
  id: string;
}) => {
  const theme = useResolvedTheme();
  
  return (
    <div className={cx(
      "flex items-center py-2 px-2 border rounded-md transition-all duration-300 ease-in-out",
      theme === 'dark' 
        ? "border-gray-700 bg-gray-800/50 hover:bg-gray-800/80 hover:border-gray-600"
        : "border-gray-200 bg-white/50 hover:bg-white/80 hover:border-gray-300"
    )}>
      <div className="flex items-center space-x-2">
        <Icon className={cx(
          "h-4 w-4",
          theme === 'dark' ? "text-gray-400" : "text-gray-500"
        )} />
        <span className={cx(
          "text-sm font-medium",
          theme === 'dark' ? "text-gray-100" : "text-gray-900"
        )}>{label}</span>
      </div>
      <div className="ml-auto">
        <Toggle
          id={id}
          isSelected={isSelected}
          onChange={onChange}
          size="sm"
          slim
        />
      </div>
    </div>
  );
};
