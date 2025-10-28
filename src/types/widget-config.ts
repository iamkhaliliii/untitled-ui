export interface EventsListConfig {
  style: 'card' | 'list' | 'feed' | 'carousel';
  cardSize: 'small' | 'medium' | 'large' | 'extralarge';
  cardStyle: 'modern' | 'simple';
  groupView: boolean;
  groupBy: 'date' | 'location' | 'type' | 'author' | 'host' | 'category' | 'status';
  tabView: boolean;
  allEventsTab: boolean;
  upcomingEventsTab: boolean;
  pastEventsTab: boolean;
  thisMonthEventsTab: boolean;
  hostInfo: boolean;
  reactionsCounter: boolean;
  rsvpAction: boolean;
  eventDetails: boolean;
  coverImage: boolean;
  attended: boolean;
  title: string;
  description: string;
  eventSource: 'all_spaces' | 'current_space' | 'specific_spaces' | 'specific_events';
  selectedSpaces: string[];
  selectedEvents: string[];
}

export interface SpaceHeaderConfig {
  style: 'simple' | 'color' | 'image' | 'video' | 'pattern' | 'gradient';
  description: string;
  showDescription: boolean;
  showIcon: boolean;
  showStats: boolean;
  showMembers: boolean;
  actionAddPost: boolean;
  showActions: boolean;
}

export interface AnnouncementBannerConfig {
  title: string;
  description: string;
  url: string;
  style: 'primary' | 'natural' | 'warning' | 'error' | 'info';
  showIcon: boolean;
  showCloseButton: boolean;
}

export interface ComposerConfig {
  placeholder: string;
  showImageUpload: boolean;
  showAttachments: boolean;
  showEmoji: boolean;
  buttonText: string;
}

export interface LeaderboardConfig {
  title: string;
  source: 'all_spaces' | 'current_space' | 'event' | 'blog';
  numberOfMembers: number;
  defaultTab: 'all_time' | 'month' | 'week';
  showScore: boolean;
  excludeAdminsModerators: boolean;
}

export interface HtmlScriptConfig {
  codeInput: string;
  cardStyle: 'card' | 'no_padding' | 'none';
}

export interface RichTextConfig {
  content: string;
  cardStyle: 'card' | 'no_padding' | 'none';
}

export interface DiscussionsListConfig {
  style: 'card' | 'list' | 'feed';
  cardSize: 'small' | 'medium' | 'large' | 'extralarge';
  cardStyle: 'modern' | 'simple';
  tabView: boolean;
  allTab: boolean;
  trendingTab: boolean;
  recentTab: boolean;
  // Card properties
  authorInfo: boolean;
  reactionsCounter: boolean;
  repliesCounter: boolean;
  coverImage: boolean;
  // List properties
  memberAvatar: boolean;
  postSummary: boolean;
  reactionAndReply: boolean;
  tags: boolean;
  // Feed properties
  postContent: boolean;
  comments: boolean;
  title: string;
  description: string;
}

export interface KnowledgesListConfig {
  style: 'card' | 'list' | 'feed';
  cardSize: 'small' | 'medium' | 'large' | 'extralarge';
  cardStyle: 'modern' | 'simple';
  authorInfo: boolean;
  reactionsCounter: boolean;
  coverImage: boolean;
  readTime: boolean;
  title: string;
  description: string;
}

export interface WishlistsListConfig {
  style: 'card' | 'list' | 'feed';
  cardSize: 'small' | 'medium' | 'large' | 'extralarge';
  cardStyle: 'modern' | 'simple';
  creatorInfo: boolean;
  votesCounter: boolean;
  commentsCounter: boolean;
  statusBadge: boolean;
  title: string;
  description: string;
}

export interface QuestionsListConfig {
  style: 'card' | 'list' | 'feed';
  cardSize: 'small' | 'medium' | 'large' | 'extralarge';
  cardStyle: 'modern' | 'simple';
  authorInfo: boolean;
  answersCounter: boolean;
  votesCounter: boolean;
  viewsCounter: boolean;
  title: string;
  description: string;
}

