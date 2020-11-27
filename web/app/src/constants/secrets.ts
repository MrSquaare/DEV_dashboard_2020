import { v4 } from "uuid";

export const ironSecret = process.env.IRON_SECRET || v4();
