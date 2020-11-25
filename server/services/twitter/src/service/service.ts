import { OAuthOptions } from "@dashboard/oauth";
import { ServiceAction, ServiceOAuth } from "@dashboard/service";
import {
    TwitterFollowersAction,
    TwitterFollowingAction,
    TwitterUserAction,
} from "../actions";
import { twitterConsumerKey, twitterConsumerSecret } from "../constants";

export class TwitterService extends ServiceOAuth {
    readonly id = "twitter";
    readonly name = "Twitter";
    readonly description = "Twitter service";
    readonly version = "1.0.0";
    readonly actions: ServiceAction[] = [
        new TwitterFollowersAction(),
        new TwitterFollowingAction(),
        new TwitterUserAction(),
    ];
    readonly options: OAuthOptions = {
        requestTokenURL: "https://api.twitter.com/oauth/request_token",
        accessTokenURL: "https://api.twitter.com/oauth/access_token",
        userAuthorizationURL: "https://api.twitter.com/oauth/authorize",
        consumerKey: twitterConsumerKey,
        consumerSecret: twitterConsumerSecret,
    };
}
