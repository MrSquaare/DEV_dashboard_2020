import { ServiceOAuth2 } from "@dashboard/service";
import { User } from "@dashboard/types";
import { Strategy as IStrategy } from "passport";
import {
    Strategy,
    StrategyOptionsWithRequest,
    VerifyFunctionWithRequest,
} from "passport-oauth2";

export function strategyFromServiceOAuth2(service: ServiceOAuth2): IStrategy {
    const strategyOptions: StrategyOptionsWithRequest = {
        authorizationURL: service.options.authorizationURL,
        tokenURL: service.options.tokenURL,
        clientID: service.options.clientID,
        clientSecret: service.options.clientSecret,
        scope: service.options.scope,
        scopeSeparator: service.options.scopeSeparator,
        callbackURL: `/v1/services/${service.id}/authentication/callback`,
        passReqToCallback: true,
    };
    const strategyVerify: VerifyFunctionWithRequest = (
        req,
        accessToken,
        refreshToken,
        arg3,
        arg4,
        verified
    ) => {
        return service.verify(req.user as User)(
            accessToken,
            refreshToken,
            verified
        );
    };

    return new Strategy(strategyOptions, strategyVerify);
}
