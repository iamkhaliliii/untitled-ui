import { useState } from "react";
import { ChevronDown, Settings01, ChevronRight, Plus, DotsHorizontal, Move } from "@untitledui/icons";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Select } from "@/components/base/select/select";
import { Toggle } from "@/components/base/toggle/toggle";
import { FileUpload } from "@/components/application/file-upload/file-upload-base";
import { cx } from "@/utils/cx";

interface CmsEventsSettingsProps {
    formToggles?: any;
    setFormToggles?: any;
}

interface DisclosureState {
    general: boolean;
    interactions: boolean;
    fields: boolean;
}

export const CmsEventsSettings = ({ formToggles, setFormToggles }: CmsEventsSettingsProps) => {
    const [disclosureStates, setDisclosureStates] = useState<DisclosureState>({
        general: true,
        interactions: true,
        fields: true,
    });

    // Interactions state
    const [replyType, setReplyType] = useState<string>("comment");
    const [reactionType, setReactionType] = useState<string>("custom");
    const [singleChoiceOnly, setSingleChoiceOnly] = useState<boolean>(true);
    const [reactions, setReactions] = useState([
        { id: '1', emoji: '👍', name: 'Like' },
        { id: '2', emoji: '❤️', name: 'Love' },
        { id: '3', emoji: '🎉', name: 'Celebrate' },
    ]);

    const toggleDisclosure = (key: keyof DisclosureState) => {
        setDisclosureStates(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    return (
        <div className="space-y-2 p-4 pb-6">
            {/* Divider */}
            <div className="h-px bg-line-subdued"></div>
            
            {/* General Section */}
            <div className="space-y-1 -mx-2">
                <button
                    className="text-secondary bg-primary group w-full flex items-center text-start rounded-lg focus:outline-none focus-visible:ring ring-inset ring-offset-0 font-medium py-2 px-2 text-sm hover:bg-primary_hover hover:text-secondary_hover justify-start"
                    onClick={() => toggleDisclosure('general')}
                    aria-expanded={disclosureStates.general}
                >
                    <span className="flex-grow truncate">General</span>
                    <ChevronDown 
                        className={cx(
                            "h-5 w-5 transform transition-all ease-in-out duration-150 flex-shrink-0 ms-2 shrink-0 text-tertiary",
                            disclosureStates.general ? "-rotate-180 rtl:rotate-180" : ""
                        )}
                    />
                </button>
                
                {disclosureStates.general && (
                    <div className="opacity-100">
                        <div className="w-full py-2 px-2">
                            <div className="space-y-4">
                                {/* Name Field */}
                                <Input
                                    label="Name"
                                    placeholder="e.g. Discussion"
                                />
                                
                                {/* Icon Field */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-secondary">
                                        Icon
                                    </label>
                                    <FileUpload.DropZone
                                        accept="image/*"
                                        allowsMultiple={false}
                                        hint="Click to select an icon, upload an image, or drag and drop it here."
                                        className="min-h-[128px]"
                                        onDropFiles={(files) => {
                                            console.log("Files dropped:", files);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Divider */}
            <div className="h-px bg-line-subdued"></div>
            
            {/* Interactions Section */}
            <div className="space-y-1 -mx-2">
                <button
                    className="text-secondary bg-primary group w-full flex items-center text-start rounded-lg focus:outline-none focus-visible:ring ring-inset ring-offset-0 font-medium py-2 px-2 text-sm hover:bg-primary_hover hover:text-secondary_hover justify-start"
                    onClick={() => toggleDisclosure('interactions')}
                    aria-expanded={disclosureStates.interactions}
                >
                    <span className="flex-grow truncate">Interactions</span>
                    <ChevronDown 
                        className={cx(
                            "h-5 w-5 transform transition-all ease-in-out duration-150 flex-shrink-0 ms-2 shrink-0 text-tertiary",
                            disclosureStates.interactions ? "-rotate-180 rtl:rotate-180" : ""
                        )}
                    />
                </button>
                
                {disclosureStates.interactions && (
                    <div className="opacity-100">
                        <div className="w-full py-2 px-2">
                            <div className="space-y-4">
                                {/* Reply Type */}
                                <div>
                                    <Select
                                        label="Reply type"
                                        placeholder="Select reply type"
                                        selectedKey={replyType}
                                        onSelectionChange={(selected) => setReplyType(String(selected))}
                                        items={[
                                            { label: "Comment", id: "comment" },
                                            { label: "Reply", id: "reply" },
                                            { label: "Discussion", id: "discussion" }
                                        ]}
                                    >
                                        {(item) => (
                                            <Select.Item id={item.id}>
                                                {item.label}
                                            </Select.Item>
                                        )}
                                    </Select>
                                </div>

                                {/* Reaction Type */}
                                <div>
                                    <Select
                                        label="Reaction type"
                                        placeholder="Select reaction type"
                                        selectedKey={reactionType}
                                        onSelectionChange={(selected) => setReactionType(String(selected))}
                                        items={[
                                            { label: "Custom reactions", id: "custom" },
                                            { label: "Simple like", id: "like" },
                                            { label: "Upvote/Downvote", id: "vote" }
                                        ]}
                                    >
                                        {(item) => (
                                            <Select.Item id={item.id}>
                                                {item.label}
                                            </Select.Item>
                                        )}
                                    </Select>
                                </div>

                                {/* Single Choice Only Toggle */}
                                <div>
                                    <Toggle
                                        label="Single choice only"
                                        hint="Limit users to select only one reaction from available reactions per post"
                                        size="sm"
                                        isSelected={singleChoiceOnly}
                                        onChange={setSingleChoiceOnly}
                                    />
                                </div>

                                {/* Reactions List */}
                                {reactionType === 'custom' && (
                                    <div className="space-y-2">
                                        <ul className="flex flex-col space-y-2">
                                            {reactions.map((reaction) => (
                                                <li key={reaction.id}>
                                                    <div className="flex items-center space-x-2 border border-secondary rounded-lg p-1 bg-primary hover:bg-primary_hover">
                                                        <ButtonUtility
                                                            icon={Move}
                                                            size="sm"
                                                            color="tertiary"
                                                            tooltip="Drag to reorder"
                                                            className="cursor-grab"
                                                        />
                                                        <div className="flex-1 flex items-center gap-x-2 text-secondary truncate cursor-pointer">
                                                            <div className="flex items-center justify-center shrink-0 h-5 w-5">
                                                                <span className="text-lg">
                                                                    {reaction.emoji}
                                                                </span>
                                                            </div>
                                                            <span>{reaction.name}</span>
                                                        </div>
                                                        <ButtonUtility
                                                            icon={DotsHorizontal}
                                                            size="sm"
                                                            color="tertiary"
                                                            tooltip="More options"
                                                        />
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Add Reaction Button */}
                                        <Button
                                            color="secondary"
                                            iconLeading={Plus}
                                            className="w-full mt-2"
                                            onClick={() => {
                                                const newReaction = {
                                                    id: String(reactions.length + 1),
                                                    emoji: '😊',
                                                    name: 'New Reaction'
                                                };
                                                setReactions([...reactions, newReaction]);
                                            }}
                                        >
                                            Add reaction
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Divider */}
            <div className="h-px bg-line-subdued"></div>
            
            {/* Fields Section */}
            <div className="space-y-1 -mx-2">
                <button
                    className="text-secondary bg-primary group w-full flex items-center text-start rounded-lg focus:outline-none focus-visible:ring ring-inset ring-offset-0 font-medium py-2 px-2 text-sm hover:bg-primary_hover hover:text-secondary_hover justify-start"
                    onClick={() => toggleDisclosure('fields')}
                    aria-expanded={disclosureStates.fields}
                >
                    <span className="flex-grow truncate">Fields</span>
                    <ChevronDown 
                        className={cx(
                            "h-5 w-5 transform transition-all ease-in-out duration-150 flex-shrink-0 ms-2 shrink-0 text-tertiary",
                            disclosureStates.fields ? "-rotate-180 rtl:rotate-180" : ""
                        )}
                    />
                </button>
                
                {disclosureStates.fields && (
                    <div className="opacity-100">
                        <div className="w-full py-2 px-2">
                            <div className="space-y-4">
                                {/* Manage model fields button */}
                                <Button
                                    color="tertiary"
                                    iconLeading={Settings01}
                                    iconTrailing={ChevronRight}
                                    className="w-full h-11 border border-secondary rounded-lg bg-primary hover:bg-primary_hover justify-start text-secondary"
                                    onClick={() => {
                                        console.log("Manage model fields clicked");
                                    }}
                                >
                                    Manage model fields
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
