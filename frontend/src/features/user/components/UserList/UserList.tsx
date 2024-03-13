import styles from "./UserList.module.scss";
import { observer } from "mobx-react-lite";
import { UserCard } from "src/ui/components/UserCard/UserCard.tsx";
import { store } from "src/app/stores/AppStore.ts";

export const UserList = observer(() => {
    return (
        <div className={styles.grid}>
            {store.user.filteredUsers.map((user) => (
                <UserCard email={user.email} role={user.role} key={user.id} />
            ))}
        </div>
    );
});
