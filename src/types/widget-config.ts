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

export const defaultEventsListConfig: EventsListConfig = {
  style: 'card',
  cardSize: 'large',
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