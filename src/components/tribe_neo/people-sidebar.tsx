interface PeopleSidebarProps {
    activeItem?: string;
    onItemClick?: (item: string) => void;
}

export const PeopleSidebar = ({ activeItem = "members", onItemClick }: PeopleSidebarProps) => {
    const menuItems = [
        { id: "members", label: "Members" },
        { id: "staff", label: "Staff" },
        { id: "invitations", label: "Invitations" },
        { id: "profile-fields", label: "Profile fields" },
        { id: "badges", label: "Badges" },
    ];

    return (
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
            {/* Header */}
            <div className="px-6 pt-4">
                <h1 className="text-xl font-semibold text-gray-900">People</h1>
            </div>
            
            {/* Navigation Menu */}
            <nav className="flex-1 px-4 py-4">
                <div className="space-y-1">
                    {menuItems.map((item) => {
                        const isActive = activeItem === item.id;
                        
                        return (
                            <button
                                key={item.id}
                                onClick={() => onItemClick?.(item.id)}
                                className={`
                                    w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left
                                    ${isActive 
                                        ? "text-gray-900 bg-gray-100" 
                                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                                    }
                                `}
                            >
                                {item.label}
                            </button>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
};
