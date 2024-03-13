import styles from "./styles.module.scss"
import { ButtonIcon } from "src/ui/components/ButtonIcon/ButtonIcon"
import { IconClose, IconMatrix } from "src/ui/assets/icons"
import { Button } from "src/ui/components/Button/Button"
import { store } from "src/app/stores/AppStore"
export const MatrixSuccesfull = ({ currentBaseline, currentDiscount, onClick }: { currentDiscount: any, currentBaseline: any, onClick: () => void }) => {
    const matrix = store.matrix.allMatrix
    const baselineMatix = matrix.filter((item) => item.id === currentBaseline)
    const discountMatrix = matrix.filter(item => currentDiscount.includes(item.id));
    console.log(discountMatrix)
    const discountMatrixArray = discountMatrix.map((item) => {
        return <div key={item.id} className={styles.matrixItem}><IconMatrix />{item.name} ({item.type})</div>
    })
    return (
        <div className={styles.container} >
            <div className={styles.header}>
                Матрицы успешно обновлены
                <ButtonIcon onClick={onClick} color='neutral'><IconClose /></ButtonIcon>
            </div>
            <div className={styles.subHead}>Текущие активные матрицы</div>
            <div className={styles.matrixBlock}>
                <div className={styles.matrixItem}><IconMatrix />{baselineMatix[0].name} ({baselineMatix[0].type})</div>
                {discountMatrixArray}
            </div>
            <div className={styles.button}><Button onClick={onClick} color="neutral">Принять</Button></div>
        </div>
    )
}
