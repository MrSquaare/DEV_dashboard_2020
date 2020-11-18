import {
    ServiceAction,
    ServiceRequest,
    ServiceResponse,
} from "@dashboard/service";
import fetch from "node-fetch";
import { UserModel } from "../models";

export class UsersAction extends ServiceAction {
    readonly id: string = "users";
    readonly name: string = "Users";
    readonly description: string = "GET /users";

    async run(request: ServiceRequest): Promise<ServiceResponse> {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );
        const json: unknown[] = await response.json();
        const data = json.map((item) => item as UserModel);

        return new ServiceResponse({
            status: response.status,
            data: data,
        });
    }
}
