import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { Calendar, Clock, VideoRecorder, MarkerPin01, Check, Users01, X, Plus, ArrowRight, ChevronDown, ChevronUp, Download01, Link01, Share04, Repeat03, Share07, LinkExternal01, DotsHorizontal, Eye, Edit01, Trash01, TrendUp02, BarChartSquare02, MinusCircle, ClockRefresh, MessageChatCircle, User01 } from '@untitledui/icons';
import EventMap from '../../base/map/event-map';
import { ModalOverlay, Modal, Dialog } from './modal';
import { Button } from '../../base/buttons/button';
import { Badge, BadgeWithIcon } from '../../base/badges/badges';
import { Dropdown } from '../../base/dropdown/dropdown';
import { useNavigate } from 'react-router';

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
        <div className="">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">About Event</div>
            <div className="prose prose-gray max-w-none">
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm whitespace-pre-line">
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
    const navigate = useNavigate();
    type RsvpStage = 'initial' | 'processing' | 'confirmed' | 'cancelled';
    const [rsvpStage, setRsvpStage] = useState<RsvpStage>('initial');
    const [showOtherTimes, setShowOtherTimes] = useState(false);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(0);
    const [showCancelAlert, setShowCancelAlert] = useState(false);
    const [showRecurringOptions, setShowRecurringOptions] = useState(false);
    const [rsvpType, setRsvpType] = useState<'single' | 'all' | null>(null);
    
    // Reset RSVP stage when modal opens
    useEffect(() => {
        if (isOpen) {
            setRsvpStage('initial');
            setShowOtherTimes(false);
            setSelectedTimeSlot(0);
            setShowCancelAlert(false);
            setShowRecurringOptions(false);
            setRsvpType(null);
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
        if (rsvpState === 'open' && !event.isRecurring) {
            // Non-recurring event - proceed with RSVP directly
            setRsvpStage('processing');
            
            // Simulate processing time
            setTimeout(() => {
                setRsvpStage('confirmed');
                onRSVPStatusChange?.('confirmed');
            }, 2500);
        }
        // For recurring events, dropdown opens automatically via Dropdown.Root
    };

    const handleRecurringRSVP = (type: 'single' | 'all') => {
        setShowRecurringOptions(false);
        setRsvpType(type);
        setRsvpStage('processing');
        
        // Simulate processing time
        setTimeout(() => {
            setRsvpStage('confirmed');
            onRSVPStatusChange?.('confirmed');
        }, 2500);
    };

    const handleEventPageClick = () => {
        window.open(`/site/event/${event.id}`, '_blank');
        // Keep modal open - don't call onClose()
    };

    const handleCancelRSVP = () => {
        setRsvpStage('initial');
        setShowCancelAlert(false);
        onRSVPStatusChange?.('cancelled');
    };

    const handleKeepSpot = () => {
        setShowCancelAlert(false);
    };

    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 z-50 bg-black/60 dark:bg-black/70 backdrop-blur-sm">
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
                        .dark .modal-scrollbar::-webkit-scrollbar-thumb {
                            background-color: #4b5563;
                        }
                        .dark .modal-scrollbar::-webkit-scrollbar-thumb:hover {
                            background-color: #6b7280;
                        }
                        `
                    }} />
                    <div className="bg-white dark:bg-gray-900 rounded-3xl max-md:rounded-2xl shadow-2xl flex h-full max-md:flex-col relative overflow-hidden">

                        {showOtherTimes ? (
                            /* Full Width Single Column View - for time slots */
                            <div className="w-full flex flex-col min-h-0">
                                <div className="px-6 py-4 flex-shrink-0 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700 dark:border-gray-700">
                                    <div className="flex items-center justify-between">
                                        {showOtherTimes && (
                                        <Button
                                            size="sm"
                                            color="tertiary"
                                            iconLeading={ArrowRight}
                                            onClick={handleBackToEvent}
                                            className="!p-2 !w-8 !h-8 rotate-180"
                                        />
                                        )}
                                        <div className="flex-1"></div>
                                        <div className="flex items-center gap-1 flex-shrink-0">
                                            <button
                                                className="hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors"
                                                title="Share Event"
                                            >
                                                <Share07 className="h-4 w-4 text-gray-500 dark:text-gray-400 dark:text-gray-400" />
                                            </button>
                                            <button
                                                onClick={handleEventPageClick}
                                                className="hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors"
                                                title="Open in new tab"
                                            >
                                                <LinkExternal01 className="h-4 w-4 text-gray-500 dark:text-gray-400 dark:text-gray-400" />
                                            </button>
                                            <button
                                                onClick={onClose}
                                                className="hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors"
                                                title="Close"
                                            >
                                                <X className="h-4 w-4 text-gray-500 dark:text-gray-400 dark:text-gray-400" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex-1 overflow-y-auto p-6 pt-4 modal-scrollbar" style={scrollbarStyles}>
                                    <div className="max-w-2xl mx-auto">
                                        {showOtherTimes ? (
                                            <>
                                                <div className="mb-4">
                                                    <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-1">Choose another date</h4>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">Your current selection: {recurringTimeSlots[selectedTimeSlot].date}</p>
                                                </div>
                                        <div className="grid gap-4 grid-cols-1">
                                            {recurringTimeSlots.map((timeSlot) => (
                                                <div 
                                                    key={timeSlot.id}
                                                    className={`cursor-pointer transition-all duration-200 rounded-xl p-4 ${
                                                        timeSlot.status === 'Full' 
                                                            ? 'opacity-60 cursor-not-allowed border border-gray-200 dark:border-gray-700 dark:border-gray-700'
                                                            : selectedTimeSlot === timeSlot.id
                                                            ? 'border-2 border-brand-solid bg-brand-50 dark:bg-brand-900/20 dark:border-brand-600'
                                                            : 'border border-gray-200 dark:border-gray-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
                                                    }`}
                                                    onClick={() => timeSlot.status !== 'Full' && handleTimeSlotSelect(timeSlot.id)}
                                                >
                                                    <div className="flex items-center gap-3 relative">
                                                        <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 dark:border-gray-700 flex flex-col items-center justify-center text-center shadow-sm">
                                                            <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 leading-none">
                                                                {new Date(timeSlot.date).toLocaleDateString('en-US', { month: 'short' })}
                                                            </div>
                                                            <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 dark:text-gray-100 leading-none">
                                                                {new Date(timeSlot.date).getDate()}
                                                            </div>
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="font-medium text-gray-900 dark:text-gray-100 dark:text-gray-100 text-base mb-1">{timeSlot.date}</div>
                                                            <div className="text-xs text-gray-600 dark:text-gray-400 dark:text-gray-400 flex items-center gap-1">
                                                                <span>{timeSlot.time}</span>
                                                                <span>•</span>
                                                                {event.locationType === "virtual" ? (
                                                                    <span className="flex items-center gap-1">
                                                                        <VideoRecorder className="h-3.5 w-3.5" />
                                                                        <span>Virtual</span>
                                                                    </span>
                                                                ) : event.locationType === "hybrid" ? (
                                                                    <span className="flex items-center gap-1">
                                                                        <MarkerPin01 className="h-3.5 w-3.5" />
                                                                        <span>{event.location} + Virtual</span>
                                                                    </span>
                                                                ) : (
                                                                    <span className="flex items-center gap-1">
                                                                        <MarkerPin01 className="h-3.5 w-3.5" />
                                                                        <span>{event.location}</span>
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="absolute top-0 right-0 flex gap-1 items-center">
                                                            <div className="flex gap-1 items-center">
                                                                {timeSlot.id === 0 && timeSlot.status !== 'Full' && (
                                                                    <Badge 
                                                                        type="pill-color" 
                                                                        color="brand" 
                                                                        size="sm"
                                                                    >
                                                                        Next available
                                                                    </Badge>
                                                                )}
                                                                {selectedTimeSlot === timeSlot.id && (
                                                                    <Badge 
                                                                        type="pill-color" 
                                                                        color="blue" 
                                                                        size="sm"
                                                                    >
                                                                        Your current choice
                                                                    </Badge>
                                                                )}
                                                                {timeSlot.status === 'Full' && (
                                                                    <Badge 
                                                                        type="pill-color" 
                                                                        color="gray" 
                                                                        size="sm"
                                                                    >
                                                                        Fully registered
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
                                            </>
                                        ) : (
                                            /* After RSVP Confirmed - Single Column View */
                                            <>
                                                {/* Welcome Message */}
                                                <div className="mb-10">
                                                    <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">Dear John Smith,</h3>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Thank you for registering! We're excited to have you join us at this event.</p>
                                                </div>

                                                {/* Event Title & Cover */}
                                                <div className="mb-10">
                                                    <div className="flex items-start gap-4">
                                                        <div className="w-48 h-48 rounded-xl overflow-hidden flex-shrink-0">
                                                            <img
                                                                src={event.image}
                                                                alt={event.title}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <div className="flex-1 min-w-0 space-y-3">
                                                            {/* Success Message */}
                                                            <div className="bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-700 rounded-xl p-3">
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <CheckCircle className="w-4 h-4 text-success-600 dark:text-success-400" />
                                                                    <span className="text-sm font-semibold text-success-700 dark:text-success-300">Registration confirmed</span>
                                                                </div>
                                                                <p className="text-xs text-success-600 dark:text-success-400">Your RSVP has been confirmed. Event details have been sent to your email.</p>
                                                            </div>

                                                            <div>
                                                                <div className="font-semibold text-gray-900 dark:text-gray-100 text-base mb-2 leading-snug">{event.title}</div>
                                                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                                    {event.organizers && event.organizers.length > 1 ? (
                                                                        <>
                                                                            {/* Avatar Group */}
                                                                            <div className="flex -space-x-1.5">
                                                                                {event.organizers.map((org: any, index: number) => (
                                                                                    <div
                                                                                        key={index}
                                                                                        className="w-4 h-4 rounded-full border border-white overflow-hidden ring-1 ring-gray-200 dark:ring-gray-600"
                                                                                        style={{ zIndex: event.organizers.length - index }}
                                                                                    >
                                                                                        <img
                                                                                            src={org.avatar}
                                                                                            alt={org.name}
                                                                                            className="w-full h-full object-cover"
                                                                                            onError={(e) => {
                                                                                                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(org.name)}&background=667eea&color=fff&size=128`;
                                                                                            }}
                                                                                        />
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                            <span className="text-sm">Hosted by {event.organizers.map((org: any) => org.name).join(' & ')}</span>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <div className="w-4 h-4 rounded-full overflow-hidden ring-1 ring-gray-200 dark:ring-gray-600">
                                                                                <img 
                                                                                    src={event.organizer.avatar} 
                                                                                    alt={event.organizer.name}
                                                                                    className="w-full h-full object-cover"
                                                                                    onError={(e) => {
                                                                                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(event.organizer.name)}&background=667eea&color=fff&size=128`;
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                            <span className="text-sm">Hosted by {event.organizer.name}</span>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            {/* Quick Actions */}
                                                            <div className="flex gap-2">
                                                                <Button 
                                                                    size="sm" 
                                                                    color="secondary" 
                                                                    className="flex-1"
                                                                    iconLeading={Calendar}
                                                                >
                                                                    Add to calendar
                                                                </Button>
                                                                <button
                                                                    className="flex-1 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:text-gray-300 underline transition-colors"
                                                                    onClick={() => setShowCancelAlert(true)}
                                                                >
                                                                    Can't make it? Cancel registration
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Event Information Section */}
                                                <div className="mb-6">
                                                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Event Information</h4>
                                                    <div className="space-y-4">

                                                        {/* Date & Time Card */}
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center shadow-sm">
                                                                {rsvpType === 'all' && event.isRecurring ? (
                                                                    <Repeat03 className="h-5 w-5 text-brand-solid" />
                                                                ) : (
                                                                    <>
                                                                        <div className="text-xs text-gray-500 dark:text-gray-400 leading-none">
                                                                            {new Date(currentEventData.date).toLocaleDateString('en-US', { month: 'short' })}
                                                                        </div>
                                                                        <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-none mt-0.5">
                                                                            {new Date(currentEventData.date).getDate()}
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </div>
                                                            <div className="flex-1">
                                                                {rsvpType === 'all' && event.isRecurring ? (
                                                                    <>
                                                                        <div className="font-medium text-gray-900 dark:text-gray-100 text-base">All following events</div>
                                                                        <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                                                            {event.recurringFrequency} at {currentEventData.time}
                                                                            <br />
                                                                            6 sessions starting {currentEventData.date} until May 31, 2024
                                                                        </div>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <div className="font-medium text-gray-900 dark:text-gray-100 text-base">{currentEventData.date}</div>
                                                                        <div className="text-sm text-gray-600 dark:text-gray-400">{currentEventData.time}</div>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Physical Location Card (for physical and hybrid) */}
                                                        {(event.locationType === "physical" || event.locationType === "hybrid") && (
                                                            <div className="flex items-start gap-3">
                                                                <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center flex-shrink-0 shadow-sm">
                                                                    <MarkerPin01 className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="font-medium text-gray-900 dark:text-gray-100 text-base">
                                                                        {event.location}
                                                                    </div>
                                                                    <div className="text-sm text-gray-600 dark:text-gray-400">{event.fullAddress || "Main auditorium, accessible entrance available"}</div>
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Virtual Location Card (for virtual and hybrid) */}
                                                        {(event.locationType === "virtual" || event.locationType === "hybrid") && (
                                                            <div className="flex items-start gap-3">
                                                                <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center flex-shrink-0 shadow-sm">
                                                                    <VideoRecorder className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="font-medium text-gray-900 dark:text-gray-100 text-base mb-2">
                                                                        Virtual links
                                                                    </div>
                                                                    <div className="space-y-2">
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
                                                                                className="w-4 h-4"
                                                                                onError={(e) => {
                                                                                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIiByeD0iMiIgZmlsbD0iIzAwNzNFNiIvPgo8cGF0aCBkPSJNMyw0aDZWOEgzVjRaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4=';
                                                                                }}
                                                                            />
                                                                            <span className="text-xs truncate">zoom.us/j/123456789</span>
                                                                            <Share04 className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0" />
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
                                                                                className="w-4 h-4"
                                                                                onError={(e) => {
                                                                                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIiByeD0iMiIgZmlsbD0iIzM0QTg1MyIvPgo8cGF0aCBkPSJNNCw2aDhWMTBINFY2WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+';
                                                                                }}
                                                                            />
                                                                            <span className="text-xs truncate">meet.google.com/abc-defg-hij</span>
                                                                            <Share04 className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                                                                        </a>

                                                                        {/* Microsoft Teams Link */}
                                                                        <a 
                                                                            href="https://teams.microsoft.com/meet/abc123" 
                                                                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors group"
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                        >
                                                                            <img 
                                                                                src="https://teams.microsoft.com/favicon.ico" 
                                                                                alt="Microsoft Teams" 
                                                                                className="w-4 h-4"
                                                                                onError={(e) => {
                                                                                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIiByeD0iMiIgZmlsbD0iIzUwNTlDOSIvPgo8cGF0aCBkPSJNNCw0aDRWOEg0VjRaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4=';
                                                                                }}
                                                                            />
                                                                            <span className="text-xs truncate">teams.microsoft.com/meet/abc123</span>
                                                                            <Share04 className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                                                                        </a>

                                                                        {/* YouTube Stream Link */}
                                                                        <a 
                                                                            href="https://youtube.com/watch?v=dQw4w9WgXcQ" 
                                                                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors group"
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                        >
                                                                            <img 
                                                                                src="https://youtube.com/favicon.ico" 
                                                                                alt="YouTube" 
                                                                                className="w-4 h-4"
                                                                                onError={(e) => {
                                                                                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIiByeD0iMiIgZmlsbD0iI0ZGMDAwMCIvPgo8cGF0aCBkPSJNNSw0VjhMOCw2TDUsNFoiIGZpbGw9IndoaXRlIi8+PC9zdmc+';
                                                                                }}
                                                                            />
                                                                            <span className="text-xs truncate">youtube.com/watch?v=dQw4w9WgXcQ</span>
                                                                            <Share04 className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                                                                        </a>

                                                                        {/* Discord Link */}
                                                                        <a 
                                                                            href="https://discord.gg/xyz123" 
                                                                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors group"
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                        >
                                                                            <img 
                                                                                src="https://discord.com/favicon.ico" 
                                                                                alt="Discord" 
                                                                                className="w-4 h-4"
                                                                                onError={(e) => {
                                                                                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIiByeD0iMiIgZmlsbD0iIzU4NjVGMiIvPgo8cGF0aCBkPSJNNCw1aDRWN0g0VjVaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4=';
                                                                                }}
                                                                            />
                                                                            <span className="text-xs truncate">discord.gg/xyz123</span>
                                                                            <Share04 className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                        {/* Interactive Map */}
                        {event.type !== "online" && event.coordinates && (
                                                    <div className="mb-10">
                                                        <EventMap
                                                            location={event.location}
                                                            latitude={event.coordinates.latitude}
                                                            longitude={event.coordinates.longitude}
                                                        />
                                                    </div>
                                                )}
                                                {/* Event Details Section - Moved before About Event */}
                                                <div className="mb-6">
                                                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Event Details</h4>
                                                    <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                                                        <div className="flex items-start gap-2">
                                                            <div className="w-1.5 h-1.5 bg-brand-solid rounded-full mt-2 flex-shrink-0"></div>
                                                            <p>Free snacks and drinks will be provided throughout the event</p>
                                                        </div>
                                                        <div className="flex items-start gap-2">
                                                            <div className="w-1.5 h-1.5 bg-brand-solid rounded-full mt-2 flex-shrink-0"></div>
                                                            <p>Networking opportunities with fellow enthusiasts and industry professionals</p>
                                                        </div>
                                                        <div className="flex items-start gap-2">
                                                            <div className="w-1.5 h-1.5 bg-brand-solid rounded-full mt-2 flex-shrink-0"></div>
                                                            <p>Live showcases and demonstrations from industry experts</p>
                                                        </div>
                                                        <div className="flex items-start gap-2">
                                                            <div className="w-1.5 h-1.5 bg-brand-solid rounded-full mt-2 flex-shrink-0"></div>
                                                            <p>Interactive Q&A sessions with speakers and panelists</p>
                                                        </div>
                                                        <div className="flex items-start gap-2">
                                                            <div className="w-1.5 h-1.5 bg-brand-solid rounded-full mt-2 flex-shrink-0"></div>
                                                            <p>Complimentary event materials and resource guides</p>
                                                        </div>
                                                        <div className="flex items-start gap-2">
                                                            <div className="w-1.5 h-1.5 bg-brand-solid rounded-full mt-2 flex-shrink-0"></div>
                                                            <p>Professional photography and video recording available</p>
                                                        </div>
                                                        <div className="flex items-start gap-2">
                                                            <div className="w-1.5 h-1.5 bg-brand-solid rounded-full mt-2 flex-shrink-0"></div>
                                                            <p>Access to exclusive online community and resources post-event</p>
                                                        </div>
                                                        <div className="flex items-start gap-2">
                                                            <div className="w-1.5 h-1.5 bg-brand-solid rounded-full mt-2 flex-shrink-0"></div>
                                                            <p>Please arrive 15 minutes early for check-in and setup</p>
                                                        </div>
                                                        <div className="flex items-start gap-2">
                                                            <div className="w-1.5 h-1.5 bg-brand-solid rounded-full mt-2 flex-shrink-0"></div>
                                                            <p>Accessible facilities and accommodations available upon request</p>
                                                        </div>
                                                    </div>
                                                </div>

                        

                                                {/* About Event Section with Read More */}
                                                <CollapsibleAboutEvent description={event.description} />
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Desktop: Left Column - Cover + Host + Registration */}
                                <div className="w-2/5 max-lg:w-2/5 md:flex max-md:hidden bg-gray-50 dark:bg-gray-800 dark:bg-gray-800 relative flex-col min-h-0">
                                    <div className="flex flex-col h-full p-6 max-lg:p-4">
                                        {/* Cover Image */}
                                        <div className="flex-shrink-0 mb-4">
                                            <div className="w-full aspect-square shadow-3xl rounded-3xl ring-1 ring-secondary_alt overflow-hidden">
                                                <img
                                                    src={event.image}
                                                    alt={event.title}
                                                                            className="w-full h-full object-cover"
                                                />
                                                </div>
                                            </div>
                                            
                                        {/* Registration Section */}
                                    {!showOtherTimes && (
                                            <div className="flex-shrink-0">
                                                {rsvpStage === 'cancelled' && (
                                                    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                                                        <div className="text-center">
                                                            <p className="text-sm text-gray-900 dark:text-gray-100 mb-3">Registration cancelled</p>
                                                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">You can RSVP again anytime if you change your mind.</p>
                                                            <Button 
                                                                size="md" 
                                                                color="secondary" 
                                                                className="w-full"
                                                                onClick={() => setRsvpStage('initial')}
                                                            >
                                                                RSVP Again
                                                            </Button>
                                                        </div>
                                                    </div>
                                                )}
                                                {rsvpStage === 'processing' && (
                                                    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                                                        <div className="text-center">
                                                            <div className="flex items-center justify-center gap-2 mb-2">
                                                                <div className="w-4 h-4 border-2 border-brand-600 border-t-transparent rounded-full animate-spin"></div>
                                                                <span className="text-sm text-brand-600">Processing...</span>
                                                            </div>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">Please wait</p>
                                                        </div>
                                                    </div>
                                                )}
                                                {(rsvpStage as RsvpStage) === 'confirmed' && (
                                                    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                                                        <div className="text-center">
                                                            <div className="mb-3">
                                                                <h4 className="text-sm text-gray-900 dark:text-gray-100">Registered</h4>
                                                            </div>
                                                            <Button 
                                                                size="md" 
                                                                color="secondary" 
                                                                className="w-full mb-3"
                                                                iconLeading={Calendar}
                                                            >
                                                                Add to calendar
                                                            </Button>
                                                            <button
                                                                className="w-full text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:text-gray-300 underline transition-colors text-center"
                                                                onClick={() => setShowCancelAlert(true)}
                                                            >
                                                                Can't make it? Cancel registration
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                                {rsvpStage === 'initial' && rsvpState === 'open' && (
                                                    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 relative">
                                                        <div className="text-center">
                                                            <div className="mb-3">
                                                                <h4 className="text-sm text-gray-900 dark:text-gray-100">Ready to join?</h4>
                                                            </div>
                                                            <Button 
                                                                size="md" 
                                                                color="primary" 
                                                                className="w-full"
                                                                onClick={event.isRecurring ? () => setShowRecurringOptions(true) : handleRSVPClick}
                                                            >
                                                                Register Now
                                                            </Button>
                                                            
                                                            {/* Recurring Event Options Popover */}
                                                            {showRecurringOptions && event.isRecurring && (
                                                                <>
                                                                    {/* Backdrop */}
                                                                    <div 
                                                                        className="fixed inset-0 z-40" 
                                                                        onClick={() => setShowRecurringOptions(false)}
                                                                    />
                                                                    {/* Popover */}
                                                                <div className="absolute bottom-4 left-0 right-0 mb-2 z-50 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-3">
                                                                        <div className="mb-3 pb-3 border-b border-gray-100 dark:border-gray-700">
                                                                            <div className="flex items-center gap-2 mb-1">
                                                                                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Recurring Event</h4>
                                                                            </div>
                                                                            <p className="text-xs text-gray-600 dark:text-gray-400 text-left">Choose how you'd like to register</p>
                                                                        </div>
                                                                        <div className="space-y-1">
                                                                            {/* RSVP for selected date */}
                                                                            <div 
                                                                                className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                                                                                onClick={() => handleRecurringRSVP('single')}
                                                                            >
                                                                                <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
                                                                                <div className="flex-1 text-left">
                                                                                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">This session only</div>
                                                                                    <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                                                                        <span>{currentEventData.date}</span>
                                                                                        <button
                                                                                            onClick={(e) => {
                                                                                                e.stopPropagation();
                                                                                                setShowRecurringOptions(false);
                                                                                                handleOtherTimesClick();
                                                                                            }}
                                                                                            className="text-brand-secondary hover:text-brand-secondary_hover hover:underline flex items-center gap-0.5"
                                                                                        >
                                                                                            <ClockRefresh className="w-3 h-3" />
                                                                                            Change session
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            
                                                                            {/* RSVP for all */}
                                                                            <div 
                                                                                className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                                                                                onClick={() => handleRecurringRSVP('all')}
                                                                            >
                                                                                <Repeat03 className="h-4 w-4 text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
                                                                                <div className="flex-1 text-left">
                                                                                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">All upcoming sessions</div>
                                                                                    <div className="text-xs text-gray-600 dark:text-gray-400">6 more until May 31, 2024</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                                {rsvpStage === 'initial' && rsvpState !== 'open' && (
                                                    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                                                        <div className="text-center">
                                                            <p className="text-sm text-gray-900 dark:text-gray-100 mb-2">{rsvpConfig.label}</p>
                                                            <p className="text-xs text-gray-600 dark:text-gray-400">{rsvpState === 'closed' ? 'Registration has closed for this event.' : 'This event has already finished.'}</p>
                                                        </div>
                                                    </div>
                                                )}
                                                </div>
                                        )}
                                        
                                        {/* Host */}
                                        <div className="flex-shrink-0 mt-6 min-h-0">
                                            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Hosted by</div>
                                            {event.organizers && event.organizers.length > 1 ? (
                                                <div className="space-y-1 pb-8 max-h-40 overflow-y-auto  overflow-x-hidden modal-scrollbar pr-1" style={scrollbarStyles}>
                                                    {event.organizers.map((org: any, index: number) => (
                                                        <div key={index} className="group flex items-center justify-between gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 -mx-2 px-2 py-1 rounded-lg transition-colors">
                                                            <div className="flex items-center gap-1.5 flex-1 min-w-0">
                                                                <div className="w-5 h-5 rounded-full overflow-hidden ring-1 ring-gray-200 dark:ring-gray-600 flex-shrink-0">
                                                                    <img
                                                                        src={org.avatar}
                                                                        alt={org.name}
                                                                        className="w-full h-full object-cover"
                                                                        onError={(e) => {
                                                                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(org.name)}&background=667eea&color=fff&size=128`;
                                                                        }}
                                                                    />
                                                                </div>
                                                                <span className="text-xs font-medium text-gray-900 dark:text-gray-100 truncate">{org.name}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <button
                                                                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                                                                    title="Message"
                                                                >
                                                                    <MessageChatCircle className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                                                                </button>
                                                                <button
                                                                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                                                                    title="View Profile"
                                                                >
                                                                    <User01 className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="group flex items-center justify-between gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 -mx-2 px-2 py-1 rounded-lg transition-colors">
                                                    <div className="flex items-center gap-1.5 flex-1 min-w-0">
                                                        <div className="w-5 h-5 rounded-full overflow-hidden ring-1 ring-gray-200 dark:ring-gray-600 flex-shrink-0">
                                                            <img 
                                                                src={currentEventData.organizer.avatar} 
                                                                alt={currentEventData.organizer.name}
                                                                className="w-full h-full object-cover"
                                                                onError={(e) => {
                                                                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentEventData.organizer.name)}&background=667eea&color=fff&size=128`;
                                                                }}
                                                            />
                                                        </div>
                                                        <span className="text-xs font-medium text-gray-900 dark:text-gray-100 truncate">{currentEventData.organizer.name}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button
                                                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                                                            title="Message"
                                                        >
                                                            <MessageChatCircle className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                                                        </button>
                                                        <button
                                                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                                                            title="View Profile"
                                                        >
                                                            <User01 className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Desktop: Right Column - Title, Time/Location, About */}
                                {!showOtherTimes && (
                                    <div className="w-3/5 max-lg:w-3/5 md:flex max-md:hidden flex-col min-h-0">
                                        {/* Sticky Header with Action Buttons */}
                                        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700 dark:border-gray-700 px-6 py-4 z-10 flex justify-end items-center">
                                            <div className="flex items-center gap-1 flex-shrink-0">
                                                <button
                                                    className="hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors"
                                                    title="Share Event"
                                                >
                                                    <Share07 className="h-4 w-4 text-gray-500 dark:text-gray-400 dark:text-gray-400" />
                                                </button>
                                                <button
                                                    onClick={handleEventPageClick}
                                                    className="hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors"
                                                    title="Open in new tab"
                                                >
                                                    <LinkExternal01 className="h-4 w-4 text-gray-500 dark:text-gray-400 dark:text-gray-400" />
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
                                                            <Dropdown.Item 
                                                                key="edit-event" 
                                                                icon={Edit01}
                                                                onAction={() => {
                                                                    onClose();
                                                                    navigate('/admin4/content2/events/edit');
                                                                }}
                                                            >
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
                                                    className="hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors"
                                                    title="Close"
                                                >
                                                    <X className="h-4 w-4 text-gray-500 dark:text-gray-400 dark:text-gray-400" />
                                                </button>
                                            </div>
                                        </div>
                                        
                                        {/* Scrollable Content */}
                                        <div 
                                            className="px-6 py-4 flex-1 overflow-y-auto space-y-6 min-h-0 modal-scrollbar" 
                                            style={scrollbarStyles}
                                        >
                                            {(rsvpStage as RsvpStage) === 'confirmed' ? (
                                                /* After RSVP Confirmed */
                                                <>
                                                    {/* Event Title */}
                                                    <div>
                                                        <h1 className="text-3xl font-bold leading-tight text-gray-900 dark:text-gray-100 mb-2">
                                                            {currentEventData.title}
                                                        </h1>
                                                    </div>

                                                    {/* Success Message */}
                                                    <div className="bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-700 rounded-xl p-3">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <CheckCircle className="w-4 h-4 text-success-600 dark:text-success-400" />
                                                            <span className="text-sm font-semibold text-success-700 dark:text-success-300">Registration confirmed</span>
                                                        </div>
                                                        <p className="text-xs text-success-600 dark:text-success-400">Your RSVP has been confirmed. Event details have been sent to your email.</p>
                                                    </div>

                                                    {/* Event Information Section */}
                                                    <div>
                                                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Event Information</h4>
                                                        <div className="space-y-4">
                                                            {/* Date & Time Card */}
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center shadow-sm">
                                                                    {rsvpType === 'all' && event.isRecurring ? (
                                                                        <Repeat03 className="h-5 w-5 text-brand-solid" />
                                                                    ) : (
                                                                        <>
                                                                            <div className="text-xs text-gray-500 dark:text-gray-400 leading-none">
                                                                                {new Date(currentEventData.date).toLocaleDateString('en-US', { month: 'short' })}
                                                                            </div>
                                                                            <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-none mt-0.5">
                                                                                {new Date(currentEventData.date).getDate()}
                                                                            </div>
                                                                        </>
                                                                    )}
                                                                </div>
                                                                <div className="flex-1">
                                                                    {rsvpType === 'all' && event.isRecurring ? (
                                                                        <>
                                                                            <div className="font-medium text-gray-900 dark:text-gray-100 text-base">All following events</div>
                                                                            <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                                                                {event.recurringFrequency} at {currentEventData.time}
                                                                                <br />
                                                                                6 sessions starting {currentEventData.date} until May 31, 2024
                                                                            </div>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <div className="font-medium text-gray-900 dark:text-gray-100 text-base">{currentEventData.date}</div>
                                                                            <div className="text-sm text-gray-600 dark:text-gray-400">{currentEventData.time}</div>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            {/* Physical Location Card (for physical and hybrid) */}
                                                            {(event.locationType === "physical" || event.locationType === "hybrid") && (
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-sm">
                                                                        <MarkerPin01 className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                                                    </div>
                                                                    <div className="flex-1">
                                                                        <div className="font-medium text-gray-900 dark:text-gray-100 text-base">
                                                                            {event.location}
                                                                        </div>
                                                                        <div className="text-sm text-gray-600 dark:text-gray-400">{event.fullAddress || "Main auditorium, accessible entrance available"}</div>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {/* Virtual Location Card (for virtual and hybrid) */}
                                                            {(event.locationType === "virtual" || event.locationType === "hybrid") && (
                                                                <div className="flex items-start gap-3">
                                                                    <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-sm flex-shrink-0">
                                                                        <VideoRecorder className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <div className="font-medium text-gray-900 dark:text-gray-100 text-base mb-2">
                                                                            Virtual links
                                                                        </div>
                                                                        <div className="space-y-2">
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
                                                                                    className="w-4 h-4"
                                                                                    onError={(e) => {
                                                                                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIiByeD0iMiIgZmlsbD0iIzAwNzNFNiIvPgo8cGF0aCBkPSJNMyw0aDZWOEgzVjRaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4=';
                                                                                    }}
                                                                                />
                                                                                <span className="text-xs truncate">zoom.us/j/123456789</span>
                                                                                <Share04 className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0" />
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
                                                                                    className="w-4 h-4"
                                                                                    onError={(e) => {
                                                                                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIiByeD0iMiIgZmlsbD0iIzM0QTg1MyIvPgo8cGF0aCBkPSJNNCw2aDhWMTBINFY2WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+';
                                                                                    }}
                                                                                />
                                                                                <span className="text-xs truncate">meet.google.com/abc-defg-hij</span>
                                                                                <Share04 className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                                                                            </a>

                                                                            {/* Microsoft Teams Link */}
                                                                            <a 
                                                                                href="https://teams.microsoft.com/meet/abc123" 
                                                                                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors group"
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                            >
                                                                                <img 
                                                                                    src="https://teams.microsoft.com/favicon.ico" 
                                                                                    alt="Microsoft Teams" 
                                                                                    className="w-4 h-4"
                                                                                    onError={(e) => {
                                                                                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIiByeD0iMiIgZmlsbD0iIzUwNTlDOSIvPgo8cGF0aCBkPSJNNCw0aDRWOEg0VjRaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4=';
                                                                                    }}
                                                                                />
                                                                                <span className="text-xs truncate">teams.microsoft.com/meet/abc123</span>
                                                                                <Share04 className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                                                                            </a>

                                                                            {/* YouTube Stream Link */}
                                                                            <a 
                                                                                href="https://youtube.com/watch?v=dQw4w9WgXcQ" 
                                                                                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors group"
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                            >
                                                                                <img 
                                                                                    src="https://youtube.com/favicon.ico" 
                                                                                    alt="YouTube" 
                                                                                    className="w-4 h-4"
                                                                                    onError={(e) => {
                                                                                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIiByeD0iMiIgZmlsbD0iI0ZGMDAwMCIvPgo8cGF0aCBkPSJNNSw0VjhMOCw2TDUsNFoiIGZpbGw9IndoaXRlIi8+PC9zdmc+';
                                                                                    }}
                                                                                />
                                                                                <span className="text-xs truncate">youtube.com/watch?v=dQw4w9WgXcQ</span>
                                                                                <Share04 className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                                                                            </a>

                                                                            {/* Discord Link */}
                                                                            <a 
                                                                                href="https://discord.gg/xyz123" 
                                                                                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors group"
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                            >
                                                                                <img 
                                                                                    src="https://discord.com/favicon.ico" 
                                                                                    alt="Discord" 
                                                                                    className="w-4 h-4"
                                                                                    onError={(e) => {
                                                                                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIiByeD0iMiIgZmlsbD0iIzU4NjVGMiIvPgo8cGF0aCBkPSJNNCw1aDRWN0g0VjVaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4=';
                                                                                    }}
                                                                                />
                                                                                <span className="text-xs truncate">discord.gg/xyz123</span>
                                                                                <Share04 className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Interactive Map */}
                                                    {event.type !== "online" && event.coordinates && (
                                                        <div className="mb-6">
                                                            <EventMap
                                                                location={event.location}
                                                                latitude={event.coordinates.latitude}
                                                                longitude={event.coordinates.longitude}
                                                            />
                                                        </div>
                                                    )}

                                                    {/* Event Details Section */}
                                                    <div>
                                                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Event Details</h4>
                                                        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                                                            <div className="flex items-start gap-2">
                                                                <div className="w-1.5 h-1.5 bg-brand-solid rounded-full mt-2 flex-shrink-0"></div>
                                                                <p>Free snacks and drinks will be provided throughout the event</p>
                                                            </div>
                                                            <div className="flex items-start gap-2">
                                                                <div className="w-1.5 h-1.5 bg-brand-solid rounded-full mt-2 flex-shrink-0"></div>
                                                                <p>Networking opportunities with fellow enthusiasts and industry professionals</p>
                                                            </div>
                                                            <div className="flex items-start gap-2">
                                                                <div className="w-1.5 h-1.5 bg-brand-solid rounded-full mt-2 flex-shrink-0"></div>
                                                                <p>Live showcases and demonstrations from industry experts</p>
                                                            </div>
                                                            <div className="flex items-start gap-2">
                                                                <div className="w-1.5 h-1.5 bg-brand-solid rounded-full mt-2 flex-shrink-0"></div>
                                                                <p>Interactive Q&A sessions with speakers and panelists</p>
                                                            </div>
                                                            <div className="flex items-start gap-2">
                                                                <div className="w-1.5 h-1.5 bg-brand-solid rounded-full mt-2 flex-shrink-0"></div>
                                                                <p>Complimentary event materials and resource guides</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* About Event Section with Read More */}
                                                    <CollapsibleAboutEvent description={event.description} />
                                                </>
                                            ) : (
                                                /* Before RSVP */
                                                <>
                                                    {/* Title */}
                                                    <div>
                                                        <h1 className="text-3xl font-bold leading-tight text-gray-900 dark:text-gray-100 mb-2">
                                                            {currentEventData.title}
                                                        </h1>
                                                        {/* Recurring Event Badge - Only show for recurring events */}
                                                        {event.isRecurring && !showOtherTimes && (
                                                            <div className="flex items-center gap-2">
                                                                <BadgeWithIcon type="pill-color" color="brand" size="sm" iconLeading={Repeat03}>
                                                                    Repeats {event.recurringFrequency}
                                                                </BadgeWithIcon>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Date & Time and Location Cards */}
                                                    {(rsvpStage === 'initial' || rsvpStage === 'processing') && !showOtherTimes && (
                                                        <div className="space-y-4">
                                                            {/* Selected Session Label - Only for recurring events */}
                                                            {event.isRecurring && (
                                                                <div className="flex items-center justify-between">
                                                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Your selected session</div>
                                                                    <button 
                                                                        onClick={handleOtherTimesClick}
                                                                        className="text-brand-secondary hover:text-brand-secondary_hover hover:underline text-xs font-medium flex items-center gap-1 cursor-pointer"
                                                                    >
                                                                        <ClockRefresh className="w-3 h-3" />
                                                                        Change session 
                                                                    </button>
                                                                </div>
                                                            )}
                                                            
                                                            {/* Date & Time Card */}
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center shadow-sm">
                                                                    <div className="text-xs text-gray-500 dark:text-gray-400 leading-none">
                                                                        {new Date(currentEventData.date).toLocaleDateString('en-US', { month: 'short' })}
                                                                    </div>
                                                                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-none mt-0.5">
                                                                        {new Date(currentEventData.date).getDate()}
                                                                    </div>
                                                                </div>
                                                                <div className="flex-1">
                                                                    <div className="font-medium text-gray-900 dark:text-gray-100 text-base">
                                                                        {currentEventData.date}
                                                                        {event.isRecurring && selectedTimeSlot !== 0 && (
                                                                            <span className="text-xs text-brand-secondary ml-1">(updated)</span>
                                                                        )}
                                                                    </div>
                                                                    <div className="text-sm text-gray-600 dark:text-gray-400">{currentEventData.time}</div>
                                                                </div>
                                                            </div>

                                                            {/* Location Card */}
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-sm">
                                                                    {event.locationType === "virtual" ? (
                                                                        <VideoRecorder className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                                                    ) : event.locationType === "hybrid" ? (
                                                                        <div className="flex items-center -space-x-1">
                                                                            <MarkerPin01 className="h-4 w-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400" />
                                                                            <VideoRecorder className="h-4 w-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400" />
                                                                        </div>
                                                                    ) : (
                                                                        <MarkerPin01 className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                                                    )}
                                                                </div>
                                                                <div className="flex-1">
                                                                    <div className="font-medium text-gray-900 dark:text-gray-100 text-base flex items-center gap-1">
                                                                        {event.locationType === "virtual" ? "Virtual" : 
                                                                         event.locationType === "hybrid" ? (
                                                                            <span>{event.location} <span className="text-xs text-gray-500 dark:text-gray-400">+ Virtual</span></span>
                                                                         ) :
                                                                         event.location}
                                                                    </div>
                                                                    <div className="text-sm text-gray-600 dark:text-gray-400">
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

                                                    {/* About Event */}
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">About Event</div>
                                                        <div className="prose prose-gray max-w-none">
                                                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm mb-4">
                                                                {event.description}
                                                            </p>
                                                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm mb-4">
                                                                Join us for an immersive experience that brings together industry leaders, innovative thinkers, and passionate professionals. This carefully curated event is designed to foster meaningful connections, share cutting-edge insights, and explore the latest trends shaping our industry.
                                                            </p>
                                                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm mb-4">
                                                                Whether you're looking to expand your network, gain new perspectives, or simply enjoy engaging conversations with like-minded individuals, this event offers something valuable for everyone. Our speakers and participants represent diverse backgrounds and expertise levels, creating a rich environment for learning and collaboration.
                                                            </p>
                                                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
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
                                <div className="flex-shrink-0 border-b border-gray-100 dark:border-gray-700 px-4 py-4 flex justify-between items-center">
                                    <div className="flex-1 min-w-0 pr-3">
                                        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate leading-tight">
                                            {event.title}
                                        </h2>
                                    </div>
                                    
                                    <div className="flex items-center gap-0.5 flex-shrink-0">
                                        {/* Event Page Button */}
                                        <button
                                            onClick={handleEventPageClick}
                                            className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-3.5 transition-colors"
                                            title="View Event Page"
                                        >
                                            <svg className="h-6 w-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </button>

                                        {/* Share Button */}
                                        <button
                                            className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-3.5 transition-colors"
                                            title="Share Event"
                                        >
                                            <svg className="h-6 w-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                            </svg>
                                        </button>
                                        
                                        {/* Close Button */}
                                        <button
                                            onClick={onClose}
                                            className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-3.5 transition-colors"
                                            title="Close"
                                        >
                                            <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
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
                                                <h1 className="text-2xl font-bold leading-tight text-gray-900 dark:text-gray-100">
                                                    {event.title}
                                                </h1>
                                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                    {event.organizers && event.organizers.length > 1 ? (
                                                        <>
                                                            {/* Avatar Group */}
                                                            <div className="flex -space-x-2">
                                                                {event.organizers.map((org: any, index: number) => (
                                                                    <div
                                                                        key={index}
                                                                        className="w-6 h-6 rounded-full border-2 border-white overflow-hidden ring-1 ring-gray-200 dark:ring-gray-600"
                                                                        style={{ zIndex: event.organizers.length - index }}
                                                                    >
                                                                        <img
                                                                            src={org.avatar}
                                                                            alt={org.name}
                                                                            className="w-full h-full object-cover"
                                                                            onError={(e) => {
                                                                                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(org.name)}&background=667eea&color=fff&size=128`;
                                                                            }}
                                                                        />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <span className="text-base">Hosted by {event.organizers.map((org: any) => org.name).join(' & ')}</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="w-6 h-6 rounded-full overflow-hidden ring-1 ring-gray-200 dark:ring-gray-600">
                                                                <img 
                                                                    src={event.organizer.avatar} 
                                                                    alt={event.organizer.name}
                                                                    className="w-full h-full object-cover"
                                                                    onError={(e) => {
                                                                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(event.organizer.name)}&background=667eea&color=fff&size=128`;
                                                                    }}
                                                                />
                                                            </div>
                                                            <span className="text-base">Hosted by {event.organizer.name}</span>
                                                        </>
                                                    )}
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
                                                        <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center shadow-sm">
                                                            <div className="text-xs text-gray-500 dark:text-gray-400 leading-none">
                                                                {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                                                            </div>
                                                            <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-none">
                                                                {new Date(event.date).getDate()}
                                                            </div>
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2">
                                                                <div className="font-medium text-gray-900 dark:text-gray-100 text-base">{event.date}</div>
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
                                                            <div className="text-sm text-gray-600 dark:text-gray-400">{event.time}</div>
                                                        </div>
                                                    </div>

                                                    {/* Location Card */}
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-sm">
                                                            {event.type === "online" ? (
                                                                <Link01 className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                                            ) : (
                                                                <MarkerPin01 className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                                            )}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="font-medium text-gray-900 dark:text-gray-100 text-base flex items-center gap-1">
                                                                {event.location}
                                                                <svg className="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l10-10M17 7H7v10" />
                                                                </svg>
                                                            </div>
                                                            <div className="text-sm text-gray-600 dark:text-gray-400">
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
                                                <div className="bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-700 rounded-xl p-4">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <CheckCircle className="w-5 h-5 text-success-600 dark:text-success-400" />
                                                        <span className="text-base font-medium text-success-700 dark:text-success-300">You're All Set!</span>
                                                    </div>
                                                    <p className="text-sm text-success-600 dark:text-success-400">Your RSVP has been confirmed. Event details will be sent to your email.</p>
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
                                                    <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100">Registration confirmed</h3>
                                                </div>
                                                
                                                {/* Event Information Title */}
                                                <div className="pb-0">
                                                    <div className="text-base text-gray-500 dark:text-gray-400 mb-4">Event Information</div>
                                                </div>
                                                
                                                {/* Event Data Cards */}
                                                <div className="space-y-4">
                                                    {/* Event Title & Host Card */}
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-sm">
                                                            <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="font-medium text-gray-900 dark:text-gray-100 text-base">{event.title}</div>
                                                            <div className="text-sm text-gray-600 dark:text-gray-400">Hosted by {event.organizer.name}</div>
                                                        </div>
                                                    </div>

                                                    {/* Date & Time Card */}
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center shadow-sm">
                                                            <div className="text-xs text-gray-500 dark:text-gray-400 leading-none">
                                                                {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                                                            </div>
                                                            <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-none">
                                                                {new Date(event.date).getDate()}
                                                            </div>
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="font-medium text-gray-900 dark:text-gray-100 text-base">{event.date}</div>
                                                            <div className="text-sm text-gray-600 dark:text-gray-400">{event.time}</div>
                                                        </div>
                                                    </div>

                                                    {/* Location */}
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-sm">
                                                            {event.type === "online" ? (
                                                                <Link01 className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                                            ) : (
                                                                <MarkerPin01 className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                                            )}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="font-medium text-gray-900 dark:text-gray-100 text-base flex items-center gap-1">
                                                                {event.location}
                                                                <svg className="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l10-10M17 7H7v10" />
                                                                </svg>
                                                            </div>
                                                            <div className="text-sm text-gray-600 dark:text-gray-400">{event.fullAddress}</div>
                                                            <div className="text-sm text-gray-600 dark:text-gray-400">
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
                                                    <div className="text-base text-gray-500 dark:text-gray-400 mb-4">Event Details</div>
                                                    <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
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
                                                    <div className="text-base text-gray-500 dark:text-gray-400 mb-4">About Event</div>
                                                    <div className="prose prose-gray max-w-none">
                                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base mb-4">
                                                            {event.description}
                                                        </p>
                                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base mb-4">
                                                            Join us for an immersive experience that brings together industry leaders, innovative thinkers, and passionate professionals. This carefully curated event is designed to foster meaningful connections, share cutting-edge insights, and explore the latest trends shaping our industry.
                                                        </p>
                                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base mb-4">
                                                            Whether you're looking to expand your network, gain new perspectives, or simply enjoy engaging conversations with like-minded individuals, this event offers something valuable for everyone. Our speakers and participants represent diverse backgrounds and expertise levels, creating a rich environment for learning and collaboration.
                                                        </p>
                                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                                                            Don't miss this opportunity to be part of a dynamic community that's driving positive change and innovation. Reserve your spot today and prepare for an inspiring and transformative experience.
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Location Card */}
                                                <div>
                                                    <div className="text-base text-gray-500 dark:text-gray-400 mb-4">Location</div>
                                                    <div className="space-y-3">
                                                        <div>
                                                            <div className="font-medium text-gray-900 dark:text-gray-100 text-base">{event.location}</div>
                                                            <div className="text-base text-gray-600 dark:text-gray-400 mt-1">
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
                                    <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700">
                                        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                                            {rsvpStage === 'cancelled' ? (
                                                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                                                    <div className="text-center">
                                                        <p className="text-base font-medium text-gray-900 dark:text-gray-100 mb-1">Registration cancelled</p>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">You can RSVP again anytime if you change your mind.</p>
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
                                                <div className="text-center relative">
                                                    <div className="mb-3">
                                                        <h4 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-1">Ready to join?</h4>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">Secure your spot at this event</p>
                                                    </div>
                                                    <Button 
                                                        size="md" 
                                                        color="primary" 
                                                        className="w-full text-base py-3"
                                                        onClick={event.isRecurring ? () => setShowRecurringOptions(true) : handleRSVPClick}
                                                    >
                                                        {rsvpConfig.label}
                                                    </Button>
                                                    
                                                    {/* Recurring Event Options Popover */}
                                                    {showRecurringOptions && event.isRecurring && (
                                                        <>
                                                            {/* Backdrop */}
                                                            <div 
                                                                className="fixed inset-0 z-50" 
                                                                onClick={() => setShowRecurringOptions(false)}
                                                            />
                                                            {/* Popover */}
                                                            <div className="absolute bottom-full left-0 right-0 mb-2 z-50 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-3">
                                                                <div className="mb-3 pb-3 border-b border-gray-100 dark:border-gray-700">
                                                                    <div className="flex items-center gap-2 mb-1">
                                                                        <Repeat03 className="h-5 w-5 text-brand-solid" />
                                                                        <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100">Recurring Event</h4>
                                                                    </div>
                                                                    <p className="text-sm text-gray-600 dark:text-gray-400 text-left">Choose how you'd like to register</p>
                                                                </div>
                                                                <div className="space-y-1">
                                                                    {/* RSVP for selected date */}
                                                                    <div 
                                                                        className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                                                                        onClick={() => handleRecurringRSVP('single')}
                                                                    >
                                                                        <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
                                                                        <div className="flex-1 text-left">
                                                                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">RSVP for this date only</div>
                                                                            <div className="text-xs text-gray-600 dark:text-gray-400">{currentEventData.date}</div>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                    {/* Change selected date */}
                                                                    <div 
                                                                        className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                                                                        onClick={() => {
                                                                            setShowRecurringOptions(false);
                                                                            handleOtherTimesClick();
                                                                        }}
                                                                    >
                                                                        <ClockRefresh className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
                                                                        <div className="flex-1 text-left">
                                                                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Change selected date</div>
                                                                            <div className="text-xs text-gray-600 dark:text-gray-400">5 other dates available</div>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                    {/* RSVP for all */}
                                                                    <div 
                                                                        className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                                                                        onClick={() => handleRecurringRSVP('all')}
                                                                    >
                                                                        <Repeat03 className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
                                                                        <div className="flex-1 text-left">
                                                                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">RSVP for all following events</div>
                                                                            <div className="text-xs text-gray-600 dark:text-gray-400">6 events until May 31, 2024</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                                                    <div className="text-center">
                                                        <p className="text-base font-medium text-gray-900 dark:text-gray-100 mb-1">{rsvpConfig.label}</p>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">{rsvpState === 'closed' ? 'Registration has closed for this event.' : 'This event has already finished.'}</p>
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
                        className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            Are you sure you don't want to attend this event?
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
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
