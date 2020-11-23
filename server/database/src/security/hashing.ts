import * as crypto from "crypto-js";

export function hash(value: string): string {
    const hashed = crypto.SHA512(value);

    return hashed.toString();
}
