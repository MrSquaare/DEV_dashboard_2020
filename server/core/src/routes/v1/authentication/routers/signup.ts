import { UserLocal } from "@dashboard/types";
import { Router } from "express";
import passport from "passport";
import {
    authenticationSignUpRoute,
    internalServerErrorStatus,
    signUpStrategyName,
} from "../../../../constants";
import { verifyTemplate } from "../../../../templates/verify";

export const authenticationSignUpRouter = Router();

authenticationSignUpRouter.post(
    authenticationSignUpRoute,
    passport.authenticate(signUpStrategyName, { session: false }),
    async (req, res, next) => {
        try {
            const user = req.user as UserLocal;
            const custom = req.body.custom;
            const serverURL = `${req.protocol}://${req.hostname}:${req.port}`;
            const baseURL =
                custom?.baseURL || `${serverURL}/v1/authentication/verify`;
            let URL = custom?.URL || `${baseURL}?username=:username&id=:id`;

            URL = URL.replace(":username", user.username);
            URL = URL.replace(":id", user.verification);

            const mail = verifyTemplate(user, {
                baseURL: baseURL,
                URL: URL,
            });

            await req.mailer.send(mail);

            res.send("Success");
        } catch (e) {
            console.error(e);

            return next(internalServerErrorStatus);
        }
    }
);
