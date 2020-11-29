import { unknownErrorStatus } from "../constants";

export type QueryInit = string[][] | Record<string, string>;

export type RequestParameters = RequestInit & {
    query?: QueryInit;
};

function responseContentType(response: Response): string | undefined {
    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
        return "json";
    }
}

export async function apiFetchCb<T>(
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

        if (responseContentType(response) == "json") {
            data = await response.json();
        } else {
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

export async function apiFetch<T>(
    route: string,
    parameters: RequestParameters
): Promise<T> {
    return new Promise((resolve, reject) => {
        apiFetchCb<T>(
            route,
            parameters,
            (data) => resolve(data),
            (error) => reject(error)
        );
    });
}
