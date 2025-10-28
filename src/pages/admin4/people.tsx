import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
    Users01,
    UserSquare,
    UsersPlus,
    User01,
    Archive,
    Plus,
    SearchLg,
    Eye,
    Edit01,
    Trash01,
    ChevronDown,
    DotsHorizontal,
    FilterLines,
    Mail01,
    CheckCircle,
    XCircle,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { Input } from "@/components/base/input/input";
import { Admin4Layout } from "@/components/layouts/admin4-layout";
import { Avatar } from "@/components/base/avatar/avatar";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { MobileSpaceTabs } from "@/components/application/app-navigation-admin4/mobile-space-tabs";
import { useBreakpoint } from "@/hooks/use-breakpoint";

// Sample members data
const sampleMembers = [
    {
        id: 1,
        name: "Olivia Rhye",
        email: "olivia@untitledui.com",
        avatar: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80",
        role: "Admin",
        status: "Active",
        joinedDate: "Jan 4, 2024",
        posts: 24,
        lastSeen: "2 hours ago"
    },
    {
        id: 2,
        name: "Phoenix Baker",
        email: "phoenix@untitledui.com",
        avatar: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80",
        role: "Member",
        status: "Active",
        joinedDate: "Jan 5, 2024",
        posts: 18,
        lastSeen: "5 hours ago"
    },
    {
        id: 3,
        name: "Lana Steiner",
        email: "lana@untitledui.com",
        avatar: "https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80",
        role: "Moderator",
        status: "Active",
        joinedDate: "Jan 6, 2024",
        posts: 32,
        lastSeen: "1 day ago"
    },
    {
        id: 4,
        name: "Demi Wilkinson",
        email: "demi@untitledui.com",
        avatar: "https://www.untitledui.com/images/avatars/demi-wilkinson?fm=webp&q=80",
        role: "Member",
        status: "Inactive",
        joinedDate: "Jan 7, 2024",
        posts: 5,
        lastSeen: "1 week ago"
    },
    {
        id: 5,
        name: "Candice Wu",
        email: "candice@untitledui.com",
        avatar: "https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80",
        role: "Member",
        status: "Active",
        joinedDate: "Jan 8, 2024",
        posts: 12,
        lastSeen: "3 hours ago"
    }
];

// Sample staff data
const sampleStaff = [
    {
        id: 1,
        name: "Drew Cano",
        email: "drew@untitledui.com",
        avatar: "https://www.untitledui.com/images/avatars/drew-cano?fm=webp&q=80",
        role: "Admin",
        department: "Engineering",
        permissions: "Full Access",
        joinedDate: "Dec 1, 2023"
    },
    {
        id: 2,
        name: "Orlando Diggs",
        email: "orlando@untitledui.com",
        avatar: "https://www.untitledui.com/images/avatars/orlando-diggs?fm=webp&q=80",
        role: "Moderator",
        department: "Community",
        permissions: "Content Management",
        joinedDate: "Dec 15, 2023"
    }
];

// Sample invitations data
const sampleInvitations = [
    {
        id: 1,
        email: "john.doe@example.com",
        role: "Member",
        invitedBy: "Olivia Rhye",
        invitedDate: "Jan 10, 2024",
        status: "Pending",
        expiresIn: "5 days"
    },
    {
        id: 2,
        email: "jane.smith@example.com",
        role: "Member",
        invitedBy: "Phoenix Baker",
        invitedDate: "Jan 9, 2024",
        status: "Expired",
        expiresIn: "Expired"
    }
];

// Sample profile fields
const sampleProfileFields = [
    {
        id: 1,
        name: "Bio",
        type: "Text Area",
        required: false,
        visible: true,
        order: 1
    },
    {
        id: 2,
        name: "Location",
        type: "Text",
        required: false,
        visible: true,
        order: 2
    },
    {
        id: 3,
        name: "Website",
        type: "URL",
        required: false,
        visible: true,
        order: 3
    }
];

// Sample badges
const sampleBadges = [
    {
        id: 1,
        name: "Early Adopter",
        description: "Joined in the first month",
        icon: "🌟",
        members: 45,
        color: "blue"
    },
    {
        id: 2,
        name: "Top Contributor",
        description: "Made 100+ posts",
        icon: "🏆",
        members: 12,
        color: "gold"
    },
    {
        id: 3,
        name: "Verified",
        description: "Verified member",
        icon: "✓",
        members: 89,
        color: "green"
    }
];

