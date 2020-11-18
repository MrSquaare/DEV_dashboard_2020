import { ServiceModel } from "@dashboard/service";

export class UserModel implements ServiceModel {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}
