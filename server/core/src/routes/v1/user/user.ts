import { Router } from "express";
import { userRoute } from "../../../constants";
import { userBaseRouter } from "./routers";

export const userRouter = Router();

userRouter.use(userRoute, userBaseRouter);
