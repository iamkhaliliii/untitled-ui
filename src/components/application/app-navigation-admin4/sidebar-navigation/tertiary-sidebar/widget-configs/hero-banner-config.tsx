import { useState } from 'react';
import { useWidgetConfig } from '@/providers/widget-config-provider';
import { CustomizerSection } from '../customizer-section';
import { Input } from '@/components/base/input/input';
import { TextArea } from '@/components/base/textarea/textarea';
import { Toggle } from '@/components/base/toggle/toggle';

export const HeroBannerConfig = () => {
  const { updateSpaceHeaderConfig } = useWidgetConfig();
  
  const [config, setConfig] = useState({
    title: 'Welcome to Our Community',
    description: 'Join us for discussions, events, and more',
    showCTA: true,
    ctaText: 'Get Started',
    showImage: true,
  });

  const handleChange = (field: string, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6 p-4">
      <CustomizerSection title="Content" defaultExpanded={true}>
        <div className="space-y-4">
          <Input
            label="Title"
            value={config.title}
            onChange={(value) => handleChange('title', value)}
            placeholder="Enter hero title"
          />
          
          <TextArea
            label="Description"
            value={config.description}
            onChange={(value) => handleChange('description', value)}
            placeholder="Enter hero description"
            rows={3}
          />
        </div>
      </CustomizerSection>

      <CustomizerSection title="Call to Action" defaultExpanded={true}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-secondary">Show CTA Button</label>
            <Toggle
              id="show-cta"
              isSelected={config.showCTA}
              onChange={(value) => handleChange('showCTA', value)}
              size="sm"
            />
          </div>
          
          {config.showCTA && (
            <Input
              label="Button Text"
              value={config.ctaText}
              onChange={(value) => handleChange('ctaText', value)}
              placeholder="Enter button text"
            />
          )}
        </div>
      </CustomizerSection>

      <CustomizerSection title="Media" defaultExpanded={true}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-secondary">Show Background Image</label>
            <Toggle
              id="show-image"
              isSelected={config.showImage}
              onChange={(value) => handleChange('showImage', value)}
              size="sm"
            />
          </div>
        </div>
      </CustomizerSection>
    </div>
  );
};

