import styles from "./AdminPageLayout.module.scss";
import { Header } from "src/ui/components/Header/Header.tsx";
import { ReactNode } from "react";
import { Avatar } from "src/ui/components/Avatar/Avatar.tsx";
import { useNavigate } from "react-router-dom";
import { store } from "src/app/stores/AppStore.ts";

interface AdminPageLayoutProps {
    title: string;
    titleChip?: ReactNode;
    children: ReactNode;
    actions?: ReactNode[];
    onBack?: () => void;
    sticky?: boolean;
}

export const AdminPageLayout = (props: AdminPageLayoutProps) => {
    const { title, children, actions, titleChip, onBack, sticky = true }: AdminPageLayoutProps = props;
    const navigate = useNavigate();

    const logout = () => {
        navigate("/auth/login");
        store.user.logout();
    };

    const renderAvatar = () => (
        <Avatar
            menuItems={[
                {
                    name: "Выйти",
                    onClick: logout,
                },
            ]}
        />
    );

    return (
        <div className={styles.layout}>
            <Header
                title={title}
                titleChip={titleChip}
                avatar={renderAvatar()}
                actions={actions}
                onBack={onBack}
                sticky={sticky}
            />
            <div className={styles.content}>{children}</div>
        </div>
    );
};
