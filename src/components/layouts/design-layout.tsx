import { ReactNode } from "react";
import { AdminStickyHeader } from "@/components/application/admin-sticky-header";
import { useAdmin } from "@/hooks/use-admin";
import { ErrorBoundary } from "@/components/error-boundary";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { Monitor02, ArrowRight } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { useNavigate } from "react-router";

interface DesignLayoutProps {
    children: ReactNode;
    sidebarContent: ReactNode;
    tertiarySidebarContent?: ReactNode;
    sidebarWidth?: string;
    title?: string;
    description?: string;
    currentPath?: string;
    modeSwitcherType?: 'dropdown' | 'buttonGroup';
}

export const DesignLayout = ({ 
    children, 
    sidebarContent,
    tertiarySidebarContent,
    sidebarWidth = "w-93",
    title = "Design Studio",
    description = "Customize your community's appearance",
    currentPath = "/admin4/design",
    modeSwitcherType = 'buttonGroup'
}: DesignLayoutProps) => {
    const { isAdmin, adminHeaderVisible, toggleAdminHeader } = useAdmin();
    const isLg = useBreakpoint("lg");
    const navigate = useNavigate();

    // Mobile restriction - Show message for screens smaller than lg (1024px)
    if (!isLg) {
        return (
            <div className="flex flex-col items-center justify-center min-h-dvh bg-primary p-6">
                <div className="max-w-md w-full text-center">
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-50 mb-6">
                        <Monitor02 className="h-8 w-8 text-brand-600" />
                    </div>

                    {/* Message */}
                    <h1 className="text-2xl font-bold text-primary mb-3">
                        Desktop Only Feature
                    </h1>
                    <p className="text-base text-secondary mb-8 leading-relaxed">
                        Design mode is only available on desktop devices for the best customization experience. Please switch to a larger screen or access admin mode instead.
                    </p>

                    {/* CTA Button */}
                    <Button 
                        size="sm" 
                        color="secondary"
                        iconTrailing={ArrowRight}
                        onClick={() => {
                            // Try to navigate to corresponding admin path
                            if (currentPath.includes('/site/')) {
                                // Extract the path after /site/ and navigate to admin
                                const adminPath = currentPath.replace(/\/admin\d+\/design/, '/admin4').replace(/\/customize$/, '');
                                navigate(adminPath);
                            } else {
                                // Default to main admin page
                                navigate('/admin4');
                            }
                        }}
                        className="w-full sm:w-auto"
                    >
                        Go to Admin Mode
                    </Button>

                    {/* Helper text */}
                    <p className="text-sm text-tertiary mt-2">
                        Required screen size: 1024px or larger
                    </p>
                </div>
            </div>
        );
    }

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
                    modeSwitcherType={modeSwitcherType}
                />
            </ErrorBoundary>

            {/* Main layout - Secondary sidebar and optional tertiary sidebar */}
            <div className="flex flex-1 overflow-hidden">
                {/* Secondary Sidebar */}
                <div className={`${sidebarWidth} h-full bg-primary border-r border-secondary overflow-y-auto`}>
                    {/* Only show title/description if they're not empty */}
                    {(title || description) && (
                        <div className="p-4 pt-6 mb-6">
                            {title && <h2 className="text-lg font-semibold text-primary mb-2">{title}</h2>}
                            {description && <p className="text-sm text-tertiary">{description}</p>}
                        </div>
                    )}
                    
                    {sidebarContent}
                </div>

                {/* Tertiary Sidebar - Only show when content is provided */}
                {tertiarySidebarContent && (
                    <div className="w-80 h-full bg-primary border-r border-secondary overflow-y-auto">
                        {tertiarySidebarContent}
                    </div>
                )}

                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin">
                    {children}
                </div>
            </div>
        </div>
    );
};
