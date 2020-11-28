import { unknownErrorStatus } from "../../constants";

export type QueryInit = string[][] | Record<string, string>;

export type RequestParameters = RequestInit & {
    query?: QueryInit;
};

function isJSON(response: Response) {
    return response.headers.get("content-type")?.includes("application/json");
}

export async function apiFetch<T>(
    route: string,
    parameters: RequestParameters,
    onSuccess?: (data: T) => void,
    onError?: (error: Error) => void
): Promise<void> {
    const queries = Object.entries(parameters.query || {})
        .map((query) => `${query[0]}=${query[1]}`)
        .join("&");

    route += `?${queries}`;

    try {
        const response = await fetch(route, parameters);
        let data;

        if (isJSON(response)) {
            data = await response.json();
        }

        if (!data) {
            data = await response.text();
        }

        if (response.status !== 200) {
            return onError ? onError(data) : undefined;
        }

        return onSuccess ? onSuccess(data) : undefined;
    } catch (err) {
        console.error(err);

        return onError ? onError(unknownErrorStatus) : undefined;
    }
}
