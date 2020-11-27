import { badRequestStatus, ServiceActionSettings } from "@dashboard/service";
import { ServiceActionRequest, ServiceActionResponse } from "@dashboard/types";
import { youtubeKey } from "../constants";
import { YouTubeVideo } from "../models";
import fetch from "node-fetch";

type Settings = {
    videoURL: string;
};

export class YouTubeVideoAction extends ServiceActionSettings<Settings> {
    readonly id: string = "video";
    readonly name: string = "Video";
    readonly description: string = "Video action";
    readonly settings: Record<keyof Settings, string> = {
        videoURL: "string",
    };

    async run(request: ServiceActionRequest): Promise<ServiceActionResponse> {
        const settings = await this.settingsGet(
            request.user.username,
            request.instance
        );

        if (!settings) {
            throw badRequestStatus;
        }

        const videoURL = new URL(settings.videoURL);

        const querySelector = `id=${videoURL.searchParams.get("v")}`;
        const queryParts = `part=snippet&part=statistics`;

        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?${queryParts}&${querySelector}&key=${youtubeKey}`
        );

        if (response.status !== 200) {
            return {
                code: response.status,
            };
        }

        const jsonResponse = await response.json();

        const video = YouTubeVideo.fromJSON(jsonResponse);

        return {
            code: 200,
            data: video,
        };
    }

    mapRequestToSettings(request: ServiceActionRequest): Partial<Settings> {
        return {
            videoURL: request.parameters?.videoURL,
        };
    }
}
