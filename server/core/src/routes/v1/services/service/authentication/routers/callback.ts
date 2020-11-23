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
        passport.authenticate(req.service.id, { session: false })(
            req,
            res,
            next
        );
    },
    (req, res) => {
        res.send("<script>window.close();</script>");
    }
);
