import React, { useState } from "react";
import { useNavigate } from "react-router";
import { 
    ArrowLeft, 
    MessageSquare01, 
    BookOpen01, 
    MessageChatCircle, 
    HelpCircle, 
    Edit03, 
    Calendar, 
    FileX02, 
    Briefcase01, 
    Lightbulb01, 
    Microphone01, 
    File01, 
    Globe01, 
    Users01, 
    Users03,
    Package
} from "@untitledui/icons";
import { AdminLayout } from "@/components/layouts/admin-layout";
import { Button } from "@/components/base/buttons/button";

const spaceTypes = [
    {
        id: "explore",
        label: "Explore",
        description: "A general exploration space for community discovery",
        icon: Package,
        color: "bg-blue-100/20 text-blue-400"
    },
    {
        id: "guidelines",
        label: "Guidelines",
        description: "Community guidelines and rules",
        icon: BookOpen01,
        color: "bg-purple-100/20 text-purple-400"
    },
    {
        id: "discussions",
        label: "Discussions",
        description: "Open discussions and conversations",
        icon: MessageSquare01,
        color: "bg-green-100/20 text-green-400"
    },
    {
        id: "questions",
        label: "Questions",
        description: "Q&A and help requests",
        icon: HelpCircle,
        color: "bg-orange-100/20 text-orange-400"
    },
    {
        id: "articles",
        label: "Articles",
        description: "Blog posts and articles",
        icon: Edit03,
        color: "bg-indigo-100/20 text-indigo-400"
    },
    {
        id: "events",
        label: "Events",
        description: "Community events and meetups",
        icon: Calendar,
        color: "bg-red-100/20 text-red-400"
    },
    {
        id: "changelogs",
        label: "Changelogs",
        description: "Product updates and release notes",
        icon: FileX02,
        color: "bg-teal-100/20 text-teal-400"
    },
    {
        id: "jobs",
        label: "Jobs",
        description: "Job postings and career opportunities",
        icon: Briefcase01,
        color: "bg-yellow-100/20 text-yellow-400"
    },
    {
        id: "wishlist",
        label: "Wishlist",
        description: "Feature requests and ideas",
        icon: Lightbulb01,
        color: "bg-pink-100/20 text-pink-400"
    },
    {
        id: "podcast",
        label: "Podcast",
        description: "Podcast episodes and audio content",
        icon: Microphone01,
        color: "bg-cyan-100/20 text-cyan-400"
    },
    {
        id: "blank",
        label: "Blank",
        description: "Start with a blank space",
        icon: File01,
        color: "bg-gray-100/20 text-gray-400"
    },
    {
        id: "landing-page",
        label: "Landing Page",
        description: "Create a landing page for your community",
        icon: Globe01,
        color: "bg-emerald-100/20 text-emerald-400"
    },
    {
        id: "experts-directory",
        label: "Experts Directory",
        description: "Directory of community experts",
        icon: Users01,
        color: "bg-violet-100/20 text-violet-400"
    },
    {
        id: "partners-directory",
        label: "Partners Directory",
        description: "Directory of partners and collaborators",
        icon: Users03,
        color: "bg-rose-100/20 text-rose-400"
    }
];

export const SiteSpacesCreatePage = () => {
    const navigate = useNavigate();
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const handleBack = () => {
        navigate("/admin2/site");
    };

    const handleSpaceSelect = (typeId: string) => {
        setSelectedType(typeId);
        // For now, just navigate back - you can extend this to create the actual space
        console.log("Selected space type:", typeId);
        // TODO: Add space creation logic here
        navigate("/admin2/site");
    };

    return (
        <AdminLayout 
            title="Create New Space"
            description="Choose a space type to get started"
            currentPath="/admin2/site/spaces/create"
        >
            <div className="max-w-4xl mx-auto p-6">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Create New Space
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Choose the type of space you want to create for your community
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {spaceTypes.map((type) => {
                        const IconComponent = type.icon;
                        return (
                            <button
                                key={type.id}
                                onClick={() => handleSpaceSelect(type.id)}
                                className="group relative p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-md transition-all duration-200 text-left"
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`p-2 rounded-lg ${type.color}`}>
                                        <IconComponent className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {type.label}
                                        </h3>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                                            {type.description}
                                        </p>
                                    </div>
                                </div>
                                
                                {/* Hover effect */}
                                <div className="absolute inset-0 bg-blue-50 dark:bg-blue-900/10 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-200 pointer-events-none" />
                            </button>
                        );
                    })}
                </div>

                <div className="mt-8 flex justify-center">
                    <Button
                        color="secondary"
                        onClick={handleBack}
                        iconLeading={ArrowLeft}
                    >
                        Back to Site
                    </Button>
                </div>
            </div>
        </AdminLayout>
    );
};
