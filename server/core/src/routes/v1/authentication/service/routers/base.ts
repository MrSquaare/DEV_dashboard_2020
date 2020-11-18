import express, { Router } from "express";
import passport from "passport";
import { errorMiddleware } from "../../../../../middlewares";

export const authenticationServiceBaseRouter = Router();

authenticationServiceBaseRouter.all(
    "/",
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
