import { Request } from "../http";
import { User } from "../user";

export type ServiceRequest = Request & {
    instance?: string;
    user: User;
};
