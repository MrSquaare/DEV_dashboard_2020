import { Router } from "express";
import { authenticationRoute } from "../../../constants";
import { authenticationPartiesRouter } from "./parties";
import {
    authenticationSignInRouter,
    authenticationSignUpRouter,
    authenticationVerifyRouter,
} from "./routers";

export const authenticationRouter = Router();

authenticationRouter.use(authenticationRoute, authenticationPartiesRouter);
authenticationRouter.use(authenticationRoute, authenticationSignInRouter);
authenticationRouter.use(authenticationRoute, authenticationSignUpRouter);
authenticationRouter.use(authenticationRoute, authenticationVerifyRouter);
