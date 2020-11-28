import { Response, User } from "@dashboard/types";
import { Router } from "express";
import passport from "passport";
import { jwtStrategyName, userSettingsRoute } from "../../../../constants";

export const userSettingsRouter = Router();

userSettingsRouter.delete(
    userSettingsRoute,
    passport.authenticate(jwtStrategyName, { session: false }),
    async (req, res) => {
        const user = req.user as User;
        const key = req.query.key as string | undefined;

        if (key) {
            await req.settings.delete(user.username, key);
        }

        return res.json({});
    }
);

userSettingsRouter.get(
    userSettingsRoute,
    passport.authenticate(jwtStrategyName, { session: false }),
    async (req, res) => {
        const user = req.user as User;
        const key = req.query.key as string | undefined;

        const data = key
            ? await req.settings.get(user.username, key)
            : await req.settings.list(user.username);

        const responseBody: Response = {
            data: data || "",
        };

        return res.json(responseBody);
    }
);

userSettingsRouter.post(
    userSettingsRoute,
    passport.authenticate(jwtStrategyName, { session: false }),
    async (req, res) => {
        const user = req.user as User;
        const key = req.body.key;
        const value = req.body.value;

        let data;

        if (key && value) {
            data = await req.settings.set(user.username, key, value);
        }

        const responseBody: Response = {
            data: data || "",
        };

        return res.json(responseBody);
    }
);
