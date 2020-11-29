import { Configuration } from "@dashboard/core";

export const defaultConfigurationPath = "./dashboard.config.js";

export const defaultConfiguration: Configuration = {
    hostname: "localhost",
    port: 8080,
    database: {
        hostname: "localhost",
        port: 27017,
    },
    mailer: {
        hostname: "localhost",
        port: 465,
    },
};
