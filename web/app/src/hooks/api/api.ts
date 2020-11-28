import { useState } from "react";
import { apiFetch, RequestParameters } from "../../lib/api";

export function useApi<T = any>() {
    const [data, setData] = useState<T>();
    const [error, setError] = useState<Error>();

    const fetch = (
        route: string,
        parameters: RequestParameters,
        onSuccess?: (data: T) => void,
        onError?: (error: Error) => void
    ) => {
        setData(undefined);
        setError(undefined);

        apiFetch<T>(
            route,
            parameters,
            (data) => {
                setData(data);

                if (onSuccess) {
                    onSuccess(data);
                }
            },
            (error) => {
                setError(error);

                if (onError) {
                    onError(error);
                }
            }
        ).catch((e) => console.error(e));
    };

    return { data, error, fetch };
}
