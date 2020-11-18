import { Router } from "express";
import { authenticationRoute } from "../../../constants";
import {
    authenticationSignInRouter,
    authenticationSignUpRouter,
    authenticationVerifyRouter,
} from "./routers";
import authenticationServiceRouter from "./service";

export const authenticationRouter = Router();

authenticationRouter.use(authenticationRoute, authenticationServiceRouter);
authenticationRouter.use(authenticationRoute, authenticationSignInRouter);
authenticationRouter.use(authenticationRoute, authenticationSignUpRouter);
authenticationRouter.use(authenticationRoute, authenticationVerifyRouter);
