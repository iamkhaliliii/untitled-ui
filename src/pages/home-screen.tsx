import { useState, useEffect } from "react";
import { Settings01, Globe01, ArrowRight, UsersPlus, Zap, CheckCircle, Calendar, MessageSquare01, Sun, Moon01, Monitor01 } from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { NexusLogo } from "@/components/foundations/logo/nexus-logo";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";
import { Link, useNavigate } from "react-router";
import navigationData from "@/data/navigation-data.json";
import { loadNavigationData } from "@/api/navigation";
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
    const [data, setData] = useState<{ admin: NavigationItem[], site: NavigationItem[], getStarted: NavigationItem[] }>(
        navigationData as { admin: NavigationItem[], site: NavigationItem[], getStarted: NavigationItem[] }
    );
    const [isLoading, setIsLoading] = useState(false);

    // Load data from localStorage on component mount
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const storedData = await loadNavigationData();
                if (storedData) {
                    setData(storedData);
                    console.log('Home: Loaded data from localStorage');
                } else {
                    console.log('Home: No stored data found, using default data');
                    // Keep using the imported JSON data as fallback
                }
            } catch (error) {
                console.error('Failed to load data from storage, using fallback:', error);
                // Keep using the imported JSON data as fallback
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

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
                <div className="rounded-xl border border-secondary bg-primary p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-solid/70 hover:shadow-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center justify-center rounded-md bg-brand-solid/10 p-1.5">
                                <IconComponent className="size-4 text-brand-solid dark:text-white" />
                            </span>
                            <span className="text-sm font-medium text-primary">{item.title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge color={item.statusColor} size="sm">{item.status}</Badge>
                            <ArrowRight className="size-3.5 text-tertiary group-hover:text-brand-solid dark:group-hover:text-white" />
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
        <div className="relative flex h-dvh flex-col overflow-hidden">
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

            {/* Logo in top left corner */}
            <div className="absolute top-6 left-6 z-20">
                <NexusLogo className="h-12 w-auto" />
            </div>

            {/* Theme toggle button in top right corner */}
            <div className="absolute top-6 right-6 z-20">
                <Button
                    size="sm"
                    color="secondary"
                    iconLeading={getThemeIcon()}
                    onClick={toggleTheme}
                    className="shadow-lg"
                >
                    {getThemeLabel()}
                </Button>
            </div>


            {/* Main content */}
            <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center px-4">

                <div className="max-w-3xl text-center">
                    <h1 className="text-display-sm font-semibold tracking-tight text-primary">
                        Bettermode NΞXUS
                    </h1>
                    <p className="mt-3 text-lg text-tertiary">
                        Select your path and continue.
                    </p>
                </div>

                {/* Three-column navigation: Admin / Site / Get Started */}
                <div className="mt-16 grid w-full max-w-7xl grid-cols-1 gap-12 md:grid-cols-3 lg:gap-16">
                    {/* Admin column */}
                    <div>
                        <div className="mb-6 text-xs font-medium uppercase tracking-wide text-tertiary">Admin</div>
                        <div className="space-y-4">
                            {data.admin.map(item => renderNavigationItem(item))}
                        </div>
                    </div>

                    {/* Site column */}
                    <div>
                        <div className="mb-6 text-xs font-medium uppercase tracking-wide text-tertiary">Site</div>
                        <div className="space-y-4">
                            {data.site.map(item => renderNavigationItem(item))}
                        </div>
                    </div>

                    {/* Get Started column */}
                    <div>
                        <div className="mb-6 text-xs font-medium uppercase tracking-wide text-tertiary">Get Started</div>
                        <div className="space-y-4">
                            {data.getStarted.map(item => renderNavigationItem(item))}
                        </div>
                    </div>
                </div>

                
            </div>
        </div>
    );
};
