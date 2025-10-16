import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { Calendar, Clock, VideoRecorder, MarkerPin01, Check, Users01, X, Plus, ArrowRight, ChevronDown, ChevronUp, Download01, Link01, Share04, Repeat03, Share07, LinkExternal01, DotsHorizontal, Eye, Edit01, Trash01, TrendUp02, BarChartSquare02, MinusCircle, ClockRefresh } from '@untitledui/icons';
import EventMap from '../../base/map/event-map';
import { ModalOverlay, Modal, Dialog } from './modal';
import { Button } from '../../base/buttons/button';
import { Badge, BadgeWithIcon } from '../../base/badges/badges';
import { Dropdown } from '../../base/dropdown/dropdown';

// RSVP States
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
    
    },
    closed: {
        label: 'RSVP Closed',
        color: 'secondary',
        disabled: true,
        
    },
    completed: {
        label: 'Event Completed',
        color: 'tertiary',
        disabled: true,
        
    }
};

// Function to randomly assign RSVP state to events
const getRandomRSVPState = (eventId: number): RSVPState => {
    const states: RSVPState[] = ['open', 'closed', 'completed'];
    // Use event ID as seed for consistent random state per event
    const index = eventId % states.length;
    return states[index];
};

// Custom scrollbar styles for modal
const scrollbarStyles = {
    scrollbarWidth: 'thin' as const,
    scrollbarColor: '#d1d5db transparent',
} as React.CSSProperties;

