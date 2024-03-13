import styles from "./styles.module.scss";
import { observer } from "mobx-react-lite";
/* import { DropdownListOption } from "src/ui/components/DropdownList/DropdownList.types"
 */
import { Button } from "src/ui/components/Button/Button";
import { RadioGroup } from "src/ui/components/RadioGroup/RadioGroup";
import { RadioButton } from "src/ui/components/RadioButton/RadioButton.tsx";
import { useState } from "react";
import { Input } from "src/ui/components/Input/Input.tsx";
import { IconRuble } from "src/ui/assets/icons";
import { Checkbox } from "src/ui/components/Checkbox/Checkbox.tsx";

export const ChangePriceMatrix = observer(
    ({ onClose, onSave }: { onClose: () => void; onSave: (type: string, value: string, cascade: boolean) => void }) => {
        const [type, setType] = useState("fixed");
        const [value, setValue] = useState("");
        const [cascade, setCascade] = useState(false);

        return (
            <div className={styles.container}>
                <div className={styles.header}>Задать цену</div>

                <div className={styles.typeLabel}>Тип изменения</div>
                <div className={styles.radioGroup}>
                    <RadioGroup value={type} onChange={(value) => setType(value)}>
                        <RadioButton value={"fixed"} title={"Фиксированное значение"} />
                        <RadioButton value={"relative"} title={"Относительное изменение"} />
                    </RadioGroup>
                </div>

                <div className={styles.input}>
                    <Input
                        placeholder={type === "fixed" ? "Впишите число" : "Впишите коэффициент"}
                        onChange={(event) => setValue(event.target.value)}
                        value={value}
                        formText={
                            type === "relative"
                                ? "Все цены будут умножены на заданный коэффициент"
                                : undefined
                        }
                        endIcon={type === "fixed" ? <IconRuble /> : undefined}
                        number={true}
                    />
                </div>

                <Checkbox
                    onChange={(checked) => setCascade(checked)}
                    checked={cascade}
                    title={"Применить для всех дочерних узлов"}
                />

                <div className={styles.buttonBlock}>
                    <Button
                        onClick={() => {
                            onSave(type, value, cascade);
                        }}
                        disabled={!value.length}
                    >
                        Задать
                    </Button>
                    <Button type="secondary" onClick={onClose}>
                        Отмена
                    </Button>
                </div>
            </div>
        );
    },
);
