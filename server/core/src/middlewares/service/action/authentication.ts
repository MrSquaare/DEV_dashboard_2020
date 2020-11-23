import { ServiceOAuth, ServiceOAuth2 } from "@dashboard/service";
import express from "express";

export function serviceAuthenticationMiddleware() {
    return function (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if (
            !(req.service instanceof ServiceOAuth) &&
            !(req.service instanceof ServiceOAuth2)
        ) {
            return res.status(404).send("Not found");
        }

        return next();
    };
}
