// Internal decorators for Storybook stories
import React from "react";

export const withOverlayAware = (storyFn: (Story: any, context: any) => React.ReactElement) => {
    return storyFn;
}; 