import { makeAutoObservable } from "mobx";
import axios from "axios";
import { GET_ALL_LOGS } from "src/shared/api/endpoints";


export class JournalStore {
    allLogs: [] = []

    constructor() {
        makeAutoObservable(this);
    }

  
    async geAllLogs() {
        try {
            const response = await axios.get(GET_ALL_LOGS);
            this.allLogs=response.data
        } catch (error) {
            console.log(error)
        }
    }

  /*   async logout() {
        await axios.post(LOGOUT_ENDPOINT);
    }

    setUser(user: User | null) {
        this.currentUser = user;
    } */
}
