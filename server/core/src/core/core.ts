import {
    Database,
    ServiceSettingRepository,
    UserLocalRepository,
    UserOAuthRepository,
} from "@dashboard/database";
import { Mailer } from "@dashboard/mailer";
import { Service } from "@dashboard/service";
import express, { Express } from "express";
import { Server } from "http";
import { StrategyParty } from "../parties/common/strategy";
import { TwitterStrategy } from "../strategies/oauth";
import { Configuration } from "../types";
import { useMiddlewares, useParties, useServices, useStrategies } from "../use";

export class Core {
    hostname: string;
    port: number;
    services: Service[];

    database: Database;
    localRepository: UserLocalRepository;
    oauthRepository: UserOAuthRepository;

    parties: StrategyParty[];

    mailer: Mailer;
    express: Express;
    server?: Server;

    constructor(configuration: Configuration) {
        this.hostname = configuration.hostname;
        this.port = configuration.port;
        this.services = configuration.services || [];

        this.database = new Database(configuration.database);
        this.mailer = new Mailer(configuration.mailer);

        this.localRepository = new UserLocalRepository();
        this.oauthRepository = new UserOAuthRepository();

        this.parties = [new TwitterStrategy(this.oauthRepository)];

        this.express = express();

        useMiddlewares(this.express, this.mailer, this.parties, this.services);
        useParties(this.parties);
        useServices(this.services);
        useStrategies(this.localRepository, this.oauthRepository);
    }

    initialize(): void {
        for (const service of this.services) {
            const repository = new ServiceSettingRepository(service.id);

            service.initialize(repository);
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
}
