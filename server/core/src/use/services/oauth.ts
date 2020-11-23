import { ServiceOAuth } from "@dashboard/service";
import { User } from "@dashboard/types";
import { Strategy as IStrategy } from "passport";
import { Request } from "express";
import {
    Callback,
    SessionStore,
    Strategy,
    StrategyOptionsWithRequest,
    VerifyFunctionWithRequest,
} from "passport-oauth1";

class OAuthSessionStore implements SessionStore {
    private token?: string;
    private tokenSecret?: string;

    destroy(req: Request, token: string, cb: Callback): void {
        this.token = undefined;
        this.tokenSecret = undefined;

        cb();
    }

    get(req: Request, token: string, cb: Callback): void {
        cb(null, this.tokenSecret);
    }

    set(req: Request, token: string, tokenSecret: string, cb: Callback): void {
        this.token = token;
        this.tokenSecret = tokenSecret;

        cb();
    }
}

export function strategyFromServiceOAuth(service: ServiceOAuth): IStrategy {
    const strategyOptions: StrategyOptionsWithRequest = {
        requestTokenURL: service.oauthOptions.requestTokenURL,
        accessTokenURL: service.oauthOptions.accessTokenURL,
        userAuthorizationURL: service.oauthOptions.userAuthorizationURL,
        consumerKey: service.oauthOptions.consumerKey,
        consumerSecret: service.oauthOptions.consumerSecret,
        callbackURL: `/v1/services/${service.id}/authentication/callback`,
        requestTokenStore: new OAuthSessionStore(),
        passReqToCallback: true,
    };
    const strategyVerify: VerifyFunctionWithRequest = (
        req,
        token,
        tokenSecret,
        arg3,
        arg4,
        verified
    ) => {
        return service.oauthVerify(
            req.user as User,
            token,
            tokenSecret,
            verified
        );
    };

    return new Strategy(strategyOptions, strategyVerify);
}
