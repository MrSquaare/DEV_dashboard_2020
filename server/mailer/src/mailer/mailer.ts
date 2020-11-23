import { createTransport, Transporter } from "nodemailer";
import { IMailer, Mail, MailerConfiguration } from "@dashboard/types";

export class Mailer implements IMailer {
    readonly hostname: string;
    readonly port: number;
    private readonly user?: string;
    private readonly password?: string;

    private transporter?: Transporter;

    constructor(configuration: MailerConfiguration) {
        this.hostname = configuration.hostname;
        this.port = configuration.port;
        this.user = configuration.user;
        this.password = configuration.password;

        this.transporter = createTransport({
            host: this.hostname,
            port: this.port,
            auth: {
                user: this.user,
                pass: this.password,
            },
        });
    }

    async send(mail: Mail): Promise<void> {
        await this.transporter?.sendMail({
            from: mail.from,
            to: mail.to,
            subject: mail.subject,
            text: mail.html,
            html: mail.html,
        });
    }
}
