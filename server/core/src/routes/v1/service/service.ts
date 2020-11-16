import { Service } from "@dashboard/service";
import { Router } from "express";
import passport from "passport";
import { serviceMiddleware } from "./middlewares";
import { actionRouter } from "./routers";
import { authenticationRouter } from "./authentication";
import { baseRouter } from "./routers";

const baseRoute = "/:service";

export function serviceRouter(services: Service[]): Router {
    const router = Router();

    for (const service of services) {
        if (service.strategy) {
            passport.use(service.id, service.strategy);
        }
    }

    router.use(baseRoute, serviceMiddleware(services));

    router.use(baseRoute, baseRouter);
    router.use(baseRoute, authenticationRouter);
    router.use(baseRoute, actionRouter);

    return router;
}
