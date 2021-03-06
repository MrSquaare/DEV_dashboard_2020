import { Router } from "express";
import passport, { AuthenticateOptions } from "passport";
import { serviceAuthenticationBaseRoute } from "../../../../../../constants";

export const serviceAuthenticationBaseRouter = Router();

serviceAuthenticationBaseRouter.get(
    serviceAuthenticationBaseRoute,
    (req, res, next) => {
        passport.authenticate(`${req.service.id}-service`, {
            callbackURL: req.query.redirect,
            session: false,
            failWithError: true,
        } as AuthenticateOptions)(req, res, next);
    }
);
