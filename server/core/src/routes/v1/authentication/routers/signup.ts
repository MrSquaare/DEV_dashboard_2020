import { ResponseModel } from "@dashboard/types";
import express, { Router } from "express";
import passport from "passport";
import {
    authenticationSignUpRoute,
    signUpStrategyName,
    verificationEmailSentStatus,
} from "../../../../constants";
import { errorMiddleware } from "../../../../middlewares";

export const authenticationSignUpRouter = Router();

authenticationSignUpRouter.post(
    authenticationSignUpRoute,
    passport.authenticate(signUpStrategyName, {
        failWithError: true,
        session: false,
    }),
    (req: express.Request, res: express.Response) => {
        const resBody: ResponseModel = {
            success: verificationEmailSentStatus,
        };

        return res.json(resBody);
    },
    errorMiddleware()
);
