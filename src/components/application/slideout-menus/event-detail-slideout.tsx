import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Avatar } from "@/components/base/avatar/avatar";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { X, Calendar, Clock, Edit03, SearchLg, Download01, Users01, Share05, MarkerPin01, Tag01, CheckCircle } from "@untitledui/icons";
import { useAdmin } from "@/hooks/use-admin";

// RSVP States
type RSVPState = 'open' | 'closed' | 'completed' | 'not_started';

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
    },
    not_started: {
        label: 'RSVP Opens Soon',
        color: 'secondary',
        disabled: true,
        description: 'Registration not yet open'
    }
};

// Function to randomly assign RSVP state to events
const getRandomRSVPState = (eventId: string): RSVPState => {
    const states: RSVPState[] = ['open', 'closed', 'completed', 'not_started'];
    // Use event ID hash as seed for consistent random state per event
    const hash = eventId.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
    }, 0);
    const index = Math.abs(hash) % states.length;
    return states[index];
};

// Function to generate random RSVP open date for "not_started" events
const getRandomRSVPOpenDate = (eventId: string): string => {
    // Generate dates 1-7 days from now based on event ID hash
    const hash = eventId.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
    }, 0);
    const daysFromNow = (Math.abs(hash) % 7) + 1;
    const openDate = new Date();
    openDate.setDate(openDate.getDate() + daysFromNow);
    
    // Random hour between 9 AM and 5 PM
    const hour = 9 + (Math.abs(hash) % 9);
    openDate.setHours(hour, 0, 0, 0);
    
    return openDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
};

interface EventDetailSlideoutProps {
    isOpen: boolean;
    onClose: () => void;
    event: {
        id: string;
        title: string;
        description: string;
        organizer: {
            name: string;
            avatar: string;
        };
        status: string;
        location: string;
        eventType: string;
        tags: string[];
        eventDate: string | null;
        attendees: number;
        capacity: number;
        slug: string;
        locked: boolean;
        hidden: boolean;
    } | null;
}

const formatEventDate = (dateString: string | null) => {
    if (!dateString) return { day: "--", month: "---", fullDate: "Not scheduled", time: "Time TBD" };
    
    const date = new Date(dateString);
    const day = date.getDate().toString();
    const month = date.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
    const fullDate = date.toLocaleDateString("en-US", { 
        weekday: "long", 
        year: "numeric", 
        month: "long", 
        day: "numeric" 
    });
    const time = date.toLocaleTimeString("en-US", { 
        hour: "numeric", 
        minute: "2-digit",
        hour12: true 
    });
    
    return { day, month, fullDate, time };
};

const mockAttendees = [
    { name: "Sienna Hewitt", avatar: "https://www.untitledui.com/images/avatars/sienna-hewitt?fm=webp&q=80" },
    { name: "Ammar Foley", avatar: "https://www.untitledui.com/images/avatars/ammar-foley?fm=webp&q=80" },
    { name: "Pippa Wilkinson", avatar: "https://www.untitledui.com/images/avatars/pippa-wilkinson?fm=webp&q=80" },
    { name: "Olly Schroeder", avatar: "https://www.untitledui.com/images/avatars/olly-schroeder?fm=webp&q=80" },
    { name: "Mathilde Lewis", avatar: "https://www.untitledui.com/images/avatars/mathilde-lewis?fm=webp&q=80" },
];

