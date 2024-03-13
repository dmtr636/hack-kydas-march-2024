import { makeAutoObservable } from "mobx";
import { store } from "src/app/stores/AppStore.ts";

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

export class MatrixDataStore3 {
    categorySearch = "";
    category: ICategory | null = null;
    location: ILocation | null = null;
    locationSearch = "";
    filter: "all" | "withPrice" = "all";

    constructor() {
        makeAutoObservable(this);
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
            return [{
                name: "Категории на найдены",
                value: null
            }]
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
            return [{
                name: "Локации на найдены",
                value: null
            }]
        }
        return values;
    }
}
