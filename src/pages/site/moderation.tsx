import React, { useState } from "react";
import { SiteAdminLayout } from "@/components/layouts/site-admin-layout";
import { 
    Edit05, 
    Calendar, 
    Shield01, 
    UserCheck01, 
    AlertCircle,
    FileShield02,
    Users01,
    X,
    CheckCircle,
    Eye,
    Trash01,
    MessageSquare01,
    ArrowLeft,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { Avatar } from "@/components/base/avatar/avatar";
import { Dropdown } from "@/components/base/dropdown/dropdown";

// Left Sidebar Navigation
const LeftSidebarContent = ({ currentSection }: { currentSection: string }) => {
    const sections = [
        { 
            title: "Content planning",
            items: [
                { id: "draft-posts", label: "Draft posts", count: 0, icon: Edit05 },
                { id: "scheduled-posts", label: "Scheduled posts", count: 0, icon: Calendar },
            ]
        },
        {
            title: "Content moderation",
            items: [
                { id: "pending-posts", label: "Pending posts", count: 0, icon: FileShield02 },
                { id: "reported-posts", label: "Reported posts", count: 0, icon: Shield01 },
            ]
        },
        {
            title: "Member moderation",
            items: [
                { id: "pending-members", label: "Pending members", count: 0, icon: UserCheck01 },
                { id: "reported-members", label: "Reported members", count: 0, icon: AlertCircle },
            ]
        }
    ];

    return (
        <div className="space-y-6">
            {/* Back to Community Button */}
            <button 
                onClick={() => window.location.href = '/site/feed'}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-secondary dark:text-gray-300 hover:bg-secondary dark:hover:bg-gray-800 hover:text-primary dark:hover:text-gray-100 border border-secondary dark:border-gray-700"
            >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to community</span>
            </button>
            {sections.map((section, idx) => (
                <div key={idx}>
                    <h3 className="text-sm font-medium text-tertiary dark:text-gray-400 mb-3">{section.title}</h3>
                    <ul className="space-y-1">
                        {section.items.map((item) => {
                            const Icon = item.icon;
                            return (
                                <li key={item.id}>
                                    <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors text-secondary dark:text-gray-300 hover:bg-secondary dark:hover:bg-gray-800 hover:text-primary dark:hover:text-gray-100">
                                        <div className="flex items-center gap-2">
                                            <Icon className="h-4 w-4" />
                                            <span>{item.label}</span>
                                        </div>
                                        <Badge color="gray" size="sm">{item.count}</Badge>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}
        </div>
    );
};

// Right Sidebar Content
const RightSidebarContent = () => {
    return (
        <div className="space-y-6">
            {/* Summary Card */}
            <div className="rounded-xl bg-primary dark:bg-gray-900 border border-secondary dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-primary dark:text-gray-100 mb-2">Summary</h3>
                <p className="text-sm text-secondary dark:text-gray-300 mb-4">Good morning,</p>
                <p className="text-sm text-tertiary dark:text-gray-400 mb-4">Nothing to moderate here.</p>
                <Button color="secondary" size="sm" iconLeading={Shield01} className="w-full">
                    Moderation settings
                </Button>
            </div>
        </div>
    );
};

// Main Content - "All is clear" state
export default function SiteModerationPage() {
    return (
        <SiteAdminLayout
            currentPath="/site/moderation"
            leftSidebarContent={<LeftSidebarContent currentSection="pending-posts" />}
            rightSidebarContent={<RightSidebarContent />}
        >
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="mb-6">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success-50 dark:bg-success-900/20 mb-4">
                            <CheckCircle className="h-10 w-10 text-success-600 dark:text-success-400" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-primary dark:text-gray-100 mb-2">
                        All is clear! 🎉
                    </h1>
                    <p className="text-lg text-tertiary dark:text-gray-400 max-w-md mx-auto">
                        There are no items pending moderation at this time.
                    </p>
                </div>
            </div>
        </SiteAdminLayout>
    );
}