const mockRSVPList = [
    { 
        id: 1, 
        name: "Sienna Hewitt", 
        email: "sienna@example.com",
        avatar: "https://www.untitledui.com/images/avatars/sienna-hewitt?fm=webp&q=80",
        status: "yes" as const,
        rsvpDate: "2024-01-10T09:30:00Z",
        role: "Organizer"
    },
    { 
        id: 2, 
        name: "Ammar Foley", 
        email: "ammar@example.com",
        avatar: "https://www.untitledui.com/images/avatars/ammar-foley?fm=webp&q=80",
        status: "yes" as const,
        rsvpDate: "2024-01-11T14:20:00Z",
        role: "Attendee"
    },
    { 
        id: 3, 
        name: "Pippa Wilkinson", 
        email: "pippa@example.com",
        avatar: "https://www.untitledui.com/images/avatars/pippa-wilkinson?fm=webp&q=80",
        status: "maybe" as const,
        rsvpDate: "2024-01-12T16:45:00Z",
        role: "Attendee"
    },
    { 
        id: 4, 
        name: "Olly Schroeder", 
        email: "olly@example.com",
        avatar: "https://www.untitledui.com/images/avatars/olly-schroeder?fm=webp&q=80",
        status: "no" as const,
        rsvpDate: "2024-01-13T11:15:00Z",
        role: "Attendee"
    },
    { 
        id: 5, 
        name: "Mathilde Lewis", 
        email: "mathilde@example.com",
        avatar: "https://www.untitledui.com/images/avatars/mathilde-lewis?fm=webp&q=80",
        status: "yes" as const,
        rsvpDate: "2024-01-14T08:30:00Z",
        role: "Speaker"
    },
    { 
        id: 6, 
        name: "John Doe", 
        email: "john@example.com",
        avatar: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80",
        status: "yes" as const,
        rsvpDate: "2024-01-15T19:00:00Z",
        role: "Attendee"
    },
    { 
        id: 7, 
        name: "Jane Smith", 
        email: "jane@example.com",
        avatar: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80",
        status: "maybe" as const,
        rsvpDate: "2024-01-16T12:45:00Z",
        role: "Attendee"
    },
    { 
        id: 8, 
        name: "Mike Johnson", 
        email: "mike@example.com",
        avatar: "https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80",
        status: "yes" as const,
        rsvpDate: "2024-01-17T15:20:00Z",
        role: "Attendee"
    }
];

