import express from "express";

export const baseRouter = express.Router();

baseRouter.all("/", async (req, res) => {
    const resBody = {
        id: req.service.id,
        name: req.service.name,
        description: req.service.description,
        version: req.service.version,
        actions: req.service.actions.map((action) => {
            return {
                id: action.id,
                name: action.name,
                description: action.description,
            };
        }),
    };

    return res.json(resBody);
});
