import type { HTMLAttributes } from "react";
import { cx } from "@/utils/cx";
import { useResolvedTheme } from "@/hooks/use-resolved-theme";

export const NexusLogo = (props: HTMLAttributes<HTMLImageElement>) => {
    const theme = useResolvedTheme();
    const logoSrc = theme === 'dark' ? '/nexus-logo-w.svg' : '/nexus.svg';
    
    return (
        <img 
            src={logoSrc}
            alt="Nexus"
            className={cx("h-10 w-auto object-contain", props.className)}
            {...props}
        />
    );
};
