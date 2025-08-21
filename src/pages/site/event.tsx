import React, { useState } from "react";
import { SearchLg, Plus, ImageX, Calendar, Clock, Users01, X, VideoRecorder } from "@untitledui/icons";
import { MarkerPin01 } from "@untitledui/icons";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button";
import { Badge, BadgeWithImage } from "@/components/base/badges/badges";
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
const EventCard = ({ event, onClick }: { event: any; onClick: () => void }) => {
    const [imageError, setImageError] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const rsvpState = getRandomRSVPState(event.id);
    const rsvpConfig = rsvpStateConfig[rsvpState];

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
                
                
                <div className="absolute top-4 left-4 z-20">
                    <Badge 
                        color="gray" 
                        size="sm"
                        className="backdrop-blur-sm bg-white/95 shadow-sm border border-white/20"
                    >
                        {event.category}
                    </Badge>
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
                    </div>
                    <div className="flex items-center gap-2 text-sm text-secondary group-hover:text-primary transition-colors">
                        <Clock className="h-3.5 w-3.5 text-success-solid" />
                        <span>{event.time}</span>
                    </div>
                    
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
                        {rsvpState === 'open' ? (
                            <Button
                                color="secondary"
                                size="sm"
                                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                                className="px-4 py-2"
                                disabled={rsvpConfig.disabled}
                                title={rsvpConfig.description}
                            >
                                {rsvpConfig.label}
                            </Button>
                        ) : (
                            <Button
                                color="secondary"
                                size="sm"
                                className="px-4 py-2 opacity-60 cursor-not-allowed"
                                disabled={true}
                            >
                                {rsvpConfig.label}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function SiteEventPage() {
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEventClick = (event: any) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
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
                            <Button size="sm" color="primary" className="shadow-sm">All Events</Button>
                            <Button size="sm" color="tertiary" className="text-secondary hover:text-primary">This Week</Button>
                            <Button size="sm" color="tertiary" className="text-secondary hover:text-primary">This Month</Button>
                        </div>

                    </div>
                </div>

                {/* Events Grid */}
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
                    {[
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
                            title: "Design Thinking Workshop",
                            description: "Hands-on workshop to master design thinking methodology. Perfect for designers and product managers.",
                            image: "https://picsum.photos/400/200?random=2",
                            date: "March 18, 2024",
                            time: "2:00 PM - 5:00 PM",
                            location: "Online",
                            virtualUrls: ["https://zoom.us/j/123456789"],
                            attendees: 89,
                            maxAttendees: 100,
                            locationType: "virtual",
                            type: "online",
                            category: "Design",
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
                            title: "AI & Machine Learning Summit",
                            description: "Explore the latest trends in AI and ML. Expert speakers from leading tech companies.",
                            image: "https://picsum.photos/400/200?random=4",
                            date: "March 25, 2024",
                            time: "10:00 AM - 4:00 PM",
                            location: "Online",
                            virtualUrls: ["https://zoom.us/j/987654321"],
                            attendees: 234,
                            maxAttendees: 500,
                            locationType: "virtual",
                            type: "online",
                            category: "Technology",
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
                            date: "March 28, 2024",
                            time: "1:00 PM - 6:00 PM",
                            location: "Los Angeles, CA",
                            attendees: 45,
                            maxAttendees: 80,
                            locationType: "physical",
                            type: "in-person",
                            category: "Creative",
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
                            organizer: {
                                name: "Lisa Thompson",
                                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face"
                            }
                        }
                    ].map((event) => (
                        <EventCard key={event.id} event={event} onClick={() => handleEventClick(event)} />
                    ))}
                </div>

                {/* Event Details Modal */}
                <EventDetailsModal 
                    event={selectedEvent} 
                    isOpen={isModalOpen} 
                    onClose={handleCloseModal}
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
