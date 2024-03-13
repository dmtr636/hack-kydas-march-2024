import { Checkbox } from 'src/ui/components/Checkbox/Checkbox'
import styles from './styles.module.scss'
/* import { RadioButton } from 'src/ui/components/RadioButton/RadioButton'
 */import { Button } from 'src/ui/components/Button/Button'
import { useEffect, useState } from 'react'
import { RadioButton } from 'src/ui/components/RadioButton/RadioButton'
import { useNavigate } from "react-router-dom";
/* import { IconCheckmark } from 'src/ui/assets/icons'
 */


interface MatrixItemProps {
    id: number;
    name: string;
    type: "BASELINE" | "DISCOUNT";
    status: /* "DRAFT" | "INACTIVE" | 'ACTIVE' */ string;
    priceCount: number | null;
    segmentId?: number | null;
    date: string;
    onChangeRadio?: (id: any) => void;
    handleCheckboxChange?: (id: any) => void;
}
const checkStatus = (stat: string) => {
    if (stat === "DRAFT") return "Черновик"
    if (stat === "INACTIVE") return "Неактивно"
    if (stat === "ACTIVE") return "Активно"
    return stat


}
export const MatrixItem = ({ name, type, status, priceCount, segmentId, id, date, onChangeRadio, handleCheckboxChange }: MatrixItemProps) => {
    const navigate = useNavigate();

    function formatDate(inputDate: string) {
        const dateObject = new Date(inputDate);
        const formattedDate = dateObject.toLocaleDateString()
        return formattedDate;
    }
    function formatText(inputText: string) {
        if (!inputText) {
            return '';
        }

        const firstChar = inputText.charAt(0);
        const restOfText = inputText.slice(1).toLowerCase();

        return firstChar + restOfText;
    }
    const onClickButton = () => {
        setValue(!value)
        if (type === "BASELINE") {
            if (onChangeRadio) {
                onChangeRadio(id);
            }
        }
        if (type === "DISCOUNT") {
            if (handleCheckboxChange) {
                handleCheckboxChange(id);
            }
        }


    }
    const [value, setValue] = useState(false)
    useEffect(() => {
        if (status === "ACTIVE") {
            setValue(true)

        }

    }, [])

    return (
        <div className={styles.container} >
            <div className={styles.button} onClick={() => onClickButton()}>{type === "BASELINE" ? <RadioButton color={status === "ACTIVE" ? 'positive' : 'neutral'} value={id} /> : <Checkbox onChange={setValue} checked={value} color={status === "ACTIVE" ? 'positive' : 'neutral'} />}</div>
            <div className={styles.block} onClick={() => navigate(`/matrix/${id}/view`)}>
                <div className={styles.id}>{id}</div>
                <div className={styles.name}>{name}</div>
                <div className={styles.type}>{formatText(type)}</div>
                <div className={styles.date}>{formatDate(date)}</div>

                <div className={styles.status}>
                    <Button type='secondary' color={status === "ACTIVE" ? 'positive' : 'neutral'} size='small'>{checkStatus(status)}</Button>
                </div>
                <div className={styles.priceCount}>{priceCount === null ? "—" : priceCount}</div>

                <div className={styles.segmentId}>{segmentId === null ? "—" : segmentId}</div></div>


        </div>
    )
}
