import { ServiceActionSettings } from "@dashboard/service";
import express from "express";

export function serviceActionSettingsMiddleware() {
    return function (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if (!(req.action instanceof ServiceActionSettings)) {
            return res.status(404).send("Not found");
        }

        return next();
    };
}
