import { Strategy as IStrategy } from "passport";
import {
    Strategy,
    StrategyOptionsWithRequest,
    VerifyFunctionWithRequest,
} from "passport-oauth2";
import { PartyOAuth2 } from "../../party";

export function strategyFromPartyOAuth2(party: PartyOAuth2): IStrategy {
    const strategyOptions: StrategyOptionsWithRequest = {
        authorizationURL: party.options.authorizationURL,
        tokenURL: party.options.tokenURL,
        clientID: party.options.clientID,
        clientSecret: party.options.clientSecret,
        scope: party.options.scope,
        scopeSeparator: party.options.scopeSeparator,
        callbackURL: `/v1/authentication/parties/${party.id}/callback`,
        passReqToCallback: true,
    };
    const strategyVerify: VerifyFunctionWithRequest = (
        req,
        accessToken,
        refreshToken,
        profile,
        params,
        verified
    ) => {
        return party.verify(profile)(accessToken, refreshToken, verified);
    };

    return new Strategy(strategyOptions, strategyVerify);
}
