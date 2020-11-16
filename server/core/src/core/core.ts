import { Service } from "@dashboard/service";
import express, { Express } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import { Server } from "http";
import morgan from "morgan";
import passport from "passport";
import { Database } from "../database";
import { Mailer } from "../mailer/mailer";
import apiRoutes from "../routes/v1";
import { Configuration } from "../types";

export class Core {
    hostname: string;
    port: number;
    services?: Service[];

    database?: Database;
    mailer?: Mailer;
    express?: Express;
    server?: Server;

    constructor(configuration: Configuration) {
        this.hostname = configuration.hostname;
        this.port = configuration.port;
        this.services = configuration.services;

        this.express = express();
        this.database = new Database(configuration.database);
        this.mailer = new Mailer(configuration.mailer);

        this.express?.use(bodyParser.json());
        this.express?.use(cookieParser());
        this.express?.use(cors());
        this.express?.use(morgan("tiny"));
        this.express?.use(
            session({
                resave: false,
                saveUninitialized: false,
                secret: process.env.SESSION_SECRET || "unknown",
            })
        );
        this.express?.use(passport.initialize());
        this.express?.use(passport.session());
        this.express?.use(apiRoutes(this.mailer, this.services));
    }

    async load(): Promise<void> {
        if (this.services === undefined) return;

        for (const service of this.services) {
            await service.load();
        }
    }

    async unload(): Promise<void> {
        if (this.services === undefined) return;

        for (const service of this.services) {
            await service.unload();
        }
    }

    async start(): Promise<void> {
        await this.database?.connect();

        return new Promise((resolve) => {
            this.server = this.express?.listen(this.port, this.hostname, () => {
                resolve();
            });
        });
    }

    async stop(): Promise<void> {
        await this.database?.disconnect();

        return new Promise((resolve, reject) => {
            this.server?.close((err) => {
                err ? reject(err) : resolve();
            });
        });
    }
}
