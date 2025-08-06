export type NavItemType = {
    label: string;
    href?: string;
    icon?: any;
    badge?: any;
    items?: NavItemType[];
    divider?: boolean;
};

export type NavItemDividerType = Omit<NavItemType, "label" | "divider"> & {
    label?: string;
    divider: true;
};
