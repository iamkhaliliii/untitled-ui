import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { Calendar, Clock, VideoRecorder, MarkerPin01, Check, Users01, X, Plus, ArrowRight, ChevronDown, ChevronUp, Download01 } from '@untitledui/icons';
import EventMap from '../../base/map/event-map';
import { ModalOverlay, Modal, Dialog } from './modal';
import { Button } from '../../base/buttons/button';

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
}

export const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ event, isOpen, onClose }) => {
    const [rsvpStage, setRsvpStage] = useState<'initial' | 'processing' | 'confirmed'>('initial');
    
    // Reset RSVP stage when modal opens
    useEffect(() => {
        if (isOpen) {
            setRsvpStage('initial');
        }
    }, [isOpen]);
    
    if (!event) return null;

    const rsvpState = getRandomRSVPState(event.id);
    const rsvpConfig = rsvpStateConfig[rsvpState];

    const handleRSVPClick = () => {
        if (rsvpState === 'open') {
            setRsvpStage('processing');
            
            // Simulate processing time
            setTimeout(() => {
                setRsvpStage('confirmed');
            }, 2500);
        }
    };

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
                <Modal className=" w-[50vw] h-[80vh]">
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
                        className="bg-white rounded-3xl overflow-hidden shadow-2xl flex h-[80vh] relative"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* Left Column - Image + Basic Info */}
                        <div className="w-3/8 bg-gray-50 relative flex flex-col min-h-0">
                            <div className="flex flex-col h-full">
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
                                    <h1 className="text-2xl font-bold leading-tight text-gray-900">
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
                                    
                                    {/* Date & Time and Location Cards - Only show before RSVP */}
                                    {rsvpStage === 'initial' && (
                                        <div className="space-y-3">
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

                                            {/* Location Card */}
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
                                                    <div className="text-xs text-gray-600">Full details available after RSVP</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {/* Confirmation Message (when RSVP confirmed) */}
                                    {rsvpStage === 'confirmed' && (
                                        <div className="bg-success-50 border border-success-200 rounded-xl p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <CheckCircle className="w-5 h-5 text-success-600" />
                                                <span className="text-sm font-medium text-success-700">You're All Set!</span>
                                            </div>
                                            <p className="text-xs text-success-600">Your RSVP has been confirmed. Event details will be sent to your email.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            {/* Action Buttons - Sticky Footer */}
                            <div className="px-4 pb-2 border-t border-gray-200 flex-shrink-0">
                                <div className="pt-2">
                                    {/* RSVP Section */}
                                    <div className="bg-gray-50 rounded-xl p-2">
                                        {rsvpStage === 'processing' ? (
                                            <div className="text-center">
                                                <div className="flex items-center justify-center gap-1 mb-1">
                                                    <div className="w-4 h-4 border-2 border-brand-600 border-t-transparent rounded-full animate-spin"></div>
                                                    <span className="text-sm font-medium text-brand-600">Processing RSVP...</span>
                                                </div>
                                                <p className="text-xs text-gray-500">Please wait while we confirm your attendance</p>
                                            </div>
                                        ) : rsvpStage === 'confirmed' ? (
                                            <div className="text-center">
                                                <Button 
                                                    size="sm" 
                                                    color="secondary" 
                                                    className="w-full"
                                                    iconLeading={Download01}
                                                >
                                                    Download ICS file
                                                </Button>
                                            </div>
                                        ) : rsvpState === 'open' ? (
                                            <div className="text-center">
                                                <div className="mb-2">
                                                    <h4 className="text-sm font-medium text-gray-900 mb-0.5">Ready to join?</h4>
                                                    <p className="text-xs text-gray-600">Secure your spot at this event</p>
                                                </div>
                                                <Button 
                                                    size="sm" 
                                                    color="primary" 
                                                    className="w-full"
                                                    onClick={handleRSVPClick}
                                                >
                                                    {rsvpConfig.label}
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="text-center">
                                                <div className="mb-2">
                                                    <h4 className="text-sm font-medium text-gray-900 mb-0.5">Event Status</h4>
                                                    <p className="text-xs text-gray-600">{rsvpConfig.description}</p>
                                                </div>
                                                <Button
                                                    size="sm"
                                                    color="secondary"
                                                    className="w-full"
                                                    disabled={true}
                                                >
                                                    {rsvpConfig.label}
                                                </Button>
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
                                {rsvpStage === 'confirmed' ? (
                                    /* After RSVP - New Structured Layout */
                                    <>
                                        {/* Success Message */}
                                        <div className="p-3 pb-2">
                                            <h3 className="text-lg font-medium text-gray-900">Registration confirmed</h3>
                                        </div>
                                        
                                        {/* Event Information Title */}
                                        <div className="p-3 pb-0 pt-0">
                                            <div className="text-sm text-gray-500 mb-3">Event Information</div>
                                        </div>
                                        
                                        {/* Event Data Cards */}
                                        <div className="space-y-4 p-3 pt-0">
                                            {/* Event Title & Host Card */}
                                            <div className="flex items-center gap-2">
                                                <div className="w-10 h-10 bg-white rounded-lg border border-gray-200 flex items-center justify-center shadow-sm">
                                                    <Calendar className="h-4 w-4 text-gray-500" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-medium text-gray-900 text-sm">{event.title}</div>
                                                    <div className="text-xs text-gray-600">Hosted by {event.organizer.name}</div>
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
                                                    <div className="text-xs text-gray-600">{event.fullAddress}</div>
                                                    <div className="text-xs text-gray-600">Main auditorium, accessible entrance available</div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Interactive Map */}
                                        {event.type !== "online" && event.coordinates && (
                                            <div className="px-3">
                                                <EventMap
                                                    location={event.location}
                                                    latitude={event.coordinates.latitude}
                                                    longitude={event.coordinates.longitude}
                                                />
                                            </div>
                                        )}

                                        {/* Event Details Section */}
                                        <div className="p-3">
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
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Modal>
            </div>
        </ModalOverlay>
    );
};
