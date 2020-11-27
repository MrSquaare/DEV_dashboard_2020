import { ServiceActionSettings } from "@dashboard/service";
import { Router } from "express";
import { aboutRoute } from "../constants";

export const aboutRouter = Router();

aboutRouter.use(aboutRoute, (req, res) => {
    const services = req.services.map((service) => {
        return {
            name: service.id,
            widgets: service.actions.map((act) => {
                const action = act as ServiceActionSettings<any>;

                return {
                    name: action.id,
                    description: action.description,
                    params: Object.entries(action.settings).map((setting) => {
                        return {
                            name: setting[0],
                            type: setting[1],
                        };
                    }),
                };
            }),
        };
    });
    const customer = {
        host: req.ip,
    };
    const server = {
        current_time: Math.ceil(Date.now() / 1000),
        services: services,
    };
    const about = {
        customer: customer,
        server: server,
    };

    return res.json(about);
});
