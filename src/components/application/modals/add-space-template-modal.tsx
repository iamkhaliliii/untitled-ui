import { useState } from "react";
import { X, SearchLg, Star01, TrendUp01, Users01, Calendar, File01, Globe01, ChevronRight, FilterFunnel01, Grid01, File05 } from "@untitledui/icons";
import { ModalOverlay, Modal, Dialog } from "./modal";
import { Input } from "@/components/base/input/input";
import { Badge } from "@/components/base/badges/badges";
import { cx } from "@/utils/cx";
import { useResolvedTheme } from "@/hooks/use-resolved-theme";
import { SpacePreviews } from "@/components/application/browser-mockup/space-previews";

interface Template {
    id: string;
    name: string;
    description: string;
    icon: React.ComponentType<any>;
    category: string;
    tags: string[];
    isFeatured?: boolean;
    isPopular?: boolean;
    preview?: string;
}

interface AddSpaceTemplateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectTemplate: (template: Template) => void;
}

const TEMPLATES: Template[] = [
    {
        id: "discussions",
        name: "Discussions",
        description: "A place for community conversations and threads",
        icon: Users01,
        category: "Community",
        tags: ["community", "social", "conversation"],
        isFeatured: true,
        isPopular: true,
    },
    {
        id: "events",
        name: "Events",
        description: "Organize and manage community events",
        icon: Calendar,
        category: "Engagement",
        tags: ["events", "calendar", "meetups"],
        isFeatured: true,
        isPopular: true,
    },
    {
        id: "articles",
        name: "Articles",
        description: "Share long-form content and knowledge",
        icon: File01,
        category: "Content",
        tags: ["content", "blog", "articles"],
        isFeatured: true,
    },
    {
        id: "questions",
        name: "Questions & Answers",
        description: "Q&A forum for community support",
        icon: Users01,
        category: "Support",
        tags: ["support", "qa", "help"],
        isFeatured: true,
    },
    {
        id: "explore",
        name: "Explore",
        description: "A discovery hub for your community",
        icon: Globe01,
        category: "Navigation",
        tags: ["explore", "discover", "home"],
    },
    {
        id: "guidelines",
        name: "Guidelines",
        description: "Community rules and best practices",
        icon: File01,
        category: "Information",
        tags: ["rules", "guidelines", "docs"],
    },
    {
        id: "changelogs",
        name: "Changelogs",
        description: "Product updates and release notes",
        icon: File01,
        category: "Content",
        tags: ["updates", "changelog", "releases"],
    },
    {
        id: "jobs",
        name: "Jobs",
        description: "Job board for your community",
        icon: Users01,
        category: "Professional",
        tags: ["jobs", "careers", "hiring"],
    },
    {
        id: "wishlist",
        name: "Wishlist",
        description: "Feature requests and ideas",
        icon: Star01,
        category: "Feedback",
        tags: ["feedback", "ideas", "requests"],
    },
    {
        id: "podcast",
        name: "Podcast",
        description: "Share audio content and episodes",
        icon: File01,
        category: "Content",
        tags: ["audio", "podcast", "media"],
    },
    {
        id: "blank",
        name: "Blank",
        description: "Start from scratch with a blank space",
        icon: File01,
        category: "Custom",
        tags: ["custom", "blank", "empty"],
    },
];

const CATEGORIES = [
    "All",
    "Community",
    "Engagement", 
    "Content",
    "Support",
    "Navigation",
    "Information",
    "Professional",
    "Feedback",
    "Custom"
];

