import { ServiceActionSettings } from "@dashboard/service";
import { NextFunction, Request, Response } from "express";
import { serviceActionSettingsNotFoundStatus } from "../../../../constants";

export function serviceActionSettingsMiddleware() {
    return function (req: Request, res: Response, next: NextFunction): void {
        if (!(req.action instanceof ServiceActionSettings)) {
            return next(serviceActionSettingsNotFoundStatus);
        }

        return next();
    };
}
