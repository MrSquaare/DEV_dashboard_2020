import {
    IServiceAction,
    ServiceRequest,
    ServiceResponse,
} from "@dashboard/types";
import { IServiceSettingRepository } from "@dashboard/types";

export abstract class ServiceAction implements IServiceAction {
    abstract readonly id: string;
    abstract readonly name: string;
    abstract readonly description: string;
    protected repository?: IServiceSettingRepository;

    abstract run(request: ServiceRequest): Promise<ServiceResponse>;

    initialize(repository: IServiceSettingRepository) {
        this.repository = repository;
    }
}
