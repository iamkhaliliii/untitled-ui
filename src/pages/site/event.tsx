import {
    Calendar,
    MarkerPin01,
    Clock,
    Users01,
    Plus,
    SearchLg,
    Ticket01,
    Globe01,
    ImageX,

    X,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Badge, BadgeWithImage } from "@/components/base/badges/badges";

import { Input } from "@/components/base/input/input";
import { SiteLayout } from "@/components/layouts/site-layout";
import { ModalOverlay, Modal, Dialog } from "@/components/application/modals/modal";

import React, { useState } from "react";
import { useNavigate } from "react-router";

// RSVP States
type RSVPState = 'open' | 'closed' | 'completed' | 'not_started';

interface RSVPStateConfig {
    label: string;
    color: 'primary' | 'secondary' | 'tertiary';
    disabled: boolean;
    description?: string;
    openDate?: string;
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
    },
    not_started: {
        label: 'RSVP Opens Soon',
        color: 'secondary',
        disabled: true,
        description: 'Registration not yet open'
    }
};

// Function to randomly assign RSVP state to events
const getRandomRSVPState = (eventId: number): RSVPState => {
    const states: RSVPState[] = ['open', 'closed', 'completed', 'not_started'];
    // Use event ID as seed for consistent random state per event
    const index = eventId % states.length;
    return states[index];
};

// Function to generate random RSVP open date for "not_started" events
const getRandomRSVPOpenDate = (eventId: number): string => {
    // Generate dates 1-7 days from now based on event ID
    const daysFromNow = (eventId % 7) + 1;
    const openDate = new Date();
    openDate.setDate(openDate.getDate() + daysFromNow);
    
    // Random hour between 9 AM and 5 PM
    const hour = 9 + (eventId % 9);
    openDate.setHours(hour, 0, 0, 0);
    
    return openDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
};

// Custom scrollbar styles for modal
const scrollbarStyles = {
    scrollbarWidth: 'thin' as const,
    scrollbarColor: '#d1d5db transparent',
} as React.CSSProperties;

