import { UserSchemaModel } from "@dashboard/types";
import { ExtractJwt, Strategy } from "passport-jwt";

export const jwtStrategy = new Strategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET || "unknown",
    },
    (payload, done) => {
        UserSchemaModel.findOne(
            { username: payload.username },
            async (err, user) => {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, false);
                }

                return done(null, user);
            }
        );
    }
);
