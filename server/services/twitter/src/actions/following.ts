import { ServiceActionSettings } from "@dashboard/service";
import { ServiceActionRequest, ServiceActionResponse } from "@dashboard/types";
import { TwitterUser } from "../models";
import { oauthFetch } from "../utilities";

type Settings = {
    user: string;
};

export class TwitterFollowingAction extends ServiceActionSettings<Settings> {
    readonly id: string = "following";
    readonly name: string = "Following";
    readonly description: string = "Following action";

    async run(request: ServiceActionRequest): Promise<ServiceActionResponse> {
        const token = await this.repository?.read(
            request.user.username,
            "token"
        );
        const tokenSecret = await this.repository?.read(
            request.user.username,
            "tokenSecret"
        );

        if (!token || !tokenSecret) {
            return {
                code: 400,
            };
        }

        const settings = await this.settingsGet(
            request.user.username,
            request.instance
        );

        if (!settings) {
            return {
                code: 400,
            };
        }

        const response = await oauthFetch(
            `https://api.twitter.com/1.1/friends/list.json?screen_name=${settings.user}`,
            token.value,
            tokenSecret.value
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
