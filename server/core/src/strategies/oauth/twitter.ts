import { OAuthOptions, OAuthProfile } from "@dashboard/oauth";
import {
    twitterConsumerKey,
    twitterConsumerSecret,
} from "@dashboard/service-twitter/build/constants";
import { Profile } from "passport";
import OAuthStrategy from "passport-oauth1";
import { StrategyPartyOAuth } from "../../parties/oauth/strategy";

export class TwitterStrategy extends StrategyPartyOAuth {
    readonly id = "twitter";
    readonly options: OAuthOptions = {
        requestTokenURL: "https://api.twitter.com/oauth/request_token",
        accessTokenURL: "https://api.twitter.com/oauth/access_token",
        userAuthorizationURL: "https://api.twitter.com/oauth/authorize",
        consumerKey: twitterConsumerKey,
        consumerSecret: twitterConsumerSecret,
    };

    profile(): OAuthProfile {
        return function (
            this: OAuthStrategy,
            token,
            tokenSecret,
            params: any,
            done
        ) {
            this._oauth.get(
                "https://api.twitter.com/1.1/account/verify_credentials.json",
                token,
                tokenSecret,
                (err: any, data: any) => {
                    if (err) {
                        return done(err);
                    }

                    try {
                        const json = JSON.parse(data);
                        const profile: Profile = {
                            id: json.id,
                            displayName: json.name,
                            username: json.screen_name,
                            provider: "twitter",
                        };

                        return done(undefined, profile);
                    } catch (e) {
                        return done(e);
                    }
                }
            );
        };
    }
}
