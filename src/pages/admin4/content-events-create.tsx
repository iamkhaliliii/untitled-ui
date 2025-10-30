import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from "react-router";
import { useListData } from 'react-stately';
import { 
    ArrowLeft, 
    Plus, 
    Bell01, 
    MessageCircle01,
    Moon01, 
    SearchLg, 
    Zap, 
    Edit03, 
    FaceSmile, 
    Image01, 
    Paperclip, 
    ChevronDown, 
    Eye, 
    EyeOff, 
    X, 
    Calendar, 
    Clock, 
    MarkerPin01, 
    Users01, 
    Tag01, 
    Settings01, 
    Globe01, 
    Globe06, 
    VideoRecorder, 
    ChevronUp, 
    HelpCircle,
    Menu02,
    Sun,
    User01,
    UsersPlus,
    UserSquare,
    Shield01,
    LogOut01,
    CheckCircle
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from '@/components/base/buttons/button-utility';
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Input, InputBase } from '@/components/base/input/input';
import { InputGroup } from '@/components/base/input/input-group';
import { Label } from '@/components/base/input/label';
import { TextArea } from "@/components/base/textarea/textarea";
import { Select } from "@/components/base/select/select";
import { NativeSelect } from '@/components/base/select/select-native';
import { MultiSelect } from '@/components/base/select/multi-select';
import { Toggle } from '@/components/base/toggle/toggle';
import { Checkbox } from '@/components/base/checkbox/checkbox';
import { FileTrigger } from "@/components/base/file-upload-trigger/file-upload-trigger";
import { Avatar } from '@/components/base/avatar/avatar';
import { Badge } from '@/components/base/badges/badges';
import { Dropdown } from '@/components/base/dropdown/dropdown';
import EventMap from '@/components/base/map/event-map';
import { UntitledLogo } from '@/components/foundations/logo/untitledui-logo';
import { UntitledLogoMinimal } from '@/components/foundations/logo/untitledui-logo-minimal';
import { DatePicker } from "@/components/application/date-picker/date-picker";
import { TimePicker } from "@/components/application/date-picker/time-picker";
import { parseDate, today, getLocalTimeZone, Time } from "@internationalized/date";
import type { DateValue, TimeValue } from "react-aria-components";
import { useTheme } from "@/providers/theme";

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
    dateFrom: DateValue | null;
    timeFrom: TimeValue | null;
    dateTo: DateValue | null;
    timeTo: TimeValue | null;
    timezone: string;
    locationType: 'physical' | 'virtual' | 'hybrid' | 'tbd';
    address: string;
    area: string;
    virtualUrls: { url: string; id: string }[];
    coverImage: File | null;
    eventDetails: string;
    additionalDetails: string;
    
    // Recurring Event Settings
    isRecurring: boolean;
    recurringFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    recurringEndType: 'number_of_runs' | 'specific_date' | 'never';
    recurringMaxEvents: string;
    recurringEndDate: DateValue | null;
    customWeeklyDays: string[]; // For custom weekly selection
    
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

