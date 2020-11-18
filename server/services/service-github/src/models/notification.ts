import { ServiceModel } from "@dashboard/service";
import { RepositoryModel } from "./repository";

export class NotificationModel implements ServiceModel {
    id: number;
    title: string;
    type: string;
    repository: RepositoryModel;

    constructor(
        id: number,
        title: string,
        type: string,
        repository: RepositoryModel
    ) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.repository = repository;
    }

    static fromJSON(json: any): NotificationModel {
        return new NotificationModel(
            json.id,
            json.subject.title,
            json.subject.type,
            RepositoryModel.fromJSON(json.repository)
        );
    }
}
