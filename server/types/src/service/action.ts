import { ServiceActionRequest } from "./request";
import { ServiceActionResponse } from "./response";

export interface IServiceAction {
    readonly id: string;
    readonly name: string;
    readonly description: string;

    run(request: ServiceActionRequest): Promise<ServiceActionResponse>;
}
