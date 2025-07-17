import { Upload01, EyeOff } from "@untitledui/icons";
import { Input } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
import { Toggle } from "@/components/base/toggle/toggle";
import { useState } from "react";

interface EventsSeoSettingsProps {
    // Add any props if needed
}

export const EventsSeoSettings = ({}: EventsSeoSettingsProps) => {
    const [seoSettings, setSeoSettings] = useState({
        metaTitle: "",
        metaDescription: "",
        ogImage: null as File | null,
        hideFromSearchResults: false,
    });

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSeoSettings(prev => ({ ...prev, ogImage: file }));
        }
    };

    return (
        <div className="space-y-6 p-4">
            <div className="space-y-6 pb-6">
                {/* Meta Title */}
                <div>
                    <Input
                        label="Meta title"
                        placeholder="Add a meta title. If blank, the space name is used"
                        value={seoSettings.metaTitle}
                        onChange={(value) => setSeoSettings(prev => ({ ...prev, metaTitle: value }))}
                        hint="Keep your title concise and under 60 characters for best search engine visibility."
                    />
                </div>

                {/* Meta Description */}
                <div>
                    <TextArea
                        label="Meta description"
                        placeholder="Add a meta description. If blank, the space description is used by default"
                        rows={4}
                        value={seoSettings.metaDescription}
                        onChange={(e) => setSeoSettings(prev => ({ ...prev, metaDescription: e.target.value }))}
                        hint="Write a description of 155 - 160 characters to give search engines a clear summary of your content."
                    />
                </div>

                {/* Open Graph Image */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-secondary">Open Graph Image</label>
                    <div className="space-y-3">
                        {seoSettings.ogImage ? (
                            <div className="flex items-center gap-3">
                                <div className="flex h-16 w-24 items-center justify-center rounded-lg border border-secondary bg-secondary/20 overflow-hidden">
                                    <img
                                        src={URL.createObjectURL(seoSettings.ogImage)}
                                        alt="OG Preview"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-secondary">{seoSettings.ogImage.name}</p>
                                    <p className="text-xs text-tertiary">
                                        {Math.round(seoSettings.ogImage.size / 1024)} KB
                                    </p>
                                </div>
                                <button
                                    onClick={() => setSeoSettings(prev => ({ ...prev, ogImage: null }))}
                                    className="px-3 py-2 text-sm font-medium text-error hover:bg-error/10 rounded-lg transition-colors"
                                >
                                    Remove
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <div className="flex h-16 w-24 items-center justify-center rounded-lg border-2 border-dashed border-secondary bg-secondary/20">
                                    <Upload01 className="h-4 w-4 text-tertiary" />
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="og-image-upload">
                                        <input
                                            id="og-image-upload"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileSelect}
                                            className="sr-only"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => document.getElementById('og-image-upload')?.click()}
                                            className="flex-1 px-3 py-2 text-sm font-medium bg-secondary text-primary rounded-lg hover:bg-secondary/80 transition-colors"
                                        >
                                            Upload Image
                                        </button>
                                    </label>
                                </div>
                            </div>
                        )}
                        <p className="text-xs text-tertiary">
                            Choose a banner image for SEO cards and social media previews (1200 x 630 px recommended).
                        </p>
                    </div>
                </div>

                {/* Hide from Search Results */}
                <div>
                    <Toggle
                        label="Hide from search results"
                        hint="Enable this option to prevent search engines from indexing the space and its posts. This will also exclude the space from the sitemap."
                        size="sm"
                        slim
                        isSelected={seoSettings.hideFromSearchResults}
                        onChange={(value) => setSeoSettings(prev => ({ ...prev, hideFromSearchResults: value }))}
                    />
                </div>
            </div>
        </div>
    );
}; 