import express from "express";

export const actionRouter = express.Router();

actionRouter.all("/:action", async (req, res) => {
    const action = req.service.actions.find(
        (action) => action.id === req.params.action
    );

    if (action === undefined) {
        return res.status(404).json({
            error: "Action not found",
        });
    }

    try {
        const actionResponse = await action.run({
            parameters: req.body,
        });

        return res.json(actionResponse);
    } catch (e) {
        return res.status(500).json(e);
    }
});
