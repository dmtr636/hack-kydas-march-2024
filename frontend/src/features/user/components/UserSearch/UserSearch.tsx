import styles from "./UserSearch.module.scss";
import { observer } from "mobx-react-lite";
import { Input } from "src/ui/components/Input/Input.tsx";
import { IconSearch, IconSort } from "src/ui/assets/icons";
import { DropdownList } from "src/ui/components/DropdownList/DropdownList.tsx";
import { Button } from "src/ui/components/Button/Button.tsx";
import { store } from "src/app/stores/AppStore.ts";
import { sortOptions } from "src/features/user/constants/sortOptions.ts";

export const UserSearch = observer(() => {
    return (
        <div className={styles.container}>
            <div className={styles.input}>
                <Input
                    placeholder={"Поиск по почте сотрудника"}
                    onChange={(event) => store.user.setSearch(event.target.value)}
                    types={"text"}
                    value={store.user.search}
                    startIcon={<IconSearch />}
                />
            </div>
            <DropdownList
                color={"neutral"}
                options={sortOptions}
                onChange={(option) => store.user.setSort(option)}
            >
                <Button type={"tertiary"} color={"neutral"} startIcon={<IconSort />}>
                    {store.user.sort.name}
                </Button>
            </DropdownList>
        </div>
    );
});
