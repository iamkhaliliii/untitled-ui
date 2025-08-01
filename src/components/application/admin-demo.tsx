import { useAdmin } from "@/hooks/use-admin";
import { AdminStickyHeader } from "./admin-sticky-header";
import { AdminToggle } from "./admin-toggle";

// Demo component showing how to use the admin header system
export const AdminDemo = () => {
    const { isAdmin, adminHeaderVisible, toggleAdminHeader } = useAdmin();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Admin header is automatically shown when user is admin */}
            {isAdmin && (
                <AdminStickyHeader 
                    isVisible={adminHeaderVisible} 
                    onToggleVisibility={toggleAdminHeader}
                />
            )}

            {/* Main content area */}
            <div className={`
                ${isAdmin && adminHeaderVisible ? 'pt-12' : 'pt-0'}
                p-8
            `}>
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Admin Header Demo
                    </h1>
                    
                    <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-2">Current Status</h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                Admin Mode: <span className={`font-medium ${isAdmin ? 'text-green-600' : 'text-red-600'}`}>
                                    {isAdmin ? 'Enabled' : 'Disabled'}
                                </span>
                            </p>
                            <p className="text-gray-600 dark:text-gray-300">
                                Admin Header: <span className={`font-medium ${adminHeaderVisible ? 'text-green-600' : 'text-red-600'}`}>
                                    {adminHeaderVisible ? 'Visible' : 'Hidden'}
                                </span>
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-2">Instructions</h2>
                            <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
                                <li>Click the "Admin Mode" button in the bottom right to toggle admin status</li>
                                <li>When admin mode is enabled, you'll see the sticky header at the top</li>
                                <li>Click the chevron up button in the header to hide/show it</li>
                                <li>The header only appears on site pages, not in the admin dashboard</li>
                            </ol>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-2">Features</h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                                <li>Sticky positioning at the top of the page</li>
                                <li>Only visible to admin users</li>
                                <li>Dark/light mode support</li>
                                <li>Responsive design with mobile menu</li>
                                <li>Toggle visibility functionality</li>
                                <li>Doesn't interfere with existing layouts</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Admin toggle for testing */}
            <AdminToggle />
        </div>
    );
};