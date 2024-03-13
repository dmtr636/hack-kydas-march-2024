import { Input } from "src/ui/components/Input/Input"
import styles from "./styles.module.scss"
import { ChangeEvent, useEffect, useState } from "react";
import { RadioGroup } from "src/ui/components/RadioGroup/RadioGroup"
import { RadioButton } from "src/ui/components/RadioButton/RadioButton"

import { DropdownList } from "src/ui/components/DropdownList/DropdownList"
import { store } from "src/app/stores/AppStore"
import { observer } from "mobx-react-lite"
/* import { DropdownListOption } from "src/ui/components/DropdownList/DropdownList.types"
 */import { Button } from "src/ui/components/Button/Button"
import axios from "axios"
import { CLONE_ENDPOINT } from "src/shared/api/endpoints";
import { useNavigate } from "react-router-dom"
import { MatrixData } from "src/features/matrix/pages/MatrixListPage.tsx";
import { CircularProgress } from "@mui/material";



export const CloneMatrix = observer(({ onClose, matrix }: { onClose: () => void, matrix: MatrixData }) => {
    const [nameValue, setNameValue] = useState("")
    const [segmentId, setSegmentId] = useState<number | null>(null)
    const [segmentName, setSegmentName] = useState("")
    const navigate = useNavigate()
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>,): void => {
        setNameValue(event.target.value);
    };
    const handleInputChangeSegment = (event: ChangeEvent<HTMLInputElement>,): void => {
        setSegmentName(event.target.value);
        if (segmentName !== event.target.value) setSegmentId(null)
    };
    const [radioValue, setRadioValue] = useState(matrix.type)
    const [cloning, setCloning] = useState(false);

    useEffect(() => {
        if (matrix.segmentId) {
            setSegmentId(matrix.segmentId);
            setSegmentName(`Сегмент-${matrix.segmentId}`);
        }
    }, [matrix.segmentId]);


    const segments = store.matrix.segment.map((number) => ({
        name: `Сегмент-${number}`,
        value: number,
    }));
    const onChange = (option: any) => {
        setSegmentName(option.name)
        setSegmentId(option.value)
    };
    const filtredSegments = segments.filter((item) =>
        item.name.toLowerCase().includes(segmentName.toLowerCase())
    )
    const segmentnumber = radioValue === "BASELINE" ? null : segmentId
    const data = {
        id: matrix.id,
        newName: nameValue,
        type: radioValue,
        segmentId: segmentnumber
    }
    const onClickCreate = () => {
        setCloning(true);
        axios.post(CLONE_ENDPOINT, data)
            .then((response) => {
                setCloning(false);
                store.matrix.pushMatrix(response.data)
                navigate(`/matrix/${response.data.id}/view`)
                onClose();
            })
    }
    const disabledButton = nameValue && (radioValue === "BASELINE" ? true : segmentnumber)
    return (
        <div className={styles.container}>
            <div className={styles.header}>Создание копии</div>
            <div className={styles.nameInput}>
                <Input value={nameValue} formName="Название" onChange={handleInputChange} placeholder="Новое название" />
            </div>
            <div className={styles.matrixType}>
                <div className={styles.matrixTypeHead}>Тип матрицы</div>
                <div className={styles.radioGroup}>
                    <RadioGroup onChange={setRadioValue} value={radioValue}>
                        <RadioButton title="Baseline" value="BASELINE" />
                        <RadioButton title="Discount" value="DISCOUNT" />
                    </RadioGroup></div>
            </div>
            {radioValue === "DISCOUNT" && <div className={styles.segmetType}>
                <DropdownList options={filtredSegments} onChange={onChange} fullWidth={true} color='neutral' >
                    <Input formName="Сегмент"
                           placeholder="Номер сегмента"
                           value={segmentName}
                           onChange={handleInputChangeSegment}
                           formText="Выберите сегмент из списка"
                        /*  endIcon={<ButtonIcon color='neutral'>
                             <IconArrowDown />
                         </ButtonIcon>} */
                    />
                </DropdownList>
            </div>}
            {cloning &&
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexGrow: "1"
                }}>
                    <CircularProgress/>
                </div>
            }
            <div className={styles.buttonBlock}>
                <Button onClick={onClickCreate} disabled={!disabledButton || cloning}>Далее</Button>
                <Button type='secondary' onClick={onClose}>Отмена</Button>

            </div>
        </div>
    )
});
