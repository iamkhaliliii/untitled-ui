import React from "react";
import { 
    Calendar,
    MessageChatCircle,
    BookOpen01,
    File05,
    FileSearch01,
    User01,
    Database01,
    ChevronRight,
    Building05,
    Tag01
} from "@untitledui/icons";
import { Dropdown } from "@/components/base/dropdown/dropdown";

interface DropdownItemType {
    label: string;
    onClick?: () => void;
    isSection?: boolean;
    isSeparator?: boolean;
}

interface AdminStickyHeaderDropdownProps {
    items: DropdownItemType[];
    className?: string;
}

const getItemIcon = (label: string, isContentType = false) => {
    if (isContentType) {
        return Database01;
    }
    
    const iconMap: { [key: string]: any } = {
        // Site items
        'Growth Events': Calendar,
        'Events': Calendar,
        'Blog': MessageChatCircle,
        'Help': BookOpen01,
        'Posts': File05,
        'Search': FileSearch01,
        'Member Profile': User01,
        '404': File05,
        // Content items
        'Native Events': File05,
        'Member groups': File05,
        'Image text in Content if an image': File05,
        'Annual Tech Conference 2024': Calendar,
        'Product Launch Event': Calendar,
        'Team Building Workshop': Calendar,
        'Spaces': Building05,
        'Tags': Tag01,
    };
    return iconMap[label];
};

export const AdminStickyHeaderDropdown = ({ items, className }: AdminStickyHeaderDropdownProps) => {
    // Group items by sections
    const sections: { header?: string; items: any[] }[] = [];
    let currentSection: any = null;
    
    items.forEach((item) => {
        if (item.isSection) {
            currentSection = { header: item.label, items: [] };
            sections.push(currentSection);
        } else if (item.isSeparator) {
            // Start new section after separator
            currentSection = null;
        } else if (currentSection) {
            currentSection.items.push(item);
        }
    });
    
    return (
        <>
            {sections.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                    {/* Custom Section Header */}
                    {section.header && (
                        <div className="px-3 py-1.5 border-b border-secondary">
                            <label className="text-xs font-medium text-tertiary">
                                {section.header}
                            </label>
                        </div>
                    )}
                    
                    {/* Section Items using Dropdown.Menu */}
                    <Dropdown.Menu>
                        <Dropdown.Section>
                            {section.items.map((item, itemIndex) => {
                                const isContentType = section.header === 'Content Types';
                                const Icon = getItemIcon(item.label, isContentType);
                                const isMore = item.label === 'See more';
                                
                                return (
                                    <Dropdown.Item
                                        key={itemIndex}
                                        icon={Icon}
                                        label={item.label}
                                        onAction={item.onClick}
                                        className={isContentType ? '[&_svg]:text-purple-500 dark:[&_svg]:text-purple-400' : ''}
                                        addon={isMore ? "→" : undefined}
                                    />
                                );
                            })}
                        </Dropdown.Section>
                    </Dropdown.Menu>
                </div>
            ))}
        </>
    );
};
