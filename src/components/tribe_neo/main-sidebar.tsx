import { 
    Users01, 
    Settings01, 
    Archive, 
    BarChart03,
    Grid03,
    CreditCard01,
    Shield01,
    HelpCircle,
    User01
} from "@untitledui/icons";
import { UntitledLogoMinimal } from "@/components/foundations/logo/untitledui-logo-minimal";
import { Avatar } from "@/components/base/avatar/avatar";

interface MainSidebarProps {
    activeItem?: string;
    onItemClick?: (item: string) => void;
}

export const MainSidebar = ({ activeItem = "people", onItemClick }: MainSidebarProps) => {
    const menuItems = [
        { id: "people", icon: Users01, label: "People" },
        { id: "content", icon: Grid03, label: "Content" },
        { id: "analytics", icon: BarChart03, label: "Analytics" },
        { id: "settings", icon: Settings01, label: "Settings" },
        { id: "billing", icon: CreditCard01, label: "Billing" },
        { id: "security", icon: Shield01, label: "Security" },
        { id: "help", icon: HelpCircle, label: "Help" },
        { id: "archive", icon: Archive, label: "Archive" },
    ];

    return (
        <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4">
            {/* Logo */}
            <div className="mb-6">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">●</span>
                </div>
            </div>
            
            {/* Navigation Icons */}
            <div className="flex flex-col space-y-1 mb-auto">
                {menuItems.map((item) => {
                    const IconComponent = item.icon;
                    const isActive = activeItem === item.id;
                    
                    return (
                        <button
                            key={item.id}
                            onClick={() => onItemClick?.(item.id)}
                            className={`
                                w-10 h-10 rounded-lg flex items-center justify-center transition-colors
                                ${isActive 
                                    ? "bg-gray-100 text-gray-900" 
                                    : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                                }
                            `}
                            title={item.label}
                        >
                            <IconComponent className="w-5 h-5" />
                        </button>
                    );
                })}
            </div>

            {/* User Avatar */}
            <div className="mt-auto">
                <Avatar 
                    src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" 
                    alt="User" 
                    size="sm"
                    className="cursor-pointer"
                />
            </div>
        </div>
    );
};
