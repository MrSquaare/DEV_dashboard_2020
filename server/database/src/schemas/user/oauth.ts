import { Schema } from "mongoose";

export const UserOAuthSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    type: { type: String, required: true },
    provider: { type: String, required: true },
    verified: { type: Boolean, default: false },
});