// Enhanced Event Details Modal Component  
const EventDetailsModal = ({ event, isOpen, onClose }: { event: any; isOpen: boolean; onClose: () => void }) => {
    const navigate = useNavigate();
    
    if (!event) return null;

    const rsvpState = getRandomRSVPState(event.id);
    const rsvpConfig = rsvpStateConfig[rsvpState];
    const rsvpOpenDate = rsvpState === 'not_started' ? getRandomRSVPOpenDate(event.id) : null;

    const handleEventPageClick = () => {
        window.open(`/site/event/${event.id}`, '_blank');
        // Keep modal open - don't call onClose()
    };

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={onClose}>
            <div 
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <Modal className="w-[900px] max-w-[95vw] h-[80vh]">
                    <Dialog>
                    <style dangerouslySetInnerHTML={{
                        __html: `
                        .modal-scrollbar::-webkit-scrollbar {
                            width: 6px;
                        }
                        .modal-scrollbar::-webkit-scrollbar-track {
                            background: transparent;
                        }
                        .modal-scrollbar::-webkit-scrollbar-thumb {
                            background-color: #d1d5db;
                            border-radius: 3px;
                        }
                        .modal-scrollbar::-webkit-scrollbar-thumb:hover {
                            background-color: #9ca3af;
                        }
                        `
                    }} />
                    <div 
                        className="bg-white rounded-3xl overflow-hidden shadow-2xl flex max-h-[80vh] relative"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* Left Column - Image + Basic Info */}
                        <div className="w-3/8 bg-gray-50 relative flex flex-col min-h-0">
                            <div className="p-4 flex-shrink-0">
                                <div className="w-full h-full ">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-full object-cover rounded-3xl aspect-square"
                                    />
                                </div>
                            </div>
                            
                            {/* Basic Event Info */}
                            <div 
                                className="px-5 space-y-6 flex-1 overflow-y-auto min-h-0 modal-scrollbar" 
                                style={scrollbarStyles}
                            >
                                <div className="space-y-2">
                                {/* Event Title */}
                                <h1 className="text-3xl font-bold leading-tight text-gray-900">
                                    {event.title}
                                </h1>
                                
                                {/* Host */}
                                <div className="flex items-center gap-2 text-gray-600">
                                    <div className="w-5 h-5 rounded-full overflow-hidden">
                                        <img 
                                            src={event.organizer.avatar} 
                                            alt={event.organizer.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <span className="text-sm">Hosted by {event.organizer.name}</span>
                                </div>
                                </div>
<div className="space-y-4">
                                {/* Date & Time Card */}
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 bg-white rounded-lg border border-gray-200 flex flex-col items-center justify-center text-center shadow-sm">
                                        <div className="text-xs text-gray-500 leading-none">
                                            {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                                        </div>
                                        <div className="text-xs font-semibold text-gray-900 leading-none">
                                            {new Date(event.date).getDate()}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-medium text-gray-900 text-sm">{event.date}</div>
                                        <div className="text-xs text-gray-600">{event.time}</div>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 bg-white rounded-lg border border-gray-200 flex items-center justify-center shadow-sm">
                                        <MarkerPin01 className="h-4 w-4 text-gray-500" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-medium text-gray-900 text-sm flex items-center gap-1">
                                            {event.location}
                                            <svg className="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l10-10M17 7H7v10" />
                                            </svg>
                                        </div>
                                        <div className="text-xs text-gray-600">Event venue details</div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            
                            {/* Action Buttons - Sticky Footer */}
                            <div className="px-4 pb-4 border-t border-gray-200 bg-gray-50 flex-shrink-0">
                                <div className="space-y-2 pt-3">
                                    {/* Top Row - RSVP */}
                                    <div className="space-y-2">
                                        {(rsvpState === 'open' || rsvpState === 'not_started') ? (
                                            <Button 
                                                size="sm" 
                                                color={rsvpConfig.color} 
                                                className="w-full justify-center text-xs"
                                                disabled={rsvpConfig.disabled}
                                                title={rsvpConfig.description}
                                            >
                                                {rsvpState === 'not_started' && rsvpOpenDate ? `Opens: ${rsvpOpenDate}` : rsvpConfig.label}
                                            </Button>
                                        ) : (
                                            <div className="text-center py-2">
                                                <p className="text-sm text-tertiary font-medium">{rsvpConfig.label}</p>
                                            </div>
                                        )}
                                    </div>
                                    

                                </div>
                            </div>
                        </div>

                        {/* Right Column - Content Cards */}
                        <div className="w-5/8 flex flex-col min-h-0">
                            {/* Sticky Header with Action Buttons */}
                            <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-2 z-10 flex justify-end">
                                <div className="flex items-center gap-1">
                                    {/* Event Page Button */}
                                    <button
                                        onClick={handleEventPageClick}
                                        className="hover:bg-gray-100 rounded-lg p-2 transition-colors"
                                        title="View Event Page"
                                    >
                                        <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </button>
                                    
                                    {/* Share Button */}
                                    <button
                                        className="hover:bg-gray-100 rounded-lg p-2 transition-colors"
                                        title="Share Event"
                                    >
                                        <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                        </svg>
                                    </button>
                                    
                                    {/* Close Button */}
                                    <button
                                        onClick={onClose}
                                        className="hover:bg-gray-100 rounded-lg p-2 transition-colors"
                                        title="Close"
                                    >
                                        <X className="h-4 w-4 text-gray-500" />
                                    </button>
                                </div>
                            </div>
                            
                            {/* Scrollable Content */}
                            <div 
                                className="p-4 flex-1 overflow-y-auto space-y-4 min-h-0 modal-scrollbar" 
                                style={scrollbarStyles}
                            >

                                {/* About Event Card */}
                                <div className="p-3">
                                    <div className="text-sm text-gray-500 mb-3">About Event</div>
                                    <div className="prose prose-gray max-w-none">
                                        <p className="text-gray-700 leading-relaxed text-sm mb-4">
                                            {event.description}
                                        </p>
                                        <p className="text-gray-700 leading-relaxed text-sm mb-4">
                                            Join us for an immersive experience that brings together industry leaders, innovative thinkers, and passionate professionals. This carefully curated event is designed to foster meaningful connections, share cutting-edge insights, and explore the latest trends shaping our industry.
                                        </p>
                                        <p className="text-gray-700 leading-relaxed text-sm mb-4">
                                            Whether you're looking to expand your network, gain new perspectives, or simply enjoy engaging conversations with like-minded individuals, this event offers something valuable for everyone. Our speakers and participants represent diverse backgrounds and expertise levels, creating a rich environment for learning and collaboration.
                                        </p>
                                        <p className="text-gray-700 leading-relaxed text-sm">
                                            Don't miss this opportunity to be part of a dynamic community that's driving positive change and innovation. Reserve your spot today and prepare for an inspiring and transformative experience.
                                        </p>
                                    </div>
                                </div>

                                {/* Location Card */}
                                <div className="p-3">
                                    <div className="text-sm text-gray-500 mb-3">Location</div>
                                    <div className="space-y-3">
                                        <div>
                                            <div className="font-medium text-gray-900">{event.location}</div>
                                            <div className="text-sm text-gray-600 mt-1">
                                                {event.type === "online" 
                                                    ? "Join link will be sent before the event" 
                                                    : "Full address will be provided after registration"
                                                }
                                            </div>
                                        </div>
                                        <div className="bg-gray-100 rounded-xl h-32 flex items-center justify-center">
                                            <span className="text-gray-500 text-sm">
                                                {event.type === "online" ? "Virtual Event" : "Map view"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Modal>
            </div>
        </ModalOverlay>
    );
};

// Enhanced Event Card Component
const EventCard = ({ event, onClick }: { event: any; onClick: () => void }) => {
    const [imageError, setImageError] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const rsvpState = getRandomRSVPState(event.id);
    const rsvpConfig = rsvpStateConfig[rsvpState];
    const rsvpOpenDate = rsvpState === 'not_started' ? getRandomRSVPOpenDate(event.id) : null;

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
            <div className="relative overflow-hidden">
                {imageError ? (
                    <div className="h-52 w-full bg-gradient-to-br from-secondary to-secondary/70 flex items-center justify-center">
                        <div className="text-center">
                            <ImageX className="h-8 w-8 text-tertiary mx-auto mb-2" />
                            <p className="text-xs text-tertiary">Image unavailable</p>
                        </div>
                    </div>
                ) : (
                    <img
                        src={event.image}
                        alt={event.title}
                        className={`h-52 w-full object-cover transition-all duration-500 ${
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
                    <div className="flex items-center gap-2 text-sm text-secondary group-hover:text-primary transition-colors">
                        <MarkerPin01 className="h-3.5 w-3.5 text-warning-solid" />
                        <span>{event.location}</span>
                    </div>
                </div>

                {/* Actions Footer */}
                <div className="pt-2 mt-2 border-t border-secondary/30 group-hover:border-gray-200 transition-colors space-y-2">
                    <div className="flex items-center justify-end">
                        {(rsvpState === 'open' || rsvpState === 'not_started') ? (
                            <Button
                                color={rsvpConfig.color === 'primary' ? 'tertiary' : rsvpConfig.color}
                                size="sm"
                                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                                className={rsvpConfig.disabled 
                                    ? "cursor-not-allowed opacity-60" 
                                    : "text-brand-solid hover:text-brand-solid_hover"
                                }
                                disabled={rsvpConfig.disabled}
                                title={rsvpConfig.description}
                            >
                                {rsvpState === 'not_started' && rsvpOpenDate ? `Opens: ${rsvpOpenDate}` : `${rsvpConfig.label} ${!rsvpConfig.disabled ? '→' : ''}`}
                            </Button>
                        ) : (
                            <p className="text-sm text-tertiary font-medium">{rsvpConfig.label}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const SiteEventPage = () => {
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
                            location: "San Francisco, CA",
                            attendees: 150,
                            maxAttendees: 200,

                            type: "in-person",
                            category: "Technology",
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
                            attendees: 89,
                            maxAttendees: 100,

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
                            location: "New York, NY",
                            attendees: 75,
                            maxAttendees: 150,

                            type: "in-person",
                            category: "Business",
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
                            attendees: 234,
                            maxAttendees: 500,

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
                            attendees: 156,
                            maxAttendees: 200,

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
}; 