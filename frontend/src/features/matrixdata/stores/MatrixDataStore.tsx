import { makeAutoObservable } from "mobx";
import { store } from "src/app/stores/AppStore.ts";
import axios from "axios";
import { MATRIX_DATA_ENDPOINT } from "src/shared/api/endpoints.ts";

export interface ICategory {
    id: number;
    name: string;
    parentCategoryId: number | null;
}

export interface ILocation {
    id: number;
    name: string;
    parentLocationId: number | null;
}

export interface MatrixData {
    id: number | null;
    matrixId: number;
    categoryId: number;
    locationId: number;
    price: number | null;
}

export class MatrixDataStore {
    categorySearch = "";
    category: ICategory | null = null;
    location: ILocation | null = null;
    locationSearch = "";
    filter: "all" | "withPrice" = "all";
    matrixData: MatrixData[] = [];
    selectedMatrixData: MatrixData[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    async fetchMatrixData(matrixId: number) {
        try {
            const response = await axios.post(MATRIX_DATA_ENDPOINT, {
                matrixId,
                locationId: this.location?.id ?? 1,
                categoryId: this.category?.id ?? 1,
            });
            this.matrixData = response.data;
        } catch (e) {
            console.error(e);
        }
    }

    async saveMatrixData() {
        try {
            const response = await axios.put(MATRIX_DATA_ENDPOINT, this.matrixData);
            this.matrixData = response.data;
        } catch (e) {
            console.error(e);
        }
    }

    getMatrixDataByLocationIdAndCategoryId(locationId: number, categoryId: number) {
        return this.matrixData.find(
            (matrixData) =>
                matrixData.categoryId === categoryId && matrixData.locationId === locationId,
        );
    }

    getSelectedMatrixDataByLocationIdAndCategoryId(locationId: number, categoryId: number) {
        return this.selectedMatrixData.find(
            (matrixData) =>
                matrixData.categoryId === categoryId && matrixData.locationId === locationId,
        );
    }

    getRootCategory() {
        return this.category ?? (store.matrix.category[0] as unknown as ICategory);
    }

    getCategories() {
        return store.matrix.category.filter(
            (c: any) => c.parentCategoryId === this.getRootCategory().id,
        ) as unknown as ICategory[];
    }

    getRootLocation() {
        return this.location ?? (store.matrix.location[0] as ILocation);
    }

    getLocations() {
        return store.matrix.location
            .filter((c: any) => c.parentLocationId === this.getRootLocation().id)
            .sort((a, b) => a.name.localeCompare(b.name)) as ILocation[];
    }

    setCategorySearch(categorySearch: string) {
        this.categorySearch = categorySearch;
        if (!categorySearch) {
            this.category = null;
        }
    }

    setLocationSearch(locationSearch: string) {
        this.locationSearch = locationSearch;
        if (!locationSearch) {
            this.location = null;
        }
    }

    get categoryInputValues() {
        const values = store.matrix.category
            .filter((category) =>
                category.name.toLowerCase().includes(this.categorySearch.toLowerCase()),
            )
            .map((category) => ({
                name: category.name,
                value: category,
            }));
        if (values.length === 0) {
            return [
                {
                    name: "Категории на найдены",
                    value: null,
                },
            ];
        }
        return values;
    }

    get locationInputValues() {
        const values = store.matrix.location
            .filter((location) =>
                location.name.toLowerCase().includes(this.locationSearch.toLowerCase()),
            )
            .map((location) => ({
                name: location.name,
                value: location,
            }));
        if (values.length === 0) {
            return [
                {
                    name: "Локации на найдены",
                    value: null,
                },
            ];
        }
        return values;
    }
}
