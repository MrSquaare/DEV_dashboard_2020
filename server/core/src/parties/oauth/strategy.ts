import {
    OAuth,
    OAuthOptions,
    OAuthProfile,
    OAuthVerify,
} from "@dashboard/oauth";
import { Profile } from "passport";
import OAuthStrategy from "passport-oauth1";
import { signStrategy } from "../common/sign";
import { StrategyParty } from "../common/strategy";

export abstract class StrategyPartyOAuth
    extends StrategyParty
    implements OAuth {
    abstract readonly id: string;
    abstract readonly options: OAuthOptions;

    abstract profile(): OAuthProfile;

    verify(profile: Profile): OAuthVerify {
        return async (token, tokenSecret, done) => {
            return await signStrategy(this.repository, profile, done);
        };
    }
}