const HeaderDropdownSimple = ({ onMobileMenuToggle, theme, onThemeToggle }: { onMobileMenuToggle?: () => void; theme?: string; onThemeToggle?: () => void }) => (
    <div className="flex max-w-container mx-auto items-center justify-between w-full px-4 sm:px-6 lg:px-8 py-4 max-sm:py-3 max-sm:px-3">
        {/* Logo & Mobile Menu */}
        <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <ButtonUtility 
                size="sm" 
                color="secondary"
                icon={Menu02}
                className="md:hidden w-10 h-10"
                tooltip="Menu"
                onClick={onMobileMenuToggle}
            />
            
            {/* Logo - Full on desktop, icon only on mobile */}
            <div className="flex items-center">
                <UntitledLogo className="h-8 max-md:hidden" />
                <UntitledLogoMinimal className="h-8 max-sm:h-6 md:hidden" />
            </div>
        </div>

        {/* Search Box - Hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
                <Input
                    placeholder="Search events, posts, or people..."
                    className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:border-white/40 focus:ring-2 focus:ring-white/20"
                    icon={SearchLg}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <kbd className="px-2 py-1 text-xs font-semibold text-white/70 bg-white/10 border border-white/20 rounded-md">
                        ⌘K
                    </kbd>
                </div>
            </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 max-md:gap-1">
            {/* Search - Mobile only */}
            <button className="md:hidden w-10 h-10 rounded-full bg-secondary dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors border border-gray-300 dark:border-gray-700">
                <SearchLg className="w-5 h-5 text-tertiary dark:text-gray-400" />
            </button>
            
            {/* Messages */}
            <Dropdown.Root>
                <Button color="tertiary" className="!p-0 !w-auto !h-auto !min-w-0 !border-0 !shadow-none hover:!bg-transparent relative">
                    <button className="w-10 h-10 rounded-full bg-secondary dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors border border-gray-300 dark:border-gray-700">
                        <MessageCircle01 className="w-5 h-5 text-tertiary dark:text-gray-400" />
                    </button>
                    <span className="absolute -top-1 -right-1 w-5 h-5 max-sm:w-4 max-sm:h-4 bg-red-500 text-white text-xs max-sm:text-[10px] rounded-full flex items-center justify-center pointer-events-none">
                        2
                    </span>
                </Button>
                <Dropdown.Popover className="!w-96 !border-gray-200 dark:!border-gray-700">
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-primary dark:text-gray-100">Messages</h3>
                            <Button color="tertiary" size="sm" iconLeading={Plus} className="!p-1.5">
                            </Button>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary dark:hover:bg-gray-800 cursor-pointer transition-colors">
                                <Avatar size="sm" src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" alt="Olivia Rhye" className="flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-semibold text-sm text-primary dark:text-gray-100">Olivia Rhye</span>
                                        <span className="text-xs text-tertiary dark:text-gray-400">2 hours ago</span>
                                    </div>
                                    <p className="text-sm text-secondary dark:text-gray-300 truncate">Thanks for the quick response! I'll check...</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-secondary dark:border-gray-700">
                            <button className="w-full text-center text-sm font-medium text-brand-secondary hover:text-brand-secondary_hover transition-colors py-2">
                                See all messages
                            </button>
                        </div>
                    </div>
                </Dropdown.Popover>
            </Dropdown.Root>
            
            {/* Notifications */}
            <Dropdown.Root>
                <Button color="tertiary" className="!p-0 !w-auto !h-auto !min-w-0 !border-0 !shadow-none hover:!bg-transparent relative">
                    <button className="w-10 h-10 rounded-full bg-secondary dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors border border-gray-300 dark:border-gray-700">
                        <Bell01 className="w-5 h-5 text-tertiary dark:text-gray-400" />
                    </button>
                    <span className="absolute -top-1 -right-1 w-6 h-5 max-sm:w-5 max-sm:h-4 bg-red-500 text-white text-xs max-sm:text-[10px] rounded-full flex items-center justify-center pointer-events-none">
                        99+
                    </span>
                </Button>
                <Dropdown.Popover className="!w-[32rem] !border-gray-200 dark:!border-gray-700">
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-primary dark:text-gray-100">Notifications</h3>
                            <div className="flex items-center gap-2">
                                <Button color="tertiary" size="sm" iconLeading={CheckCircle} className="!p-1.5" title="Mark all as read">
                                </Button>
                                <Button 
                                    color="tertiary" 
                                    size="sm" 
                                    iconLeading={Settings01} 
                                    className="!p-1.5"
                                    title="Notification settings"
                                    onClick={() => window.location.href = '/site/settings?section=notifications'}
                                >
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary dark:hover:bg-gray-800 cursor-pointer transition-colors">
                                <Avatar size="sm" src="https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80" alt="Phoenix Baker" className="flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-sm text-primary dark:text-gray-100">Phoenix Baker</span>
                                        <span className="text-xs text-tertiary dark:text-gray-400">mentioned you</span>
                                    </div>
                                    <p className="text-xs text-tertiary dark:text-gray-400">5 minutes ago</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-secondary dark:border-gray-700">
                            <button className="w-full text-center text-sm font-medium text-brand-secondary hover:text-brand-secondary_hover transition-colors py-2">
                                See all notifications
                            </button>
                        </div>
                    </div>
                </Dropdown.Popover>
            </Dropdown.Root>
            
            {/* Theme Toggle */}
            <button 
                className="w-10 h-10 rounded-full bg-secondary dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors border border-gray-300 dark:border-gray-700"
                onClick={onThemeToggle}
                title={theme === "dark" ? "Light mode" : "Dark mode"}
            >
                {theme === "dark" ? <Sun className="w-5 h-5 text-tertiary dark:text-gray-400" /> : <Moon01 className="w-5 h-5 text-tertiary dark:text-gray-400" />}
            </button>
            
            {/* Add/Create Button */}
            <button 
                className="w-10 h-10 rounded-full bg-secondary dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors border border-gray-300 dark:border-gray-700"
                title="Create"
                onClick={() => window.location.href = '/admin4/content2/posts/create'}
            >
                <Plus className="w-5 h-5 text-tertiary dark:text-gray-400" />
            </button>
            
            {/* Profile Avatar with Dropdown */}
            <Dropdown.Root>
                <Button color="tertiary" className="!p-0 !w-auto !h-auto !min-w-0 !border-0 !shadow-none hover:!bg-transparent">
                    <Avatar status="online" size="sm" alt="Olivia Rhye" src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" className="cursor-pointer" />
                </Button>
                <Dropdown.Popover>
                    <Dropdown.Menu>
                        <Dropdown.Item key="profile" icon={User01} onAction={() => window.location.href = '/site/profile'}>
                            Your profile
                        </Dropdown.Item>
                        <Dropdown.Item key="settings" icon={Settings01} onAction={() => window.location.href = '/site/settings'}>
                            Account settings
                        </Dropdown.Item>
                        <Dropdown.Item key="invite" icon={UsersPlus}>
                            Invite members
                        </Dropdown.Item>
                        <Dropdown.Separator />
                        <Dropdown.Item key="admin" icon={UserSquare} onAction={() => window.location.href = '/admin4'}>
                            Administration
                        </Dropdown.Item>
                        <Dropdown.Item key="moderation" icon={Shield01} onAction={() => window.location.href = '/site/moderation'}>
                            Moderation
                        </Dropdown.Item>
                        <Dropdown.Separator />
                        <Dropdown.Item key="logout" icon={LogOut01} className="text-error-solid">
                            Log out
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown.Popover>
            </Dropdown.Root>

        </div>
    </div>
);

