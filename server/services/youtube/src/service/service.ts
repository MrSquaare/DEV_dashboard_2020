import { Service, ServiceAction } from "@dashboard/service";
import { YouTubeChannelAction } from "../actions";
import { YouTubeVideoAction } from "../actions/video";

export class YouTubeService extends Service {
    readonly id = "youtube";
    readonly name = "YouTube";
    readonly description = "YouTube service";
    readonly version = "1.0.0";
    readonly actions: ServiceAction[] = [
        new YouTubeChannelAction(),
        new YouTubeVideoAction(),
    ];
}
