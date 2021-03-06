import { ServiceActionSettings } from "@dashboard/service";
import { ServiceActionRequest, ServiceActionResponse } from "@dashboard/types";
import fetch from "node-fetch";
import { GitHubUser } from "../models";

type Settings = {
    user: string;
};

export class GitHubFollowersAction extends ServiceActionSettings<Settings> {
    readonly id: string = "followers";
    readonly name: string = "Followers";
    readonly description: string = "Followers action";
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
            `https://api.github.com/users/${settings.user}/followers`
        );

        if (response.status !== 200) {
            return {
                code: response.status,
            };
        }

        const jsonResponse: any[] = await response.json();
        const githubUsers = jsonResponse.map((json: any) => {
            return GitHubUser.fromJSON(json);
        });

        return {
            code: 200,
            data: githubUsers,
        };
    }

    mapRequestToSettings(request: ServiceActionRequest): Partial<Settings> {
        return {
            user: request.parameters?.user,
        };
    }
}
