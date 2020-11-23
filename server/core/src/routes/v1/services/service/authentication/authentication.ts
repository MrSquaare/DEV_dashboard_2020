import { Router } from "express";
import { serviceAuthenticationRoute } from "../../../../../constants";
import { serviceAuthenticationMiddleware } from "../../../../../middlewares";
import {
    serviceAuthenticationBaseRouter,
    serviceAuthenticationCallbackRouter,
} from "./routers";

export const serviceAuthenticationRouter = Router();

serviceAuthenticationRouter.use(
    serviceAuthenticationRoute,
    serviceAuthenticationMiddleware()
);

serviceAuthenticationRouter.use(
    serviceAuthenticationRoute,
    serviceAuthenticationBaseRouter
);

serviceAuthenticationRouter.use(
    serviceAuthenticationRoute,
    serviceAuthenticationCallbackRouter
);
