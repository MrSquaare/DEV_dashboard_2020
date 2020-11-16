import bcrypt from "bcrypt";
import mongoose, { Document, Schema } from "mongoose";
import { User } from "../models";

type UserDocument = User & Document;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    verified: { type: Boolean, default: false },
});

UserSchema.methods.comparePassword = async function (password: string) {
    const comparedPassword = await bcrypt.compare(password, this.password);

    return comparedPassword;
};

UserSchema.pre<UserDocument>("save", async function (next) {
    const hashedPassword = await bcrypt.hash(this.password, 10);

    this.password = hashedPassword;

    return next();
});

export const UserSchemaModel = mongoose.model<UserDocument>("User", UserSchema);
