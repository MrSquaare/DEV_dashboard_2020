import { ResponseModel } from "@dashboard/types";
import express, { Router } from "express";

export const serviceBaseRouter = Router();

serviceBaseRouter.get("/", (req: express.Request, res: express.Response) => {
    const resBody: ResponseModel = {
        data: req.service,
    };

    return res.json(resBody);
});
