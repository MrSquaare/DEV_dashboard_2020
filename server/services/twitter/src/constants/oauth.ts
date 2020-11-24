import { OAuthClient } from "@dashboard/oauth";
import { twitterConsumerKey, twitterConsumerSecret } from "./environments";

export const oauthClient = new OAuthClient(
    twitterConsumerKey,
    twitterConsumerSecret,
    "HMAC-SHA1"
);
