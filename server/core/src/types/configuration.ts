import { Service } from "@dashboard/service";

export type Configuration = {
    hostname: string;
    port: number;
    database: DatabaseConfiguration;
    mailer: MailerConfiguration;
    services?: Service[];
};

export type DatabaseConfiguration = {
    hostname: string;
    port: number;
    database: string;
    user?: string;
    password?: string;
};

export type MailerConfiguration = {
    hostname: string;
    port: number;
    user?: string;
    password?: string;
    from: string;
};
