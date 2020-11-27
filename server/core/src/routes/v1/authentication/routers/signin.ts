import { Response, UserLocal } from "@dashboard/types";
import { Router } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import {
    authenticationSignInRoute,
    jwtSecret,
    signInStrategyName,
} from "../../../../constants";
import { Unique } from "../../../../types";

export const authenticationSignInRouter = Router();

authenticationSignInRouter.post(
    authenticationSignInRoute,
    passport.authenticate(signInStrategyName, { session: false }),
    (req, res) => {
        const user = req.user as UserLocal;
        const unique: Unique = {
            username: user.username,
            type: user.type,
        };

        const token = jwt.sign(unique, jwtSecret);

        const responseBody: Response = {
            data: token,
        };

        return res.json(responseBody);
    }
);
