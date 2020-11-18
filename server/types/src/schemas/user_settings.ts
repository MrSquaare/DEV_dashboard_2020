import mongoose, { Document, Schema } from "mongoose";
import { UserSettingsModel } from "../models";

type UserSettingsDocument = UserSettingsModel & Document;

const UserSettingsSchema = new Schema({
    username: { type: String, required: true },
    settings: { type: Map, required: true },
});

export const UserSettingsSchemaModel = mongoose.model<UserSettingsDocument>(
    "UserSettings",
    UserSettingsSchema
);
