import { Response, UserOAuth } from "@dashboard/types";
import { Router } from "express";
import jwt from "jsonwebtoken";
import passport, { AuthenticateOptions } from "passport";
import {
    authenticationPartiesCallbackRoute,
    jwtSecret,
} from "../../../../../constants";
import { Unique } from "../../../../../types";

export const authenticationPartiesCallbackRouter = Router();

authenticationPartiesCallbackRouter.get(
    authenticationPartiesCallbackRoute,
    (req, res, next) => {
        passport.authenticate(`${req.party.id}-party`, {
            callbackURL: req.query.redirect,
            session: false,
        } as AuthenticateOptions)(req, res, next);
    },
    (req, res) => {
        const user = req.user as UserOAuth;
        const unique: Unique = {
            username: user.username,
            type: user.type,
            provider: user.provider,
        };

        const token = jwt.sign(unique, jwtSecret);

        const responseBody: Response = {
            data: token,
        };

        return res.json(responseBody);
    }
);
