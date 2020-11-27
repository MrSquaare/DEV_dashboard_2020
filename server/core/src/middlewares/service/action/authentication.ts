import { ServiceOAuth, ServiceOAuth2 } from "@dashboard/service";
import { NextFunction, Request, Response } from "express";
import { serviceAuthenticationNotFoundStatus } from "../../../constants";

export function serviceAuthenticationMiddleware() {
    return function (req: Request, res: Response, next: NextFunction): void {
        if (
            !(req.service instanceof ServiceOAuth) &&
            !(req.service instanceof ServiceOAuth2)
        ) {
            return next(serviceAuthenticationNotFoundStatus);
        }

        return next();
    };
}
