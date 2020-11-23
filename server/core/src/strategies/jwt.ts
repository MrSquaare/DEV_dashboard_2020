import { UserRepository } from "@dashboard/database";
import { Strategy } from "passport-custom";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../constants";

export function jwtStrategy(repository: UserRepository) {
    return new Strategy(async (req, done) => {
        try {
            const authorization = req.headers.authorization?.split(" ");

            if (!authorization) {
                return done(null, false);
            }

            if (authorization[0] !== "JWT") {
                return done(null, false);
            }

            const token = authorization[1];

            const username = jwt.verify(token, jwtSecret);

            const user = await repository.read(username.toString());

            if (!user) {
                return done(null, false);
            }

            return done(null, user);
        } catch (e) {
            return done(e);
        }
    });
}
