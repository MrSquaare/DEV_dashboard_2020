import { Router } from "express";
import { authenticationServiceRoute } from "../../../../constants";
import {
    authenticationServiceMiddleware,
    serviceMiddleware,
} from "../../../../middlewares";
import {
    authenticationServiceBaseRouter,
    authenticationServiceCallbackRouter,
} from "./routers";

export const authenticationServiceRouter = Router();

authenticationServiceRouter.use(
    authenticationServiceRoute,
    serviceMiddleware(),
    authenticationServiceMiddleware()
);

authenticationServiceRouter.use(
    authenticationServiceRoute,
    authenticationServiceBaseRouter
);
authenticationServiceRouter.use(
    authenticationServiceRoute,
    authenticationServiceCallbackRouter
);
