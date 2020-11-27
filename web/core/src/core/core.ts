import { Service } from "@dashboard-web/service";
import { Configuration } from "../types";

export class Core {
    services?: Service[];

    constructor(configuration: Configuration) {
        this.services = configuration.services;
    }
}
