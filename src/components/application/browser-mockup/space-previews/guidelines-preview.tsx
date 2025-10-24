import React from "react";
import { File01 } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { renderSpaceHeader } from "./space-header-helper";

export const GuidelinesPreview: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
  return (
    <div>
      {renderSpaceHeader(
        'Community Guidelines',
        'Rules to keep our community safe and welcoming',
        <File01 className="w-7 h-7 text-white" />,
        'bg-amber-600',
        theme
      )}
      <div className="space-y-4">
      {['Be respectful and kind to everyone', 'No spam or self-promotion without permission', 'Keep discussions relevant and on topic', 'Report inappropriate content immediately', 'Respect privacy and confidentiality', 'Give credit where credit is due'].map((guideline, i) => (
        <div 
          key={i} 
          className={cx(
            "w-full rounded-xl shadow-sm p-5 transition-all duration-200 cursor-pointer",
            theme === 'dark' 
              ? "bg-zinc-900 border border-zinc-800 hover:shadow-md hover:border-amber-500/50" 
              : "bg-white border border-zinc-200 hover:shadow-md hover:border-amber-300"
          )}
          style={{ 
            animation: `fadeInUp 0.4s ease-out ${(i + 1) * 0.1}s both`
          }}
        >
          <div className="flex items-start gap-4">
            <div className={cx(
              "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold",
              theme === 'dark' ? "bg-amber-900/50 text-amber-300" : "bg-amber-100 text-amber-700"
            )}>
              {i + 1}
            </div>
            <div className="flex-1">
              <h4 className={cx("text-base font-semibold mb-2", theme === 'dark' ? "text-gray-200" : "text-gray-900")}>
                {guideline}
              </h4>
              <p className={cx("text-sm", theme === 'dark' ? "text-gray-400" : "text-gray-600")}>
                {i === 0 ? 'Treat all members with respect and kindness, regardless of their background or experience level.'
                 : i === 1 ? 'Self-promotion is allowed only in designated threads. Always provide value to the community first.'
                 : i === 2 ? 'Stay focused on the purpose of each space. Off-topic discussions should be moved to appropriate channels.'
                 : i === 3 ? 'Help us maintain a safe environment by reporting violations promptly to moderators.'
                 : i === 4 ? 'Never share personal information about others without their explicit consent.'
                 : 'Always acknowledge and credit original creators when sharing their work or ideas.'}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

