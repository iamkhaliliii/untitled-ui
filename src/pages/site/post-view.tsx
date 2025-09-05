import React, { useState } from 'react';
import { ArrowLeft, MoreHorizontal, CheckCircle, Heart, Bell, Share, ChevronDown, MessageSquare } from 'lucide-react';
import { ArrowRight, Calendar, Clock, VideoRecorder, MarkerPin01 } from '@untitledui/icons';
import { SiteLayout } from '../../components/layouts/site-layout';
import { EventDetailsModal } from '../../components/application/modals/event-details-modal';
import { Button } from '../../components/base/buttons/button';

export default function PostView() {
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    
    // Event data for the modal
    const eventData = {
        id: 3, // Changed ID to get 'open' RSVP state (4 % 3 = 1, which maps to 'open')
        title: "Monthly Music Meetup - March 2024",
        description: "Join us for our Monthly Music Meetup! 🎵 We'll be showcasing new artists, discussing latest trends, and networking with fellow music enthusiasts. Free snacks and drinks provided!",
        image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&h=200&fit=crop&crop=center",
        date: "March 23, 2024",
        time: "7:00 PM - 10:00 PM",
        location: "Community Center",
        fullAddress: "250 West 54th Street, New York, NY 10019",
        attendees: 44,
        maxAttendees: 50,
        type: "in-person",
        locationType: "hybrid",
        virtualUrls: ["https://zoom.us/j/123456789", "https://meet.google.com/abc-defg-hij", "https://youtube.com/watch?v=dQw4w9WgXcQ"],
        category: "Music",
        coordinates: {
            latitude: 40.7589,
            longitude: -73.9851
        },
        organizer: {
            name: "Jordan Kim",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        }
    };

    const handleEventDetailsClick = () => {
        setIsEventModalOpen(true);
    };

    const handleCloseEventModal = () => {
        setIsEventModalOpen(false);
    };

    return (
        <SiteLayout>
            <div className="w-full flex flex-col max-w-full md:max-w-8xl self-center space-y-3 sm:space-y-3.5 md:space-y-4 lg:space-y-5 sm:py-3.5 md:py-4 lg:py-5">
                {/* Main Post Card */}
                <div className="border border-zinc-200 dark:border-zinc-700 flex flex-col text-zinc-600 dark:text-zinc-400 transition duration-200 justify-between bg-white dark:bg-zinc-900 shadow-sm sm:rounded-lg">
                    <div className="flex-1 px-4 py-5 sm:p-6">
                        {/* Header with Navigation */}
                        <div className="flex flex-wrap gap-4 items-center">
                            <div className="basis-full min-w-0">
                                <div className="flex pb-0">
                                    {/* Back Button */}
                                    <button 
                                        type="button" 
                                        aria-label="Back" 
                                        className="inline-block py-2 w-10 h-10 leading-5 text-sm rounded-full shrink-0 relative min-w-0 max-w-full font-medium text-center focus:outline-none focus-visible:ring transition duration-200 border disabled:cursor-default disabled:pointer-events-none text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 border-transparent"
                                    >
                                        <ArrowLeft className="shrink-0 h-5 w-5 mx-auto" />
                                    </button>
                                    
                                    {/* Breadcrumb */}
                                    <div className="flex-1 min-w-0">
                                        <a 
                                            className="cursor-pointer rounded-lg touch-manipulation gap-2 items-center px-4 py-2 min-h-10 leading-5 justify-center relative min-w-0 font-medium text-center focus:outline-none focus-visible:ring transition duration-200 border disabled:cursor-default disabled:pointer-events-none text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 border-transparent rounded-full max-w-full truncate inline-flex" 
                                            aria-label="Wishlist" 
                                            href="#"
                                        >
                                            <div className="relative">
                                                <span className="flex items-center justify-center shrink-0 h-5 w-5">
                                                    <img 
                                                        alt="" 
                                                        className="text-zinc-500 dark:text-zinc-400 object-scale-down shrink-0 rounded-sm h-5 w-5" 
                                                        width="20" 
                                                        height="20" 
                                                        aria-hidden="true" 
                                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
                                                    />
                                                </span>
                                            </div>
                                            <span className="min-w-0 truncate">Wishlist</span>
                                        </a>
                                    </div>
                                    
                                    {/* Options Menu */}
                                    <div className="relative inline-block text-left">
                                        <button 
                                            className="rounded-lg flex items-center text-zinc-500 dark:text-zinc-400 bg-transparent hover:text-zinc-600 dark:hover:text-zinc-300 focus:outline-none focus-visible:ring transition duration-200" 
                                            aria-label="Options" 
                                            type="button"
                                        >
                                            <span className="inline-block py-2 w-10 h-10 leading-5 text-sm rounded-lg relative min-w-0 max-w-full font-medium text-center focus:outline-none focus-visible:ring transition duration-200 border disabled:cursor-default disabled:pointer-events-none text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 border-transparent">
                                                <MoreHorizontal className="shrink-0 h-5 w-5 mx-auto" />
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Author Info */}
                        <div className="flex items-center empty:hidden space-x-4 min-w-0 basis-full mt-4">
                            <div className="flex-1 flex items-center space-x-2 min-w-0">
                                <div className="flex items-center space-x-4 min-w-0 grow">
                                    <div className="shrink-0">
                                        <a className="cursor-pointer rounded-full transition duration-200 focus:outline-none focus-visible:ring shrink-0 block" href="#">
                                            <div className="relative shrink-0 rounded-full h-12 w-12">
                                                <img 
                                                    className="shrink-0 rounded-full h-12 w-12 object-cover object-center ring-2 ring-white dark:ring-zinc-800" 
                                                    height="48" 
                                                    width="48" 
                                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
                                                    alt="Jordan Kim" 
                                                />
                                            </div>
                                        </a>
                                    </div>
                                    <div className="min-w-0 grow">
                                        <div className="flex items-center flex-wrap gap-x-2 gap-y-0.5 text-zinc-900 dark:text-zinc-100 max-w-full">
                                            <a className="cursor-pointer rounded-lg transition duration-200 focus:outline-none focus-visible:ring font-semibold truncate block text-base" href="#">
                                                Jordan Kim
                                            </a>
                                            <div className="inline-flex items-center rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80 text-xs px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-normal">
                                                <span className="mr-0.5">🎪</span>Event Host
                                            </div>
                                            <span className="text-base">🥉</span>
                                        </div>
                                        <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5 flex max-w-full">
                                            <div className="flex items-center gap-1 truncate">
                                                <a className="cursor-pointer rounded-lg transition duration-200 focus:outline-none focus-visible:ring truncate" href="#">
                                                    <span>8h ago • posted on events</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Post Title */}
                        <div className="basis-full min-w-0 break-words mt-4">
                            <h1 className="font-medium text-xl text-zinc-900 dark:text-zinc-100">Monthly Music Meetup - March 2024</h1>
                        </div>

                        {/* Status Badges */}
                        <div className="text-zinc-900 dark:text-zinc-100 text-sm mt-3 min-w-0 break-words">
                            <div className="flex items-center gap-2">
                                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs">
                                    Event
                                </div>
                            </div>
                        </div>

                        {/* Post Content */}
                        <div className="break-words min-w-0 basis-full mt-4">
                            <article className="prose prose-zinc dark:prose-invert max-w-none">
                                <p>Join us for our Monthly Music Meetup! 🎵 We'll be showcasing new artists, discussing latest trends, and networking with fellow music enthusiasts. Free snacks and drinks provided!</p>
                            </article>
                        </div>

                        {/* Event Card */}
                        <div className="space-y-4 mt-4">
                            <div className="rounded-2xl border overflow-hidden transition-all duration-300 border-zinc-200 dark:border-zinc-700 bg-zinc-50/30 dark:bg-zinc-800/30 hover:bg-zinc-50 dark:hover:bg-zinc-800/70">
                                <div className="p-5 max-lg:p-4 max-md:p-4">
                                    <div className="flex items-center mb-6 max-md:mb-4">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                                <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Event</h4>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 max-md:flex-col max-md:gap-3">
                                        <div className="flex-shrink-0 max-md:flex-shrink">
                                            <div className="w-42 max-lg:w-36 max-md:w-full aspect-square rounded-lg overflow-hidden">
                                                <img src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=200&h=200&fit=crop&crop=center" alt="Monthly Music Meetup - March 2024" className="w-full h-full object-cover" />
                                            </div>
                                        </div>
                                        <div className="w-px bg-zinc-100 dark:bg-zinc-700 my-1 max-md:hidden"></div>
                                        <div className="flex-1 min-w-0 space-y-2 max-md:space-y-3">
                                            <div className="flex items-center gap-2 text-xs max-md:text-sm font-medium text-zinc-500 dark:text-zinc-400 max-md:flex-wrap">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3 max-md:w-4 max-md:h-4" />
                                                    <span>Saturday, March 23rd</span>
                                                </div>
                                                <div className="w-px h-3 bg-zinc-300 dark:bg-zinc-600 max-md:hidden"></div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3 max-md:w-4 max-md:h-4" />
                                                    <span>2:00 PM - 5:00 PM</span>
                                                </div>
                                            </div>
                                            <h3 className="text-xl max-lg:text-lg max-md:text-xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight">Monthly Music Meetup - March 2024</h3>
                                            <div className="flex items-center gap-3 text-xs max-md:text-sm text-zinc-500 dark:text-zinc-400 max-md:flex-wrap">
                                                <div className="flex items-center gap-1">
                                                    <MarkerPin01 className="w-3 h-3 max-md:w-4 max-md:h-4" />
                                                    <span>Community Center + </span>
                                                    <VideoRecorder className="w-3 h-3 max-md:w-4 max-md:h-4" />
                                                    <span>Virtual</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                {/* <div className="flex items-center">
                                                    {[
                                                        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face",
                                                        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face",
                                                        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=32&h=32&fit=crop&crop=face",
                                                        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=32&h=32&fit=crop&crop=face"
                                                    ].map((avatar, index) => (
                                                        <span key={index} className="inline-flex items-center -ml-2 first:ml-0" style={{ zIndex: 4 - index }}>
                                                            <span className="rounded-full inline-block overflow-hidden border-2 border-white dark:border-gray-900 duration-200" style={{ width: 24, height: 24 }}>
                                                                <img src={avatar} alt={`Avatar ${index + 1}`} className="w-full h-full object-cover" />
                                                            </span>
                                                        </span>
                                                    ))}
                                                    <span className="inline-flex items-center -ml-2" style={{ zIndex: 0 }}>
                                                        <span className="rounded-full overflow-hidden border-2 border-white dark:border-gray-900 bg-gray-100 dark:bg-gray-800 duration-200 flex justify-center items-center text-gray-700 dark:text-gray-300 text-[0.625rem] leading-3 font-semibold" style={{ width: 24, height: 24 }}>
                                                            +2
                                                        </span>
                                                    </span>
                                                </div> */}
                                                <div className="flex items-center gap-2">
                                                    <img className="w-6 h-6 rounded-full border-2 border-white dark:border-zinc-800" alt="Jordan Kim" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
                                                    <span className="text-xs text-zinc-500 dark:text-zinc-400">By Event Host</span>
                                                </div>
                                            </div>
                                            
                                            {/* Event Action Button */}
                                            <div className="flex items-center justify-end max-md:justify-center pt-4">
                                                <Button 
                                                    color="secondary" 
                                                    size="sm" 
                                                    className="max-md:w-full max-md:text-base max-md:py-3"
                                                    iconTrailing={ArrowRight}
                                                    onClick={handleEventDetailsClick}
                                                >
                                                    View Details & Register
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Best Reply Section */}
                        <div className="basis-full mt-6">
                            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg text-zinc-900 dark:text-zinc-100 my-1 p-4">
                                <div className="text-zinc-900 dark:text-zinc-100 font-medium mb-2 flex space-x-2 items-center">
                                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0" />
                                    <span>Best reply by Jordan Kim</span>
                                </div>
                                <div className="max-w-full break-words mb-2">
                                    <div className="flex flex-col space-y-2">
                                        <div className="mt-1 text-zinc-900 dark:text-zinc-100">
                                            <div className="overflow-hidden relative max-h-96">
                                                <div>
                                                    <article className="prose prose-zinc dark:prose-invert text-base break-words min-w-0 max-w-none">
                                                        <p>Hey everyone! 👋</p>
                                                        <p>Thank you all for your interest in our Monthly Music Meetup! I'm thrilled to see so many passionate music enthusiasts wanting to join us.</p>
                                                        <p>Just to clarify a few things: We'll have both networking opportunities and live performances. There will be dedicated time slots for mingling, sharing your work, and connecting with fellow musicians. We're also planning to have a few acoustic performances from local artists.</p>
                                                        <p>Emma, absolutely bring your tracks! We'd love to hear them. And yes, there will be proper sound equipment available for anyone who wants to share their work.</p>
                                                        <p>Looking forward to seeing you all there! 🎵</p>
                                                    </article>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <a className="cursor-pointer rounded-lg transition duration-200 focus:outline-none focus-visible:ring text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300" href="#">
                                    View original
                                </a>
                            </div>
                        </div>

                        {/* Post Stats */}
                        <div className="flex space-x-2 text-zinc-500 dark:text-zinc-400 items-center basis-full mt-6">
                            <div className="flex items-center h-7 space-x-3 flex-1">
                                <div className="flex-grow min-w-0">
                                    <div className="flex items-center max-w-full">
                                        <div>
                                            <button 
                                                type="button" 
                                                className="rounded-full w-9 h-7 text-lg border-2 border-zinc-300 dark:border-zinc-600 -me-1.5 flex items-center justify-center overflow-hidden bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 ring-white dark:ring-zinc-900 ring-1 ring-offset-0" 
                                                aria-label="Reactions"
                                            >
                                                <div className="flex items-center justify-center shrink-0 h-4 w-4">
                                                    <span className="shrink-0 w-full h-full text-zinc-600 dark:text-zinc-300">↑</span>
                                                </div>
                                            </button>
                                        </div>
                                        <div className="mx-3 text-zinc-500 dark:text-zinc-400 text-sm">115</div>
                                    </div>
                                </div>
                                <div className="text-zinc-500 dark:text-zinc-400 hidden sm:block shrink-0 whitespace-nowrap text-sm">29 followers</div>
                                <div className="text-zinc-500 dark:text-zinc-400 shrink-0 whitespace-nowrap text-sm">43 replies</div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-2 text-zinc-500 dark:text-zinc-400 items-center min-w-0 basis-full mt-4">
                            <div className="flex-1 space-y-3">
                                <div className="flex flex-wrap gap-2">
                                    <div className="flex-1">
                                        <button 
                                            type="button" 
                                            className="touch-manipulation inline-flex gap-2 items-center rounded-lg px-4 py-2 min-h-10 leading-5 text-sm w-full max-w-full justify-center truncate relative min-w-0 max-w-full font-medium text-center focus:outline-none focus-visible:ring transition duration-200 border disabled:cursor-default disabled:pointer-events-none text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border-zinc-200 dark:border-zinc-700 group select-none"
                                        >
                                            <span className="min-w-0 truncate">
                                                <span className="flex items-center gap-x-2 flex-col">
                                                    <span className="inline-flex items-center gap-x-1">
                                                        <div className="flex items-center justify-center shrink-0 h-5 w-5">
                                                            <Heart className="w-4 h-4" />
                                                        </div>
                                                        <span className="truncate">I want this too</span>
                                                    </span>
                                                </span>
                                            </span>
                                        </button>
                                    </div>
                                    <div className="flex-1">
                                        <button 
                                            type="button" 
                                            className="touch-manipulation inline-flex gap-2 items-center rounded-lg px-4 py-2 min-h-10 leading-5 text-sm w-full max-w-full justify-center truncate relative min-w-0 max-w-full font-medium text-center focus:outline-none focus-visible:ring transition duration-200 border disabled:cursor-default disabled:pointer-events-none text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border-zinc-200 dark:border-zinc-700 group select-none"
                                        >
                                            <Bell className="shrink-0 h-5 w-5" />
                                            <span className="min-w-0 truncate">Follow</span>
                                        </button>
                                    </div>
                                    <div className="flex-1">
                                        <button 
                                            type="button" 
                                            className="touch-manipulation inline-flex gap-2 items-center rounded-lg px-4 py-2 min-h-10 leading-5 text-sm w-full max-w-full justify-center truncate relative min-w-0 max-w-full font-medium text-center focus:outline-none focus-visible:ring transition duration-200 border disabled:cursor-default disabled:pointer-events-none text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border-zinc-200 dark:border-zinc-700 group select-none"
                                        >
                                            <Share className="shrink-0 h-5 w-5" />
                                            <span className="min-w-0 truncate">Share</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="flex flex-col gap-y-2">
                    {/* Sort Filter */}
                    <div className="flex justify-end">
                        <div className="relative inline-block text-left">
                            <button 
                                className="rounded-lg items-center text-zinc-500 dark:text-zinc-400 bg-transparent hover:text-zinc-600 dark:hover:text-zinc-300 focus:outline-none focus-visible:ring transition duration-200 flex space-x-1 text-sm" 
                                type="button"
                            >
                                <span>Sort by <span className="font-medium">newest first</span></span>
                                <ChevronDown className="w-4 h-4 shrink-0" />
                            </button>
                        </div>
                    </div>

                    {/* Comments Container */}
                    <div className="border border-zinc-200 dark:border-zinc-700 flex flex-col text-zinc-500 dark:text-zinc-400 transition duration-200 justify-between bg-white dark:bg-zinc-900 shadow-sm sm:rounded-lg">
                        <div className="flex-1 py-5 sm:p-6 flex flex-col space-y-6 px-5">
                            {/* Sample Comments */}
                            {[
                                {
                                    author: 'Sarah Chen',
                                    avatar: 'https://mighty.tools/mockmind-api/content/human/129.jpg',
                                    time: '3 hours ago',
                                    content: 'This sounds amazing! I\'ve been looking for a good music meetup in the area. Count me in! 🎵 Will there be opportunities for networking with other musicians?',
                                    likes: '8 likes'
                                },
                                {
                                    author: 'Alex Rodriguez',
                                    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
                                    time: '5 hours ago',
                                    content: 'Great initiative Jordan! I\'ll definitely be there. Are you planning to have any live performances or is it more discussion-focused?',
                                    likes: '5 likes'
                                },
                                {
                                    author: 'Emma Wilson',
                                    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b7cf?w=150&h=150&fit=crop&crop=face',
                                    time: '6 hours ago',
                                    content: 'Love the concept! As a music producer, I\'m excited to meet fellow enthusiasts. Will bring some of my latest tracks to share if that\'s okay! 🎧',
                                    likes: '12 likes'
                                }
                            ].map((comment, index) => (
                                <div key={index} className="flex space-x-3 sm:space-x-4">
                                    {/* Avatar */}
                                    <div className="shrink-0">
                                        <div className="hidden sm:block">
                                            <a className="cursor-pointer rounded-full transition duration-200 focus:outline-none focus-visible:ring shrink-0 block" href="#">
                                                <div className="relative shrink-0 rounded-full h-12 w-12">
                                                    {comment.avatar ? (
                                                        <img 
                                                            className="shrink-0 rounded-full h-12 w-12 object-cover object-center" 
                                                            height="48" 
                                                            width="48" 
                                                            src={comment.avatar} 
                                                            alt={comment.author} 
                                                        />
                                                    ) : (
                                                        <div className="shrink-0 rounded-full h-12 w-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                                                            <span className="font-medium uppercase text-base">{comment.author.charAt(0)}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </a>
                                        </div>
                                        <div className="sm:hidden">
                                            <a className="cursor-pointer rounded-full transition duration-200 focus:outline-none focus-visible:ring shrink-0 block" href="#">
                                                <div className="relative shrink-0 rounded-full h-10 w-10">
                                                    {comment.avatar ? (
                                                        <img 
                                                            className="shrink-0 rounded-full h-10 w-10 object-cover object-center" 
                                                            height="40" 
                                                            width="40" 
                                                            src={comment.avatar} 
                                                            alt={comment.author} 
                                                        />
                                                    ) : (
                                                        <div className="shrink-0 rounded-full h-10 w-10 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                                                            <span className="font-medium uppercase text-sm">{comment.author.charAt(0)}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </a>
                                        </div>
                                    </div>

                                    {/* Comment Content */}
                                    <div className="min-w-0 grow max-w-full -mt-1 pt-1">
                                        <div>
                                            <div className="flex justify-between gap-2">
                                                <div className="flex grow min-w-0 max-w-full gap-x-2 gap-y-0.5 flex-wrap">
                                                    <a className="cursor-pointer rounded-lg transition duration-200 focus:outline-none focus-visible:ring truncate font-medium text-zinc-900 dark:text-zinc-100 shrink-0 max-w-full" href="#">
                                                        {comment.author}
                                                    </a>
                                                </div>
                                                <div className="shrink-0 flex items-center">
                                                    <div className="relative inline-block text-left">
                                                        <button className="rounded-lg flex items-center text-zinc-500 dark:text-zinc-400 bg-transparent hover:text-zinc-600 dark:hover:text-zinc-300 focus:outline-none focus-visible:ring transition duration-200">
                                                            <span className="inline-block py-1 w-6 h-6 leading-5 text-sm rounded-lg relative min-w-0 max-w-full font-medium text-center focus:outline-none focus-visible:ring transition duration-200 border disabled:cursor-default disabled:pointer-events-none text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 border-transparent">
                                                                <MoreHorizontal className="shrink-0 h-3.5 w-3.5 mx-auto" />
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-sm text-zinc-500 dark:text-zinc-400 flex max-w-full whitespace-nowrap mt-0.5">
                                                <a className="cursor-pointer rounded-lg transition duration-200 focus:outline-none focus-visible:ring truncate" href="#">
                                                    <time>{comment.time}</time>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <div className="max-w-full break-words mb-2">
                                                <div className="flex flex-col space-y-2">
                                                    <div className="mt-1 text-zinc-900 dark:text-zinc-100">
                                                        <div className="overflow-hidden relative max-h-96">
                                                            <div>
                                                                <article className="prose prose-zinc dark:prose-invert text-base text-zinc-900 dark:text-zinc-100 break-words min-w-0 max-w-none">
                                                                    <p>{comment.content}</p>
                                                                </article>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex space-x-5 text-sm">
                                            <div>
                                                <button className="cursor-pointer rounded-lg transition duration-200 focus:outline-none focus-visible:ring text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center font-medium">
                                                    <span className="me-2">
                                                        <Heart className="shrink-0 w-4 h-4" />
                                                    </span>
                                                    <span>{comment.likes}</span>
                                                </button>
                                            </div>
                                            <button className="cursor-pointer rounded-lg transition duration-200 focus:outline-none focus-visible:ring text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
                                                Reply
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Load More Comments */}
                            <div className="flex justify-between">
                                <div className="flex items-center space-x-3">
                                    <a className="cursor-pointer rounded-lg transition duration-200 focus:outline-none focus-visible:ring hover:text-blue-600 dark:hover:text-blue-400 text-sm leading-5 font-medium text-zinc-500 dark:text-zinc-400">
                                        View more replies
                                    </a>
                                </div>
                                <div className="text-zinc-500 dark:text-zinc-400 text-sm leading-5 font-normal">3 of 23</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sticky Comment Input */}
                <div className="sticky bottom-0 px-5 bg-white dark:bg-zinc-900 shadow-lg z-20 rounded-t-lg border-t border-zinc-200 dark:border-zinc-700">
                    <div className="pt-2 pb-3">
                        <div className="flex space-x-3 sm:space-x-4">
                            <div>
                                <div className="hidden sm:flex">
                                    <a className="cursor-pointer rounded-full transition duration-200 focus:outline-none focus-visible:ring shrink-0 block" href="#">
                                        <div className="relative shrink-0 rounded-full h-12 w-12">
                                            <img 
                                                className="shrink-0 rounded-full h-12 w-12 object-cover object-center" 
                                                height="48" 
                                                width="48" 
                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
                                                alt="Amir Khalilii" 
                                            />
                                        </div>
                                    </a>
                                </div>
                                <div className="sm:hidden">
                                    <a className="cursor-pointer rounded-full transition duration-200 focus:outline-none focus-visible:ring shrink-0 block" href="#">
                                        <div className="relative shrink-0 rounded-full h-10 w-10">
                                            <img 
                                                className="shrink-0 rounded-full h-10 w-10 object-cover object-center" 
                                                height="40" 
                                                width="40" 
                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
                                                alt="Amir Khalilii" 
                                            />
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <button 
                                type="button" 
                                className="touch-manipulation inline-flex gap-2 items-center rounded-lg px-3.5 py-1.5 min-h-8 leading-5 text-sm w-full max-w-full justify-start truncate relative min-w-0 max-w-full font-medium text-center focus:outline-none focus-visible:ring transition duration-200 border disabled:cursor-default disabled:pointer-events-none text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 border-transparent mt-0 sm:mt-1 !font-normal bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg"
                            >
                                <span className="min-w-0 truncate">What are your thoughts?</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Event Details Modal */}
                <EventDetailsModal 
                    event={eventData} 
                    isOpen={isEventModalOpen} 
                    onClose={handleCloseEventModal}
                />
            </div>
        </SiteLayout>
    );
}
