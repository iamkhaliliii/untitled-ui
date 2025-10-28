import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
    BarChart03,
    TrendUp02,
    Users01,
    Package,
    Building05,
    FileCheck02,
    Mail01,
    Eye,
    Heart,
    MessageSquare02,
    Share07,
    Calendar,
    ChevronDown,
    Download01,
    FilterLines,
    SearchLg,
    ArrowUp,
    ArrowDown,
    Activity,
    Clock,
    UserCheck01,
    Edit01,
    Trash01,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { Input } from "@/components/base/input/input";
import { Admin4Layout } from "@/components/layouts/admin4-layout";
import { MobileSpaceTabs } from "@/components/application/app-navigation-admin4/mobile-space-tabs";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { ProgressBar } from "@/components/base/progress-indicators/progress-indicators";
import { Avatar } from "@/components/base/avatar/avatar";
import { Dropdown } from "@/components/base/dropdown/dropdown";

// Sample overview stats
const overviewStats = [
    {
        id: 1,
        label: "Total Members",
        value: "2,456",
        change: "+12%",
        trend: "up",
        icon: Users01,
        color: "blue"
    },
    {
        id: 2,
        label: "Active Members",
        value: "1,823",
        change: "+8%",
        trend: "up",
        icon: UserCheck01,
        color: "green"
    },
    {
        id: 3,
        label: "Total Posts",
        value: "8,234",
        change: "+24%",
        trend: "up",
        icon: Package,
        color: "purple"
    },
    {
        id: 4,
        label: "Engagement Rate",
        value: "68%",
        change: "+5%",
        trend: "up",
        icon: TrendUp02,
        color: "orange"
    }
];

// Sample reach & engagement data
const reachEngagementData = [
    {
        id: 1,
        metric: "Page Views",
        thisMonth: "45,230",
        lastMonth: "38,120",
        change: "+18.6%",
        trend: "up"
    },
    {
        id: 2,
        metric: "Unique Visitors",
        thisMonth: "12,456",
        lastMonth: "11,230",
        change: "+10.9%",
        trend: "up"
    },
    {
        id: 3,
        metric: "Avg. Session Duration",
        thisMonth: "8m 34s",
        lastMonth: "7m 12s",
        change: "+19.1%",
        trend: "up"
    },
    {
        id: 4,
        metric: "Bounce Rate",
        thisMonth: "32%",
        lastMonth: "38%",
        change: "-15.8%",
        trend: "down"
    },
    {
        id: 5,
        metric: "Total Reactions",
        thisMonth: "23,456",
        lastMonth: "19,234",
        change: "+22.0%",
        trend: "up"
    }
];

// Sample people data
const peopleData = [
    {
        id: 1,
        name: "Olivia Rhye",
        email: "olivia@untitledui.com",
        avatar: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80",
        posts: 48,
        reactions: 234,
        comments: 156,
        joinedDate: "Jan 4, 2024"
    },
    {
        id: 2,
        name: "Phoenix Baker",
        email: "phoenix@untitledui.com",
        avatar: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80",
        posts: 42,
        reactions: 198,
        comments: 132,
        joinedDate: "Jan 5, 2024"
    },
    {
        id: 3,
        name: "Lana Steiner",
        email: "lana@untitledui.com",
        avatar: "https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80",
        posts: 38,
        reactions: 187,
        comments: 124,
        joinedDate: "Jan 6, 2024"
    }
];

// Sample posts analytics
const postsAnalytics = [
    {
        id: 1,
        title: "Product Launch: New Features",
        author: "Olivia Rhye",
        views: 1234,
        reactions: 89,
        comments: 45,
        shares: 23,
        publishedDate: "Jan 20, 2024"
    },
    {
        id: 2,
        title: "Community Guidelines Update",
        author: "Phoenix Baker",
        views: 987,
        reactions: 67,
        comments: 34,
        shares: 12,
        publishedDate: "Jan 19, 2024"
    },
    {
        id: 3,
        title: "Monthly Newsletter - January",
        author: "Lana Steiner",
        views: 856,
        reactions: 54,
        comments: 28,
        shares: 15,
        publishedDate: "Jan 18, 2024"
    }
];

// Sample spaces analytics
const spacesAnalytics = [
    {
        id: 1,
        name: "General Discussion",
        members: 1234,
        posts: 456,
        engagement: 78,
        growth: "+12%"
    },
    {
        id: 2,
        name: "Feature Requests",
        members: 892,
        posts: 234,
        engagement: 85,
        growth: "+18%"
    },
    {
        id: 3,
        name: "Support",
        members: 756,
        posts: 389,
        engagement: 72,
        growth: "+8%"
    }
];

