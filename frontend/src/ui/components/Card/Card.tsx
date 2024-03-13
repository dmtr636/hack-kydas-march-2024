import styles from "./Card.module.scss";
import { ReactNode } from "react";
import { clsx } from "clsx";

export interface CardProps {
    children: ReactNode;
    title?: ReactNode;
    helpIcon?: ReactNode;
    className?: string;
}

export const Card = (props: CardProps) => {
    const { children, title, helpIcon, className }: CardProps = props;
    return (
        <div className={clsx(styles.card, className)}>
            {title && (
                <div className={clsx(styles.header, styles.content)}>
                    <div className={styles.title}>
                        {title}
                        {helpIcon}
                    </div>
                </div>
            )}
            <div className={styles.content}>{children}</div>
        </div>
    );
};
