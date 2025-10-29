import { 
    ArrowLeft, 
    Calendar, 
    Edit03, 
    MessageSquare01, 
    BookOpen01, 
    ChevronRight, 
    Package, 
    Plus, 
    Bell01, 
    MessageCircle01,
    Moon01, 
    SearchLg,
    Menu02,
    X,
    Sun,
    User01,
    Settings01,
    UsersPlus,
    UserSquare,
    Shield01,
    LogOut01,
    CheckCircle
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from '@/components/base/buttons/button-utility';
import { Input } from '@/components/base/input/input';
import { Avatar } from '@/components/base/avatar/avatar';
import { Badge } from '@/components/base/badges/badges';
import { Dropdown } from '@/components/base/dropdown/dropdown';
import { UntitledLogo } from '@/components/foundations/logo/untitledui-logo';
import { UntitledLogoMinimal } from '@/components/foundations/logo/untitledui-logo-minimal';
import { useNavigate } from "react-router";
import { useState } from "react";
import { useTheme } from "@/providers/theme";

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
                            {/* Message Item 1 */}
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
                            
                            {/* Message Item 2 */}
                            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary dark:hover:bg-gray-800 cursor-pointer transition-colors">
                                <Avatar size="sm" src="https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80" alt="Phoenix Baker" className="flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-semibold text-sm text-primary dark:text-gray-100">Phoenix Baker</span>
                                        <span className="text-xs text-tertiary dark:text-gray-400">Yesterday</span>
                                    </div>
                                    <p className="text-sm text-secondary dark:text-gray-300 truncate">Hey! Can you help me with the event setup?</p>
                                </div>
                            </div>
                            
                            {/* Message Item 3 */}
                            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary dark:hover:bg-gray-800 cursor-pointer transition-colors">
                                <Avatar size="sm" src="https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80" alt="Lana Steiner" className="flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-semibold text-sm text-primary dark:text-gray-100">Lana Steiner</span>
                                        <span className="text-xs text-tertiary dark:text-gray-400">3 days ago</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm text-secondary dark:text-gray-300 truncate flex-1">The new dashboard looks amazing! When...</p>
                                        <Badge color="success" size="sm">2</Badge>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Message Item 4 */}
                            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary dark:hover:bg-gray-800 cursor-pointer transition-colors">
                                <Avatar size="sm" src="https://www.untitledui.com/images/avatars/drew-cano?fm=webp&q=80" alt="Drew Cano" className="flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-semibold text-sm text-primary dark:text-gray-100">Drew Cano</span>
                                        <span className="text-xs text-tertiary dark:text-gray-400">1 week ago</span>
                                    </div>
                                    <p className="text-sm text-secondary dark:text-gray-300 truncate">You: Sure, I'll send you the documentation</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* See All Button */}
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
                            {/* Notification Item 1 */}
                            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary dark:hover:bg-gray-800 cursor-pointer transition-colors border-l-2 border-gray-200 dark:border-success-solid">
                                <Avatar size="sm" src="https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80" alt="Phoenix Baker" className="flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-sm text-primary dark:text-gray-100">Phoenix Baker</span>
                                        <span className="text-xs text-tertiary dark:text-gray-400">mentioned you in</span>
                                        <span className="text-xs font-medium text-brand-secondary">React Conference 2024</span>
                                        <span className="ml-auto w-2 h-2 bg-success-solid rounded-full flex-shrink-0"></span>
                                    </div>
                                    <p className="text-xs text-tertiary dark:text-gray-400 mb-2">5 minutes ago</p>
                                    <div className="bg-secondary dark:bg-gray-700 rounded-lg p-3 text-sm text-secondary dark:text-gray-300">
                                        @you Great presentation ideas! Would love to collaborate on this session with you.
                                    </div>
                                </div>
                            </div>
                            
                            {/* Notification Item 2 */}
                            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary dark:hover:bg-gray-800 cursor-pointer transition-colors border-l-2 border-gray-200 dark:border-success-solid">
                                <Avatar size="sm" src="https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80" alt="Lana Steiner" className="flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-sm text-primary dark:text-gray-100">Lana Steiner</span>
                                        <span className="text-xs text-tertiary dark:text-gray-400">posted</span>
                                        <span className="text-xs font-medium text-brand-secondary">New Feature Announcement</span>
                                        <span className="text-xs text-tertiary dark:text-gray-400">in</span>
                                        <span className="text-xs text-brand-secondary">Updates</span>
                                        <span className="ml-auto w-2 h-2 bg-success-solid rounded-full flex-shrink-0"></span>
                                    </div>
                                    <p className="text-xs text-tertiary dark:text-gray-400 mb-2">2 hours ago</p>
                                    <div className="bg-secondary dark:bg-gray-700 rounded-lg p-3 text-sm text-secondary dark:text-gray-300">
                                        We're excited to announce our new event management system with advanced RSVP features and recurring event support!
                                    </div>
                                </div>
                            </div>
                            
                            {/* Notification Item 3 */}
                            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary dark:hover:bg-gray-800 cursor-pointer transition-colors">
                                <Avatar size="sm" src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" alt="Olivia Rhye" className="flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-sm text-primary dark:text-gray-100">Olivia Rhye</span>
                                        <span className="text-xs text-tertiary dark:text-gray-400">reacted to your post in</span>
                                        <span className="text-xs text-brand-secondary">General Discussion</span>
                                    </div>
                                    <p className="text-xs text-tertiary dark:text-gray-400">1 day ago</p>
                                </div>
                            </div>
                            
                            {/* Notification Item 4 */}
                            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary dark:hover:bg-gray-800 cursor-pointer transition-colors">
                                <Avatar size="sm" src="https://www.untitledui.com/images/avatars/drew-cano?fm=webp&q=80" alt="Drew Cano" className="flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-sm text-primary dark:text-gray-100">Drew Cano</span>
                                        <span className="text-xs text-tertiary dark:text-gray-400">commented on</span>
                                        <span className="text-xs font-medium text-brand-secondary">Product Roadmap Q2</span>
                                    </div>
                                    <p className="text-xs text-tertiary dark:text-gray-400">3 days ago</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* See All Button */}
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

