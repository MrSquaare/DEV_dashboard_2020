import { Response, User } from "@dashboard/types";
import { Router } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import {
    authenticationVerifyRoute,
    jwtSecret,
    verifyStrategyName,
} from "../../../../constants";

export const authenticationVerifyRouter = Router();

authenticationVerifyRouter.get(
    authenticationVerifyRoute,
    passport.authenticate(verifyStrategyName, { session: false }),
    (req, res) => {
        const user = req.user as User;

        const token = jwt.sign(user.username, jwtSecret);

        const responseBody: Response = {
            data: token,
        };

        return res.json(responseBody);
    }
);
