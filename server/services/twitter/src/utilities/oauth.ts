import node_fetch, { RequestInit, Response } from "node-fetch";
import { oauthAuthorization } from "@dashboard/oauth";
import { twitterConsumerKey, twitterConsumerSecret } from "../constants";

export async function oauthFetch(
    uri: string,
    token: string,
    tokenSecret: string,
    init: RequestInit = {}
): Promise<Response> {
    const { origin, pathname, searchParams } = new URL(uri);

    const method = init?.method || "GET";
    const url = `${origin}${pathname}`;
    const authorization = oauthAuthorization(
        twitterConsumerKey,
        twitterConsumerSecret,
        token,
        tokenSecret,
        method,
        url,
        searchParams
    );

    init.headers = {
        Authorization: authorization,
        ...init.headers,
    };

    return await node_fetch(uri, init);
}
