import mongoose, { Mongoose } from "mongoose";
import { DatabaseConfiguration } from "../types";

export class Database {
    hostname: string;
    port: number;
    database: string;
    user?: string;
    password?: string;

    mongodb?: Mongoose;

    constructor(configuration: DatabaseConfiguration) {
        this.hostname = configuration.hostname;
        this.port = configuration.port;
        this.database = configuration.database;
        this.user = configuration.user;
        this.password = configuration.password;
    }

    async connect(): Promise<void> {
        const host = `${this.hostname}:${this.port}/${this.database}`;

        this.mongodb = await mongoose.connect(`mongodb://${host}`, {
            user: this.user,
            pass: this.password,
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }

    async disconnect(): Promise<void> {
        await this.mongodb?.disconnect();
    }
}
