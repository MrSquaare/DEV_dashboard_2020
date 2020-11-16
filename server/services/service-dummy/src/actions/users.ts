import { Action, ActionRequest, ActionResponse } from "@dashboard/service";
import fetch from "node-fetch";
import { UserModel } from "../models";

export class UsersAction extends Action {
    readonly id: string = "users";
    readonly name: string = "Users";
    readonly description: string = "GET /users";

    async run(request: ActionRequest): Promise<ActionResponse> {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );
        const json: any[] = await response.json();
        const data = json.map((item) => item as UserModel);

        return new ActionResponse({
            status: response.status,
            data: data,
        });
    }
}
