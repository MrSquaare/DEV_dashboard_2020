import { ServiceModel } from "@dashboard/service";
import { UserModel } from "./user";

export class RepositoryModel implements ServiceModel {
    id: number;
    name: string;
    owner: UserModel;

    constructor(id: number, name: string, owner: UserModel) {
        this.id = id;
        this.name = name;
        this.owner = owner;
    }

    static fromJSON(json: any): RepositoryModel {
        return new RepositoryModel(
            json.id,
            json.name,
            UserModel.fromJSON(json.owner)
        );
    }
}
