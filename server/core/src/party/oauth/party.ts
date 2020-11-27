import {
    OAuth,
    OAuthOptions,
    OAuthProfile,
    OAuthVerify,
} from "@dashboard/oauth";
import { Profile } from "passport";
import { Party } from "../party";
import { signStrategy } from "../common/sign";

export abstract class PartyOAuth extends Party implements OAuth {
    abstract readonly id: string;
    abstract readonly options: OAuthOptions;

    abstract profile(): OAuthProfile;

    verify(profile: Profile): OAuthVerify {
        return async (token, tokenSecret, done) => {
            return await signStrategy(this.repository, profile, done);
        };
    }
}
