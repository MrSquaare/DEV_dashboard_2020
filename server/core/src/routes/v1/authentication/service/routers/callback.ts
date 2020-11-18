import express, { Router } from "express";
import passport from "passport";
import { authenticationServiceCallbackRoute } from "../../../../../constants";
import { errorMiddleware } from "../../../../../middlewares";

export const authenticationServiceCallbackRouter = Router();

authenticationServiceCallbackRouter.all(
    authenticationServiceCallbackRoute,
    (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        return passport.authenticate(req.service.id, {
            failWithError: true,
            session: false,
        })(req, res, next);
    },
    errorMiddleware()
);
