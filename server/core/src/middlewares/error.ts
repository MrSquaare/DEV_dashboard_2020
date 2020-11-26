import { StatusError } from "@dashboard/types";
import { NextFunction, Request, Response } from "express";
import { internalServerErrorStatus } from "../constants";

export function errorMiddleware() {
    return function (
        err: any,
        req: Request,
        res: Response,
        next: NextFunction
    ): unknown {
        if (!(err instanceof StatusError)) {
            console.log(err);

            err = internalServerErrorStatus;
        }

        return res.status(err.code).json(err);
    };
}
