import mongoose from "mongoose";
import { Mongoose } from "mongoose";
import { DatabaseConfiguration, IDatabase } from "@dashboard/types";

export class Database implements IDatabase {
    readonly hostname: string;
    readonly port: number;
    readonly database?: string;
    private readonly user?: string;
    private readonly password?: string;

    private mongoose?: Mongoose;

    constructor(configuration: DatabaseConfiguration) {
        this.hostname = configuration.hostname;
        this.port = configuration.port;
        this.database = configuration.database;
        this.user = configuration.user;
        this.password = configuration.password;
    }

    async connect(): Promise<void> {
        const host = `mongodb://${this.hostname}:${this.port}`;

        this.mongoose = await mongoose.connect(host, {
            dbName: this.database,
            user: this.user,
            pass: this.password,

            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }

    async disconnect(): Promise<void> {
        await this.mongoose?.disconnect();
    }
}
