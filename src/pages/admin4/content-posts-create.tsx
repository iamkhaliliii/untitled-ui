import { ArrowLeft, Calendar, Edit03, MessageSquare01, BookOpen01, HelpCircle, ChevronRight, Package } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
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
        <div className="min-h-screen bg-primary">
            <div className="w-full flex flex-col max-w-full self-center space-y-3 sm:space-y-3.5 md:space-y-4 lg:space-y-5 sm:py-3.5 md:py-4 lg:py-5 sm:px-3.5 md:px-4 lg:px-5">
                <div className="w-full flex flex-col max-w-full md:max-w-3xl self-center mx-auto space-y-3 sm:space-y-3.5 md:space-y-4 lg:space-y-5 py-0 px-0">
                    {/* Card Container */}
                    <div className="border border-secondary flex flex-col text-tertiary transition duration-200 justify-between bg-primary shadow-sm sm:rounded-xl">
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
                                                        <span className="text-xs font-medium text-violet-700 dark:text-violet-300">Module</span>
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
        </div>
    );
};

