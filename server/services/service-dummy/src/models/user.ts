import { Model } from "@dashboard/service";

export class UserModel implements Model {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}
