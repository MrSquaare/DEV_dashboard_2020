import { UserSchemaModel, VerificationSchemaModel } from "@dashboard/types";
import { Strategy } from "passport-custom";
import {
    internalServerStatus,
    userNotFoundStatus,
    verificationNotFoundStatus,
} from "../constants";

export function verifyStrategy() {
    return new Strategy(async (req, done) => {
        try {
            const verification = await VerificationSchemaModel.findOneAndDelete(
                {
                    id: req.query.id,
                }
            ).exec();

            if (!verification) {
                return done(verificationNotFoundStatus, false);
            }

            const user = await UserSchemaModel.findOneAndUpdate(
                {
                    username: verification.username,
                },
                {
                    verified: true,
                }
            ).exec();

            if (!user) {
                return done(userNotFoundStatus, false);
            }

            return done(null, user);
        } catch (err) {
            return done(internalServerStatus);
        }
    });
}
