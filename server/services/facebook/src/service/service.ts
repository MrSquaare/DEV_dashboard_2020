import { ServiceAction } from "@dashboard/service";
import { FacebookUserAction } from "../actions";
import { ServiceOAuth2Options } from "@dashboard/service";
import { ServiceOAuth2 } from "@dashboard/service";
import { facebookClientId, facebookClientSecret } from "../constants";

export class FacebookService extends ServiceOAuth2 {
    readonly id = "facebook";
    readonly name = "Facebook";
    readonly description = "Facebook service";
    readonly version = "1.0.0";
    readonly actions: ServiceAction[] = [new FacebookUserAction()];
    readonly oauth2Options: ServiceOAuth2Options = {
        authorizationURL: "https://www.facebook.com/v9.0/dialog/oauth",
        tokenURL: "https://graph.facebook.com/oauth/access_token",
        clientID: facebookClientId,
        clientSecret: facebookClientSecret,
    };
}
