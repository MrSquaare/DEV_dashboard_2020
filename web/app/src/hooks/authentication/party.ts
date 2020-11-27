import { useApi } from "../api/api";

export function usePartySignIn() {
    const { data, error, fetch } = useApi();

    const partySignIn = (
        party: string,
        query: Record<string, string> | string[][]
    ) => {
        fetch(
            `/api/server/authentication/parties/${party}/callback`,
            {
                query: query,
            },
            (data) => {
                window.opener.localStorage.setItem("jwt", data["data"]);
            }
        );
    };

    return { partySignedIn: !!data, error, partySignIn };
}
