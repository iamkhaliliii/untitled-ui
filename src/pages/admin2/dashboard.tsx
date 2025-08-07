import {
    BarChartSquare02,
    CheckDone01,
    PieChart03,
    Users01,
    Bell01,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { AdminLayout } from "@/components/layouts/admin-layout";
import { useLocation } from "react-router";

export const AdminDashboardPage = () => {
    const location = useLocation();
    return (
        <AdminLayout 
            title="Admin Dashboard"
            description="Welcome back! Here's what's happening with your application."
            currentPath={location.pathname}
        >
            <div className="p-6">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-primary mb-4">Quick Actions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                            <div className="p-6 border border-secondary rounded-lg bg-primary hover:bg-secondary transition-colors cursor-pointer">
                                <div className="flex items-center gap-3 mb-2">
                                    <Users01 className="size-5 text-brand-solid" />
                                    <h3 className="text-lg font-semibold text-primary">Users</h3>
                                </div>
                                <p className="text-sm text-tertiary">Manage user accounts and permissions</p>
                                <p className="text-xs text-quaternary mt-2">1,234 active users</p>
                            </div>
                            
                            <div className="p-6 border border-secondary rounded-lg bg-primary hover:bg-secondary transition-colors cursor-pointer">
                                <div className="flex items-center gap-3 mb-2">
                                    <BarChartSquare02 className="size-5 text-brand-solid" />
                                    <h3 className="text-lg font-semibold text-primary">Analytics</h3>
                                </div>
                                <p className="text-sm text-tertiary">View reports and statistics</p>
                                <p className="text-xs text-quaternary mt-2">+12% this month</p>
                            </div>
                            
                            <div className="p-6 border border-secondary rounded-lg bg-primary hover:bg-secondary transition-colors cursor-pointer">
                                <div className="flex items-center gap-3 mb-2">
                                    <CheckDone01 className="size-5 text-brand-solid" />
                                    <h3 className="text-lg font-semibold text-primary">Tasks</h3>
                                </div>
                                <p className="text-sm text-tertiary">Manage tasks and projects</p>
                                <p className="text-xs text-quaternary mt-2">10 pending tasks</p>
                            </div>
                            
                            <div className="p-6 border border-secondary rounded-lg bg-primary hover:bg-secondary transition-colors cursor-pointer">
                                <div className="flex items-center gap-3 mb-2">
                                    <PieChart03 className="size-5 text-brand-solid" />
                                    <h3 className="text-lg font-semibold text-primary">Reports</h3>
                                </div>
                                <p className="text-sm text-tertiary">Generate and view reports</p>
                                <p className="text-xs text-quaternary mt-2">12 reports available</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="p-6 border border-secondary rounded-lg bg-primary">
                            <h3 className="text-lg font-semibold text-primary mb-4">Recent Activity</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 bg-brand-solid/10 rounded-full flex items-center justify-center">
                                        <Users01 className="size-4 text-brand-solid" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-secondary">New user registered</p>
                                        <p className="text-xs text-quaternary">2 minutes ago</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="size-8 bg-brand-solid/10 rounded-full flex items-center justify-center">
                                        <BarChartSquare02 className="size-4 text-brand-solid" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-secondary">Weekly report generated</p>
                                        <p className="text-xs text-quaternary">1 hour ago</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="size-8 bg-brand-solid/10 rounded-full flex items-center justify-center">
                                        <CheckDone01 className="size-4 text-brand-solid" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-secondary">Task completed</p>
                                        <p className="text-xs text-quaternary">3 hours ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border border-secondary rounded-lg bg-primary">
                            <h3 className="text-lg font-semibold text-primary mb-4">System Status</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-secondary">Server Status</span>
                                    <BadgeWithDot color="success" type="modern" size="sm">
                                        Online
                                    </BadgeWithDot>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-secondary">Database</span>
                                    <BadgeWithDot color="success" type="modern" size="sm">
                                        Connected
                                    </BadgeWithDot>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-secondary">API Response</span>
                                    <BadgeWithDot color="warning" type="modern" size="sm">
                                        Slow
                                    </BadgeWithDot>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}; 