import React from 'react';
import { HelpCircle, User01, MessageCircle01, ArrowUp, Eye } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { useResolvedTheme } from "@/hooks/use-resolved-theme";
import { useWidgetConfig } from "@/providers/widget-config-provider";
import { Badge } from '@/components/base/badges/badges';

interface QuestionsListWidgetProps {
  className?: string;
  theme?: 'light' | 'dark';
}

export const QuestionsListWidget: React.FC<QuestionsListWidgetProps> = ({ className, theme: propTheme }) => {
  const { questionsListConfig } = useWidgetConfig();
  const theme = useResolvedTheme(propTheme);

  const mockQuestions = [
    {
      id: 1,
      title: "How to optimize React component re-renders?",
      author: "Chris Anderson",
      avatar: "https://i.pravatar.cc/150?img=10",
      votes: 45,
      answers: 8,
      views: 523,
      tags: ["React", "Performance"],
      isAnswered: true,
      timestamp: "3 hours ago"
    },
    {
      id: 2,
      title: "What's the difference between useMemo and useCallback?",
      author: "Rachel Green",
      avatar: "https://i.pravatar.cc/150?img=11",
      votes: 32,
      answers: 5,
      views: 412,
      tags: ["React", "Hooks"],
      isAnswered: true,
      timestamp: "6 hours ago"
    },
    {
      id: 3,
      title: "How to implement server-side pagination?",
      author: "Tom Wilson",
      avatar: "https://i.pravatar.cc/150?img=12",
      votes: 28,
      answers: 3,
      views: 298,
      tags: ["Backend", "API"],
      isAnswered: false,
      timestamp: "1 day ago"
    }
  ];

  const renderCard = (question: any) => (
    <div
      key={question.id}
      className={cx(
        "group rounded-xl border p-4 cursor-pointer transition-all duration-200",
        theme === 'dark'
          ? "bg-gray-800 border-gray-700 hover:border-teal-500/50 hover:shadow-lg"
          : "bg-white border-gray-200 hover:border-teal-300 hover:shadow-md"
      )}
    >
      <div className="flex items-start gap-3">
        {/* Vote Section */}
        <div className="flex flex-col items-center gap-2">
          {questionsListConfig.votesCounter && (
            <button className={cx(
              "flex flex-col items-center gap-1 px-2 py-1.5 rounded-lg border transition-all",
              theme === 'dark'
                ? "border-gray-700 bg-gray-900/50 hover:bg-gray-700 hover:border-teal-500"
                : "border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-teal-400"
            )}>
              <ArrowUp className={cx(
                "w-5 h-5",
                theme === 'dark' ? "text-gray-400" : "text-gray-600"
              )} />
              <span className={cx(
                "text-xs font-semibold",
                theme === 'dark' ? "text-gray-300" : "text-gray-700"
              )}>
                {question.votes}
              </span>
            </button>
          )}

          {/* Answers Count */}
          {questionsListConfig.answersCounter && (
            <div className={cx(
              "flex flex-col items-center px-2 py-1 rounded-lg",
              question.isAnswered 
                ? theme === 'dark' ? "bg-green-500/20" : "bg-green-50"
                : theme === 'dark' ? "bg-gray-700/50" : "bg-gray-100"
            )}>
              <span className={cx(
                "text-xs font-semibold",
                question.isAnswered
                  ? theme === 'dark' ? "text-green-400" : "text-green-600"
                  : theme === 'dark' ? "text-gray-400" : "text-gray-600"
              )}>
                {question.answers}
              </span>
              <span className={cx(
                "text-[10px]",
                question.isAnswered
                  ? theme === 'dark' ? "text-green-400" : "text-green-600"
                  : theme === 'dark' ? "text-gray-500" : "text-gray-500"
              )}>
                {question.isAnswered ? '✓' : 'ans'}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3 className={cx(
            "font-semibold text-base mb-2 group-hover:text-teal-600 transition-colors line-clamp-2",
            theme === 'dark' ? "text-gray-100" : "text-gray-900"
          )}>
            {question.title}
          </h3>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {question.tags.map((tag: string) => (
              <Badge key={tag} color="gray" type="modern" size="sm">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-tertiary">
            {questionsListConfig.authorInfo && (
              <div className="flex items-center gap-1">
                <img
                  src={question.avatar}
                  alt={question.author}
                  className="w-5 h-5 rounded-full"
                />
                <span>{question.author}</span>
              </div>
            )}
            {questionsListConfig.viewsCounter && (
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{question.views} views</span>
              </div>
            )}
            <span>{question.timestamp}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={cx("space-y-4", className)}>
      <div className={cx(
        questionsListConfig.style === 'card' && "grid gap-4",
        questionsListConfig.style === 'card' && questionsListConfig.cardSize === 'small' && "grid-cols-4",
        questionsListConfig.style === 'card' && questionsListConfig.cardSize === 'medium' && "grid-cols-3",
        questionsListConfig.style === 'card' && questionsListConfig.cardSize === 'large' && "grid-cols-2",
        questionsListConfig.style === 'card' && questionsListConfig.cardSize === 'extralarge' && "grid-cols-1",
        questionsListConfig.style === 'list' && "space-y-3",
        questionsListConfig.style === 'feed' && "space-y-4"
      )}>
        {mockQuestions.map(question => renderCard(question))}
      </div>
    </div>
  );
};

