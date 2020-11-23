import { User } from "@dashboard/types";

export type ServiceOAuth2Options = {
    authorizationURL: string;
    tokenURL: string;
    clientID: string;
    clientSecret: string;
    scope?: string | string[];
    scopeSeparator?: string;
};

export type ServiceOAuth2Verify = (
    user: User,
    accessToken: string,
    refreshToken: string,
    verify: ServiceOAuth2VerifyCallback
) => void;

export type ServiceOAuth2VerifyCallback = (err?: Error, user?: object) => void;
