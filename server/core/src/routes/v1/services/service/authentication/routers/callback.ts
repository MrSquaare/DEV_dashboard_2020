import { Router } from "express";
import passport from "passport";
import {
    jwtStrategyName,
    serviceAuthenticationCallbackRoute,
} from "../../../../../../constants";

export const serviceAuthenticationCallbackRouter = Router();

serviceAuthenticationCallbackRouter.get(
    serviceAuthenticationCallbackRoute,
    passport.authenticate(jwtStrategyName, { session: false }),
    (req, res, next) => {
        passport.authenticate(`${req.service.id}-service`, {
            session: false,
            failWithError: true,
        })(req, res, next);
    },
    (req, res) => {
        return res.json({});
    }
);
