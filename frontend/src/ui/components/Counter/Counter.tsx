import styles from "./Counter.module.scss";
import { clsx } from "clsx";
import { CounterColor, CounterSize, CounterType } from "src/ui/components/Counter/Counter.types.ts";

interface CounterProps {
    value: number;
    type?: CounterType;
    color?: CounterColor;
    size?: CounterSize;
    className?: string;
}

const COUNTER_MAX_VALUE = 999;

export const Counter = ({
    value,
    type = "primary",
    color = "accent",
    size = "medium",
    className,
}: CounterProps) => {
    const counterClassName = clsx(
        styles.counter,
        styles[type],
        styles[color],
        styles[size],
        {[styles.bigValue]: value > 99},
        className,
    );

    return <div className={counterClassName}>{value > 999 && "+"}{Math.min(value, COUNTER_MAX_VALUE)}</div>;
};
