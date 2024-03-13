import { observer } from "mobx-react-lite";
import { AdminPageLayout } from "src/features/layout/components/AdminPageLayout/AdminPageLayout.tsx";

export const HomePage = observer(() => {
    return (
        <AdminPageLayout title={"Главная"}>
            <div>123</div>
        </AdminPageLayout>
    );
});
