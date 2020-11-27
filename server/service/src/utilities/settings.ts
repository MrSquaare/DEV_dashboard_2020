import { badRequestStatus } from "../constants";

export function hasSettings<T>(
    object: Record<string, unknown> | undefined,
    settings: Record<keyof T, string>
): void {
    if (!object) {
        throw badRequestStatus;
    }

    const keys = Object.keys(object);

    for (const key in settings) {
        if (!keys.includes(key)) {
            throw badRequestStatus;
        }
    }
}
