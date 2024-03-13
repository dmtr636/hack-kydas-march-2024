import React, { ChangeEvent, useState } from "react";
import { Input } from "../Input/Input";
import { IconPassword, IconShowPass, IconDontShowPass } from "src/ui/assets/icons";
import { ButtonIcon } from "../ButtonIcon/ButtonIcon";
import { InputSize } from "../Input/Input.types";
export const PasswordInput = ({
    value,
    onChange,
    disabled,
    error,
    size = "large",
}: {
    value: string;
    onChange: (pass: string) => void;
    disabled?: boolean;
    error?: boolean;
    size?: InputSize;
}) => {
    const [showPass, setShowPass] = React.useState(false);
    const [isInputFocused, setIsInputFocused] = useState(false);

    const handleInputFocus = (): void => {
        setIsInputFocused(true);
    };
    const handleInputBlur = (): void => {
        setIsInputFocused(false);
    };
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        onChange(event.target.value);
    };
    return (
        <>
            <Input
                placeholder="Введите пароль"
                size={size}
                types={showPass ? "text" : "password"}
                value={value}
                onChange={handleInputChange}
                formName="Пароль"
                startIcon={<IconPassword />}
                error={error}
                disabled={disabled}
                isFocused={isInputFocused}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                endIcon={
                    showPass ? (
                        <ButtonIcon
                            size={size}
                            disabled={disabled}
                            type="tertiary"
                            color="neutral"
                            pale={true}

                            /* focused={isInputFocused} */ onClick={() => setShowPass(!showPass)}
                        >
                            < IconShowPass/>
                        </ButtonIcon>
                    ) : (
                        <ButtonIcon
                            pale={true}
                            size={size}
                            disabled={disabled}
                            type="tertiary"
                            /* focused={isInputFocused} */ color="neutral"
                            onClick={() => setShowPass(!showPass)}
                        >
                            <IconDontShowPass />
                        </ButtonIcon>
                    )
                }
            />
        </>
    );
};
