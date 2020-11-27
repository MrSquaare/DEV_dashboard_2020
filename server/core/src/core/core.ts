import {
    Database,
    ServiceSettingRepository,
    UserLocalRepository,
    UserOAuthRepository,
    UserSettingRepository,
} from "@dashboard/database";
import { Mailer } from "@dashboard/mailer";
import { Service } from "@dashboard/service";
import express, { Express } from "express";
import { Server } from "http";
import { Party } from "../party";
import { TwitterStrategy } from "../strategies/parties";
import { Configuration } from "../types";
import {
    useMailer,
    useMiddlewares,
    useParties,
    useServices,
    useSettings,
    useStrategies,
} from "../use";
import { UserSettings } from "../user";

export class Core {
    hostname: string;
    port: number;
    services: Service[];

    database: Database;
    userLocalRepository: UserLocalRepository;
    userOAuthRepository: UserOAuthRepository;

    parties: Party[];
    userSettings: UserSettings;

    mailer: Mailer;
    express: Express;
    server?: Server;

    constructor(configuration: Configuration) {
        this.hostname = configuration.hostname;
        this.port = configuration.port;
        this.services = configuration.services || [];

        this.database = new Database(configuration.database);
        this.mailer = new Mailer(configuration.mailer);

        this.userLocalRepository = new UserLocalRepository();
        this.userOAuthRepository = new UserOAuthRepository();
        this.userSettings = new UserSettings(new UserSettingRepository());

        this.parties = [new TwitterStrategy(this.userOAuthRepository)];

        this.express = express();

        useMailer(this.express, this.mailer);
        useParties(this.express, this.parties);
        useServices(this.express, this.services);
        useSettings(this.express, this.userSettings);

        useStrategies(this.userLocalRepository, this.userOAuthRepository);

        useMiddlewares(this.express);
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
