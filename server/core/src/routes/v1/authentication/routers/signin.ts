import { User } from "@dashboard/types";
import express from "express";
import jwt from "jsonwebtoken";
import passport from "passport";

export const signInRouter = express.Router();

signInRouter.post(
    "/signin",
    passport.authenticate("sign-in", { session: false }),
    (req, res) => {
        const user = req.user as User;
        const token = jwt.sign(
            { username: user.username },
            process.env.JWT_SECRET || "unknown"
        );

        return res.json({
            data: token,
        });
    }
);
