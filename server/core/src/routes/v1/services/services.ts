import { Router } from "express";
import { servicesRoute } from "../../../constants";
import { servicesBaseRouter } from "./routers";

export const servicesRouter = Router();

servicesRouter.use(servicesRoute, servicesBaseRouter);
