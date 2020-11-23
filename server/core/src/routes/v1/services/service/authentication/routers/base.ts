import { Router } from "express";
import passport from "passport";
import {
    jwtStrategyName,
    serviceAuthenticationBaseRoute,
} from "../../../../../../constants";

export const serviceAuthenticationBaseRouter = Router();

serviceAuthenticationBaseRouter.get(
    serviceAuthenticationBaseRoute,
    passport.authenticate(jwtStrategyName, { session: false }),
    (req, res, next) => {
        const userStr = req.user ? JSON.stringify(req.user) : undefined;

        passport.authenticate(req.service.id, {
            session: false,
            state: userStr,
        })(req, res, next);
    }
);
