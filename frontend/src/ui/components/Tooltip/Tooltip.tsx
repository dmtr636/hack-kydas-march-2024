import styles from "./Tooltip.module.scss";
import { PopoverBase, PopoverBaseProps } from "src/ui/components/PopoverBase/PopoverBase.tsx";
import { clsx } from "clsx";

interface TooltipProps extends Omit<PopoverBaseProps, "triggerEvent" | "content"> {
    header?: string;
    text?: string;
}

export const Tooltip = (props: TooltipProps) => {
    const { header, text, color = "accent" }: TooltipProps = props;
    const contentClassName = clsx(styles.content, styles[color]);

    return (
        <PopoverBase
            {...props}
            triggerEvent={"hover"}
            content={
                <div className={contentClassName}>
                    {header && <div className={styles.header}>{header}</div>}
                    {text && <div className={styles.text}>{text}</div>}
                </div>
            }
        >
            {props.children}
        </PopoverBase>
    );
};
