import { useApi } from "../api/api";
import { useEffect } from "react";

export function useServices() {
    const { data, error, fetch } = useApi();

    useEffect(() => {
        fetch("/api/server/services", {});
    }, []);

    return { services: data ? data["data"] : undefined, error };
}
