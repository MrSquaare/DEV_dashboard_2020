import { Express } from "express";
import { UserSettings } from "../user/settings";

declare global {
    namespace Express {
        interface Request {
            settings: UserSettings;
        }
    }
}

function exposeSettings(express: Express, settings: UserSettings) {
    express.use((req, res, next) => {
        req.settings = settings;

        return next();
    });
}

export function useSettings(express: Express, settings: UserSettings) {
    exposeSettings(express, settings);
}
