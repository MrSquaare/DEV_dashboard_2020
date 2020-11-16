import { User } from "@dashboard/types";
import { Router } from "express";
import passport from "passport";

export const baseRouter = Router();

baseRouter.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const user = req.user as User;

        return res.json({
            data: user,
        });
    }
);
