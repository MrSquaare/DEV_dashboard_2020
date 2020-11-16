import { User } from "@dashboard/types";

export function serialize(user: User, done: (...args: unknown[]) => void) {
    done(null, user.username);
}
