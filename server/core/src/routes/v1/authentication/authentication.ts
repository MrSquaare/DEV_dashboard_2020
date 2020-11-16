import { Router } from "express";
import { Mailer } from "mailer/mailer";
import passport from "passport";
import { signInRouter, signUpRouter } from "./routers";
import { verifyRouter } from "./routers/verify";
import { deserialize, serialize } from "./serializers";
import { signInStrategy, signUpStrategy } from "./strategies";

const baseRoute = "/authentication";

export function authenticationRouter(mailer: Mailer): Router {
    const router = Router();

    passport.serializeUser(serialize);
    passport.deserializeUser(deserialize);

    passport.use("sign-in", signInStrategy);
    passport.use("sign-up", signUpStrategy(mailer));

    router.use(baseRoute, signInRouter);
    router.use(baseRoute, signUpRouter);
    router.use(baseRoute, verifyRouter);

    return router;
}
