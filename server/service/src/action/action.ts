import {
    IServiceAction,
    IServiceSettingRepository,
    ServiceActionRequest,
    ServiceActionResponse,
} from "@dashboard/types";

export abstract class ServiceAction implements IServiceAction {
    abstract readonly id: string;
    abstract readonly name: string;
    abstract readonly description: string;
    protected repository?: IServiceSettingRepository;

    abstract run(request: ServiceActionRequest): Promise<ServiceActionResponse>;

    initialize(repository: IServiceSettingRepository) {
        this.repository = repository;
    }

    toJSON(): Partial<ServiceAction> {
        const { repository, ...rest } = this;

        return rest;
    }
}
