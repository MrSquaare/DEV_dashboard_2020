import { Schema } from "mongoose";

export const ServiceSettingSchema = new Schema({
    username: { type: String, required: true },
    key: { type: String, required: true },
    value: { type: String, required: true },
    secure: { type: Boolean, default: false },
});

ServiceSettingSchema.index({ username: 1, key: 1 }, { unique: true });
