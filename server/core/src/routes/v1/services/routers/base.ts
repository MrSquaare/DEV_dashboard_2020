import { ResponseModel } from "@dashboard/types";
import { Router } from "express";

export const servicesBaseRouter = Router();

servicesBaseRouter.get("/", (req, res) => {
    const resBody: ResponseModel = {
        data: req.services,
    };

    return res.json(resBody);
});
