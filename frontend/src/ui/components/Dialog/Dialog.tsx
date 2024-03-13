import styles from "./Dialog.module.scss";
import { IconClose } from "src/ui/assets/icons";
import { ButtonIcon } from "src/ui/components/ButtonIcon/ButtonIcon.tsx";
import { clsx } from "clsx";
import { ReactNode } from "react";

interface DialogProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    actions: ReactNode[];
    title: string;
    titleColor?: "accent" | "positive" | "negative";
}

export const Dialog = (props: DialogProps) => {
    const { open, onClose, children, actions, title, titleColor = "accent" }: DialogProps = props;

    if (!open) {
        return null;
    }

    return (
        <div className={styles.background}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <div className={clsx(styles.title, styles[titleColor])}>{title}</div>
                    <ButtonIcon
                        className={styles.closeIcon}
                        onClick={onClose}
                        color={"neutral"}
                        size={"large"}
                    >
                        <IconClose />
                    </ButtonIcon>
                </div>
                <div className={styles.content}>{children}</div>
                <div className={styles.actions}>
                    {actions.map((action, index) => (
                        <div key={index}>{action}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};
