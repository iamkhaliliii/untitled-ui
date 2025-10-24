import { ArrowLeft, Calendar, Edit03, MessageSquare01, BookOpen01, HelpCircle, ChevronRight, Package, Plus, Bell01, MessageChatCircle, Moon01, SearchLg } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from '@/components/base/input/input';
import { Avatar } from '@/components/base/avatar/avatar';
import { UntitledLogo } from '@/components/foundations/logo/untitledui-logo';
import { NavItemButton } from '@/components/application/app-navigation/base-components/nav-item-button';
import { useNavigate } from "react-router";

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

    const handlePostTypeSelect = (typeId: string) => {
        // Navigate to the actual create page for that post type
        console.log("Selected post type:", typeId);
        // navigate(`/admin4/content2/posts/create/${typeId}`);
    };

    const handleBack = () => {
        navigate("/admin4/content2/posts");
    };

    return (
        <div className="w-full flex flex-col max-w-full self-center space-y-0 sm:space-y-0 md:space-y-0 lg:space-y-0 bg-background min-h-screen transition duration-200 ms-[calc(env(safe-area-inset-left))] me-[calc(env(safe-area-inset-right))]">
            {/* Header Navigation */}
            <header className="sticky top-0 z-50 bg-primary border-b border-secondary">
                <div className="flex h-16 w-full items-center justify-center">
                    <div className="flex w-full max-w-container justify-between pr-3 pl-4 md:px-8">
                        <div className="flex flex-1 items-center gap-4">
                            <a
                                aria-label="Go to homepage"
                                href="/"
                                className="rounded-sm outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
                            >
                                <UntitledLogo className="h-8" />
                            </a>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="hidden lg:block max-w-md w-full">
                                <Input 
                                    shortcut 
                                    size="sm" 
                                    aria-label="Search" 
                                    placeholder="Search or ask a question (⌘ + /)" 
                                    icon={SearchLg}
                                />
                            </div>

                            <div className="hidden lg:flex">
                                <Button size="sm" color="primary" iconLeading={Plus}>
                                    Create
                                </Button>
                            </div>

                            <div className="relative">
                                <NavItemButton 
                                    label="Notifications" 
                                    icon={Bell01}
                                    size="md"
                                />
                                <div className="absolute -top-1 -right-1 bg-error-solid text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                                    93
                                </div>
                            </div>

                            <div className="relative">
                                <NavItemButton 
                                    label="Messages" 
                                    icon={MessageChatCircle}
                                    size="md" 
                                />
                                <div className="absolute -top-1 -right-1 bg-error-solid text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                                    2
                                </div>
                            </div>

                            <div className="hidden lg:flex">
                                <NavItemButton 
                                    label="Toggle dark mode" 
                                    icon={Moon01}
                                    size="md"
                                />
                            </div>

                            <div className="hidden lg:flex">
                                <NavItemButton 
                                    label="Language" 
                                    icon={() => <span className="text-sm">🇺🇸</span>}
                                    size="md"
                                />
                            </div>

                            <Avatar 
                                size="md"
                                initials="A"
                                className="cursor-pointer"
                            />
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
                    
                    {/* Card Container */}
                    <div className="border border-gray-300 rounded-xl flex flex-col text-content-subdued transition duration-200 justify-between bg-surface">
                        {/* Header */}
                        <div className="px-4 py-5 sm:p-6 pb-0 sm:pb-0">
                            <h3 className="text-primary font-medium text-lg">
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
                            <ul className="flex flex-col divide-y divide-secondary border-t border-secondary">
                                {postTypes.map((postType) => (
                                    <li key={postType.id} className="py-0">
                                        <button
                                            onClick={() => handlePostTypeSelect(postType.id)}
                                            className="cursor-pointer rounded-md transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand hover:bg-secondary px-4 py-5 sm:p-6 flex space-x-3 items-center w-full text-left group"
                                        >
                                            {/* Icon */}
                                            <div className="flex items-center justify-center shrink-0 h-6 w-6">
                                                <postType.icon className={`h-6 w-6 ${postType.iconColor}`} />
                                            </div>

                                            {/* Label and Badge */}
                                            <div className="flex-1 flex items-center gap-2">
                                                <span className="text-primary font-medium">
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
                                            <ChevronRight className="w-6 h-6 text-quaternary group-hover:text-tertiary shrink-0 transition-colors" />
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

