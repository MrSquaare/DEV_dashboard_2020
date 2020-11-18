import { StatusModel } from "@dashboard/types";

export const internalServerStatus: StatusModel & Error = {
    code: 500,
    name: "INTERNAL_SERVER_ERROR",
    message: "Internal server error (GitHub)",
};
