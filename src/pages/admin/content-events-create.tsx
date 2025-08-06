import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from "react-router";
import { useListData } from 'react-stately';
import { ArrowLeft, Plus, Bell01, MessageChatCircle, Moon01, SearchLg, Zap, Edit03, FaceSmile, Image01, Paperclip, ChevronDown, Eye, EyeOff, X, Calendar, Clock, MarkerPin01, Users01, Tag01, Settings01, Globe01, ChevronUp, HelpCircle } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input, InputBase } from '@/components/base/input/input';
import { InputGroup } from '@/components/base/input/input-group';
import { TextArea } from "@/components/base/textarea/textarea";
import { Select } from "@/components/base/select/select";
import { NativeSelect } from '@/components/base/select/select-native';
import { MultiSelect } from '@/components/base/select/multi-select';
import { Toggle } from '@/components/base/toggle/toggle';
import { Checkbox } from '@/components/base/checkbox/checkbox';
import { FileTrigger } from "@/components/base/file-upload-trigger/file-upload-trigger";
import { Avatar } from '@/components/base/avatar/avatar';
import EventMap from '@/components/base/map/event-map';
import { cx } from "@/utils/cx";

interface HostItem {
    label: string;
    id: string;
    supportingText: string;
    avatarUrl: string;
}

interface FormData {
    // Step 1: Event Details
    title: string;
    aboutEvent: string;
    space: string;
    dateFrom: string;
    dateTo: string;
    timezone: string;
    locationType: 'physical' | 'virtual' | 'tbd';
    address: string;
    virtualUrl: string;
    coverImage: File | null;
    
    // Step 2: RSVP Config
    rsvpOpens: 'immediately' | 'date';
    rsvpOpensDate: string;
    rsvpCloses: 'capacity' | 'date';
    rsvpClosesDate: string;
    capacity: string;
    hideAttendees: boolean;
    sendInAppNotification: boolean;
    sendEmailNotification: boolean;
    
    // Advanced Options
    // Privacy Settings
    hideAddress: boolean;
    
    // Participants
    participantsList: string[];
    inviteFromMembers: boolean;
    inviteEmails: string;
    
    // Notifications
    inAppConfirmation: boolean;
    emailConfirmation: boolean;
    customEmailText: string;
    inAppReminder: boolean;
    emailReminder: boolean;
    customReminderText: string;
    
    // SEO & URL
    slug: string;
    metaTitle: string;
    metaDescription: string;
    hideFromSearch: boolean;
}

