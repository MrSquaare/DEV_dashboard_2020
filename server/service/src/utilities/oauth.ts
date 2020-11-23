import * as Crypto from "crypto";
import * as crypto from "crypto-js";

export function oauthAuthorizationGenerator(
    consumerKey: string,
    consumerSecret: string,
    token: string,
    tokenSecret: string,
    method: string,
    url: string,
    queries: Iterable<[string, string]>
): string {
    const nonce = Crypto.randomBytes(32).toString("hex");
    const timestamp = Math.ceil(Date.now() / 1000).toString();

    const oauthParameters = {
        oauth_consumer_key: consumerKey,
        oauth_nonce: nonce,
        oauth_signature_method: "HMAC-SHA1",
        oauth_timestamp: timestamp,
        oauth_token: token,
        oauth_version: "1.0",
    };

    const uri = encodeURIComponent(url);

    const oauthParametersEntries = Object.entries(oauthParameters);

    const parametersEntries = [...oauthParametersEntries, ...queries];

    const parametersChain = parametersEntries
        .map((parameter) => {
            return `${parameter[0]}=${parameter[1]}`;
        })
        .join("&");
    const parametersURI = encodeURIComponent(parametersChain);

    const signatureMessageURI = `${method}&${uri}&${parametersURI}`;

    const consumerSecretURI = encodeURIComponent(consumerSecret);
    const tokenSecretURI = encodeURIComponent(tokenSecret);

    const signatureKeyURI = `${consumerSecretURI}&${tokenSecretURI}`;

    const signature = crypto
        .HmacSHA1(signatureMessageURI, signatureKeyURI)
        .toString(crypto.enc.Base64);

    const signatureURI = encodeURIComponent(signature);

    oauthParametersEntries.push(["oauth_signature", signatureURI]);

    const oauthParametersString = oauthParametersEntries
        .map((parameter) => {
            return `${parameter[0]}="${parameter[1]}"`;
        })
        .join(", ");

    return `OAuth ${oauthParametersString}`;
}
