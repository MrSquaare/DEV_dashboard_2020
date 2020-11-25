import { Router } from "express";
import passport from "passport";
import { jwtStrategyName, serviceActionRoute } from "../../../../../constants";
import {
    serviceActionMiddleware,
    serviceActionRequirementsMiddleware,
} from "../../../../../middlewares";
import {
    serviceActionBaseRouter,
    serviceActionSettingsRouter,
} from "./routers";

export const serviceActionRouter = Router();

serviceActionRouter.use(serviceActionRoute, serviceActionMiddleware());

serviceActionRouter.use(
    serviceActionRoute,
    serviceActionRequirementsMiddleware()
);

serviceActionRouter.use(
    serviceActionRoute,
    passport.authenticate(jwtStrategyName, { session: false })
);

serviceActionRouter.use(serviceActionRoute, serviceActionBaseRouter);

serviceActionRouter.use(serviceActionRoute, serviceActionSettingsRouter);
