import { ServiceModel } from "./index";
import { ResponseModel, StatusModel } from "@dashboard/types";

export class ServiceResponse implements ResponseModel {
    status: number;
    data?: ServiceModel | ServiceModel[];
    error?: StatusModel;
    success?: StatusModel;

    constructor({
        status,
        data,
        error,
    }: {
        status: number;
        data?: ServiceModel | ServiceModel[];
        error?: StatusModel;
        success?: StatusModel;
    }) {
        this.status = status;
        this.data = data;
        this.error = error;
    }
}
