import { makeAutoObservable } from "mobx";
import axios from "axios";
import { GET_ALL_CATEGORY, GET_ALL_LOCATION, GET_ALL_MATRIX, GET_ALL_SEGMENTS } from "src/shared/api/endpoints.ts";
import { MatrixData } from "../pages/MatrixListPage";

interface locationTypes {
    id: number;
    name: string;
    parentLocationId: number | null
}

export class MatrixStore {
    allMatrix: MatrixData[] = [];
    location: locationTypes[] = []
    category: locationTypes[] = []
    segment: number[] = []
    activeMatrixID: number[] = []
    constructor() {
        makeAutoObservable(this);
    }

    async getMatrix() {
        try {
            const response = await axios.get(GET_ALL_MATRIX);
            this.setMatrix(response.data);
            this.setActiveMatrixId()
        } catch (error) {
            console.log(error)
        }
    }

    async saveMatrix(matrix: MatrixData) {
        try {
            await axios.put(GET_ALL_MATRIX, matrix);
        } catch (error) {
            console.log(error)
        }
    }


    async getLocation() {
        try {
            const response = await axios.get(GET_ALL_LOCATION);
            this.location = (response.data);
        } catch (error) {
            console.log(error)
        }
    }
    async getCategory() {
        try {
            const response = await axios.get(GET_ALL_CATEGORY);
            this.category = (response.data);
        } catch (error) {
            console.log(error)
        }
    }
    async getSegment() {
        try {
            const response = await axios.get(GET_ALL_SEGMENTS);
            this.segment = (response.data);
        } catch (error) {
            console.log(error)
        }
    }
    setMatrix(matrix: MatrixData[]) {
        this.allMatrix = matrix;
    }
    pushMatrix(matrix:MatrixData){
        this.allMatrix.push(matrix)
    }
    setActiveMatrixId() {
        const currentActiveDiscount = this.allMatrix.filter((item: any) => item.type === 'DISCOUNT' && item.status === 'ACTIVE');
        for (let i = 0; i < currentActiveDiscount.length; i++) {
            if (this.activeMatrixID.includes(currentActiveDiscount[i].id)) continue
            else { this.activeMatrixID.push(currentActiveDiscount[i].id) }

            
        }

    }

}


