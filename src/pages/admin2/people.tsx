import {
    Users01,
    UserSquare,
    User01,
    UsersPlus,
    Archive,
    Plus,
    SearchLg,
    Edit01,
    Trash01,
    CheckDone01,
    EyeOff,
    Shield01,
    Mail01,
    Calendar,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { Badge } from "@/components/base/badges/badges";
import { Avatar } from "@/components/base/avatar/avatar";
import { Input } from "@/components/base/input/input";
import { AdminLayout } from "@/components/layouts/admin-layout";
import { useLocation } from "react-router";

export const AdminPeoplePage = () => {
    const location = useLocation();
    const headerActions = (
        <div className="flex items-center gap-2">
            <div className="relative">
                <Input
                    placeholder="Search users..."
                    className="w-64"
                    icon={SearchLg}
                />
            </div>
            <Button size="sm" iconLeading={Plus}>
                Add User
            </Button>
        </div>
    );

    return (
        <AdminLayout 
            title="People Management"
            description="Manage users, roles, and permissions"
            currentPath={location.pathname}
            headerActions={headerActions}
        >
            <div className="px-4 py-6 lg:px-6">
                {/* Stats Cards */}
                <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl border border-secondary bg-primary p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-tertiary">Total Users</p>
                                <p className="text-2xl font-semibold text-primary">1,234</p>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50">
                                <Users01 className="h-6 w-6 text-brand-secondary" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2">
                            <Badge color="success" size="sm">+8%</Badge>
                            <span className="text-sm text-tertiary">vs last month</span>
                        </div>
                    </div>

                    <div className="rounded-xl border border-secondary bg-primary p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-tertiary">Administrators</p>
                                <p className="text-2xl font-semibold text-primary">12</p>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50">
                                <UserSquare className="h-6 w-6 text-brand-secondary" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2">
                            <Badge color="gray" size="sm">No change</Badge>
                            <span className="text-sm text-tertiary">this month</span>
                        </div>
                    </div>

                    <div className="rounded-xl border border-secondary bg-primary p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-tertiary">Active Users</p>
                                <p className="text-2xl font-semibold text-primary">987</p>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50">
                                <User01 className="h-6 w-6 text-brand-secondary" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2">
                            <Badge color="success" size="sm">+12%</Badge>
                            <span className="text-sm text-tertiary">vs last month</span>
                        </div>
                    </div>

                    <div className="rounded-xl border border-secondary bg-primary p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-tertiary">Banned Users</p>
                                <p className="text-2xl font-semibold text-primary">23</p>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50">
                                <Archive className="h-6 w-6 text-brand-secondary" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2">
                            <Badge color="warning" size="sm">+3</Badge>
                            <span className="text-sm text-tertiary">this week</span>
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="rounded-xl border border-secondary bg-primary p-6">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-primary">Recent Users</h2>
                        <Button size="sm" color="tertiary">
                            View All
                        </Button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-secondary">
                                    <th className="pb-3 text-left text-sm font-medium text-secondary">User</th>
                                    <th className="pb-3 text-left text-sm font-medium text-secondary">Role</th>
                                    <th className="pb-3 text-left text-sm font-medium text-secondary">Status</th>
                                    <th className="pb-3 text-left text-sm font-medium text-secondary">Last Active</th>
                                    <th className="pb-3 text-left text-sm font-medium text-secondary">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    {
                                        name: "Olivia Rhye",
                                        email: "olivia@untitledui.com",
                                        role: "Admin",
                                        status: "active",
                                        lastActive: "2 hours ago",
                                        avatar: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
                                    },
                                    {
                                        name: "John Doe",
                                        email: "john@untitledui.com",
                                        role: "Moderator",
                                        status: "active",
                                        lastActive: "5 minutes ago",
                                        avatar: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
                                    },
                                    {
                                        name: "Jane Smith",
                                        email: "jane@untitledui.com",
                                        role: "User",
                                        status: "inactive",
                                        lastActive: "2 days ago",
                                        avatar: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
                                    },
                                    {
                                        name: "Mike Johnson",
                                        email: "mike@untitledui.com",
                                        role: "User",
                                        status: "banned",
                                        lastActive: "1 week ago",
                                        avatar: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
                                    }
                                ].map((user, index) => (
                                    <tr key={index} className="border-b border-secondary">
                                        <td className="py-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar src={user.avatar} alt={user.name} size="sm" />
                                                <div>
                                                    <p className="font-medium text-primary">{user.name}</p>
                                                    <p className="text-sm text-tertiary">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <Badge 
                                                color={user.role === "Admin" ? "brand" : user.role === "Moderator" ? "blue" : "gray"} 
                                                size="sm"
                                            >
                                                {user.role}
                                            </Badge>
                                        </td>
                                        <td className="py-4">
                                            <Badge 
                                                color={user.status === "active" ? "success" : user.status === "inactive" ? "warning" : "error"} 
                                                size="sm"
                                            >
                                                {user.status}
                                            </Badge>
                                        </td>
                                        <td className="py-4 text-sm text-tertiary">{user.lastActive}</td>
                                        <td className="py-4">
                                            <div className="flex items-center gap-2">
                                                <ButtonUtility size="sm" color="tertiary" icon={Edit01} tooltip="Edit" />
                                                <ButtonUtility size="sm" color="tertiary" icon={Mail01} tooltip="Send Email" />
                                                <ButtonUtility size="sm" color="tertiary" icon={EyeOff} tooltip="Ban User" />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 rounded-xl border border-secondary bg-primary p-6">
                    <h2 className="mb-6 text-lg font-semibold text-primary">Quick Actions</h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Button size="sm" color="primary" iconLeading={Plus} className="w-full">
                            Add New User
                        </Button>
                        <Button size="sm" color="secondary" iconLeading={UsersPlus} className="w-full">
                            Bulk Import
                        </Button>
                        <Button size="sm" color="tertiary" iconLeading={Shield01} className="w-full">
                            Manage Roles
                        </Button>
                        <Button size="sm" color="tertiary" iconLeading={Calendar} className="w-full">
                            User Activity
                        </Button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}; 