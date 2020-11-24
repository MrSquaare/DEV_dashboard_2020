import { ServiceActionSettings } from "@dashboard/service";
import { ServiceActionRequest, ServiceActionResponse } from "@dashboard/types";
import fetch from "node-fetch";
import { GitHubUser } from "../models";

type Settings = {
    user: string;
};

export class GitHubUserAction extends ServiceActionSettings<Settings> {
    readonly id: string = "user";
    readonly name: string = "User";
    readonly description: string = "User action";
    readonly settings: Record<keyof Settings, string> = {
        user: "string",
    };

    async run(request: ServiceActionRequest): Promise<ServiceActionResponse> {
        const settings = await this.settingsGet(
            request.user.username,
            request.instance
        );

        if (!settings) {
            return {
                code: 400,
            };
        }

        const response = await fetch(
            `https://api.github.com/users/${settings.user}`
        );

        if (response.status !== 200) {
            return {
                code: response.status,
            };
        }

        const json = await response.json();
        const githubUser = GitHubUser.fromJSON(json);

        return {
            code: 200,
            data: githubUser,
        };
    }

    mapRequestToSettings(request: ServiceActionRequest): Partial<Settings> {
        return {
            user: request.parameters?.user,
        };
    }
}
