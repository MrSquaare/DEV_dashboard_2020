import crypto from "crypto-js";
import mongoose, { Document, Schema } from "mongoose";
import { UserServiceModel } from "../models";
import { aesSecret } from "../variables";

type UserServiceDocument = UserServiceModel & Document;

const UserServiceSchema = new Schema({
    username: { type: String, required: true },
    serviceId: { type: String, required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String },
});

UserServiceSchema.methods.getAccessToken = async function () {
    const accessToken = crypto.AES.decrypt(this.accessToken, aesSecret);

    return accessToken.toString(crypto.enc.Utf8);
};

UserServiceSchema.methods.getRefreshToken = async function () {
    const refreshToken = this.refreshToken
        ? crypto.AES.decrypt(this.refreshToken, aesSecret)
        : undefined;

    return refreshToken?.toString(crypto.enc.Utf8);
};

UserServiceSchema.pre<UserServiceDocument>("save", async function (next) {
    const encryptedAccess = crypto.AES.encrypt(this.accessToken, aesSecret);
    const encryptedRefresh = this.refreshToken
        ? crypto.AES.encrypt(this.refreshToken, aesSecret)
        : undefined;

    console.log("access");
    console.log(this.accessToken);

    this.accessToken = encryptedAccess.toString();
    this.refreshToken = encryptedRefresh?.toString();

    console.log("accessCrypted");
    console.log(this.accessToken);

    return next();
});

export const UserServiceSchemaModel = mongoose.model<UserServiceDocument>(
    "UserService",
    UserServiceSchema
);