export const AdminContentEventsCreatePage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        // Step 1: Event Details
        title: '',
        aboutEvent: '',
        space: '',
        dateFrom: '',
        dateTo: '',
        timezone: 'UTC',
        locationType: 'physical',
        address: '',
        virtualUrl: '',
        coverImage: null,
        
        // Step 2: RSVP Config
        rsvpOpens: 'immediately',
        rsvpOpensDate: '',
        rsvpCloses: 'capacity',
        rsvpClosesDate: '',
        capacity: '',
        hideAttendees: false,
        sendInAppNotification: true,
        sendEmailNotification: true,
        
        // Advanced Options
        // Privacy Settings
        hideAddress: false,
        
        // Participants
        participantsList: [],
        inviteFromMembers: false,
        inviteEmails: '',
        
        // Notifications
        inAppConfirmation: false,
        emailConfirmation: false,
        customEmailText: '',
        inAppReminder: false,
        emailReminder: false,
        customReminderText: '',
        
        // SEO & URL
        slug: '',
        metaTitle: '',
        metaDescription: '',
        hideFromSearch: false
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [seoExpanded, setSeoExpanded] = useState(false);
    const [advancedExpanded, setAdvancedExpanded] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    // MultiSelect for hosts
    const selectedHosts = useListData<HostItem>({
        initialItems: [],
    });

    const spaces = useMemo(() => [
        { id: 'events', label: 'Events' },
        { id: 'announcements', label: 'Announcements' },
        { id: 'general', label: 'General' }
    ], []);

    const hosts = useMemo((): HostItem[] => [
        {
            label: 'John Doe',
            id: 'john-doe',
            supportingText: 'john@example.com',
            avatarUrl: 'https://picsum.photos/40/40?random=1',
        },
        {
            label: 'Jane Smith',
            id: 'jane-smith',
            supportingText: 'jane@example.com',
            avatarUrl: 'https://picsum.photos/40/40?random=2',
        },
        {
            label: 'Mike Johnson',
            id: 'mike-johnson',
            supportingText: 'mike@example.com',
            avatarUrl: 'https://picsum.photos/40/40?random=3',
        },
        {
            label: 'Sarah Wilson',
            id: 'sarah-wilson',
            supportingText: 'sarah@example.com',
            avatarUrl: 'https://picsum.photos/40/40?random=4',
        },
        {
            label: 'David Brown',
            id: 'david-brown',
            supportingText: 'david@example.com',
            avatarUrl: 'https://picsum.photos/40/40?random=5',
        }
    ], []);

    const locationTypes = useMemo(() => [
        { id: 'physical', label: 'Physical Location', supportingText: 'In-person event', icon: MarkerPin01 },
        { id: 'virtual', label: 'Virtual Event', supportingText: 'Online event', icon: Globe01 },
        { id: 'tbd', label: 'To Be Determined', supportingText: 'Location will be decided later', icon: HelpCircle }
    ], []);
    
    const timezones = useMemo(() => [
        { value: 'UTC', label: 'UTC' },
        { value: 'EST', label: 'EST' },
        { value: 'PST', label: 'PST' },
        { value: 'CET', label: 'CET' },
        { value: 'JST', label: 'JST' },
        { value: 'AEST', label: 'AEST' }
    ], []);

    const rsvpOpensOptions = useMemo(() => [
        { id: 'immediately', label: 'When event is published', supportingText: 'RSVP opens as soon as event goes live', icon: Zap },
        { id: 'date', label: 'At specific date and time', supportingText: 'Choose when RSVP opens', icon: Calendar }
    ], []);

    const rsvpClosesOptions = useMemo(() => [
        { id: 'capacity', label: 'After max capacity is reached', supportingText: 'Closes when full', icon: Users01 },
        { id: 'date', label: 'At specific date and time', supportingText: 'Choose when RSVP closes', icon: Calendar }
    ], []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            console.log("Event data:", formData);
            // Here you would typically send the data to your API
            // await createEvent(formData);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Navigate back to events list
            navigate("/admin/content/events");
        } catch (error) {
            console.error("Error creating event:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        navigate("/admin/content/events");
    };

    const handleFileSelect = (files: FileList | null) => {
        if (files && files[0]) {
            setFormData(prev => ({ ...prev, coverImage: files[0] }));
        }
    };

    return (
        <div className="w-full flex flex-col max-w-full self-center space-y-0 sm:space-y-0 md:space-y-0 lg:space-y-0 bg-background min-h-screen transition duration-200 ms-[calc(env(safe-area-inset-left))] me-[calc(env(safe-area-inset-right))]">
            {/* Header Navigation */}
            <header className="w-full flex flex-col max-w-full self-center space-y-3 sm:space-y-3.5 md:space-y-4 lg:space-y-5 shrink-0 text-content-on-topbar overflow-hidden -ms-[calc(env(safe-area-inset-left))] ps-[calc(env(safe-area-inset-left))] -me-[calc(env(safe-area-inset-right))] pe-[calc(env(safe-area-inset-right))] shadow-md sticky z-20 inset-0 backdrop-filter backdrop-blur-[20px] backdrop-saturate-[180%] before:absolute before:inset-0 before:w-full before:h-full before:bg-topbar before:opacity-80 before:z-[-1]">
                <div className="w-full flex flex-col max-w-full self-center space-y-0 sm:space-y-0 md:space-y-0 lg:space-y-0 py-0 sm:py-0 md:py-0 lg:py-0 px-0 sm:px-0 md:px-0 lg:px-0">
                    <div className="flex justify-center main-navbar text-content-on-topbar block-navbar">
                        <div className="flex flex-1 flex-col">
                            <div className="w-full flex flex-col max-w-full md:max-w-8xl self-center space-y-3 sm:space-y-3.5 md:space-y-4 lg:space-y-5 mx-auto">
                                <div className="px-4 sm:px-6 lg:px-8">
                                    <div className="flex h-16 items-center gap-x-2 sm:gap-x-8">
                                        {/* Mobile menu button */}
                                        <div className="flex h-full items-center lg:hidden shrink-0">
                                            <button type="button" aria-label="Navigation" className="h-8 w-8 shrink-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 shrink-0" width="1em" height="1em" aria-hidden="true">
                                                    <rect x="3" y="6" width="18" height="2" rx="1" fill="currentColor"/>
                                                    <rect x="3" y="12" width="18" height="2" rx="1" fill="currentColor"/>
                                                    <rect x="3" y="18" width="18" height="2" rx="1" fill="currentColor"/>
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Logo */}
                                        <div className="flex h-full items-center shrink-0">
                                            <a className="cursor-pointer rounded-none transition duration-200 focus:outline-none focus-visible:ring block logo" href="/">
                                                <div className="block sm:hidden">
                                                    <div className="inline-block object-contain square-logo-image shrink-0 h-[2rem] w-[2rem] bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                                                        U
                                                    </div>
                                                </div>
                                                <div className="hidden sm:block">
                                                    <div className="flex items-center space-x-2">
                                                        <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                                                            U
                                                        </div>
                                                        <span className="text-lg font-semibold">Untitled UI</span>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>

                                        {/* Search Bar */}
                                        <div className="h-full lg:items-center flex flex-1 justify-center">
                                            <div className="max-w-[40rem] w-full hidden lg:block">
                                                <div className="max-w-[40rem]">
                                                    <div className="flex items-center flex-1">
                                                        <div className="relative inline-flex items-center gap-2 block rounded-input appearance-none border placeholder:text-content-disabled placeholder:text-label-md transition duration-200 px-2 py-[3px] min-h-[40px] text-label-md focus-within:ring-action-primary focus-within:border-action-primary bg-surface text-content border-line w-full focus:outline-none focus-within:ring-1 ring-offset-0">
                                                            <div className="shrink-0">
                                                                <SearchLg className="text-content-disabled shrink-0" />
                                                            </div>
                                                            <input 
                                                                className="grow appearance-none focus-visible:outline-none bg-transparent" 
                                                                type="search" 
                                                                placeholder="Search or ask a question (⌘ + /)" 
                                                            />
                                                            <div className="shrink-0">
                                                                <div className="group flex items-center text-content-disabled cursor-pointer hover:text-content-hovered transition-colors">
                                                                    <div className="aspect-square h-4 w-4 flex items-center justify-center">
                                                                        <span className="text-xs">✨</span>
                                                                    </div>
                                                                    <span className="ml-1 text-xs">AI</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right side actions */}
                                        <div className="h-full flex">
                                            <div className="h-full flex flex-row-reverse flex-wrap gap-x-2 gap-y-10">
                                                {/* Profile */}
                                                <div className="h-full flex justify-center items-center shrink-0">
                                                    <button className="rounded-button flex items-center text-content-on-topbar bg-topbar hover:text-content-on-topbar focus:outline-none focus-visible:ring transition duration-200 !rounded-avatar navbar-profile-menu">
                                                        <div className="relative shrink-0 rounded-avatar shrink-0 h-[2.5rem] w-[2.5rem] bg-gray-300 flex items-center justify-center">
                                                            <span className="text-sm font-medium">A</span>
                                                            <div className="absolute bottom-1 end-1 bg-surface rounded-avatar text-xs text-content-subdued transform translate-x-1/2 translate-y-1/2 h-4 w-4">
                                                                <div className="w-4 h-4 p-[2px] rounded-full relative">
                                                                    <div className="w-full rounded-full h-full bg-action-destructive"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </button>
                                                </div>

                                                {/* Create Post */}
                                                <div className="h-full hidden lg:flex justify-center items-center shrink-0">
                                                    <Button size="sm" color="primary" iconLeading={Plus}>
                                                        Create
                                                    </Button>
                                                </div>

                                                {/* Notifications */}
                                                <div className="h-full flex justify-center items-center shrink-0">
                                                    <button className="inline-block text-content-on-topbar bg-topbar hover:bg-topbar-subdued py-[9px] w-10 h-10 leading-5 text-label-sm rounded-button relative">
                                                        <Bell01 className="shrink-0 h-5 w-5 mx-auto" />
                                                        <div className="absolute top-0 end-0 transform translate-x-1/4 -translate-y-1/4 flex items-center justify-center">
                                                            <div className="inline-flex shrink-0 rounded-button-sm items-center justify-center text-label-xs leading-none font-bold text-content-on-destructive bg-action-destructive min-w-[18px] min-h-[18px]">
                                                                <span className="m-0.5 scale-90">93</span>
                                                            </div>
                                                        </div>
                                                    </button>
                                                </div>

                                                {/* Messages */}
                                                <div className="h-full flex justify-center items-center shrink-0">
                                                    <button className="inline-block text-content-on-topbar bg-topbar hover:bg-topbar-subdued py-[9px] w-10 h-10 leading-5 text-label-sm rounded-button relative">
                                                        <MessageChatCircle className="shrink-0 h-5 w-5 mx-auto" />
                                                        <div className="absolute top-0 end-0 transform translate-x-1/4 -translate-y-1/4 flex items-center justify-center">
                                                            <div className="inline-flex shrink-0 rounded-button-sm items-center justify-center text-label-xs leading-none font-bold text-content-on-destructive bg-action-destructive min-w-[18px] min-h-[18px]">
                                                                <span className="m-0.5 scale-90">2</span>
                                                            </div>
                                                        </div>
                                                    </button>
                                                </div>

                                                {/* Dark mode */}
                                                <div className="h-full flex justify-center items-center shrink-0 hidden lg:flex">
                                                    <button className="inline-block text-content-on-topbar bg-topbar hover:bg-topbar-subdued py-[9px] w-10 h-10 leading-5 text-label-sm rounded-button">
                                                        <Moon01 className="shrink-0 h-5 w-5 mx-auto" />
                                                    </button>
                                                </div>

                                                {/* Language */}
                                                <div className="h-full hidden lg:flex justify-center items-center shrink-0">
                                                    <button className="inline-block text-content-on-topbar bg-topbar hover:bg-topbar-subdued py-[9px] w-10 h-10 leading-5 text-label-sm rounded-button">
                                                        <div className="w-5 h-5 shrink-0 flex justify-center items-center">
                                                            <span className="text-sm">🇺🇸</span>
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="w-full flex flex-col max-w-full self-center space-y-0 sm:space-y-0 md:space-y-0 lg:space-y-0 flex-1">
                <div className="w-full grid grid-cols-1 md:grid-cols-6 lg:grid-cols-8 max-w-full self-center gap-3 sm:gap-3.5 md:gap-4 lg:gap-5 flex-1">
                    <main className="w-full flex flex-col col-span-1 md:col-span-6 lg:col-span-8 max-w-full justify-self-center space-y-0 sm:space-y-0 md:space-y-0 lg:space-y-0">
                        <div className="w-full flex flex-col max-w-full self-center space-y-3 sm:space-y-3.5 md:space-y-4 lg:space-y-5 sm:py-3.5 md:py-4 lg:py-5 sm:px-3.5 md:px-4 lg:px-5">
                            <div className="w-full flex flex-col max-w-full md:max-w-3xl self-center space-y-3 sm:space-y-3.5 md:space-y-4 lg:space-y-5 py-0 sm:py-0 md:py-0 lg:py-0 px-0 sm:px-0 md:px-0 lg:px-0">
                                
                                {/* Form Card */}
                                <div className="border border-card flex flex-col text-content-subdued transition duration-200 justify-between bg-surface shadow-card sm:rounded-card">
                                    
                                    {/* Header */}
                                    <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                                        <h3 className="text-content font-medium text-heading-xs">
                                            <div className="flex space-x-3 items-center">
                                                <Button 
                                                    size="sm" 
                                                    color="tertiary" 
                                                    iconLeading={ArrowLeft}
                                                    onClick={handleCancel}
                                                    className="!p-2 !w-10 !h-10"
                                                >
                                                </Button>
                                                <span className="text-xl font-medium flex-1">Create a new event</span>
                                            </div>
                                        </h3>
                                    </div>

                                    {/* Form */}
                                    <div className="flex-1 px-4 py-5 sm:p-6">
                                        <form onSubmit={handleSubmit} className="relative">
                                            <div className="w-full flex flex-col max-w-full md:max-w-3xl self-center space-y-6">
                                                
                                                {/* New event Post in */}
                                                <Select
                                                    label="New event Post in"
                                                    placeholder="Select space"
                                                    selectedKey={formData.space}
                                                    onSelectionChange={(value) => setFormData(prev => ({ ...prev, space: value as string }))}
                                                    items={spaces}
                                                >
                                                    {(space) => (
                                                        <Select.Item key={space.id} id={space.id}>
                                                            {space.label}
                                                        </Select.Item>
                                                    )}
                                                </Select>

                                                {/* Event Title */}
                                                <Input
                                                    label="Event Title"
                                                    placeholder="Enter event title"
                                                    value={formData.title}
                                                    onChange={(value) => setFormData(prev => ({ ...prev, title: value }))}
                                                />

                                                {/* About Event */}
                                                <TextArea
                                                    label="About Event"
                                                    placeholder="Describe your event in detail..."
                                                    value={formData.aboutEvent}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, aboutEvent: e.target.value }))}
                                                    rows={3}
                                                />

                                                {/* Hosts - MultiSelect */}
                                                <MultiSelect
                                                    selectedItems={selectedHosts}
                                                    label="Hosts"
                                                    placeholder="Search and select hosts..."
                                                    items={hosts}
                                                >
                                                    {(item) => (
                                                        <MultiSelect.Item 
                                                            id={item.id} 
                                                            supportingText={item.supportingText} 
                                                            avatarUrl={item.avatarUrl}
                                                        >
                                                            {item.label}
                                                        </MultiSelect.Item>
                                                    )}
                                                </MultiSelect>

                                                {/* Date & Time - All in one row */}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <Input
                                                        type="datetime-local"
                                                        label="Start Date & Time"
                                                        value={formData.dateFrom}
                                                        onChange={(value) => setFormData(prev => ({ ...prev, dateFrom: value }))}
                                                    />
                                                    
                                                    <InputGroup
                                                        label="End Date & Time"
                                                        trailingAddon={
                                                            <NativeSelect
                                                                options={timezones}
                                                                value={formData.timezone}
                                                                onChange={(e) => setFormData(prev => ({ ...prev, timezone: e.target.value }))}
                                                            />
                                                        }
                                                    >
                                                        <InputBase
                                                            type="datetime-local"
                                                            value={formData.dateTo}
                                                            onChange={(value) => setFormData(prev => ({ ...prev, dateTo: value }))}
                                                        />
                                                    </InputGroup>
                                                </div>

                                                {/* Location Type - Dropdown */}
                                                <Select
                                                    label="Location Type"
                                                    placeholder="Select location type"
                                                    placeholderIcon={MarkerPin01}
                                                    selectedKey={formData.locationType}
                                                    onSelectionChange={(value) => setFormData(prev => ({ ...prev, locationType: value as 'physical' | 'virtual' | 'tbd' }))}
                                                    items={locationTypes}
                                                >
                                                    {(item) => (
                                                        <Select.Item id={item.id} supportingText={item.supportingText} icon={item.icon}>
                                                            {item.label}
                                                        </Select.Item>
                                                    )}
                                                </Select>

                                                {/* Location Details */}
                                                {formData.locationType === 'physical' && (
                                                    <div className="relative pl-6 mt-2 space-y-4">
                                                        <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200"></div>
                                                        <div className="absolute left-0 top-4 w-3 h-px bg-gray-200"></div>
                                                        <Input
                                                            label="Address"
                                                            placeholder="Enter physical address"
                                                            value={formData.address}
                                                            onChange={(value) => setFormData(prev => ({ ...prev, address: value }))}
                                                        />
                                                        
                                                        {/* Map Preview */}
                                                        {formData.address && (
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                    Location Preview
                                                                </label>
                                                                <EventMap 
                                                                    location={formData.address}
                                                                    className="rounded-lg"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {formData.locationType === 'virtual' && (
                                                    <div className="relative pl-6 mt-2">
                                                        <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200"></div>
                                                        <div className="absolute left-0 top-4 w-3 h-px bg-gray-200"></div>
                                                        <InputGroup 
                                                            label="Virtual URL" 
                                                            leadingAddon={<InputGroup.Prefix>https://</InputGroup.Prefix>}
                                                        >
                                                            <InputBase 
                                                                placeholder="zoom.us/j/123456789"
                                                                value={formData.virtualUrl}
                                                                onChange={(value) => setFormData(prev => ({ ...prev, virtualUrl: value }))}
                                                            />
                                                        </InputGroup>
                                                    </div>
                                                )}

                                                {/* Cover Image */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Cover Image
                                                    </label>
                                                    <FileTrigger
                                                        acceptedFileTypes={["image/*"]}
                                                        onSelect={(files) => setFormData(prev => ({ ...prev, coverImage: files?.[0] || null }))}
                                                    >
                                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
                                                            <Image01 className="mx-auto h-10 w-10 text-gray-400" />
                                                            <p className="mt-2 text-sm text-gray-600">
                                                                Upload image
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                PNG, JPG up to 10MB
                                                            </p>
                                                        </div>
                                                    </FileTrigger>
                                                </div>

                                                {/* Capacity */}
                                                <Input
                                                    type="number"
                                                    label="Capacity"
                                                    placeholder="Maximum number of attendees"
                                                    value={formData.capacity}
                                                    onChange={(value) => setFormData(prev => ({ ...prev, capacity: value }))}
                                                />

                                                {/* SEO options - Collapsible */}
                                                <div className="border border-gray-200 rounded-lg">
                                                    <button
                                                        type="button"
                                                        onClick={() => setSeoExpanded(!seoExpanded)}
                                                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                                                    >
                                                        <span className="text-sm font-medium text-gray-700">SEO options</span>
                                                        {seoExpanded ? (
                                                            <ChevronUp className="size-4 text-gray-400" />
                                                        ) : (
                                                            <ChevronDown className="size-4 text-gray-400" />
                                                        )}
                                                    </button>
                                                    
                                                    <div className={`overflow-hidden transition-all duration-300 ${seoExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                                        <div className="px-4 pb-4 space-y-3 border-t border-gray-100">
                                                            <Input
                                                                label="URL Slug"
                                                                placeholder="event-slug"
                                                                value={formData.slug}
                                                                onChange={(value) => setFormData(prev => ({ ...prev, slug: value }))}
                                                                hint="Custom URL for this event"
                                                            />
                                                            <Input
                                                                label="Meta Title"
                                                                placeholder="Amazing Event Title"
                                                                value={formData.metaTitle}
                                                                onChange={(value) => setFormData(prev => ({ ...prev, metaTitle: value }))}
                                                                hint="Title for search engines and social media"
                                                            />
                                                            <TextArea
                                                                label="Meta Description"
                                                                placeholder="Join us for an amazing event that will..."
                                                                value={formData.metaDescription}
                                                                onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                                                                rows={3}
                                                                hint="Description for search engines and social media"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Advanced Options - Collapsible */}
                                                <div className="border border-gray-200 rounded-lg">
                                                    <button
                                                        type="button"
                                                        onClick={() => setAdvancedExpanded(!advancedExpanded)}
                                                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                                                    >
                                                        <span className="text-sm font-medium text-gray-700">Advanced Options</span>
                                                        {advancedExpanded ? (
                                                            <ChevronUp className="size-4 text-gray-400" />
                                                        ) : (
                                                            <ChevronDown className="size-4 text-gray-400" />
                                                        )}
                                                    </button>
                                                    
                                                    <div className={`overflow-hidden transition-all duration-300 ${advancedExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                                        <div className="px-4 pb-4 space-y-5 border-t border-gray-100">
                                                            
                                                            {/* Privacy Settings */}
                                                            <div className="space-y-3">
                                                                <h4 className="text-sm font-semibold text-gray-900 border-b border-gray-100 pb-2">Privacy Settings</h4>
                                                                <div className="space-y-2">
                                                                    <Toggle
                                                                        slim
                                                                        size="sm"
                                                                        label="Hide Address from non-attendees"
                                                                        hint="Only confirmed attendees can see address"
                                                                        isSelected={formData.hideAddress}
                                                                        onChange={(isSelected) => setFormData(prev => ({ ...prev, hideAddress: isSelected }))}
                                                                    />
                                                                    <Toggle
                                                                        slim
                                                                        size="sm"
                                                                        label="Hide Attendees"
                                                                        hint="Don't show who's attending this event"
                                                                        isSelected={formData.hideAttendees}
                                                                        onChange={(isSelected) => setFormData(prev => ({ ...prev, hideAttendees: isSelected }))}
                                                                    />
                                                                </div>
                                                            </div>

                                                            {/* Email Notifications */}
                                                            <div className="space-y-3">
                                                                <h4 className="text-sm font-semibold text-gray-900 border-b border-gray-100 pb-2">Email Notifications</h4>
                                                                <div className="space-y-2">
                                                                    <Toggle
                                                                        slim
                                                                        size="sm"
                                                                        label="Email Confirmation"
                                                                        hint="Send email notification for registrations"
                                                                        isSelected={formData.emailConfirmation}
                                                                        onChange={(isSelected) => setFormData(prev => ({ ...prev, emailConfirmation: isSelected }))}
                                                                    />
                                                                    <div className={`overflow-hidden transition-all duration-200 ${formData.emailConfirmation ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                                                        <div className="relative pl-6 mt-2">
                                                                            <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200"></div>
                                                                            <div className="absolute left-0 top-4 w-3 h-px bg-gray-200"></div>
                                                                            <TextArea
                                                                                label="Customize email text"
                                                                                placeholder="Thank you for registering for our event..."
                                                                                value={formData.customEmailText}
                                                                                onChange={(e) => setFormData(prev => ({ ...prev, customEmailText: e.target.value }))}
                                                                                rows={3}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <Toggle
                                                                        slim
                                                                        size="sm"
                                                                        label="Email Reminder"
                                                                        hint="Send email reminders before event"
                                                                        isSelected={formData.emailReminder}
                                                                        onChange={(isSelected) => setFormData(prev => ({ ...prev, emailReminder: isSelected }))}
                                                                    />
                                                                    <div className={`overflow-hidden transition-all duration-200 ${formData.emailReminder ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                                                        <div className="relative pl-6 mt-2">
                                                                            <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200"></div>
                                                                            <div className="absolute left-0 top-4 w-3 h-px bg-gray-200"></div>
                                                                            <TextArea
                                                                                label="Customize reminder text"
                                                                                placeholder="Don't forget about our upcoming event..."
                                                                                value={formData.customReminderText}
                                                                                onChange={(e) => setFormData(prev => ({ ...prev, customReminderText: e.target.value }))}
                                                                                rows={3}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <Button
                                                            size="sm"
                                                            color="tertiary"
                                                            onClick={handleCancel}
                                                            type="button"
                                                        >
                                                            Cancel
                                                        </Button>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="relative" ref={dropdownRef}>
                                                            <div className="flex items-center">
                                                                <button
                                                                    type="submit"
                                                                    disabled={isSubmitting}
                                                                    className="inline-flex items-center justify-center gap-0 whitespace-nowrap rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-sm py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus-visible:ring-blue-500 text-white px-4 h-8 text-sm rounded-r-none"
                                                                >
                                                                    {isSubmitting ? 'Creating...' : 'Create Event'}
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                                                    className="inline-flex items-center justify-center gap-0 whitespace-nowrap rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-sm py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus-visible:ring-blue-500 text-white px-1.5 h-8 rounded-l-none border-l border-blue-500"
                                                                >
                                                                    <ChevronUp className={`h-3.5 w-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                                                                </button>
                                                            </div>
                                                            
                                                            {dropdownOpen && (
                                                                <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                                                    <div className="py-1">
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => {
                                                                                console.log('Save Draft');
                                                                                setDropdownOpen(false);
                                                                            }}
                                                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                                                        >
                                                                            Save Draft
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => {
                                                                                console.log('Schedule');
                                                                                setDropdownOpen(false);
                                                                            }}
                                                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                                                        >
                                                                            Schedule
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => {
                                                                                console.log('Publish');
                                                                                setDropdownOpen(false);
                                                                            }}
                                                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                                                        >
                                                                            Publish
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};