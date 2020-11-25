import { Service, ServiceOAuth, ServiceOAuth2 } from "@dashboard/service";
import { Express } from "express";
import passport, { Strategy } from "passport";
import { strategyFromServiceOAuth } from "./services/oauth";
import { strategyFromServiceOAuth2 } from "./services/oauth2";

declare global {
    namespace Express {
        interface Request {
            services: Service[];
        }
    }
}

function exposeServices(express: Express, services: Service[]) {
    express.use((req, res, next) => {
        req.services = services;

        return next();
    });
}

export function useServices(express: Express, services: Service[]) {
    exposeServices(express, services);

    for (const service of services) {
        let strategy: Strategy;

        if (service instanceof ServiceOAuth) {
            strategy = strategyFromServiceOAuth(service);
        } else if (service instanceof ServiceOAuth2) {
            strategy = strategyFromServiceOAuth2(service);
        } else {
            continue;
        }

        passport.use(`${service.id}-service`, strategy);
    }
}
