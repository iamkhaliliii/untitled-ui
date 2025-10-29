import React, { useState, useEffect } from "react";
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
    ChevronRight,
    Menu01
} from "@untitledui/icons";
import { DesignLayout } from "@/components/layouts/design-layout";
import { BrowserMockup } from "@/components/application/browser-mockup/browser-mockup";
import { NavItemBase } from "@/components/application/app-navigation/base-components/nav-item";
import { CustomizerSection } from "@/components/application/app-navigation-admin4/sidebar-navigation/tertiary-sidebar/customizer-section";
import { Input } from "@/components/base/input/input";
import { FileTrigger } from "@/components/base/file-upload-trigger/file-upload-trigger";
import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Toggle } from "@/components/base/toggle/toggle";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { TreeView, type TreeNode } from "@/components/ui/tree-view";
import { File05, Folder, Calendar, File01, Package, Database01, SearchLg, Phone01, Tablet01, Monitor01, FlipBackward, FlipForward, LayoutTop, DotsGrid, DotsHorizontal, Plus, Home01, FilePlus01, AlertCircle, Star01 } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { useResolvedTheme } from "@/hooks/use-resolved-theme";
import { WidgetConfigProvider, useWidgetConfig } from "@/providers/widget-config-provider";
import AddSpaceTemplateModal from "@/components/application/modals/add-space-template-modal";

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
    },
    {
        label: "Navigation",
        href: "/admin4/design/site-appearance/navigation",
        icon: Menu01,
    }
];

