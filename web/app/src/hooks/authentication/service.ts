import { useApi } from "@dashboard-web/hooks";

export function useServiceSignIn() {
    const { data, error, fetch } = useApi();

    const serviceSignIn = (
        service: string,
        query: Record<string, string> | string[][]
    ) => {
        fetch(`/api/server/services/${service}/authentication/callback`, {
            headers: {
                Authorization: `JWT ${window.opener.localStorage.getItem(
                    "jwt"
                )}`,
            },
            query: query,
        });
    };

    return { serviceSignedIn: !!data, error, serviceSignIn };
}
