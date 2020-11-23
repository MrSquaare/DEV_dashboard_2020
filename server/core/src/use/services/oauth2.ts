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
        authorizationURL: service.oauth2Options.authorizationURL,
        tokenURL: service.oauth2Options.tokenURL,
        clientID: service.oauth2Options.clientID,
        clientSecret: service.oauth2Options.clientSecret,
        scope: service.oauth2Options.scope,
        scopeSeparator: service.oauth2Options.scopeSeparator,
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
        return service.oauth2Verify(
            req.user as User,
            accessToken,
            refreshToken,
            verified
        );
    };

    return new Strategy(strategyOptions, strategyVerify);
}
