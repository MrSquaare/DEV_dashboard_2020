import { Response } from "@dashboard/types";
import { Router } from "express";
import passport from "passport";
import { jwtStrategyName, userBaseRoute } from "../../../../constants";

export const userBaseRouter = Router();

userBaseRouter.get(
    userBaseRoute,
    passport.authenticate(jwtStrategyName, { session: false }),
    (req, res) => {
        const responseBody: Response = {
            data: req.user,
        };

        return res.json(responseBody);
    }
);
