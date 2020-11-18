import { UserSchemaModel } from "@dashboard/types";
import { Strategy } from "passport-local";
import {
    internalServerStatus,
    userNotFoundStatus,
    userNotVerifiedStatus,
} from "../constants";

export function signInStrategy() {
    return new Strategy(async (username, password, done) => {
        try {
            const user = await UserSchemaModel.findOne({
                username: username,
            }).exec();

            if (!user) {
                return done(userNotFoundStatus, false);
            }

            const comparedPassword = await user.comparePassword(password);

            if (!comparedPassword) {
                return done(userNotFoundStatus, false);
            }

            const verified = user.verified;

            if (!verified) {
                return done(userNotVerifiedStatus, false);
            }

            return done(null, user);
        } catch (err) {
            return done(internalServerStatus);
        }
    });
}
