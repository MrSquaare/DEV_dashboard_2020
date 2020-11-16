import { User, UserSchemaModel } from "@dashboard/types";

export function deserialize(user: User, done: (...args: unknown[]) => void) {
    UserSchemaModel.findOne({ username: user.username }, (err, user) => {
        if (err) {
            done(err);
        }

        if (!user) {
            done(null, false);
        }

        done(null, user);
    });
}
