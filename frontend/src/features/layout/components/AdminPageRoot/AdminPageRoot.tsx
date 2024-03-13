import { Outlet } from "react-router-dom";
import styles from "./AdminPageRoot.module.scss";
import { Sidebar } from "src/ui/components/Sidebar/Sidebar";
import { IconLogoPlaceholder } from "src/ui/assets/icons";
import { getSidebarRoutes } from "src/features/layout/config/sidebarRoutes.tsx";

const AdminPageRoot = () => {
    return (
        <div className={styles.layout}>
            <Sidebar logo={<IconLogoPlaceholder />} routes={getSidebarRoutes()} />
            <Outlet />
        </div>
    );
};

export default AdminPageRoot;
