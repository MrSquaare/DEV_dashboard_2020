import mongoose, { Document, Schema } from "mongoose";
import { Verification } from "../models";

type VerificationDocument = Verification & Document;

const VerificationSchema = new Schema({
    id: { type: String, required: true, unique: true },
    username: { type: String, required: true },
});

export const VerificationSchemaModel = mongoose.model<VerificationDocument>(
    "Verification",
    VerificationSchema
);
