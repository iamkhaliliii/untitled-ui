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