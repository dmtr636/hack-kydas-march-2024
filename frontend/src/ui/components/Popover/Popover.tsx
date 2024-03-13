import { ReactNode } from "react";
import styles from "./Popover.module.scss";
import { clsx } from "clsx";
import { PopoverBase, PopoverBaseProps } from "src/ui/components/PopoverBase/PopoverBase.tsx";

interface PopoverProps extends Omit<PopoverBaseProps, "triggerEvent" | "content"> {
    header?: string;
    text?: string |any;
    footer?: ReactNode;
}

const POPOVER_MAX_WIDTH = 304;

export const Popover = (props: PopoverProps) => {
    const {
        header,
        text,
        footer,
        color = "accent",
        maxWidth = POPOVER_MAX_WIDTH,
    }: PopoverProps = props;
    const contentClassName = clsx(styles.content, styles[color]);
    return (
        <PopoverBase
            {...props}
            triggerEvent={"click"}
            maxWidth={maxWidth}
            content={
                <div className={contentClassName}>
                    {header && <div className={styles.header}>{header}</div>}
                    {text && <div className={styles.text}>{text}</div>}
                    {footer && <div className={styles.footer}>{footer}</div>}
                </div>
            }
        >
            {props.children}
        </PopoverBase>
    );
};
