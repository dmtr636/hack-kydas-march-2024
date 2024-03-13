import { createContext } from "react";

export const RadioGroupContext = createContext<{
    value: string;
    onChange: (value: string) => void;
} | null>(null);