export const defaultEventsListConfig: EventsListConfig = {
  style: 'card',
  cardSize: 'medium',
  cardStyle: 'simple',
  groupView: false,
  groupBy: 'date',
  tabView: false,
  allEventsTab: true,
  upcomingEventsTab: false,
  pastEventsTab: false,
  thisMonthEventsTab: false,
  hostInfo: true,
  reactionsCounter: true,
  rsvpAction: true,
  eventDetails: true,
  coverImage: true,
  attended: true,
  title: 'Events List Widget',
  description: 'Display a list of upcoming and past events with customizable layout and features.',
  eventSource: 'current_space',
  selectedSpaces: [],
  selectedEvents: []
};

export const defaultSpaceHeaderConfig: SpaceHeaderConfig = {
  style: 'video',
  description: 'Welcome to the "Ask the Community" channel!',
  showDescription: false,
  showIcon: true,
  showStats: true,
  showMembers: true,
  actionAddPost: true,
  showActions: true,
};

export const defaultAnnouncementBannerConfig: AnnouncementBannerConfig = {
  title: 'Important Announcement',
  description: 'We\'re excited to announce new features coming to our platform. Stay tuned for updates and improvements.',
  url: '#',
  style: 'primary',
  showIcon: true,
  showCloseButton: true,
};

export const defaultComposerConfig: ComposerConfig = {
  placeholder: "What's on your mind?",
  showImageUpload: true,
  showAttachments: true,
  showEmoji: true,
  buttonText: 'Post',
};

export const defaultLeaderboardConfig: LeaderboardConfig = {
  title: 'Top Contributors',
  source: 'current_space',
  numberOfMembers: 5,
  defaultTab: 'all_time',
  showScore: true,
  excludeAdminsModerators: false,
};

export const defaultHtmlScriptConfig: HtmlScriptConfig = {
  codeInput: '<div class="custom-widget">\n  <h3>Custom HTML Content</h3>\n  <p>Add your custom HTML, CSS, and JavaScript here.</p>\n</div>',
  cardStyle: 'card',
};

export const defaultRichTextConfig: RichTextConfig = {
  content: '# Welcome to Our Community! 🎉\n\nWe\'re thrilled to have you join our vibrant community of creators, innovators, and collaborators.\n\n## Getting Started:\n- Complete your profile\n- Join relevant spaces\n- Share your first post\n\n> "Great communities are built by great members."',
  cardStyle: 'card',
};

export const defaultDiscussionsListConfig: DiscussionsListConfig = {
  style: 'card',
  cardSize: 'medium',
  cardStyle: 'simple',
  tabView: true,
  allTab: true,
  trendingTab: true,
  recentTab: false,
  // Card properties
  authorInfo: true,
  reactionsCounter: true,
  repliesCounter: true,
  coverImage: false,
  // List properties
  memberAvatar: true,
  postSummary: true,
  reactionAndReply: true,
  tags: true,
  // Feed properties
  postContent: true,
  comments: true,
  title: 'Discussions',
  description: 'Browse and join community discussions',
};

export const defaultKnowledgesListConfig: KnowledgesListConfig = {
  style: 'card',
  cardSize: 'medium',
  cardStyle: 'simple',
  authorInfo: true,
  reactionsCounter: true,
  coverImage: true,
  readTime: true,
  title: 'Knowledge Base',
  description: 'Explore articles and guides',
};

export const defaultWishlistsListConfig: WishlistsListConfig = {
  style: 'card',
  cardSize: 'medium',
  cardStyle: 'simple',
  creatorInfo: true,
  votesCounter: true,
  commentsCounter: true,
  statusBadge: true,
  title: 'Feature Requests',
  description: 'Vote on upcoming features',
};

export const defaultQuestionsListConfig: QuestionsListConfig = {
  style: 'card',
  cardSize: 'medium',
  cardStyle: 'simple',
  authorInfo: true,
  answersCounter: true,
  votesCounter: true,
  viewsCounter: true,
  title: 'Q&A',
  description: 'Ask and answer questions',
}; 