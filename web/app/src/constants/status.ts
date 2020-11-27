import { StatusError } from "@dashboard/types";

export const serviceUnavailableStatus = new StatusError(503, {
    name: "SERVICE_UNAVAILABLE",
    message: "Service unavailable",
});

export const unknownErrorStatus = new StatusError(520, {
    name: "UNKNOWN_ERROR",
    message: "Unknown error",
});
