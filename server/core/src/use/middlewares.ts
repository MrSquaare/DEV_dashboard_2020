import { Mailer } from "@dashboard/mailer";
import { Service } from "@dashboard/service";
import cors from "cors";
import { Express, json } from "express";
import morgan from "morgan";
import passport from "passport";
import { coreMiddleware, errorMiddleware } from "../middlewares";
import { StrategyParty } from "../parties/common/strategy";
import { v1Router } from "../routes/v1";

export function useMiddlewares(
    express: Express,
    mailer: Mailer,
    parties: StrategyParty[],
    services: Service[]
) {
    express.use(morgan("common"));

    express.use(cors());
    express.use(json());

    express.use(coreMiddleware(mailer, parties, services));

    express.use(v1Router);

    express.use(errorMiddleware());

    express.use(passport.initialize());
}
