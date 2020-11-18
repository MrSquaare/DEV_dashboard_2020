import { StatusModel } from "./status";

export interface ResponseModel {
    readonly data?: unknown;
    readonly error?: StatusModel;
    readonly success?: StatusModel;
}
