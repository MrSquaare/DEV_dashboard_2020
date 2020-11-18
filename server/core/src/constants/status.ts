import { StatusModel } from "@dashboard/types";
import {
    jwtInvalidMessage,
    serviceActionNotFoundMessage,
    serviceNotFoundMessage,
    serviceStrategyNotFoundMessage,
    userExistsMessage,
    userNotFoundMessage,
    userNotVerifiedMessage, verificationEmailSentMessage,
    verificationNotFoundMessage
} from "./messages";

export const jwtInvalidStatus: StatusModel = {
    code: 401,
    name: "JWT_INVALID",
    message: jwtInvalidMessage,
};

export const serviceNotFoundStatus: StatusModel = {
    code: 404,
    name: "SERVICE_NOT_FOUND",
    message: serviceNotFoundMessage,
};

export const serviceActionNotFoundStatus: StatusModel = {
    code: 404,
    name: "SERVICE_ACTION_NOT_FOUND",
    message: serviceActionNotFoundMessage,
};

export const serviceStrategyNotFoundStatus: StatusModel = {
    code: 404,
    name: "SERVICE_STRATEGY_NOT_FOUND",
    message: serviceStrategyNotFoundMessage,
};

export const userExistsStatus: StatusModel = {
    code: 401,
    name: "USER_EXISTS",
    message: userExistsMessage,
};

export const userNotFoundStatus: StatusModel = {
    code: 401,
    name: "USER_NOT_FOUND",
    message: userNotFoundMessage,
};

export const userNotVerifiedStatus: StatusModel = {
    code: 401,
    name: "USER_NOT_VERIFIED",
    message: userNotVerifiedMessage,
};

export const verificationEmailSentStatus: StatusModel = {
    code: 200,
    name: "VERIFICATION_EMAIL_SENT",
    message: verificationEmailSentMessage,
};

export const verificationNotFoundStatus: StatusModel = {
    code: 401,
    name: "VERIFICATION_NOT_FOUND",
    message: verificationNotFoundMessage,
};

export const internalServerStatus: StatusModel = {
    code: 500,
    name: "INTERNAL_SERVER_ERROR",
};