// Sample audit logs
const auditLogs = [
    {
        id: 1,
        user: "Olivia Rhye",
        avatar: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80",
        action: "Updated site settings",
        resource: "Settings",
        timestamp: "2 hours ago",
        status: "success"
    },
    {
        id: 2,
        user: "Phoenix Baker",
        avatar: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80",
        action: "Deleted user account",
        resource: "User: john@example.com",
        timestamp: "3 hours ago",
        status: "success"
    },
    {
        id: 3,
        user: "Lana Steiner",
        avatar: "https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80",
        action: "Created new space",
        resource: "Space: Events",
        timestamp: "5 hours ago",
        status: "success"
    },
    {
        id: 4,
        user: "Drew Cano",
        avatar: "https://www.untitledui.com/images/avatars/drew-cano?fm=webp&q=80",
        action: "Failed login attempt",
        resource: "Authentication",
        timestamp: "1 day ago",
        status: "error"
    }
];

// Sample email logs
const emailLogs = [
    {
        id: 1,
        recipient: "olivia@untitledui.com",
        subject: "Welcome to the Community",
        type: "Onboarding",
        status: "Delivered",
        sentDate: "Jan 20, 2024 10:30 AM",
        openRate: true
    },
    {
        id: 2,
        recipient: "phoenix@untitledui.com",
        subject: "New reply to your post",
        type: "Notification",
        status: "Delivered",
        sentDate: "Jan 20, 2024 09:15 AM",
        openRate: true
    },
    {
        id: 3,
        recipient: "lana@untitledui.com",
        subject: "Weekly Digest",
        type: "Newsletter",
        status: "Delivered",
        sentDate: "Jan 20, 2024 08:00 AM",
        openRate: false
    },
    {
        id: 4,
        recipient: "user@example.com",
        subject: "Password Reset Request",
        type: "Transactional",
        status: "Bounced",
        sentDate: "Jan 19, 2024 05:45 PM",
        openRate: false
    }
];

