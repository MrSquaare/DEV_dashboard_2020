import { Mailer } from "@dashboard/mailer";
import { Express } from "express";

declare global {
    namespace Express {
        interface Request {
            mailer: Mailer;
        }
    }
}

function exposeMailer(express: Express, mailer: Mailer) {
    express.use((req, res, next) => {
        req.mailer = mailer;

        return next();
    });
}

export function useMailer(express: Express, mailer: Mailer): void {
    exposeMailer(express, mailer);
}
