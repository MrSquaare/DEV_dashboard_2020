import { Service } from "@dashboard/service";
import express from "express";
import { Mailer } from "mailer/mailer";
import authenticationRouter from "./authentication";
import serviceRouter from "./service";
import servicesRouter from "./services";
import userRouter from "./user";

const baseRoute = "/v1";

function apiRoutes(mailer: Mailer, services?: Service[]): express.Router {
    const router = express.Router();

    router.use(baseRoute, authenticationRouter(mailer));
    router.use(baseRoute, userRouter);

    if (services) {
        router.use(baseRoute, servicesRouter(services));
        router.use(baseRoute, serviceRouter(services));
    }

    return router;
}

export default apiRoutes;
