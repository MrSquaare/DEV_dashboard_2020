import { ServiceOAuth } from "@dashboard/service";
import { User } from "@dashboard/types";
import { Strategy as IStrategy } from "passport";
import {
    Strategy,
    StrategyOptionsWithRequest,
    VerifyFunctionWithRequest,
} from "passport-oauth1";
import { OAuthSessionStore } from "../store/oauth";

export function strategyFromServiceOAuth(service: ServiceOAuth): IStrategy {
    const strategyOptions: StrategyOptionsWithRequest = {
        requestTokenURL: service.options.requestTokenURL,
        accessTokenURL: service.options.accessTokenURL,
        userAuthorizationURL: service.options.userAuthorizationURL,
        consumerKey: service.options.consumerKey,
        consumerSecret: service.options.consumerSecret,
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
        return service.verify(req.user as User)(token, tokenSecret, verified);
    };

    return new Strategy(strategyOptions, strategyVerify);
}
