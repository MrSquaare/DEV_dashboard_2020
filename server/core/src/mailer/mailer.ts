import nodemailer, { Transporter } from "nodemailer";
import { MailerConfiguration } from "../types";

export class Mailer {
    hostname: string;
    port: number;
    user?: string;
    password?: string;
    from: string;

    transporter?: Transporter;

    constructor(configuration: MailerConfiguration) {
        this.hostname = configuration.hostname;
        this.port = configuration.port;
        this.user = configuration.user;
        this.password = configuration.password;
        this.from = configuration.from;

        this.transporter = nodemailer.createTransport({
            host: this.hostname,
            port: this.port,
            auth: {
                user: this.user,
                pass: this.password,
            },
        });
    }

    async send(to: string, subject: string, body: string): Promise<void> {
        await this.transporter?.sendMail({
            from: this.from,
            to: to,
            subject: subject,
            text: body,
        });
    }
}
