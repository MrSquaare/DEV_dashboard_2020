import { Strategy } from "passport";
import { ServiceAction } from "../action";

export abstract class Service {
    abstract readonly id: string;
    abstract readonly name: string;
    abstract readonly description: string;
    abstract readonly version: string;
    abstract readonly actions: ServiceAction[];
    readonly strategy?: Strategy;

    abstract load(): Promise<void>;

    abstract unload(): Promise<void>;
}
