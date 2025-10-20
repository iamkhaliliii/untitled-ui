import React, { useState } from "react";
import { SearchLg, Plus, ImageX, Calendar, Clock, Users01, X, VideoRecorder, Repeat01, Repeat03, Repeat04, Repeat02, Check, Recording03 } from "@untitledui/icons";
import { MarkerPin01 } from "@untitledui/icons";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button";
import { Badge, BadgeWithIcon, BadgeWithImage } from "@/components/base/badges/badges";
import { SiteLayout } from "@/components/layouts/site-layout";
import { EventDetailsModal } from "@/components/application/modals/event-details-modal";
import { useNavigate } from "react-router";

// RSVP States for Event Cards
type RSVPState = 'open' | 'closed' | 'completed';

interface RSVPStateConfig {
    label: string;
    color: 'primary' | 'secondary' | 'tertiary';
    disabled: boolean;
    description?: string;
}

const rsvpStateConfig: Record<RSVPState, RSVPStateConfig> = {
    open: {
        label: 'RSVP Now',
        color: 'primary',
        disabled: false,
        description: 'Registration is open'
    },
    closed: {
        label: 'RSVP Closed',
        color: 'secondary',
        disabled: true,
        description: 'Registration has closed'
    },
    completed: {
        label: 'Event Completed',
        color: 'tertiary',
        disabled: true,
        description: 'This event has finished'
    }
};

// Function to randomly assign RSVP state to events
const getRandomRSVPState = (eventId: number): RSVPState => {
    const states: RSVPState[] = ['open', 'closed', 'completed'];
    // Use event ID as seed for consistent random state per event
    const index = eventId % states.length;
    return states[index];
};

