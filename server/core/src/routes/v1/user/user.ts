import { Router } from "express";
import passport from "passport";
import { baseRouter } from "./routers";
import { jwtStrategy } from "./strategies";

const baseRoute = "/user";

export const userRouter = Router();

passport.use("jwt", jwtStrategy);

userRouter.use(baseRoute, baseRouter);
