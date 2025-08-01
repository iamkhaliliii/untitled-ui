import { useAdmin } from "@/hooks/use-admin";
import { SiteLayout } from "@/components/layouts/site-layout";

export const TestAdminPage = () => {
    const { isAdmin, adminHeaderVisible, toggleAdminMode, toggleAdminHeader } = useAdmin();

    return (
        <SiteLayout currentPath="/test-admin">
            <div className="p-8">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6">Admin Header Test Page</h1>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg space-y-4">
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Current Status:</h2>
                            <div className="space-y-2">
                                <p>
                                    <span className="font-medium">Admin Mode: </span>
                                    <span className={isAdmin ? "text-green-600" : "text-red-600"}>
                                        {isAdmin ? "✅ Enabled" : "❌ Disabled"}
                                    </span>
                                </p>
                                <p>
                                    <span className="font-medium">Admin Header: </span>
                                    <span className={adminHeaderVisible ? "text-green-600" : "text-red-600"}>
                                        {adminHeaderVisible ? "✅ Visible" : "❌ Hidden"}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className="pt-4 border-t space-y-3">
                            <h3 className="font-semibold">Controls:</h3>
                            <div className="flex gap-3">
                                <button
                                    onClick={toggleAdminMode}
                                    className={`px-4 py-2 rounded-md font-medium ${
                                        isAdmin 
                                            ? "bg-red-500 text-white hover:bg-red-600" 
                                            : "bg-green-500 text-white hover:bg-green-600"
                                    }`}
                                >
                                    {isAdmin ? "Disable Admin" : "Enable Admin"}
                                </button>
                                
                                {isAdmin && (
                                    <button
                                        onClick={toggleAdminHeader}
                                        className="px-4 py-2 rounded-md font-medium bg-blue-500 text-white hover:bg-blue-600"
                                    >
                                        {adminHeaderVisible ? "Hide Header" : "Show Header"}
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="pt-4 border-t">
                            <h3 className="font-semibold mb-2">Instructions:</h3>
                            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300">
                                <li>Click "Enable Admin" to turn on admin mode</li>
                                <li>Look at the top of the page - you should see the admin header</li>
                                <li>Try the "Hide Header" / "Show Header" button to toggle visibility</li>
                                <li>If you don't see the header, check the browser console for errors</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </SiteLayout>
    );
};