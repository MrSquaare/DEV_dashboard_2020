import { useApi } from "@dashboard-web/hooks";
import { useEffect } from "react";

export function useCity(instance: string) {
    const { data, error, fetch } = useApi();

    useEffect(() => {
        fetch(`/api/server/services/weather/city`, {
            headers: {
                Authorization: `JWT ${localStorage.getItem("jwt")}`,
            },
            query: {
                instance: instance,
            },
        });
    }, []);

    return { city: data ? data["data"] : undefined, error };
}
