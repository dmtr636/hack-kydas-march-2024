import styles from "./styles.module.scss";
import { ButtonIcon } from "src/ui/components/ButtonIcon/ButtonIcon";
import { IconClose } from "src/ui/assets/icons";
import { Button } from "src/ui/components/Button/Button";

export const SaveMatrixDataSuccesfull = ({ onClick }: { onClick: () => void }) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                Успешно
                <ButtonIcon onClick={onClick} color="neutral">
                    <IconClose />
                </ButtonIcon>
            </div>
            <div className={styles.matrixBlock}>Изменения применены</div>
            <div className={styles.button}>
                <Button onClick={onClick} color="neutral">
                    Принять
                </Button>
            </div>
        </div>
    );
};
