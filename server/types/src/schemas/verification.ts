import mongoose, { Document, Schema } from "mongoose";
import { VerificationModel } from "../models";

type VerificationDocument = VerificationModel & Document;

const VerificationSchema = new Schema({
    id: { type: String, required: true, unique: true },
    username: { type: String, required: true },
});

export const VerificationSchemaModel = mongoose.model<VerificationDocument>(
    "Verification",
    VerificationSchema
);
