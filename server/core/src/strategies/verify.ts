import { UserRepository } from "@dashboard/database";
import { Strategy } from "passport-custom";

export function verifyStrategy(repository: UserRepository) {
    return new Strategy(async (req, done) => {
        try {
            const username = req.query.username as string | undefined;
            const id = req.query.id as string | undefined;

            if (!username || !id) {
                return done(null, false);
            }

            const user = await repository.read(username);

            if (!user || user.verified) {
                return done(null, false);
            }

            const valid = await repository.compareVerification(username, id);

            if (!valid) {
                return done(null, false);
            }

            await repository.update(username, { verified: valid });

            return done(null, user);
        } catch (e) {
            return done(e);
        }
    });
}
