import { Strategy as IStrategy } from "passport";
import OAuthStrategy, {
    Strategy,
    StrategyOptionsWithRequest,
    VerifyFunctionWithRequest,
} from "passport-oauth1";
import { StrategyPartyOAuth } from "../../parties/oauth/strategy";
import { OAuthSessionStore } from "../store/oauth";

export function strategyFromPartyOAuth(party: StrategyPartyOAuth): IStrategy {
    const strategyOptions: StrategyOptionsWithRequest = {
        requestTokenURL: party.options.requestTokenURL,
        accessTokenURL: party.options.accessTokenURL,
        userAuthorizationURL: party.options.userAuthorizationURL,
        consumerKey: party.options.consumerKey,
        consumerSecret: party.options.consumerSecret,
        callbackURL: `/v1/authentication/parties/${party.id}/callback`,
        requestTokenStore: new OAuthSessionStore(),
        passReqToCallback: true,
    };
    const strategyVerify: VerifyFunctionWithRequest = (
        req,
        token,
        tokenSecret,
        params,
        profile,
        verified
    ) => {
        return party.verify(profile)(token, tokenSecret, verified);
    };

    const strategy = new Strategy(strategyOptions, strategyVerify);

    strategy.userProfile = party.profile();

    return strategy;
}
