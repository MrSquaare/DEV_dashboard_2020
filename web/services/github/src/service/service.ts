import { Service, Widget } from "@dashboard-web/service";
import { UserWidget } from "../widgets";

export class GitHubService extends Service {
    readonly id: string = "github";
    readonly name: string = "GitHub";
    readonly description: string = "GitHub widget collection";
    readonly version: string = "1.0.0";
    readonly widgets: Widget[] = [new UserWidget()];
}
