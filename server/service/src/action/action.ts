import { ActionRequest } from "./request";
import { ActionResponse } from "./response";

export abstract class Action {
    abstract readonly id: string;
    abstract readonly name: string;
    abstract readonly description: string;

    abstract run(request: ActionRequest): Promise<ActionResponse>;
}
