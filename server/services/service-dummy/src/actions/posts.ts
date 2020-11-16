import { Action, ActionRequest, ActionResponse } from "@dashboard/service";
import { PostModel } from "../models";
import fetch from "node-fetch";

export class PostsAction extends Action {
    readonly id: string = "posts";
    readonly name: string = "Posts";
    readonly description: string = "GET /posts";

    async run(request: ActionRequest): Promise<ActionResponse> {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts"
        );
        const json: any[] = await response.json();
        const data = json.map((item) => item as PostModel);

        return new ActionResponse({
            status: response.status,
            data: data,
        });
    }
}
