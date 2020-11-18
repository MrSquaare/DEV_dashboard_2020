import { ResponseModel, StatusModel } from "@dashboard/types";
import express from "express";

export function errorMiddleware() {
    return function (
        err: StatusModel,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const resBody: ResponseModel = {
            error: err,
        };

        return res.status(err.code).json(resBody);
    };
}
