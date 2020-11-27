import { Router } from "express";
import { userRoute } from "../../../constants";
import { userBaseRouter, userSettingsRouter } from "./routers";

export const userRouter = Router();

userRouter.use(userRoute, userBaseRouter);

userRouter.use(userRoute, userSettingsRouter);