// Enhanced Event Card Component
const EventCard = ({ event, onClick, rsvpStatus }: { event: any; onClick: () => void; rsvpStatus?: 'confirmed' | 'cancelled' | null }) => {
    const [imageError, setImageError] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const rsvpState = getRandomRSVPState(event.id);
    const rsvpConfig = rsvpStateConfig[rsvpState];
    
    // Override button display based on user's RSVP status
    const getButtonDisplay = () => {
        if (rsvpStatus === 'confirmed') {
            return { label: 'Registered', disabled: false, icon: Check, color: 'secondary' as const };
        } else if (rsvpStatus === 'cancelled') {
            return { label: 'RSVP Now →', disabled: false, icon: null, color: 'secondary' as const };
        }
        // Add arrow to RSVP Now in default state
        const label = rsvpConfig.label === 'RSVP Now' ? 'RSVP Now →' : rsvpConfig.label;
        const disabled = rsvpState !== 'open'; // Disable if not open
        return { label, disabled, icon: null, color: 'secondary' as const };
    };
    
    const buttonDisplay = getButtonDisplay();

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <div 
            className="group relative rounded-2xl border border-gray-300 bg-primary overflow-hidden flex flex-col h-full cursor-pointer transition-all duration-200 hover:shadow-md hover:shadow-gray-100/10 hover:border-brand-200"
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
                    
            {/* Event Image */}
            <div className="relative overflow-hidden aspect-square">
                {imageError ? (
                    <div className="w-full h-full bg-gradient-to-br from-secondary to-secondary/70 flex items-center justify-center">
                        <div className="text-center">
                            <ImageX className="h-8 w-8 text-tertiary mx-auto mb-2" />
                            <p className="text-xs text-tertiary">Image unavailable</p>
                        </div>
                    </div>
                ) : (
                    <img
                        src={event.image}
                        alt={event.title}
                        className={`w-full h-full object-cover transition-all duration-500 ${
                            isHovered ? 'scale-102' : 'scale-100'
                        }`}
                        onError={handleImageError}
                        loading="lazy"
                    />
                )}
                
                {/* Overlay badges */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
                
                
                <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                {event.status === 'live' && (
                        <Badge  
                            color="error" 
                            type="pill-color"
                            size="md"
                        >
                            <span className="flex items-center gap-1.5">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error-600 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-error-600"></span>
                                </span>
                                Live Now
                            </span>
                        </Badge>
                    )}
                {event.isRecurring && (
                        <BadgeWithIcon  
                            color="brand" 
                            type="pill-color"
                            size="md"
                            iconLeading={Repeat02}
                        >
                            Recurring Event
                        </BadgeWithIcon>
                    )}
                </div>


            </div>

            {/* Event Content */}
            <div className="p-3 flex flex-col flex-1">
                {/* Organizer */}
                <div className="mb-2">
                    <BadgeWithImage
                        imgSrc={event.organizer.avatar}
                        size="sm"
                        color="gray"
                    >
                        {event.organizer.name}
                    </BadgeWithImage>
                </div>

                <h3 className="text-xl font-bold text-primary mb-3 line-clamp-2 group-hover:text-brand-solid transition-colors duration-200">
                    {event.title}
                </h3>

                {/* Event Details */}
                <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 text-sm text-secondary group-hover:text-primary transition-colors">
                        <Calendar className="h-3.5 w-3.5 text-brand-solid" />
                        <span className="font-medium">{event.date}</span>
                        {event.isRecurring && (
                            <span className="text-xs text-gray-500">+ 5 more sessions</span>
                        )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-secondary group-hover:text-primary transition-colors">
                        <Clock className="h-3.5 w-3.5 text-success-solid" />
                        <span>{event.time}</span>
                    </div>
                    
                    {/* Recurring Event Info */}
                    {event.isRecurring && (
                        <div className="flex items-center gap-2 text-sm text-secondary group-hover:text-primary transition-colors">
                            <Repeat03 className="h-3.5 w-3.5 text-brand-solid" />
                            <span className="text-brand-solid font-medium">Repeats {event.recurringFrequency}</span>
                        </div>
                    )}
                    
                    {/* Location Display Logic */}
                    {event.locationType === 'physical' && (
                        <div className="flex items-center gap-2 text-sm text-secondary group-hover:text-primary transition-colors">
                            <MarkerPin01 className="h-3.5 w-3.5 text-warning-solid" />
                            <span>{event.location}</span>
                        </div>
                    )}
                    
                    {event.locationType === 'virtual' && (
                        <div className="flex items-center gap-2 text-sm text-secondary group-hover:text-primary transition-colors">
                            <VideoRecorder className="h-3.5 w-3.5 text-warning-solid" />
                            <span>Virtual</span>
                        </div>
                    )}
                    
                    {event.locationType === 'hybrid' && (
                        <div className="flex items-center gap-2 text-sm text-secondary group-hover:text-primary transition-colors">
                            <MarkerPin01 className="h-3.5 w-3.5 text-warning-solid" />
                            <span className="flex items-center gap-1">
                                {event.location} + <VideoRecorder className="h-3.5 w-3.5 text-warning-solid" /> Virtual
                            </span>
                        </div>
                    )}
                </div>

                {/* Actions Footer */}
                <div className="pt-3 mt-2 border-t border-secondary/30 group-hover:border-gray-200 transition-colors">
                    <div className="flex items-center justify-end">
                        <Button
                            color={buttonDisplay.color}
                            size="sm"
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}
                            className={`px-4 py-2 ${buttonDisplay.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={buttonDisplay.disabled}
                            iconLeading={buttonDisplay.icon}
                        >
                            {buttonDisplay.label}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function SiteEventPage() {
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [eventRSVPStatus, setEventRSVPStatus] = useState<Record<number, 'confirmed' | 'cancelled' | null>>({});
    const [activeTab, setActiveTab] = useState<'all' | 'live' | 'upcoming' | 'past'>('all');

    const handleEventClick = (event: any) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
    };

    const handleRSVPStatusChange = (eventId: number, status: 'confirmed' | 'cancelled' | null) => {
        setEventRSVPStatus(prev => ({ ...prev, [eventId]: status }));
    };

    // Mock events data with status
    const allEvents = [
        {
            id: 1,
            title: "React Conference 2024",
            description: "Join us for the biggest React conference of the year. Learn from industry experts and network with fellow developers.",
            image: "https://picsum.photos/400/200?random=1",
            date: "March 15, 2024",
            time: "9:00 AM - 6:00 PM",
            location: "Moscone Center",
            fullAddress: "747 Howard Street, San Francisco, CA 94103",
            attendees: 150,
            maxAttendees: 200,
            locationType: "physical",
            type: "in-person",
            category: "Technology",
            status: "upcoming",
            coordinates: {
                latitude: 37.7849,
                longitude: -122.4013
            },
            organizer: {
                name: "Sarah Johnson",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616c9ad0096?w=32&h=32&fit=crop&crop=face"
            }
        },
        {
            id: 2,
            title: "Design Thinking Workshop - Live Session",
            description: "Hands-on workshop to master design thinking methodology. Perfect for designers and product managers.",
            image: "https://picsum.photos/400/200?random=2",
            date: "Today",
            time: "2:00 PM - 5:00 PM (Happening Now)",
            location: "Online",
            virtualUrls: ["https://zoom.us/j/123456789"],
            attendees: 89,
            maxAttendees: 100,
            locationType: "virtual",
            type: "online",
            category: "Design",
            status: "live",
            organizer: {
                name: "Mike Chen",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
            }
        },
        {
            id: 3,
            title: "Startup Pitch Competition",
            description: "Watch innovative startups pitch their ideas to a panel of expert judges. Great networking opportunity.",
            image: "https://picsum.photos/400/200?random=3",
            date: "March 22, 2024",
            time: "7:00 PM - 10:00 PM",
            location: "WeWork Times Square",
            fullAddress: "1460 Broadway, New York, NY 10036",
            virtualUrls: ["https://teams.microsoft.com/meet/abc123"],
            attendees: 75,
            maxAttendees: 150,
            locationType: "hybrid",
            type: "in-person",
            category: "Business",
            isRecurring: true,
            recurringFrequency: "Weekly on Mon & Tue",
            status: "upcoming",
            coordinates: {
                latitude: 40.7589,
                longitude: -73.9851
            },
            organizer: {
                name: "Alex Rodriguez",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
            }
        },
        {
            id: 4,
            title: "AI & Machine Learning Summit - Live Now!",
            description: "Explore the latest trends in AI and ML. Expert speakers from leading tech companies.",
            image: "https://picsum.photos/400/200?random=4",
            date: "Today",
            time: "10:00 AM - 4:00 PM (In Progress)",
            location: "Online",
            virtualUrls: ["https://zoom.us/j/987654321"],
            attendees: 234,
            maxAttendees: 500,
            locationType: "virtual",
            type: "online",
            category: "Technology",
            status: "live",
            organizer: {
                name: "Emma Davis",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face"
            }
        },
        {
            id: 5,
            title: "Photography Masterclass",
            description: "Learn professional photography techniques from award-winning photographers.",
            image: "https://picsum.photos/400/200?random=5",
            date: "February 28, 2024",
            time: "1:00 PM - 6:00 PM",
            location: "Los Angeles, CA",
            attendees: 45,
            maxAttendees: 80,
            locationType: "physical",
            type: "in-person",
            category: "Creative",
            status: "past",
            organizer: {
                name: "David Kim",
                avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=32&h=32&fit=crop&crop=face"
            }
        },
        {
            id: 6,
            title: "Digital Marketing Bootcamp",
            description: "Comprehensive bootcamp covering SEO, social media, and content marketing strategies.",
            image: "https://picsum.photos/400/200?random=6",
            date: "April 2, 2024",
            time: "9:00 AM - 5:00 PM",
            location: "Online",
            virtualUrls: ["https://meet.google.com/xyz-abc-def"],
            attendees: 156,
            maxAttendees: 200,
            locationType: "virtual",
            type: "online",
            category: "Marketing",
            status: "upcoming",
            organizer: {
                name: "Lisa Thompson",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face"
            }
        },
        {
            id: 7,
            title: "Web3 Developer Meetup - Happening Now",
            description: "Join fellow Web3 developers to discuss latest blockchain technologies and dApps.",
            image: "https://picsum.photos/400/200?random=7",
            date: "Today",
            time: "6:00 PM - 9:00 PM (Live)",
            location: "Silicon Valley Hub",
            fullAddress: "123 Tech Street, Palo Alto, CA",
            virtualUrls: ["https://zoom.us/j/456789123"],
            attendees: 67,
            maxAttendees: 80,
            locationType: "hybrid",
            type: "in-person",
            category: "Technology",
            status: "live",
            coordinates: {
                latitude: 37.4419,
                longitude: -122.1430
            },
            organizer: {
                name: "James Wilson",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face"
            }
        },
        {
            id: 8,
            title: "Product Management 101",
            description: "Complete guide to product management for beginners and intermediate practitioners.",
            image: "https://picsum.photos/400/200?random=8",
            date: "February 15, 2024",
            time: "10:00 AM - 3:00 PM",
            location: "Online",
            virtualUrls: ["https://meet.google.com/abc-def-ghi"],
            attendees: 123,
            maxAttendees: 150,
            locationType: "virtual",
            type: "online",
            category: "Business",
            status: "past",
            organizer: {
                name: "Rachel Green",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616c9ad0096?w=32&h=32&fit=crop&crop=face"
            }
        },
        {
            id: 9,
            title: "UX Research Workshop",
            description: "Learn practical UX research methods and how to apply them to your projects.",
            image: "https://picsum.photos/400/200?random=9",
            date: "March 30, 2024",
            time: "11:00 AM - 4:00 PM",
            location: "Design Studio NYC",
            fullAddress: "456 Design Ave, New York, NY 10001",
            attendees: 42,
            maxAttendees: 60,
            locationType: "physical",
            type: "in-person",
            category: "Design",
            status: "upcoming",
            isRecurring: true,
            recurringFrequency: "Monthly",
            coordinates: {
                latitude: 40.7128,
                longitude: -74.0060
            },
            organizer: {
                name: "Monica Geller",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face"
            }
        },
        {
            id: 10,
            title: "Startup Pitch Competition",
            description: "Watch innovative startups pitch their ideas to a panel of expert judges. Great networking opportunity.",
            image: "https://picsum.photos/400/200?random=10",
            date: "February 10, 2024",
            time: "7:00 PM - 10:00 PM",
            location: "WeWork Downtown",
            fullAddress: "500 Market Street, San Francisco, CA 94102",
            attendees: 120,
            maxAttendees: 150,
            locationType: "hybrid",
            type: "in-person",
            category: "Business",
            isRecurring: true,
            recurringFrequency: "Weekly on Mon & Tue",
            status: "past",
            coordinates: {
                latitude: 37.7749,
                longitude: -122.4194
            },
            organizer: {
                name: "Chris Evans",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face"
            }
        }
    ];

    // Filter events based on active tab
    const filteredEvents = allEvents.filter(event => {
        if (activeTab === 'all') return true;
        if (activeTab === 'live') return event.status === 'live';
        if (activeTab === 'upcoming') return event.status === 'upcoming';
        if (activeTab === 'past') return event.status === 'past';
        return true;
    });

    // Count events for each tab
    const eventCounts = {
        all: allEvents.length,
        live: allEvents.filter(e => e.status === 'live').length,
        upcoming: allEvents.filter(e => e.status === 'upcoming').length,
        past: allEvents.filter(e => e.status === 'past').length
    };

    const headerActions = (
        <div className="flex items-center gap-3">
            <div className="relative">
                <Input
                    placeholder="Search events, organizers, or locations..."
                    className="w-80 bg-secondary/20 border-secondary/50 focus:border-brand-solid focus:ring-2 focus:ring-brand-100 transition-all duration-200"
                    icon={SearchLg}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <kbd className="px-2 py-1 text-xs font-semibold text-tertiary bg-secondary/50 border border-secondary/80 rounded-md">
                        ⌘K
                    </kbd>
                </div>
            </div>
            <Button 
                size="sm" 
                iconLeading={Plus} 
                className="shadow-sm hover:shadow-md hover:shadow-brand-solid/25 transition-all duration-200"
            >
                Create Event
            </Button>
        </div>
    );

    return (
        <SiteLayout 
            title="Events"
            description="Discover and join amazing events"
            currentPath="/site/event"
            headerActions={headerActions}
            showBackButton={true}
        >
            <div className="overflow-y-auto">
                <div className="py-8 px-1">
                {/* Enhanced Filter Tabs */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-semibold text-primary">Browse Events</h3>
                            <p className="text-sm text-tertiary">Find the perfect event for you</p>
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Time Filters */}
                        <div className="flex items-center bg-secondary/30 rounded-xl p-1">
                            <Button 
                                size="sm" 
                                color={activeTab === 'all' ? "primary" : "tertiary"} 
                                className={activeTab === 'all' ? "shadow-sm" : "text-secondary hover:text-primary"}
                                onClick={() => setActiveTab('all')}
                            >
                                <span className="flex items-center gap-2">
                                    All Events
                                    <Badge color="gray" size="sm" className="ml-1">{eventCounts.all}</Badge>
                                </span>
                            </Button>
                            <Button 
                                size="sm" 
                                color={activeTab === 'live' ? "primary" : "tertiary"} 
                                className={activeTab === 'live' ? "shadow-sm" : "text-secondary hover:text-primary"}
                                onClick={() => setActiveTab('live')}
                                
                            >
                                <span className="flex items-center gap-2">
                                    Ongoing Events
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error-solid opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-error-solid"></span>
                                    </span>
                                    <Badge color="error" size="sm" className="ml-1">{eventCounts.live}</Badge>
                                </span>
                            </Button>
                            <Button 
                                size="sm" 
                                color={activeTab === 'upcoming' ? "primary" : "tertiary"} 
                                className={activeTab === 'upcoming' ? "shadow-sm" : "text-secondary hover:text-primary"}
                                onClick={() => setActiveTab('upcoming')}
                            >
                                <span className="flex items-center gap-2">
                                    Upcoming Events
                                    <Badge color="brand" size="sm" className="ml-1">{eventCounts.upcoming}</Badge>
                                </span>
                            </Button>
                            <Button 
                                size="sm" 
                                color={activeTab === 'past' ? "primary" : "tertiary"} 
                                className={activeTab === 'past' ? "shadow-sm" : "text-secondary hover:text-primary"}
                                onClick={() => setActiveTab('past')}
                            >
                                <span className="flex items-center gap-2">
                                    Past Events
                                    <Badge color="gray" size="sm" className="ml-1">{eventCounts.past}</Badge>
                                </span>
                            </Button>
                        </div>

                    </div>
                </div>

                {/* Events Grid */}
                {filteredEvents.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/30 mb-4">
                            <Calendar className="h-8 w-8 text-tertiary" />
                        </div>
                        <h3 className="text-lg font-semibold text-primary mb-2">
                            {activeTab === 'live' && 'No Live Events'}
                            {activeTab === 'upcoming' && 'No Upcoming Events'}
                            {activeTab === 'past' && 'No Past Events'}
                            {activeTab === 'all' && 'No Events Found'}
                        </h3>
                        <p className="text-sm text-tertiary max-w-md mx-auto">
                            {activeTab === 'live' && 'There are no events happening right now. Check back later or explore upcoming events.'}
                            {activeTab === 'upcoming' && 'There are no upcoming events scheduled at the moment. Check back soon for new events!'}
                            {activeTab === 'past' && 'No past events to display.'}
                            {activeTab === 'all' && 'No events available at the moment.'}
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
                        {filteredEvents.map((event) => (
                            <EventCard 
                                key={event.id} 
                                event={event} 
                                onClick={() => handleEventClick(event)}
                                rsvpStatus={eventRSVPStatus[event.id]}
                            />
                        ))}
                    </div>
                )}

                {/* Event Details Modal */}
                <EventDetailsModal 
                    event={selectedEvent} 
                    isOpen={isModalOpen} 
                    onClose={handleCloseModal}
                    onRSVPStatusChange={selectedEvent ? (status) => handleRSVPStatusChange(selectedEvent.id, status) : undefined}
                />

                {/* Enhanced Load More */}
                <div className=" text-center">
                    <div className="mt-8">
                        <Button 
                            size="lg" 
                            color="secondary" 
                            className="px-8 hover:shadow-md transition-all duration-300 min-w-48"
                        >
                            Load More Events
                        </Button>
                    </div>
                </div>
            </div>
        </div>
        </SiteLayout>
    );
}
