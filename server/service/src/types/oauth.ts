import { User } from "@dashboard/types";

export type ServiceOAuthOptions = {
    requestTokenURL: string;
    accessTokenURL: string;
    userAuthorizationURL: string;
    consumerKey: string;
    consumerSecret: string;
};

export type ServiceOAuthVerify = (
    user: User,
    token: string,
    tokenSecret: string,
    verify: ServiceOAuthVerifyCallback
) => void;

export type ServiceOAuthVerifyCallback = (err?: Error, user?: object) => void;
