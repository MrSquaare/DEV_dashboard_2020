import express from "express";
import passport from "passport";

export const signUpRouter = express.Router();

signUpRouter.post(
    "/signup",
    passport.authenticate("sign-up", { session: false }),
    (req, res) => {
        return res.json({
            data: "Please verify your account via the link sent on your e-mail",
        });
    }
);
