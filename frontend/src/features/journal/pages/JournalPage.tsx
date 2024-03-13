import { observer } from 'mobx-react-lite'
import styles from './styles.module.scss'
import { AdminPageLayout } from 'src/features/layout/components/AdminPageLayout/AdminPageLayout'
import { Input } from 'src/ui/components/Input/Input'
import { ChangeEvent, useEffect, useState } from 'react'
import { IconClear, IconSearch } from 'src/ui/assets/icons'
import { ButtonIcon } from 'src/ui/components/ButtonIcon/ButtonIcon'
import { store } from 'src/app/stores/AppStore'
import { JournalItem } from '../components/JournalItem/JournalItem'
import { useSearchParams } from "react-router-dom";





export const JournalPage = observer(() => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchValue, setSearchValue] = useState(searchParams.get("search") ?? "");
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setSearchValue(event.target.value);
        setSearchParams("", {replace: true});
    };
    useEffect(() => {
        store.journal.geAllLogs()
    }, [])
    const updatedArray = store.journal.allLogs.map((obj: any) => {
        switch (obj.eventType) {
            case "CREATE_MATRIX":
                return { ...obj, eventType: "Создание матрицы" };
            case "CHANGE_STATUS":
                return { ...obj, eventType: "Изменение статуса" };
            case "CLONE_MATRIX":
                return { ...obj, eventType: "Клонирование" };
            case "EDIT_MATRIX":
                return { ...obj, eventType: "Редактирование" };
            default:
                return obj;
        }
    })
    const filtredArray = updatedArray.filter((item: any) =>
        item.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
        item.eventType.toLocaleLowerCase().includes(searchValue) ||
        item.userEmail.toLocaleLowerCase().includes(searchValue) ||
        item.matrixId.toString().includes(searchValue) 
    );
    const journalArray = filtredArray.map((item: any) => {
        return <JournalItem key={item.id} name={item.name}
            action={item.eventType}
            date={item.timestamp}
            author={item.userEmail}
            status={item.status}
            matrixId={item.matrixId}
        />
    })

    return (
        <AdminPageLayout title='Журнал изменений'>
            <div className={styles.container}>
                <Input value={searchValue} onChange={handleInputChange} placeholder='Название матрицы, действие или почта сотрудника' startIcon={<IconSearch />}
                    endIcon={
                        searchValue.length > 0 && <ButtonIcon
                            pale={true}
                            type="tertiary"
                            color="neutral"
                            onClick={() => setSearchValue("")}><IconClear />
                        </ButtonIcon>
                    }
                />
            </div>
            <div className={styles.containerList}>
                <div className={styles.sortlist}>
                    <div className={styles.sortlistAction}>
                        Событие
                    </div>
                    <div className={styles.sortlistId}>
                        ID
                    </div>
                    <div className={styles.sortlistName}>
                        Название
                    </div>
                    <div className={styles.sortlistDate}>
                        Дата
                    </div>
                    <div className={styles.sortlistTime}>
                        Время
                    </div>
                    <div className={styles.sortlistStatus}>
                        Статус
                    </div>
                    <div className={styles.sortlistAuthor}>
                        Автор
                    </div>
                </div>
                {journalArray}
            </div>
        </AdminPageLayout>
    )
})
