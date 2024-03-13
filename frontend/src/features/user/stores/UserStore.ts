import { makeAutoObservable } from "mobx";
import axios from "axios";
import { AUTHENTICATE_ENDPOINT, LOGOUT_ENDPOINT, USERS_ENDPOINT } from "src/shared/api/endpoints.ts";
import { User } from "src/features/user/types/User.ts";
import { DropdownListOption } from "src/ui/components/DropdownList/DropdownList.types.ts";
import { sortOptions } from "src/features/user/constants/sortOptions.ts";

export class UserStore {
    users: User[] = [];
    currentUser: User | null = null;
    search = "";
    sort: DropdownListOption = sortOptions[0];

    constructor() {
        makeAutoObservable(this);
    }

    get filteredUsers() {
        let users = this.users;
        if (this.search) {
            users = users.filter((user) =>
                user.email.toLowerCase().includes(this.search.toLowerCase()),
            );
        }
        users = users.slice().sort((a, b) => {
            if (this.sort.value === "asc") {
                return a.id - b.id;
            } else {
                return b.id - a.id;
            }
        });
        return users;
    }

    async fetchUsers() {
        const response = await axios.get(USERS_ENDPOINT);
        this.setUsers(response.data);
    }

    async authenticate() {
        try {
            const response = await axios.get(AUTHENTICATE_ENDPOINT);
            this.setUser(response.data);
            return true;
        } catch (error) {
            return false;
        }
    }

    async logout() {
        await axios.post(LOGOUT_ENDPOINT);
    }

    setUser(user: User | null) {
        this.currentUser = user;
    }

    setUsers(users: User[]) {
        this.users = users;
    }

    setSearch(search: string) {
        this.search = search;
    }

    setSort(sort: DropdownListOption) {
        this.sort = sort;
    }
}