// Post types data
const postTypes = [
    {
        id: "event",
        label: "Event",
        icon: Calendar,
        iconColor: "text-primary",
        hasModuleBadge: true,
    },
    {
        id: "event-2",
        label: "Event",
        icon: Calendar,
        iconColor: "text-primary",
        hasModuleBadge: false,
    },
    {
        id: "article",
        label: "Article", 
        icon: Edit03,
        iconColor: "text-primary",
        hasModuleBadge: false,
    },
    {
        id: "discussion",
        label: "Discussion",
        icon: MessageSquare01,
        iconColor: "text-primary",
        hasModuleBadge: false,
    },
    {
        id: "help-article",
        label: "Help Article",
        icon: BookOpen01,
        iconColor: "text-primary",
        hasModuleBadge: false,
    },
];

export const AdminContentPostsCreatePage = () => {
    const navigate = useNavigate();
    const { theme, setTheme } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handlePostTypeSelect = (typeId: string) => {
        // Navigate to the actual create page for that post type
        if (typeId === "event") {
            navigate("/admin4/content2/events/create");
        } else {
            console.log("Selected post type:", typeId);
            // navigate(`/admin4/content2/posts/create/${typeId}`);
        }
    };

    const handleBack = () => {
        navigate(-1); // Go back to previous page
    };

    const handleMobileMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleThemeToggle = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <div className="w-full flex flex-col max-w-full self-center space-y-0 sm:space-y-0 md:space-y-0 lg:space-y-0 bg-background dark:bg-gray-950 min-h-screen transition duration-200 ms-[calc(env(safe-area-inset-left))] me-[calc(env(safe-area-inset-right))]">
            {/* Header Navigation */}
            <header className="sticky top-0 z-50 bg-primary/80 backdrop-blur-lg shadow-sm border-b border-secondary dark:border-gray-800">
                <HeaderDropdownSimple 
                    onMobileMenuToggle={handleMobileMenuToggle}
                    theme={theme}
                    onThemeToggle={handleThemeToggle}
                />
            </header>

            {/* Main Content */}
            <div className="w-full flex flex-col max-w-full self-center space-y-0 sm:space-y-0 md:space-y-0 lg:space-y-0 flex-1">
                <div className="w-full grid grid-cols-1 md:grid-cols-6 lg:grid-cols-8 max-w-full self-center gap-3 sm:gap-3.5 md:gap-4 lg:gap-5 flex-1">
                    <main className="w-full flex flex-col col-span-1 md:col-span-6 lg:col-span-8 max-w-full justify-self-center space-y-0 sm:space-y-0 md:space-y-0 lg:space-y-0">
                        <div className="w-full flex flex-col max-w-full self-center space-y-3 sm:space-y-3.5 md:space-y-4 lg:space-y-5 sm:py-3.5 md:py-4 lg:py-5 sm:px-3.5 md:px-4 lg:px-5">
                            <div className="w-full flex flex-col max-w-full md:max-w-3xl self-center space-y-3 sm:space-y-3.5 md:space-y-4 lg:space-y-5 py-0 sm:py-0 md:py-0 lg:py-0 px-0 sm:px-0 md:px-0 lg:px-0">
                    
                    {/* Card Container */}
                    <div className="border border-gray-300 dark:border-gray-700 rounded-xl flex flex-col text-content-subdued transition duration-200 justify-between bg-surface dark:bg-gray-900">
                        {/* Header */}
                        <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                            <h3 className="text-primary dark:text-gray-100 font-medium text-lg">
                                <div className="flex space-x-3 items-center">
                                    <Button
                                        type="button"
                                        color="tertiary"
                                        size="sm"
                                        iconLeading={ArrowLeft}
                                        onClick={handleBack}
                                        className="!p-2 !w-10 !h-10"
                                        aria-label="Back"
                                    />
                                    <span className="text-xl flex-1">Create a new</span>
                                </div>
                            </h3>
                        </div>

                        {/* List Content */}
                        <div className="flex-1 px-4 py-5 sm:p-6">
                            <ul className="flex flex-col divide-y divide-secondary dark:divide-gray-700 border-t border-secondary dark:border-gray-700">
                                {postTypes.map((postType) => (
                                    <li key={postType.id} className="py-0">
                                        <button
                                            onClick={() => handlePostTypeSelect(postType.id)}
                                            className="cursor-pointer rounded-md transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand hover:bg-secondary dark:hover:bg-gray-800 px-4 py-5 sm:p-6 flex space-x-3 items-center w-full text-left group"
                                        >
                                            {/* Icon */}
                                            <div className="flex items-center justify-center shrink-0 h-6 w-6">
                                                <postType.icon className={`h-6 w-6 ${postType.iconColor} dark:text-gray-400`} />
                                            </div>

                                            {/* Label and Badge */}
                                            <div className="flex-1 flex items-center gap-2">
                                                <span className="text-primary dark:text-gray-100 font-medium">
                                                    {postType.label}
                                                </span>
                                                {postType.hasModuleBadge && (
                                                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-violet-100 border border-violet-200 dark:bg-violet-900/20 dark:border-violet-800">
                                                        <Package className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
                                                        <span className="text-xs font-medium text-violet-700 dark:text-violet-300">Native Event Module</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Chevron */}
                                            <ChevronRight className="w-6 h-6 text-quaternary dark:text-gray-500 group-hover:text-tertiary dark:group-hover:text-gray-400 shrink-0 transition-colors" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
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

