import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
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
    Image01,
    ArrowLeft,
    Upload01,
    ChevronRight
} from "@untitledui/icons";
import { DesignLayout } from "@/components/layouts/design-layout";
import { BrowserMockup } from "@/components/application/browser-mockup/browser-mockup";
import { NavItemBase } from "@/components/application/app-navigation/base-components/nav-item";
import { CustomizerSection } from "@/components/application/app-navigation-admin4/sidebar-navigation/tertiary-sidebar/customizer-section";
import { Input } from "@/components/base/input/input";
import { FileTrigger } from "@/components/base/file-upload-trigger/file-upload-trigger";
import { Button } from "@/components/base/buttons/button";
import { TreeView, type TreeNode } from "@/components/ui/tree-view";
import { File05, Folder, Calendar, File01, Package, Database01, SearchLg } from "@untitledui/icons";

// Design tools navigation - minimal sidebar
const designTools = [
    {
        label: "Page Customizer",
        href: "/admin4/design/page-customizer",
        icon: Brush02,
    },
    {
        label: "Site Appearance", 
        href: "/admin4/design/site-appearance",
        icon: Palette,
    }
];

// Site Appearance sub-navigation
const siteAppearanceTools = [
    {
        label: "Logos",
        href: "/admin4/design/site-appearance/logos",
        icon: Image01,
    },
    {
        label: "Themes",
        href: "/admin4/design/site-appearance/themes", 
        icon: Palette,
    },
    {
        label: "Typographies",
        href: "/admin4/design/site-appearance/typographies",
        icon: Type01,
    },
    {
        label: "Styles",
        href: "/admin4/design/site-appearance/styles",
        icon: Colors,
    }
];

