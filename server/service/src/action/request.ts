import { Request } from "@dashboard/types";

export class ActionRequest implements Request {
    readonly accessToken?: string;
    readonly parameters?: Map<string, unknown>;

    constructor({
        accessToken,
        parameters,
    }: {
        accessToken?: string;
        parameters?: Map<string, unknown>;
    }) {
        this.accessToken = accessToken;
        this.parameters = parameters;
    }
}
