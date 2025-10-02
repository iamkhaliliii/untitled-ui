"use client";

import { SearchLg } from "@untitledui/icons";
import { Input } from "@/components/base/input/input";
import { UntitledLogo } from "@/components/foundations/logo/untitledui-logo";
import { cx } from "@/utils/cx";
import { MobileNavigationHeader } from "../base-components/mobile-header";
import { NavAccountCard } from "../base-components/nav-account-card";
import { NavItemBase } from "../base-components/nav-item";
import { NavList } from "../base-components/nav-list";
import type { NavItemDividerType, NavItemType } from "../config";
import { useAdmin } from "@/hooks/use-admin";

interface SidebarNavigationFullProps {
    /** URL of the currently active item. */
    activeUrl?: string;
    /** List of items to display. */
    items: (NavItemType | NavItemDividerType)[];
    /** List of footer items to display. */
    footerItems?: (NavItemType | NavItemDividerType)[];
    /** Whether to hide the border. */
    hideBorder?: boolean;
    /** Whether to hide the right side border. */
    hideRightBorder?: boolean;
    /** Width of the sidebar. */
    width?: number;
}

export const SidebarNavigationFull = ({ 
    activeUrl, 
    items,
    footerItems = [], 
    hideBorder, 
    hideRightBorder,
    width = 288 
}: SidebarNavigationFullProps) => {
    const { isAdmin, adminHeaderVisible, adminHeaderCollapsed } = useAdmin();
    const desktopSidebar = (
        <aside
            style={{ width }}
            className={cx(
                "flex h-full max-w-full flex-col justify-between overflow-auto scrollbar-thin bg-primary pt-4 lg:pt-6",
                !(hideBorder || hideRightBorder) && "border-r border-secondary"
            )}
        >
            <div className="flex flex-col gap-5 px-4 lg:px-5">
                {!(isAdmin && adminHeaderVisible) && (
                    <UntitledLogo className="h-8" />
                )}
                <Input shortcut size="sm" aria-label="Search" placeholder="Search" icon={SearchLg} />
            </div>

            <NavList items={items} activeUrl={activeUrl} />

            <div className="mt-auto flex flex-col gap-4 px-2 py-4 lg:px-4 lg:py-6">
                {footerItems.length > 0 && (
                    <div className="flex flex-col gap-1">
                        {footerItems.map((item) => (
                            <NavItemBase 
                                key={item.label} 
                                type="link" 
                                href={item.href} 
                                icon={item.icon}
                                current={activeUrl === item.href}
                            >
                                {item.label}
                            </NavItemBase>
                        ))}
                    </div>
                )}

                <NavAccountCard />
            </div>
        </aside>
    );

    return (
        <>
            {/* Desktop sidebar navigation */}
            <div className={`z-50 hidden lg:fixed lg:left-0 lg:flex ${
                isAdmin && adminHeaderVisible 
                    ? adminHeaderCollapsed
                        ? 'lg:top-3 lg:bottom-0'  // Collapsed header height
                        : 'lg:top-12 lg:bottom-0' // Full header height
                    : 'lg:inset-y-0'
            }`}>
                {desktopSidebar}
            </div>

            {/* Placeholder to take up physical space because the real sidebar has `fixed` position. */}
            <div
                style={{ paddingLeft: width }}
                className="invisible hidden lg:sticky lg:top-0 lg:bottom-0 lg:left-0 lg:block"
            />

            {/* Mobile header navigation */}
            <MobileNavigationHeader>
                <aside className="group flex h-full max-h-full w-full max-w-full flex-col justify-between overflow-y-auto scrollbar-thin bg-primary pt-4">
                    {!(isAdmin && adminHeaderVisible) && (
                        <div className="px-4">
                            <UntitledLogo className="h-8" />
                        </div>
                    )}

                    <NavList items={items} activeUrl={activeUrl} />

                    <div className="mt-auto flex flex-col gap-5 px-2 py-4">
                        {footerItems.length > 0 && (
                            <div className="flex flex-col gap-1">
                                {footerItems.map((item) => (
                                    <NavItemBase 
                                        key={item.label} 
                                        type="link" 
                                        href={item.href} 
                                        icon={item.icon}
                                        current={activeUrl === item.href}
                                    >
                                        {item.label}
                                    </NavItemBase>
                                ))}
                            </div>
                        )}

                        <NavAccountCard />
                    </div>
                </aside>
            </MobileNavigationHeader>
        </>
    );
}; 