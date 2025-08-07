import { TreeView, type TreeNode } from "@/components/ui/tree-view";
import { AdminLayout } from "@/components/layouts/admin-layout";
import { Button } from "@/components/base/buttons/button";
import { Plus, Upload03, Download01, SearchLg } from "@untitledui/icons";
import { Input } from "@/components/base/input/input";

// File tree data for Site section
const siteFileTree: TreeNode[] = [
    {
        id: "themes",
        label: "Themes",
        children: [
            {
                id: "active-theme",
                label: "Active Theme",
                children: [
                    { id: "style.css", label: "style.css" },
                    { id: "functions.php", label: "functions.php" },
                    { id: "index.php", label: "index.php" },
                    { id: "header.php", label: "header.php" },
                    { id: "footer.php", label: "footer.php" },
                ]
            },
            {
                id: "custom-themes",
                label: "Custom Themes",
                children: [
                    { id: "theme-1", label: "My Custom Theme" },
                    { id: "theme-2", label: "Business Theme" },
                ]
            }
        ]
    },
    {
        id: "plugins",
        label: "Plugins",
        children: [
            {
                id: "active-plugins",
                label: "Active Plugins",
                children: [
                    { id: "seo-plugin", label: "SEO Optimizer" },
                    { id: "cache-plugin", label: "Cache Manager" },
                    { id: "backup-plugin", label: "Backup Pro" },
                ]
            },
            {
                id: "inactive-plugins",
                label: "Inactive Plugins",
                children: [
                    { id: "contact-form", label: "Contact Form" },
                    { id: "gallery-plugin", label: "Photo Gallery" },
                ]
            }
        ]
    },
    {
        id: "media",
        label: "Media Library",
        children: [
            {
                id: "uploads",
                label: "Uploads",
                children: [
                    { id: "2024", label: "2024", children: [
                        { id: "01", label: "January" },
                        { id: "02", label: "February" },
                        { id: "03", label: "March" },
                    ]},
                    { id: "2023", label: "2023" },
                ]
            },
            {
                id: "documents",
                label: "Documents",
                children: [
                    { id: "manual.pdf", label: "User Manual.pdf" },
                    { id: "guide.pdf", label: "Installation Guide.pdf" },
                ]
            }
        ]
    },
    {
        id: "config",
        label: "Configuration",
        children: [
            { id: "database.php", label: "database.php" },
            { id: "mail.php", label: "mail.php" },
            { id: "cache.php", label: "cache.php" },
            { id: "session.php", label: "session.php" },
        ]
    },
    {
        id: "logs",
        label: "System Logs",
        children: [
            { id: "error.log", label: "error.log" },
            { id: "access.log", label: "access.log" },
            { id: "debug.log", label: "debug.log" },
        ]
    },
];

export const SiteFilesPage = () => {
    const headerActions = (
        <div className="flex items-center gap-2">
            <Button size="sm" color="secondary" iconLeading={Upload03}>
                Upload
            </Button>
            <Button size="sm" iconLeading={Plus}>
                New File
            </Button>
        </div>
    );

    return (
        <AdminLayout
            title="Site File Explorer"
            description="Browse and manage your site files and directories"
            currentPath="/admin/site/files"
            headerActions={headerActions}
        >
            <div className="p-6">
                <div className="mb-6">
                    <Input
                        placeholder="Search files and folders..."
                        className="max-w-md"
                        icon={SearchLg}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* File Tree */}
                    <div className="lg:col-span-2">
                        <div className="bg-primary border border-secondary rounded-xl p-4">
                            <h3 className="text-lg font-semibold text-primary mb-4">Directory Structure</h3>
                            <TreeView
                                data={siteFileTree}
                                defaultExpandedIds={["themes", "plugins", "media"]}
                                onNodeClick={(node) => console.log("File clicked:", node.label)}
                                className="border-none bg-transparent"
                                showLines={true}
                                showIcons={true}
                            />
                        </div>
                    </div>

                    {/* File Details Panel */}
                    <div className="lg:col-span-1">
                        <div className="bg-primary border border-secondary rounded-xl p-4">
                            <h3 className="text-lg font-semibold text-primary mb-4">File Details</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-tertiary">Name</p>
                                    <p className="text-sm font-medium text-primary">Select a file to view details</p>
                                </div>
                                <div>
                                    <p className="text-sm text-tertiary">Size</p>
                                    <p className="text-sm font-medium text-primary">-</p>
                                </div>
                                <div>
                                    <p className="text-sm text-tertiary">Modified</p>
                                    <p className="text-sm font-medium text-primary">-</p>
                                </div>
                                <div>
                                    <p className="text-sm text-tertiary">Type</p>
                                    <p className="text-sm font-medium text-primary">-</p>
                                </div>
                            </div>
                            
                            <div className="mt-6 space-y-2">
                                <Button size="sm" color="secondary" className="w-full" iconLeading={Download01}>
                                    Download
                                </Button>
                                <Button size="sm" color="tertiary" className="w-full">
                                    Edit
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}; 