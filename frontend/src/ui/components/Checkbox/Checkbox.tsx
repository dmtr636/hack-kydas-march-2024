import styles from "./Checkbox.module.scss";
import { useEffect, useState } from "react";
import { IconCheckboxMinus, IconCheckboxOff, IconCheckboxOn } from "src/ui/assets/icons";
import { clsx } from "clsx";

interface CheckboxProps {
    onChange: (checked: boolean) => void;
    title?: string;
    subtitle?: string;
    checked?: boolean;
    intermediate?: boolean;
    disabled?: boolean;
    color?: "neutral" | "accent" | "positive";
    titleSmall?: boolean;
}

export const Checkbox = (props: CheckboxProps) => {
    const {
        onChange,
        title,
        subtitle,
        intermediate,
        disabled,
        color = "neutral",
        titleSmall
    }: CheckboxProps = props;

    const [checked, setChecked] = useState(props.checked ?? false);

    useEffect(() => {
        if (props.checked !== undefined) {
            setChecked(props.checked);
        }
    }, [props.checked]);

    const getCheckboxIcon = () => {
        if (checked) {
            if (intermediate) {
                return <IconCheckboxMinus />;
            }
            return <IconCheckboxOn />;
        } else {
            return <IconCheckboxOff />;
        }
    };

    const handleClick = () => {
        const newState = !checked;
        onChange(newState);
        setChecked(newState);
    };

    const checkboxClassName = clsx(styles.checkbox, styles[color], {
        [styles.checked]: checked,
    });

    return (
        <button className={checkboxClassName} onClick={handleClick} disabled={disabled}>
            {getCheckboxIcon()}
            <div>
                <div className={clsx(styles.title, {[styles.small]: titleSmall})}>{title}</div>
                {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
            </div>
        </button>
    );
};
