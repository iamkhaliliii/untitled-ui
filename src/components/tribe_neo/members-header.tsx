import { SearchLg, ChevronDown, Menu01, User01, AtSign, ChevronSelectorVertical, Calendar, CheckCircle } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { CustomDropdown } from "./custom-dropdown";
import { Input } from "@/components/base/input/input";

interface MembersHeaderProps {
    onSearch?: (query: string) => void;
    onInviteClick?: () => void;
}

export const MembersHeader = ({ onSearch, onInviteClick }: MembersHeaderProps) => {
    return (
        <div className="bg-white px-6 py-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-900">Members</h1>
                <div className="flex items-center space-x-3">
                    {/* Search */}
                    <div className="relative">
                        <SearchLg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80 text-sm"
                            onChange={(e) => onSearch?.(e.target.value)}
                        />
                    </div>
                    
                    {/* Fields Dropdown */}
                    <CustomDropdown
                        trigger={
                            <Button 
                                color="secondary" 
                                size="sm" 
                                iconTrailing={ChevronDown}
                                className="!bg-white !border-[0.5px] !border-gray-300 !text-gray-700 hover:!bg-gray-50 !font-medium !rounded-full !shadow-none !ring-0 !ring-transparent"
                            >
                                Fields
                            </Button>
                        }
                        items={[
                            { id: 'name', label: 'Name', icon: Menu01 },
                            { id: 'username', label: 'Username', icon: Menu01 },
                            { id: 'email', label: 'Email', icon: AtSign },
                            { id: 'site-role', label: 'Site role', icon: ChevronSelectorVertical },
                            { id: 'seat-usage', label: 'Seat usage note', icon: ChevronSelectorVertical },
                            { id: 'flagged', label: 'Flagged', icon: CheckCircle },
                            { id: 'created-at', label: 'Created at', icon: Calendar },
                            { id: 'updated-at', label: 'Updated at', icon: Calendar },
                            { id: 'last-seen', label: 'Last seen', icon: Calendar },
                            { id: 'status', label: 'Status', icon: ChevronSelectorVertical },
                        ]}
                    />
                    
                    {/* Invite Button */}
                    <Button color="primary" size="sm" onClick={onInviteClick} className="rounded-full shadow-none">
                        Invite members
                    </Button>
                </div>
            </div>
        </div>
    );
};
