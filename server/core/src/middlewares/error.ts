import { StatusError } from "@dashboard/types";
import { NextFunction, Request, Response } from "express";

export function errorMiddleware() {
    return function (
        err: any,
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        if (err instanceof StatusError) {
            return res.status(err.code).json(err);
        }

        return res.status(500).send(`Internal server error: ${err}`);
    };
}