export const AddSpaceTemplateModal = ({ isOpen, onClose, onSelectTemplate }: AddSpaceTemplateModalProps) => {
    const theme = useResolvedTheme();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [showAllTemplates, setShowAllTemplates] = useState(false);
    const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);

    // Filter templates based on search and category
    const filteredTemplates = TEMPLATES.filter(template => {
        const matchesSearch = !searchQuery || 
            template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
        
        return matchesSearch && matchesCategory;
    });

    const featuredTemplates = filteredTemplates.filter(t => t.isFeatured).slice(0, 3);
    const blankTemplate = filteredTemplates.find(t => t.id === 'blank');
    const allTemplates = filteredTemplates.filter(t => t.id !== 'blank');
    const displayedTemplates = showAllTemplates ? allTemplates : allTemplates.slice(0, 6);

    const handleTemplateSelect = (template: Template) => {
        onSelectTemplate(template);
        onClose();
        // Reset state
        setSearchQuery("");
        setSelectedCategory("All");
        setShowAllTemplates(false);
    };

    const handleClose = () => {
        onClose();
        // Reset state
        setSearchQuery("");
        setSelectedCategory("All");
        setShowAllTemplates(false);
    };

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={handleClose}>
            <Modal>
                <Dialog>
                    <div className="w-full max-w-4xl bg-primary rounded-xl shadow-xl max-h-[85vh] flex flex-col">
                        {/* Modal Header */}
                        <div className="px-6 py-3 border-b border-secondary flex-shrink-0">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex-1">
                                    <h2 className="text-sm font-semibold text-primary">Choose a template</h2>
                                </div>
                                
                                {/* Search - Minimal in top right */}
                                <div className="flex items-center gap-2">
                                    <div className="w-48">
                                        <div className="relative">
                                            <SearchLg className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-quaternary pointer-events-none" />
                                            <input
                                                type="text"
                                                placeholder="Search..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full pl-8 pr-3 py-1.5 text-xs bg-secondary border border-secondary rounded-lg text-primary placeholder:text-quaternary focus:outline-none focus:ring-1 focus:ring-brand-solid focus:border-brand-solid transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleClose}
                                        className="p-1 rounded-md hover:bg-secondary transition-colors flex-shrink-0"
                                    >
                                        <X className="size-4 text-tertiary" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Category Tags - Compact */}
                        <div className="px-6 py-3 border-b border-secondary/50 flex-shrink-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                                <FilterFunnel01 className="size-3.5 text-quaternary flex-shrink-0" />
                                {CATEGORIES.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={cx(
                                            "px-2.5 py-1 rounded-md text-[11px] font-medium transition-all",
                                            selectedCategory === category
                                                ? "bg-brand-solid text-white shadow-sm"
                                                : "bg-secondary text-tertiary hover:bg-secondary_hover hover:text-secondary"
                                        )}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Modal Body - Scrollable */}
                        <div className="px-8 py-8 overflow-y-auto flex-1">
                            {/* Custom Section - Start from Scratch */}
                            {blankTemplate && selectedCategory === "All" && !searchQuery && (
                                <div className="mb-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-xs font-semibold text-tertiary/50 flex items-center gap-1.5">
                                            <File05 className="size-3 text-quaternary/80" />
                                            Start from Scratch
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {(() => {
                                            const template = blankTemplate;
                                            const Icon = template.icon;
                                            return (
                                                <button
                                                    key={template.id}
                                                    onClick={() => handleTemplateSelect(template)}
                                                    onMouseEnter={() => setHoveredTemplate(template.id)}
                                                    onMouseLeave={() => setHoveredTemplate(null)}
                                                    className="group relative flex flex-col rounded-lg border border-secondary bg-primary hover:border-brand-solid transition-colors duration-200 text-left overflow-hidden"
                                                >
                                                    {/* Preview Area - Image Cover Style */}
                                                    <div className="relative w-full aspect-[16/11] bg-secondary/30 border-b-1 border-secondary/50 overflow-hidden">
                                                        {/* Preview container - Full width, no padding */}
                                                        <div className="absolute inset-0">
                                                            <div 
                                                                className="absolute top-5 -left-16 origin-top-left w-full h-full"
                                                                style={{
                                                                    transform: 'scale(0.3)',
                                                                    width: '500%',
                                                                    height: '500%',
                                                                }}
                                                            >
                                                                <SpacePreviews previewType={template.name} theme={theme} />
                                                            </div>
                                                        </div>
                                                        
                                                        {/* Overlay gradient */}
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/8 via-transparent to-black/3 pointer-events-none" />
                                                    </div>
                                                    
                                                    {/* Content Area */}
                                                    <div className="p-3 flex-1 flex flex-col bg-primary">
                                                        <div className="flex items-center gap-1.5 mb-2">
                                                            <div className="flex-shrink-0 p-1 rounded-md bg-brand-solid/10 group-hover:bg-brand-solid/20 transition-colors">
                                                                <Icon className="size-3.5 text-brand-solid" />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <h4 className="font-semibold text-xs text-primary truncate">
                                                                    {template.name}
                                                                </h4>
                                                             
                                                            </div>
                                                        </div>
                                                        <p className="text-[10px] text-tertiary line-clamp-2 leading-relaxed">
                                                            {template.description}
                                                        </p>

                                                    </div>
                                                </button>
                                            );
                                        })()}
                                    </div>
                                </div>
                            )}
                            
                            {/* Featured Templates */}
                            {featuredTemplates.length > 0 && selectedCategory === "All" && !searchQuery && (
                                <div className="mb-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-xs font-semibold text-tertiary/50 flex items-center gap-1.5">
                                            <Star01 className="size-3 text-quaternary/80" />
                                            Featured Templates
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {featuredTemplates.map(template => {
                                            const Icon = template.icon;
                                            return (
                                                <button
                                                    key={template.id}
                                                    onClick={() => handleTemplateSelect(template)}
                                                    onMouseEnter={() => setHoveredTemplate(template.id)}
                                                    onMouseLeave={() => setHoveredTemplate(null)}
                                                    className="group relative flex flex-col rounded-lg border border-secondary bg-primary hover:border-brand-solid transition-colors duration-200 text-left overflow-hidden"
                                                >
                                                    {/* Preview Area - Image Cover Style */}
                                                    <div className="relative w-full aspect-[16/11] bg-secondary/30 border-b-1 border-secondary/50 overflow-hidden">
                                                        {/* Preview container - Full width, no padding */}
                                                        <div className="absolute inset-0">
                                                            <div 
                                                                className="absolute px-15 py-15 top-0 left-0 origin-top-left w-full h-full"
                                                                style={{
                                                                    transform: 'scale(0.25)',
                                                                    width: '500%',
                                                                    height: '500%',
                                                                }}
                                                            >
                                                                <SpacePreviews previewType={template.name} theme={theme} />
                                                            </div>
                                                        </div>
                                                        
                                                        {/* Overlay gradient for better badge visibility */}
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/8 via-transparent to-black/3 pointer-events-none" />
                                                        
                                                        {/* Badges overlay */}
                                                        <div className="absolute top-2 right-2 flex items-center gap-1.5 z-10">
                                                            {template.isPopular && (
                                                                <Badge size="sm" color="brand" className="shadow-lg backdrop-blur-sm">
                                                                    Popular
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Content Area */}
                                                    <div className="p-3 flex-1 flex flex-col bg-primary">
                                                        <div className="flex items-center gap-1.5 mb-2">
                                                            <div className="flex-shrink-0 p-1 rounded-md bg-brand-solid/10 group-hover:bg-brand-solid/20 transition-colors">
                                                                <Icon className="size-3.5 text-brand-solid" />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <h4 className="font-semibold text-xs text-primary truncate">
                                                                    {template.name}
                                                                </h4>
                                                             
                                                            </div>
                                                        </div>
                                                        <p className="text-[10px] text-tertiary line-clamp-2 leading-relaxed">
                                                                    {template.description}
                                                                </p>

                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* All Templates */}
                            <div>
                               <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-xs font-semibold text-tertiary/50 flex items-center gap-1.5">
                                            <Grid01 className="size-3 text-quaternary/80" />
                                            All Templates
                                        </h3>
                                    <span className="text-[10px] text-quaternary">
                                        {displayedTemplates.length} of {allTemplates.length}
                                    </span>
                                </div>

                                {displayedTemplates.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="w-12 h-12 rounded-full bg-secondary mx-auto mb-3 flex items-center justify-center">
                                            <SearchLg className="size-5 text-quaternary" />
                                        </div>
                                        <p className="text-sm text-secondary font-medium mb-1">No templates found</p>
                                        <p className="text-xs text-tertiary">Try adjusting your search or filters</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {displayedTemplates.map(template => {
                                                const Icon = template.icon;
                                                return (
                                                    <button
                                                        key={template.id}
                                                        onClick={() => handleTemplateSelect(template)}
                                                        onMouseEnter={() => setHoveredTemplate(template.id)}
                                                        onMouseLeave={() => setHoveredTemplate(null)}
                                                        className="group relative flex flex-col rounded-lg border border-secondary bg-primary hover:border-brand-solid transition-colors duration-200 text-left overflow-hidden"
                                                    >
                                                        {/* Preview Area - Image Cover Style */}
                                                        <div className="relative w-full aspect-[16/11] bg-secondary/30 border-b-1 border-secondary/50 overflow-hidden">
                                                            {/* Preview container - Full width, no padding */}
                                                            <div className="absolute inset-0">
                                                                <div 
                                                                    className="absolute px-15 py-15 top-0 left-0 origin-top-left w-full h-full"
                                                                    style={{
                                                                        transform: 'scale(0.25)',
                                                                        width: '500%',
                                                                        height: '500%',
                                                                    }}
                                                                >
                                                                    <SpacePreviews previewType={template.name} theme={theme} />
                                                                </div>
                                                            </div>
                                                            
                                                            {/* Overlay gradient */}
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/8 via-transparent to-black/3 pointer-events-none" />
                                                            
                                                            {/* Popular icon */}
                                                            {template.isPopular && (
                                                                <div className="absolute top-2 right-2 z-10">
                                                                    <div className="p-1 rounded-full bg-brand-solid/90 backdrop-blur-sm shadow-md">
                                                                        <TrendUp01 className="size-3 text-white" />
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                        
                                                        {/* Content Area */}
                                                        <div className="p-3 flex-1 flex flex-col bg-primary">
                                                            <div className="flex items-center gap-1.5 mb-2">
                                                                <div className="flex-shrink-0 p-1 rounded-md bg-brand-solid/10 group-hover:bg-brand-solid/20 transition-colors">
                                                                    <Icon className="size-3.5 text-brand-solid" />
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <h4 className="font-semibold text-xs text-primary truncate">
                                                                        {template.name}
                                                                    </h4>
                                                                 
                                                                </div>
                                                            </div>
                                                            <p className="text-[10px] text-tertiary line-clamp-2 leading-relaxed">
                                                                {template.description}
                                                            </p>

                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {/* View More Button */}
                                        {!showAllTemplates && allTemplates.length > 6 && (
                                            <div className="mt-4 text-center">
                                                <button
                                                    onClick={() => setShowAllTemplates(true)}
                                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-brand-solid hover:bg-brand-solid/10 transition-colors"
                                                >
                                                    View all {allTemplates.length} templates
                                                    <ChevronRight className="size-4" />
                                                </button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex items-center justify-between px-6 py-4 border-t border-secondary flex-shrink-0">
                            <p className="text-xs text-tertiary">
                                Need help choosing? <button className="text-brand-solid hover:underline">View guide</button>
                            </p>
                            <button
                                onClick={handleClose}
                                className="text-sm text-secondary hover:text-primary transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};

export default AddSpaceTemplateModal;

