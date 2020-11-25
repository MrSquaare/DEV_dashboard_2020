import { Schema } from "mongoose";

export const UserLocalSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    type: { type: String, required: true },
    verified: { type: Boolean, default: false },

    password: { type: String, required: true, select: false },
    verification: { type: String, required: true, select: false },
});
