import { UserSchemaModel } from "@dashboard/types";
import { Strategy } from "passport-local";

export const signInStrategy = new Strategy((username, password, done) => {
    UserSchemaModel.findOne({ username: username }, async (err, user) => {
        if (err) {
            return done(err);
        }

        if (!user) {
            return done(null, false, { message: "User does not exist" });
        }

        const comparedPassword = await user.comparePassword(password);

        if (!comparedPassword) {
            return done(null, false, { message: "Invalid password" });
        }

        const verified = user.verified;

        if (!verified) {
            return done(null, false, { message: "User not verified" });
        }

        return done(null, user);
    });
});
