import { UserSchemaModel, VerificationSchemaModel } from "@dashboard/types";
import { Mailer } from "mailer/mailer";
import Mustache from "mustache";
import { IStrategyOptionsWithRequest, Strategy } from "passport-local";
import { v4 } from "uuid";
import {
    authenticationSignVerifyFullRoute,
    internalServerStatus,
    mailVerifySubject,
    userExistsStatus,
} from "../constants";
import { readFile } from "../utilities/file";

const options: IStrategyOptionsWithRequest = {
    passReqToCallback: true,
};

export function signUpStrategy(mailer: Mailer, host: string) {
    return new Strategy(options, async (req, username, password, done) => {
        try {
            const exists = await UserSchemaModel.exists({
                username: username,
            });

            if (exists) {
                return done(userExistsStatus, false);
            }

            const user = new UserSchemaModel({
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

            const verificationURL =
                (req.body.verificationUrl ||
                    `${host}${authenticationSignVerifyFullRoute}`) +
                `?id=${verification.id}`;

            const mailTemplateBuffer = await readFile(
                __dirname + "/../templates/email/verify.mustache"
            );
            const mailTemplate = mailTemplateBuffer.toString();
            const mailBody = Mustache.render(mailTemplate, {
                firstName: user.firstName,
                lastName: user.lastName,
                verificationURL: verificationURL,
            });

            await mailer.send(user.email, mailVerifySubject, mailBody);

            await user.save();

            await verification.save();

            return done(null, user);
        } catch (err) {
            return done(internalServerStatus);
        }
    });
}
