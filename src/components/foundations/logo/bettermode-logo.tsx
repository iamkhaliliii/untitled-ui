import type { ImgHTMLAttributes } from "react";
import { cx } from "@/utils/cx";

export const BettermodeLogo = (props: ImgHTMLAttributes<HTMLImageElement>) => {
    return (
        <img 
            src="/logo-bettermode.svg" 
            alt="Bettermode"
            className={cx("h-10 w-auto object-contain", props.className)}
            {...props}
        />
    );
};