export const AdminPeoplePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isDesktop = useBreakpoint("lg");

    // Check if we're on a specific people page
    const isMembersPage = location.pathname === '/admin4/people' || location.pathname === '/admin4/people/';
    const isStaffPage = location.pathname === '/admin4/people/staff';
    const isInvitationsPage = location.pathname === '/admin4/people/invitations';
    const isProfileFieldsPage = location.pathname === '/admin4/people/profile-fields';
    const isBadgesPage = location.pathname === '/admin4/people/badges';

    const getPageTitle = () => {
        if (isMembersPage) return "Members";
        if (isStaffPage) return "Staff";
        if (isInvitationsPage) return "Invitations";
        if (isProfileFieldsPage) return "Profile Fields";
        if (isBadgesPage) return "Badges";
        return "People";
    };

    const getPageDescription = () => {
        if (isMembersPage) return "Manage and organize community members";
        if (isStaffPage) return "Manage staff and administrators";
        if (isInvitationsPage) return "Manage pending invitations";
        if (isProfileFieldsPage) return "Customize member profile fields";
        if (isBadgesPage) return "Manage member badges and achievements";
        return "Manage your community members";
    };

    // Determine current page type for tabs
    const getCurrentPageType = () => {
        if (location.pathname.includes("/staff")) return "staff";
        if (location.pathname.includes("/invitations")) return "invitations";
        if (location.pathname.includes("/profile-fields")) return "profile-fields";
        if (location.pathname.includes("/badges")) return "badges";
        return "members"; // default
    };

    const currentPageType = getCurrentPageType();

    // Define tabs for people pages
    const peopleTabs = [
        { id: "members", label: "Members", path: "" },
        { id: "staff", label: "Staff", path: "/staff" },
        { id: "invitations", label: "Invitations", path: "/invitations" },
        { id: "profile-fields", label: "Profile fields", path: "/profile-fields" },
        { id: "badges", label: "Badges", path: "/badges" },
    ];

    // Get base path for current content type
    const getBasePath = () => {
        return "/admin4/people";
    };

    // Render header actions
    const renderHeaderActions = () => (
        <div className="flex items-center gap-2">
            <Button
                color="primary"
                size="sm"
                className="text-xs px-3 py-1.5"
                iconLeading={Plus}
                onClick={() => {
                    console.log("Add button clicked for:", getPageTitle());
                }}
            >
                {isMembersPage ? "Add Member" :
                 isStaffPage ? "Add Staff" :
                 isInvitationsPage ? "Send Invitation" :
                 isProfileFieldsPage ? "Add Field" :
                 isBadgesPage ? "Create Badge" : "Add"}
            </Button>
        </div>
    );

    return (
        <Admin4Layout
            title={`People - ${getPageTitle()}`}
            description={getPageDescription()}
            currentPath={location.pathname}
            hideHeader={true}
            headerActions={renderHeaderActions()}
            mobileTabSelector={
                <MobileSpaceTabs
                    basePath={getBasePath()}
                    tabs={peopleTabs}
                    currentTab={currentPageType}
                    headerActions={renderHeaderActions()}
                />
            }
        >
            <div className="px-4 py-6 lg:px-6">
                <div className="flex flex-col lg:p-1 space-y-3 lg:overflow-hidden">
                    {/* Header Section - Responsive */}
                    <div className="hidden lg:flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                        <h3 className="text-lg font-medium text-primary dark:text-gray-100">{getPageTitle()}</h3>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                            <div className="w-full sm:w-80">
                                <div className="relative">
                                    <SearchLg className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-fg-quaternary dark:text-gray-500" />
                                    <Input
                                        placeholder="Search..."
                                        className="w-full pl-10"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-4">
                                <Button
                                    color="secondary"
                                    iconLeading={FilterLines}
                                    iconTrailing={ChevronDown}
                                    size={isDesktop ? "md" : "sm"}
                                    className="flex-1 sm:flex-none"
                                >
                                    Filters
                                </Button>
                                <Button
                                    color="primary"
                                    size={isDesktop ? "md" : "sm"}
                                    className="flex-1 sm:flex-none whitespace-nowrap"
                                    onClick={() => {
                                        console.log("Add button clicked for:", getPageTitle());
                                    }}
                                >
                                    {isMembersPage ? "Add Member" :
                                     isStaffPage ? "Add Staff" :
                                     isInvitationsPage ? "Send Invitation" :
                                     isProfileFieldsPage ? "Add Field" :
                                     isBadgesPage ? "Create Badge" : "Add"}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Stats - Desktop only */}
                    <div className="hidden lg:flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                        <span className="font-medium text-primary dark:text-gray-100">
                            {isMembersPage ? `${sampleMembers.length} members` :
                             isStaffPage ? `${sampleStaff.length} staff` :
                             isInvitationsPage ? `${sampleInvitations.length} invitations` :
                             isProfileFieldsPage ? `${sampleProfileFields.length} fields` :
                             isBadgesPage ? `${sampleBadges.length} badges` : '0 items'}
                        </span>
                    </div>

                    {/* Mobile-Optimized Table */}
                    <div className="-mx-4 lg:mx-0 lg:border lg:border-secondary dark:border-gray-700 lg:rounded-xl bg-primary dark:bg-gray-900 lg:shadow-xs overflow-hidden">
                        <div className="relative overflow-x-auto">
                            <table className="min-w-full divide-y divide-secondary dark:divide-gray-700 table-fixed">
                                <thead className="bg-primary dark:bg-gray-900">
                                    <tr>
                                        {isMembersPage && (
                                            <>
                                                <th scope="col" className="pl-3 pr-1 lg:px-6 py-2 lg:py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400 whitespace-nowrap w-64">
                                                    Member
                                                </th>
                                                <th scope="col" className="px-1 lg:px-6 py-2 lg:py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400 whitespace-nowrap w-32">
                                                    Role
                                                </th>
                                                <th scope="col" className="px-1 lg:px-6 py-2 lg:py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400 whitespace-nowrap w-32">
                                                    Status
                                                </th>
                                                <th scope="col" className="px-1 lg:px-6 py-2 lg:py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400 whitespace-nowrap w-32">
                                                    Joined
                                                </th>
                                                <th scope="col" className="px-1 lg:px-6 py-2 lg:py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400 whitespace-nowrap w-24">
                                                    Posts
                                                </th>
                                                <th scope="col" className="px-1 lg:px-6 py-2 lg:py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400 whitespace-nowrap w-32">
                                                    Last Seen
                                                </th>
                                            </>
                                        )}
                                        {isStaffPage && (
                                            <>
                                                <th scope="col" className="pl-3 pr-1 lg:px-6 py-2 lg:py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400 whitespace-nowrap w-64">
                                                    Staff Member
                                                </th>
                                                <th scope="col" className="px-1 lg:px-6 py-2 lg:py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400 whitespace-nowrap w-32">
                                                    Role
                                                </th>
                                                <th scope="col" className="px-1 lg:px-6 py-2 lg:py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400 whitespace-nowrap w-32">
                                                    Department
                                                </th>
                                                <th scope="col" className="px-1 lg:px-6 py-2 lg:py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400 whitespace-nowrap w-48">
                                                    Permissions
                                                </th>
                                                <th scope="col" className="px-1 lg:px-6 py-2 lg:py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400 whitespace-nowrap w-32">
                                                    Joined
                                                </th>
                                            </>
                                        )}
                                        {isInvitationsPage && (
                                            <>
                                                <th scope="col" className="pl-3 pr-1 lg:px-6 py-2 lg:py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400 whitespace-nowrap w-64">
                                                    Email
                                                </th>
                                                <th scope="col" className="px-1 lg:px-6 py-2 lg:py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400 whitespace-nowrap w-32">
                                                    Role
                                                </th>
                                                <th scope="col" className="px-1 lg:px-6 py-2 lg:py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400 whitespace-nowrap w-32">
                                                    Invited By
                                                </th>
                                                <th scope="col" className="px-1 lg:px-6 py-2 lg:py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400 whitespace-nowrap w-32">
                                                    Status
                                                </th>
                                                <th scope="col" className="px-1 lg:px-6 py-2 lg:py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400 whitespace-nowrap w-32">
                                                    Date
                                                </th>
                                                <th scope="col" className="px-1 lg:px-6 py-2 lg:py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400 whitespace-nowrap w-32">
                                                    Expires
                                                </th>
                                            </>
                                        )}
                                        {isProfileFieldsPage && (
                                            <>
                                                <th scope="col" className="pl-3 pr-1 lg:px-6 py-2 lg:py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400 whitespace-nowrap w-64">
                                                    Field Name
                                                </th>
                                                <th scope="col" className="px-1 lg:px-6 py-2 lg:py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400 whitespace-nowrap w-32">
                                                    Type
                                                </th>
                                                <th scope="col" className="px-1 lg:px-6 py-2 lg:py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400 whitespace-nowrap w-32">
                                                    Required
                                                </th>
                                                <th scope="col" className="px-1 lg:px-6 py-2 lg:py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400 whitespace-nowrap w-32">
                                                    Visible
                                                </th>
                                                <th scope="col" className="px-1 lg:px-6 py-2 lg:py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400 whitespace-nowrap w-24">
                                                    Order
                                                </th>
                                            </>
                                        )}
                                        {isBadgesPage && (
                                            <>
                                                <th scope="col" className="pl-3 pr-1 lg:px-6 py-2 lg:py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400 whitespace-nowrap w-64">
                                                    Badge
                                                </th>
                                                <th scope="col" className="px-1 lg:px-6 py-2 lg:py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400 whitespace-nowrap w-96">
                                                    Description
                                                </th>
                                                <th scope="col" className="px-1 lg:px-6 py-2 lg:py-3 text-left text-sm font-medium text-tertiary dark:text-gray-400 whitespace-nowrap w-32">
                                                    Members
                                                </th>
                                            </>
                                        )}
                                        <th scope="col" className="pl-1 pr-3 lg:px-6 py-2 lg:py-3 text-left font-medium text-tertiary dark:text-gray-400 whitespace-nowrap w-8 sticky right-0 bg-primary dark:bg-gray-900">
                                            &nbsp;
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-secondary dark:divide-gray-700 bg-primary dark:bg-gray-900">
                                    {/* Members Table */}
                                    {isMembersPage && sampleMembers.map((member) => (
                                        <tr key={member.id} className="hover:bg-secondary/20 dark:hover:bg-gray-800/50">
                                            <td className="pl-3 pr-1 lg:px-6 py-2 lg:py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <Avatar
                                                        src={member.avatar}
                                                        alt={member.name}
                                                        size="sm"
                                                    />
                                                    <div>
                                                        <div className="text-sm font-medium text-primary dark:text-gray-100">{member.name}</div>
                                                        <div className="text-sm text-tertiary dark:text-gray-400">{member.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-1 lg:px-6 py-2 lg:py-4 whitespace-nowrap">
                                                <Badge color={member.role === 'Admin' ? 'brand' : member.role === 'Moderator' ? 'purple' : 'gray'} size="sm">
                                                    {member.role}
                                                </Badge>
                                            </td>
                                            <td className="px-1 lg:px-6 py-2 lg:py-4 whitespace-nowrap">
                                                <Badge color={member.status === 'Active' ? 'success' : 'gray'} size="sm">
                                                    {member.status}
                                                </Badge>
                                            </td>
                                            <td className="px-1 lg:px-6 py-2 lg:py-4 whitespace-nowrap">
                                                <span className="text-sm text-secondary dark:text-gray-300">{member.joinedDate}</span>
                                            </td>
                                            <td className="px-1 lg:px-6 py-2 lg:py-4 whitespace-nowrap">
                                                <span className="text-sm text-secondary dark:text-gray-300">{member.posts}</span>
                                            </td>
                                            <td className="px-1 lg:px-6 py-2 lg:py-4 whitespace-nowrap">
                                                <span className="text-sm text-tertiary dark:text-gray-400">{member.lastSeen}</span>
                                            </td>
                                            <td className="pl-1 pr-3 lg:px-6 py-2 lg:py-4 whitespace-nowrap sticky right-0 bg-primary dark:bg-gray-900">
                                                <Dropdown.Root>
                                                    <Dropdown.DotsButton />
                                                    <Dropdown.Popover>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item key="edit" icon={Edit01}>Edit</Dropdown.Item>
                                                            <Dropdown.Item key="view" icon={Eye}>View Profile</Dropdown.Item>
                                                            <Dropdown.Item key="delete" icon={Trash01} variant="destructive">Remove</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown.Popover>
                                                </Dropdown.Root>
                                            </td>
                                        </tr>
                                    ))}

                                    {/* Staff Table */}
                                    {isStaffPage && sampleStaff.map((staff) => (
                                        <tr key={staff.id} className="hover:bg-secondary/20 dark:hover:bg-gray-800/50">
                                            <td className="pl-3 pr-1 lg:px-6 py-2 lg:py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <Avatar
                                                        src={staff.avatar}
                                                        alt={staff.name}
                                                        size="sm"
                                                    />
                                                    <div>
                                                        <div className="text-sm font-medium text-primary dark:text-gray-100">{staff.name}</div>
                                                        <div className="text-sm text-tertiary dark:text-gray-400">{staff.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-1 lg:px-6 py-2 lg:py-4 whitespace-nowrap">
                                                <Badge color={staff.role === 'Admin' ? 'brand' : 'purple'} size="sm">
                                                    {staff.role}
                                                </Badge>
                                            </td>
                                            <td className="px-1 lg:px-6 py-2 lg:py-4 whitespace-nowrap">
                                                <span className="text-sm text-secondary dark:text-gray-300">{staff.department}</span>
                                            </td>
                                            <td className="px-1 lg:px-6 py-2 lg:py-4 whitespace-nowrap">
                                                <span className="text-sm text-secondary dark:text-gray-300">{staff.permissions}</span>
                                            </td>
                                            <td className="px-1 lg:px-6 py-2 lg:py-4 whitespace-nowrap">
                                                <span className="text-sm text-secondary dark:text-gray-300">{staff.joinedDate}</span>
                                            </td>
                                            <td className="pl-1 pr-3 lg:px-6 py-2 lg:py-4 whitespace-nowrap sticky right-0 bg-primary dark:bg-gray-900">
                                                <Dropdown.Root>
                                                    <Dropdown.DotsButton />
                                                    <Dropdown.Popover>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item key="edit" icon={Edit01}>Edit</Dropdown.Item>
                                                            <Dropdown.Item key="delete" icon={Trash01} variant="destructive">Remove</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown.Popover>
                                                </Dropdown.Root>
                                            </td>
                                        </tr>
                                    ))}

                                    {/* Invitations Table */}
                                    {isInvitationsPage && sampleInvitations.map((invitation) => (
                                        <tr key={invitation.id} className="hover:bg-secondary/20 dark:hover:bg-gray-800/50">
                                            <td className="pl-3 pr-1 lg:px-6 py-2 lg:py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <Mail01 className="size-5 text-tertiary dark:text-gray-400" />
                                                    <span className="text-sm text-primary dark:text-gray-100">{invitation.email}</span>
                                                </div>
                                            </td>
                                            <td className="px-1 lg:px-6 py-2 lg:py-4 whitespace-nowrap">
                                                <Badge color="gray" size="sm">{invitation.role}</Badge>
                                            </td>
                                            <td className="px-1 lg:px-6 py-2 lg:py-4 whitespace-nowrap">
                                                <span className="text-sm text-secondary dark:text-gray-300">{invitation.invitedBy}</span>
                                            </td>
                                            <td className="px-1 lg:px-6 py-2 lg:py-4 whitespace-nowrap">
                                                <Badge color={invitation.status === 'Pending' ? 'warning' : 'gray'} size="sm">
                                                    {invitation.status}
                                                </Badge>
                                            </td>
                                            <td className="px-1 lg:px-6 py-2 lg:py-4 whitespace-nowrap">
                                                <span className="text-sm text-secondary dark:text-gray-300">{invitation.invitedDate}</span>
                                            </td>
                                            <td className="px-1 lg:px-6 py-2 lg:py-4 whitespace-nowrap">
                                                <span className="text-sm text-tertiary dark:text-gray-400">{invitation.expiresIn}</span>
                                            </td>
                                            <td className="pl-1 pr-3 lg:px-6 py-2 lg:py-4 whitespace-nowrap sticky right-0 bg-primary dark:bg-gray-900">
                                                <Dropdown.Root>
                                                    <Dropdown.DotsButton />
                                                    <Dropdown.Popover>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item key="resend" icon={Mail01}>Resend</Dropdown.Item>
                                                            <Dropdown.Item key="delete" icon={Trash01} variant="destructive">Cancel</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown.Popover>
                                                </Dropdown.Root>
                                            </td>
                                        </tr>
                                    ))}

                                    {/* Profile Fields Table */}
                                    {isProfileFieldsPage && sampleProfileFields.map((field) => (
                                        <tr key={field.id} className="hover:bg-secondary/20 dark:hover:bg-gray-800/50">
                                            <td className="pl-3 pr-1 lg:px-6 py-2 lg:py-4 whitespace-nowrap">
                                                <span className="text-sm font-medium text-primary dark:text-gray-100">{field.name}</span>
                                            </td>
                                            <td className="px-1 lg:px-6 py-2 lg:py-4 whitespace-nowrap">
                                                <Badge color="gray" size="sm">{field.type}</Badge>
                                            </td>
                                            <td className="px-1 lg:px-6 py-2 lg:py-4 whitespace-nowrap">
                                                {field.required ? (
                                                    <CheckCircle className="size-5 text-success-solid dark:text-green-400" />
                                                ) : (
                                                    <XCircle className="size-5 text-gray-300 dark:text-gray-600" />
                                                )}
                                            </td>
                                            <td className="px-1 lg:px-6 py-2 lg:py-4 whitespace-nowrap">
                                                {field.visible ? (
                                                    <CheckCircle className="size-5 text-success-solid dark:text-green-400" />
                                                ) : (
                                                    <XCircle className="size-5 text-gray-300 dark:text-gray-600" />
                                                )}
                                            </td>
                                            <td className="px-1 lg:px-6 py-2 lg:py-4 whitespace-nowrap">
                                                <span className="text-sm text-secondary dark:text-gray-300">{field.order}</span>
                                            </td>
                                            <td className="pl-1 pr-3 lg:px-6 py-2 lg:py-4 whitespace-nowrap sticky right-0 bg-primary dark:bg-gray-900">
                                                <Dropdown.Root>
                                                    <Dropdown.DotsButton />
                                                    <Dropdown.Popover>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item key="edit" icon={Edit01}>Edit</Dropdown.Item>
                                                            <Dropdown.Item key="delete" icon={Trash01} variant="destructive">Delete</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown.Popover>
                                                </Dropdown.Root>
                                            </td>
                                        </tr>
                                    ))}

                                    {/* Badges Table */}
                                    {isBadgesPage && sampleBadges.map((badge) => (
                                        <tr key={badge.id} className="hover:bg-secondary/20 dark:hover:bg-gray-800/50">
                                            <td className="pl-3 pr-1 lg:px-6 py-2 lg:py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div className="text-2xl">{badge.icon}</div>
                                                    <span className="text-sm font-medium text-primary dark:text-gray-100">{badge.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-1 lg:px-6 py-2 lg:py-4">
                                                <span className="text-sm text-tertiary dark:text-gray-400">{badge.description}</span>
                                            </td>
                                            <td className="px-1 lg:px-6 py-2 lg:py-4 whitespace-nowrap">
                                                <span className="text-sm text-secondary dark:text-gray-300">{badge.members}</span>
                                            </td>
                                            <td className="pl-1 pr-3 lg:px-6 py-2 lg:py-4 whitespace-nowrap sticky right-0 bg-primary dark:bg-gray-900">
                                                <Dropdown.Root>
                                                    <Dropdown.DotsButton />
                                                    <Dropdown.Popover>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item key="edit" icon={Edit01}>Edit</Dropdown.Item>
                                                            <Dropdown.Item key="view" icon={Eye}>View Members</Dropdown.Item>
                                                            <Dropdown.Item key="delete" icon={Trash01} variant="destructive">Delete</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown.Popover>
                                                </Dropdown.Root>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Admin4Layout>
    );
};
