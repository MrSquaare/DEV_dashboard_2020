import { ServiceRequest } from "./request";
import { ServiceResponse } from "./response";

export interface IServiceAction {
    readonly id: string;
    readonly name: string;
    readonly description: string;

    run(request: ServiceRequest): Promise<ServiceResponse>;
}
