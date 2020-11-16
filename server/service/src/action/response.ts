import { Model } from "../model";
import { Response } from "@dashboard/types";

export class ActionResponse implements Response {
    status: number;
    data?: Model | Model[];
    error?: Model | Model[];

    constructor({
        status,
        data,
        error,
    }: {
        status: number;
        data?: Model | Model[];
        error?: Model | Model[];
    }) {
        this.status = status;
        this.data = data;
        this.error = error;
    }
}
