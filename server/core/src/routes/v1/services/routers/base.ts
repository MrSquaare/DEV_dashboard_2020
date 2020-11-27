import { Response } from "@dashboard/types";
import { Router } from "express";
import { servicesBaseRoute } from "../../../../constants";

export const servicesBaseRouter = Router();

servicesBaseRouter.get(servicesBaseRoute, (req, res) => {
    const responseBody: Response = {
        data: req.services,
    };

    return res.json(responseBody);
});
