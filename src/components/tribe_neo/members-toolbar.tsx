import { ChevronDown, DownloadCloud01, Menu01, User01, AtSign, ChevronSelectorVertical, Calendar, CheckCircle } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { CustomDropdown } from "./custom-dropdown";

interface MembersToolbarProps {
    memberCount?: number;
    onAddFilter?: () => void;
    onExport?: (format: string) => void;
    onAction?: (action: string) => void;
}

export const MembersToolbar: React.FC<MembersToolbarProps> = ({
    memberCount = 0,
    onAddFilter,
    onExport,
    onAction
}) => {
    return (
        <div className="bg-white px-6 py-4">
            <div className="space-y-4">
                {/* First Row - Add Filter */}
                <div className="flex items-center">
                    <CustomDropdown
                        trigger={
                            <Button 
                                color="secondary" 
                                size="sm"
                                iconTrailing={ChevronDown}
                                className="!bg-white !border-[0.5px] !border-gray-300 !text-gray-700 hover:!bg-gray-50 !font-medium !rounded-full !shadow-none !ring-0 !ring-transparent"
                            >
                                Add filter
                            </Button>
                        }
                        items={[
                            { id: 'name', label: 'Name', icon: Menu01, onClick: onAddFilter },
                            { id: 'username', label: 'Username', icon: Menu01, onClick: onAddFilter },
                            { id: 'email', label: 'Email', icon: AtSign, onClick: onAddFilter },
                            { id: 'site-role', label: 'Site role', icon: ChevronSelectorVertical, onClick: onAddFilter },
                            { id: 'seat-usage', label: 'Seat usage note', icon: ChevronSelectorVertical, onClick: onAddFilter },
                            { id: 'flagged', label: 'Flagged', icon: CheckCircle, onClick: onAddFilter },
                            { id: 'created-at', label: 'Created at', icon: Calendar, onClick: onAddFilter },
                            { id: 'updated-at', label: 'Updated at', icon: Calendar, onClick: onAddFilter },
                            { id: 'last-seen', label: 'Last seen', icon: Calendar, onClick: onAddFilter },
                            { id: 'status', label: 'Status', icon: ChevronSelectorVertical, onClick: onAddFilter },
                        ]}
                    />
                </div>

                {/* Second Row - Member Count, Export, Actions */}
                <div className="flex items-center space-x-4">
                    {/* Member Count */}
                    <span className="text-sm text-gray-900 font-semibold">
                        {memberCount.toLocaleString()} members
                    </span>

                    {/* Export Button */}
                    <Button 
                        color="secondary" 
                        size="sm" 
                        iconTrailing={DownloadCloud01}
                        onClick={() => onExport?.('csv')}
                        className="!bg-white !border-[0.5px] !border-gray-300 !text-gray-700 hover:!bg-gray-50 !font-medium !rounded-full !shadow-none !ring-0 !ring-transparent"
                    >
                        Export
                    </Button>

                    {/* Actions Dropdown */}
                    <Dropdown.Root>
                        <Button 
                            color="secondary" 
                            size="sm" 
                            iconTrailing={ChevronDown}
                            className="!bg-white !border-[0.5px] !border-gray-300 !text-gray-700 hover:!bg-gray-50 !font-medium !rounded-full !shadow-none !ring-0 !ring-transparent"
                        >
                            Actions
                        </Button>
                        <Dropdown.Popover className="min-w-48">
                            <Dropdown.Menu>
                                <Dropdown.Item 
                                    onClick={() => onAction?.('bulk-edit')}
                                    className="text-sm text-gray-700 hover:bg-gray-50 px-3 py-2"
                                >
                                    Bulk edit
                                </Dropdown.Item>
                                <Dropdown.Item 
                                    onClick={() => onAction?.('delete')}
                                    className="text-sm text-red-600 hover:bg-red-50 px-3 py-2"
                                >
                                    Delete selected
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown.Popover>
                    </Dropdown.Root>
                </div>
            </div>
        </div>
    );
};
