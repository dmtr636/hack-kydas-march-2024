import styles from "./styles.module.scss";
import { observer } from "mobx-react-lite";
import { Checkbox } from "src/ui/components/Checkbox/Checkbox.tsx";
import { MatrixData as Matrix } from "src/features/matrix/pages/MatrixListPage.tsx";
import { ICategory, ILocation } from "src/features/matrixdata/stores/MatrixDataStore.tsx";
import { store } from "src/app/stores/AppStore.ts";
import { Input } from "src/ui/components/Input/Input.tsx";
import { IconRuble } from "src/ui/assets/icons";
import { useState } from "react";
import { Button } from "src/ui/components/Button/Button.tsx";

export const MatrixDataLocation = observer(
    (props: { matrix: Matrix; location: ILocation; category: ICategory; editable: boolean; titleSmall: boolean }) => {
        const [settingPrice, setSettingPrice] = useState(false);

        let matrixData = store.matrixData.getMatrixDataByLocationIdAndCategoryId(
            props.location.id,
            props.category.id,
        ) ?? store.matrixData.getSelectedMatrixDataByLocationIdAndCategoryId(
            props.location.id,
            props.category.id,
        );

        return (
            <div className={styles.row}>
                <Checkbox
                    onChange={(checked) => {
                        if (checked) {
                            store.matrixData.selectedMatrixData.push(
                                matrixData ?? {
                                    id: null,
                                    matrixId: props.matrix.id,
                                    categoryId: props.category.id,
                                    locationId: props.location.id,
                                    price: null,
                                },
                            );
                        } else {
                            store.matrixData.selectedMatrixData =
                                store.matrixData.selectedMatrixData.filter(
                                    (d) =>
                                        d.locationId !== props.location.id ||
                                        d.categoryId !== props.category.id,
                                );
                        }
                    }}
                    title={props.location.name}
                    disabled={props.matrix.status !== "DRAFT"}
                    titleSmall={props.titleSmall}
                />
                {props.editable && !matrixData?.price && !settingPrice && (
                    <Button type={"tertiary"} onClick={() => setSettingPrice(true)} size={"small"}>
                        Задать
                    </Button>
                )}
                {props.editable && (matrixData?.price || settingPrice) && (
                    <Input
                        style={{ width: "120px" }}
                        placeholder={"Цена"}
                        onChange={(event) => {
                            setSettingPrice(true);
                            if (matrixData) {
                                if (isNaN(Number(event.target.value))){
                                    return;
                                }
                                matrixData.price = event.target.value
                                    ? Number(event.target.value)
                                    : null;
                            } else {
                                matrixData = {
                                    id: null,
                                    matrixId: props.matrix.id,
                                    categoryId: props.category.id,
                                    locationId: props.location.id,
                                    price: event.target.value ? Number(event.target.value) : null,
                                };
                                store.matrixData.matrixData.push(matrixData);
                            }
                        }}
                        onBlur={() => {
                            if (matrixData?.price === null) {
                                setSettingPrice(false);
                            }
                        }}
                        value={`${matrixData?.price ?? ""}`}
                        endIcon={<IconRuble />}
                        autoFocus={settingPrice}
                        size={"small"}
                    />
                )}
                {!props.editable && (matrixData?.price || settingPrice) && (
                    <Input
                        style={{ width: "100px" }}
                        placeholder={"Цена"}
                        onChange={() => {}}
                        value={`${matrixData?.price ?? "-"}`}
                        endIcon={<IconRuble />}
                        disabled={true}
                        size={"small"}
                    />
                )}
            </div>
        );
    },
);
