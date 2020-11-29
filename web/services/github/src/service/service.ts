import { Service, Widget } from "@dashboard-web/service";
import { GitHub, SvgIconComponent } from "@material-ui/icons";
import { UserWidget } from "../widgets";
import { FollowersWidget } from "../widgets/followers";
import { FollowingWidget } from "../widgets/following";

export class GitHubService extends Service {
    readonly id: string = "github";
    readonly name: string = "GitHub";
    readonly description: string = "GitHub widget collection";
    readonly version: string = "1.0.0";
    readonly widgets: Widget[] = [
        new FollowersWidget(),
        new FollowingWidget(),
        new UserWidget(),
    ];
    readonly icon: SvgIconComponent = GitHub;
}
