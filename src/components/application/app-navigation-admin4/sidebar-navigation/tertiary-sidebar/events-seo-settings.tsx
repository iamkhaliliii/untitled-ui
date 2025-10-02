import { Upload01, EyeOff, Link01, Globe01 } from "@untitledui/icons";
import { Input } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
import { Toggle } from "@/components/base/toggle/toggle";
import { Button } from "@/components/base/buttons/button";
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
        <div className="p-4">
            <div className="space-y-6">
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
                    <div className="flex items-center justify-center w-full h-24 border-2 border-dashed border-secondary bg-secondary/20 rounded-lg">
                        <div className="text-center">
                            <Upload01 className="h-6 w-6 text-tertiary mx-auto mb-2" />
                            <button 
                                onClick={() => document.getElementById('og-image-upload')?.click()}
                                className="px-3 py-1.5 text-xs font-medium bg-secondary text-primary rounded-md hover:bg-secondary/80 transition-colors"
                            >
                                Upload Open Graph Image
                            </button>
                            <input
                                id="og-image-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleFileSelect}
                                className="sr-only"
                            />
                        </div>
                    </div>
                    <p className="text-xs text-tertiary">
                        Choose a banner image for SEO cards and social media previews (1200 x 630 px recommended).
                    </p>
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

                {/* Sitemap Section */}
                <div>
                    <h6 className="text-xs font-medium text-tertiary mb-1">Sitemap</h6>
                    <div className="first-letter:capitalize rounded-base text-sm text-tertiary">
                        <p>A sitemap lists all posts in the space to help search engines index your content. It's auto-generated unless indexing is disabled.</p>
                        <p>
                            <a 
                                className="cursor-pointer rounded-base transition duration-200 focus:outline-none focus-visible:ring text-blue-600 hover:text-blue-700 ring-blue-600 inline-flex gap-1 items-center"
                                rel="noopener noreferrer"
                                href="/hub/community/ask-for-help/sitemap.xml"
                                target="_blank"
                            >
                                View space sitemap.xml
                                <Link01 className="shrink-0 w-4 h-4" />
                            </a>
                        </p>
                    </div>
                </div>

                {/* Preview Section */}
                <div>
                    <h6 className="text-xs font-medium text-tertiary mb-1">Search Result Preview</h6>
                    <div className="text-base font-sans cursor-default">
                        <div className="text-lg truncate" style={{ color: 'rgb(26,13,171)' }}>
                            {seoSettings.metaTitle || "Bettermode Hub - Join thousands of community builders"}
                        </div>
                        <div className="text-sm" style={{ color: 'rgb(0,102,33)' }}>
                            https://bettermode.tribeplatform.com/
                        </div>
                        <div className="text-sm break-words mt-1 text-secondary">
                            {seoSettings.metaDescription || "Bettermode's hub is where community builders learn about community building and our platform, connect with community pros, and get access to events, resources, and more."}
                        </div>
                    </div>
                    
                    <h6 className="text-xs font-medium text-tertiary mt-3 mb-1">Open Graph Preview</h6>
                    <div className="border border-secondary rounded-lg bg-primary w-full cursor-default">
                        <div className="aspect-[1200/630] bg-cover bg-center rounded-t-lg" 
                             style={{
                                 backgroundImage: seoSettings.ogImage 
                                     ? `url(${URL.createObjectURL(seoSettings.ogImage)})` 
                                     : `url("https://tribe-s3-production.imgix.net/ZxIn93d0MzXeaEp9a5hb8?fit=max&w=1000&auto=compress,format")`
                             }}
                        />
                        <div className="p-4">
                            <h2 className="text-lg font-bold truncate text-primary">
                                {seoSettings.metaTitle || "Bettermode Hub - Join thousands of community builders"}
                            </h2>
                            <p className="text-sm mt-2 line-clamp-2 text-secondary">
                                {seoSettings.metaDescription || "Bettermode's hub is where community builders learn about community building and our platform, connect with community pros, and get access to events, resources, and more."}
                            </p>
                            <span className="text-xs text-tertiary mt-2 truncate block">
                                bettermode.tribeplatform.com
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}; 