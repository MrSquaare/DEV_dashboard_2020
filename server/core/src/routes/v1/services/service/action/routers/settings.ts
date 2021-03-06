import { ServiceActionSettings } from "@dashboard/service";
import { Response, StatusError, User } from "@dashboard/types";
import { Router } from "express";
import {
    internalServerErrorStatus,
    serviceActionSettingsRoute,
} from "../../../../../../constants";
import { serviceActionSettingsMiddleware } from "../../../../../../middlewares";

export const serviceActionSettingsRouter = Router();

serviceActionSettingsRouter.use(
    serviceActionSettingsRoute,
    serviceActionSettingsMiddleware()
);

serviceActionSettingsRouter.delete(
    serviceActionSettingsRoute,
    async (req, res, next) => {
        try {
            const action = req.action as ServiceActionSettings<unknown>;
            const instance = req.query.instance as string;
            const user = req.user as User;

            await action.settingsDelete(user.username, instance);

            return res.json({});
        } catch (e) {
            if (e instanceof StatusError) {
                return res.status(e.code).json(e);
            }

            console.error(e);

            return next(internalServerErrorStatus);
        }
    }
);

serviceActionSettingsRouter.get(
    serviceActionSettingsRoute,
    async (req, res, next) => {
        try {
            const action = req.action as ServiceActionSettings<unknown>;
            const instance = req.query.instance as string;
            const user = req.user as User;

            const settings = await action.settingsGet(user.username, instance);

            const responseBody: Response = {
                data: settings || {},
            };

            return res.json(responseBody);
        } catch (e) {
            if (e instanceof StatusError) {
                return res.status(e.code).json(e);
            }

            console.error(e);

            return next(internalServerErrorStatus);
        }
    }
);

serviceActionSettingsRouter.post(
    serviceActionSettingsRoute,
    async (req, res, next) => {
        try {
            const action = req.action as ServiceActionSettings<unknown>;
            const instance = req.query.instance as string;
            const user = req.user as User;

            const settingsMap = action.mapRequestToSettings({
                parameters: req.body,
                instance: instance,
                user: user,
            });

            const settings = await action.settingsSet(
                user.username,
                instance,
                settingsMap
            );

            const responseBody: Response = {
                data: settings || {},
            };

            return res.json(responseBody);
        } catch (e) {
            if (e instanceof StatusError) {
                return res.status(e.code).json(e);
            }

            console.error(e);

            return next(internalServerErrorStatus);
        }
    }
);
