import React from 'react';
import { BookOpen01, User01, Heart, Eye, Clock } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { useResolvedTheme } from "@/hooks/use-resolved-theme";
import { useWidgetConfig } from "@/providers/widget-config-provider";
import { Badge } from '@/components/base/badges/badges';

interface KnowledgesListWidgetProps {
  className?: string;
  theme?: 'light' | 'dark';
}

export const KnowledgesListWidget: React.FC<KnowledgesListWidgetProps> = ({ className, theme: propTheme }) => {
  const { knowledgesListConfig } = useWidgetConfig();
  const theme = useResolvedTheme(propTheme);

  const mockArticles = [
    {
      id: 1,
      title: "Getting Started with React Hooks",
      excerpt: "A comprehensive guide to understanding and using React Hooks in your applications.",
      author: "Alex Thompson",
      avatar: "https://i.pravatar.cc/150?img=4",
      coverImage: "https://picsum.photos/400/250?random=1",
      views: 1234,
      likes: 89,
      readTime: "8 min read",
      category: "Tutorial"
    },
    {
      id: 2,
      title: "TypeScript Best Practices",
      excerpt: "Learn the best practices for writing clean and maintainable TypeScript code.",
      author: "Maria Garcia",
      avatar: "https://i.pravatar.cc/150?img=5",
      coverImage: "https://picsum.photos/400/250?random=2",
      views: 876,
      likes: 67,
      readTime: "12 min read",
      category: "Guide"
    },
    {
      id: 3,
      title: "CSS Grid Layout Mastery",
      excerpt: "Master CSS Grid and create complex layouts with ease.",
      author: "John Smith",
      avatar: "https://i.pravatar.cc/150?img=6",
      coverImage: "https://picsum.photos/400/250?random=3",
      views: 654,
      likes: 45,
      readTime: "10 min read",
      category: "Tutorial"
    }
  ];

  const renderCard = (article: any) => (
    <div
      key={article.id}
      className={cx(
        "group rounded-xl border overflow-hidden cursor-pointer transition-all duration-200",
        theme === 'dark'
          ? "bg-gray-800 border-gray-700 hover:border-blue-500/50 hover:shadow-lg"
          : "bg-white border-gray-200 hover:border-brand-300 hover:shadow-md"
      )}
    >
      {/* Cover Image */}
      {knowledgesListConfig.coverImage && (
        <div className="relative aspect-video overflow-hidden">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <Badge color="brand" type="pill-color" size="sm">
              {article.category}
            </Badge>
          </div>
        </div>
      )}

      <div className="p-4">
        {/* Title */}
        <h3 className={cx(
          "font-semibold text-base mb-2 group-hover:text-brand-600 transition-colors line-clamp-2",
          theme === 'dark' ? "text-gray-100" : "text-gray-900"
        )}>
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className={cx(
          "text-sm mb-3 line-clamp-2",
          theme === 'dark' ? "text-gray-400" : "text-gray-600"
        )}>
          {article.excerpt}
        </p>

        {/* Author Info */}
        {knowledgesListConfig.authorInfo && (
          <div className="flex items-center gap-2 mb-3">
            <img
              src={article.avatar}
              alt={article.author}
              className="w-6 h-6 rounded-full"
            />
            <span className={cx(
              "text-sm",
              theme === 'dark' ? "text-gray-300" : "text-gray-700"
            )}>
              {article.author}
            </span>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-tertiary">
          {knowledgesListConfig.readTime && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{article.readTime}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{article.views}</span>
          </div>
          {knowledgesListConfig.reactionsCounter && (
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span>{article.likes}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className={cx("space-y-4", className)}>
      <div className={cx(
        knowledgesListConfig.style === 'card' && "grid gap-4",
        knowledgesListConfig.style === 'card' && knowledgesListConfig.cardSize === 'small' && "grid-cols-4",
        knowledgesListConfig.style === 'card' && knowledgesListConfig.cardSize === 'medium' && "grid-cols-3",
        knowledgesListConfig.style === 'card' && knowledgesListConfig.cardSize === 'large' && "grid-cols-2",
        knowledgesListConfig.style === 'card' && knowledgesListConfig.cardSize === 'extralarge' && "grid-cols-1",
        knowledgesListConfig.style === 'list' && "space-y-3",
        knowledgesListConfig.style === 'feed' && "space-y-4"
      )}>
        {mockArticles.map(article => renderCard(article))}
      </div>
    </div>
  );
};

