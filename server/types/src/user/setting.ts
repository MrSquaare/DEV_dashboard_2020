import { Pair } from "../utilities";

export type UserSetting = Pair<string, string> & {
    username: string;
    secure?: boolean;
};
