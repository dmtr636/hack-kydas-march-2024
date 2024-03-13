import styles from "./RadioButton.module.scss";
import { useContext } from "react";
import { IconRadioOff, IconRadioOn } from "src/ui/assets/icons";
import { clsx } from "clsx";
import { RadioGroupContext } from "src/ui/components/RadioGroup/RadioGroupContext.ts";
import { RadioButtonColor } from "src/ui/components/RadioButton/RadioButton.types.ts";

interface RadioButtonProps {
    value: string | any ;
    title?: string;
    subtitle?: string;
    disabled?: boolean;
    color?: RadioButtonColor;
}

export const RadioButton = (props: RadioButtonProps) => {
    const { value, title, subtitle, disabled, color = "neutral" }: RadioButtonProps = props;

    const context = useContext(RadioGroupContext);

    if (!context) {
        throw new Error("RadioGroupContext not found");
    }

    const checked = context.value === value;

    const getIcon = () => {
        if (checked) {
            return <IconRadioOn />;
        } else {
            return <IconRadioOff />;
        }
    };

    const handleClick = () => {
        context.onChange(value);
    };

    const radioButtonClassName = clsx(styles.radioButton, styles[color], {
        [styles.checked]: checked,
    });

    return (
        <button className={radioButtonClassName} onClick={handleClick} disabled={disabled}>
            {getIcon()}
            <div>
                {title && <div className={styles.title}>{title}</div>}
                {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
            </div>
        </button>
    );
};
