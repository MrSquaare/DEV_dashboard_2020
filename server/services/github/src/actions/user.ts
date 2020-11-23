import fetch from "node-fetch";
import { GitHubUser } from "../models";
import { ServiceActionSettings } from "@dashboard/service";
import { ServiceRequest, ServiceResponse } from "@dashboard/types";

type Settings = {
    user: string;
};

export class GitHubUserAction extends ServiceActionSettings<Settings> {
    readonly id: string = "user";
    readonly name: string = "User";
    readonly description: string = "User action";

    async run(request: ServiceRequest): Promise<ServiceResponse> {
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

    mapRequestToSettings(request: ServiceRequest): Partial<Settings> {
        return {
            user: request.parameters?.user,
        };
    }
}
