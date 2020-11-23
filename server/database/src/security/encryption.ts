import * as crypto from "crypto-js";
import { aesSecret } from "../constants/secrets";

export function encrypt(value: string, secret: string = aesSecret): string {
    const encrypted = crypto.AES.encrypt(value, secret);

    return encrypted.toString();
}

export function decrypt(value: string, secret: string = aesSecret): string {
    const decrypted = crypto.AES.decrypt(value, secret);

    return decrypted.toString(crypto.enc.Utf8);
}
