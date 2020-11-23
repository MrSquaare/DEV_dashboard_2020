import { StatusError } from "@dashboard/types";

export const badRequestStatus = new StatusError(400, {
    name: "BAD_REQUEST",
    message: "Bad request",
});

export const jwtInvalid = new StatusError(401, {
    name: "JWT_INVALID",
    message: "Invalid JWT",
});

export const verificationInvalid = new StatusError(401, {
    name: "VERIFICATION_INVALID",
    message: "Invalid verification",
});

export const userExists = new StatusError(401, {
    name: "USER_EXISTS",
    message: "User exists",
});

export const userDontExist = new StatusError(401, {
    name: "USER_DOESNT_EXIST",
    message: "User doesn't exist",
});

export const userVerified = new StatusError(401, {
    name: "USER_VERIFIED",
    message: "User verified",
});

export const userNotVerified = new StatusError(401, {
    name: "USER_NOT_VERIFIED",
    message: "User not verified",
});

export const serviceNotFoundStatus = new StatusError(404, {
    name: "SERVICE_NOT_FOUND",
    message: "Service not found",
});

export const serviceActionNotFoundStatus = new StatusError(404, {
    name: "SERVICE_ACTION_NOT_FOUND",
    message: "Service action not found",
});

export const serviceActionSettingsNotFoundStatus = new StatusError(404, {
    name: "SERVICE_ACTION_SETTINGS_NOT_FOUND",
    message: "Service action settings not found",
});

export const serviceAuthenticationNotFoundStatus = new StatusError(404, {
    name: "SERVICE_AUTHENTICATION_NOT_FOUND",
    message: "Service authentication not found",
});

export const internalServerErrorStatus: StatusError = new StatusError(500, {
    name: "INTERNAL_SERVER_ERROR",
    message: "Internal server error",
});
