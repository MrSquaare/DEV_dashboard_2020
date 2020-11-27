import { ServiceAction } from "@dashboard/service";
import { NextFunction, Request, Response } from "express";
import {
    badRequestStatus,
    serviceActionNotFoundStatus,
} from "../../../constants";

declare global {
    namespace Express {
        interface Request {
            action: ServiceAction;
        }
    }
}

export function serviceActionMiddleware() {
    return function (req: Request, res: Response, next: NextFunction): void {
        if (req.params.action === "authentication") {
            return next();
        }

        const action = req.service.actions.find(
            (action) => action.id === req.params.action
        );

        if (action === undefined) {
            throw serviceActionNotFoundStatus;
        }

        req.action = action;

        return next();
    };
}

export function serviceActionRequirementsMiddleware() {
    return function (req: Request, res: Response, next: NextFunction): void {
        if (req.params.action === "authentication") {
            return next();
        }

        if (req.query.instance === undefined) {
            return next(badRequestStatus);
        }

        return next();
    };
}
