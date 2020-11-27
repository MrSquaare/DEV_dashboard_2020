import { useState } from "react";
import { unknownErrorStatus } from "../../constants/status";

export type QueryInit = string[][] | Record<string, string>;

export type RequestParameters = RequestInit & {
    query?: QueryInit;
};

function isJSON(response: Response) {
    return response.headers.get("content-type")?.includes("application/json");
}

async function apiFetch<T>(
    setData: (data: T | undefined) => void,
    setError: (error: Error | undefined) => void,
    route: string,
    parameters: RequestParameters,
    onSuccess?: (data: T) => void,
    onError?: (error: Error) => void
) {
    setData(undefined);
    setError(undefined);

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
            setError(data);

            return onError ? onError(data) : undefined;
        }

        setData(data);

        return onSuccess ? onSuccess(data) : undefined;
    } catch (err) {
        console.error(err);

        err = unknownErrorStatus;

        setError(err);

        return onError ? onError(err) : undefined;
    }
}

export function useApi<T = any>() {
    const [data, setData] = useState<T>();
    const [error, setError] = useState<Error>();

    const fetch = (
        route: string,
        parameters: RequestParameters,
        onSuccess?: (data: T) => void,
        onError?: (error: Error) => void
    ) => {
        apiFetch(
            setData,
            setError,
            route,
            parameters,
            onSuccess,
            onError
        ).then();
    };

    return { data, error, fetch };
}
