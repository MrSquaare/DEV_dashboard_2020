import { Router } from "express";
import passport from "passport";
import { serviceAuthenticationCallbackRoute } from "../../../../../../constants";

export const serviceAuthenticationCallbackRouter = Router();

serviceAuthenticationCallbackRouter.get(
    serviceAuthenticationCallbackRoute,
    (req, res, next) => {
        const userStr = req.query.state as string;

        if (userStr) {
            req.user = JSON.parse(userStr);
        }

        passport.authenticate(req.service.id, { session: false })(
            req,
            res,
            next
        );
    }
);
