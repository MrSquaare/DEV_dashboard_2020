import { StatusError } from "@dashboard/types";

export const unknownErrorStatus = new StatusError(520, {
    name: "UNKNOWN_ERROR",
    message: "Unknown error",
});
