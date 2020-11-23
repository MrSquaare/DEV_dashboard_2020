import { Service } from "@dashboard/service";
import { DatabaseConfiguration, MailerConfiguration } from "@dashboard/types";

export type Configuration = {
    hostname: string;
    port: number;
    database: DatabaseConfiguration;
    mailer: MailerConfiguration;
    services?: Service[];
};
