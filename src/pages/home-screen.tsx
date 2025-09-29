import { useState, useEffect } from "react";
import { Settings01, Globe01, ArrowRight, UsersPlus, Zap, CheckCircle, Calendar, MessageSquare01 } from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { NexusLogo } from "@/components/foundations/logo/nexus-logo";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";
import { Link, useNavigate } from "react-router";
import navigationData from "@/data/navigation-data.json";
import { loadNavigationData } from "@/api/navigation";

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
                <div className="rounded-lg border border-secondary bg-primary p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-solid/70">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center justify-center rounded-md bg-brand-solid/10 p-1.5">
                                <IconComponent className="size-4 text-brand-solid" />
                            </span>
                            <span className="text-sm font-medium text-primary">{item.title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge color={item.statusColor} size="sm">{item.status}</Badge>
                            <ArrowRight className="size-3.5 text-tertiary group-hover:text-brand-solid" />
                        </div>
                    </div>
                </div>
            </Link>
        );
    };

    return (
        <div className="relative flex h-dvh flex-col overflow-hidden">
            {/* Background visuals */}
            <div className="pointer-events-none absolute inset-0">
                <BackgroundPattern pattern="grid-check" className="absolute -left-10 top-10 h-[520px] w-[520px] opacity-[0.06]" />
                <BackgroundPattern pattern="circle" className="absolute -right-12 -bottom-12 h-[480px] w-[480px] opacity-[0.06]" />
                <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-transparent to-transparent" />
            </div>

            {/* Logo in top left corner */}
            <div className="absolute top-6 left-6 z-20">
                <NexusLogo className="h-12 w-auto" />
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
                <div className="mt-10 grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
                    {/* Admin column */}
                    <div>
                        <div className="mb-3 text-xs font-medium uppercase tracking-wide text-tertiary">Admin</div>
                        <div className="space-y-3">
                            {data.admin.map(item => renderNavigationItem(item))}
                        </div>
                    </div>

                    {/* Site column */}
                    <div>
                        <div className="mb-3 text-xs font-medium uppercase tracking-wide text-tertiary">Site</div>
                        <div className="space-y-3">
                            {data.site.map(item => renderNavigationItem(item))}
                        </div>
                    </div>

                    {/* Get Started column */}
                    <div>
                        <div className="mb-3 text-xs font-medium uppercase tracking-wide text-tertiary">Get Started</div>
                        <div className="space-y-3">
                            {data.getStarted.map(item => renderNavigationItem(item))}
                        </div>
                    </div>
                </div>

                
            </div>
        </div>
    );
};
