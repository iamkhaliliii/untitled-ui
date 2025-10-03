import React, { useState } from "react";
import { useLocation } from "react-router";
import {
    Palette,
    Brush02,
    Settings01,
    Eye,
    Code01,
    LayersThree01,
    Grid03,
    Type01,
    Colors,
    Image01
} from "@untitledui/icons";
import { DesignLayout } from "@/components/layouts/design-layout";
import { BrowserMockup } from "@/components/application/browser-mockup/browser-mockup";

// Design tools navigation
const designTools = [
    {
        id: "logos",
        label: "Logos",
        icon: Image01,
        description: "Upload and manage your brand logos"
    },
    {
        id: "themes",
        label: "Themes",
        icon: Palette,
        description: "Choose and customize themes"
    },
    {
        id: "typographies",
        label: "Typographies",
        icon: Type01,
        description: "Font families and text styling"
    },
    {
        id: "styles",
        label: "Styles",
        icon: Colors,
        description: "Colors, spacing, and visual styles"
    },
    {
        id: "page-customizer",
        label: "Page Customizer",
        icon: Brush02,
        description: "Advanced page layout customization"
    }
];

export const AdminDesignPage = () => {
    const location = useLocation();
    const [selectedTool, setSelectedTool] = useState(designTools[0]);

    const renderMainContent = () => {
        return (
            <div className="p-6">
                {/* Browser Mockup */}
                <div className="max-w-6xl mx-auto">
                    <BrowserMockup />
                </div>
            </div>
        );
    };

    const sidebarContent = (
        <nav className="space-y-1">
            {designTools.map((tool) => (
                <button
                    key={tool.id}
                    onClick={() => setSelectedTool(tool)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors ${
                        selectedTool.id === tool.id
                            ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300'
                            : 'text-secondary hover:text-primary hover:bg-secondary/50'
                    }`}
                >
                    <tool.icon className="w-5 h-5 flex-shrink-0" />
                    <div className="flex-1">
                        <div className="font-medium">{tool.label}</div>
                        <div className="text-xs text-tertiary">{tool.description}</div>
                    </div>
                </button>
            ))}
        </nav>
    );

    return (
        <DesignLayout
            sidebarContent={sidebarContent}
            currentPath={location.pathname}
        >
            {renderMainContent()}
        </DesignLayout>
    );
};
