import { ServiceRequest } from "../model/request";
import { ServiceResponse } from "../model/response";

export abstract class ServiceAction {
    abstract readonly id: string;
    abstract readonly name: string;
    abstract readonly description: string;

    abstract run(request: ServiceRequest): Promise<ServiceResponse>;
}
