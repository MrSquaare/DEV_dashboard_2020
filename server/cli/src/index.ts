import { Configuration, Core } from "@dashboard/core";
import { existsSync } from "fs";

import cli from "./cli";
import { parseIntOrUndefined } from "./utils";

const configurationPathDefault = "./dashboard.config.js";
const configurationDefaults: Configuration = {
    hostname: "localhost",
    port: 4000,
    database: {
        hostname: "localhost",
        port: 27017,
        database: "db",
    },
    mailer: {
        hostname: "smtp.gmail.com",
        port: 465,
        from: "example@gmail.com",
    },
};

function getConfiguration(): Configuration {
    cli.parse(process.argv);

    const configurationFilePath = cli.config || configurationPathDefault;
    const configurationFilePathAbsolute = `${process.env.PWD}/${configurationFilePath}`;

    let configurationFile: Configuration | undefined;

    if (existsSync(configurationFilePathAbsolute)) {
        configurationFile = require(configurationFilePathAbsolute);
    }

    const configuration: Configuration = {
        hostname:
            cli.hostname ||
            process.env.HOSTNAME ||
            configurationFile?.hostname ||
            configurationDefaults.hostname,
        port:
            cli.port ||
            parseIntOrUndefined(process.env.PORT) ||
            configurationFile?.port ||
            configurationDefaults.port,
        database: {
            hostname:
                process.env.DATABASE_HOSTNAME ||
                configurationFile?.database?.hostname ||
                configurationDefaults.database.hostname,
            port:
                parseIntOrUndefined(process.env.DATABASE_PORT) ||
                configurationFile?.database?.port ||
                configurationDefaults.database.port,
            database:
                process.env.DATABASE_DATABASE ||
                configurationFile?.database?.database ||
                configurationDefaults.database.database,
            user:
                process.env.DATABASE_USER ||
                configurationFile?.database?.user ||
                configurationDefaults.database.user,
            password:
                process.env.DATABASE_PASSWORD ||
                configurationFile?.database?.password ||
                configurationDefaults.database.password,
        },
        mailer: {
            hostname:
                process.env.MAILER_HOSTNAME ||
                configurationFile?.mailer?.hostname ||
                configurationDefaults.mailer.hostname,
            port:
                parseIntOrUndefined(process.env.MAILER_PORT) ||
                configurationFile?.mailer?.port ||
                configurationDefaults.mailer.port,
            user:
                process.env.MAILER_USER ||
                configurationFile?.mailer?.user ||
                configurationDefaults.mailer.user,
            password:
                process.env.MAILER_PASSWORD ||
                configurationFile?.mailer?.password ||
                configurationDefaults.mailer.password,
            from:
                process.env.MAILER_FROM ||
                configurationFile?.mailer?.from ||
                configurationDefaults.mailer.from,
        },
        services: configurationFile?.services || configurationDefaults.services,
    };

    return configuration;
}

async function startCore(core: Core) {
    await core.load();

    await core.start();

    console.info(
        `ready - started server on http://${core.hostname}:${core.port}`
    );
}

async function stopCore(core: Core) {
    await core.stop();

    await core.unload();
}

async function main() {
    const configuration = getConfiguration();
    const core = new Core(configuration);

    process.on("SIGINT", () => stopCore(core));
    process.on("SIGTERM", () => stopCore(core));

    await startCore(core);
}

main().catch((e) => console.error(e));