export const EventDetailSlideout = ({ isOpen, onClose, event }: EventDetailSlideoutProps) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'rsvp-list'>('overview');
    const [searchQuery, setSearchQuery] = useState('');
    const { isAdmin, adminHeaderVisible, adminHeaderCollapsed } = useAdmin();

    // Get RSVP state for this event
    const rsvpState = event ? getRandomRSVPState(event.id) : 'open';
    const rsvpConfig = rsvpStateConfig[rsvpState];
    const rsvpOpenDate = event && rsvpState === 'not_started' ? getRandomRSVPOpenDate(event.id) : null;

    // Filter RSVP list based on search query
    const filteredRSVPList = mockRSVPList.filter(person => 
        person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handle escape key and body scroll lock
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            // Prevent body scroll when slideout is open
            document.body.style.overflow = 'hidden';
            
            return () => {
                document.removeEventListener('keydown', handleEscape);
            };
        } else {
            // Delay restoring body scroll to allow exit animation to complete
            const timer = setTimeout(() => {
                document.body.style.overflow = 'unset';
            }, 300); // Match the animation duration
            
            return () => {
                clearTimeout(timer);
                document.body.style.overflow = 'unset';
            };
        }
    }, [isOpen, onClose]);

    if (!event) return null;

    const { fullDate, time } = formatEventDate(event.eventDate);
    


    // Calculate dynamic positioning based on admin header state
    const getHeaderHeight = () => {
        if (isAdmin && adminHeaderVisible) {
            return adminHeaderCollapsed ? 12 : 48; // 12px collapsed, 48px full
        }
        return 0; // No admin header
    };

    const headerHeight = getHeaderHeight();
    const topPosition = headerHeight;
    const availableHeight = `calc(100vh - ${headerHeight}px)`;

    return (
        <AnimatePresence 
            mode="wait"
            onExitComplete={() => {
                // Ensure body scroll is restored after exit animation
                document.body.style.overflow = 'unset';
            }}
        >
            {isOpen && (
                <motion.div 
                    key="event-slideout-overlay"
                    className="fixed flex w-full items-center justify-end bg-overlay/70 pl-6 outline-hidden ease-linear md:pl-10 z-50"
                    style={{
                        top: `${topPosition}px`,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: availableHeight
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    onClick={onClose}
                >
                    <motion.div 
                        key="event-slideout-panel"
                        className="inset-y-0 right-0 h-full w-full max-w-100 shadow-xl"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ 
                            duration: 0.3, 
                            ease: [0.4, 0.0, 0.2, 1] // Custom easing for smooth slide
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                <section className="relative flex size-full flex-col items-start overflow-y-auto bg-primary ring-1 ring-secondary_alt outline-hidden gap-0">
                    {/* Header */}
                    <header className="z-1 relative flex w-full flex-col items-start gap-3 px-4 pt-5 md:px-6">
                        <div className="flex flex-col gap-2 pr-12">
                            <BadgeWithDot 
                                color="warning"
                                size="sm"
                            >
                                Scheduled
                            </BadgeWithDot>
                            <h1 className="text-md font-semibold text-primary md:text-lg">{event.title}</h1>
                        </div>
                        <button
                            className="flex cursor-pointer items-center justify-center rounded-lg p-2 transition duration-100 ease-linear focus:outline-hidden size-10 text-fg-quaternary hover:bg-primary_hover hover:text-fg-quaternary_hover focus-visible:outline-2 focus-visible:outline-offset-2 outline-focus-ring absolute top-3 right-3 shrink-0"
                            onClick={onClose}
                            aria-label="Close"
                        >
                            <X className="shrink-0 transition-inherit-all size-5" />
                        </button>
                    </header>

                    {/* Tab Navigation */}
                    <div className="border-b border-secondary px-4 md:px-6">
                        <nav className="flex space-x-8" aria-label="Tabs">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                    activeTab === 'overview'
                                        ? 'border-brand-secondary text-brand-secondary'
                                        : 'border-transparent text-tertiary hover:text-secondary hover:border-secondary'
                                }`}
                            >
                                Overview
                            </button>
                            <button
                                onClick={() => setActiveTab('rsvp-list')}
                                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                    activeTab === 'rsvp-list'
                                        ? 'border-brand-secondary text-brand-secondary'
                                        : 'border-transparent text-tertiary hover:text-secondary hover:border-secondary'
                                }`}
                            >
                                RSVP List ({mockRSVPList.length})
                            </button>
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div role="main" className="flex size-full flex-col gap-6 overflow-y-auto overscroll-auto px-4 py-6 md:px-6">
                        {activeTab === 'overview' ? (
                                                            <div className="flex flex-col min-h-0">
                                    {/* Cover Section - Image + Title + Details */}
                                    <section className="flex gap-6 mb-6">
                                        {/* Event Image - Left Side */}
                                        <div className="flex-shrink-0">
                                            <div className="w-24 h-24 rounded-2xl overflow-hidden">
                                                <img 
                                                    alt={event.title} 
                                                    className="w-full h-full object-cover" 
                                                    src={`https://picsum.photos/400/400?random=${event.id}`}
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.src = 'https://via.placeholder.com/96x96/f3f4f6/9ca3af?text=Event';
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* Event Info - Right Side */}
                                        <div className="flex-1 space-y-4">
                                            {/* Title and Host */}
                                            <div className="space-y-2">
                                                <div className="flex w-full justify-between items-start">
                                                    <h1 className="text-2xl font-bold leading-tight text-primary flex-1">{event.title}</h1>
                                                    <span className="flex gap-1 ml-4">
                                                        <button className="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle text-fg-quaternary hover:bg-primary_hover hover:text-fg-quaternary_hover" aria-label="Share">
                                                            <Share05 className="size-4" />
                                                        </button>
                                                        <button className="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle text-fg-quaternary hover:bg-primary_hover hover:text-fg-quaternary_hover" aria-label="Edit">
                                                            <Edit03 className="size-4" />
                                                        </button>
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 text-tertiary">
                                                    <div className="w-5 h-5 rounded-full overflow-hidden">
                                                        <img 
                                                            alt={event.organizer.name} 
                                                            className="w-full h-full object-cover" 
                                                            src={event.organizer.avatar}
                                                        />
                                                    </div>
                                                    <span className="text-sm">Hosted by {event.organizer.name}</span>
                                                </div>
                                            </div>

                                            {/* Event Details */}
                                            <section className="flex flex-col gap-2">
                                                <span className="flex items-center gap-2">
                                                    <Calendar className="text-fg-quaternary size-5" />
                                                    <p className="text-sm text-tertiary">{fullDate}</p>
                                                </span>
                                                <span className="flex items-center gap-2">
                                                    <Clock className="text-fg-quaternary size-5" />
                                                    <p className="text-sm text-tertiary">{time}</p>
                                                </span>
                                                <span className="flex items-center gap-2">
                                                    <MarkerPin01 className="text-fg-quaternary size-5" />
                                                    <p className="text-sm text-tertiary">{event.location}</p>
                                                </span>
                                                <span className="flex items-center gap-2">
                                                    <Tag01 className="text-fg-quaternary size-5" />
                                                    <p className="text-sm text-tertiary">{event.eventType}</p>
                                                </span>

                                            </section>
                                        </div>
                                    </section>

                                    {/* Other Content */}
                                    <div className="space-y-6 flex-1 overflow-y-auto min-h-0">
                                        {/* RSVP Overview */}
                                        <div className="space-y-3">
                                            <p className="text-sm font-semibold text-primary">RSVP Overview</p>
                                            <div className="bg-secondary rounded-lg p-4 space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-quaternary">RSVP Opens:</span>
                                                    <span className="text-sm text-primary">Jan 10, 2024 - 9:00 AM</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-quaternary">RSVP Closes:</span>
                                                    <span className="text-sm text-primary">Feb 20, 2024 - 6:00 PM</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-quaternary">Capacity:</span>
                                                    <span className="text-sm text-primary">{event.capacity}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-quaternary">Current RSVPs:</span>
                                                    <span className="text-sm text-primary">{event.attendees}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-quaternary">Availability:</span>
                                                    <span className="text-sm text-success-solid">{event.capacity - event.attendees} spots left</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Attendees */}
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-semibold text-primary">Attendees</p>
                                                <button 
                                                    onClick={() => setActiveTab('rsvp-list')}
                                                    className="text-sm text-brand-secondary hover:text-brand-secondary_hover transition-colors font-medium"
                                                >
                                                    View All
                                                </button>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <div className="flex flex-row -space-x-2">
                                                    {mockAttendees.slice(0, 4).map((attendee, index) => (
                                                        <Avatar
                                                            key={index}
                                                            src={attendee.avatar}
                                                            alt={attendee.name}
                                                            size="sm"
                                                            className="ring-2 ring-bg-primary"
                                                        />
                                                    ))}
                                                    <div className="relative inline-flex shrink-0 items-center justify-center rounded-full bg-avatar-bg outline-avatar-contrast-border size-8 outline-1 -outline-offset-1 ring-2 ring-bg-primary">
                                                        <span className="text-quaternary text-xs font-semibold">+{event.attendees - 4}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* RSVP Action Section - Following user preference for footer positioning */}
                                        <div className="mt-auto pt-6 border-t border-secondary space-y-2">
                                            {(rsvpState === 'open' || rsvpState === 'not_started') ? (
                                                <Button 
                                                    size="sm" 
                                                    color={rsvpConfig.color}
                                                    className="w-full justify-center"
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
                        ) : (
                            /* RSVP List Tab */
                            <div className="flex flex-col gap-4">
                                {/* Search and Actions Header */}
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex-1 max-w-sm">
                                        <div className="relative">
                                            <SearchLg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fg-quaternary size-4" />
                                            <input
                                                type="text"
                                                placeholder="Search attendees..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2 border border-secondary rounded-lg bg-primary text-primary placeholder-quaternary focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent text-sm"
                                            />
                                        </div>
                                    </div>
                                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-secondary border border-secondary rounded-lg hover:bg-primary_hover transition-colors text-sm font-medium">
                                        <Download01 className="size-4" />
                                        Export List
                                    </button>
                                </div>



                                {/* RSVP List */}
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm font-semibold text-primary">
                                        Attendees {searchQuery && `(${filteredRSVPList.length} results)`}
                                    </p>
                                    <div className="space-y-1 overflow-y-auto">
                                        {filteredRSVPList.map((person) => (
                                            <div key={person.id} className="flex items-center justify-between py-2 px-3 hover:bg-secondary_hover rounded-md transition-colors">
                                                <div className="flex items-center gap-3 min-w-0 flex-1">
                                                    <Avatar src={person.avatar} alt={person.name} size="xs" />
                                                    <div className="min-w-0 flex-1">
                                                        <div className="flex items-center gap-2">
                                                            <p className="text-sm font-medium text-primary truncate">{person.name}</p>
                                                            {person.role !== 'Attendee' && (
                                                                <span className="text-xs text-tertiary">
                                                                    ({person.role})
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-xs text-tertiary truncate">{person.email}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end ml-3">
                                                    <span className="text-xs text-tertiary">
                                                        {new Date(person.rsvpDate).toLocaleDateString('en-US', { 
                                                            month: 'short', 
                                                            day: 'numeric' 
                                                        })}
                                                    </span>
                                                    <span className="text-xs text-quaternary">
                                                        {new Date(person.rsvpDate).toLocaleTimeString('en-US', { 
                                                            hour: 'numeric', 
                                                            minute: '2-digit',
                                                            hour12: true 
                                                        })}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {filteredRSVPList.length === 0 && (
                                        <div className="text-center py-8">
                                            <Users01 className="mx-auto h-12 w-12 text-fg-quaternary" />
                                            <h3 className="mt-2 text-sm font-semibold text-primary">No results found</h3>
                                            <p className="mt-1 text-sm text-tertiary">
                                                {searchQuery ? 'Try adjusting your search criteria.' : 'No RSVP responses yet.'}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>


                </section>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};