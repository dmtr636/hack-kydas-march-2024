import { observer } from 'mobx-react-lite'
import { AdminPageLayout } from 'src/features/layout/components/AdminPageLayout/AdminPageLayout';
import styles from "./styles.module.scss"
import { useEffect, useState } from 'react';
import { Button } from 'src/ui/components/Button/Button';
import { Checkbox } from 'src/ui/components/Checkbox/Checkbox';
import { DropdownList } from 'src/ui/components/DropdownList/DropdownList';
import { store } from 'src/app/stores/AppStore';
import { Input } from 'src/ui/components/Input/Input';
import { ButtonIcon } from 'src/ui/components/ButtonIcon/ButtonIcon';
import { IconArrowDown, IconClear, IconClose } from 'src/ui/assets/icons';
import { BarChart } from '@mui/x-charts/BarChart'
import { PieChart } from '@mui/x-charts/PieChart';
import { Drawer } from '@mui/material';
import Otchyot from './Otchyot.png'

export const StatisticsPage = observer(() => {
    const [activeSort, setActiveSort] = useState("all")

    const [isCheckedCount, setisCheckedCount] = useState(false)
    const [activeCategoryCount, setActiveCategoryCount] = useState("category")

    const [isCheckedAvg, setisCheckedAvg] = useState(false)
    const [activeCategoryAvg, setActiveCategoryAvg] = useState("category")

    const [isCheckedCountAdv, setisCheckedCountAdv] = useState(false)
    const [activeCategoryCountAdv, setActiveCategoryCountAdv] = useState("category")

    const [isCheckedConv, setisCheckedConv] = useState(false)

    const [selectTimePeriod, setSelectTimePeriod] = useState("Временной период")
    const [selectTimePeriodAvg, setSelectTimePeriodAvg] = useState("Временной период")
    const [selectTimePeriodAdv, setSelectTimePeriodAdv] = useState("Временной период")
    const [selectTimePeriodConv, setSelectTimePeriodConv] = useState("Временной период")
    const timeArray = [
        { name: "День", value: "day" },
        { name: "Неделя", value: "week" },
        { name: "Месяц", value: "month" },
        { name: "Год", value: "year" },
        { name: "Всё время", value: "all" }
    ]
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    const downloadImage = () => {
        // Путь к изображению в вашем репозитории
        const a = document.createElement('a');
        a.href = Otchyot;
        a.download = 'Otchyot.png'; // Имя файла для скачивания

        // Добавляем ссылку в документ
        document.body.appendChild(a);

        // Симулируем клик по ссылке для запуска скачивания
        a.click();

        // Удаляем ссылку из документа
        document.body.removeChild(a);
    };

    const advPriceCategorySidebar = <div className={styles.categoryList}>
        <div className={styles.categoryListItem}>
            <div className={styles.squere}></div>
            <div className={styles.itemText}>Транспорт</div>
            <div className={styles.itemCount}>38 621</div>
        </div>
        <div className={styles.categoryListItem}>
            <div className={styles.squere} style={{ backgroundColor: "#965326" }}></div>
            <div className={styles.itemText}>Недвижимость</div>
            <div className={styles.itemCount}>23 655</div>
        </div>
        <div className={styles.categoryListItem}>
            <div className={styles.squere} style={{ backgroundColor: "#603D1B" }}></div>
            <div className={styles.itemText}>Работа</div>
            <div className={styles.itemCount}>41 003</div>
        </div>
        <div className={styles.categoryListItem}>
            <div className={styles.squere} style={{ backgroundColor: "#FFE898" }}></div>
            <div className={styles.itemText}>Личные вещи</div>
            <div className={styles.itemCount}>15 472</div>
        </div>
        <div className={styles.categoryListItem}>
            <div className={styles.squere} style={{ backgroundColor: "#C1A13C" }}></div>
            <div className={styles.itemText}>Для дома и дачи</div>
            <div className={styles.itemCount}>30 648</div>
        </div>
        <div className={styles.categoryListItem}>
            <div className={styles.squere} style={{ backgroundColor: "#5D641E" }}></div>
            <div className={styles.itemText}>Электроника</div>
            <div className={styles.itemCount}>18 917</div>
        </div>
        <div className={styles.categoryListItem}>
            <div className={styles.squere} style={{ backgroundColor: "#BAD0C4" }}></div>
            <div className={styles.itemText}>Хобби и отдых</div>
            <div className={styles.itemCount}>47 928</div>
        </div>
        <div className={styles.categoryListItem}>
            <div className={styles.squere} style={{ backgroundColor: "#7CAED1" }}></div>
            <div className={styles.itemText}>Животные</div>
            <div className={styles.itemCount}>15 237</div>
        </div>
        <div className={styles.categoryListItem}>
            <div className={styles.squere} style={{ backgroundColor: "#98D3F1" }}></div>
            <div className={styles.itemText}>Готовый бизнес и обор...</div>
            <div className={styles.itemCount}>42 714</div>
        </div>
        <div className={styles.categoryListItem}>
            <div className={styles.squere} style={{ backgroundColor: "#94D0B3" }}></div>
            <div className={styles.itemText}>Услуги</div>
            <div className={styles.itemCount}>36 999</div>
        </div>

    </div>
    const advPriceServiceSidebar =
        <div className={styles.categoryList}>
            <div className={styles.categoryListItem}>
                <div className={styles.squere}></div>
                <div className={styles.itemText}>XL-Объявление</div>
                <div className={styles.itemCount}>38 621</div>
            </div>
            <div className={styles.categoryListItem}>
                <div className={styles.squere} style={{ backgroundColor: "#965326" }}></div>
                <div className={styles.itemText}>Выделение</div>
                <div className={styles.itemCount}>23 655</div>
            </div>
            <div className={styles.categoryListItem}>
                <div className={styles.squere} style={{ backgroundColor: "#603D1B" }}></div>
                <div className={styles.itemText}>x2 просмотр</div>
                <div className={styles.itemCount}>41 003</div>
            </div>
            <div className={styles.categoryListItem}>
                <div className={styles.squere} style={{ backgroundColor: "#FFE898" }}></div>
                <div className={styles.itemText}>Личные вещи</div>
                <div className={styles.itemCount}>15 472</div>
            </div>
            <div className={styles.categoryListItem}>
                <div className={styles.squere} style={{ backgroundColor: "#C1A13C" }}></div>
                <div className={styles.itemText}>x5 просмотр</div>
                <div className={styles.itemCount}>30 648</div>
            </div>
            <div className={styles.categoryListItem}>
                <div className={styles.squere} style={{ backgroundColor: "#5D641E" }}></div>
                <div className={styles.itemText}>x10 просмотр</div>
                <div className={styles.itemCount}>18 917</div>
            </div>
        </div>
    const salesCategorySidebar = <div className={styles.categoryList}>
        <div className={styles.categoryListItem}>
            <div className={styles.squere}></div>
            <div className={styles.itemText}>Транспорт</div>
            <div className={styles.itemCount}>27 452</div>
        </div>
        <div className={styles.categoryListItem}>
            <div className={styles.squere} style={{ backgroundColor: "#965326" }}></div>
            <div className={styles.itemText}>Недвижимость</div>
            <div className={styles.itemCount}>41 837</div>
        </div>
        <div className={styles.categoryListItem}>
            <div className={styles.squere} style={{ backgroundColor: "#603D1B" }}></div>
            <div className={styles.itemText}>Работа</div>
            <div className={styles.itemCount}>36 784</div>
        </div>
        <div className={styles.categoryListItem}>
            <div className={styles.squere} style={{ backgroundColor: "#FFE898" }}></div>
            <div className={styles.itemText}>Личные вещи</div>
            <div className={styles.itemCount}>17 599</div>
        </div>
        <div className={styles.categoryListItem}>
            <div className={styles.squere} style={{ backgroundColor: "#C1A13C" }}></div>
            <div className={styles.itemText}>Для дома и дачи</div>
            <div className={styles.itemCount}>36 123</div>
        </div>
        <div className={styles.categoryListItem}>
            <div className={styles.squere} style={{ backgroundColor: "#5D641E" }}></div>
            <div className={styles.itemText}>Электроника</div>
            <div className={styles.itemCount}>14 125</div>
        </div>
        <div className={styles.categoryListItem}>
            <div className={styles.squere} style={{ backgroundColor: "#BAD0C4" }}></div>
            <div className={styles.itemText}>Хобби и отдых</div>
            <div className={styles.itemCount}>47 156</div>
        </div>
        <div className={styles.categoryListItem}>
            <div className={styles.squere} style={{ backgroundColor: "#7CAED1" }}></div>
            <div className={styles.itemText}>Животные</div>
            <div className={styles.itemCount}>31 495</div>
        </div>
        <div className={styles.categoryListItem}>
            <div className={styles.squere} style={{ backgroundColor: "#98D3F1" }}></div>
            <div className={styles.itemText}>Готовый бизнес и обор...</div>
            <div className={styles.itemCount}>43 322</div>
        </div>
        <div className={styles.categoryListItem}>
            <div className={styles.squere} style={{ backgroundColor: "#94D0B3" }}></div>
            <div className={styles.itemText}>Услуги</div>
            <div className={styles.itemCount}>28 573</div>
        </div>

    </div>
    const salesServiceSidebar =
        <div className={styles.categoryList}>
            <div className={styles.categoryListItem}>
                <div className={styles.squere}></div>
                <div className={styles.itemText}>XL-Объявление</div>
                <div className={styles.itemCount}>27 452</div>
            </div>
            <div className={styles.categoryListItem}>
                <div className={styles.squere} style={{ backgroundColor: "#965326" }}></div>
                <div className={styles.itemText}>Выделение</div>
                <div className={styles.itemCount}>41 837</div>
            </div>
            <div className={styles.categoryListItem}>
                <div className={styles.squere} style={{ backgroundColor: "#603D1B" }}></div>
                <div className={styles.itemText}>x2 просмотр</div>
                <div className={styles.itemCount}>36 784</div>
            </div>
            <div className={styles.categoryListItem}>
                <div className={styles.squere} style={{ backgroundColor: "#FFE898" }}></div>
                <div className={styles.itemText}>Личные вещи</div>
                <div className={styles.itemCount}>17 599</div>
            </div>
            <div className={styles.categoryListItem}>
                <div className={styles.squere} style={{ backgroundColor: "#C1A13C" }}></div>
                <div className={styles.itemText}>x5 просмотр</div>
                <div className={styles.itemCount}>36 123</div>
            </div>
            <div className={styles.categoryListItem}>
                <div className={styles.squere} style={{ backgroundColor: "#5D641E" }}></div>
                <div className={styles.itemText}>x10 просмотр</div>
                <div className={styles.itemCount}>14 125</div>
            </div>
        </div>
    const avgPriceCategorySidebar = <div className={styles.categoryList}>
        <div className={styles.categoryListItem}>
            <div className={styles.squere}></div>
            <div className={styles.itemText}>Транспорт</div>
            <div className={styles.itemCount}>1 968</div>
        </div>
        <div className={styles.categoryListItem}>
            <div className={styles.squere} style={{ backgroundColor: "#965326" }}></div>
            <div className={styles.itemText}>Недвижимость</div>
            <div className={styles.itemCount}>4 625</div>
        </div>
        <div className={styles.categoryListItem}>
            <div className={styles.squere} style={{ backgroundColor: "#603D1B" }}></div>
            <div className={styles.itemText}>Работа</div>
            <div className={styles.itemCount}>1 397</div>
        </div>
        <div className={styles.categoryListItem}>
            <div className={styles.squere} style={{ backgroundColor: "#FFE898" }}></div>
            <div className={styles.itemText}>Личные вещи</div>
            <div className={styles.itemCount}>4 837</div>
        </div>
        <div className={styles.categoryListItem}>
            <div className={styles.squere} style={{ backgroundColor: "#C1A13C" }}></div>
            <div className={styles.itemText}>Для дома и дачи</div>
            <div className={styles.itemCount}>3 062</div>
        </div>
        <div className={styles.categoryListItem}>
            <div className={styles.squere} style={{ backgroundColor: "#5D641E" }}></div>
            <div className={styles.itemText}>Электроника</div>
            <div className={styles.itemCount}>2 651</div>
        </div>
        <div className={styles.categoryListItem}>
            <div className={styles.squere} style={{ backgroundColor: "#BAD0C4" }}></div>
            <div className={styles.itemText}>Хобби и отдых</div>
            <div className={styles.itemCount}>3 652</div>
        </div>
        <div className={styles.categoryListItem}>
            <div className={styles.squere} style={{ backgroundColor: "#7CAED1" }}></div>
            <div className={styles.itemText}>Животные</div>
            <div className={styles.itemCount}>799</div>
        </div>
        <div className={styles.categoryListItem}>
            <div className={styles.squere} style={{ backgroundColor: "#98D3F1" }}></div>
            <div className={styles.itemText}>Готовый бизнес и обор...</div>
            <div className={styles.itemCount}>1 592</div>
        </div>
        <div className={styles.categoryListItem}>
            <div className={styles.squere} style={{ backgroundColor: "#94D0B3" }}></div>
            <div className={styles.itemText}>Услуги</div>
            <div className={styles.itemCount}>3 436</div>
        </div>

    </div>
    const avgPriceServiceSidebar =
        <div className={styles.categoryList}>
            <div className={styles.categoryListItem}>
                <div className={styles.squere}></div>
                <div className={styles.itemText}>XL-Объявление</div>
                <div className={styles.itemCount}>1 968</div>
            </div>
            <div className={styles.categoryListItem}>
                <div className={styles.squere} style={{ backgroundColor: "#965326" }}></div>
                <div className={styles.itemText}>Выделение</div>
                <div className={styles.itemCount}>4 625</div>
            </div>
            <div className={styles.categoryListItem}>
                <div className={styles.squere} style={{ backgroundColor: "#603D1B" }}></div>
                <div className={styles.itemText}>x2 просмотр</div>
                <div className={styles.itemCount}>1 397</div>
            </div>
            <div className={styles.categoryListItem}>
                <div className={styles.squere} style={{ backgroundColor: "#FFE898" }}></div>
                <div className={styles.itemText}>Личные вещи</div>
                <div className={styles.itemCount}>4 837</div>
            </div>
            <div className={styles.categoryListItem}>
                <div className={styles.squere} style={{ backgroundColor: "#C1A13C" }}></div>
                <div className={styles.itemText}>x5 просмотр</div>
                <div className={styles.itemCount}>3 062</div>
            </div>
            <div className={styles.categoryListItem}>
                <div className={styles.squere} style={{ backgroundColor: "#5D641E" }}></div>
                <div className={styles.itemText}>x10 просмотр</div>
                <div className={styles.itemCount}>3 062</div>
            </div>
        </div>
    const counterValue = Number(isCheckedConv) + Number(isCheckedAvg) + Number(isCheckedCount) + Number(isCheckedCountAdv)
    useEffect(()=>{
        store.matrix.getLocation()
    },[])
    return (
        <AdminPageLayout title='Статистика' actions={[
            <Button disabled={Boolean(!(counterValue))}counterValue={counterValue > 0 ? counterValue : undefined} onClick={downloadImage} key={"clone"}>Сформировать отчет</Button>,
            <Button onClick={toggleDrawer(true)} key={"logs"} type={"secondary"}>
                Готовые отчёты
            </Button>,
        ]} sticky={false}>
            <div className={styles.buttonsContainer}>
                <Button onClick={() => setActiveSort("all")} color='neutral' type={activeSort === "all" ? "primary" : "tertiary"}>Все</Button>
                <Button onClick={() => setActiveSort("salesCount")} color='neutral' type={activeSort === "salesCount" ? "primary" : "tertiary"}>Количество продаж</Button>
                <Button onClick={() => setActiveSort("avgPrice")} color='neutral' type={activeSort === "avgPrice" ? "primary" : "tertiary"}>Средняя цена</Button>
                <Button onClick={() => setActiveSort("countAD")} color='neutral' type={activeSort === "countAD" ? "primary" : "tertiary"}>Количество объявлений</Button>
                <Button onClick={() => setActiveSort("conversion")} color='neutral' type={activeSort === "conversion" ? "primary" : "tertiary"}>Конверсия</Button>

            </div>
            {(activeSort === "all" || activeSort === "salesCount") && (<div className={styles.statisticContainer}>
                <div className={styles.statisticHeader}>
                    <div className={styles.statisticHeaderCheckbox} onClick={() => setisCheckedCount(!isCheckedCount)}><Checkbox color='accent' checked={isCheckedCount} onChange={setisCheckedCount} /> Количество продаж</div>
                    <div className={styles.inputSearch}>
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
                                    setTimeout(() =>
                                        store.matrixData.setLocationSearch(
                                            store.matrixData.location?.name ?? "",
                                        ), 200
                                    )
                                }
                            />
                        </DropdownList></div>
                    <div className={styles.buttonTime}>
                        <DropdownList options={timeArray} onChange={(option) => setSelectTimePeriod(option.name)}><Button endIcon={<IconArrowDown />} type='outlined'>
                            {selectTimePeriod}
                        </Button>
                        </DropdownList>

                    </div>


                </div>
                <div className={styles.statisticBody}>
                    <div className={styles.statisticBodyleft}>

                        <div className={styles.buttonblock}>
                            <Button onClick={() => setActiveCategoryCount("category")} type={activeCategoryCount === 'category' ? 'primary' : 'tertiary'} color={activeCategoryCount === 'category' ? 'accent' : 'neutral'}>Категории</Button>
                            <Button onClick={() => setActiveCategoryCount("service")} type={activeCategoryCount === 'service' ? 'primary' : 'tertiary'} color={activeCategoryCount === 'service' ? 'accent' : 'neutral'}>Платные услуги</Button>
                        </div>
                        <div className={styles.grafik}>
                            {activeCategoryCount === "category" ? <BarChart
                                width={521}
                                height={198}
                                series={[{
                                    data: [38621, 23655, 41003, 15472, 30648, 18917, 47928, 15237, 42714, 36999],
                                }]}

                                xAxis={
                                    [
                                        { data: ["Транспорт", "Недвижимость", "Работа", "Личные вещи", "Для дома и дачи", "Электроника", "Хобби и отдых", "Животные", "Готовый бизнес и оборудование", "Услуги"], scaleType: 'band' }
                                    ]
                                }
                                colors={['black', '#FFB35D', '#603D1B']}
                                className='MuiBarElement-root'
                            /> : <BarChart
                                width={521}
                                height={198}
                                series={[{
                                    data: [38621, 23655, 41003, 15472, 30648],
                                }]}

                                xAxis={
                                    [
                                        { data: ["XL-Объявление", "Выделение", "x2 просмотр", "x5 просмотр", "x10 просмотр"], scaleType: 'band' }
                                    ]
                                }
                                colors={['black', '#FFB35D', '#603D1B']}
                                className='MuiBarElement-root'
                            />}

                        </div>

                    </div>
                    <div className={styles.statisticBodyright}>
                        {activeCategoryCount === "category" ? /* avgPriceCategorySidebar : avgPriceServiceSidebar */salesCategorySidebar : salesServiceSidebar}

                    </div>
                </div>
            </div>)}
            {(activeSort === "all" || activeSort === "avgPrice") && <div className={styles.statisticContainer}>
                <div className={styles.statisticHeader}>
                    <div onClick={() => setisCheckedAvg(!isCheckedAvg)} className={styles.statisticHeaderCheckbox}><Checkbox color='accent' checked={isCheckedAvg} onChange={setisCheckedAvg} /> Средняя цена</div>
                    <div className={styles.inputSearch}>
                        <DropdownList
                            value={store.matrixData2.location}
                            options={store.matrixData2.locationInputValues}
                            color={"neutral"}
                            fullWidth={true}
                            onChange={(option) => {
                                store.matrixData2.location = option.value as any;
                                store.matrixData2.locationSearch = option.name;
                            }}
                        >
                            <Input
                                placeholder={"Область или город"}
                                onChange={(event) =>
                                    store.matrixData2.setLocationSearch(event.target.value)
                                }
                                value={store.matrixData2.locationSearch}

                                size={"small"}
                                endIcon={
                                    store.matrixData2.locationSearch.length > 0 && (
                                        <ButtonIcon
                                            pale={true}
                                            type="tertiary"
                                            color="neutral"
                                            onClick={() => store.matrixData2.setLocationSearch("")}
                                        >
                                            <IconClear />
                                        </ButtonIcon>
                                    )
                                }
                                onBlur={() =>
                                    setTimeout(() =>
                                        store.matrixData2.setLocationSearch(
                                            store.matrixData2.location?.name ?? "",
                                        ), 200
                                    )
                                }
                            />
                        </DropdownList></div>
                    <div className={styles.buttonTime}>
                        <DropdownList options={timeArray} onChange={(option) => setSelectTimePeriodAvg(option.name)}><Button endIcon={<IconArrowDown />} type='outlined'>
                            {selectTimePeriodAvg}
                        </Button>
                        </DropdownList>

                    </div>


                </div>
                <div className={styles.statisticBody}>
                    <div className={styles.statisticBodyleft}>

                        <div className={styles.buttonblock}>
                            <Button onClick={() => setActiveCategoryAvg("category")} type={activeCategoryAvg === 'category' ? 'primary' : 'tertiary'} color={activeCategoryAvg === 'category' ? 'accent' : 'neutral'}>Категории</Button>
                            <Button onClick={() => setActiveCategoryAvg("service")} type={activeCategoryAvg === 'service' ? 'primary' : 'tertiary'} color={activeCategoryAvg === 'service' ? 'accent' : 'neutral'}>Платные услуги</Button>
                        </div>
                        <div className={styles.grafik}>
                            {activeCategoryAvg === "category" ? <BarChart
                                width={521}
                                height={198}
                                series={[{
                                    data: [1968, 4625, 1397, 4837, 3062, 2651, 3652, 799, 1592, 3436],
                                }]}

                                xAxis={
                                    [
                                        { data: ["Транспорт", "Недвижимость", "Работа", "Личные вещи", "Для дома и дачи", "Электроника", "Хобби и отдых", "Животные", "Готовый бизнес и оборудование", "Услуги"], scaleType: 'band' }
                                    ]
                                }
                                colors={['black', '#FFB35D', '#603D1B']}
                                className='MuiBarElement-root'
                            /> : <BarChart
                                width={521}
                                height={198}
                                series={[{
                                    data: [1968, 4625, 1397, 4837, 3062],
                                }]}

                                xAxis={
                                    [
                                        { data: ["XL-Объявление", "Выделение", "x2 просмотр", "x5 просмотр", "x10 просмотр"], scaleType: 'band' }
                                    ]
                                }
                                colors={['black', '#FFB35D', '#603D1B']}
                                className='MuiBarElement-root'
                            />}

                        </div>

                    </div>
                    <div className={styles.statisticBodyright}>
                        {activeCategoryAvg === "category" ? /* salesCategorySidebar : salesServiceSidebar */ avgPriceCategorySidebar : avgPriceServiceSidebar}

                    </div>
                </div>
            </div>}
            {(activeSort === "all" || activeSort === "countAD") && <div className={styles.statisticContainer}>
                <div className={styles.statisticHeader}>
                    <div className={styles.statisticHeaderCheckbox} onClick={()=>setisCheckedCountAdv(!isCheckedCountAdv)}><Checkbox color='accent' checked={isCheckedCountAdv} onChange={setisCheckedCountAdv} /> Количество объявлений</div>
                    <div className={styles.inputSearch}>
                        <DropdownList
                            value={store.matrixData3.location}
                            options={store.matrixData3.locationInputValues}
                            color={"neutral"}
                            fullWidth={true}
                            onChange={(option) => {
                                store.matrixData3.location = option.value as any;
                                store.matrixData3.locationSearch = option.name;
                            }}
                        >
                            <Input
                                placeholder={"Область или город"}
                                onChange={(event) =>
                                    store.matrixData3.setLocationSearch(event.target.value)
                                }
                                value={store.matrixData3.locationSearch}

                                size={"small"}
                                endIcon={
                                    store.matrixData3.locationSearch.length > 0 && (
                                        <ButtonIcon
                                            pale={true}
                                            type="tertiary"
                                            color="neutral"
                                            onClick={() => store.matrixData3.setLocationSearch("")}
                                        >
                                            <IconClear />
                                        </ButtonIcon>
                                    )
                                }
                                onBlur={() =>
                                    setTimeout(() =>
                                        store.matrixData3.setLocationSearch(
                                            store.matrixData3.location?.name ?? "",
                                        ), 200
                                    )
                                }
                            />
                        </DropdownList></div>
                    <div className={styles.buttonTime}>
                        <DropdownList options={timeArray} onChange={(option) => setSelectTimePeriodAdv(option.name)}><Button endIcon={<IconArrowDown />} type='outlined'>
                            {selectTimePeriodAdv}
                        </Button>
                        </DropdownList>

                    </div>


                </div>
                <div className={styles.statisticBody}>
                    <div className={styles.statisticBodyleft}>

                        <div className={styles.buttonblock}>
                            <Button onClick={() => setActiveCategoryCountAdv("category")} type={activeCategoryCountAdv === 'category' ? 'primary' : 'tertiary'} color={activeCategoryCountAdv === 'category' ? 'accent' : 'neutral'}>Категории</Button>
                            <Button onClick={() => setActiveCategoryCountAdv("service")} type={activeCategoryCountAdv === 'service' ? 'primary' : 'tertiary'} color={activeCategoryCountAdv === 'service' ? 'accent' : 'neutral'}>Платные услуги</Button>
                        </div>
                        <div className={styles.grafik}>
                            {activeCategoryCountAdv === "category" ? <BarChart
                                width={521}
                                height={198}
                                series={[{
                                    data: [27452, 41837, 36784, 17599, 36123, 14125, 47156, 31495, 43322, 28573],
                                }]}

                                xAxis={
                                    [
                                        { data: ["Транспорт", "Недвижимость", "Работа", "Личные вещи", "Для дома и дачи", "Электроника", "Хобби и отдых", "Животные", "Готовый бизнес и оборудование", "Услуги"], scaleType: 'band' }
                                    ]
                                }
                                colors={['black', '#FFB35D', '#603D1B']}
                                className='MuiBarElement-root'
                            /> : <BarChart
                                width={521}
                                height={198}
                                series={[{
                                    data: [27452, 41837, 36784, 17599, 36123],
                                }]}

                                xAxis={
                                    [
                                        { data: ["XL-Объявление", "Выделение", "x2 просмотр", "x5 просмотр", "x10 просмотр"], scaleType: 'band' }
                                    ]
                                }
                                colors={['black', '#FFB35D', '#603D1B']}
                                className='MuiBarElement-root'
                            />}

                        </div>

                    </div>
                    <div className={styles.statisticBodyright}>
                        {activeCategoryCountAdv === "category" ? advPriceCategorySidebar : advPriceServiceSidebar}

                    </div>
                </div>
            </div>}
            {(activeSort === "all" || activeSort === "conversion") && <div className={styles.statisticContainer}>
                <div className={styles.statisticHeader}>
                    <div className={styles.statisticHeaderCheckbox} onClick={()=>setisCheckedConv(!isCheckedConv)}><Checkbox color='accent' checked={isCheckedConv} onChange={setisCheckedConv} /> Конверсия</div>
                    <div className={styles.inputSearch}>
                        <DropdownList
                            value={store.matrixData4.location}
                            options={store.matrixData4.locationInputValues}
                            color={"neutral"}
                            fullWidth={true}
                            onChange={(option) => {
                                store.matrixData4.location = option.value as any;
                                store.matrixData4.locationSearch = option.name;
                            }}
                        >
                            <Input
                                placeholder={"Область или город"}
                                onChange={(event) =>
                                    store.matrixData4.setLocationSearch(event.target.value)
                                }
                                value={store.matrixData4.locationSearch}

                                size={"small"}
                                endIcon={
                                    store.matrixData4.locationSearch.length > 0 && (
                                        <ButtonIcon
                                            pale={true}
                                            type="tertiary"
                                            color="neutral"
                                            onClick={() => store.matrixData4.setLocationSearch("")}
                                        >
                                            <IconClear />
                                        </ButtonIcon>
                                    )
                                }
                                onBlur={() =>
                                    setTimeout(() =>
                                        store.matrixData4.setLocationSearch(
                                            store.matrixData4.location?.name ?? "",
                                        ), 200
                                    )
                                }
                            />
                        </DropdownList></div>
                    <div className={styles.buttonTime}>
                        <DropdownList options={timeArray} onChange={(option) => setSelectTimePeriodConv(option.name)}><Button endIcon={<IconArrowDown />} type='outlined'>
                            {selectTimePeriodConv}
                        </Button>
                        </DropdownList>

                    </div>


                </div>
                <div className={styles.statisticBody}>
                    <div className={styles.statisticBodyleft}>

                        <div className={styles.PieContainer}></div>
                        <div className={styles.grafik}>
                            <PieChart
                                colors={["#FFB35D", '#965326']}
                                series={[
                                    {
                                        data: [
                                            { id: 0, value: 127434, label: 'Объявления без услуг' },
                                            { id: 1, value: 43434, label: 'Используют услуги' },

                                        ],
                                    },
                                ]}

                                width={400}
                                height={200}
                            />

                        </div>

                    </div>
                    <div className={styles.statisticBodyright}>
                        <div className={styles.categoryListItem}>
                            <div className={styles.squere}></div>
                            <div className={styles.itemText}>Объявления без услуг</div>
                            <div className={styles.itemCount}>127 434</div>
                        </div>
                        <div className={styles.categoryListItem}>
                            <div className={styles.squere} style={{ backgroundColor: "#965326" }}></div>
                            <div className={styles.itemText}>Используют услуги</div>
                            <div className={styles.itemCount}>43 434</div>
                        </div>

                    </div>
                </div>

            </div>}
            <Drawer
                anchor='right'
                open={open}
                onClose={toggleDrawer(false)}
            >
                <div className={styles.drawerBlockConteiner}>
                    <div className={styles.drawerBlockHeader}>Готовые отчеты <ButtonIcon size='large' color='neutral' onClick={toggleDrawer(false)}><IconClose /></ButtonIcon></div>
                    <div className={styles.drawerBlock}>
                        <div className={styles.drawerBlockItem}>Отчет за 15.02.2034 <Button onClick={downloadImage} type='tertiary'>Скачать</Button></div>
                        <div className={styles.drawerBlockItem}>Отчет за 11.02.2034 <Button onClick={downloadImage} type='tertiary'>Скачать</Button></div>
                        <div className={styles.drawerBlockItem}>Отчет за 09.02.2034 <Button onClick={downloadImage} type='tertiary'>Скачать</Button></div>
                        <div className={styles.drawerBlockItem}>Отчет за 06.02.2034 <Button onClick={downloadImage} type='tertiary'>Скачать</Button></div>
                        <div className={styles.drawerBlockItem}>Отчет за 01.02.2034 <Button onClick={downloadImage} type='tertiary'>Скачать</Button></div>
                        <div className={styles.drawerBlockItem}>Отчет за 23.01.2034 <Button onClick={downloadImage} type='tertiary'>Скачать</Button></div>
                        <div className={styles.drawerBlockItem}>Отчет за 12.01.2034 <Button onClick={downloadImage} type='tertiary'>Скачать</Button></div>
                    </div>
                </div>
            </Drawer>
        </AdminPageLayout>
    )
});
