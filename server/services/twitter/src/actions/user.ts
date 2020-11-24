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

export class TwitterUserAction extends ServiceActionSettings<Settings> {
    readonly id: string = "user";
    readonly name: string = "User";
    readonly description: string = "User action";
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
            `https://api.twitter.com/1.1/users/show.json?screen_name=${settings.user}`
        );

        if (response.status !== 200) {
            return {
                code: response.status,
            };
        }

        const jsonResponse = await response.json();

        const twitterUser = TwitterUser.fromJSON(jsonResponse);

        return {
            code: 200,
            data: twitterUser,
        };
    }

    mapRequestToSettings(request: ServiceActionRequest): Partial<Settings> {
        return {
            user: request.parameters?.user,
        };
    }
}
