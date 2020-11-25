import {
    OAuth2,
    OAuth2Options,
    OAuth2Profile,
    OAuth2Verify,
} from "@dashboard/oauth";
import { Profile } from "passport";
import OAuth2Strategy from "passport-oauth2";
import { signStrategy } from "../common/sign";
import { StrategyParty } from "../common/strategy";

export abstract class StrategyPartyOAuth2
    extends StrategyParty
    implements OAuth2 {
    abstract readonly id: string;
    abstract readonly options: OAuth2Options;

    abstract profile(this: OAuth2Strategy): OAuth2Profile;

    verify(profile: Profile): OAuth2Verify {
        return async (token, tokenSecret, done) => {
            return await signStrategy(this.repository, profile, done);
        };
    }
}
