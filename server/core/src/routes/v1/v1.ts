import { Router } from "express";
import { v1Route } from "../../constants";
import { authenticationRouter } from "./authentication";
import { servicesRouter } from "./services";

export const v1Router = Router();

v1Router.use(v1Route, authenticationRouter);

v1Router.use(v1Route, servicesRouter);
