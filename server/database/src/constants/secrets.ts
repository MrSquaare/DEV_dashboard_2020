import { v4 } from "uuid";

export const aesSecret = process.env.AES_SECRET || v4();
