import { Router } from "express";
import { serviceRoute } from "../../../constants";
import { serviceMiddleware } from "../../../middlewares";
import { serviceActionRouter, serviceBaseRouter } from "./routers";

export const serviceRouter = Router();

serviceRouter.use(serviceRoute, serviceMiddleware());

serviceRouter.use(serviceRoute, serviceBaseRouter);
serviceRouter.use(serviceRoute, serviceActionRouter);
