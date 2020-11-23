import { UserRepository } from "@dashboard/database";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { Strategy } from "passport-custom";
import {
    badRequestStatus,
    internalServerErrorStatus,
    jwtInvalid,
    jwtSecret,
    userDontExist,
} from "../constants";

export function jwtStrategy(repository: UserRepository) {
    return new Strategy(async (req, done) => {
        try {
            const authorization = req.headers.authorization?.split(" ");

            if (!authorization) {
                return done(badRequestStatus);
            }

            if (authorization[0] !== "JWT") {
                return done(badRequestStatus);
            }

            const token = authorization[1];

            const username = jwt.verify(token, jwtSecret);

            const user = await repository.read(username.toString());

            if (!user) {
                return done(userDontExist);
            }

            return done(null, user);
        } catch (e) {
            if (e instanceof JsonWebTokenError) {
                return done(jwtInvalid);
            }

            console.error(e);

            return done(internalServerErrorStatus);
        }
    });
}