export const AdminDesignPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useResolvedTheme();
    
    // Check if we're on site appearance page or sub-pages
    const isSiteAppearancePage = location.pathname.includes('/site-appearance');
    const isLogosPage = location.pathname.includes('/site-appearance/logos');
    const isPageCustomizerPage = location.pathname.includes('/page-customizer');
    const isNavigationPage = location.pathname.includes('/site-appearance/navigation');
    
    // Check if user came from customize page
    const cameFromCustomizePage = location.state?.from === 'customize-page';
    const returnToUrl = location.state?.returnTo;
    
    // State for TreeView
    const [expandedIds, setExpandedIds] = useState<string[]>([]);
    
    // State for Navigation config
    const [headerSidebarExpanded, setHeaderSidebarExpanded] = useState(true);
    const [headerWidgetsExpanded, setHeaderWidgetsExpanded] = useState(true);
    const [sidebarWidgetsExpanded, setSidebarWidgetsExpanded] = useState(true);
    const [navToggleStates, setNavToggleStates] = useState({
        header: true,
        leftSidebar: true
    });
    
    // State for navigation widgets
    const [navigationWidgets, setNavigationWidgets] = useState({
        topNavigation: true,
        menu: true
    });
    
    // Dropdown state for widget settings
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
    
    // State for Add Space Template Modal
    const [isAddSpaceModalOpen, setIsAddSpaceModalOpen] = useState(false);
    
    // Keyboard shortcut for modal (N key)
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            // Check if 'N' or 'n' is pressed (not in an input field)
            if ((event.key === 'N' || event.key === 'n') && 
                event.target instanceof HTMLElement && 
                !['INPUT', 'TEXTAREA'].includes(event.target.tagName) &&
                isPageCustomizerPage) {
                setIsAddSpaceModalOpen(true);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [isPageCustomizerPage]);
    
    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (openDropdownId && !(event.target as Element).closest('.relative')) {
                setOpenDropdownId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [openDropdownId]);
    
    // Get current admin version
    const getCurrentAdminVersion = () => {
        const path = location.pathname;
        if (path.includes('/admin4')) return 'admin4';
        return 'admin4';
    };
    
    const currentAdminVersion = getCurrentAdminVersion();
    
    // Handlers for navigation widget actions
    const handleAddHeaderWidget = () => {
        console.log("Add header widget clicked");
        // Add logic to show widget selection for header
    };
    
    const handleAddSidebarWidget = () => {
        console.log("Add sidebar widget clicked");
        // Add logic to show widget selection for sidebar
    };
    
    // Handler for template selection
    const handleTemplateSelect = (template: any) => {
        console.log("Selected template:", template);
        // Navigate to customize page for the selected template
        navigate(`/${currentAdminVersion}/design/spaces/${template.id}/customize`, {
            state: {
                from: 'space-creation',
                spaceType: template.id
            }
        });
    };
    
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
                            id: "myFolder2-discussion", 
                            label: "Discussion", 
                            icon: <File05 className="size-5 text-fg-quaternary" />,
                            data: { href: `/${currentAdminVersion}/site/spaces/growth/discussion/customize` }
                        },
                        { 
                            id: "myFolder2-question", 
                            label: "Question", 
                            icon: <File05 className="size-5 text-fg-quaternary" />,
                            data: { href: `/${currentAdminVersion}/site/spaces/growth/question/customize` }
                        },
                        { 
                            id: "myFolder2-wishlist", 
                            label: "Wishlist", 
                            icon: <File05 className="size-5 text-fg-quaternary" />,
                            data: { href: `/${currentAdminVersion}/site/spaces/growth/wishlist/customize` }
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
            <div className="flex h-full flex-col mt-2">
                {/* Header Section */}
                <div className="flex-shrink-0 px-4 lg:px-5">
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
                        <p className="text-sm text-tertiary mt-1">
                            Select pages to customize their layout and content
                        </p>
                    </div>
                </div>

                {/* Search Field */}
                <div className="flex-shrink-0 mt-2 px-4 mb-4">
                    <Input 
                        size="sm" 
                        aria-label="Search" 
                        placeholder="Search" 
                        icon={SearchLg} 
                    />
                </div>

                {/* Scrollable Content Area */}
                <div className="flex-1 min-h-0 overflow-y-auto scrollbar-none px-4">
                    <TreeView
                        data={pageCustomizerTreeData}
                        expandedIds={expandedIds}
                        selectedIds={[]}
                        onNodeClick={handleNodeClick}
                        onNodeExpand={handleNodeExpand}
                        className="border-none bg-transparent"
                        showLines={false}
                        showIcons={true}
                    />
                </div>

                {/* Fixed Footer Actions */}
                <div className="flex-shrink-0 bg-primary">
                    <div className="h-px bg-secondary/40 my-2"></div>
                    <button 
                        onClick={() => navigate(`/${currentAdminVersion}/design/spaces/create`)}
                        className="cursor-pointer rounded-md group flex items-center w-full transition duration-100 ease-linear bg-primary text-secondary hover:bg-primary_hover hover:text-secondary_hover focus:outline-none px-3 py-1.5"
                    >
                        <div className="mr-2 size-4 shrink-0 flex items-center justify-center">
                            <Package className="size-4 text-fg-quaternary transition-inherit-all group-hover:text-secondary_hover" />
                        </div>
                        <span className="flex-1 text-sm font-medium text-secondary transition-inherit-all group-hover:text-secondary_hover truncate text-left">
                            Add space
                        </span>
                        <div className="ml-1 size-3 shrink-0 flex items-center justify-center">
                            <AlertCircle className="size-3 text-fg-quaternary/60 opacity-60" />
                        </div>
                    </button>
                    <button 
                        onClick={() => console.log('Add collection clicked')}
                        className="cursor-pointer rounded-md group flex items-center w-full transition duration-100 ease-linear bg-primary text-secondary hover:bg-primary_hover hover:text-secondary_hover focus:outline-none px-3 py-1.5 mt-0.5"
                    >
                        <div className="mr-2 size-4 shrink-0 flex items-center justify-center">
                            <FilePlus01 className="size-4 text-fg-quaternary transition-inherit-all group-hover:text-secondary_hover" />
                        </div>
                        <span className="flex-1 text-sm font-medium text-secondary transition-inherit-all group-hover:text-secondary_hover truncate text-left">
                            Add collection
                        </span>
                        <div className="ml-1 size-3 shrink-0 flex items-center justify-center">
                            <AlertCircle className="size-3 text-fg-quaternary/60 opacity-60" />
                        </div>
                    </button>
                </div>
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
                <div className="mt-2 flex-1 overflow-y-auto">
                    <div className="px-6 space-y-2">
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
                   {/* Divider */}
        <div className={cx(
          "border-t",
          theme === 'dark' ? "border-gray-700" : "border-secondary"
        )}></div>

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
                </div>

                {/* Footer spacer - Same as other pages */}
                <div className="mt-auto py-4"></div>
            </div>
        );
    };

    const renderNavigationConfig = () => {
        return (
            <div>
                {/* Header Section */}
                <div className="px-4 lg:px-5">
                    {/* Back Button */}
                    <div className="mb-2">
                        <button
                            onClick={() => {
                                if (cameFromCustomizePage && returnToUrl) {
                                    navigate(returnToUrl);
                                } else {
                                    navigate('/admin4/design/site-appearance');
                                }
                            }}
                            className="p-2 rounded-full border border-secondary hover:bg-secondary/60 transition-colors"
                        >
                            <ArrowLeft className="size-4 text-fg-quaternary" />
                        </button>
                    </div>
                    
                    {/* Title */}
                    <div className="mb-3">
                        <h3 className="text-[1.35rem] font-semibold text-primary tracking-tight">
                            Navigation
                        </h3>
                        <p className="text-sm text-tertiary mt-1">
                            Configure header and sidebar navigation elements
                        </p>
                    </div>
                </div>

                {/* Content Section */}
                <div className="mt-2 flex-1 overflow-y-auto">
                    <div className="space-y-2 p-6">
                        {/* Header and sidebar Section */}
                        <CustomizerSection
                            title="Header and sidebar"
                            isExpanded={headerSidebarExpanded}
                            onExpandedChange={setHeaderSidebarExpanded}
                        >
                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex flex-row col-span-1 py-1 px-2 hover:bg-secondary border border-secondary rounded-md items-center text-tertiary">
                                    <Checkbox
                                        isSelected={navToggleStates.header}
                                        onChange={(isSelected) => setNavToggleStates(prev => ({ ...prev, header: isSelected }))}
                                        label="Header"
                                        size="sm"
                                    />
                                </div>
                                
                                <div className="flex flex-row col-span-1 py-1 px-2 hover:bg-secondary border border-secondary rounded-md items-center text-tertiary">
                                    <Checkbox
                                        isSelected={navToggleStates.leftSidebar}
                                        onChange={(isSelected) => setNavToggleStates(prev => ({ ...prev, leftSidebar: isSelected }))}
                                        label="Sidebar"
                                        size="sm"
                                    />
                                </div>
                            </div>
                        </CustomizerSection>
                        
                        {/* Divider */}
                        <div className={cx(
                            "border-t",
                            theme === 'dark' ? "border-gray-700" : "border-secondary"
                        )}></div>

                        {/* Header Widgets Section */}
                        <CustomizerSection 
                            title="Header Widgets" 
                            isExpanded={headerWidgetsExpanded}
                            onExpandedChange={setHeaderWidgetsExpanded}
                            action={{
                                label: "Add Widget",
                                icon: Plus,
                                onClick: handleAddHeaderWidget
                            }}
                        >
                            <div className="space-y-2">
                                {/* Top Navigation Widget */}
                                <div className={cx(
                                    "flex items-center py-2 px-2 border rounded-md transition-all duration-300 ease-in-out relative",
                                    theme === 'dark' 
                                        ? "border-gray-700 bg-gray-800/50 hover:bg-gray-800/80 hover:border-gray-600"
                                        : "border-gray-200 bg-white/50 hover:bg-white/80 hover:border-gray-300"
                                )}>
                                    <div className="flex items-center space-x-3">
                                        {/* Reorder handle */}
                                        <div className="cursor-move p-1">
                                            <DotsGrid className={cx(
                                                "h-4 w-4",
                                                theme === 'dark' ? "text-gray-500" : "text-gray-400"
                                            )} />
                                        </div>
                                        
                                        <div className="p-1.5 rounded-md bg-blue-100/20">
                                            <LayoutTop className="h-4 w-4 text-blue-400" />
                                        </div>
                                        <span className={cx(
                                            "text-sm font-medium",
                                            theme === 'dark' ? "text-gray-100" : "text-gray-900"
                                        )}>Top Navigation</span>
                                    </div>
                                    <div className="ml-auto flex items-center space-x-1">
                                        {/* Dropdown Menu Button */}
                                        <div className="relative">
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setOpenDropdownId(openDropdownId === 'top-navigation' ? null : 'top-navigation');
                                                }}
                                                className={cx(
                                                    "p-1 rounded-md hover:bg-secondary/60 transition-colors",
                                                    theme === 'dark' ? "hover:bg-gray-700" : "hover:bg-gray-100"
                                                )}
                                            >
                                                <DotsHorizontal className={cx(
                                                    "h-4 w-4",
                                                    theme === 'dark' ? "text-gray-400" : "text-gray-500"
                                                )} />
                                            </button>
                                            
                                            {/* Dropdown Menu */}
                                            {openDropdownId === 'top-navigation' && (
                                                <div className={cx(
                                                    "absolute right-0 top-8 w-40 rounded-lg border shadow-lg py-1 z-50",
                                                    theme === 'dark' 
                                                        ? "bg-gray-800 border-gray-700" 
                                                        : "bg-white border-gray-200"
                                                )}>
                                                    <button
                                                        onClick={() => {
                                                            console.log("Configure Top Navigation");
                                                            setOpenDropdownId(null);
                                                        }}
                                                        className={cx(
                                                            "flex items-center w-full px-3 py-2 text-sm transition-colors",
                                                            theme === 'dark' 
                                                                ? "text-gray-200 hover:bg-gray-700 hover:text-gray-100"
                                                                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                                                        )}
                                                    >
                                                        <Settings01 className="size-3 mr-2" />
                                                        Config
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        
                                        <Toggle
                                            id="top-navigation"
                                            isSelected={navigationWidgets.topNavigation}
                                            onChange={(isSelected) => setNavigationWidgets(prev => ({ ...prev, topNavigation: isSelected }))}
                                            size="sm"
                                            slim
                                        />
                                    </div>
                                </div>
                            </div>
                        </CustomizerSection>

                        {/* Divider */}
                        <div className={cx(
                            "border-t",
                            theme === 'dark' ? "border-gray-700" : "border-secondary"
                        )}></div>

                        {/* Sidebar Widgets Section */}
                        <CustomizerSection 
                            title="Sidebar Widgets" 
                            isExpanded={sidebarWidgetsExpanded}
                            onExpandedChange={setSidebarWidgetsExpanded}
                            action={{
                                label: "Add Widget",
                                icon: Plus,
                                onClick: handleAddSidebarWidget
                            }}
                        >
                            <div className="space-y-2">
                                {/* Menu Widget */}
                                <div className={cx(
                                    "flex items-center py-2 px-2 border rounded-md transition-all duration-300 ease-in-out relative",
                                    theme === 'dark' 
                                        ? "border-gray-700 bg-gray-800/50 hover:bg-gray-800/80 hover:border-gray-600"
                                        : "border-gray-200 bg-white/50 hover:bg-white/80 hover:border-gray-300"
                                )}>
                                    <div className="flex items-center space-x-3">
                                        {/* Reorder handle */}
                                        <div className="cursor-move p-1">
                                            <DotsGrid className={cx(
                                                "h-4 w-4",
                                                theme === 'dark' ? "text-gray-500" : "text-gray-400"
                                            )} />
                                        </div>
                                        
                                        <div className="p-1.5 rounded-md bg-green-100/20">
                                            <Menu01 className="h-4 w-4 text-green-400" />
                                        </div>
                                        <span className={cx(
                                            "text-sm font-medium",
                                            theme === 'dark' ? "text-gray-100" : "text-gray-900"
                                        )}>Menu</span>
                                    </div>
                                    <div className="ml-auto flex items-center space-x-1">
                                        {/* Dropdown Menu Button */}
                                        <div className="relative">
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setOpenDropdownId(openDropdownId === 'menu' ? null : 'menu');
                                                }}
                                                className={cx(
                                                    "p-1 rounded-md hover:bg-secondary/60 transition-colors",
                                                    theme === 'dark' ? "hover:bg-gray-700" : "hover:bg-gray-100"
                                                )}
                                            >
                                                <DotsHorizontal className={cx(
                                                    "h-4 w-4",
                                                    theme === 'dark' ? "text-gray-400" : "text-gray-500"
                                                )} />
                                            </button>
                                            
                                            {/* Dropdown Menu */}
                                            {openDropdownId === 'menu' && (
                                                <div className={cx(
                                                    "absolute right-0 top-8 w-40 rounded-lg border shadow-lg py-1 z-50",
                                                    theme === 'dark' 
                                                        ? "bg-gray-800 border-gray-700" 
                                                        : "bg-white border-gray-200"
                                                )}>
                                                    <button
                                                        onClick={() => {
                                                            console.log("Configure Menu");
                                                            setOpenDropdownId(null);
                                                        }}
                                                        className={cx(
                                                            "flex items-center w-full px-3 py-2 text-sm transition-colors",
                                                            theme === 'dark' 
                                                                ? "text-gray-200 hover:bg-gray-700 hover:text-gray-100"
                                                                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                                                        )}
                                                    >
                                                        <Settings01 className="size-3 mr-2" />
                                                        Config
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        
                                        <Toggle
                                            id="menu"
                                            isSelected={navigationWidgets.menu}
                                            onChange={(isSelected) => setNavigationWidgets(prev => ({ ...prev, menu: isSelected }))}
                                            size="sm"
                                            slim
                                        />
                                    </div>
                                </div>
                            </div>
                        </CustomizerSection>
                    </div>
                </div>

                {/* Footer spacer */}
                <div className="mt-auto py-4"></div>
            </div>
        );
    };

    const renderMainContent = () => {
        return (
            <div className="p-4">
                {/* Control bar above browser mockup */}
                <div className="flex items-center justify-between mb-3">
                    {/* Left side: Device and Navigation ButtonGroups */}
                    <div className="flex items-center gap-4">
                        {/* Device ButtonGroup */}
                        <ButtonGroup 
                            size="sm"
                            selectedKeys={["desktop"]}
                            onSelectionChange={(keys) => {
                                const selected = Array.from(keys)[0] as string;
                                console.log('Device changed:', selected);
                            }}
                        >
                            <ButtonGroupItem id="mobile" iconLeading={Phone01} />
                            <ButtonGroupItem id="tablet" iconLeading={Tablet01} />
                            <ButtonGroupItem id="desktop" iconLeading={Monitor01} />
                        </ButtonGroup>
                        

                    </div>
                    
                    {/* Right side: Save button */}
  
                </div>

                {/* Browser Mockup */}
                <div className="mx-auto">
                    <BrowserMockup />
                </div>
            </div>
        );
    };

    const sidebarContent = (
        <aside className="flex h-full max-w-full flex-col justify-between overflow-auto scrollbar-thin bg-primary pt-4 lg:pt-6">
            {/* Show specific config based on current page */}
            {isLogosPage ? (
                renderLogosConfig()
            ) : isNavigationPage ? (
                renderNavigationConfig()
            ) : isPageCustomizerPage ? (
                renderPageCustomizerContent()
            ) : (
                <>
                    {/* Header Section - Reduced spacing */}
                    <div className="px-4 lg:px-5">
                        {/* Back Button - Only for site appearance pages, Home Button for main design page */}
                        {isSiteAppearancePage ? (
                            <div className="mb-2">
                                <button
                                    onClick={() => navigate('/admin4/design')}
                                    className="p-2 rounded-full border border-secondary hover:bg-secondary/60 transition-colors"
                                >
                                    <ArrowLeft className="size-4 text-fg-quaternary" />
                                </button>
                            </div>
                        ) : (
                            <div className="mb-2">
                                <button
                                    onClick={() => navigate('/admin4')}
                                    className="p-2 rounded-full border border-secondary hover:bg-secondary/60 transition-colors"
                                >
                                    <FlipBackward className="size-4 text-fg-quaternary" />
                                </button>
                            </div>
                        )}
                        
                        <div className="mb-3">
                            <h3 className="text-[1.35rem] font-semibold text-primary tracking-tight">
                                {isSiteAppearancePage ? 'Site Appearance' : 'Design Studio'}
                            </h3>
                            {isSiteAppearancePage ? (
                                <p className="text-sm text-tertiary mt-1">
                                    Manage your brand identity and visual styling
                                </p>
                            ) : (
                                <p className="text-sm text-tertiary mt-1">
                                    Customize your community's visual design and layouts
                                </p>
                            )}
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

                    {/* Footer with title and description */}
                    <div className="mt-auto px-4 py-4 border-t border-secondary">
                        <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-primary">Design Studio</h4>
                            <p className="text-xs text-tertiary leading-relaxed">
                                For enterprise plans, you can use Design Studio Pro to create advanced custom layouts for each page with enhanced design capabilities.
                            </p>
                        </div>
                    </div>
                </>
            )}
        </aside>
    );

    // Inner component to access context
    const NavigationContent = () => {
        const widgetConfig = useWidgetConfig();
        
        // Sync local state with context when it changes (only for navigation page)
        useEffect(() => {
            if (isNavigationPage && widgetConfig) {
                widgetConfig.updateToggleStates(navToggleStates);
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [navToggleStates.header, navToggleStates.leftSidebar, isNavigationPage]);
        
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
    
    return (
        <WidgetConfigProvider>
            <NavigationContent />
            
            {/* Add Space Template Modal */}
            <AddSpaceTemplateModal
                isOpen={isAddSpaceModalOpen}
                onClose={() => setIsAddSpaceModalOpen(false)}
                onSelectTemplate={handleTemplateSelect}
            />
        </WidgetConfigProvider>
    );
};
