import styles from "./Header.module.scss";
import { Fragment, ReactNode } from "react";
import { ButtonIcon } from "src/ui/components/ButtonIcon/ButtonIcon.tsx";
import { IconBack } from "src/ui/assets/icons";

export interface HeaderProps {
    title: string;
    titleChip?: ReactNode;
    notification?: ReactNode;
    avatar?: ReactNode;
    actions?: ReactNode[];
    onBack?: () => void;
}

export const Header = (props: HeaderProps) => {
    const { title, notification, avatar, actions, titleChip, onBack }: HeaderProps = props;

    return (
        <>
            <div className={styles.header}>
                <div className={styles.titleRow}>
                    <div className={styles.title}>
                        {onBack && (
                            <ButtonIcon className={styles.backButton} color={"neutral"} onClick={onBack}>
                                <IconBack />
                            </ButtonIcon>
                        )}
                        {title}
                        {titleChip}
                    </div>
                    <div className={styles.titleRowActions}>
                        {notification}
                        {avatar}
                    </div>
                </div>
            </div>
            <div className={styles.headerSecond}>
                {!!actions?.length && (
                    <div className={styles.actionsRow}>
                        {actions?.map((action, index) => <Fragment key={index}>{action}</Fragment>)}
                    </div>
                )}
            </div>
        </>

    );
};
