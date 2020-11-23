import { Mail } from "./mail";

export interface IMailer {
    readonly hostname: string;
    readonly port: number;

    send(mail: Mail): Promise<void>;
}
