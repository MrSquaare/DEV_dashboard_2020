import { OAuth2Options } from "@dashboard/oauth";
import { ServiceAction, ServiceOAuth2 } from "@dashboard/service";
import { GitHubUserAction } from "../actions";
import { githubClientId, githubClientSecret } from "../constants";

export class GitHubService extends ServiceOAuth2 {
    readonly id = "github";
    readonly name = "GitHub";
    readonly description = "GitHub service";
    readonly version = "1.0.0";
    readonly actions: ServiceAction[] = [new GitHubUserAction()];
    readonly options: OAuth2Options = {
        authorizationURL: "https://github.com/login/oauth/authorize",
        tokenURL: "https://github.com/login/oauth/access_token",
        clientID: githubClientId,
        clientSecret: githubClientSecret,
    };
}
