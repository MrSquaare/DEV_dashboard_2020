import { Service, ServiceOAuth, ServiceOAuth2 } from "@dashboard/service";
import passport, { Strategy } from "passport";
import { strategyFromServiceOAuth } from "./services/oauth";
import { strategyFromServiceOAuth2 } from "./services/oauth2";

export function useServices(services: Service[]) {
    for (const service of services) {
        let strategy: Strategy;

        if (service instanceof ServiceOAuth) {
            strategy = strategyFromServiceOAuth(service);
        } else if (service instanceof ServiceOAuth2) {
            strategy = strategyFromServiceOAuth2(service);
        } else {
            continue;
        }

        passport.use(service.id, strategy);
    }
}
