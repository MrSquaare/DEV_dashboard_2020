import { useApi } from "@dashboard-web/hooks";
import { useEffect } from "react";

export function useAuthentication() {
    const { data, error, fetch } = useApi();

    const getAuthentication = () => {
        fetch(`/api/server/services/twitter/authentication/state`, {
            headers: {
                Authorization: `JWT ${localStorage.getItem("jwt")}`,
            },
        });
    };

    useEffect(() => {
        getAuthentication();
    }, []);

    return {
        authentication: data ? data["data"] : undefined,
        error,
        getAuthentication,
    };
}
