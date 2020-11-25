import { Router } from "express";
import { servicesRoute } from "../../../constants";
import { servicesBaseRouter } from "./routers";
import { serviceRouter } from "./service";

export const servicesRouter = Router();

servicesRouter.use(servicesRoute, servicesBaseRouter);

servicesRouter.use(servicesRoute, serviceRouter);
