import { SidebarRoute } from "src/ui/components/Sidebar/Sidebar.types.ts";
import { IconJournal, IconMatrix, IconStatistics, IconUser } from "src/ui/assets/icons";

export const getSidebarRoutes = (): SidebarRoute[] => [
    {
        path: "/",
        name: "Ценовые матрицы",
        icon: <IconMatrix />,
    },
    {
        path: "/statistics",
        name: "Статистика",
        icon: <IconStatistics />,
    },
    {
        path: "/logs",
        name: "Журнал изменений",
        icon: <IconJournal />,
    },
    {
        path: "/users",
        name: "Доступы",
        icon: <IconUser />,
    },
];
