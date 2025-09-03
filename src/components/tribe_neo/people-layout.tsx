import { useState } from "react";
import { MainSidebar } from "./main-sidebar";
import { PeopleSidebar } from "./people-sidebar";
import { MembersHeader } from "./members-header";
import { MembersToolbar } from "./members-toolbar";
import { MembersTable } from "./members-table";

interface PeopleLayoutProps {
    className?: string;
}

export const PeopleLayout = ({ className }: PeopleLayoutProps) => {
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
    const [activePeopleSection, setActivePeopleSection] = useState("members");
    
    const handleMemberSelect = (memberId: string, selected: boolean) => {
        setSelectedMembers(prev => 
            selected 
                ? [...prev, memberId]
                : prev.filter(id => id !== memberId)
        );
    };

    const handleSelectAll = (selected: boolean) => {
        if (selected) {
            // In a real app, you'd get all member IDs from your data
            setSelectedMembers(["1", "2", "3", "4", "5", "6", "7", "8"]);
        } else {
            setSelectedMembers([]);
        }
    };

    const handleSearch = (query: string) => {
        // Implement search functionality
        console.log("Search:", query);
    };

    const handleInviteClick = () => {
        // Implement invite functionality
        console.log("Invite members clicked");
    };

    const handleAddFilter = () => {
        // Implement filter functionality
        console.log("Add filter clicked");
    };

    const handleExport = (format: string) => {
        // Implement export functionality
        console.log("Export as:", format);
    };

    const handleAction = (action: string) => {
        // Implement bulk actions
        console.log("Action:", action, "for members:", selectedMembers);
    };

    return (
        <div className={`flex h-screen bg-gray-50 ${className || ''}`}>
            {/* Main Sidebar */}
            <MainSidebar 
                activeItem="people"
                onItemClick={(item) => console.log("Navigate to:", item)}
            />
            
            {/* People Sidebar */}
            <PeopleSidebar 
                activeItem={activePeopleSection}
                onItemClick={setActivePeopleSection}
            />
            
            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <MembersHeader 
                    onSearch={handleSearch}
                    onInviteClick={handleInviteClick}
                />
                
                {/* Toolbar */}
                <MembersToolbar 
                    memberCount={17009}
                    onAddFilter={handleAddFilter}
                    onExport={handleExport}
                    onAction={handleAction}
                />
                
                {/* Members Table */}
                <MembersTable 
                    selectedMembers={selectedMembers}
                    onMemberSelect={handleMemberSelect}
                    onSelectAll={handleSelectAll}
                />
            </div>
        </div>
    );
};
