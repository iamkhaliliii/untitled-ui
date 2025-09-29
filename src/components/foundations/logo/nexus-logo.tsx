import type { ImgHTMLAttributes } from "react";
import { cx } from "@/utils/cx";

export const NexusLogo = (props: ImgHTMLAttributes<HTMLImageElement>) => {
    return (
        <img 
            src="/nexus.svg" 
            alt="Nexus"
            className={cx("h-10 w-auto object-contain", props.className)}
            {...props}
        />
    );
};
