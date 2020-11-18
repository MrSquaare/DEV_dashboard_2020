import mongoose, { Document, Schema } from "mongoose";
import { UserServiceSettingsModel } from "../models";

type UserServiceSettingsDocument = UserServiceSettingsModel & Document;

const UserServiceSettingsSchema = new Schema({
    username: { type: String, required: true },
    serviceId: { type: String, required: true },
    settings: { type: Map, required: true },
});

export const UserServiceSettingsSchemaModel = mongoose.model<
    UserServiceSettingsDocument
>("UserServiceSettings", UserServiceSettingsSchema);
