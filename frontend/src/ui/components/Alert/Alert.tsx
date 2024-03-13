import styles from "./Alert.module.scss";
import { ReactNode } from "react";
import { AlertMode } from "src/ui/components/Alert/Alert.types.ts";
import { clsx } from "clsx";

interface AlertProps {
    mode: AlertMode;
    title: string;
    subtitle?: string;
    icon?: ReactNode;
    actions?: ReactNode[];
}

export const Alert = (props: AlertProps) => {
    const { mode, title, subtitle, icon, actions }: AlertProps = props;

    const alertClassName = clsx(styles.alert, styles[mode]);

    const renderActions = () => {
        if (actions && actions.length) {
            return <div className={styles.actions}>{actions}</div>;
        }
    };

    return (
        <div className={alertClassName}>
            <div className={styles.content}>
                {icon}
                <div>
                    <div className={styles.title}>{title}</div>
                    {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
                </div>
            </div>
            {renderActions()}
        </div>
    );
};
