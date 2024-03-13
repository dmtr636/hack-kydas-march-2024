import { observer } from "mobx-react-lite";
import { AdminPageLayout } from "src/features/layout/components/AdminPageLayout/AdminPageLayout.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { store } from "src/app/stores/AppStore.ts";
import { useEffect, useState } from "react";
import { Button } from "src/ui/components/Button/Button.tsx";
import { MatrixData } from "src/features/matrixdata/components/MatrixData/MatrixData.tsx";
import { IconBasket } from "src/ui/assets/icons";
import Modal from "@mui/material/Modal";
import { CloneMatrix } from "src/features/matrixdata/components/CloneMatrix/CloneMatrix.tsx";
import { SaveMatrixDataSuccesfull } from "src/features/matrixdata/components/SaveMatrixDataSuccesfull/SaveMatrixDataSuccesfull.tsx";
import { ChangePriceMatrix } from "src/features/matrixdata/components/ChangePriceMatrix/ChangePriceMatrix.tsx";

export const MatrixViewPage = observer(() => {
    const params = useParams<{ id: string }>();
    const matrix = store.matrix.allMatrix.find((elem) => elem.id.toString() === params.id);
    const navigate = useNavigate();
    const [openClone, setOpenClone] = useState(false);
    const [openSuccessful, setOpenSuccessful] = useState(false);
    const [openChange, setOpenChange] = useState(false);

    useEffect(() => {
        if (!store.matrix.allMatrix.length) {
            store.matrix.getMatrix();
        }
        if (!store.matrix.category.length) {
            store.matrix.getCategory();
        }
        if (!store.matrix.location.length) {
            store.matrix.getLocation();
        }
        if (!store.matrix.segment.length) {
            store.matrix.getSegment();
        }
    }, []);

    if (!matrix) {
        return <AdminPageLayout title={"Загрузка..."}>Загрузка...</AdminPageLayout>;
    }

    const getTitleChip = () => (
        <Button
            type={"secondary"}
            color={
                {
                    ACTIVE: "positive",
                    INACTIVE: "neutral",
                    DRAFT: "neutral",
                }[matrix.status] as any
            }
            clickable={false}
        >
            {
                {
                    ACTIVE: "Активно",
                    INACTIVE: "Неактивно",
                    DRAFT: "Черновик",
                }[matrix.status]
            }
        </Button>
    );

    const getActions = () => {
        const actions = [];
        if (matrix.status === "ACTIVE" || matrix.status === "INACTIVE") {
            actions.push(
                <Button key={"clone"} onClick={() => setOpenClone(true)}>
                    Создать копию и редактировать
                </Button>,
                <Button
                    key={"logs"}
                    type={"tertiary"}
                    onClick={() => navigate(`/logs?search=${matrix?.id}`)}
                >
                    Журнал изменений
                </Button>,
            );
        } else {
            actions.push(
                <Button
                    key={"setPrice"}
                    type={"secondary"}
                    disabled={!store.matrixData.selectedMatrixData.length}
                    onClick={() => {
                        setOpenChange(true);
                    }}
                >
                    Задать цену
                </Button>,
                <Button
                    key={"deletePrice"}
                    type={"secondary"}
                    color={"negative"}
                    startIcon={<IconBasket />}
                    disabled={!store.matrixData.selectedMatrixData.length}
                    onClick={() => {
                        store.matrixData.selectedMatrixData.forEach((d) => (d.price = null));
                        store.matrixData.selectedMatrixData = [];
                    }}
                >
                    Удалить цену
                </Button>,
                <Button
                    key={"save"}
                    style={{ marginLeft: "auto" }}
                    onClick={() => {
                        store.matrix.saveMatrix(matrix);
                        store.matrixData.saveMatrixData().then(() => {
                            store.matrix.getMatrix();
                        });
                        setOpenSuccessful(true);
                    }}
                >
                    Сохранить
                </Button>,
            );
        }
        return actions;
    };

    return (
        <AdminPageLayout
            title={matrix?.name ?? "Загрузка..."}
            titleChip={getTitleChip()}
            actions={getActions()}
            onBack={() => navigate("/")}
        >
            {matrix ? <MatrixData matrix={matrix} /> : "Загрузка..."}
            <Modal open={openClone}>
                <CloneMatrix onClose={() => setOpenClone(false)} matrix={matrix} />
            </Modal>
            <Modal open={openSuccessful}>
                <SaveMatrixDataSuccesfull onClick={() => setOpenSuccessful(false)} />
            </Modal>
            <Modal open={openChange}>
                <ChangePriceMatrix
                    onClose={() => setOpenChange(false)}
                    onSave={(type, value, cascade) => {
                        if (type === "fixed") {
                            if (cascade) {
                                store.matrixData.selectedMatrixData.forEach((d) => {
                                    const locationId = d.locationId;
                                    const categoryId = d.categoryId;
                                    let categories = [categoryId];
                                    if (categoryId === store.matrixData.getRootCategory().id) {
                                        categories = [
                                            ...categories,
                                            ...store.matrixData.getCategories().map((c) => c.id),
                                        ];
                                    }
                                    let locations = [locationId];
                                    if (locationId === store.matrixData.getRootLocation().id) {
                                        locations = [
                                            ...locations,
                                            ...store.matrixData.getLocations().map((l) => l.id),
                                        ];
                                    }
                                    categories.forEach((c) => {
                                        locations.forEach((l) => {
                                            const data = store.matrixData.matrixData.find(
                                                (d) => d.locationId === l && d.categoryId === c,
                                            );
                                            if (data) {
                                                data.price = Number(value);
                                            }
                                        });
                                    })
                                });
                            } else {
                                store.matrixData.selectedMatrixData.forEach(
                                    (d) => (d.price = Number(value)),
                                );
                            }
                        } else {
                            if (cascade) {
                                store.matrixData.selectedMatrixData.forEach((d) => {
                                    const locationId = d.locationId;
                                    const categoryId = d.categoryId;
                                    let categories = [categoryId];
                                    if (categoryId === store.matrixData.getRootCategory().id) {
                                        categories = [
                                            ...categories,
                                            ...store.matrixData.getCategories().map((c) => c.id),
                                        ];
                                    }
                                    let locations = [locationId];
                                    if (locationId === store.matrixData.getRootLocation().id) {
                                        locations = [
                                            ...locations,
                                            ...store.matrixData.getLocations().map((l) => l.id),
                                        ];
                                    }
                                    categories.forEach((c) => {
                                        locations.forEach((l) => {
                                            const data = store.matrixData.matrixData.find(
                                                (d) => d.locationId === l && d.categoryId === c,
                                            );
                                            if (data && data.price) {
                                                data.price = Number(value) * data.price;
                                            }
                                        });
                                    })
                                });
                            } else {
                                store.matrixData.selectedMatrixData.forEach((d) => {
                                    if (d.price !== null) {
                                        d.price = Number(value) * d.price;
                                    }
                                });
                            }
                        }
                        setOpenChange(false);
                    }}
                />
            </Modal>
        </AdminPageLayout>
    );
});
