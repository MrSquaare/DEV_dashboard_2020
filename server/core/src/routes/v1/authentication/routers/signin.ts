import { Response, User } from "@dashboard/types";
import { Router } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import {
    authenticationSignInRoute,
    jwtSecret,
    signInStrategyName,
} from "../../../../constants";

export const authenticationSignInRouter = Router();

authenticationSignInRouter.post(
    authenticationSignInRoute,
    passport.authenticate(signInStrategyName, { session: false }),
    (req, res) => {
        const user = req.user as User;

        const token = jwt.sign(user.username, jwtSecret);

        const responseBody: Response = {
            data: token,
        };

        return res.json(responseBody);
    }
);