export const AdminReportPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isDesktop = useBreakpoint("lg");

    // Check if we're on a specific report page
    const isOverviewPage = location.pathname === '/admin4/report' || location.pathname === '/admin4/report/';
    const isReachPage = location.pathname === '/admin4/report/reach';
    const isPeoplePage = location.pathname === '/admin4/report/people';
    const isPostsPage = location.pathname === '/admin4/report/posts';
    const isSpacesPage = location.pathname === '/admin4/report/spaces';
    const isAuditLogsPage = location.pathname === '/admin4/report/audit-logs';
    const isEmailLogsPage = location.pathname === '/admin4/report/email-logs';

    const getPageTitle = () => {
        if (isOverviewPage) return "Overview";
        if (isReachPage) return "Reach & Engagement";
        if (isPeoplePage) return "People";
        if (isPostsPage) return "Posts";
        if (isSpacesPage) return "Spaces";
        if (isAuditLogsPage) return "Audit Logs";
        if (isEmailLogsPage) return "Email Logs";
        return "Reports";
    };

    const getPageDescription = () => {
        if (isOverviewPage) return "View key metrics and analytics overview";
        if (isReachPage) return "Track reach and engagement metrics";
        if (isPeoplePage) return "Analyze member activity and behavior";
        if (isPostsPage) return "Monitor post performance and engagement";
        if (isSpacesPage) return "Review space analytics and growth";
        if (isAuditLogsPage) return "View system activity and security logs";
        if (isEmailLogsPage) return "Monitor email delivery and engagement";
        return "View analytics and reports";
    };

    // Determine current page type for tabs
    const getCurrentPageType = () => {
        if (location.pathname.includes("/reach")) return "reach";
        if (location.pathname.includes("/people")) return "people";
        if (location.pathname.includes("/posts")) return "posts";
        if (location.pathname.includes("/spaces")) return "spaces";
        if (location.pathname.includes("/audit-logs")) return "audit-logs";
        if (location.pathname.includes("/email-logs")) return "email-logs";
        return "overview";
    };

    const currentPageType = getCurrentPageType();

    // Define tabs for report pages
    const reportTabs = [
        { id: "overview", label: "Overview", path: "" },
        { id: "reach", label: "Reach & engagement", path: "/reach" },
        { id: "people", label: "People", path: "/people" },
        { id: "posts", label: "Posts", path: "/posts" },
        { id: "spaces", label: "Spaces", path: "/spaces" },
        { id: "audit-logs", label: "Audit logs", path: "/audit-logs" },
        { id: "email-logs", label: "Email logs", path: "/email-logs" },
    ];

    // Get base path
    const getBasePath = () => {
        return "/admin4/report";
    };

    // Render header actions
    const renderHeaderActions = () => (
        <div className="flex items-center gap-2">
            <Button
                color="secondary"
                size="sm"
                className="text-xs px-3 py-1.5"
                iconLeading={Calendar}
            >
                Last 30 days
            </Button>
            <Button
                color="secondary"
                size="sm"
                className="text-xs px-3 py-1.5"
                iconLeading={Download01}
            >
                Export
            </Button>
        </div>
    );

    return (
        <Admin4Layout
            title={`Reports - ${getPageTitle()}`}
            description={getPageDescription()}
            currentPath={location.pathname}
            hideHeader={true}
            headerActions={renderHeaderActions()}
            mobileTabSelector={
                <MobileSpaceTabs
                    basePath={getBasePath()}
                    tabs={reportTabs}
                    currentTab={currentPageType}
                    headerActions={renderHeaderActions()}
                />
            }
        >
            <div className="px-4 py-6 lg:px-6">
                <div className="flex flex-col lg:p-1 space-y-6">
                    {/* Overview Page */}
                    {isOverviewPage && (
                        <>
                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {overviewStats.map((stat) => {
                                    const Icon = stat.icon;
                                    const getIconColor = () => {
                                        switch(stat.color) {
                                            case 'blue': return 'text-blue-600 dark:text-blue-400';
                                            case 'green': return 'text-green-600 dark:text-green-400';
                                            case 'purple': return 'text-purple-600 dark:text-purple-400';
                                            case 'orange': return 'text-orange-600 dark:text-orange-400';
                                            default: return 'text-brand-secondary';
                                        }
                                    };
                                    return (
                                        <div
                                            key={stat.id}
                                            className="rounded-xl bg-primary dark:bg-gray-900 border border-secondary dark:border-gray-700 p-6 shadow-xs"
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <Icon className={`size-8 ${getIconColor()}`} />
                                                <div className="flex items-center gap-1">
                                                    {stat.trend === "up" ? (
                                                        <ArrowUp className="size-4 text-success-solid dark:text-green-400" />
                                                    ) : (
                                                        <ArrowDown className="size-4 text-error-solid dark:text-red-400" />
                                                    )}
                                                    <span className={`text-sm font-medium ${stat.trend === "up" ? "text-success-solid dark:text-green-400" : "text-error-solid dark:text-red-400"}`}>
                                                        {stat.change}
                                                    </span>
                                                </div>
                                            </div>
                                            <h3 className="text-sm font-medium text-tertiary dark:text-gray-400 mb-1">
                                                {stat.label}
                                            </h3>
                                            <p className="text-3xl font-bold text-primary dark:text-gray-100">
                                                {stat.value}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="rounded-xl bg-primary dark:bg-gray-900 border border-secondary dark:border-gray-700 p-6 shadow-xs">
                                    <h3 className="text-lg font-semibold text-primary dark:text-gray-100 mb-4">Top Contributors</h3>
                                    <div className="space-y-4">
                                        {peopleData.slice(0, 3).map((person) => (
                                            <div key={person.id} className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <Avatar src={person.avatar} alt={person.name} size="sm" />
                                                    <div>
                                                        <p className="text-sm font-medium text-primary dark:text-gray-100">{person.name}</p>
                                                        <p className="text-xs text-tertiary dark:text-gray-400">{person.posts} posts</p>
                                                    </div>
                                                </div>
                                                <Badge color="success" size="sm">{person.reactions} reactions</Badge>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-xl bg-primary dark:bg-gray-900 border border-secondary dark:border-gray-700 p-6 shadow-xs">
                                    <h3 className="text-lg font-semibold text-primary dark:text-gray-100 mb-4">Popular Posts</h3>
                                    <div className="space-y-4">
                                        {postsAnalytics.slice(0, 3).map((post) => (
                                            <div key={post.id} className="flex items-start justify-between">
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-primary dark:text-gray-100 truncate">{post.title}</p>
                                                    <p className="text-xs text-tertiary dark:text-gray-400">{post.views} views</p>
                                                </div>
                                                <div className="flex items-center gap-2 ml-3">
                                                    <span className="text-xs text-tertiary dark:text-gray-400">{post.reactions}</span>
                                                    <Heart className="size-4 text-error-solid dark:text-red-400" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Reach & Engagement Page */}
                    {isReachPage && (
                        <div className="rounded-xl bg-primary dark:bg-gray-900 border border-secondary dark:border-gray-700 shadow-xs overflow-hidden">
                            <div className="px-6 py-4 border-b border-secondary dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-primary dark:text-gray-100">Engagement Metrics</h3>
                            </div>
                            <div className="relative overflow-x-auto">
                                <table className="min-w-full divide-y divide-secondary dark:divide-gray-700">
                                    <thead className="bg-secondary/20 dark:bg-gray-800/50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400">
                                                Metric
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400">
                                                This Month
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400">
                                                Last Month
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400">
                                                Change
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-secondary dark:divide-gray-700">
                                        {reachEngagementData.map((item) => (
                                            <tr key={item.id} className="hover:bg-secondary/20 dark:hover:bg-gray-800/50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="text-sm font-medium text-primary dark:text-gray-100">{item.metric}</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="text-sm text-secondary dark:text-gray-300">{item.thisMonth}</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="text-sm text-tertiary dark:text-gray-400">{item.lastMonth}</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-1">
                                                        {item.trend === "up" ? (
                                                            <>
                                                                <ArrowUp className="size-4 text-success-solid dark:text-green-400" />
                                                                <span className="text-sm font-medium text-success-solid dark:text-green-400">{item.change}</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <ArrowDown className="size-4 text-success-solid dark:text-green-400" />
                                                                <span className="text-sm font-medium text-success-solid dark:text-green-400">{item.change}</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* People Page */}
                    {isPeoplePage && (
                        <div className="rounded-xl bg-primary dark:bg-gray-900 border border-secondary dark:border-gray-700 shadow-xs overflow-hidden">
                            <div className="px-6 py-4 border-b border-secondary dark:border-gray-700 flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-primary dark:text-gray-100">Member Analytics</h3>
                                <div className="relative w-64">
                                    <SearchLg className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-fg-quaternary dark:text-gray-500" />
                                    <Input placeholder="Search members..." className="w-full pl-10" size="sm" />
                                </div>
                            </div>
                            <div className="relative overflow-x-auto">
                                <table className="min-w-full divide-y divide-secondary dark:divide-gray-700">
                                    <thead className="bg-secondary/20 dark:bg-gray-800/50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400">
                                                Member
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400">
                                                Posts
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400">
                                                Reactions
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400">
                                                Comments
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400">
                                                Joined
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-secondary dark:divide-gray-700">
                                        {peopleData.map((person) => (
                                            <tr key={person.id} className="hover:bg-secondary/20 dark:hover:bg-gray-800/50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar src={person.avatar} alt={person.name} size="sm" />
                                                        <div>
                                                            <p className="text-sm font-medium text-primary dark:text-gray-100">{person.name}</p>
                                                            <p className="text-xs text-tertiary dark:text-gray-400">{person.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="text-sm text-secondary dark:text-gray-300">{person.posts}</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="text-sm text-secondary dark:text-gray-300">{person.reactions}</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="text-sm text-secondary dark:text-gray-300">{person.comments}</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="text-sm text-tertiary dark:text-gray-400">{person.joinedDate}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Posts Page */}
                    {isPostsPage && (
                        <div className="rounded-xl bg-primary dark:bg-gray-900 border border-secondary dark:border-gray-700 shadow-xs overflow-hidden">
                            <div className="px-6 py-4 border-b border-secondary dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-primary dark:text-gray-100">Post Analytics</h3>
                            </div>
                            <div className="relative overflow-x-auto">
                                <table className="min-w-full divide-y divide-secondary dark:divide-gray-700">
                                    <thead className="bg-secondary/20 dark:bg-gray-800/50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400">
                                                Post
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400">
                                                Views
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400">
                                                Reactions
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400">
                                                Comments
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400">
                                                Shares
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400">
                                                Date
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-secondary dark:divide-gray-700">
                                        {postsAnalytics.map((post) => (
                                            <tr key={post.id} className="hover:bg-secondary/20 dark:hover:bg-gray-800/50">
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <p className="text-sm font-medium text-primary dark:text-gray-100">{post.title}</p>
                                                        <p className="text-xs text-tertiary dark:text-gray-400">by {post.author}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        <Eye className="size-4 text-brand-secondary" />
                                                        <span className="text-sm text-secondary dark:text-gray-300">{post.views}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        <Heart className="size-4 text-error-solid" />
                                                        <span className="text-sm text-secondary dark:text-gray-300">{post.reactions}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        <MessageSquare02 className="size-4 text-brand-secondary" />
                                                        <span className="text-sm text-secondary dark:text-gray-300">{post.comments}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        <Share07 className="size-4 text-brand-secondary" />
                                                        <span className="text-sm text-secondary dark:text-gray-300">{post.shares}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="text-sm text-tertiary dark:text-gray-400">{post.publishedDate}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Spaces Page */}
                    {isSpacesPage && (
                        <div className="rounded-xl bg-primary dark:bg-gray-900 border border-secondary dark:border-gray-700 shadow-xs overflow-hidden">
                            <div className="px-6 py-4 border-b border-secondary dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-primary dark:text-gray-100">Space Analytics</h3>
                            </div>
                            <div className="relative overflow-x-auto">
                                <table className="min-w-full divide-y divide-secondary dark:divide-gray-700">
                                    <thead className="bg-secondary/20 dark:bg-gray-800/50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400">
                                                Space
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400">
                                                Members
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400">
                                                Posts
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400">
                                                Engagement
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400">
                                                Growth
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-secondary dark:divide-gray-700">
                                        {spacesAnalytics.map((space) => (
                                            <tr key={space.id} className="hover:bg-secondary/20 dark:hover:bg-gray-800/50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="text-sm font-medium text-primary dark:text-gray-100">{space.name}</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="text-sm text-secondary dark:text-gray-300">{space.members}</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="text-sm text-secondary dark:text-gray-300">{space.posts}</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-24">
                                                            <ProgressBar
                                                                labelPosition="none"
                                                                min={0}
                                                                max={100}
                                                                value={space.engagement}
                                                                size="sm"
                                                            />
                                                        </div>
                                                        <span className="text-sm text-secondary dark:text-gray-300">{space.engagement}%</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <Badge color="success" size="sm">{space.growth}</Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Audit Logs Page */}
                    {isAuditLogsPage && (
                        <div className="rounded-xl bg-primary dark:bg-gray-900 border border-secondary dark:border-gray-700 shadow-xs overflow-hidden">
                            <div className="px-6 py-4 border-b border-secondary dark:border-gray-700 flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-primary dark:text-gray-100">System Activity</h3>
                                <div className="flex items-center gap-2">
                                    <Button color="secondary" size="sm" iconLeading={FilterLines}>Filter</Button>
                                </div>
                            </div>
                            <div className="relative overflow-x-auto">
                                <table className="min-w-full divide-y divide-secondary dark:divide-gray-700">
                                    <thead className="bg-secondary/20 dark:bg-gray-800/50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400">
                                                User
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400">
                                                Action
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400">
                                                Resource
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400">
                                                Timestamp
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-secondary dark:divide-gray-700">
                                        {auditLogs.map((log) => (
                                            <tr key={log.id} className="hover:bg-secondary/20 dark:hover:bg-gray-800/50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar src={log.avatar} alt={log.user} size="sm" />
                                                        <span className="text-sm font-medium text-primary dark:text-gray-100">{log.user}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm text-secondary dark:text-gray-300">{log.action}</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="text-sm text-tertiary dark:text-gray-400">{log.resource}</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="size-4 text-tertiary dark:text-gray-500" />
                                                        <span className="text-sm text-tertiary dark:text-gray-400">{log.timestamp}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <Badge color={log.status === 'success' ? 'success' : 'error'} size="sm">
                                                        {log.status}
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Email Logs Page */}
                    {isEmailLogsPage && (
                        <div className="rounded-xl bg-primary dark:bg-gray-900 border border-secondary dark:border-gray-700 shadow-xs overflow-hidden">
                            <div className="px-6 py-4 border-b border-secondary dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-primary dark:text-gray-100">Email Delivery Log</h3>
                            </div>
                            <div className="relative overflow-x-auto">
                                <table className="min-w-full divide-y divide-secondary dark:divide-gray-700">
                                    <thead className="bg-secondary/20 dark:bg-gray-800/50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400">
                                                Recipient
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400">
                                                Subject
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400">
                                                Type
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400">
                                                Status
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400">
                                                Sent
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400">
                                                Opened
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-secondary dark:divide-gray-700">
                                        {emailLogs.map((email) => (
                                            <tr key={email.id} className="hover:bg-secondary/20 dark:hover:bg-gray-800/50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        <Mail01 className="size-4 text-brand-secondary" />
                                                        <span className="text-sm text-primary dark:text-gray-100">{email.recipient}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm text-secondary dark:text-gray-300">{email.subject}</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <Badge color="gray" size="sm">{email.type}</Badge>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <Badge color={email.status === 'Delivered' ? 'success' : 'error'} size="sm">
                                                        {email.status}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="text-sm text-tertiary dark:text-gray-400">{email.sentDate}</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {email.openRate ? (
                                                        <Badge color="success" size="sm">Yes</Badge>
                                                    ) : (
                                                        <Badge color="gray" size="sm">No</Badge>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Admin4Layout>
    );
};

