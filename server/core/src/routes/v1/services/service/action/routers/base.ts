import { Response, StatusError, User } from "@dashboard/types";
import { Router } from "express";
import {
    internalServerErrorStatus,
    serviceActionBaseRoute,
} from "../../../../../../constants";

export const serviceActionBaseRouter = Router();

serviceActionBaseRouter.get(serviceActionBaseRoute, async (req, res, next) => {
    try {
        const instance = req.query.instance as string;
        const user = req.user as User;

        const responseAction = await req.action.run({
            instance: instance,
            user: user,
        });

        const responseBody: Response = {
            data: responseAction.data,
        };

        return res.status(responseAction.code).json(responseBody);
    } catch (e) {
        if (e instanceof StatusError) {
            return res.status(e.code).json(e);
        }

        console.error(e);

        return next(internalServerErrorStatus);
    }
});
