import { UserModel } from "@dashboard/types";

export const userTest: UserModel = {
    username: "MrSquaare",
    password: "MrSquaare",
    email: "guillaume.bonnet@epitech.eu",
    firstName: "Guillaume",
    lastName: "Bonnet",
    verified: true,

    comparePassword(_: string): Promise<boolean> {
        return new Promise<boolean>((resolve) => resolve(true));
    },
};
