import styles from "./Sidebar.module.scss";
import { ReactNode, useState } from "react";
import { SidebarRoute } from "src/ui/components/Sidebar/Sidebar.types.ts";
import { ButtonIcon } from "src/ui/components/ButtonIcon/ButtonIcon.tsx";
import { IconCollapse } from "src/ui/assets/icons";
import { clsx } from "clsx";
import { SidebarMenuItem } from "src/ui/components/SidebarMenuItem/SidebarMenuItem.tsx";

interface SidebarProps {
    logo: ReactNode;
    routes: SidebarRoute[];
    footerRoutes?: SidebarRoute[];
    width?: number;
    widthCollapsed?: number;
}

const DEFAULT_SIDEBAR_WIDTH = 240;
const DEFAULT_COLLAPSED_SIDEBAR_WIDTH = 76;

export const Sidebar = (props: SidebarProps) => {
    const {
        logo,
        routes,
        footerRoutes,
        width = DEFAULT_SIDEBAR_WIDTH,
        widthCollapsed = DEFAULT_COLLAPSED_SIDEBAR_WIDTH,
    }: SidebarProps = props;
    const [collapsed, setCollapsed] = useState(false);
    const [showSubmenu, setShowSubmenu] = useState(false);

    const sidebarClassName = clsx(styles.sidebar, {
        [styles.collapsed]: collapsed,
    });
    const sidebarStyle = {
        width: collapsed ? `${widthCollapsed}px` : `${width}px`,
    };

    const renderRoutes = (routes: SidebarRoute[]) => {
        return routes.map((route) => (
            <SidebarMenuItem
                route={route}
                collapsed={collapsed}
                showSubmenu={showSubmenu}
                setShowSubmenu={setShowSubmenu}
                key={route.path}
            />
        ));
    };

    return (
        <div className={sidebarClassName} style={sidebarStyle}>
            <div className={styles.header}>
                {!collapsed && <div className={styles.logo}>{logo}</div>}
                <ButtonIcon
                    color={"contrast"}
                    onClick={() => setCollapsed(!collapsed)}
                    className={styles.collapseButton}
                >
                    <IconCollapse />
                </ButtonIcon>
            </div>
            <div className={styles.menu}>{renderRoutes(routes)}</div>
            {footerRoutes && footerRoutes.length && (
                <div className={styles.footer}>
                    <div className={styles.menu}>{renderRoutes(footerRoutes)}</div>
                </div>
            )}
        </div>
    );
};
