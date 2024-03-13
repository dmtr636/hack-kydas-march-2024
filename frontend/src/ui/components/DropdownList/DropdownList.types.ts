export type DropdownListOptionValue = string | number | object | null;

export interface DropdownListOption {
    name: string;
    value?: DropdownListOptionValue;
    onClick?: () => void;
}

export type DropdownListOptions = DropdownListOption[] | DropdownListOption[][];

export type DropdownListColor = "accent" | "neutral";
