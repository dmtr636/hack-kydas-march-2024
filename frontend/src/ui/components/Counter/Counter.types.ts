import { ButtonType, ButtonColor, ButtonSize } from "src/ui/components/Button/Button.types.ts";

export type CounterType = Exclude<ButtonType, "tertiary">;
export type CounterColor = ButtonColor;
export type CounterSize = ButtonSize;
