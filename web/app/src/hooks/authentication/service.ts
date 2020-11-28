import { useApi } from "../api/api";

export function useServiceSignIn() {
    const { data, error, fetch } = useApi();

    const serviceSignIn = (
        service: string,
        query: Record<string, string> | string[][]
    ) => {
        fetch(`/api/server/services/${service}/authentication/callback`, {
            query: query,
        });
    };

    return { serviceSignedIn: !!data, error, serviceSignIn };
}
