import {
    ServiceAction,
    ServiceRequest,
    ServiceResponse,
} from "@dashboard/service";
import fetch from "node-fetch";
import { PostModel } from "../models";

export class PostsAction extends ServiceAction {
    readonly id: string = "posts";
    readonly name: string = "Posts";
    readonly description: string = "GET /posts";

    async run(request: ServiceRequest): Promise<ServiceResponse> {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts"
        );
        const json: unknown[] = await response.json();
        const data = json.map((item) => item as PostModel);

        return new ServiceResponse({
            status: response.status,
            data: data,
        });
    }
}
