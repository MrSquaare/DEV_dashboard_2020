import { StatusError } from "@dashboard/types";

export const badRequestStatus = new StatusError(400, {
    name: "BAD_REQUEST",
    message: "Bad request",
});

export const userNotAuthenticated = new StatusError(401, {
    name: "USER_NOT_AUTHENTICATED",
    message: "No tokens",
});
