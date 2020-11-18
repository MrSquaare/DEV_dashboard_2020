import { ResponseModel, UserModel } from "@dashboard/types";
import express, { Router } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import {
    authenticationVerifyRoute,
    verifyStrategyName,
} from "../../../../constants";
import { errorMiddleware } from "../../../../middlewares";
import { jwtSecret } from "../../../../variables";

export const authenticationVerifyRouter = Router();

authenticationVerifyRouter.get(
    authenticationVerifyRoute,
    passport.authenticate(verifyStrategyName, {
        failWithError: true,
        session: false,
    }),
    (req: express.Request, res: express.Response) => {
        const user = req.user as UserModel;
        const token = jwt.sign({ username: user.username }, jwtSecret);
        const resBody: ResponseModel = {
            data: token,
        };

        return res.json(resBody);
    },
    errorMiddleware()
);
