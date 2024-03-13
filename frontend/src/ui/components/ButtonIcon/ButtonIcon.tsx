import { Button, ButtonProps } from "src/ui/components/Button/Button.tsx";
import { forwardRef } from "react";

type ButtonIconProps = Omit<ButtonProps, "startIcon" | "endIcon" | "counterValue">;

export const ButtonIcon = forwardRef<HTMLButtonElement, ButtonIconProps>((props, ref) => {
    const { type = "tertiary" }: ButtonIconProps = props;
    return (
        <Button {...props} type={type} ref={ref}>
            {props.children}
        </Button>
    );
});

ButtonIcon.displayName = "ButtonIcon";
