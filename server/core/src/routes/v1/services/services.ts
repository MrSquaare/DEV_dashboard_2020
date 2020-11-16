import { Service } from "@dashboard/service";
import { Router } from "express";
import { baseRouter } from "./routers";
import { servicesMiddleware } from "./middlewares";

const baseRoute = "/services";

export function servicesRouter(services: Service[]): Router {
    const router = Router();

    router.use(servicesMiddleware(services));

    router.use(baseRoute, baseRouter);

    return router;
}
