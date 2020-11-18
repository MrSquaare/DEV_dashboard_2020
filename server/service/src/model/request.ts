import { RequestModel, UserModel } from "@dashboard/types";

export class ServiceRequest implements RequestModel {
    readonly parameters?: Map<string, unknown>;
    readonly user?: UserModel;

    constructor({
        parameters,
        user,
    }: {
        parameters?: Map<string, unknown>;
        user?: UserModel;
    }) {
        this.parameters = parameters;
        this.user = user;
    }
}
