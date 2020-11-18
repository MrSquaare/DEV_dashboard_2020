import { Service } from "@dashboard/service";
import bodyParser from "body-parser";
import cors from "cors";
import express, { Express } from "express";
import { Server } from "http";
import morgan from "morgan";
import passport from "passport";
import { Configuration } from "types";
import {
    apiRoute,
    jwtStrategyName,
    signInStrategyName,
    signUpStrategyName,
    verifyStrategyName,
} from "../constants";
import { Database } from "../database";
import { Mailer } from "../mailer";
import { errorMiddleware, servicesMiddleware } from "../middlewares";
import apiRouter from "../routes/v1";
import {
    jwtStrategy,
    signInStrategy,
    signUpStrategy,
    verifyStrategy,
} from "../strategies";

export class Core {
    hostname: string;
    port: number;
    services: Service[];

    database: Database;
    mailer: Mailer;
    express: Express;
    server?: Server;

    constructor(configuration: Configuration) {
        this.hostname = configuration.hostname;
        this.port = configuration.port;
        this.services = configuration.services || [];

        this.express = express();
        this.database = new Database(configuration.database);
        this.mailer = new Mailer(configuration.mailer);

        this.initExpress();
        this.initPassport();
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
        await this.database.connect();

        return new Promise((resolve) => {
            this.server = this.express.listen(this.port, this.hostname, () => {
                resolve();
            });
        });
    }

    async stop(): Promise<void> {
        await this.database.disconnect();

        return new Promise((resolve, reject) => {
            this.server?.close((err) => {
                err ? reject(err) : resolve();
            });
        });
    }

    private initExpress() {
        this.express.use(morgan("tiny"));

        this.express.use(bodyParser.json());
        this.express.use(cors());

        this.express.use(errorMiddleware());

        this.express.use(apiRoute, servicesMiddleware(this.services));
        this.express.use(apiRouter);
    }

    private initPassport() {
        const host = `http://${this.hostname}:${this.port}`;

        this.express.use(passport.initialize());

        passport.use(jwtStrategyName, jwtStrategy());
        passport.use(signInStrategyName, signInStrategy());
        passport.use(signUpStrategyName, signUpStrategy(this.mailer, host));
        passport.use(verifyStrategyName, verifyStrategy());

        for (const service of this.services) {
            if (service.strategy) {
                passport.use(service.strategy);
            }
        }
    }
}
