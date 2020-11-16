import { Router } from "express";

export const baseRouter = Router();

baseRouter.get("/", (req, res) => {
    return res.json(req.services);
});
