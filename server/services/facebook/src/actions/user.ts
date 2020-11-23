import fetch from "node-fetch";
import { FacebookUser } from "../models";
import { ServiceActionSettings } from "@dashboard/service";
import { ServiceRequest, ServiceResponse } from "@dashboard/types";

type Settings = {
    user: string;
};

export class FacebookUserAction extends ServiceActionSettings<Settings> {
    readonly id: string = "user";
    readonly name: string = "User";
    readonly description: string = "User action";

    async run(request: ServiceRequest): Promise<ServiceResponse> {
        const accessToken = await this.repository?.read(
            request.user.username,
            "accessToken"
        );

        if (!accessToken) {
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

        const response = await fetch(
            `https://graph.facebook.com/v9.0/${settings.user}?access_token=${accessToken.value}`
        );

        if (response.status !== 200) {
            return {
                code: response.status,
            };
        }

        const json = await response.json();
        const facebookUser = FacebookUser.fromJSON(json);

        return {
            code: 200,
            data: facebookUser,
        };
    }

    mapRequestToSettings(request: ServiceRequest): Partial<Settings> {
        return {
            user: request.parameters?.user,
        };
    }
}
