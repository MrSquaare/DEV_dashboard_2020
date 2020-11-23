import { NextFunction, Request, Response } from "express";

export function errorMiddleware() {
    return function (
        err: unknown,
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        return res.status(500).send("Internal server error");
    };
}
