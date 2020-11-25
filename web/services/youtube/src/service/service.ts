import { Service, Widget } from "@dashboard-web/service";
import { ChannelWidget, VideoWidget } from "../widgets";

export class WeatherService extends Service {
    readonly id: string = "youtube";
    readonly name: string = "YouTube";
    readonly description: string = "YouTube widget collection";
    readonly version: string = "1.0.0";
    readonly widgets: Widget[] = [new ChannelWidget(), new VideoWidget()];
}
