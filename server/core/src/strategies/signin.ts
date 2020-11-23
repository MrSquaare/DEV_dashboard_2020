import { UserRepository } from "@dashboard/database";
import { Strategy } from "passport-custom";

export function signInStrategy(repository: UserRepository) {
    return new Strategy(async (req, done) => {
        try {
            const username = req.body.username;
            const password = req.body.password;

            if (!username || !password) {
                return done(null, false);
            }

            const user = await repository.read(username);

            if (!user || !user.verified) {
                return done(null, false);
            }

            const valid = await repository.comparePassword(username, password);

            if (!valid) {
                return done(null, false);
            }

            return done(null, user);
        } catch (e) {
            return done(e);
        }
    });
}
