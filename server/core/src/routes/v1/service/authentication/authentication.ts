import { Router } from "express";
import { strategyMiddleware } from "./middlewares";
import { baseRouter, callbackRouter } from "./routers";

const routeBase = "/authentication";

export const authenticationRouter = Router();

authenticationRouter.use(routeBase, strategyMiddleware());

authenticationRouter.use(routeBase, baseRouter);
authenticationRouter.use(routeBase, callbackRouter);
