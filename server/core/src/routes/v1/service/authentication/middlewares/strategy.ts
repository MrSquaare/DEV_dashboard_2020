import { NextFunction, Request, Response } from "express";

export function strategyMiddleware() {
    return function (req: Request, res: Response, next: NextFunction) {
        if (req.service.strategy === undefined) {
            return res.status(404).json({
                error: "Strategy not found",
            });
        }

        return next();
    };
}
