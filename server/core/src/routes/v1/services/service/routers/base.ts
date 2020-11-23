import { Response } from "@dashboard/types";
import { Router } from "express";
import { serviceBaseRoute } from "../../../../../constants";

export const serviceBaseRouter = Router();

serviceBaseRouter.get(serviceBaseRoute, (req, res) => {
    const responseBody: Response = {
        data: req.service,
    };

    return res.json(responseBody);
});
