import styles from "./Button.module.scss";
import { clsx } from "clsx";
import { cloneElement, CSSProperties, forwardRef, isValidElement, ReactNode } from "react";
import { Counter } from "src/ui/components/Counter/Counter.tsx";
import { ButtonColor, ButtonSize, ButtonType } from "src/ui/components/Button/Button.types.ts";
import { CounterType } from "src/ui/components/Counter/Counter.types.ts";

export interface ButtonProps {
    children: ReactNode;
    onClick?: (event: React.MouseEvent) => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    type?: ButtonType;
    color?: ButtonColor;
    size?: ButtonSize;
    disabled?: boolean;
    pale?: boolean;
    focused?: boolean;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    counterValue?: number;
    className?: string;
    style?: CSSProperties;
    align?: "center" | "start";
    edge?: "top" | "right" | "bottom" | "left";
    fullWidth?: boolean;
    clickable?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const {
        children,
        onClick,
        onMouseEnter,
        onMouseLeave,
        type = "primary",
        color = "accent",
        size = "medium",
        disabled,
        pale,
        focused,
        startIcon,
        endIcon,
        counterValue,
        className,
        style,
        align = "center",
        edge,
        fullWidth,
        clickable = true
    }: ButtonProps = props;
    const isIconVariant = isValidElement<SVGElement>(children);

    const buttonStyle = {
        justifyContent: align,
        ...style,
    };

    const renderChildren = () => {
        if (isIconVariant) {
            return renderIcon(children);
        }
        return children;
    };

    const renderIcon = (icon?: ReactNode, className?: string) => {
        if (isValidElement<SVGElement>(icon)) {
            return cloneElement(icon, { className: clsx(styles.icon, className) });
        }
    };

    const renderCounter = () => {
        if (counterValue === undefined) {
            return null;
        }
        const counterTypes: Record<ButtonType, CounterType> = {
            primary: "secondary",
            secondary: "primary",
            tertiary: "primary",
            outlined: "outlined",
        };
        return (
            <Counter
                type={counterTypes[type]}
                color={color}
                size={size}
                value={counterValue}
                className={styles.endIcon}
            />
        );
    };

    const buttonClassName = clsx(
        styles.button,
        styles[type],
        styles[color],
        styles[size],
        { [styles.pale]: pale },
        { [styles.iconVariant]: isIconVariant },
        { [styles.focused]: focused },
        { [styles.edgeTop]: edge === "top" },
        { [styles.edgeRight]: edge === "right" },
        { [styles.edgeBottom]: edge === "bottom" },
        { [styles.edgeLeft]: edge === "left" },
        { [styles.fullWidth]: fullWidth },
        { [styles.clickable]: clickable},
        className,
    );
    return (
        <button
            ref={ref}
            className={buttonClassName}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            disabled={disabled}
            style={buttonStyle}
        >
            <div className={styles.overlayBackground} />
            {renderIcon(startIcon)}
            {renderChildren()}
            {renderIcon(endIcon, styles.endIcon)}
            {renderCounter()}
            <div className={styles.overlay} />
        </button>
    );
});

Button.displayName = "Button";
