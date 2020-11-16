import { Strategy } from "passport";
import { Action } from "../action";

export abstract class Service {
    abstract readonly id: string;
    abstract readonly name: string;
    abstract readonly description: string;
    abstract readonly version: string;
    abstract readonly actions: Action[];
    readonly strategy?: Strategy;

    abstract load(): Promise<void>;

    abstract unload(): Promise<void>;
}