export const AdminContentEventsCreatePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { theme, setTheme } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        // Step 1: Event Details
        title: '',
        aboutEvent: '',
        space: '',
        dateFrom: today(getLocalTimeZone()),
        timeFrom: new Time(16, 0),
        dateTo: today(getLocalTimeZone()),
        timeTo: new Time(17, 0),
        timezone: 'UTC',
        locationType: 'physical',
        address: '',
        area: '',
        virtualUrls: [{ url: '', id: 'virtual-url-1' }],
        coverImage: null,
        eventDetails: '',
        additionalDetails: '',
        
        // Recurring Event Settings
        isRecurring: false,
        recurringFrequency: 'weekly',
        recurringEndType: 'number_of_runs',
        recurringMaxEvents: '12',
        recurringEndDate: null,
        customWeeklyDays: [],
        
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
        { id: 'virtual', label: 'Virtual Event', supportingText: 'Online event', icon: VideoRecorder },
        { id: 'hybrid', label: 'Physical location and virtual', supportingText: 'Both in-person and online', icon: Globe06 },
        { id: 'tbd', label: 'To Be Determined', supportingText: 'Location will be decided later', icon: HelpCircle }
    ], []);
    
    const timezones = useMemo(() => [
        { id: 'UTC', value: 'UTC', label: 'UTC', supportingText: 'GMT+00:00', shortLabel: 'UTC', offset: 'GMT+00:00' },
        { id: 'America/New_York', value: 'America/New_York', label: 'ET', supportingText: 'GMT-05:00', shortLabel: 'ET', offset: 'GMT-05:00' },
        { id: 'America/Chicago', value: 'America/Chicago', label: 'CT', supportingText: 'GMT-06:00', shortLabel: 'CT', offset: 'GMT-06:00' },
        { id: 'America/Denver', value: 'America/Denver', label: 'MT', supportingText: 'GMT-07:00', shortLabel: 'MT', offset: 'GMT-07:00' },
        { id: 'America/Los_Angeles', value: 'America/Los_Angeles', label: 'PT', supportingText: 'GMT-08:00', shortLabel: 'PT', offset: 'GMT-08:00' },
        { id: 'Europe/London', value: 'Europe/London', label: 'GMT', supportingText: 'GMT+00:00', shortLabel: 'GMT', offset: 'GMT+00:00' },
        { id: 'Europe/Paris', value: 'Europe/Paris', label: 'CET', supportingText: 'GMT+01:00', shortLabel: 'CET', offset: 'GMT+01:00' },
        { id: 'Europe/Istanbul', value: 'Europe/Istanbul', label: 'EET', supportingText: 'GMT+03:00', shortLabel: 'EET', offset: 'GMT+03:00' },
        { id: 'Asia/Dubai', value: 'Asia/Dubai', label: 'GST', supportingText: 'GMT+04:00', shortLabel: 'GST', offset: 'GMT+04:00' },
        { id: 'Asia/Tehran', value: 'Asia/Tehran', label: 'IRST', supportingText: 'GMT+03:30', shortLabel: 'IRST', offset: 'GMT+03:30' },
        { id: 'Asia/Kolkata', value: 'Asia/Kolkata', label: 'IST', supportingText: 'GMT+05:30', shortLabel: 'IST', offset: 'GMT+05:30' },
        { id: 'Asia/Shanghai', value: 'Asia/Shanghai', label: 'CST', supportingText: 'GMT+08:00', shortLabel: 'CST', offset: 'GMT+08:00' },
        { id: 'Asia/Tokyo', value: 'Asia/Tokyo', label: 'JST', supportingText: 'GMT+09:00', shortLabel: 'JST', offset: 'GMT+09:00' },
        { id: 'Australia/Sydney', value: 'Australia/Sydney', label: 'AEST', supportingText: 'GMT+10:00', shortLabel: 'AEST', offset: 'GMT+10:00' },
        { id: 'Pacific/Auckland', value: 'Pacific/Auckland', label: 'NZST', supportingText: 'GMT+12:00', shortLabel: 'NZST', offset: 'GMT+12:00' }
    ], []);

    const rsvpOpensOptions = useMemo(() => [
        { id: 'immediately', label: 'When event is published', supportingText: 'RSVP opens as soon as event goes live', icon: Zap },
        { id: 'date', label: 'At specific date and time', supportingText: 'Choose when RSVP opens', icon: Calendar }
    ], []);

    const rsvpClosesOptions = useMemo(() => [
        { id: 'capacity', label: 'After max capacity is reached', supportingText: 'Closes when full', icon: Users01 },
        { id: 'date', label: 'At specific date and time', supportingText: 'Choose when RSVP closes', icon: Calendar }
    ], []);

    const recurringFrequencyOptions = useMemo(() => [
        { value: 'daily', label: 'Daily' },
        { value: 'weekly', label: 'Weekly' },
        { value: 'monthly', label: 'Monthly' },
        { value: 'yearly', label: 'Yearly' }
    ], []);

    const weekDays = useMemo(() => [
        { value: 'monday', label: 'Monday' },
        { value: 'tuesday', label: 'Tuesday' },
        { value: 'wednesday', label: 'Wednesday' },
        { value: 'thursday', label: 'Thursday' },
        { value: 'friday', label: 'Friday' },
        { value: 'saturday', label: 'Saturday' },
        { value: 'sunday', label: 'Sunday' }
    ], []);

    const recurringEndOptions = useMemo(() => [
        { value: 'number_of_runs', label: 'Number of runs' },
        { value: 'specific_date', label: 'Specific date' },
        { value: 'never', label: 'Never' }
    ], []);

    // Calculate date range in days
    const dateRangeInDays = useMemo(() => {
        if (!formData.dateFrom || !formData.dateTo) return 0;
        
        const startDate = new Date(formData.dateFrom.year, formData.dateFrom.month - 1, formData.dateFrom.day);
        const endDate = new Date(formData.dateTo.year, formData.dateTo.month - 1, formData.dateTo.day);
        
        const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return diffDays;
    }, [formData.dateFrom, formData.dateTo]);

    // Determine which recurring options should be disabled
    const recurringOptionsDisabled = useMemo(() => {
        return {
            daily: dateRangeInDays > 0, // Disabled if range is longer than one day
            weekly: dateRangeInDays > 7, // Disabled if range exceeds 7 days
            monthly: dateRangeInDays > 31, // Disabled if range exceeds 31 days
            yearly: dateRangeInDays > 365, // Disabled if range exceeds 365 days
            customWeeklyDays: dateRangeInDays > 0 // Custom weekly days disabled if range > 0
        };
    }, [dateRangeInDays]);

    // Update available recurring frequency options based on date range
    const availableRecurringFrequencyOptions = useMemo(() => {
        return recurringFrequencyOptions.map(option => ({
            ...option,
            isDisabled: recurringOptionsDisabled[option.value as keyof typeof recurringOptionsDisabled]
        }));
    }, [recurringFrequencyOptions, recurringOptionsDisabled]);

    // Auto-adjust recurring frequency if current selection becomes disabled
    useEffect(() => {
        if (formData.isRecurring && recurringOptionsDisabled[formData.recurringFrequency]) {
            // Find the first non-disabled option
            const firstAvailableOption = recurringFrequencyOptions.find(
                option => !recurringOptionsDisabled[option.value as keyof typeof recurringOptionsDisabled]
            );
            
            if (firstAvailableOption) {
                setFormData(prev => ({ 
                    ...prev, 
                    recurringFrequency: firstAvailableOption.value as 'daily' | 'weekly' | 'monthly' | 'yearly',
                    customWeeklyDays: [] // Clear custom weekly days when switching
                }));
            }
        }
    }, [dateRangeInDays, formData.isRecurring, formData.recurringFrequency, recurringFrequencyOptions, recurringOptionsDisabled]);

    // Generate dynamic recurring pattern description
    const recurringPatternDescription = useMemo(() => {
        if (!formData.isRecurring || !formData.dateFrom || !formData.dateTo) return null;

        const formatTime = (timeValue: TimeValue | null) => {
            if (!timeValue) return '';
            const hour = timeValue.hour.toString().padStart(2, '0');
            const minute = timeValue.minute.toString().padStart(2, '0');
            return `${hour}:${minute}`;
        };

        const getDayName = (date: DateValue) => {
            const jsDate = new Date(date.year, date.month - 1, date.day);
            return jsDate.toLocaleDateString('en-US', { weekday: 'long' });
        };

        const startDay = getDayName(formData.dateFrom);
        const endDay = getDayName(formData.dateTo);
        const startDate = formData.dateFrom.day;
        const endDate = formData.dateTo.day;
        const startTime = formatTime(formData.timeFrom);
        const endTime = formatTime(formData.timeTo);

        let description = '';

        switch (formData.recurringFrequency) {
            case 'daily':
                if (startTime && endTime) {
                    description = `This event repeats daily from ${startTime} to ${endTime}`;
                } else {
                    description = `This event repeats daily`;
                }
                break;

            case 'weekly':
                if (formData.customWeeklyDays.length > 0) {
                    const selectedDays = formData.customWeeklyDays
                        .map(dayValue => weekDays.find(d => d.value === dayValue)?.label)
                        .filter(Boolean)
                        .join(', ');
                    
                    if (startTime && endTime) {
                        description = `This event repeats every ${selectedDays} from ${startTime} to ${endTime}`;
                    } else {
                        description = `This event repeats every ${selectedDays}`;
                    }
                } else {
                    if (dateRangeInDays > 0) {
                        if (startTime && endTime) {
                            description = `This event repeats weekly from ${startDay} at ${startTime} to ${endDay} at ${endTime}`;
                        } else {
                            description = `This event repeats weekly from ${startDay} to ${endDay}`;
                        }
                    } else {
                        if (startTime && endTime) {
                            description = `This event repeats every ${startDay} from ${startTime} to ${endTime}`;
                        } else {
                            description = `This event repeats every ${startDay}`;
                        }
                    }
                }
                break;

            case 'monthly':
                if (dateRangeInDays > 0) {
                    if (startTime && endTime) {
                        description = `This event repeats monthly from day ${startDate} at ${startTime} to day ${endDate} at ${endTime}`;
                    } else {
                        description = `This event repeats monthly from day ${startDate} to day ${endDate}`;
                    }
                } else {
                    if (startTime && endTime) {
                        description = `This event repeats monthly on day ${startDate} from ${startTime} to ${endTime}`;
                    } else {
                        description = `This event repeats monthly on day ${startDate}`;
                    }
                }
                break;

            case 'yearly':
                const startMonth = formData.dateFrom.toDate?.('UTC')?.toLocaleDateString('en-US', { month: 'long' }) || 
                                   new Date(formData.dateFrom.year, formData.dateFrom.month - 1).toLocaleDateString('en-US', { month: 'long' });
                const endMonth = formData.dateTo.toDate?.('UTC')?.toLocaleDateString('en-US', { month: 'long' }) || 
                                 new Date(formData.dateTo.year, formData.dateTo.month - 1).toLocaleDateString('en-US', { month: 'long' });
                
                if (dateRangeInDays > 0) {
                    if (startMonth === endMonth) {
                        if (startTime && endTime) {
                            description = `This event repeats annually from ${startMonth} ${startDate} at ${startTime} to ${endDate} at ${endTime}`;
                        } else {
                            description = `This event repeats annually from ${startMonth} ${startDate} to ${endDate}`;
                        }
                    } else {
                        if (startTime && endTime) {
                            description = `This event repeats annually from ${startMonth} ${startDate} at ${startTime} to ${endMonth} ${endDate} at ${endTime}`;
                        } else {
                            description = `This event repeats annually from ${startMonth} ${startDate} to ${endMonth} ${endDate}`;
                        }
                    }
                } else {
                    if (startTime && endTime) {
                        description = `This event repeats annually on ${startMonth} ${startDate} from ${startTime} to ${endTime}`;
                    } else {
                        description = `This event repeats annually on ${startMonth} ${startDate}`;
                    }
                }
                break;
        }

        // Add ending information if available
        if (formData.recurringEndDate) {
            const endYear = formData.recurringEndDate.year;
            const endMonth = new Date(formData.recurringEndDate.year, formData.recurringEndDate.month - 1).toLocaleDateString('en-US', { month: 'long' });
            const endDay = formData.recurringEndDate.day;
            description += ` until ${endMonth} ${endDay}, ${endYear}`;
        }

        return description;
    }, [
        formData.isRecurring, 
        formData.dateFrom, 
        formData.dateTo, 
        formData.timeFrom, 
        formData.timeTo, 
        formData.recurringFrequency, 
        formData.customWeeklyDays,
        formData.recurringEndDate,
        dateRangeInDays,
        weekDays
    ]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            console.log("Event data:", formData);
            // Here you would typically send the data to your API
            // await createEvent(formData);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Navigate back to events list - admin2 version
            navigate("/admin4/content2/events");
        } catch (error) {
            console.error("Error creating event:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        navigate(-1); // Go back to previous page
    };

    const handleFileSelect = (files: FileList | null) => {
        if (files && files[0]) {
            setFormData(prev => ({ ...prev, coverImage: files[0] }));
        }
    };

    const handleMobileMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleThemeToggle = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <div className="w-full flex flex-col max-w-full self-center space-y-0 sm:space-y-0 md:space-y-0 lg:space-y-0 bg-background dark:bg-gray-950 h-screen transition duration-200 ms-[calc(env(safe-area-inset-left))] me-[calc(env(safe-area-inset-right))] overflow-hidden">
            {/* Header Navigation */}
            <header className="sticky top-0 z-50 bg-primary/80 backdrop-blur-lg shadow-sm border-b border-secondary dark:border-gray-800 flex-shrink-0">
                <HeaderDropdownSimple 
                    onMobileMenuToggle={handleMobileMenuToggle}
                    theme={theme}
                    onThemeToggle={handleThemeToggle}
                />
            </header>

            {/* Main Content */}
            <div className="w-full flex flex-col max-w-full self-center space-y-0 sm:space-y-0 md:space-y-0 lg:space-y-0 flex-1 overflow-y-auto">
                <div className="w-full grid grid-cols-1 md:grid-cols-6 lg:grid-cols-8 max-w-full self-center gap-3 sm:gap-3.5 md:gap-4 lg:gap-5">
                    <main className="w-full flex flex-col col-span-1 md:col-span-6 lg:col-span-8 max-w-full justify-self-center space-y-0 sm:space-y-0 md:space-y-0 lg:space-y-0">
                        <div className="w-full flex flex-col max-w-full self-center space-y-3 sm:space-y-3.5 md:space-y-4 lg:space-y-5 sm:py-3.5 md:py-4 lg:py-5 sm:px-3.5 md:px-4 lg:px-5">
                            <div className="w-full flex flex-col max-w-full md:max-w-3xl self-center space-y-3 sm:space-y-3.5 md:space-y-4 lg:space-y-5 py-0 sm:py-0 md:py-0 lg:py-0 px-0 sm:px-0 md:px-0 lg:px-0">
                    
                    {/* Form Card */}
                    <div className="border border-gray-300 dark:border-gray-700 rounded-xl flex flex-col text-content-subdued transition duration-200 justify-between bg-surface dark:bg-gray-900">
                        
                        {/* Header */}
                        <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                            <h3 className="text-content dark:text-gray-100 font-medium text-heading-xs">
                                <div className="flex space-x-3 items-center">
                                    <Button 
                                        size="sm" 
                                        color="tertiary" 
                                        iconLeading={ArrowLeft}
                                        onClick={handleCancel}
                                        className="!p-2 !w-10 !h-10"
                                    >
                                    </Button>
                                    <span className="text-xl font-medium flex-1 text-gray-900 dark:text-gray-100">Create a new event</span>
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

                                    {/* About Event - Rich Text Editor */}
                                    <div>
                                        <Label>About Event</Label>
                                        <div className="mt-1 relative">
                                            <div
                                                contentEditable="true"
                                                className="tiptap ProseMirror w-full scroll-py-3 overflow-auto rounded-lg bg-primary text-md leading-[1.5] text-primary shadow-xs ring-1 ring-primary transition duration-100 ease-linear ring-inset placeholder:text-placeholder autofill:rounded-lg autofill:text-primary focus:ring-2 focus:ring-brand focus:outline-hidden resize-y p-4"
                                                style={{
                                                    minHeight: '200px'
                                                } as React.CSSProperties}
                                                tabIndex={0}
                                                spellCheck="false"
                                                translate="no"
                                                aria-label="Rich text editor for event description"
                                                onInput={(e) => {
                                                    const content = e.currentTarget.innerHTML;
                                                    setFormData(prev => ({ ...prev, aboutEvent: content }));
                                                }}
                                                onFocus={(e) => {
                                                    // Initialize with paragraph if empty
                                                    if (e.currentTarget.innerHTML.trim() === '') {
                                                        e.currentTarget.innerHTML = '<p><br></p>';
                                                        // Position cursor at the start
                                                        const range = document.createRange();
                                                        const sel = window.getSelection();
                                                        range.setStart(e.currentTarget.firstChild?.firstChild || e.currentTarget, 0);
                                                        range.collapse(true);
                                                        sel?.removeAllRanges();
                                                        sel?.addRange(range);
                                                    }
                                                }}
                                                onBlur={(e) => {
                                                    // Clean up empty content
                                                    const content = e.currentTarget.innerHTML.trim();
                                                    if (content === '<p><br></p>' || content === '<br>' || content === '' || content === '<p></p>') {
                                                        e.currentTarget.innerHTML = '';
                                                        setFormData(prev => ({ ...prev, aboutEvent: '' }));
                                                    }
                                                }}
                                                onKeyDown={(e) => {
                                                    // Handle basic formatting shortcuts
                                                    if (e.metaKey || e.ctrlKey) {
                                                        switch (e.key.toLowerCase()) {
                                                            case 'b':
                                                                e.preventDefault();
                                                                document.execCommand('bold');
                                                                break;
                                                            case 'i':
                                                                e.preventDefault();
                                                                document.execCommand('italic');
                                                                break;
                                                            case 'u':
                                                                e.preventDefault();
                                                                document.execCommand('underline');
                                                                break;
                                                        }
                                                    }
                                                }}
                                                dangerouslySetInnerHTML={{ 
                                                    __html: formData.aboutEvent || ''
                                                }}
                                                suppressContentEditableWarning={true}
                                            />
                                            
                                            {/* Show placeholder when empty */}
                                            {!formData.aboutEvent && (
                                                <div className="absolute top-4 left-4 pointer-events-none text-placeholder dark:text-gray-500">
                                                    Describe your event in detail...
                                                </div>
                                            )}
                                        </div>
                                    </div>

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

                                    {/* Date & Time */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <div>
                                            <Label>Start Date & Time</Label>
                                            <div className="flex gap-0 mt-1 border border-gray-300 rounded-lg overflow-hidden dark:border-gray-700">
                                                <DatePicker
                                                    value={formData.dateFrom}
                                                    onChange={(value) => setFormData(prev => ({ ...prev, dateFrom: value }))}
                                                />
                                                <TimePicker
                                                    value={formData.timeFrom}
                                                    onChange={(value) => setFormData(prev => ({ ...prev, timeFrom: value }))}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <Label>End Date & Time</Label>
                                            <div className="flex gap-0 mt-1 border border-gray-300 rounded-lg overflow-hidden dark:border-gray-700">
                                                <DatePicker
                                                    value={formData.dateTo}
                                                    onChange={(value) => setFormData(prev => ({ ...prev, dateTo: value }))}
                                                />
                                                <TimePicker
                                                    value={formData.timeTo}
                                                    onChange={(value) => setFormData(prev => ({ ...prev, timeTo: value }))}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <Label>Timezone</Label>
                                            <div className="mt-1">
                                                <Select
                                                    selectedKey={formData.timezone}
                                                    onSelectionChange={(value) => setFormData(prev => ({ ...prev, timezone: value as string }))}
                                                    items={timezones}
                                                    placeholder="Select timezone"
                                                >
                                                    {(item) => (
                                                        <Select.Item 
                                                            key={item.id} 
                                                            id={item.id}
                                                            supportingText={item.supportingText}
                                                        >
                                                            {item.label}
                                                        </Select.Item>
                                                    )}
                                                </Select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Recurring Event Toggle */}
                                    <div className="relative space-y-4">
                                    <div>
                                        <Toggle
                                            slim
                                            size="sm"
                                            label="Recurring Event"
                                            hint="People can subscribe for recurring events"
                                            isSelected={formData.isRecurring}
                                            onChange={(isSelected) => setFormData(prev => ({ ...prev, isRecurring: isSelected }))}
                                        />
                                    </div>

                                    {/* Recurring Event Fields - Show when toggle is enabled */}
                                    {formData.isRecurring && (
                                        <div className="relative pl-6 space-y-4">
                                            <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700"></div>
                                            <div className="absolute left-0 top-4 w-3 h-px bg-gray-200 dark:bg-gray-700"></div>
                                            
                                            <div className="space-y-4">
                                                {/* Frequency Dropdown */}
                                                <Select
                                                    label="Frequency"
                                                    selectedKey={formData.recurringFrequency}
                                                    onSelectionChange={(value) => setFormData(prev => ({ 
                                                        ...prev, 
                                                        recurringFrequency: value as 'daily' | 'weekly' | 'monthly' | 'yearly',
                                                        customWeeklyDays: value !== 'weekly' ? [] : prev.customWeeklyDays
                                                    }))}
                                                    items={availableRecurringFrequencyOptions.map(option => ({ 
                                                        id: option.value, 
                                                        label: option.label,
                                                        isDisabled: option.isDisabled 
                                                    }))}
                                                    disabledKeys={availableRecurringFrequencyOptions.filter(opt => opt.isDisabled).map(opt => opt.value)}
                                                >
                                                    {(item) => (
                                                        <Select.Item key={item.id} id={item.id}>
                                                            {item.label}
                                                        </Select.Item>
                                                    )}
                                                </Select>

                                                {/* Custom Weekly Days Selection */}
                                                {formData.recurringFrequency === 'weekly' && !recurringOptionsDisabled.customWeeklyDays && (
                                                    <div className="space-y-2">
                                                        <Label>Custom weekly schedule</Label>
                                                        <ButtonGroup
                                                            selectionMode="multiple"
                                                            selectedKeys={new Set(formData.customWeeklyDays)}
                                                            onSelectionChange={(keys) => {
                                                                setFormData(prev => ({
                                                                    ...prev,
                                                                    customWeeklyDays: Array.from(keys) as string[]
                                                                }));
                                                            }}
                                                            className="w-full"
                                                        >
                                                            {weekDays.map((day) => (
                                                                <ButtonGroupItem 
                                                                    key={day.value} 
                                                                    id={day.value} 
                                                                    className="flex-1 justify-center selected:!bg-brand-solid selected:!text-white"
                                                                >
                                                                    {day.label.substring(0, 3)}
                                                                </ButtonGroupItem>
                                                            ))}
                                                        </ButtonGroup>
                                                    </div>
                                                )}
                                                
                                                <div>
                                                    <Label>Ending</Label>
                                                    <div className="mt-1 h-10 border border-gray-300 rounded-lg overflow-hidden dark:border-gray-700">
                                                        <DatePicker
                                                            value={formData.recurringEndDate}
                                                            onChange={(value) => setFormData(prev => ({ ...prev, recurringEndDate: value }))}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Dynamic Helper Note - Minimal Style */}
                                                {recurringPatternDescription && (
                                                    <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                                                        <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                                                            {recurringPatternDescription}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    </div>


                                    {/* Location Type - Dropdown */}
                                    <Select
                                        label="Location Type"
                                        placeholder="Select location type"
                                        placeholderIcon={MarkerPin01}
                                        selectedKey={formData.locationType}
                                        onSelectionChange={(value) => setFormData(prev => ({ ...prev, locationType: value as 'physical' | 'virtual' | 'hybrid' | 'tbd' }))}
                                        items={locationTypes}
                                    >
                                        {(item) => (
                                            <Select.Item id={item.id} supportingText={item.supportingText} icon={item.icon}>
                                                {item.label}
                                            </Select.Item>
                                        )}
                                    </Select>

                                    {/* Location Details */}
                                    {(formData.locationType === 'physical' || formData.locationType === 'hybrid') && (
                                        <div className="relative pl-6 mt-2 space-y-4">
                                            <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700"></div>
                                            <div className="absolute left-0 top-4 w-3 h-px bg-gray-200 dark:bg-gray-700"></div>
                                            
                                            {/* Location - visible to everyone */}
                                            <Input
                                                label="Location"
                                                placeholder="Enter area/district"
                                                value={formData.area}
                                                onChange={(value) => setFormData(prev => ({ ...prev, area: value }))}
                                                hint="This location will be shown to everyone"
                                            />

                                            <Input
                                                label="Address"
                                                placeholder="Enter physical address"
                                                value={formData.address}
                                                onChange={(value) => setFormData(prev => ({ ...prev, address: value }))}
                                                hint="Only shown after RSVP"
                                            />

                                            {/* Additional Details as children of Address */}
                                            <Input
                                                label="Additional details"
                                                placeholder="Room information, building details, etc."
                                                value={formData.additionalDetails}
                                                onChange={(value) => setFormData(prev => ({ ...prev, additionalDetails: value }))}
                                                hint="Only shown after RSVP"
                                            />
                                            
                                            {/* Map Preview */}
                                            {formData.address && (
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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

                                    {(formData.locationType === 'virtual' || formData.locationType === 'hybrid') && (
                                        <div className="relative pl-6 mt-2 space-y-4">
                                            <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700"></div>
                                            <div className="absolute left-0 top-4 w-3 h-px bg-gray-200 dark:bg-gray-700"></div>
                                            
                                            <div className="space-y-3">
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Virtual Event Links</label>
                                                {formData.virtualUrls.map((virtualUrl, index) => (
                                                    <div key={virtualUrl.id} className="flex items-start gap-2">
                                                        <div className="flex-1">
                                                            <InputGroup
                                                                leadingAddon={<InputGroup.Prefix>https://</InputGroup.Prefix>}
                                                            >
                                                                <InputBase 
                                                                    placeholder="zoom.us/j/123456789"
                                                                    value={virtualUrl.url}
                                                                    onChange={(value) => {
                                                                        const newUrls = [...formData.virtualUrls];
                                                                        newUrls[index] = { ...newUrls[index], url: value };
                                                                        setFormData(prev => ({ ...prev, virtualUrls: newUrls }));
                                                                    }}
                                                                />
                                                            </InputGroup>
                                                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Only shown after RSVP</p>
                                                        </div>
                                                        {formData.virtualUrls.length > 1 && index > 0 && (
                                                            <Button
                                                                type="button"
                                                                size="sm"
                                                                color="tertiary"
                                                                iconLeading={X}
                                                                onClick={() => {
                                                                    const newUrls = formData.virtualUrls.filter((_, i) => i !== index);
                                                                    setFormData(prev => ({ ...prev, virtualUrls: newUrls }));
                                                                }}
                                                                className="!p-2 !w-8 !h-8 mt-1"
                                                            />
                                                        )}
                                                    </div>
                                                ))}
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    color="tertiary"
                                                    iconLeading={Plus}
                                                    onClick={() => {
                                                        const newUrl = {
                                                            url: '',
                                                            id: `virtual-url-${Date.now()}`
                                                        };
                                                        setFormData(prev => ({ ...prev, virtualUrls: [...prev.virtualUrls, newUrl] }));
                                                    }}
                                                    className="w-fit"
                                                >
                                                    Add another link
                                                </Button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Cover Image */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Cover Image
                                        </label>
                                        <FileTrigger
                                            acceptedFileTypes={["image/*"]}
                                            onSelect={(files) => setFormData(prev => ({ ...prev, coverImage: files?.[0] || null }))}
                                        >
                                            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors cursor-pointer">
                                                <Image01 className="mx-auto h-10 w-10 text-gray-400 dark:text-gray-500" />
                                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                                    Upload image
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-500">
                                                    PNG, JPG up to 10MB
                                                </p>
                                            </div>
                                        </FileTrigger>
                                    </div>

                                    {/* Event Details */}
                                    <div>
                                        <TextArea
                                            label="Event Details"
                                            placeholder="Additional event information, requirements, what to bring..."
                                            value={formData.eventDetails}
                                            onChange={(e) => setFormData(prev => ({ ...prev, eventDetails: e.target.value }))}
                                            hint="This information will be displayed after RSVP confirmation. You can include details, requirements, and proper copy here."
                                            rows={4}
                                        />
                                    </div>

                                    {/* Capacity */}
                                    <div>
                                        <Input
                                            type="number"
                                            label="Capacity"
                                            placeholder="Unlimited"
                                            value={formData.capacity}
                                            onChange={(value) => setFormData(prev => ({ ...prev, capacity: value }))}
                                            hint={
                                                !formData.capacity 
                                                    ? "Capacity is set to unlimited. Enter a number to set a limit." 
                                                    : `Maximum ${formData.capacity} attendees. Registration will close when capacity is reached.`
                                            }
                                        />
                                    </div>

                                    {/* SEO options - Collapsible */}
                                    <div className="border border-secondary dark:border-gray-700 rounded-lg">
                                        <button
                                            type="button"
                                            onClick={() => setSeoExpanded(!seoExpanded)}
                                            className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary dark:hover:bg-gray-800 transition-colors"
                                        >
                                            <span className="text-sm font-medium text-secondary flex items-center gap-2">
                                                SEO options
                                                <EyeOff className="size-4 text-tertiary" />
                                            </span>
                                            {seoExpanded ? (
                                                <ChevronUp className="size-4 text-gray-400 dark:text-gray-500" />
                                            ) : (
                                                <ChevronDown className="size-4 text-gray-400 dark:text-gray-500" />
                                            )}
                                        </button>
                                        
                                        <div className={`overflow-hidden transition-all duration-300 ${seoExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <div className="px-4 pb-4 space-y-3 border-t border-gray-100 dark:border-gray-800">
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

                                    {/* Notification settings - Collapsible */}
                                    <div className="border border-secondary dark:border-gray-700 rounded-lg">
                                        <button
                                            type="button"
                                            onClick={() => setAdvancedExpanded(!advancedExpanded)}
                                            className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary dark:hover:bg-gray-800 transition-colors"
                                        >
                                            <span className="text-sm font-medium text-secondary flex items-center gap-2">
                                                Notification settings
                                                <EyeOff className="size-4 text-tertiary" />
                                            </span>
                                            {advancedExpanded ? (
                                                <ChevronUp className="size-4 text-gray-400 dark:text-gray-500" />
                                            ) : (
                                                <ChevronDown className="size-4 text-gray-400 dark:text-gray-500" />
                                            )}
                                        </button>
                                        
                                        <div className={`overflow-hidden transition-all duration-300 ${advancedExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <div className="px-4 pb-4 space-y-5 border-t border-gray-100 dark:border-gray-800">
                                                
                                                {/* Email Notifications */}
                                                <div className="space-y-3">
                                                    <h4 className="text-sm font-semibold text-primary border-b border-secondary dark:border-gray-700 pb-2">Email Notifications</h4>
                                                    <div className="space-y-2">
                                                        <Toggle
                                                            slim
                                                            size="sm"
                                                            label="Email Confirmation"
                                                            hint="Send email notification for registrations"
                                                            isSelected={formData.emailConfirmation}
                                                            onChange={(isSelected) => setFormData(prev => ({ ...prev, emailConfirmation: isSelected }))}
                                                        />

                                                        <div className="space-y-1">
                                                            <Toggle
                                                                slim
                                                                size="sm"
                                                                label="Email Reminder"
                                                                isSelected={formData.emailReminder}
                                                                onChange={(isSelected) => setFormData(prev => ({ ...prev, emailReminder: isSelected }))}
                                                            />
                                                            <div className="text-xs text-gray-500 dark:text-gray-400 pl-6">
                                                                <p>• The event is deleted</p>
                                                                <p>• The event time or location has changed</p>
                                                                <p>• 1 hour before the event is due to start</p>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                                {/* In-App Notifications */}
                                                <div className="space-y-3">
                                                    <h4 className="text-sm font-semibold text-primary border-b border-secondary dark:border-gray-700 pb-2">In-App Notifications</h4>
                                                    <div className="space-y-2">
                                                        <Toggle
                                                            slim
                                                            size="sm"
                                                            label="In-App Config"
                                                            hint="Send in-app notification for registrations"
                                                            isSelected={formData.inAppConfirmation}
                                                            onChange={(isSelected) => setFormData(prev => ({ ...prev, inAppConfirmation: isSelected }))}
                                                        />

                                                        <div className="space-y-1">
                                                            <Toggle
                                                                slim
                                                                size="sm"
                                                                label="In-App Reminder"
                                                                isSelected={formData.inAppReminder}
                                                                onChange={(isSelected) => setFormData(prev => ({ ...prev, inAppReminder: isSelected }))}
                                                            />
                                                            <div className="text-xs text-gray-500 dark:text-gray-400 pl-6">
                                                                <p>• The event is deleted</p>
                                                                <p>• The event time or location has changed</p>
                                                                <p>• 1 hour before the event is due to start</p>
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
                                                    <div className="absolute right-0 top-full mt-1 w-40 bg-primary dark:bg-gray-800 border border-secondary dark:border-gray-700 rounded-md shadow-lg z-50">
                                                        <div className="py-1">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    console.log('Save Draft');
                                                                    setDropdownOpen(false);
                                                                }}
                                                                className="w-full text-left px-4 py-2 text-sm text-secondary hover:bg-secondary dark:hover:bg-gray-700 transition-colors"
                                                            >
                                                                Save Draft
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    console.log('Schedule');
                                                                    setDropdownOpen(false);
                                                                }}
                                                                className="w-full text-left px-4 py-2 text-sm text-secondary hover:bg-secondary dark:hover:bg-gray-700 transition-colors"
                                                            >
                                                                Schedule
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    console.log('Publish');
                                                                    setDropdownOpen(false);
                                                                }}
                                                                className="w-full text-left px-4 py-2 text-sm text-secondary hover:bg-secondary dark:hover:bg-gray-700 transition-colors"
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
