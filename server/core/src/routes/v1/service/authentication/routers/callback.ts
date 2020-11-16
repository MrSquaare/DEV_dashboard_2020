import express from "express";
import passport from "passport";

export const callbackRouter = express.Router();

callbackRouter.all("/callback", (req, res, next) => {
    passport.authenticate(req.service.id, (err, user) => {
        if (err) {
            return next(err);
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }

            return res.json({
                status: 200,
                data: user,
            });
        });
    })(req, res, next);
});
