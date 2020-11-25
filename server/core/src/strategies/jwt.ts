import { UserLocalRepository, UserOAuthRepository } from "@dashboard/database";
import { User } from "@dashboard/types";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { Strategy } from "passport-custom";
import {
    internalServerErrorStatus,
    jwtInvalid,
    jwtSecret,
    unauthorized,
    userDoesntExist,
} from "../constants";
import { Unique } from "../types";

export function jwtStrategy(
    userLocalRepository: UserLocalRepository,
    userOAuthRepository: UserOAuthRepository
) {
    return new Strategy(async (req, done) => {
        try {
            const authorization = req.headers.authorization?.split(" ");

            if (!authorization) {
                return done(unauthorized);
            }

            if (authorization[0] !== "JWT") {
                return done(unauthorized);
            }

            const token = authorization[1];

            const unique = jwt.verify(token, jwtSecret) as Unique;

            let user: User | undefined;

            if (unique.type === "local") {
                user = await userLocalRepository.read(unique.username);
            } else if (unique.type === "oauth" && unique.provider) {
                user = await userOAuthRepository.read(
                    unique.username,
                    unique.provider
                );
            }

            if (!user) {
                return done(userDoesntExist);
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
