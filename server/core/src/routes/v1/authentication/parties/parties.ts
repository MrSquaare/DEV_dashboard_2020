import { Router } from "express";
import { authenticationPartiesRoute } from "../../../../constants";
import { partyMiddleware } from "../../../../middlewares/party";
import {
    authenticationPartiesBaseRouter,
    authenticationPartiesCallbackRouter,
} from "./routers";

export const authenticationPartiesRouter = Router();

authenticationPartiesRouter.use(authenticationPartiesRoute, partyMiddleware());

authenticationPartiesRouter.use(
    authenticationPartiesRoute,
    authenticationPartiesBaseRouter
);

authenticationPartiesRouter.use(
    authenticationPartiesRoute,
    authenticationPartiesCallbackRouter
);
