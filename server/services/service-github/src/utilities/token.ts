import { UserModel, UserServiceSchemaModel } from "@dashboard/types";
import { internalServerStatus } from "../constants";

export async function getAccessToken(
    user: UserModel
): Promise<string | undefined> {
    try {
        const userService = await UserServiceSchemaModel.findOne({
            username: user.username,
            serviceId: "github",
        });

        return userService?.getAccessToken();
    } catch (e) {
        throw internalServerStatus;
    }
}
