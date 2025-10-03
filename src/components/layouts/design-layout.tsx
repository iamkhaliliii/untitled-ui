import { ReactNode } from "react";
import { AdminStickyHeader } from "@/components/application/admin-sticky-header";
import { useAdmin } from "@/hooks/use-admin";
import { ErrorBoundary } from "@/components/error-boundary";

interface DesignLayoutProps {
    children: ReactNode;
    sidebarContent: ReactNode;
    sidebarWidth?: string;
    title?: string;
    description?: string;
    currentPath?: string;
}

export const DesignLayout = ({ 
    children, 
    sidebarContent,
    sidebarWidth = "w-93",
    title = "Design Studio",
    description = "Customize your community's appearance",
    currentPath = "/admin4/design"
}: DesignLayoutProps) => {
    const { isAdmin, adminHeaderVisible, toggleAdminHeader } = useAdmin();

    return (
        <div className="flex flex-col h-dvh">
            {/* Admin Sticky Header */}
            <ErrorBoundary fallback={
                <div className="h-12 bg-red-100 dark:bg-red-900 flex items-center justify-center text-red-700 dark:text-red-300 text-sm">
                    Admin header error - check console
                </div>
            }>
                <AdminStickyHeader 
                    isVisible={true} 
                    onToggleVisibility={toggleAdminHeader}
                    isAdminPage={true}
                />
            </ErrorBoundary>

            {/* Main layout - Only secondary sidebar */}
            <div className="flex flex-1 overflow-hidden">
                {/* Secondary Sidebar */}
                <div className={`${sidebarWidth} h-full bg-primary border-r border-secondary overflow-y-auto`}>
                    <div className="p-4">
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-primary mb-2">{title}</h2>
                            <p className="text-sm text-tertiary">{description}</p>
                        </div>
                        
                        {sidebarContent}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin">
                    {children}
                </div>
            </div>
        </div>
    );
};0
