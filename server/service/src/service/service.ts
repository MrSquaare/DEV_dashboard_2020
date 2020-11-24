import { ServiceAction } from "../action";
import { IService } from "@dashboard/types";
import { IServiceSettingRepository } from "@dashboard/types";

export abstract class Service implements IService {
    abstract readonly id: string;
    abstract readonly name: string;
    abstract readonly description: string;
    abstract readonly version: string;
    abstract readonly actions: ServiceAction[];

    protected repository?: IServiceSettingRepository;

    initialize(repository: IServiceSettingRepository) {
        this.repository = repository;

        for (const action of this.actions) {
            action.initialize(repository);
        }
    }

    toJSON(): Partial<Service> {
        const { repository, ...rest } = this;

        return rest;
    }
}
