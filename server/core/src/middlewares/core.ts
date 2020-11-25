import { Mailer } from "@dashboard/mailer";
import { Service } from "@dashboard/service";
import { NextFunction, Request, Response } from "express";
import { StrategyParty } from "../parties/common/strategy";

declare global {
    namespace Express {
        interface Request {
            mailer: Mailer;
            parties: StrategyParty[];
            services: Service[];

            port: string;
        }
    }
}

export function coreMiddleware(
    mailer: Mailer,
    parties: StrategyParty[],
    services: Service[]
) {
    return function (req: Request, res: Response, next: NextFunction) {
        req.mailer = mailer;
        req.parties = parties;
        req.services = services;

        const host = req.get("host")?.split(":");

        if (host) {
            req.port = host[1];
        }

        return next();
    };
}
