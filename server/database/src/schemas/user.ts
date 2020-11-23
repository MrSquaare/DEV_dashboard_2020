import { Schema } from "mongoose";

export const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    verified: { type: Boolean, default: false },

    password: { type: String, required: true, select: false },
    verification: { type: String, required: true, select: false },
});

export const UserSettingSchema = new Schema({
    username: { type: String, required: true },
    key: { type: String, required: true },
    value: { type: String, required: true },
    secure: { type: Boolean, default: false },
});

UserSettingSchema.index({ username: 1, key: 1 }, { unique: true });
