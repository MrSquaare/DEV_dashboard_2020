import { IServiceAction } from "./action";

export interface IService {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly version: string;
    readonly actions: IServiceAction[];
}
