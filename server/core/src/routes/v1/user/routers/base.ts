import { ResponseModel } from "@dashboard/types";
import { Router } from "express";

export const userBaseRouter = Router();

userBaseRouter.get("/", (req, res) => {
    const resBody: ResponseModel = {
        data: req.user,
    };

    return res.json(resBody);
});
