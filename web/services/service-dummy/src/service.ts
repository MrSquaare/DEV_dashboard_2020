import { Service, Widget } from "@dashboard-web/service";
import { PostsWidget, UsersWidget } from "./widgets";

export class DummyService extends Service {
    readonly id: string = "dummy";
    readonly name: string = "Dummy";
    readonly description: string = "A really dummy widget collection";
    readonly version: string = "1.0.0";
    readonly widgets: Widget[] = [new PostsWidget(), new UsersWidget()];
}
