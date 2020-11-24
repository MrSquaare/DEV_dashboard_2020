import { UserOAuthRepository } from "@dashboard/database";
import { OAuth2VerifyCallback, OAuthVerifyCallback } from "@dashboard/oauth";
import { UserOAuth } from "@dashboard/types";
import { Profile } from "passport";
import { internalServerErrorStatus } from "../../constants";

export async function signStrategy(
    repository: UserOAuthRepository,
    profile: Profile,
    done: OAuthVerifyCallback | OAuth2VerifyCallback
) {
    try {
        const username = `${profile.username}-${profile.provider}`;

        const exists = await repository.read(username, profile.provider);

        if (exists) {
            return done(undefined, exists);
        }

        const email = profile.emails?.shift()?.value || "unknown";
        const firstName = profile.displayName || "unknown";
        const lastName = profile.displayName || "unknown";

        const user: UserOAuth = {
            username: username,
            email: email,
            firstName: firstName,
            lastName: lastName,
            type: "oauth",
            verified: true,
            provider: profile.provider,
        };

        await repository.create(user);

        return done(undefined, user);
    } catch (e) {
        console.error(e);

        return done(internalServerErrorStatus);
    }
}
