import React from "react";
import { ExplorePreview } from "./explore-preview";
import { GuidelinesPreview } from "./guidelines-preview";
import { ChangelogsPreview } from "./changelogs-preview";
import { JobsPreview } from "./jobs-preview";
import { WishlistPreview } from "./wishlist-preview";
import { PodcastPreview } from "./podcast-preview";
import { BlankPreview } from "./blank-preview";
import { cx } from "@/utils/cx";

interface SpacePreviewsProps {
  previewType: string | null;
  theme: 'light' | 'dark';
}

export const SpacePreviewsIndex: React.FC<SpacePreviewsProps> = ({ previewType, theme }) => {
  if (!previewType) {
    return (
      <div className={cx(
        "rounded-lg border p-12 text-center",
        theme === 'dark' ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      )}>
        <h3 className={cx(
          "text-lg font-semibold mb-2",
          theme === 'dark' ? "text-gray-200" : "text-gray-900"
        )}>
          Preview Your Space
        </h3>
        <p className={cx(
          "text-sm",
          theme === 'dark' ? "text-gray-400" : "text-gray-600"
        )}>
          Hover over a space type to see a preview
        </p>
      </div>
    );
  }

  switch (previewType.toLowerCase()) {
    case 'explore':
      return <ExplorePreview theme={theme} />;
      
    case 'guidelines':
      return <GuidelinesPreview theme={theme} />;

    case 'changelogs':
      return <ChangelogsPreview theme={theme} />;

    case 'jobs':
      return <JobsPreview theme={theme} />;

    case 'wishlist':
      return <WishlistPreview theme={theme} />;

    case 'podcast':
      return <PodcastPreview theme={theme} />;

    case 'blank':
      return <BlankPreview theme={theme} />;

    case 'discussions':
    case 'questions':
    case 'articles':
    case 'events':
      // These are still in space-previews.tsx temporarily
      return (
        <div className={cx(
          "rounded-lg border p-12 text-center",
          theme === 'dark' ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        )}>
          <h3 className={cx(
            "text-lg font-semibold mb-2",
            theme === 'dark' ? "text-gray-200" : "text-gray-900"
          )}>
            {previewType} Preview
          </h3>
          <p className={cx(
            "text-sm",
            theme === 'dark' ? "text-gray-400" : "text-gray-600"
          )}>
            Use the main space-previews.tsx for {previewType.toLowerCase()}
          </p>
        </div>
      );

    default:
      return (
        <div className={cx(
          "rounded-lg border p-12 text-center",
          theme === 'dark' ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        )}>
          <h3 className={cx(
            "text-lg font-semibold mb-2",
            theme === 'dark' ? "text-gray-200" : "text-gray-900"
          )}>
            {previewType} Space
          </h3>
          <p className={cx(
            "text-sm",
            theme === 'dark' ? "text-gray-400" : "text-gray-600"
          )}>
            Preview content for {previewType.toLowerCase()} space
          </p>
        </div>
      );
  }
};

