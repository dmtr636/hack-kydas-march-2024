import styles from "./SidebarMenuItem.module.scss";
import { SidebarChildRoute, SidebarRoute } from "src/ui/components/Sidebar/Sidebar.types.ts";
import { Button } from "src/ui/components/Button/Button.tsx";
import { IconArrowRight } from "src/ui/assets/icons";
import { useRef } from "react";
import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";

interface SidebarMenuItemProps {
    route: SidebarRoute;
    collapsed: boolean;
    showSubmenu: boolean;
    setShowSubmenu: (show: boolean) => void;
}

const SUBMENU_CLOSE_DELAY_MS = 500;
const SUBMENU_OPEN_DELAY_MS = 200;

export const SidebarMenuItem = (props: SidebarMenuItemProps) => {
    const { route, collapsed, showSubmenu, setShowSubmenu }: SidebarMenuItemProps = props;
    const ref = useRef<HTMLButtonElement>(null);
    const closeTimeoutRef = useRef<NodeJS.Timeout>();
    const openTimeoutRef = useRef<NodeJS.Timeout>();

    const hasSubmenu = !!props.route.children?.length;

    const handleMenuItemClick = (e: React.MouseEvent) => {
        if (hasSubmenu) {
            e.preventDefault();
        }
        route.onClick?.();
    };

    const handleMenuItemMouseEnter = () => {
        if (hasSubmenu) {
            clearTimeout(closeTimeoutRef.current);
            openTimeoutRef.current = setTimeout(() => {
                setShowSubmenu(true);
            }, SUBMENU_OPEN_DELAY_MS);
        } else {
            setShowSubmenu(false);
        }
    };

    const handleSubmenuMouseEnter = () => {
        clearTimeout(closeTimeoutRef.current);
    };

    const handleMenuItemMouseLeave = () => {
        if (hasSubmenu) {
            clearTimeout(openTimeoutRef.current);
            closeTimeoutRef.current = setTimeout(() => {
                setShowSubmenu(false);
            }, SUBMENU_CLOSE_DELAY_MS);
        }
    };

    const handleSubmenuMouseLeave = () => {
        setShowSubmenu(false);
    };

    const handleSubmenuMouseClick = (route: SidebarChildRoute) => {
        route.onClick?.();
    };

    const renderSubmenu = () => {
        if (!route.children?.length || !showSubmenu || !ref.current) {
            return;
        }
        const menuItemRect = ref.current.getBoundingClientRect();
        const style = {
            top: menuItemRect.y,
            left: menuItemRect.x + menuItemRect.width,
        };
        return createPortal(
            <div
                className={styles.submenu}
                style={style}
                onMouseEnter={handleSubmenuMouseEnter}
                onMouseLeave={handleSubmenuMouseLeave}
            >
                {route.children.map(renderSubmenuItem)}
            </div>,
            document.body,
        );
    };

    const renderSubmenuItem = (route: SidebarChildRoute) => (
        <NavLink to={route.path}>
            {({ isActive }) => (
                <Button
                    onClick={() => handleSubmenuMouseClick(route)}
                    type={"tertiary"}
                    color={"contrast"}
                    align={"start"}
                    className={styles.menuItem}
                    focused={isActive}
                    key={route.path}
                    fullWidth={true}
                >
                    {route.name}
                </Button>
            )}
        </NavLink>
    );

    const renderMenuItem = () => (
        <NavLink to={route.path}>
            {({ isActive }) => (
                <Button
                    onClick={handleMenuItemClick}
                    onMouseEnter={handleMenuItemMouseEnter}
                    onMouseLeave={handleMenuItemMouseLeave}
                    startIcon={route.icon}
                    endIcon={!collapsed && route.children && <IconArrowRight />}
                    counterValue={!collapsed ? route.counterValue : undefined}
                    type={"tertiary"}
                    color={"contrast"}
                    align={"start"}
                    className={styles.menuItem}
                    ref={ref}
                    focused={isActive}
                    key={route.path}
                    fullWidth={true}
                >
                    {!collapsed && route.name}
                </Button>
            )}
        </NavLink>
    );

    return (
        <>
            {renderMenuItem()}
            {renderSubmenu()}
        </>
    );
};
