"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { X, ChevronRight, ArrowLeft, Sun, Moon01, Monitor01, GraduationHat02, ChevronSelectorVertical } from "@untitledui/icons";
import { AnimatePresence, motion } from "motion/react";
import { cx } from "@/utils/cx";
import type { NavItemType } from "./config";
import { NavItemBase } from "./base-components/nav-item";
import { Avatar } from "@/components/base/avatar/avatar";
import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";
import { CheckCircle } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { LogOut01, LifeBuoy01, Settings01 } from "@untitledui/icons";
import { useTheme } from "@/providers/theme";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { Button as AriaButton } from "react-aria-components";
import { AdminStickyHeaderAccountMenu } from "@/components/application/admin-sticky-header-account-menu";

interface MobileNavigationSystemProps {
    isOpen: boolean;
    onClose: () => void;
    items: NavItemType[];
    footerItems?: NavItemType[];
    activeUrl?: string;
}

type NavigationLevel = 'main' | 'secondary';

export const MobileNavigationSystem = ({
    isOpen,
    onClose,
    items,
    footerItems = [],
    activeUrl
}: MobileNavigationSystemProps) => {
    const navigate = useNavigate();
    const { theme, setTheme } = useTheme();
    const [currentLevel, setCurrentLevel] = useState<NavigationLevel>('main');
    const [selectedMainItem, setSelectedMainItem] = useState<NavItemType | null>(null);

    // Reset to main level when opening
    useEffect(() => {
        if (isOpen) {
            setCurrentLevel('main');
            setSelectedMainItem(null);
        }
    }, [isOpen]);

    const handleMainItemClick = (item: NavItemType) => {
        if (item.items && item.items.length > 0) {
            setSelectedMainItem(item);
            setCurrentLevel('secondary');
        } else if (item.href) {
            navigate(item.href);
            onClose();
        }
    };

    const handleSecondaryItemClick = (item: NavItemType) => {
        if (item.href) {
            navigate(item.href);
            onClose();
        }
    };

    const handleBackToMain = () => {
        setCurrentLevel('main');
        setSelectedMainItem(null);
    };

    const getThemeIcon = () => {
        switch (theme) {
            case 'light': return Sun;
            case 'dark': return Moon01;
            case 'system': return Monitor01;
            default: return Monitor01;
        }
    };

    const getThemeLabel = () => {
        switch (theme) {
            case 'light': return 'Light';
            case 'dark': return 'Dark';
            case 'system': return 'System';
            default: return 'System';
        }
    };

    const cycleTheme = () => {
        const themes = ['light', 'dark', 'system'] as const;
        const currentIndex = themes.indexOf(theme);
        const nextIndex = (currentIndex + 1) % themes.length;
        setTheme(themes[nextIndex]);
    };

    const renderMainLevel = () => (
        <div className="flex flex-col h-full">
            {/* Header with Site Logo */}
            <div className="flex items-center justify-between p-4 border-b border-secondary">
                <div className="flex items-center gap-3 flex-1">
                    <Dropdown.Root>
                        <AriaButton className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer">
                            <Avatar
                                size="sm"
                                src="https://www.untitledui.com/images/logos/badge/light-logomark/elasticware.svg"
                                alt="Elasticware"
                            />
                            <p className="font-medium text-secondary">Elasticware</p>
                            <ChevronSelectorVertical className="w-4 h-4 text-fg-quaternary ml-1" />
                        </AriaButton>
                        <Dropdown.Popover className="z-[80] !w-80">
                            <AdminStickyHeaderAccountMenu />
                        </Dropdown.Popover>
                    </Dropdown.Root>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-secondary transition-colors flex-shrink-0"
                    aria-label="Close menu"
                >
                    <X className="w-5 h-5 text-fg-quaternary" />
                </button>
            </div>

            {/* Main Navigation Items */}
            <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-1">
                    {items.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => handleMainItemClick(item)}
                            className={cx(
                                "w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors",
                                activeUrl === item.href || item.items?.some(subItem => subItem.href === activeUrl)
                                    ? "bg-active text-secondary_hover"
                                    : "text-secondary hover:text-primary hover:bg-secondary"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                {item.icon && <item.icon className="w-5 h-5" />}
                                <span className="font-medium">{item.label}</span>
                            </div>
                            {item.items && item.items.length > 0 && (
                                <ChevronRight className="w-4 h-4 text-fg-quaternary" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="mt-auto border-t border-secondary">
                {/* Bottom Action Icons */}
                <div className="flex items-center justify-around p-3 border-b border-secondary">
                    <ButtonUtility
                        size="md"
                        color="tertiary"
                        icon={LifeBuoy01}
                        tooltip="Support"
                        onClick={() => {
                            navigate('/support');
                            onClose();
                        }}
                        className="flex-1 max-w-none"
                    />
                    <ButtonUtility
                        size="md"
                        color="tertiary"
                        icon={GraduationHat02}
                        tooltip="Onboarding"
                        onClick={() => {
                            navigate('/admin4/onboarding');
                            onClose();
                        }}
                        className="flex-1 max-w-none"
                    />
                    <ButtonUtility
                        size="md"
                        color="tertiary"
                        icon={getThemeIcon()}
                        tooltip={`Theme: ${getThemeLabel()}`}
                        onClick={cycleTheme}
                        className="flex-1 max-w-none"
                    />
                </div>

                {/* Profile Section */}
                <div className="flex items-center gap-3 p-4">
                    <AvatarLabelGroup
                        status="online"
                        size="sm"
                        src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
                        title="Olivia Rhye"
                        subtitle="olivia@untitledui.com"
                    />
                    <ButtonUtility
                        size="sm"
                        color="tertiary"
                        icon={LogOut01}
                        tooltip="Logout"
                        className="ml-auto"
                    />
                </div>
            </div>
        </div>
    );

    const renderSecondaryLevel = () => (
        <div className="flex flex-col h-full">
            {/* Header with back button */}
            <div className="flex items-center gap-3 p-4 border-b border-secondary">
                <button
                    onClick={handleBackToMain}
                    className="p-2 rounded-lg hover:bg-secondary transition-colors"
                    aria-label="Back to main menu"
                >
                    <ArrowLeft className="w-5 h-5 text-fg-quaternary" />
                </button>
                <div className="flex items-center gap-3">
                    {selectedMainItem?.icon && (
                        <selectedMainItem.icon className="w-5 h-5 text-brand-solid" />
                    )}
                    <h2 className="text-lg font-semibold text-primary">{selectedMainItem?.label}</h2>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-secondary transition-colors ml-auto"
                    aria-label="Close menu"
                >
                    <X className="w-5 h-5 text-fg-quaternary" />
                </button>
            </div>

            {/* Secondary Navigation Items */}
            <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-1">
                    {selectedMainItem?.items?.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => handleSecondaryItemClick(item)}
                            className={cx(
                                "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors",
                                activeUrl === item.href
                                    ? "bg-active text-secondary_hover"
                                    : "text-secondary hover:text-primary hover:bg-secondary"
                            )}
                        >
                            {item.icon && <item.icon className="w-5 h-5" />}
                            <span className="font-medium">{item.label}</span>
                            {item.badge && (
                                <span className="ml-auto px-2 py-1 text-xs bg-brand-solid text-white rounded-full">
                                    {item.badge}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ 
                            duration: 0.25,
                            ease: "easeInOut"
                        }}
                        className="fixed inset-0 bg-overlay/70 backdrop-blur-sm z-[70] lg:hidden"
                        onClick={onClose}
                    />

                    {/* Sliding Panel */}
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ 
                            x: 0,
                            width: currentLevel === 'main' ? "75%" : "100%"
                        }}
                        exit={{ 
                            x: "-100%",
                            transition: { 
                                duration: 0.25,
                                ease: "easeIn"
                            }
                        }}
                        transition={{ 
                            duration: 0.25,
                            ease: "easeOut"
                        }}
                        className={cx(
                            "fixed top-0 left-0 bottom-0 bg-primary border-r border-secondary z-[71] lg:hidden",
                            currentLevel === 'main' ? "max-w-sm" : ""
                        )}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentLevel}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ 
                                    duration: 0.15,
                                    ease: "easeInOut"
                                }}
                                className="h-full"
                            >
                                {currentLevel === 'main' ? renderMainLevel() : renderSecondaryLevel()}
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
