import cors from "cors";
import { Express, json } from "express";
import morgan from "morgan";
import passport from "passport";
import { errorMiddleware } from "../middlewares";
import { aboutRouter } from "../routes/about";
import { v1Router } from "../routes/v1";

declare global {
    namespace Express {
        interface Request {
            port: string;
        }
    }
}

function exposeUtilities(express: Express) {
    express.use((req, res, next) => {
        const host = req.get("host")?.split(":");

        if (host) {
            req.port = host[1];
        }

        return next();
    });
}

export function useMiddlewares(express: Express): void {
    exposeUtilities(express);

    express.use(morgan("common"));

    express.use(cors());
    express.use(json());

    express.use(aboutRouter);
    express.use(v1Router);

    express.use(errorMiddleware());

    express.use(passport.initialize());
}