// Collapsible About Event Component
const CollapsibleAboutEvent = ({ description }: { description: string }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    // Create a longer, more detailed description for demonstration
    const fullDescription = `${description}

Join us for an immersive experience that brings together industry leaders, innovative thinkers, and passionate professionals. This carefully curated event is designed to foster meaningful connections, share cutting-edge insights, and explore the latest trends shaping our industry.

Whether you're looking to expand your network, gain new perspectives, or simply enjoy engaging conversations with like-minded individuals, this event offers something valuable for everyone. Our speakers and participants represent diverse backgrounds and expertise levels, creating a rich environment for learning and collaboration.

Don't miss this opportunity to be part of a dynamic community that's driving positive change and innovation. Reserve your spot today and prepare for an inspiring and transformative experience.`;
    
    const shortText = fullDescription.length > 100 ? fullDescription.substring(0, 100) + "..." : fullDescription;
    const needsExpansion = fullDescription.length > 100;
    
    return (
        <div className="p-3">
            <div className="text-sm text-gray-500 mb-3">About Event</div>
            <div className="prose prose-gray max-w-none">
                <div className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">
                    {isExpanded ? fullDescription : shortText}
                </div>
            </div>
            {needsExpansion && (
                <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium mt-2 transition-colors"
                >
                    <span>{isExpanded ? 'Show less' : 'See more'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
            )}
        </div>
    );
};

// Enhanced Event Details Modal Component
interface EventDetailsModalProps {
    event: any;
    isOpen: boolean;
    onClose: () => void;
    onRSVPStatusChange?: (status: 'confirmed' | 'cancelled' | null) => void;
}

export const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ event, isOpen, onClose, onRSVPStatusChange }) => {
    const [rsvpStage, setRsvpStage] = useState<'initial' | 'processing' | 'confirmed' | 'cancelled'>('initial');
    const [showOtherTimes, setShowOtherTimes] = useState(false);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(0);
    const [showCancelAlert, setShowCancelAlert] = useState(false);
    
    // Reset RSVP stage when modal opens
    useEffect(() => {
        if (isOpen) {
            setRsvpStage('initial');
            setShowOtherTimes(false);
            setSelectedTimeSlot(0);
            setShowCancelAlert(false);
        }
    }, [isOpen]);
    
    if (!event) return null;

    const rsvpState = getRandomRSVPState(event.id);
    const rsvpConfig = rsvpStateConfig[rsvpState];

    // Sample recurring event time slots
    const recurringTimeSlots = [
        { id: 0, date: "March 22, 2024", time: "7:00 PM - 10:00 PM", attendees: 75, maxAttendees: 150, status: "Available" },
        { id: 1, date: "April 5, 2024", time: "7:00 PM - 10:00 PM", attendees: 45, maxAttendees: 150, status: "Available" },
        { id: 2, date: "April 19, 2024", time: "7:00 PM - 10:00 PM", attendees: 89, maxAttendees: 150, status: "Available" },
        { id: 3, date: "May 3, 2024", time: "7:00 PM - 10:00 PM", attendees: 150, maxAttendees: 150, status: "Full" },
        { id: 4, date: "May 17, 2024", time: "7:00 PM - 10:00 PM", attendees: 23, maxAttendees: 150, status: "Available" },
        { id: 5, date: "May 31, 2024", time: "7:00 PM - 10:00 PM", attendees: 67, maxAttendees: 150, status: "Available" }
    ];

    const handleOtherTimesClick = () => {
        setShowOtherTimes(true);
    };

    const handleBackToEvent = () => {
        setShowOtherTimes(false);
    };

    const handleTimeSlotSelect = (timeSlotId: number) => {
        setSelectedTimeSlot(timeSlotId);
        setShowOtherTimes(false);
    };

    const currentEventData = showOtherTimes ? event : {
        ...event,
        date: recurringTimeSlots[selectedTimeSlot].date,
        time: recurringTimeSlots[selectedTimeSlot].time,
        attendees: recurringTimeSlots[selectedTimeSlot].attendees,
        maxAttendees: recurringTimeSlots[selectedTimeSlot].maxAttendees
    };

    const handleRSVPClick = () => {
        if (rsvpState === 'open') {
            setRsvpStage('processing');
            
            // Simulate processing time
            setTimeout(() => {
                setRsvpStage('confirmed');
                onRSVPStatusChange?.('confirmed');
            }, 2500);
        }
    };

    const handleEventPageClick = () => {
        window.open(`/site/event/${event.id}`, '_blank');
        // Keep modal open - don't call onClose()
    };

    const handleCancelRSVP = () => {
        setRsvpStage('cancelled');
        setShowCancelAlert(false);
        onRSVPStatusChange?.('cancelled');
    };

    const handleKeepSpot = () => {
        setShowCancelAlert(false);
    };

    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
            <div 
                className="fixed inset-0 flex items-center justify-center p-4 max-md:p-4"
                onClick={onClose}
            >
                <div 
                    className="w-[60vw] h-[80vh] max-xl:w-[75vw] max-xl:h-[85vh] max-lg:w-[85vw] max-lg:h-[90vh] max-md:w-[calc(100vw-2rem)] max-md:h-[calc(100vh-2rem)] relative"
                    onClick={(e) => e.stopPropagation()}
                >
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
                    <div className="bg-white rounded-3xl max-md:rounded-2xl shadow-2xl flex h-full max-md:flex-col relative overflow-hidden">

                        {showOtherTimes ? (
                            /* Full Width Time Slots View */
                            <div className="w-full flex flex-col min-h-0">
                                <div className="px-6 pb-3 pt-6 flex-shrink-0 bg-gray-50 border-b border-gray-100">
                                    <div className="flex items-center gap-4 mb-3">
                                        <Button
                                            size="sm"
                                            color="tertiary"
                                            iconLeading={ArrowRight}
                                            onClick={handleBackToEvent}
                                            className="!p-2 !w-8 !h-8 rotate-180"
                                        />
                                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                            <img
                                                src={event.image}
                                                alt={event.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-lg font-semibold text-gray-900 truncate">{event.title}</h3>
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 rounded-full overflow-hidden">
                                                    <img 
                                                        src={event.organizer.avatar} 
                                                        alt={event.organizer.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <span className="text-sm text-gray-600">Hosted by {event.organizer.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex-1 overflow-y-auto p-6 pt-4 modal-scrollbar" style={scrollbarStyles}>
                                    <div className="max-w-2xl mx-auto">
                                        <div className="mb-2">
                                            <h4 className="text-sm font-medium text-gray-900 ">Pick your session date:</h4>                                        </div>
                                        <div className="grid gap-4 grid-cols-1">
                                            {recurringTimeSlots.map((timeSlot) => (
                                                <div 
                                                    key={timeSlot.id}
                                                    className={`cursor-pointer transition-all duration-200 rounded-xl p-4 ${
                                                        timeSlot.status === 'Full' 
                                                            ? 'opacity-60 cursor-not-allowed border border-gray-200'
                                                            : selectedTimeSlot === timeSlot.id
                                                            ? 'border-2 border-brand-solid bg-brand-50'
                                                            : 'border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                                                    }`}
                                                    onClick={() => timeSlot.status !== 'Full' && handleTimeSlotSelect(timeSlot.id)}
                                                >
                                                    <div className="flex items-center gap-3 relative">
                                                        <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex flex-col items-center justify-center text-center shadow-sm">
                                                            <div className="text-xs text-gray-500 leading-none">
                                                                {new Date(timeSlot.date).toLocaleDateString('en-US', { month: 'short' })}
                                                            </div>
                                                            <div className="text-sm font-semibold text-gray-900 leading-none">
                                                                {new Date(timeSlot.date).getDate()}
                                                            </div>
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="font-medium text-gray-900 text-base">{timeSlot.date}</div>
                                                            <div className="text-sm text-gray-600">{timeSlot.time}</div>
                                                        </div>
                                                        <div className="absolute top-0 right-0 flex gap-1 items-center">
                                                            <div className="flex gap-1 items-center">
                                                                {timeSlot.id === 0 && (
                                                                    <Badge 
                                                                        type="pill-color" 
                                                                        color="brand" 
                                                                        size="sm"
                                                                    >
                                                                        Next session
                                                                    </Badge>
                                                                )}
                                                                {selectedTimeSlot === timeSlot.id && (
                                                                    <Badge 
                                                                        type="pill-color" 
                                                                        color="blue" 
                                                                        size="sm"
                                                                    >
                                                                        Your choice
                                                                    </Badge>
                                                                )}
                                                                {timeSlot.status === 'Full' && (
                                                                    <Badge 
                                                                        type="pill-color" 
                                                                        color="gray" 
                                                                        size="sm"
                                                                    >
                                                                        Full
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                            <div onClick={(e) => e.stopPropagation()}>
                                                                <Dropdown.Root>
                                                                    <Dropdown.DotsButton className="!w-6 !h-6 !p-1" />
                                                                    <Dropdown.Popover>
                                                                        <Dropdown.Menu>
                                                                            <Dropdown.Item key="disable" icon={MinusCircle}>
                                                                                Disable this session
                                                                            </Dropdown.Item>
                                                                            <Dropdown.Item key="share" icon={Share07}>
                                                                                Share this session
                                                                            </Dropdown.Item>
                                                                        </Dropdown.Menu>
                                                                    </Dropdown.Popover>
                                                                </Dropdown.Root>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Desktop: Left Column - Image + Basic Info */}
                                <div className="w-3/8 max-lg:w-2/5 md:flex max-md:hidden bg-gray-50 relative flex-col min-h-0">
                                    <div className="flex flex-col h-full">
                                        <div className="p-6 max-lg:p-4 flex-shrink-0 flex justify-center">
                                            <div className="w-[75%] aspect-square shadow-3xl rounded-3xl ring-1 ring-secondary_alt p-1">
                                                <img
                                                    src={event.image}
                                                    alt={event.title}
                                                    className="w-full h-full object-cover rounded-3xl"
                                                />
                                            </div>
                                        </div>
                                        
                                        {/* Basic Event Info */}
                                        <div 
                                            className="px-5 max-lg:px-4 max-md:px-4 space-y-4 max-lg:space-y-4 max-md:space-y-3 flex-1 overflow-y-auto min-h-0 modal-scrollbar pb-2 max-md:pb-1" 
                                            style={scrollbarStyles}
                                        >
                                            <div className="space-y-1">
                                                {/* Event Title */}
                                                <h1 className="text-2xl max-lg:text-xl max-md:text-lg font-bold leading-tight text-gray-900">
                                                    {currentEventData.title}
                                                </h1>
                                            
                                                {/* Host */}
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <div className="w-4 h-4 max-md:w-6 max-md:h-6 rounded-full overflow-hidden">
                                                        <img 
                                                            src={currentEventData.organizer.avatar} 
                                                            alt={currentEventData.organizer.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <span className="text-sm max-md:text-base">Hosted by {currentEventData.organizer.name}</span>
                                                </div>
                                            </div>
                                            
                                            {/* Date & Time and Location Cards - Only show before RSVP and not in time selection */}
                                            {rsvpStage === 'initial' && !showOtherTimes && (
                                                <div className="space-y-3">
                                                    {/* Recurring Event Badge - Only show for recurring events */}
                                                    {event.isRecurring && !showOtherTimes && (
                                                        <div>
                                                            <BadgeWithIcon type="pill-color" color="brand" size="sm" iconLeading={Repeat03}>
                                                                Repeats {event.recurringFrequency}
                                                            </BadgeWithIcon>
                                                        </div>
                                                    )}
                                                    
                                                    {/* Date & Time Card */}
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-10 h-10 bg-white rounded-lg border border-gray-200 flex flex-col items-center justify-center text-center shadow-sm">
                                                            <div className="text-xs text-gray-500 leading-none">
                                                                {new Date(currentEventData.date).toLocaleDateString('en-US', { month: 'short' })}
                                                            </div>
                                                            <div className="text-xs font-semibold text-gray-900 leading-none">
                                                                {new Date(currentEventData.date).getDate()}
                                                            </div>
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2">
                                                                <div className="font-medium text-gray-900 text-sm">{currentEventData.date}</div>
                                                                {event.isRecurring && !showOtherTimes && (
                                                                    <button 
                                                                        onClick={handleOtherTimesClick}
                                                                        className="text-brand-secondary hover:text-brand-secondary_hover hover:underline text-xs font-medium flex items-center gap-1 cursor-pointer"
                                                                    >
                                                                        <ClockRefresh className="w-3 h-3" />
                                                                        Change date 
                                                                    </button>
                                                                )}
                                                            </div>
                                                            <div className="text-xs text-gray-600">{currentEventData.time}</div>
                                                        </div>
                                                    </div>

                                                    {/* Location Card */}
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-10 h-10 bg-white rounded-lg border border-gray-200 flex items-center justify-center shadow-sm">
                                                            {event.locationType === "virtual" ? (
                                                                <VideoRecorder className="h-4 w-4 text-gray-500" />
                                                            ) : event.locationType === "hybrid" ? (
                                                                <div className="flex items-center -space-x-1">
                                                                    <MarkerPin01 className="h-3.5 w-3.5 bg-white text-gray-500" />
                                                                    <VideoRecorder className="h-3.5 w-3.5 bg-white text-gray-500" />
                                                                </div>
                                                            ) : (
                                                                <MarkerPin01 className="h-4 w-4 text-gray-500" />
                                                            )}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="font-medium text-gray-900 text-sm flex items-center gap-1">
                                                                {event.locationType === "virtual" ? "Virtual" : 
                                                                 event.locationType === "hybrid" ? (
                                                                    <span>{event.location} <span className="text-[0.7rem]">+ Virtual</span></span>
                                                                 ) :
                                                                 event.location}
                                                            </div>
                                                            <div className="text-xs text-gray-600">
                                                                {event.locationType === "virtual"
                                                                    ? "Event join link available after RSVP"
                                                                    : event.locationType === "hybrid" 
                                                                    ? "Details and links shown after RSVP"
                                                                    : "Full details available after RSVP"
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            
                                        </div>
                                    </div>
                                    
                                    {/* Action Buttons - Sticky Footer - Hide during time selection */}
                                    {!showOtherTimes && (
                                        <div className="border-t border-gray-200 flex-shrink-0">
                                            <div className="">
                                                {/* RSVP Section */}
                                                <div className="bg-gray-50 rounded-xl p-3 max-lg:p-3 max-md:p-4">
                                                    {rsvpStage === 'processing' ? (
                                                        <div className="text-center">
                                                            <div className="flex items-center justify-center gap-1 mb-1">
                                                                <div className="w-4 h-4 border-2 border-brand-600 border-t-transparent rounded-full animate-spin"></div>
                                                                <span className="text-sm font-medium text-brand-600">Processing RSVP...</span>
                                                            </div>
                                                            <p className="text-xs text-gray-500">Please wait while we confirm your attendance</p>
                                                        </div>
                                                    ) : rsvpStage === 'confirmed' ? (
                                                        <div className="bg-success-50 border border-success-200 rounded-xl p-4">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <CheckCircle className="w-4 h-4 text-success-600" />
                                                                <span className="text-sm font-medium text-success-700">You're All Set!</span>
                                                            </div>
                                                            <p className="text-xs text-success-600 mb-3">Your RSVP has been confirmed. Event details will be sent to your email.</p>
                                                            <div className="space-y-2">
                                                                <Button 
                                                                    size="sm" 
                                                                    color="secondary" 
                                                                    className="w-full"
                                                                    iconLeading={Calendar}
                                                                >
                                                                    Add to calendar
                                                                </Button>
                                                                <button
                                                                    className="w-full text-sm text-gray-500 hover:text-gray-700 underline transition-colors"
                                                                    onClick={() => setShowCancelAlert(true)}
                                                                >
                                                                    Not going?
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ) : rsvpStage === 'cancelled' ? (
                                                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                                                            <div className="text-center">
                                                                <p className="text-sm font-medium text-gray-900 mb-1">Registration cancelled</p>
                                                                <p className="text-xs text-gray-600 mb-3">You can RSVP again anytime if you change your mind.</p>
                                                                <Button 
                                                                    size="sm" 
                                                                    color="secondary" 
                                                                    className="w-full"
                                                                    onClick={() => setRsvpStage('initial')}
                                                                >
                                                                    RSVP Again
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ) : rsvpState === 'open' ? (
                                                        <div className="text-center">
                                                            <div className="mb-2">
                                                                <h4 className="text-sm max-lg:text-sm max-md:text-base text-gray-900">Ready to join?</h4>
                                                            </div>
                                                            <Button 
                                                                size="md" 
                                                                color="primary" 
                                                                className="w-full max-lg:text-sm max-md:text-base max-md:py-3"
                                                                onClick={handleRSVPClick}
                                                            >
                                                                {rsvpConfig.label}
                                                            </Button>
                                                        </div>
                                                    ) : (
                                                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                                                            <div className="text-center">
                                                                <p className="text-sm font-medium text-gray-900 mb-1">{rsvpConfig.label}</p>
                                                                <p className="text-xs text-gray-600">{rsvpState === 'closed' ? 'Registration has closed for this event.' : 'This event has already finished.'}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Desktop: Right Column - Content Cards - Only show when not selecting times */}
                                {!showOtherTimes && (
                                    <div className="w-5/8 max-lg:w-3/5 md:flex max-md:hidden flex-col min-h-0">
                                        {/* Sticky Header with Action Buttons */}
                                        <div className="sticky top-0 bg-white border-b border-gray-100 px-4 max-lg:px-3 max-md:px-4 py-3 max-md:py-4 z-10 flex justify-end max-md:justify-between items-center">
                                            <div className="flex items-center gap-1 flex-shrink-0">
                                                <button
                                                    className="hover:bg-gray-100 rounded-lg p-2 transition-colors"
                                                    title="Share Event"
                                                >
                                                    <Share07 className="h-4 w-4 text-gray-500" />
                                                </button>
                                                <button
                                                    onClick={handleEventPageClick}
                                                    className="hover:bg-gray-100 rounded-lg p-2 transition-colors"
                                                    title="Open in new tab"
                                                >
                                                    <LinkExternal01 className="h-4 w-4 text-gray-500" />
                                                </button>
                                                <Dropdown.Root>
                                                    <Dropdown.DotsButton />
                                                    <Dropdown.Popover>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item key="view-rsvp" icon={Users01}>
                                                                View RSVP
                                                            </Dropdown.Item>
                                                            <Dropdown.Item key="view-event" icon={Eye}>
                                                                View Event
                                                            </Dropdown.Item>
                                                            <Dropdown.Item key="edit-event" icon={Edit01}>
                                                                Edit Event
                                                            </Dropdown.Item>
                                                            <Dropdown.Item key="analytics" icon={TrendUp02}>
                                                                Event Analytics
                                                            </Dropdown.Item>
                                                            <Dropdown.Separator />
                                                            <Dropdown.Item key="delete" icon={Trash01} className="text-red-600">
                                                                Delete Event
                                                            </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown.Popover>
                                                </Dropdown.Root>
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
                                            className="p-4 max-lg:p-3 max-md:p-4 flex-1 overflow-y-auto space-y-4 max-lg:space-y-3 max-md:space-y-4 min-h-0 modal-scrollbar" 
                                            style={scrollbarStyles}
                                        >
                                            {rsvpStage === 'confirmed' ? (
                                                /* After RSVP - New Structured Layout */
                                                <>
                                                    {/* Success Message */}
                                                    <div className="p-3 max-md:p-3 pb-2">
                                                        <h3 className="text-lg max-md:text-xl font-medium text-gray-900">Registration confirmed</h3>
                                                    </div>
                                                    
                                                    {/* Event Information Title */}
                                                    <div className="p-3 max-md:p-3 pb-0 pt-0">
                                                        <div className="text-sm max-md:text-base text-gray-500 mb-3 max-md:mb-4">Event Information</div>
                                                    </div>
                                                    
                                                    {/* Event Data Cards */}
                                                    <div className="space-y-4 p-3 max-md:p-3 pt-0">
                                                        {/* Event Title & Host Card */}
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-10 h-10 bg-white rounded-lg border border-gray-200 flex items-center justify-center shadow-sm">
                                                                <Calendar className="h-4 w-4 text-gray-500" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <div className="font-medium text-gray-900 text-sm max-md:text-base">{event.title}</div>
                                                                <div className="text-xs max-md:text-sm text-gray-600">Hosted by {event.organizer.name}</div>
                                                            </div>
                                                        </div>

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

                                                        {/* Physical Location Card (for physical and hybrid) */}
                                                        {(event.locationType === "physical" || event.locationType === "hybrid") && (
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-10 h-10 bg-white rounded-lg border border-gray-200 flex items-center justify-center shadow-sm">
                                                                    <MarkerPin01 className="h-4 w-4 text-gray-500" />
                                                                </div>
                                                                <div className="flex-1">
                                                                    <div className="font-medium text-gray-900 text-sm flex items-center gap-1">
                                                                        {event.location}
                                                                    </div>
                                                                    <div className="text-xs text-gray-600">{event.fullAddress || "Main auditorium, accessible entrance available"}</div>
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Virtual Location Card (for virtual and hybrid) */}
                                                        {(event.locationType === "virtual" || event.locationType === "hybrid") && (
                                                            <div className="flex items-start gap-2">
                                                                <div className="w-10 h-10 bg-white rounded-lg border border-gray-200 flex items-center justify-center shadow-sm">
                                                                    <VideoRecorder className="h-4 w-4 text-gray-500" />
                                                                </div>
                                                                <div className="flex-1">
                                                                    <div className="font-medium text-gray-900 text-sm flex items-center gap-1">
                                                                        Virtual links
                                                                    </div>
                                                                    <div className="text-xs text-gray-600 space-y-0">
                                                                        {/* Zoom Link */}
                                                                        <a 
                                                                            href="https://zoom.us/j/123456789" 
                                                                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors group"
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                        >
                                                                            <img 
                                                                                src="https://zoom.us/favicon.ico" 
                                                                                alt="Zoom" 
                                                                                className="w-3 h-3"
                                                                                onError={(e) => {
                                                                                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIiByeD0iMiIgZmlsbD0iIzAwNzNFNiIvPgo8cGF0aCBkPSJNMyw0aDZWOEgzVjRaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4=';
                                                                                }}
                                                                            />
                                                                            <span className="text-xs">https://zoom.us/j/123456789</span>
                                                                            <Share04 className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                                                                        </a>
                                                                        
                                                                        {/* Google Meet Link */}
                                                                        <a 
                                                                            href="https://meet.google.com/abc-defg-hij" 
                                                                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors group"
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                        >
                                                                            <img 
                                                                                src="https://meet.google.com/favicon.ico" 
                                                                                alt="Google Meet" 
                                                                                className="w-3 h-3"
                                                                                onError={(e) => {
                                                                                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIiByeD0iMiIgZmlsbD0iIzM0QTg1MyIvPgo8cGF0aCBkPSJNNCw2aDhWMTBINFY2WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+';
                                                                                }}
                                                                            />
                                                                            <span className="text-xs">https://meet.google.com/abc-defg-hij</span>
                                                                            <Share04 className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                                                                        </a>
                                                                        
                                                                        {/* YouTube Link */}
                                                                        <a 
                                                                            href="https://youtube.com/watch?v=dQw4w9WgXcQ" 
                                                                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors group"
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                        >
                                                                            <img 
                                                                                src="https://youtube.com/favicon.ico" 
                                                                                alt="YouTube" 
                                                                                className="w-3 h-3"
                                                                                onError={(e) => {
                                                                                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIiByeD0iMiIgZmlsbD0iI0ZGMDAwMCIvPgo8cGF0aCBkPSJNNSw0VjhMOCw2TDUsNFoiIGZpbGw9IndoaXRlIi8+PC9zdmc+';
                                                                                }}
                                                                            />
                                                                            <span className="text-xs">https://youtube.com/watch?v=dQw4w9WgXcQ</span>
                                                                            <Share04 className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    
                                                    {/* Interactive Map */}
                                                    {event.type !== "online" && event.coordinates && (
                                                        <div className="px-3 max-md:px-2">
                                                            <EventMap
                                                                location={event.location}
                                                                latitude={event.coordinates.latitude}
                                                                longitude={event.coordinates.longitude}
                                                            />
                                                        </div>
                                                    )}

                                                    {/* Event Details Section */}
                                                    <div className="p-3 max-md:p-2">
                                                        <div className="text-sm text-gray-500 mb-3">Event Details</div>
                                                        <div className="space-y-3 text-sm text-gray-700">
                                                            <div className="flex items-start gap-2">
                                                                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                                                <p>Free snacks and drinks will be provided throughout the event</p>
                                                            </div>
                                                            <div className="flex items-start gap-2">
                                                                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                                                <p>Networking opportunities with fellow music enthusiasts and industry professionals</p>
                                                            </div>
                                                            <div className="flex items-start gap-2">
                                                                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                                                <p>Live showcases from new and emerging artists</p>
                                                            </div>
                                                            <div className="flex items-start gap-2">
                                                                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                                                <p>Discussion panels on latest music trends and industry insights</p>
                                                            </div>
                                                            <div className="flex items-start gap-2">
                                                                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                                                <p>Please arrive 15 minutes early for check-in and setup</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* About Event Section (Collapsible) */}
                                                    <CollapsibleAboutEvent description={event.description} />
                                                </>
                                            ) : (
                                                /* Before RSVP - Original Layout */
                                                <>
                                                    {/* About Event Card */}
                                                    <div className="p-3 max-md:p-2">
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
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        {/* Mobile: Single Column Layout */}
                        {!showOtherTimes && (
                            <div className="md:hidden flex flex-col h-full">
                                {/* Mobile Header */}
                                <div className="flex-shrink-0 border-b border-gray-100 px-4 py-4 flex justify-between items-center">
                                    <div className="flex-1 min-w-0 pr-3">
                                        <h2 className="text-base font-semibold text-gray-900 truncate leading-tight">
                                            {event.title}
                                        </h2>
                                    </div>
                                    
                                    <div className="flex items-center gap-0.5 flex-shrink-0">
                                        {/* Event Page Button */}
                                        <button
                                            onClick={handleEventPageClick}
                                            className="hover:bg-gray-100 rounded-lg p-3.5 transition-colors"
                                            title="View Event Page"
                                        >
                                            <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </button>

                                        {/* Share Button */}
                                        <button
                                            className="hover:bg-gray-100 rounded-lg p-3.5 transition-colors"
                                            title="Share Event"
                                        >
                                            <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                            </svg>
                                        </button>
                                        
                                        {/* Close Button */}
                                        <button
                                            onClick={onClose}
                                            className="hover:bg-gray-100 rounded-lg p-3.5 transition-colors"
                                            title="Close"
                                        >
                                            <X className="h-6 w-6 text-gray-500" />
                                        </button>
                                    </div>
                                </div>

                                {/* Mobile Content - Scrollable */}
                                <div className="flex-1 overflow-y-auto modal-scrollbar" style={scrollbarStyles}>
                                    {/* Mobile Image Section */}
                                    <div className="p-4">
                                        <div className="w-full aspect-square">
                                            <img
                                                src={event.image}
                                                alt={event.title}
                                                className="w-full h-full object-cover rounded-2xl"
                                            />
                                        </div>
                                    </div>

                                    {/* Mobile Event Info */}
                                    <div className="px-4 pb-4">
                                        <div className="space-y-3">
                                            {/* Title & Host */}
                                            <div className="space-y-2">
                                                <h1 className="text-2xl font-bold leading-tight text-gray-900">
                                                    {event.title}
                                                </h1>
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <div className="w-6 h-6 rounded-full overflow-hidden">
                                                        <img 
                                                            src={event.organizer.avatar} 
                                                            alt={event.organizer.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <span className="text-base">Hosted by {event.organizer.name}</span>
                                                </div>
                                                
                                                {/* Next Event Info - Only show for recurring events */}
                                                {event.isRecurring && (
                                                    <div className="text-base text-brand-solid font-medium">
                                                        Next Event: {event.date}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Date & Time and Location Cards - Only show before RSVP and not in time selection */}
                                            {rsvpStage === 'initial' && !showOtherTimes && (
                                                <div className="space-y-4">
                                                    {/* Date & Time Card */}
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex flex-col items-center justify-center text-center shadow-sm">
                                                            <div className="text-xs text-gray-500 leading-none">
                                                                {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                                                            </div>
                                                            <div className="text-sm font-semibold text-gray-900 leading-none">
                                                                {new Date(event.date).getDate()}
                                                            </div>
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2">
                                                                <div className="font-medium text-gray-900 text-base">{event.date}</div>
                                                                {event.isRecurring && !showOtherTimes && (
                                                                    <button 
                                                                        onClick={handleOtherTimesClick}
                                                                        className="text-brand-secondary hover:text-brand-secondary_hover hover:underline text-sm font-medium flex items-center gap-1 cursor-pointer"
                                                                    >
                                                                        <ClockRefresh className="w-3.5 h-3.5" />
                                                                        Change date 
                                                                    </button>
                                                                )}
                                                            </div>
                                                            <div className="text-sm text-gray-600">{event.time}</div>
                                                        </div>
                                                    </div>

                                                    {/* Location Card */}
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center shadow-sm">
                                                            {event.type === "online" ? (
                                                                <Link01 className="h-5 w-5 text-gray-500" />
                                                            ) : (
                                                                <MarkerPin01 className="h-5 w-5 text-gray-500" />
                                                            )}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="font-medium text-gray-900 text-base flex items-center gap-1">
                                                                {event.location}
                                                                <svg className="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l10-10M17 7H7v10" />
                                                                </svg>
                                                            </div>
                                                            <div className="text-sm text-gray-600">
                                                                {event.type === "online" 
                                                                    ? "Event join link available after RSVP" 
                                                                    : "Full details available after RSVP"
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Confirmation Message (when RSVP confirmed) */}
                                            {rsvpStage === 'confirmed' && (
                                                <div className="bg-success-50 border border-success-200 rounded-xl p-4">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <CheckCircle className="w-5 h-5 text-success-600" />
                                                        <span className="text-base font-medium text-success-700">You're All Set!</span>
                                                    </div>
                                                    <p className="text-sm text-success-600">Your RSVP has been confirmed. Event details will be sent to your email.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Mobile Content Sections */}
                                    <div className="space-y-4 px-4 pb-4">
                                        {rsvpStage === 'confirmed' ? (
                                            /* After RSVP - Mobile Structured Layout */
                                            <>
                                                {/* Success Message */}
                                                <div className="pb-2">
                                                    <h3 className="text-xl font-medium text-gray-900">Registration confirmed</h3>
                                                </div>
                                                
                                                {/* Event Information Title */}
                                                <div className="pb-0">
                                                    <div className="text-base text-gray-500 mb-4">Event Information</div>
                                                </div>
                                                
                                                {/* Event Data Cards */}
                                                <div className="space-y-4">
                                                    {/* Event Title & Host Card */}
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center shadow-sm">
                                                            <Calendar className="h-5 w-5 text-gray-500" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="font-medium text-gray-900 text-base">{event.title}</div>
                                                            <div className="text-sm text-gray-600">Hosted by {event.organizer.name}</div>
                                                        </div>
                                                    </div>

                                                    {/* Date & Time Card */}
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex flex-col items-center justify-center text-center shadow-sm">
                                                            <div className="text-xs text-gray-500 leading-none">
                                                                {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                                                            </div>
                                                            <div className="text-sm font-semibold text-gray-900 leading-none">
                                                                {new Date(event.date).getDate()}
                                                            </div>
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="font-medium text-gray-900 text-base">{event.date}</div>
                                                            <div className="text-sm text-gray-600">{event.time}</div>
                                                        </div>
                                                    </div>

                                                    {/* Location */}
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center shadow-sm">
                                                            {event.type === "online" ? (
                                                                <Link01 className="h-5 w-5 text-gray-500" />
                                                            ) : (
                                                                <MarkerPin01 className="h-5 w-5 text-gray-500" />
                                                            )}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="font-medium text-gray-900 text-base flex items-center gap-1">
                                                                {event.location}
                                                                <svg className="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l10-10M17 7H7v10" />
                                                                </svg>
                                                            </div>
                                                            <div className="text-sm text-gray-600">{event.fullAddress}</div>
                                                            <div className="text-sm text-gray-600">
                                                                {event.type === "online" 
                                                                    ? (
                                                                        <a 
                                                                            href="https://zoom.us/j/123456789" 
                                                                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors group"
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                        >
                                                                            <img 
                                                                                src="https://zoom.us/favicon.ico" 
                                                                                alt="Zoom" 
                                                                                className="w-4 h-4"
                                                                                onError={(e) => {
                                                                                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiByeD0iMiIgZmlsbD0iIzAwNzNFNiIvPgo8cGF0aCBkPSJNNCw2aDhWMTBINFY2WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+';
                                                                                }}
                                                                            />
                                                                            <span className="text-sm">https://zoom.us/j/123456789</span>
                                                                            <Share04 className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                                                                        </a>
                                                                    )
                                                                    : "Main auditorium, accessible entrance available"
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                {/* Interactive Map */}
                                                {event.type !== "online" && event.coordinates && (
                                                    <div>
                                                        <EventMap
                                                            location={event.location}
                                                            latitude={event.coordinates.latitude}
                                                            longitude={event.coordinates.longitude}
                                                        />
                                                    </div>
                                                )}

                                                {/* Event Details Section */}
                                                <div>
                                                    <div className="text-base text-gray-500 mb-4">Event Details</div>
                                                    <div className="space-y-3 text-sm text-gray-700">
                                                        <div className="flex items-start gap-2">
                                                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                                            <p>Free snacks and drinks will be provided throughout the event</p>
                                                        </div>
                                                        <div className="flex items-start gap-2">
                                                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                                            <p>Networking opportunities with fellow music enthusiasts and industry professionals</p>
                                                        </div>
                                                        <div className="flex items-start gap-2">
                                                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                                            <p>Live showcases from new and emerging artists</p>
                                                        </div>
                                                        <div className="flex items-start gap-2">
                                                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                                            <p>Discussion panels on latest music trends and industry insights</p>
                                                        </div>
                                                        <div className="flex items-start gap-2">
                                                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                                            <p>Please arrive 15 minutes early for check-in and setup</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* About Event Section (Collapsible) */}
                                                <CollapsibleAboutEvent description={event.description} />
                                            </>
                                        ) : (
                                            /* Before RSVP - Mobile Original Layout */
                                            <>
                                                {/* About Event Card */}
                                                <div>
                                                    <div className="text-base text-gray-500 mb-4">About Event</div>
                                                    <div className="prose prose-gray max-w-none">
                                                        <p className="text-gray-700 leading-relaxed text-base mb-4">
                                                            {event.description}
                                                        </p>
                                                        <p className="text-gray-700 leading-relaxed text-base mb-4">
                                                            Join us for an immersive experience that brings together industry leaders, innovative thinkers, and passionate professionals. This carefully curated event is designed to foster meaningful connections, share cutting-edge insights, and explore the latest trends shaping our industry.
                                                        </p>
                                                        <p className="text-gray-700 leading-relaxed text-base mb-4">
                                                            Whether you're looking to expand your network, gain new perspectives, or simply enjoy engaging conversations with like-minded individuals, this event offers something valuable for everyone. Our speakers and participants represent diverse backgrounds and expertise levels, creating a rich environment for learning and collaboration.
                                                        </p>
                                                        <p className="text-gray-700 leading-relaxed text-base">
                                                            Don't miss this opportunity to be part of a dynamic community that's driving positive change and innovation. Reserve your spot today and prepare for an inspiring and transformative experience.
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Location Card */}
                                                <div>
                                                    <div className="text-base text-gray-500 mb-4">Location</div>
                                                    <div className="space-y-3">
                                                        <div>
                                                            <div className="font-medium text-gray-900 text-base">{event.location}</div>
                                                            <div className="text-base text-gray-600 mt-1">
                                                                {event.type === "online" 
                                                                    ? "Join link will be sent before the event" 
                                                                    : "Full address will be provided after registration"
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Mobile Footer - Hide during time selection */}
                                {!showOtherTimes && (
                                    <div className="flex-shrink-0 border-t border-gray-200">
                                        <div className="bg-gray-50 rounded-xl p-4">
                                            {rsvpStage === 'processing' ? (
                                                <div className="text-center">
                                                    <div className="flex items-center justify-center gap-1 mb-1">
                                                        <div className="w-4 h-4 border-2 border-brand-600 border-t-transparent rounded-full animate-spin"></div>
                                                        <span className="text-base font-medium text-brand-600">Processing RSVP...</span>
                                                    </div>
                                                    <p className="text-sm text-gray-500">Please wait while we confirm your attendance</p>
                                                </div>
                                            ) : rsvpStage === 'confirmed' ? (
                                                <div className="bg-success-50 border border-success-200 rounded-xl p-4">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <CheckCircle className="w-5 h-5 text-success-600" />
                                                        <span className="text-base font-medium text-success-700">You're All Set!</span>
                                                    </div>
                                                    <p className="text-sm text-success-600 mb-3">Your RSVP has been confirmed. Event details will be sent to your email.</p>
                                                    <div className="space-y-2">
                                                        <Button 
                                                            size="sm" 
                                                            color="secondary" 
                                                            className="w-full text-base py-3"
                                                            iconLeading={Calendar}
                                                        >
                                                            Add to calendar
                                                        </Button>
                                                        <button
                                                            className="w-full text-sm text-gray-500 hover:text-gray-700 underline transition-colors"
                                                            onClick={() => setShowCancelAlert(true)}
                                                        >
                                                            Not going?
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : rsvpStage === 'cancelled' ? (
                                                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                                                    <div className="text-center">
                                                        <p className="text-base font-medium text-gray-900 mb-1">Registration cancelled</p>
                                                        <p className="text-sm text-gray-600 mb-3">You can RSVP again anytime if you change your mind.</p>
                                                        <Button 
                                                            size="sm" 
                                                            color="secondary" 
                                                            className="w-full text-base py-3"
                                                            onClick={() => setRsvpStage('initial')}
                                                        >
                                                            RSVP Again
                                                        </Button>
                                                    </div>
                                                </div>
                                            ) : rsvpState === 'open' ? (
                                                <div className="text-center">
                                                    <div className="mb-3">
                                                        <h4 className="text-base font-medium text-gray-900 mb-1">Ready to join?</h4>
                                                        <p className="text-sm text-gray-600">Secure your spot at this event</p>
                                                    </div>
                                                    <Button 
                                                        size="md" 
                                                        color="primary" 
                                                        className="w-full text-base py-3"
                                                        onClick={handleRSVPClick}
                                                    >
                                                        {rsvpConfig.label}
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                                                    <div className="text-center">
                                                        <p className="text-base font-medium text-gray-900 mb-1">{rsvpConfig.label}</p>
                                                        <p className="text-sm text-gray-600">{rsvpState === 'closed' ? 'Registration has closed for this event.' : 'This event has already finished.'}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Cancel Confirmation Alert Modal */}
            {showCancelAlert && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div 
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setShowCancelAlert(false)}
                    />
                    <div 
                        className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Are you sure you don't want to attend this event?
                        </h3>
                        <p className="text-sm text-gray-600 mb-6">
                            This will cancel your registration and free up your spot for others.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <Button
                                size="md"
                                color="secondary"
                                onClick={handleCancelRSVP}
                            >
                                Yes, cancel
                            </Button>
                            <Button
                                size="md"
                                color="primary"
                                onClick={handleKeepSpot}
                            >
                                Keep my spot
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
