import { Configuration } from "@dashboard/core";
import { existsSync } from "fs";
import { resolve } from "path";
import { defaultConfiguration, defaultConfigurationPath } from "../constants";

export function parseIntOrUndefined(
    string: string | undefined
): number | undefined {
    return string ? parseInt(string) : undefined;
}

export function getConfiguration(
    args: any,
    file: Partial<Configuration> | undefined
): Configuration {
    return {
        hostname:
            process.env.HOSTNAME ||
            args.hostname ||
            file?.hostname ||
            defaultConfiguration.hostname,
        port:
            parseIntOrUndefined(process.env.PORT) ||
            args.port ||
            file?.port ||
            defaultConfiguration.port,
        database: {
            hostname:
                process.env.DATABASE_HOSTNAME ||
                file?.database?.hostname ||
                defaultConfiguration.database.hostname,
            port:
                parseIntOrUndefined(process.env.DATABASE_PORT) ||
                file?.database?.port ||
                defaultConfiguration.database.port,
            database:
                process.env.DATABASE_DATABASE ||
                file?.database?.database ||
                defaultConfiguration.database.database,
            user:
                process.env.DATABASE_USER ||
                file?.database?.user ||
                defaultConfiguration.database.user,
            password:
                process.env.DATABASE_PASSWORD ||
                file?.database?.password ||
                defaultConfiguration.database.password,
        },
        mailer: {
            hostname:
                process.env.MAILER_HOSTNAME ||
                file?.mailer?.hostname ||
                defaultConfiguration.mailer.hostname,
            port:
                parseIntOrUndefined(process.env.MAILER_PORT) ||
                file?.mailer?.port ||
                defaultConfiguration.mailer.port,
            user:
                process.env.MAILER_USER ||
                file?.mailer?.user ||
                defaultConfiguration.mailer.user,
            password:
                process.env.MAILER_PASSWORD ||
                file?.mailer?.password ||
                defaultConfiguration.mailer.password,
        },
        services: file?.services,
    };
}

export function getConfigurationFile(
    args: any
): Partial<Configuration> | undefined {
    const relativePath = args.config || defaultConfigurationPath;
    const resolvedPath = resolve(relativePath);
    let file: Configuration | undefined;

    if (existsSync(resolvedPath)) {
        file = require(resolvedPath);
    }

    return file;
}
