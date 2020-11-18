import { Router } from "express";
import { apiRoute } from "../../constants";
import authenticationRouter from "./authentication";
import serviceRouter from "./service";
import servicesRouter from "./services";
import userRouter from "./user";

export const apiRouter = Router();

apiRouter.use(apiRoute, authenticationRouter);
apiRouter.use(apiRoute, serviceRouter);
apiRouter.use(apiRoute, servicesRouter);
apiRouter.use(apiRoute, userRouter);
