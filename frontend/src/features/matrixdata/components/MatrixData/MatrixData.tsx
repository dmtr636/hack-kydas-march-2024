import styles from "./MatrixData.module.scss";
import { MatrixData as Matrix } from "src/features/matrix/pages/MatrixListPage.tsx";
import { observer } from "mobx-react-lite";
import { Card } from "src/ui/components/Card/Card.tsx";
import { Input } from "src/ui/components/Input/Input.tsx";
import { ButtonIcon } from "src/ui/components/ButtonIcon/ButtonIcon.tsx";
import { IconArrowDown, IconClear } from "src/ui/assets/icons";
import { store } from "src/app/stores/AppStore.ts";
import { Button } from "src/ui/components/Button/Button.tsx";
import { DropdownList } from "src/ui/components/DropdownList/DropdownList.tsx";
import { ChangeEvent, useEffect, useState } from "react";
import { MatrixDataCategory } from "src/features/matrixdata/components/MatrixDataCategory/MatrixDataCategory.tsx";

interface MatrixDataProps {
    matrix: Matrix;
}

export const MatrixData = observer((props: MatrixDataProps) => {
    const { matrix } = props;
    const [segmentName, setSegmentName] = useState("");

    const onChangeSegment = (option: any) => {
        setSegmentName(option.name);
        matrix.segmentId = option.value;
    };
    const segments = store.matrix.segment.map((number) => ({
        name: `Сегмент-${number}`,
        value: number,
    }));
    const filteredSegments =
        segmentName === `Сегмент-${matrix.segmentId}`
            ? segments
            : segments.filter((item) =>
                  item.name.toLowerCase().includes(segmentName.toLowerCase()),
              );
    const handleInputChangeSegment = (event: ChangeEvent<HTMLInputElement>): void => {
        setSegmentName(event.target.value);
        if (segmentName !== event.target.value) {
            // matrix.segmentId = null;
        }
    };
    useEffect(() => {
        setSegmentName(`Сегмент-${matrix.segmentId}`);
    }, []);

    useEffect(() => {
        store.matrixData.fetchMatrixData(matrix.id);
        return () => {
            store.matrixData.setLocationSearch("");
            store.matrixData.setCategorySearch("");
        };
    }, [matrix.id]);

    return (
        <div className={styles.layout}>
            <div className={styles.column}>
                <Card title={"Основная информация"}>
                    <div className={styles.mainInfo}>
                        <div className={styles.mainInfoRow}>
                            <div className={styles.mainInfoCol}>
                                <div className={styles.mainInfoColLabel}>ID</div>
                                <div className={styles.mainInfoColValue}>{matrix.id}</div>
                            </div>
                            <div className={styles.mainInfoCol}>
                                <div className={styles.mainInfoColLabel}>Тип матрицы</div>
                                <div className={styles.mainInfoColValue}>
                                    {matrix.type === "BASELINE" ? "Baseline" : "Discount"}
                                </div>
                            </div>
                            <div className={styles.mainInfoCol}>
                                <div className={styles.mainInfoColLabel}>Дата создания</div>
                                <div className={styles.mainInfoColValue}>
                                    {new Date(matrix.createDate).toLocaleDateString()}
                                </div>
                            </div>
                            <div className={styles.mainInfoCol}>
                                <div className={styles.mainInfoColLabel}>Количество цен</div>
                                <div className={styles.mainInfoColValue}>
                                    {matrix.priceCount ?? "-"}
                                </div>
                            </div>
                        </div>
                        {matrix.segmentId && (
                            <div className={styles.mainInfoRow}>
                                <DropdownList
                                    options={filteredSegments}
                                    onChange={onChangeSegment}
                                    fullWidth={true}
                                    color="neutral"
                                >
                                    <Input
                                        formName="Сегмент"
                                        placeholder="Номер сегмента"
                                        value={segmentName}
                                        onChange={handleInputChangeSegment}
                                        formText={
                                            matrix.status === "DRAFT"
                                                ? "Выберите сегмент из списка"
                                                : undefined
                                        }
                                        size={"small"}
                                        disabled={matrix.status !== "DRAFT"}
                                        endIcon={
                                            matrix.status === "DRAFT" && (
                                                <ButtonIcon
                                                    color="neutral"
                                                    size={"small"}
                                                    disabled={matrix.status !== "DRAFT"}
                                                >
                                                    <IconArrowDown />
                                                </ButtonIcon>
                                            )
                                        }
                                        onBlur={() => {
                                            if (segmentName !== `Сегмент-${matrix.segmentId}`) {
                                                setSegmentName(`Сегмент-${matrix.segmentId}`);
                                            }
                                        }}
                                    />
                                </DropdownList>
                            </div>
                        )}
                    </div>
                </Card>
                <Card
                    title={
                        <div className={styles.buttonList}>
                            <Button
                                color={"neutral"}
                                type={store.matrixData.filter === "all" ? "primary" : "tertiary"}
                                onClick={() => (store.matrixData.filter = "all")}
                            >
                                Все
                            </Button>
                            <Button
                                color={"neutral"}
                                type={
                                    store.matrixData.filter === "withPrice" ? "primary" : "tertiary"
                                }
                                onClick={() => (store.matrixData.filter = "withPrice")}
                            >
                                Задана цена
                            </Button>
                            <div className={styles.divider} />
                        </div>
                    }
                >
                    {store.matrixData.filter === "withPrice" &&
                        (store.matrixData.matrixData.some(
                            (d) =>
                                d.categoryId === store.matrixData.getRootCategory().id &&
                                d.price !== null,
                        ) && (
                            <MatrixDataCategory
                                matrix={matrix}
                                category={store.matrixData.getRootCategory()}
                                root={true}
                            />
                        ))}
                    {store.matrixData.filter !== "withPrice" && (
                        <MatrixDataCategory
                            matrix={matrix}
                            category={store.matrixData.getRootCategory()}
                            root={true}
                        />
                    )}
                    {store.matrixData.filter === "withPrice" &&
                        store.matrixData
                            .getCategories()
                            .filter((c) =>
                                store.matrixData.matrixData.some(
                                    (d) => d.categoryId === c.id && d.price !== null,
                                ),
                            )
                            .map((category) => (
                                <MatrixDataCategory
                                    matrix={matrix}
                                    category={category}
                                    key={category.id}
                                />
                            ))}
                    {store.matrixData.filter !== "withPrice" &&
                        store.matrixData
                            .getCategories()
                            .map((category) => (
                                <MatrixDataCategory
                                    matrix={matrix}
                                    category={category}
                                    key={category.id}
                                />
                            ))}
                </Card>
            </div>
            <div className={styles.column}>
                <Card title={"Фильтры"} className={styles.filterCard}>
                    <div className={styles.filters}>
                        <DropdownList
                            value={store.matrixData.category}
                            options={store.matrixData.categoryInputValues}
                            color={"neutral"}
                            fullWidth={true}
                            onChange={(option) => {
                                store.matrixData.category = option.value as any;
                                store.matrixData.categorySearch = option.name;
                            }}
                        >
                            <Input
                                placeholder={"Название категории или подкатегории"}
                                onChange={(event) =>
                                    store.matrixData.setCategorySearch(event.target.value)
                                }
                                value={store.matrixData.categorySearch}
                                formName={"Выбрать категорию"}
                                formText={"Отображается 500 000 категорий"}
                                size={"small"}
                                endIcon={
                                    store.matrixData.categorySearch.length > 0 && (
                                        <ButtonIcon
                                            pale={true}
                                            type="tertiary"
                                            color="neutral"
                                            onClick={() => store.matrixData.setCategorySearch("")}
                                        >
                                            <IconClear />
                                        </ButtonIcon>
                                    )
                                }
                                onBlur={() =>
                                    setTimeout(
                                        () =>
                                            store.matrixData.setCategorySearch(
                                                store.matrixData.category?.name ?? "",
                                            ),
                                        100,
                                    )
                                }
                            />
                        </DropdownList>

                        <DropdownList
                            value={store.matrixData.location}
                            options={store.matrixData.locationInputValues}
                            color={"neutral"}
                            fullWidth={true}
                            onChange={(option) => {
                                store.matrixData.location = option.value as any;
                                store.matrixData.locationSearch = option.name;
                            }}
                        >
                            <Input
                                placeholder={"Область или город"}
                                onChange={(event) =>
                                    store.matrixData.setLocationSearch(event.target.value)
                                }
                                value={store.matrixData.locationSearch}
                                formName={"Выбрать локацию"}
                                formText={"Отображается 300 зон локаций"}
                                size={"small"}
                                endIcon={
                                    store.matrixData.locationSearch.length > 0 && (
                                        <ButtonIcon
                                            pale={true}
                                            type="tertiary"
                                            color="neutral"
                                            onClick={() => store.matrixData.setLocationSearch("")}
                                        >
                                            <IconClear />
                                        </ButtonIcon>
                                    )
                                }
                                onBlur={() =>
                                    setTimeout(
                                        () =>
                                            store.matrixData.setLocationSearch(
                                                store.matrixData.location?.name ?? "",
                                            ),
                                        100,
                                    )
                                }
                            />
                        </DropdownList>
                    </div>
                </Card>
            </div>
        </div>
    );
});
