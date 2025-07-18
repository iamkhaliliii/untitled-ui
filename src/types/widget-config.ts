export interface EventsListConfig {
  style: 'card' | 'list' | 'feed';
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
  openPageIn: 'post' | 'modal';
  title: string;
  description: string;
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
  hostInfo: false,
  reactionsCounter: true,
  rsvpAction: false,
  eventDetails: true,
  coverImage: true,
  openPageIn: 'post',
  title: '',
  description: ''
}; 