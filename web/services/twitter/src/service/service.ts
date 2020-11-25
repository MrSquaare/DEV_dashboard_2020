import { Service, Widget } from "@dashboard-web/service";
import { UserWidget } from "../widgets";

export class TwitterService extends Service {
    readonly id: string = "twitter";
    readonly name: string = "Twitter";
    readonly description: string = "Twitter widget collection";
    readonly version: string = "1.0.0";
    readonly widgets: Widget[] = [new UserWidget()];
}
