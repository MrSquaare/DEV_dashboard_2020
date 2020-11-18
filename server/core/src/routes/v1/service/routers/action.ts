import { ResponseModel } from "@dashboard/types";
import express, { Router } from "express";
import { serviceActionRoute } from "../../../../constants";
import { serviceActionMiddleware } from "../../../../middlewares";

export const serviceActionRouter = Router();

serviceActionRouter.use(serviceActionRoute, serviceActionMiddleware());

serviceActionRouter.all(
    serviceActionRoute,
    async (req: express.Request, res: express.Response) => {
        const resBody: ResponseModel = await req.action.run({
            parameters: req.body,
        });

        return res.json(resBody);
    }
);
