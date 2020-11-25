import { UserLocalRepository } from "@dashboard/database";
import { Strategy } from "passport-custom";
import {
    badRequestStatus,
    internalServerErrorStatus,
    userDoesntExist,
    userNotVerified,
} from "../../constants";

export function signInStrategy(repository: UserLocalRepository) {
    return new Strategy(async (req, done) => {
        try {
            const username = req.body.username;
            const password = req.body.password;

            if (!username || !password) {
                return done(badRequestStatus);
            }

            const user = await repository.read(username);

            if (!user) {
                return done(userDoesntExist);
            }

            if (!user.verified) {
                return done(userNotVerified);
            }

            const valid = await repository.comparePassword(username, password);

            if (!valid) {
                return done(userDoesntExist);
            }

            return done(null, user);
        } catch (e) {
            console.error(e);

            return done(internalServerErrorStatus);
        }
    });
}
