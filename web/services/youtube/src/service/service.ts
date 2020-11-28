import { Service, Widget } from "@dashboard-web/service";
import { ChannelWidget, VideoWidget } from "../widgets";
import {YouTube, SvgIconComponent} from "@material-ui/icons";

export class YouTubeService extends Service {
    readonly id: string = "youtube";
    readonly name: string = "YouTube";
    readonly description: string = "YouTube widget collection";
    readonly version: string = "1.0.0";
    readonly widgets: Widget[] = [new ChannelWidget(), new VideoWidget()];
    readonly icon: SvgIconComponent = YouTube;
}
