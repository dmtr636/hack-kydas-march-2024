import React from "react";
import { ChangeEvent, useState } from "react";
import { IconEmail } from "src/ui/assets/icons";
import { Input } from "../Input/Input";
import { InputSize } from "../Input/Input.types";
export const EmailInput = ({
    value,
    onChange,
    disabled,
    error,
    size = "large",
}: {
    value: string;
    onChange: (email: string) => void;
    disabled?: boolean;
    error?: boolean;
    size?: InputSize;
}) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    /*     const [value, setValue] = React.useState("")
     */ const [emailIsValid, setEmailIsValid] = React.useState(true);
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        /*         setValue(event.target.value);
         */
        onChange(event.target.value);
        const isValid = emailRegex.test(event.target.value);
        setEmailIsValid(isValid);
    };
    const [isInputFocused, setIsInputFocused] = useState(false);

    const handleInputFocus = (): void => {
        setIsInputFocused(true);
    };
    const handleInputBlur = (): void => {
        setIsInputFocused(false);
    };
    const showError = !emailIsValid && !isInputFocused && !(value.trim() === "");
    return (
        <>
            <Input
                types="text"
                size={size}
                error={showError || error}
                onChange={handleInputChange}
                value={value}
                placeholder="Введите почту"
                formName="Почта"
                formText={showError ? "Нужна почта в формате example@email.com" : ""}
                isFocused={isInputFocused}
                startIcon={<IconEmail />}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                disabled={disabled}
            />
        </>
    );
};
