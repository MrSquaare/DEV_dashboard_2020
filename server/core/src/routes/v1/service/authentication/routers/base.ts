import express from "express";
import passport from "passport";

export const baseRouter = express.Router();

baseRouter.all("/", async (req, res, next) => {
    passport.authenticate(req.service.id)(req, res, next);
});
