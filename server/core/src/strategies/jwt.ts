import { UserSchemaModel } from "@dashboard/types";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import {
    internalServerStatus,
    jwtInvalidStatus,
    userNotFoundStatus,
} from "../constants";
import { jwtSecret } from "../variables";

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
    secretOrKey: jwtSecret,
};

export function jwtStrategy() {
    return new Strategy(options, async (payload, done) => {
        try {
            if (!payload.username) {
                return done(jwtInvalidStatus, false);
            }

            const user = await UserSchemaModel.findOne({
                username: payload.username,
            }).exec();

            if (!user) {
                return done(userNotFoundStatus, false);
            }

            return done(null, user);
        } catch (err) {
            return done(internalServerStatus);
        }
    });
}
