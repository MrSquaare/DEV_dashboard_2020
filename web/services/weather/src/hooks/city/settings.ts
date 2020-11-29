import { useApi } from "@dashboard-web/hooks";
import { useEffect } from "react";

export function useCitySettings(instance: string) {
    const { data, error, fetch } = useApi<any>();

    const setCitySettings = (city: string) => {
        fetch(`/api/server/services/weather/city/settings`, {
            method: "POST",
            headers: {
                Authorization: `JWT ${localStorage.getItem("jwt")}`,
                "Content-Type": "application/json",
            },
            query: {
                instance: instance,
            },
            body: JSON.stringify({
                city: city,
            }),
        });
    };

    useEffect(() => {
        fetch(`/api/server/services/weather/city/settings`, {
            headers: {
                Authorization: `JWT ${localStorage.getItem("jwt")}`,
            },
            query: {
                instance: instance,
            },
        });
    }, []);

    return {
        citySettings: data ? data["data"] : undefined,
        error,
        setCitySettings,
    };
}
