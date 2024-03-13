import styles from "./Input.module.scss";
import { ChangeEvent, forwardRef, useEffect } from "react";
import { clsx } from "clsx";
import { CSSProperties, ReactNode, useState } from "react";
import { InputSize, InputType } from "src/ui/components/Input/Input.types.ts";

interface InputProps {
    placeholder: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    types?: InputType;
    size?: InputSize;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    counterValue?: number;
    className?: string;
    style?: CSSProperties | undefined;
    value: string;
    error?: boolean;
    formName?: string;
    formText?: string;
    isFocused?: boolean;
    onFocus?: () => void;
    onBlur?: () => void;
    disabled?: boolean;
    autoFocus?: boolean;
    number?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const {
        placeholder,
        onChange,
        size = "medium",
        startIcon,
        endIcon,
        className,
        formName = "",
        value,
        types = "text",
        error = false,
        formText = "",
        isFocused: propIsFocused,
        onFocus: propOnFocus,
        onBlur: propOnBlur,
        disabled,
        style,
        autoFocus,
        number
    }: InputProps = props;

    const inputClassName = clsx(
        styles.inputContainer,
        styles[size],
        { [styles.disabled]: disabled },
        className,
    );
    const [isInputFocused, setIsInputFocused] = useState(false);

    const handleInputFocus = (): void => {
        setIsInputFocused(true);
        propOnFocus && propOnFocus();
    };
    const handleInputBlur = (): void => {
        setIsInputFocused(false);
        propOnBlur && propOnBlur();
    };
    useEffect(() => {
        if (propIsFocused !== undefined) {
            setIsInputFocused(propIsFocused);
        }
    }, [propIsFocused]);

    return (
        <div>
            {formName && (
                <div className={clsx(styles.formName, { [styles.error]: error })}>{formName}</div>
            )}
            <div className={inputClassName} style={{ ...style }} ref={ref}>
                <div
                    className={clsx(styles.inputBorder, {
                        [styles.active]: isInputFocused,
                        [styles.error]: error,
                        [styles.disabled]: disabled,
                    })}
                />
                <div className={clsx(styles.inputContent, styles[size])}>
                    {startIcon && (
                        <div
                            className={clsx(styles.icon, styles.iconBlock, styles[size], {
                                [styles.focus]: isInputFocused || value,
                            })}
                        >
                            {startIcon}
                        </div>
                    )}

                    <input
                        type={number ? "number" : types}
                        value={value}
                        className={clsx(styles.input, styles[size], {
                            [styles.focus]: isInputFocused,
                            [styles.disabled]: disabled,
                            [styles.password]: types === "password" && value.length > 0,
                        })}
                        onChange={onChange}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        placeholder={placeholder}
                        disabled={disabled}
                        autoFocus={autoFocus}
                    />

                    {endIcon && (
                        <div className={clsx(styles.iconBlock, styles[size])}>{endIcon}</div>
                    )}
                </div>
            </div>
            {formText && (
                <div className={clsx(styles.formText, { [styles.error]: error })}>{formText}</div>
            )}
        </div>
    );
});
Input.displayName = 'Input'