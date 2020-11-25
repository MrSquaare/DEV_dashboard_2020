import { badRequestStatus, ServiceActionSettings } from "@dashboard/service";
import { ServiceActionRequest, ServiceActionResponse } from "@dashboard/types";
import { youtubeKey } from "../constants";
import { YouTubeChannel } from "../models";
import fetch from "node-fetch";

type Settings = {
    channelURL: string;
};

export class YouTubeChannelAction extends ServiceActionSettings<Settings> {
    readonly id: string = "channel";
    readonly name: string = "Channel";
    readonly description: string = "Channel action";
    readonly settings: Record<keyof Settings, string> = {
        channelURL: "string",
    };

    async run(request: ServiceActionRequest): Promise<ServiceActionResponse> {
        const settings = await this.settingsGet(
            request.user.username,
            request.instance
        );

        if (!settings) {
            throw badRequestStatus;
        }

        const channelURL = new URL(settings.channelURL);

        let querySelector: string;

        if (channelURL.pathname.startsWith("/channel/")) {
            const channelID = channelURL.pathname.substring("/channel/".length);

            querySelector = `id=${channelID}`;
        } else {
            const channelCustomURL = channelURL.pathname;

            querySelector = `forUsername=${channelCustomURL}`;
        }

        const queryParts = `part=snippet&part=statistics`;

        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?${queryParts}&${querySelector}&key=${youtubeKey}`
        );

        if (response.status !== 200) {
            return {
                code: response.status,
            };
        }

        const jsonResponse = await response.json();

        const channel = YouTubeChannel.fromJSON(jsonResponse);

        return {
            code: 200,
            data: channel,
        };
    }

    mapRequestToSettings(request: ServiceActionRequest): Partial<Settings> {
        return {
            channelURL: request.parameters?.channelURL,
        };
    }
}
