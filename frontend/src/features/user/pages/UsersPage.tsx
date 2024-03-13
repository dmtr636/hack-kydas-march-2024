import { observer } from "mobx-react-lite";
import { AdminPageLayout } from "src/features/layout/components/AdminPageLayout/AdminPageLayout.tsx";
import { Card } from "src/ui/components/Card/Card.tsx";
import { useEffect } from "react";
import { UserList } from "src/features/user/components/UserList/UserList.tsx";
import { UserSearch } from "src/features/user/components/UserSearch/UserSearch.tsx";
import { store } from "src/app/stores/AppStore.ts";

export const UsersPage = observer(() => {
    useEffect(() => {
        store.user.fetchUsers();
    }, []);

    return (
        <AdminPageLayout title={"Доступы"}>
            <Card>
                <UserSearch />
            </Card>
            <Card title={"Пользователи"}>
                <UserList />
            </Card>
        </AdminPageLayout>
    );
});
