"use client";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Menu01, X, ChevronSelectorVertical, Settings01, Shield01, Users01, BarChartSquare02, ClipboardCheck, SearchLg, Brush02, AlertTriangle, Monitor01, MessageChatCircle, Calendar, Archive, Tag01 } from "@untitledui/icons";
import { AnimatePresence, motion } from "motion/react";
import { cx } from "@/utils/cx";
import { ButtonUtility } from "@/components/base/buttons/button-utility";

interface SpaceTab {
    id: string;
    label: string;
    path: string;
    icon?: any;
}

interface MobileSpaceTabsProps {
    basePath: string;
    tabs: SpaceTab[];
    currentTab: string;
    headerActions?: React.ReactNode;
}

export const MobileSpaceTabs = ({ basePath, tabs, currentTab, headerActions }: MobileSpaceTabsProps) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleTabClick = (tab: SpaceTab) => {
        const fullPath = basePath + tab.path;
        navigate(fullPath);
        setIsOpen(false);
    };

    const getCurrentTabLabel = () => {
        const tab = tabs.find(t => t.id === currentTab);
        return tab?.label || "General";
    };

    const getTabIcon = (tabId: string) => {
        switch (tabId) {
            // Space page tabs
            case "general": return Settings01;
            case "permissions": return Shield01;
            case "members": return Users01;
            case "analytics": return BarChartSquare02;
            case "audit-logs": return ClipboardCheck;
            case "seo": return SearchLg;
            case "customize": return Brush02;
            case "danger": return AlertTriangle;
            // Content page tabs
            case "posts": return MessageChatCircle;
            case "events": return Calendar;
            case "spaces": return Archive;
            case "tags": return Tag01;
            default: return Settings01;
        }
    };

    return (
        <>
            {/* Mobile Tab Trigger */}
            <div className="flex items-center justify-between h-12 px-3 border border-secondary">
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-2 text-left"
                >
                    <span className="text-sm font-semibold text-primary">{getCurrentTabLabel()}</span>
                    <ChevronSelectorVertical className="w-4 h-4 text-fg-quaternary" />
                </button>
                
                {/* Header Actions on the right */}
                {headerActions && (
                    <div className="flex items-center gap-2">
                        {headerActions}
                    </div>
                )}
            </div>

            {/* Mobile Tab Menu */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-overlay/70 backdrop-blur-sm z-[75] lg:hidden"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Tab Menu Panel */}
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ 
                                duration: 0.25,
                                ease: "easeOut"
                            }}
                            className="fixed bottom-0 left-0 right-0 bg-primary border-t border-secondary z-[76] lg:hidden max-h-[70vh] rounded-t-xl"
                        >
                            <div className="flex flex-col">
                                {/* Drag Handle */}
                                <div className="flex items-center justify-center pt-3 pb-2">
                                    <div className="w-10 h-1 bg-fg-quaternary/30 rounded-full"></div>
                                </div>

                                {/* Tab List */}
                                <div className="overflow-y-auto flex-1 px-4 pb-4">
                                    <div className="space-y-1">
                                        {tabs.map((tab) => {
                                            const IconComponent = getTabIcon(tab.id);
                                            const isDisabled = tab.id === "customize";
                                            
                                            return (
                                                <button
                                                    key={tab.id}
                                                    onClick={() => !isDisabled && handleTabClick(tab)}
                                                    disabled={isDisabled}
                                                    className={cx(
                                                        "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors",
                                                        isDisabled 
                                                            ? "text-tertiary cursor-not-allowed opacity-50"
                                                            : currentTab === tab.id
                                                                ? "bg-active text-secondary_hover"
                                                                : "text-secondary hover:text-primary hover:bg-secondary"
                                                    )}
                                                >
                                                    <IconComponent className="w-5 h-5 flex-shrink-0" />
                                                    <span className="font-medium">{tab.label}</span>
                                                    
                                                    {isDisabled ? (
                                                        <div className="ml-auto flex items-center gap-1">
                                                            <Monitor01 className="w-3 h-3 text-tertiary" />
                                                            <span className="text-xs text-tertiary font-normal">Desktop only</span>
                                                        </div>
                                                    ) : currentTab === tab.id ? (
                                                        <div className="ml-auto w-2 h-2 bg-brand-solid rounded-full flex-shrink-0" />
                                                    ) : null}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};