export const AdminDesignPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Check if we're on site appearance page or sub-pages
    const isSiteAppearancePage = location.pathname.includes('/site-appearance');
    const isLogosPage = location.pathname.includes('/site-appearance/logos');
    const isPageCustomizerPage = location.pathname.includes('/page-customizer');
    
    // State for TreeView
    const [expandedIds, setExpandedIds] = useState<string[]>(["spaces"]);
    
    // Get current admin version
    const getCurrentAdminVersion = () => {
        const path = location.pathname;
        if (path.includes('/admin4')) return 'admin4';
        return 'admin4';
    };
    
    const currentAdminVersion = getCurrentAdminVersion();
    
    // Tree data for page customizer (exact copy from site tree but with customize links)
    const pageCustomizerTreeData: TreeNode[] = [
        {
            id: "spaces",
            label: "Spaces",
            icon: <Folder className="size-5 text-fg-quaternary" />,
            children: [
                // Simple spaces (no children)
                { id: "feed", label: "Feed", icon: <File05 className="size-5 text-fg-quaternary" />, data: { href: `/${currentAdminVersion}/site/spaces/feed/customize` } },
                { id: "explorer", label: "Explorer", icon: <File05 className="size-5 text-fg-quaternary" />, data: { href: `/${currentAdminVersion}/site/spaces/explorer/customize` } },
                { id: "members", label: "Members", icon: <File05 className="size-5 text-fg-quaternary" />, data: { href: `/${currentAdminVersion}/site/spaces/members/customize` } },
                { id: "help", label: "Help", icon: <File05 className="size-5 text-fg-quaternary" />, data: { href: `/${currentAdminVersion}/site/spaces/help/customize` } },
                { id: "showcase", label: "Showcase", icon: <File05 className="size-5 text-fg-quaternary" />, data: { href: `/${currentAdminVersion}/site/spaces/showcase/customize` } },
                
                // Folders with children
                {
                    id: "myFolder",
                    label: "MyFolder",
                    icon: <Folder className="size-5 text-fg-quaternary" />,
                    children: [
                        { 
                            id: "myFolder-events", 
                            label: "Events", 
                            icon: <File05 className="size-5 text-fg-quaternary" />,
                            data: { href: `/${currentAdminVersion}/site/spaces/myfolder/events/customize` }
                        },
                        { 
                            id: "myFolder-blog", 
                            label: "Blog", 
                            icon: <File05 className="size-5 text-fg-quaternary" />,
                            data: { href: `/${currentAdminVersion}/site/spaces/myfolder/blog/customize` }
                        },
                        { 
                            id: "myFolder-help", 
                            label: "Help", 
                            icon: <File05 className="size-5 text-fg-quaternary" />,
                            data: { href: `/${currentAdminVersion}/site/spaces/myfolder/help/customize` }
                        },
                        { 
                            id: "myFolder-posts", 
                            label: "Posts", 
                            icon: <File05 className="size-5 text-fg-quaternary" />,
                            data: { href: `/${currentAdminVersion}/site/spaces/myfolder/posts/customize` }
                        }
                    ]
                },
                {
                    id: "myFolder2",
                    label: "Growth",
                    icon: <Folder className="size-5 text-fg-quaternary" />,
                    children: [
                        { 
                            id: "myFolder2-events", 
                            label: "Events", 
                            icon: <File05 className="size-5 text-fg-quaternary" />,
                            data: { href: `/${currentAdminVersion}/site/spaces/growth/events/customize` }
                        },
                        { 
                            id: "myFolder2-blog", 
                            label: "Blog", 
                            icon: <File05 className="size-5 text-fg-quaternary" />,
                            data: { href: `/${currentAdminVersion}/site/spaces/growth/blog/customize` }
                        },
                        { 
                            id: "myFolder2-help", 
                            label: "Help", 
                            icon: <File05 className="size-5 text-fg-quaternary" />,
                            data: { href: `/${currentAdminVersion}/site/spaces/growth/help/customize` }
                        },
                        { 
                            id: "myFolder2-posts", 
                            label: "Posts", 
                            icon: <File05 className="size-5 text-fg-quaternary" />,
                            data: { href: `/${currentAdminVersion}/site/spaces/growth/posts/customize` }
                        }
                    ]
                },
                {
                    id: "myFolder3",
                    label: "MyFolder3",
                    icon: <Folder className="size-5 text-fg-quaternary" />,
                    children: [
                        { 
                            id: "myFolder3-events", 
                            label: "Events", 
                            icon: <File05 className="size-5 text-fg-quaternary" />,
                            data: { href: `/${currentAdminVersion}/site/spaces/myfolder3/events/customize` }
                        },
                        { 
                            id: "myFolder3-blog", 
                            label: "Blog", 
                            icon: <File05 className="size-5 text-fg-quaternary" />,
                            data: { href: `/${currentAdminVersion}/site/spaces/myfolder3/blog/customize` }
                        },
                        { 
                            id: "myFolder3-help", 
                            label: "Help", 
                            icon: <File05 className="size-5 text-fg-quaternary" />,
                            data: { href: `/${currentAdminVersion}/site/spaces/myfolder3/help/customize` }
                        },
                        { 
                            id: "myFolder3-posts", 
                            label: "Posts", 
                            icon: <File05 className="size-5 text-fg-quaternary" />,
                            data: { href: `/${currentAdminVersion}/site/spaces/myfolder3/posts/customize` }
                        }
                    ]
                },
                {
                    id: "myFolder4",
                    label: "MyFolder4",
                    icon: <Folder className="size-5 text-fg-quaternary" />,
                    children: [
                        { 
                            id: "myFolder4-events", 
                            label: "Events", 
                            icon: <File05 className="size-5 text-fg-quaternary" />,
                            data: { href: `/${currentAdminVersion}/site/spaces/myfolder4/events/customize` }
                        },
                        { 
                            id: "myFolder4-blog", 
                            label: "Blog", 
                            icon: <File05 className="size-5 text-fg-quaternary" />,
                            data: { href: `/${currentAdminVersion}/site/spaces/myfolder4/blog/customize` }
                        },
                        { 
                            id: "myFolder4-help", 
                            label: "Help", 
                            icon: <File05 className="size-5 text-fg-quaternary" />,
                            data: { href: `/${currentAdminVersion}/site/spaces/myfolder4/help/customize` }
                        },
                        { 
                            id: "myFolder4-posts", 
                            label: "Posts", 
                            icon: <File05 className="size-5 text-fg-quaternary" />,
                            data: { href: `/${currentAdminVersion}/site/spaces/myfolder4/posts/customize` }
                        }
                    ]
                },
                {
                    id: "myFolder5",
                    label: "MyFolder5",
                    icon: <Folder className="size-5 text-fg-quaternary" />,
                    children: [
                        { 
                            id: "myFolder5-events", 
                            label: "Events", 
                            icon: <File05 className="size-5 text-fg-quaternary" />,
                            data: { href: `/${currentAdminVersion}/site/spaces/myfolder5/events/customize` }
                        },
                        { 
                            id: "myFolder5-blog", 
                            label: "Blog", 
                            icon: <File05 className="size-5 text-fg-quaternary" />,
                            data: { href: `/${currentAdminVersion}/site/spaces/myfolder5/blog/customize` }
                        },
                        { 
                            id: "myFolder5-help", 
                            label: "Help", 
                            icon: <File05 className="size-5 text-fg-quaternary" />,
                            data: { href: `/${currentAdminVersion}/site/spaces/myfolder5/help/customize` }
                        },
                        { 
                            id: "myFolder5-posts", 
                            label: "Posts", 
                            icon: <File05 className="size-5 text-fg-quaternary" />,
                            data: { href: `/${currentAdminVersion}/site/spaces/myfolder5/posts/customize` }
                        }
                    ]
                }
            ]
        },
        {
            id: "utilityPages",
            label: "Utility pages",
            icon: <File01 className="size-5 text-fg-quaternary" />,
            children: [
                { 
                    id: "search", 
                    label: "Search", 
                    icon: <File05 className="size-5 text-fg-quaternary" />,
                    data: { href: `/${currentAdminVersion}/site/search/customize` }
                },
                { 
                    id: "404", 
                    label: "404", 
                    icon: <File05 className="size-5 text-fg-quaternary" />,
                    data: { href: `/${currentAdminVersion}/site/404/customize` }
                },
                { 
                    id: "privateSpace", 
                    label: "Private space",
                    icon: <File05 className="size-5 text-fg-quaternary" />,
                    data: { href: `/${currentAdminVersion}/site/spaces/private-space/customize` }
                },
                { 
                    id: "memberProfile", 
                    label: "Member profile", 
                    icon: <File05 className="size-5 text-fg-quaternary" />,
                    data: { href: `/${currentAdminVersion}/site/member-profile/customize` }
                },
            ]
        },
        {
            id: "content-types",
            label: "Content Types",
            icon: <Package className="size-5 text-fg-quaternary" />,
            children: [
                { 
                    id: "cms-events", 
                    label: "Event",
                    icon: <Database01 className="size-5 text-violet-400" />,
                    data: { href: `/${currentAdminVersion}/site/cms/events/customize` }
                },
                { 
                    id: "cms-blog", 
                    label: "Blog",
                    icon: <Database01 className="size-5 text-blue-400" />,
                    data: { href: `/${currentAdminVersion}/site/cms/blog/customize` }
                }
            ]
        }
    ];
    
    // Handle tree node clicks
    const handleNodeClick = (node: TreeNode) => {
        if (node.data?.href) {
            navigate(node.data.href, { 
                state: { from: 'page-customizer' }
            });
        }
    };
    
    // Handle tree node expand/collapse
    const handleNodeExpand = (nodeId: string, expanded: boolean) => {
        if (expanded) {
            setExpandedIds(prev => [...prev, nodeId]);
        } else {
            setExpandedIds(prev => prev.filter(id => id !== nodeId));
        }
    };
    
    const renderPageCustomizerContent = () => {
        return (
            <div>
                {/* Header Section */}
                <div className="px-4 lg:px-5">
                    {/* Back Button */}
                    <div className="mb-2">
                        <button
                            onClick={() => navigate('/admin4/design')}
                            className="p-2 rounded-full border border-secondary hover:bg-secondary/60 transition-colors"
                        >
                            <ArrowLeft className="size-4 text-fg-quaternary" />
                        </button>
                    </div>
                    
                    {/* Title */}
                    <div className="mb-3">
                        <h3 className="text-[1.35rem] font-semibold text-primary tracking-tight">
                            Page Customizer
                        </h3>
                    </div>
                </div>

                {/* Search Field */}
                <div className="mt-2 px-4">
                    <Input 
                        size="sm" 
                        aria-label="Search" 
                        placeholder="Search" 
                        icon={SearchLg} 
                    />
                </div>

                {/* TreeView Content */}
                <div className="mt-4 px-4">
                    <div className="flex-1 min-h-0 overflow-y-auto scrollbar-none">
                        <TreeView
                            data={pageCustomizerTreeData}
                            expandedIds={expandedIds}
                            selectedIds={["spaces"]}
                            onNodeClick={handleNodeClick}
                            onNodeExpand={handleNodeExpand}
                            className="border-none bg-transparent"
                            showLines={false}
                            showIcons={true}
                        />
                    </div>
                </div>

                {/* Footer spacer */}
                <div className="mt-auto py-4"></div>
            </div>
        );
    };

    const renderLogosConfig = () => {
        const handleFileSelect = (files: FileList | null) => {
            if (files && files.length > 0) {
                console.log('File selected:', files[0]);
                // Handle file upload logic here
            }
        };

        return (
            <div>
                {/* Header Section - Reduced spacing */}
                <div className="px-4 lg:px-5">
                    {/* Back Button */}
                    <div className="mb-2">
                        <button
                            onClick={() => navigate('/admin4/design/site-appearance')}
                            className="p-2 rounded-full border border-secondary hover:bg-secondary/60 transition-colors"
                        >
                            <ArrowLeft className="size-4 text-fg-quaternary" />
                        </button>
                    </div>
                    
                    {/* Title */}
                    <div className="mb-3">
                        <h3 className="text-[1.35rem] font-semibold text-primary tracking-tight">
                            Logos
                        </h3>
                    </div>
                </div>

                {/* Content Section - Reduced top margin */}
                <div className="mt-2 px-4 space-y-6">

                {/* Light Version Logo Section */}
                <CustomizerSection title="Light version logo" defaultExpanded={true}>
                    <div className="space-y-4">
                        {/* Light logo image */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-secondary">Light logo image</label>
                            <FileTrigger
                                acceptedFileTypes={['image/*']}
                                onSelect={handleFileSelect}
                            >
                                <div className="flex items-center justify-center w-full h-24 border-2 border-dashed border-secondary bg-secondary/20 rounded-lg cursor-pointer hover:bg-secondary/30 transition-colors">
                                    <div className="text-center">
                                        <Upload01 className="h-6 w-6 text-tertiary mx-auto mb-2" />
                                        <button className="px-3 py-1.5 text-xs font-medium bg-secondary text-primary rounded-md hover:bg-secondary/80 transition-colors">
                                            Upload Image
                                        </button>
                                    </div>
                                </div>
                            </FileTrigger>
                            <p className="text-xs text-tertiary">
                                Recommended size is 600 x 80 pixels.
                            </p>
                        </div>

                        {/* Light square image */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-secondary">Light square image</label>
                            <FileTrigger
                                acceptedFileTypes={['image/*']}
                                onSelect={handleFileSelect}
                            >
                                <div className="flex items-center justify-center w-full h-24 border-2 border-dashed border-secondary bg-secondary/20 rounded-lg cursor-pointer hover:bg-secondary/30 transition-colors">
                                    <div className="text-center">
                                        <Upload01 className="h-6 w-6 text-tertiary mx-auto mb-2" />
                                        <button className="px-3 py-1.5 text-xs font-medium bg-secondary text-primary rounded-md hover:bg-secondary/80 transition-colors">
                                            Upload Image
                                        </button>
                                    </div>
                                </div>
                            </FileTrigger>
                            <p className="text-xs text-tertiary">
                                Recommended size is 512 x 512 pixels.
                            </p>
                        </div>

                        {/* Light favicon */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-secondary">Light favicon</label>
                            <FileTrigger
                                acceptedFileTypes={['image/*']}
                                onSelect={handleFileSelect}
                            >
                                <div className="flex items-center justify-center w-full h-24 border-2 border-dashed border-secondary bg-secondary/20 rounded-lg cursor-pointer hover:bg-secondary/30 transition-colors">
                                    <div className="text-center">
                                        <Upload01 className="h-6 w-6 text-tertiary mx-auto mb-2" />
                                        <button className="px-3 py-1.5 text-xs font-medium bg-secondary text-primary rounded-md hover:bg-secondary/80 transition-colors">
                                            Upload Image
                                        </button>
                                    </div>
                                </div>
                            </FileTrigger>
                            <p className="text-xs text-tertiary">
                                Recommended size is 512 x 512 pixels.
                            </p>
                        </div>
                    </div>
                </CustomizerSection>

                {/* Dark Version Logo Section */}
                <CustomizerSection title="Dark version logo" defaultExpanded={true}>
                    <div className="space-y-4">
                        {/* Dark logo image */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-secondary">Dark logo image</label>
                            <FileTrigger
                                acceptedFileTypes={['image/*']}
                                onSelect={handleFileSelect}
                            >
                                <div className="flex items-center justify-center w-full h-24 border-2 border-dashed border-secondary bg-secondary/20 rounded-lg cursor-pointer hover:bg-secondary/30 transition-colors">
                                    <div className="text-center">
                                        <Upload01 className="h-6 w-6 text-tertiary mx-auto mb-2" />
                                        <button className="px-3 py-1.5 text-xs font-medium bg-secondary text-primary rounded-md hover:bg-secondary/80 transition-colors">
                                            Upload Image
                                        </button>
                                    </div>
                                </div>
                            </FileTrigger>
                            <p className="text-xs text-tertiary">
                                Recommended size is 600 x 80 pixels.
                            </p>
                        </div>

                        {/* Dark square image */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-secondary">Dark square image</label>
                            <FileTrigger
                                acceptedFileTypes={['image/*']}
                                onSelect={handleFileSelect}
                            >
                                <div className="flex items-center justify-center w-full h-24 border-2 border-dashed border-secondary bg-secondary/20 rounded-lg cursor-pointer hover:bg-secondary/30 transition-colors">
                                    <div className="text-center">
                                        <Upload01 className="h-6 w-6 text-tertiary mx-auto mb-2" />
                                        <button className="px-3 py-1.5 text-xs font-medium bg-secondary text-primary rounded-md hover:bg-secondary/80 transition-colors">
                                            Upload Image
                                        </button>
                                    </div>
                                </div>
                            </FileTrigger>
                            <p className="text-xs text-tertiary">
                                Recommended size is 512 x 512 pixels.
                            </p>
                        </div>

                        {/* Dark favicon */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-secondary">Dark favicon</label>
                            <FileTrigger
                                acceptedFileTypes={['image/*']}
                                onSelect={handleFileSelect}
                            >
                                <div className="flex items-center justify-center w-full h-24 border-2 border-dashed border-secondary bg-secondary/20 rounded-lg cursor-pointer hover:bg-secondary/30 transition-colors">
                                    <div className="text-center">
                                        <Upload01 className="h-6 w-6 text-tertiary mx-auto mb-2" />
                                        <button className="px-3 py-1.5 text-xs font-medium bg-secondary text-primary rounded-md hover:bg-secondary/80 transition-colors">
                                            Upload Image
                                        </button>
                                    </div>
                                </div>
                            </FileTrigger>
                            <p className="text-xs text-tertiary">
                                Recommended size is 512 x 512 pixels.
                            </p>
                        </div>
                    </div>
                </CustomizerSection>
                </div>

                {/* Footer spacer - Same as other pages */}
                <div className="mt-auto py-4"></div>
            </div>
        );
    };

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
        <aside className="flex h-full max-w-full flex-col justify-between overflow-auto scrollbar-thin bg-primary pt-4 lg:pt-6">
            {/* Show logos config when on logos page */}
            {isLogosPage ? (
                renderLogosConfig()
            ) : isPageCustomizerPage ? (
                renderPageCustomizerContent()
            ) : (
                <>
                    {/* Header Section - Reduced spacing */}
                    <div className="px-4 lg:px-5">
                        {/* Back Button - Only for site appearance pages */}
                        {isSiteAppearancePage && (
                            <div className="mb-2">
                                <button
                                    onClick={() => navigate('/admin4/design')}
                                    className="p-2 rounded-full border border-secondary hover:bg-secondary/60 transition-colors"
                                >
                                    <ArrowLeft className="size-4 text-fg-quaternary" />
                                </button>
                            </div>
                        )}
                        
                        <div className={isSiteAppearancePage ? "mb-3" : "mb-2"}>
                            <h3 className="text-[1.35rem] font-semibold text-primary tracking-tight">
                                {isSiteAppearancePage ? 'Site Appearance' : 'Design Studio'}
                            </h3>
                        </div>
                    </div>

                    {/* Navigation Items - Reduced top margin */}
                    <div className="mt-2 flex flex-col px-4">
                        <div className="flex flex-col gap-1">
                            {(isSiteAppearancePage ? siteAppearanceTools : designTools).map((item) => (
                                <NavItemBase 
                                    key={item.label} 
                                    type="link" 
                                    href={item.href} 
                                    icon={item.icon}
                                    current={location.pathname === item.href}
                                    badge={<ChevronRight size={16} className="text-fg-quaternary" />}
                                >
                                    {item.label}
                                </NavItemBase>
                            ))}
                        </div>
                    </div>

                    {/* Footer spacer */}
                    <div className="mt-auto py-4"></div>
                </>
            )}
        </aside>
    );

    return (
        <DesignLayout
            title="" // Empty since we handle title in sidebar content
            description="" // Empty since we handle description in sidebar content
            sidebarContent={sidebarContent}
            currentPath={location.pathname}
        >
            {renderMainContent()}
        </DesignLayout>
    );
};
