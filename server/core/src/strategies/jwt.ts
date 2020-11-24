import { UserLocalRepository, UserOAuthRepository } from "@dashboard/database";
import { User } from "@dashboard/types";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { Strategy } from "passport-custom";
import {
    badRequestStatus,
    internalServerErrorStatus,
    jwtInvalid,
    jwtSecret,
    userDontExist,
} from "../constants";
import { Unique } from "../types";

export function jwtStrategy(
    localRepository: UserLocalRepository,
    oauthRepository: UserOAuthRepository
) {
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

            const unique = jwt.verify(token, jwtSecret) as Unique;

            let user: User | undefined;

            if (unique.type === "local") {
                user = await localRepository.read(unique.username);
            } else if (unique.type === "oauth" && unique.provider) {
                user = await oauthRepository.read(
                    unique.username,
                    unique.provider
                );
            }

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
