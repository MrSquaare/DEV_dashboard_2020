import { UserSchemaModel, VerificationSchemaModel } from "@dashboard/types";
import { Mailer } from "mailer/mailer";
import { Strategy } from "passport-local";
import { v4 } from "uuid";

export function signUpStrategy(mailer: Mailer) {
    const signUpStrategy = new Strategy(
        { passReqToCallback: true },
        (req, username, password, done) => {
            UserSchemaModel.findOne(
                { username: username },
                async (err, user) => {
                    if (err) {
                        return done(err);
                    }

                    if (user) {
                        return done(null, false, {
                            message: "User already exists",
                        });
                    }

                    user = new UserSchemaModel({
                        username: username,
                        password: password,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                    });
                    const verification = new VerificationSchemaModel({
                        id: v4(),
                        username: user.username,
                    });

                    try {
                        await mailer.send(
                            user.email,
                            "Verify your account",
                            "Verify your account : " +
                                "http://localhost:4242/v1/authentication/verify/" +
                                verification.id
                        );
                    } catch (err) {
                        done(err);
                    }

                    await user.save((err) => {
                        if (err) {
                            done(err);
                        }
                    });

                    await verification.save((err) => {
                        if (err) {
                            done(err);
                        }
                    });

                    return done(null, user);
                }
            );
        }
    );

    return signUpStrategy;
}
