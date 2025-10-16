import { useState, useEffect } from "react";
import { Settings01, Globe01, ArrowRight, UsersPlus, Zap, CheckCircle, Calendar, MessageSquare01, Sun, Moon01, Monitor01 } from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { NexusLogo } from "@/components/foundations/logo/nexus-logo";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";
import { Link, useNavigate } from "react-router";
import navigationData from "@/data/navigation-data.json";
import { useTheme } from "@/providers/theme";

interface NavigationItem {
    id: string;
    title: string;
    icon: string;
    path: string;
    status: string;
    statusColor: "gray" | "blue" | "success" | "orange";
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Settings01: Settings01,
    Globe01: Globe01,
    Calendar: Calendar,
    MessageSquare01: MessageSquare01,
    UsersPlus: UsersPlus,
    Zap: Zap,
    CheckCircle: CheckCircle
};

export const HomeScreen = () => {
    const navigate = useNavigate();
    const { theme, setTheme } = useTheme();
    const data = navigationData as { admin: NavigationItem[], site: NavigationItem[], getStarted: NavigationItem[] };

    // Keyboard shortcut listener
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key.toLowerCase() === 'e') {
                navigate('/edit');
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [navigate]);
    
    const renderNavigationItem = (item: NavigationItem) => {
        const IconComponent = iconMap[item.icon] || Settings01;
        
        return (
            <Link key={item.id} to={item.path} className="group">
                <div className="rounded-xl border border-secondary bg-primary p-4 sm:p-5 lg:p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-solid/70 hover:shadow-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                            <span className="inline-flex items-center justify-center rounded-md bg-brand-solid/10 p-1.5 flex-shrink-0">
                                <IconComponent className="size-4 sm:size-5 text-brand-solid dark:text-white" />
                            </span>
                            <span className="text-sm sm:text-base font-medium text-primary truncate">{item.title}</span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                            <Badge color={item.statusColor} size="sm" className="hidden sm:inline-flex">{item.status}</Badge>
                            <Badge color={item.statusColor} size="sm" className="sm:hidden text-xs px-1.5 py-0.5">{item.status}</Badge>
                            <ArrowRight className="size-3.5 sm:size-4 text-tertiary group-hover:text-brand-solid dark:group-hover:text-white flex-shrink-0" />
                        </div>
                    </div>
                </div>
            </Link>
        );
    };

    // Theme toggle functions
    const toggleTheme = () => {
        if (theme === "light") {
            setTheme("dark");
        } else if (theme === "dark") {
            setTheme("system");
        } else {
            setTheme("light");
        }
    };

    const getThemeIcon = () => {
        if (theme === "light") return Sun;
        if (theme === "dark") return Moon01;
        return Monitor01; // System mode
    };

    const getThemeLabel = () => {
        if (theme === "light") return "Light Mode";
        if (theme === "dark") return "Dark Mode";
        return "System Mode";
    };

    return (
        <div className="relative flex h-dvh flex-col overflow-auto">
            {/* Background visuals */}
            <div className="pointer-events-none absolute inset-0">
                <BackgroundPattern pattern="grid-check" className="absolute -left-10 top-10 h-[520px] w-[520px] opacity-[0.06]" />
                <BackgroundPattern pattern="circle" className="absolute -right-12 -bottom-12 h-[480px] w-[480px] opacity-[0.06]" />
                
                {/* E pattern background */}
                <div 
                    className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="181" height="210" viewBox="0 0 181 210" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.129883 210V160.559H180.197V210H0.129883ZM13.333 129.377V81.6211H166.994V129.377H13.333ZM2.37722 50.1584V0.717102H177.95V50.1584H2.37722Z" fill="currentColor" fill-opacity="0.15"/></svg>')}")`,
                        backgroundSize: '100px 120px',
                        backgroundRepeat: 'repeat',
                        backgroundPosition: '30px 30px'
                    }}
                />
                
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-solid/[0.02] via-transparent to-brand-solid/[0.03] dark:from-white/[0.02] dark:to-white/[0.04]" />
                
                <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-transparent to-transparent" />
            </div>

            {/* Header - Responsive positioning */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 z-20 flex items-center justify-between">
                {/* Logo */}
                <NexusLogo className="h-8 sm:h-10 lg:h-12 w-auto" />
                
                {/* Theme toggle button */}
                <Button
                    size="sm"
                    color="secondary"
                    iconLeading={getThemeIcon()}
                    onClick={toggleTheme}
                    className="shadow-lg"
                >
                    <span className="hidden sm:inline">{getThemeLabel()}</span>
                    <span className="sm:hidden sr-only">{getThemeLabel()}</span>
                </Button>
            </div>

            {/* Main content - Responsive layout with proper scrolling */}
            <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">

                {/* Hero section - Responsive typography */}
                <div className="max-w-3xl text-center mb-8 sm:mb-12 lg:mb-16">
                    <h1 className="text-2xl sm:text-3xl lg:text-display-sm font-semibold tracking-tight text-primary">
                        Bettermode NΞXUS
                    </h1>
                    <p className="mt-2 sm:mt-3 text-base sm:text-lg text-tertiary">
                        Select your path and continue.
                    </p>
                </div>

                {/* Navigation grid - Responsive columns */}
                <div className="w-full max-w-7xl">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 xl:gap-16">
                            {/* Admin column */}
                            <div className="order-1">
                                <div className="mb-4 sm:mb-6 text-xs font-medium uppercase tracking-wide text-tertiary">Admin</div>
                                <div className="space-y-3 sm:space-y-4">
                                    {data.admin && data.admin.length > 0 ? (
                                        data.admin.map(item => renderNavigationItem(item))
                                    ) : (
                                        <div className="text-sm text-tertiary">No admin items available</div>
                                    )}
                                </div>
                            </div>

                            {/* Site column */}
                            <div className="order-2">
                                <div className="mb-4 sm:mb-6 text-xs font-medium uppercase tracking-wide text-tertiary">Site</div>
                                <div className="space-y-3 sm:space-y-4">
                                    {data.site && data.site.length > 0 ? (
                                        data.site.map(item => renderNavigationItem(item))
                                    ) : (
                                        <div className="text-sm text-tertiary">No site items available</div>
                                    )}
                                </div>
                            </div>

                            {/* Get Started column - Full width on mobile, spans 2 cols on tablet */}
                            <div className="order-3 sm:col-span-2 lg:col-span-1">
                                <div className="mb-4 sm:mb-6 text-xs font-medium uppercase tracking-wide text-tertiary">Get Started</div>
                                <div className="space-y-3 sm:space-y-4">
                                    {data.getStarted && data.getStarted.length > 0 ? (
                                        data.getStarted.map(item => renderNavigationItem(item))
                                    ) : (
                                        <div className="text-sm text-tertiary">No get started items available</div>
                                    )}
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
};
