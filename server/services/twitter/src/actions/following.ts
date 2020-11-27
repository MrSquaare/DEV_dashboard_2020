import {
    badRequestStatus,
    getOAuthTokens,
    ServiceActionSettings,
} from "@dashboard/service";
import { ServiceActionRequest, ServiceActionResponse } from "@dashboard/types";
import { oauthClient } from "../constants/oauth";
import { TwitterUser } from "../models";

type Settings = {
    user: string;
};

export class TwitterFollowingAction extends ServiceActionSettings<Settings> {
    readonly id: string = "following";
    readonly name: string = "Following";
    readonly description: string = "Following action";
    readonly settings: Record<keyof Settings, string> = {
        user: "string",
    };

    async run(request: ServiceActionRequest): Promise<ServiceActionResponse> {
        const { token, tokenSecret } = await getOAuthTokens(
            request.user.username,
            this.repository
        );

        const settings = await this.settingsGet(
            request.user.username,
            request.instance
        );

        if (!settings) {
            throw badRequestStatus;
        }

        const response = await oauthClient.fetch(
            token,
            tokenSecret,
            `https://api.twitter.com/1.1/friends/list.json?screen_name=${settings.user}`
        );

        if (response.status !== 200) {
            return {
                code: response.status,
            };
        }

        const jsonResponse = await response.json();
        const twitterUsers = jsonResponse.users.map((json: any) => {
            return TwitterUser.fromJSON(json);
        });

        return {
            code: 200,
            data: twitterUsers,
        };
    }

    mapRequestToSettings(request: ServiceActionRequest): Partial<Settings> {
        return {
            user: request.parameters?.user,
        };
    }
}
