import { NextApiRequest, NextApiResponse } from "next";
import { serverHost } from "../../../constants";
import { serviceUnavailableStatus } from "../../../constants/status";

export const config = {
    api: {
        bodyParser: false,
    },
};

function rawBody(req: NextApiRequest): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
        let buffer: string;

        req.on("data", (chunk) => {
            buffer = buffer ? buffer + chunk : chunk;
        });

        req.on("error", (err) => {
            reject(err);
        });

        req.on("end", () => {
            setTimeout(() => resolve(buffer), 0);
        });
    });
}

export default async function server(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const routes = req.url?.substr("/api/server/".length);

    req.body = await rawBody(req);

    try {
        const url = `${serverHost}/v1/${routes}`;

        const response = await fetch(url, {
            method: req.method,
            headers: req.headers as Record<string, string>,
            body: req.body,
        });

        response.headers.forEach((value, key) => {
            res.setHeader(key, value);
        });

        res.statusCode = response.status;
        res.statusMessage = response.statusText;

        const text = await response.text();

        return res.send(text);
    } catch (err) {
        console.error(err);

        err = serviceUnavailableStatus;

        return res.status(err.code).send(err);
    }
}
