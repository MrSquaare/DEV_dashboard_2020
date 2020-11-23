import { Mailer } from "@dashboard/mailer";
import { Service } from "@dashboard/service";
import cors from "cors";
import { Express, json } from "express";
import morgan from "morgan";
import passport from "passport";
import { coreMiddleware, errorMiddleware } from "../middlewares";

export function useMiddlewares(
    express: Express,
    mailer: Mailer,
    services: Service[]
) {
    express.use(morgan("common"));

    express.use(cors());
    express.use(json());

    express.use(coreMiddleware(mailer, services));
    express.use(errorMiddleware());

    express.use(passport.initialize());
}
