import { Router } from "express";
import passport, { AuthenticateOptions } from "passport";
import {
    authenticationPartiesBaseRoute,
} from "../../../../../constants";

export const authenticationPartiesBaseRouter = Router();

authenticationPartiesBaseRouter.get(
    authenticationPartiesBaseRoute,
    (req, res, next) => {
        passport.authenticate(`${req.party.id}-party`, {
            callbackURL: req.query.redirect,
            session: false,
        } as AuthenticateOptions)(req, res, next);
    }
);
