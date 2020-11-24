import { UserLocalRepository } from "@dashboard/database";
import { Strategy } from "passport-custom";
import {
    badRequestStatus,
    internalServerErrorStatus,
    userDontExist,
    userVerified,
    verificationInvalid,
} from "../../constants";

export function verifyStrategy(repository: UserLocalRepository) {
    return new Strategy(async (req, done) => {
        try {
            const username = req.query.username as string | undefined;
            const id = req.query.id as string | undefined;

            if (!username || !id) {
                return done(badRequestStatus);
            }

            const user = await repository.read(username);

            if (!user) {
                return done(userDontExist);
            }

            if (user.verified) {
                return done(userVerified);
            }

            const valid = await repository.compareVerification(username, id);

            if (!valid) {
                return done(verificationInvalid);
            }

            await repository.update(username, { verified: valid });

            return done(null, user);
        } catch (e) {
            console.error(e);

            return done(internalServerErrorStatus);
        }
    });
}
