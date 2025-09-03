import React, { useState, useRef, useEffect, cloneElement, isValidElement } from 'react';
import { SearchLg } from '@untitledui/icons';

interface DropdownItem {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    onClick?: () => void;
}

interface CustomDropdownProps {
    trigger: React.ReactNode;
    items: DropdownItem[];
    searchPlaceholder?: string;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({ 
    trigger, 
    items, 
    searchPlaceholder = "Search..." 
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const filteredItems = items.filter(item =>
        item.label.toLowerCase().includes(searchValue.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleItemClick = (item: DropdownItem) => {
        item.onClick?.();
        setIsOpen(false);
    };

    const handleTriggerClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {isValidElement(trigger) ? 
                cloneElement(trigger as React.ReactElement<any>, { 
                    onClick: handleTriggerClick 
                }) : 
                <div onClick={handleTriggerClick}>
                    {trigger}
                </div>
            }
            
            {isOpen && (
                <div 
                    className="p-2 rounded-lg shadow-lg bg-white border border-gray-200 focus-visible:ring focus:outline-none ring-offset-0 overflow-y-auto min-w-[224px] sm:max-w-xs absolute z-50 mt-1 left-0"
                    role="menu"
                >
                    {/* Search Input */}
                    <div className="p-2" role="none">
                        <div className="relative inline-flex items-center gap-2 rounded-lg appearance-none border placeholder:text-gray-400 transition duration-200 px-2 py-[3px] min-h-[40px] text-sm focus-within:ring-blue-500 focus-within:border-blue-500 bg-white text-gray-900 border-gray-300 w-full focus:outline-none focus-within:ring-1 ring-offset-0">
                            <div className="shrink-0">
                                <SearchLg className="w-4 h-4 text-gray-400" />
                            </div>
                            <input 
                                className="grow appearance-none focus-visible:outline-none bg-transparent" 
                                type="search" 
                                placeholder={searchPlaceholder}
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    {/* Menu Items */}
                    <div className="max-h-[480px] overflow-auto">
                        {filteredItems.map((item) => {
                            const IconComponent = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    className="group flex items-center px-2 py-2.5 w-full rounded-md text-sm text-left bg-white hover:bg-gray-50 cursor-pointer text-gray-900"
                                    onClick={() => handleItemClick(item)}
                                >
                                    <IconComponent className="me-2 shrink-0 h-[1.25em] w-[1.25em]" />
                                    <div className="grow min-w-0 break-words">{item.label}</div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};
