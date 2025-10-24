import React from "react";
import { cx } from "@/utils/cx";
import { ExplorePreview } from "./space-previews/explore-preview";
import { GuidelinesPreview } from "./space-previews/guidelines-preview";
import { ChangelogsPreview } from "./space-previews/changelogs-preview";
import { JobsPreview } from "./space-previews/jobs-preview";
import { WishlistPreview } from "./space-previews/wishlist-preview";
import { PodcastPreview } from "./space-previews/podcast-preview";
import { BlankPreview } from "./space-previews/blank-preview";
import { DiscussionsPreview } from "./space-previews/discussions-preview";
import { QuestionsPreview } from "./space-previews/questions-preview";
import { ArticlesPreview } from "./space-previews/articles-preview";
import { EventsPreview } from "./space-previews/events-preview";

interface SpacePreviewsProps {
  previewType: string | null;
  theme: 'light' | 'dark';
}

export const SpacePreviews: React.FC<SpacePreviewsProps> = ({ previewType, theme }) => {
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
      
    case 'discussions':
      return <DiscussionsPreview theme={theme} />;
      
    case 'questions':
      return <QuestionsPreview theme={theme} />;
      
    case 'articles':
      return <ArticlesPreview theme={theme} />;
      
    case 'events':
      return <EventsPreview theme={theme} />;
      
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
